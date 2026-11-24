import { contextEntries } from '../data/contextEntries'
import type { ContextEntry } from '../data/contextEntries'
import type { Exercise, StudyData, Word } from '../types'
import { wordCard } from './study'

export interface Token {
  text: string
  start: number
  end: number
}

export function tokens(text: string): Token[] {
  return Array.from(text.matchAll(/[\p{L}\p{M}]+(?:[-’'][\p{L}\p{M}]+)*/gu), match => ({
    text: match[0], start: match.index, end: match.index + match[0].length,
  }))
}

const lower = (text: string) => text.normalize('NFC').toLocaleLowerCase('de')
const tokenKey = (text: string) => tokens(text).map(word => lower(word.text)).join(' ')

type Alias = { entry: ContextEntry; words: Token[]; authored?: boolean }
const index = new Map<string, Alias[]>()
const separated = new Map<string, { entry: ContextEntry; particle: string }[]>()

function addAlias(target: Map<string, Alias[]>, form: string, entry: ContextEntry, authored = false) {
  const words = tokens(form.trim())
  if (!words.length) return
  const first = lower(words[0].text)
  const list = target.get(first) ?? []
  list.push({ entry, words, authored })
  target.set(first, list)
}

for (const entry of contextEntries) {
  for (const form of new Set([entry.lemma, ...entry.forms ?? []])) {
    addAlias(index, form, entry)
    if (entry.part !== 'verb') continue
    const [head, particle, ...rest] = form.split(' ')
    if (!particle || rest.length || !entry.lemma.startsWith(particle)) continue
    const list = separated.get(head) ?? []
    list.push({ entry, particle })
    separated.set(head, list)
  }
}

type Match = { first: number; last: number; entry: ContextEntry; rank: number; authored?: boolean; split?: boolean }

function sentenceAt(text: string, start: number, end: number) {
  const before = text.slice(0, start)
  const left = Math.max(before.lastIndexOf('.'), before.lastIndexOf('?'), before.lastIndexOf('!'), before.lastIndexOf('\n')) + 1
  const right = text.slice(end).match(/[.?!\n]/u)
  return text.slice(left, right ? end + right.index! + 1 : text.length).trim()
}

function matches(text: string, words: Token[], first: number, aliases: Alias[]): Match[] {
  const found: Match[] = []
  for (const { entry, words: form, authored } of aliases) {
    const last = first + form.length - 1
    if (last >= words.length || !form.every((word, offset) => lower(words[first + offset].text) === lower(word.text))) continue
    const surface = text.slice(words[first].start, words[last].end)
    if (/[,;:.!?\n/()→]/u.test(surface)) continue
    if (entry.context && !entry.context.test(sentenceAt(text, words[first].start, words[last].end))) continue
    const exactCase = form.every((word, offset) => words[first + offset].text === word.text)
    const rank = (entry.context ? 6 : 0) + (exactCase ? 3 : 0) + (authored ? 2 : 0)
    found.push({ first, last, entry, rank, authored })
  }
  return found
}

export type VocabularyHints = readonly (readonly [term: string, definition: string, language?: 'sk' | 'de'])[]

function authoredIndex(hints: VocabularyHints) {
  const custom = new Map<string, Alias[]>()
  for (const [lemma, definition, language] of hints) {
    const form = tokens(lemma)
    if (!form.length) continue
    const plain = lemma.replace(/^(der|die|das)\s+(?=\p{Lu})/u, '')
    const baseForm = tokens(plain)
    const base = matches(plain, baseForm, 0, index.get(lower(baseForm[0].text)) ?? [])
      .filter(match => match.last === baseForm.length - 1 && !match.entry.context)
      .sort((a, b) => b.rank - a.rank)[0]?.entry
    if (!base && language === 'de') continue
    const entry: ContextEntry = base
      ? { ...base, ...(language === 'de' ? { germanMeaning: definition } : { meaning: definition }) }
      : { id: 'authored:' + tokenKey(lemma), lemma, translation: definition, part: form.length > 1 ? 'phrase' : 'other' }
    for (const candidate of new Set([lemma, plain, base?.lemma ?? plain, ...base?.forms ?? []])) addAlias(custom, candidate, entry, true)
  }
  return custom
}

export function vocabularyMatches(text: string, words: Token[], hints: VocabularyHints = []) {
  const custom = authoredIndex(hints)
  return words.flatMap((word, first) => {
    const key = lower(word.text)
    const found = matches(text, words, first, [...index.get(key) ?? [], ...custom.get(key) ?? []])
    for (const { entry, particle } of separated.get(key) ?? []) {
      for (let last = first + 2; last < Math.min(first + 11, words.length); last++) {
        const gap = text.slice(word.end, words[last].end)
        if (/[,;:.!?\n/()→]/u.test(gap)) break
        const next = words[last + 1]
        const boundary = !next || /[,;:.!?\n]/u.test(text.slice(words[last].end, next.start))
        if (boundary && lower(words[last].text) === particle) found.push({ first, last, entry, rank: 5, split: true })
      }
    }
    return found
  })
}

export function chooseMatch(found: Match[], first: number, last: number) {
  return found.filter(match => {
    if (match.split) return (first === match.first && last === match.last) ||
      (first === last && (first === match.first || first === match.last))
    return match.first <= last && match.last >= first &&
      (first === last || (match.first <= first && match.last >= last) || (match.first === first && match.last > first))
  }).sort((a, b) => {
    const length = (match: Match) => match.split ? 2 : match.last - match.first + 1
    return length(b) - length(a) || b.rank - a.rank
  })[0]
}

// These forms are also regular Slovak words. Keep Slovak prose selectable.
const shared = new Set('a ako do ja je kam mal mi na nie od sa si so ta to tu za zo'.split(' '))
export function isGermanMatch(word: Token, i: number, found: Match[]) {
  return found.some(match => {
    if (match.split) return i === match.first || i === match.last
    return match.first <= i && match.last >= i &&
      (match.first !== match.last || match.authored || !shared.has(lower(word.text)))
  })
}

export function lookupContext(text: string, words: Token[], found: Match[], start: number, end: number, useSourceExample: boolean) {
  const first = words.findIndex(word => word.end > start)
  if (first === -1 || words[first].start >= end) return
  let last = first
  while (last + 1 < words.length && words[last + 1].start < end) last++
  const match = chooseMatch(found, first, last)
  const source = match?.split && first === last ? first : match?.first ?? first
  const target = match?.split && first === last ? last : match?.last ?? last
  const from = words[source].start
  const to = words[target].end
  const sentence = useSourceExample ? sentenceAt(text, from, to) : ''
  const example = sentence.length <= 172 && !sentence.includes('___') ? sentence : ''
  const term = text.slice(from, to)
  const entryId = match?.entry.id ?? (target - source < 4 ? 'unlisted:' + tokenKey(term) : undefined)
  return { term, entry: match?.entry, entryId, from, to, example: match?.entry.example ?? example }
}

export type VocabularyLookup = NonNullable<ReturnType<typeof lookupContext>>

export function testedVocabulary(exercise: Exercise) {
  return exercise.type === 'reverse' || (exercise.type !== 'reading' &&
    exercise.skillTags.length > 0 && exercise.skillTags.every(skill => skill === 'meaning'))
}

export function protectedForms(exercise: Exercise) {
  if (exercise.type === 'reading') return []
  const known = new Set(tokens(exercise.prompt).map(word => lower(word.text)))
  return [...new Set([exercise.answer, ...exercise.acceptedAnswers].flatMap(answer => [
    answer, ...tokens(answer).filter(word => !known.has(lower(word.text))).map(word => word.text),
  ]))]
}

export function hidesForm(text: string | undefined, blocked: readonly string[]) {
  if (!text) return false
  const form = ' ' + tokenKey(text) + ' '
  return blocked.some(answer => {
    const key = tokenKey(answer)
    return key && form.includes(' ' + key + ' ')
  })
}

export function notebookWord(data: StudyData, entry: ContextEntry) {
  return data.words.find(word => word.contextEntryId === entry.id ||
    (lower(word.german) === lower(entry.lemma) && lower(word.slovak) === lower(entry.translation)))
}

export function vocabularyStatus(data: StudyData, id: string, word?: Word) {
  if (word?.learned || (word && (data.reviews[wordCard(word).id]?.successful ?? 0) >= 2)) return 'known'
  if (word) return 'learning'
  if (data.vocabularyExposure?.[id]) return 'seen'
  return 'unknown'
}

export const vocabularyStatusLabel = { known: 'Zvládnuté', learning: 'Učím sa', seen: 'Videné', unknown: 'Nové' }

export function rememberWord(data: StudyData, entry: ContextEntry, example: string): StudyData {
  if (notebookWord(data, entry)) return data
  const { id, lemma, translation, part, article = '', plural = '', perfect = '', meaning } = entry
  const kind: Word['kind'] = part === 'verb' || part === 'noun' || part === 'adjective' || part === 'adverb' || part === 'phrase' ? part : 'other'
  const word: Word = {
    id: 'context-' + id, german: lemma, slovak: translation, kind, article, plural, perfect,
    contextEntryId: id, contextMeaning: meaning, present: '', example, learned: false,
  }
  return { ...data, words: [...data.words, word] }
}
