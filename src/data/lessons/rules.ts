import type { SkillId } from '../grammarSkills'
import type { Exercise } from '../../types'
import type { Grade } from '../../utils/grade'
import { guidedLessons } from './catalog'
import { task } from './model'
import type { Lesson, TheorySection } from './model'

export interface RuleReference {
  lesson?: Lesson
  section: TheorySection
}

const fallbackSection = {
  id: 'answer-from-context',
  title: 'Celá odpoveď podľa zadania',
  explanation: 'Nájdi v zadaní hlavnú informáciu a zlož okolo nej jasnú vetu. Pri čítaní si najprv over, či odpoveď vyplýva z textu.',
  rule: 'Zachovaj význam, čas a osobu zo zadania. Pri otázke odpovedz ucelenou vetou.',
  examples: ['Wo wohnt Ben? Ben wohnt in Graz.'],
  mistake: ['Wien. (keď v texte stojí Graz)', 'Ben wohnt in Graz.'] as [string, string],
  tags: ['reading' as const, 'meaning' as const],
}
const fallback: RuleReference = { section: {
  ...fallbackSection,
  reviewExercises: [],
  exercises: [
    task(['Text: Nina arbeitet am Dienstag. Wann arbeitet Nina?', 'Nina arbeitet am Dienstag.', ['Sie arbeitet am Dienstag.']], 'answer-review-1', 'A1', ['reading'], '', fallbackSection),
    task(['Text: Tom kauft Brot. Was kauft Tom?', 'Tom kauft Brot.', ['Er kauft Brot.']], 'answer-review-2', 'A1', ['reading'], '', fallbackSection),
  ],
} }

const catalogue: RuleReference[] = guidedLessons.flatMap(lesson => lesson.sections.map(section => ({ lesson, section })))
const byId = new Map([...catalogue, fallback].map(item => [item.section.id, item]))
const bySkill = new Map<SkillId, RuleReference>()
for (const reference of catalogue) {
  for (const skill of reference.section.tags) if (!bySkill.has(skill)) bySkill.set(skill, reference)
}
for (const lesson of guidedLessons) {
  for (const skill of lesson.tags) if (!bySkill.has(skill)) bySkill.set(skill, { lesson, section: lesson.sections[0] })
}

export function ruleById(id: string | null | undefined) {
  return id ? byId.get(id) : undefined
}

export function exerciseRule(exercise: Exercise) {
  const explicit = ruleById(exercise.theorySectionId)
  if (explicit) return explicit
  const context = exercise.prompt + ' ' + exercise.answer
  if (exercise.skillTags.includes('conjugation')) {
    if (/\(sein\)|\b(?:bin|bist|sind|seid)\b/u.test(context)) return ruleById('sein-haben-regel-1') ?? fallback
    if (/\(haben\)|\b(?:hast|habt)\b/u.test(context)) return ruleById('sein-haben-regel-2') ?? fallback
    if (/\b(?:fährst|fährt|sprichst|spricht|liest|isst)\b/u.test(context)) return ruleById('praesens-regel-2') ?? fallback
    return ruleById('praesens-regel-1') ?? fallback
  }
  if (exercise.skillTags.includes('v2')) return ruleById(exercise.answer.endsWith('?') ? 'fragen-regel-1' : 'hauptsatz-regel-2') ?? fallback
  return exercise.skillTags.map(skill => bySkill.get(skill)).find(Boolean) ?? fallback
}

const phrase = (text: string) => ' ' + text.toLocaleLowerCase().normalize('NFC').replace(/[^\p{L}\p{N}]+/gu, ' ').trim() + ' '

export function feedbackRule(exercise: Exercise, response: string, grade: Grade) {
  if (grade.status !== 'incorrect') return undefined
  const input = phrase(response)
  const expected = phrase(exercise.answer)
  const prompt = phrase(exercise.prompt)
  const explicit = exercise.errorRules?.find(rule => input.includes(phrase(rule.pattern)))
  const explicitRule = ruleById(explicit?.theorySectionId)
  if (explicitRule) return explicitRule

  if (/\bmit\b/.test(prompt + expected) && exercise.tags.includes('dativ')
    && (grade.topic === 'dativ' || /\bmit (?:einen|eine|ein|die|das)\b/u.test(input))) {
    return ruleById('dativ-regel-1')
  }

  if (/\bweil\b/.test(expected + prompt) && /\bweil (?:ich|du|er|sie|wir|es|ihr) (?:habe|hast|hat|haben|habt|bin|bist|ist|sind|seid|war|kann|konnte|muss|musste|möchte) \p{L}+/u.test(input)) {
    const perfect = /\b(?:ge\p{L}+|besucht|bezahlt|erledigt|studiert|versucht|verstanden)\b/u.test(expected)
    return ruleById(perfect ? 'weil-dass-wenn-regel-2' : 'weil-dass-wenn-regel-1')
  }

  if ((grade.skill === 'dass' || grade.skill === 'wenn' || grade.topic === 'subordinate') && /\b(?:dass|wenn)\b/u.test(expected)
    && !/\bweil\b/u.test(expected)) return ruleById('weil-dass-wenn-regel-3')
  const linked = exerciseRule(exercise)
  if (grade.skill && !linked.section.tags.includes(grade.skill)) return bySkill.get(grade.skill) ?? linked
  if (grade.topic === 'vocabulary' && exercise.type !== 'reading' && !grade.skill) return undefined
  return linked
}
