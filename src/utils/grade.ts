import { matchingSkill, skillTopic } from '../data/grammarSkills'
import type { SkillId } from '../data/grammarSkills'
import { topics } from '../types'
import type { Exercise, Topic } from '../types'

export type Grade =
  | { status: 'correct' | 'alternative'; title: string }
  | { status: 'incorrect'; title: string; topic: Topic; note?: string; skill?: SkillId }

const wordList = (text: string): string[] => text.match(/[\p{L}\p{N}]+/gu) ?? []
const normalize = (text: string) => text.normalize('NFC').trim()
  .replace(/[.!?]+$/, '').replace(/\s*([,;:.!?])\s*/g, '$1 ').trim().replace(/\s+/g, ' ')

const sein = new Set(['bin', 'bist', 'ist', 'sind', 'seid', 'sein'])
const haben = new Set(['habe', 'hast', 'hat', 'haben', 'habt'])
const articles = /^(?:[dk]?(?:ein|eine|einen|einem|einer|eines)|der|die|das|dem|den|des|im|ins|zum|zur|am|ans|vom|beim|aufs)$/
const possessive = /^(?:mein|dein|sein|ihr|unser|eur|euer)(?:e|en|em|er|es)?$/
const pronoun = /^(?:ich|du|er|sie|es|wir|ihr|mich|dich|ihn|uns|euch|mir|dir|ihm|ihnen|sich)$/
const modal = /^(?:k(?:ann|onnte|önn)|d(?:arf|urfte|ürf)|m(?:uss|usst|usste|üss|öcht)|w(?:ill|ollte|oll))/
const perfectForm = /^(?:gearbeitet|getrunken|gegessen|gefahren|gereist|gegangen|gehabt|geredet|gesprochen|aufgestanden|eingekauft|angerufen|ferngesehen)$/

function sameWords(a: string[], b: string[]) {
  return a.length === b.length && [...a].sort().join(' ') === [...b].sort().join(' ')
}

function oneTypo(a: string, b: string) {
  if (a.length < 3 || b.length < 3 || Math.abs(a.length - b.length) > 1) return false
  if (a.length === b.length) {
    const changed = [...a].flatMap((letter, index) => letter === b[index] ? [] : [index])
    return changed.length === 1 || (changed.length === 2 && changed[1] === changed[0] + 1
      && a[changed[0]] === b[changed[1]] && a[changed[1]] === b[changed[0]])
  }
  const [shorter, longer] = a.length < b.length ? [a, b] : [b, a]
  return [...longer].some((_, index) => shorter === longer.slice(0, index) + longer.slice(index + 1))
}

const specialTitles: Partial<Record<Topic, string>> = {
  'perfekt-aux': 'Skontroluj pomocné sloveso haben alebo sein.',
  participle: 'Skontroluj tvar alebo doplnenie Partizipu II.',
  modal: 'Skontroluj modálne sloveso a infinitív.',
  subordinate: 'Skontroluj slovosled vo vedľajšej vete.',
  location: 'Skontroluj pád pri polohe alebo smere.',
  conjugation: 'Skontroluj časovanie slovesa.',
  vocabulary: 'Skontroluj význam a úplnosť odpovede.',
}

function incorrect(topic: Topic, title = specialTitles[topic] ?? `Skontroluj tému ${topics[topic]}.`, note?: string): Grade {
  return { status: 'incorrect', title, topic, note }
}

function diagnose(exercise: Exercise, input: string[], expected: string[]): Grade {
  const { tags } = exercise
  const fallback = tags[0] ?? 'vocabulary'
  if (sameWords(input, expected)) {
    return incorrect(tags.includes('subordinate') && /\b(weil|dass|wenn)\b/i.test(exercise.answer) ? 'subordinate' : 'word-order',
      tags.includes('separable') ? 'Skontroluj umiestnenie odlučiteľnej predpony.' : undefined)
  }
  if (exercise.type === 'reverse') return incorrect('vocabulary')

  const missing = expected.filter(word => !input.includes(word))
  const extra = input.filter(word => !expected.includes(word))
  if (tags.includes('perfekt-aux') || tags.includes('participle') || tags.includes('subordinate')) {
    if ((missing.some(word => sein.has(word)) && extra.some(word => haben.has(word)))
      || (missing.some(word => haben.has(word)) && extra.some(word => sein.has(word)))) return incorrect('perfekt-aux')
    if (missing.some(word => sein.has(word) || haben.has(word))) {
      if (extra.some(word => sein.has(word) || haben.has(word))) return incorrect('conjugation')
      if (tags.includes('perfekt-aux') && missing.length === 1) return incorrect('perfekt-aux')
    }
    if (missing.some(word => perfectForm.test(word))) return incorrect('participle')
  }
  if (missing.some(word => articles.test(word) || possessive.test(word))) {
    const relevant = tags.find(tag => ['dativ', 'akkusativ', 'articles', 'location', 'possessive'].includes(tag))
    if (relevant) return incorrect(relevant, relevant === 'location' ? specialTitles.location : `Skontroluj člen alebo pád (${topics[relevant]}).`)
  }
  if (missing.some(word => pronoun.test(word))) {
    const relevant = tags.find(tag => ['pronouns', 'reflexive', 'dativ', 'akkusativ'].includes(tag))
    if (relevant) return incorrect(relevant, 'Skontroluj tvar zámena.')
  }
  if (tags.includes('modal') && missing.some(word => modal.test(word) || word.endsWith('en'))) return incorrect('modal')
  if (tags.includes('separable') && missing.some(word => ['auf', 'an', 'ein', 'fern', 'aus'].includes(word))) return incorrect('separable')
  if (extra.some(word => missing.some(target => word.length > 3 && (word.startsWith(target.slice(0, -2)) && target.length > 4)))
    && tags.includes('conjugation')) return incorrect('conjugation')
  return incorrect(fallback)
}

function gradeResponse(exercise: Exercise, response: string): Grade {
  const value = normalize(response)
  const known = [exercise.answer, ...exercise.acceptedAnswers].map(normalize)
  const match = known.indexOf(value)
  if (match === 0) return { status: 'correct', title: exercise.type === 'reading' ? 'Obsah aj formulácia sú správne.' : 'Správne.' }
  if (match > 0) return { status: 'alternative', title: 'Správne. Aj táto formulácia funguje.' }

  const lower = value.toLocaleLowerCase()
  if (known.some(answer => answer.toLocaleLowerCase() === lower)) {
    return incorrect('vocabulary', 'Drobná pravopisná chyba.', 'Skontroluj veľké písmená.')
  }
  if (/[\p{L}]/u.test(value) && known.some(answer => wordList(answer).join(' ') === wordList(value).join(' '))) {
    return incorrect('vocabulary', 'Skontroluj interpunkciu vnútri vety.')
  }

  const input = wordList(lower)
  if (exercise.readingFacts) {
    const phrase = ` ${input.join(' ')} `
    const matched = exercise.readingFacts.filter(group => group.some(fact => phrase.includes(` ${fact} `))).length
    if (matched === exercise.readingFacts.length) {
      return incorrect(exercise.tags[0], 'Našiel si hľadané údaje. Skontroluj, ako si ich použil vo vete.', 'Odpovedz celou nemeckou vetou. Po ďalšom pokuse si môžeš porovnať význam aj gramatiku so vzorom.')
    }
    if (matched > 0) return incorrect('vocabulary', 'Časť odpovede sedí.', 'V texte nájdi aj druhú časť odpovede.')
    return incorrect('vocabulary', 'Odpoveď zatiaľ nezodpovedá textu.')
  }

  const expected = wordList(known[0].toLocaleLowerCase())
  for (const answer of known) {
    const words = wordList(answer.toLocaleLowerCase())
    if (input.length !== words.length) continue
    const changes = words.flatMap((word, index) => word === input[index] ? [] : [index])
    if (changes.length !== 1) continue
    const [index] = changes
    const target = words[index]
    const actual = input[index]
    if (exercise.type !== 'reverse' && (articles.test(target) || pronoun.test(target) || possessive.test(target) || modal.test(target)
      || sein.has(target) || haben.has(target) || (exercise.tags.includes('conjugation') && index < 3)
      || (exercise.tags.includes('modal') && target.endsWith('en')) || exercise.tags.includes('participle') && perfectForm.test(target))) continue
    if (oneTypo(target, actual)) return incorrect('vocabulary', 'Drobná pravopisná chyba.', 'Skontroluj písmená a prehlásky.')
  }

  return diagnose(exercise, input, expected)
}

export function gradeAnswer(exercise: Exercise, response: string): Grade {
  const grade = gradeResponse(exercise, response)
  if (grade.status !== 'incorrect') return grade

  const script = ' ' + wordList(response.toLocaleLowerCase()).join(' ') + ' '
  const pattern = exercise.diagnostics?.find(item => item.patterns.some(value => script.includes(' ' + wordList(value.toLocaleLowerCase()).join(' ') + ' ')))
  if (pattern) return { ...grade, topic: skillTopic(pattern.skill), skill: pattern.skill, title: pattern.hint, note: undefined }


  const skill = matchingSkill(exercise.skillTags, grade.topic)
  if (exercise.practice !== 'mixed' || !skill) return { ...grade, skill }

  const expected = wordList(exercise.answer.toLocaleLowerCase())
  const actual = wordList(response.toLocaleLowerCase())
  const absent = expected.filter(word => !actual.includes(word))
  const inserted = actual.filter(word => !expected.includes(word))
  const structural = (word: string) => articles.test(word) || pronoun.test(word) || possessive.test(word)
    || sein.has(word) || haben.has(word) || modal.test(word) || perfectForm.test(word)
  const oneForm = absent.length === 1 && inserted.length === 1 && structural(absent[0]) && structural(inserted[0])
  return { ...grade, skill: oneForm ? skill : undefined }
}
