import { corrections } from '../corrections'
import { grammar } from '../grammar'
import { sentences } from '../sentences'
import { spiralAdvanced } from '../spiralAdvanced'
import { spiralFoundation } from '../spiralFoundation'
import { advancedUnits } from '../advancedUnits'
import { basics } from './basics'
import { elementary } from './elementary'
import { intermediate } from './intermediate'
import { advanced } from './advanced'
import { task } from './model'
import type { Lesson, LessonSeed, TheorySection } from './model'
import { levels } from '../../types'
import type { Exercise } from '../../types'

export const checkpointSize = 5
export const checkpointPassing = 4

const bank = [...sentences, ...corrections, ...spiralFoundation, ...spiralAdvanced, ...advancedUnits.flatMap(unit => unit.exercises), ...grammar]

const miniQuestionWords: [pattern: RegExp, german: string, slovak: string][] = [
  [/^um wie viel uhr/i, 'um wie viel Uhr', 'o koľkej'],
  [/^wie lange/i, 'wie lange', 'ako dlho'],
  [/^wie oft/i, 'wie oft', 'ako často'],
  [/^unter welcher bedingung/i, 'unter welcher Bedingung', 'za akej podmienky'],
  [/^welchen eingang/i, 'welchen Eingang', 'ktorý vchod'],
  [/^welches verkehrsmittel/i, 'welches Verkehrsmittel', 'ktorý dopravný prostriedok'],
  [/^wovon/i, 'wovon', 'od čoho'],
  [/^worüber/i, 'worüber', 'o čom'],
  [/^worauf/i, 'worauf', 'na čo'],
  [/^wohin/i, 'wohin', 'kam'],
  [/^wo\b/i, 'wo', 'kde'],
  [/^wie\b/i, 'wie', 'ako'],
  [/^warum\b/i, 'warum', 'prečo'],
  [/^wann\b/i, 'wann', 'kedy'],
  [/^was\b/i, 'was', 'čo'],
  [/^wer\b/i, 'wer', 'kto'],
  [/^wen\b/i, 'wen', 'koho'],
  [/^wem\b/i, 'wem', 'komu'],
  [/^kann\b/i, 'können', 'môcť'],
  [/\b(?:wohnt|wohnen)\b/i, 'wohnen', 'bývať'],
  [/\b(?:arbeitet|arbeiten)\b/i, 'arbeiten', 'pracovať'],
  [/\b(?:fährt|fahren)\b/i, 'fahren', 'ísť dopravným prostriedkom'],
  [/\b(?:kauft|gekauft)\b/i, 'kaufen', 'kúpiť, kupovať'],
  [/\b(?:anrufen|ruft\b.+\ban)\b/i, 'anrufen', 'zavolať niekomu'],
  [/\b(?:verschickt|schicken|zugesendet)\b/i, 'schicken', 'poslať'],
  [/\b(?:stattfindet|stattfinden)\b/i, 'stattfinden', 'konať sa'],
  [/\b(?:bleibt|blieb|bleiben)\b/i, 'bleiben', 'ostať'],
  [/\b(?:besichtigt|besichtigen)\b/i, 'besichtigen', 'prezrieť si'],
  [/\b(?:angeboten|anbieten)\b/i, 'anbieten', 'ponúknuť'],
  [/\b(?:abhängt|hängt\b.+\bab)\b/i, 'abhängen von', 'závisieť od'],
]

function sectionFor(tags: Exercise['skillTags'], sections: TheorySection[]) {
  return sections.find(section => section.tags.some(tag => tags.includes(tag))) ?? sections[0]
}

function lesson(seed: LessonSeed): Lesson {
  const { id, level, title, goal, tags, prerequisites = [] } = seed
  const sections = seed.sections.map((row, index): TheorySection => {
    const [title, explanation, rule, example, mistake, skill, exercises, table] = row
    const sectionId = id + '-regel-' + (index + 1)
    const reference = { id: sectionId, rule, explanation }
    const selected = seed.review?.[index]
    const shortOptions = bank.filter(item => item.skillTags.includes(skill) && levels.indexOf(item.difficulty) <= levels.indexOf(level)
      && !exercises.some(entry => entry[0] === item.prompt || entry[1] === item.answer))
      .sort((a, b) => a.skillTags.length - b.skillTags.length || a.prompt.length - b.prompt.length)
    const extra = new Set<string>()
    const reviewExercises = selected ? selected.map((entry, reviewIndex) => task(entry, sectionId + '-review-' + (reviewIndex + 1), level, [skill], id, reference))
      : shortOptions.filter(item => {
        if (extra.has(item.answer)) return false
        extra.add(item.answer)
        return true
      }).slice(0, 2).map((item, reviewIndex) => ({
        ...item, id: sectionId + '-review-' + (reviewIndex + 1), lessonId: id, theorySectionId: sectionId,
      }))
    return {
      ...reference, title, examples: [example], mistake, tags: [skill], table, reviewExercises,
      exercises: exercises.map((entry, exerciseIndex) => task(entry, sectionId + '-train-' + (exerciseIndex + 1), level, [skill], id, reference)),
    }
  })
  const errorRules = seed.errorRules?.map(([pattern, sectionIndex]) => ({ pattern, theorySectionId: sections[sectionIndex].id }))
  for (const section of sections) for (const exercise of section.exercises) exercise.errorRules = errorRules
  const transfer = { errorRules, ...task(seed.transfer, id + '-kombination', level, tags, id, sections.at(-1)!), practice: 'mixed' as const }
  const [readingTitle, text, questionSeed] = seed.reading
  const readingQuestion: Exercise = {
    ...task(questionSeed, id + '-lesefrage', level, ['reading', ...tags], id, sections.at(-1)!),
    type: 'reading',
    support: {
      glossary: miniQuestionWords.filter(([pattern]) => pattern.test(questionSeed[0])).slice(0, 3)
        .map(([, german, slovak]) => [german, slovak]),
    },
  }
  const reading = {
    id: id + '-lesen', title: readingTitle, description: 'Krátky text k téme ' + title.toLocaleLowerCase() + '.', difficulty: level,
    minutes: 1, paragraphs: [text], glossary: {}, questions: [readingQuestion],
  }
  const authored: Exercise[] = seed.test?.map((entry, index) => {
    const section = sections[index % sections.length]
    return { ...task(entry, id + '-test-' + (index + 1), level, tags, id, section), errorRules }
  }) ?? []
  const seen = new Set([...authored, ...sections.flatMap(item => [...item.exercises, ...item.reviewExercises]), transfer, readingQuestion].map(item => item.answer))
  const sameLevel = levels.indexOf(level)
  const candidates = bank.filter(item => levels.indexOf(item.difficulty) <= sameLevel && item.skillTags.includes(tags[0]))
    .sort((a, b) => tags.filter(tag => b.skillTags.includes(tag)).length - tags.filter(tag => a.skillTags.includes(tag)).length
      || Number(b.type === 'sentence') - Number(a.type === 'sentence'))
  for (const candidate of candidates) {
    if (authored.length >= checkpointSize) break
    if (seen.has(candidate.answer)) continue
    seen.add(candidate.answer)
    authored.push({
      ...candidate,
      id: id + '-test-' + (authored.length + 1),
      lessonId: id,
      theorySectionId: sectionFor(candidate.skillTags, sections).id,
    })
  }

  const corrections = sections.map(section => task(
    ['Oprav podľa pravidla. ' + section.mistake[0], section.mistake[1], [], 'correction', 'sk'],
    section.id + '-oprava', level, section.tags, id, section,
  ))
  return {
    id, level, title, goal, prerequisites, tags, sections, transfer, reading, checkpoint: authored,
    practice: [...sections.flatMap(section => section.exercises), transfer, ...corrections],
  }
}

export const guidedLessons = [...basics, ...elementary, ...intermediate, ...advanced].map(lesson)
