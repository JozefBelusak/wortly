import type { CourseUnit, Exercise, Level, StudyData, Topic } from '../types'
import { advancedReadings } from './advancedReadings'
import { advancedUnits } from './advancedUnits'
import { corrections } from './corrections'
import { grammar } from './grammar'
import { readings } from './readings'
import { sentences } from './sentences'
import { cards } from './vocabulary'
import { spiralFoundation } from './spiralFoundation'
import { spiralAdvanced } from './spiralAdvanced'

const foundationBank = [...grammar, ...sentences, ...corrections]
const spiralBank = [...spiralFoundation, ...spiralAdvanced]

function foundation(id: string, level: Level, title: string, goal: string, skills: Topic[], activities?: Pick<CourseUnit, 'reading' | 'writing'>): CourseUnit {
  const bank = foundationBank.filter(exercise => exercise.difficulty === level && skills.some(skill => exercise.tags.includes(skill)))
  const firstPerSkill = skills.map(skill => bank.find(exercise => exercise.tags[0] === skill) ?? bank.find(exercise => exercise.tags.includes(skill)))
  const firstSentence = bank.find(exercise => exercise.type === 'sentence')
  const exercises = [...new Set([...firstPerSkill, firstSentence, ...bank].filter((item): item is Exercise => item !== undefined))]

  return { id, level, title, goal, skills, ...activities, requires: [], exercises, minCorrect: skills.length + 1, minSentences: 1 }
}

const syllabus: CourseUnit[] = [
  foundation('a1-grundlagen', 'A1', 'Základná veta', 'Upevni časovanie, druhú pozíciu slovesa a predmet v Akkusative.', ['conjugation', 'word-order', 'akkusativ'], { reading: { id: 'ein-morgen', minCorrect: 0 } }),
  foundation('a2-verbformen', 'A2', 'Slovesné tvary a vetná zátvorka', 'Spoj pomocné alebo modálne sloveso s infinitívom či Partizipom. Zopakuj si aj odlučiteľnú predponu.', ['perfekt-aux', 'participle', 'modal', 'separable'], { reading: { id: 'universitaet', minCorrect: 0 } }),
  foundation('a2-satzbau', 'A2', 'Pády a spájanie viet', 'Rozlíš polohu a smer, spoj vety a vyber správne zvratné zámeno.', ['dativ', 'location', 'subordinate', 'reflexive'], {
    reading: { id: 'berlin', minCorrect: 2 },
    writing: {
      instruction: 'Napíš krátku správu o minulom víkende. Povedz, kde si bol, s kým si niečo robil a prečo si sa rozhodol pre jednu z aktivít.',
      language: 'sk', minWords: 25,
      checklist: ['Použil som minulý čas a jednu vetu s weil', 'Skontroloval som pád pri polohe alebo smere'],
    },
  }),
  ...advancedUnits,
]

export const courseUnits = syllabus.map(unit => ({
  ...unit,
  exercises: [...unit.exercises, ...spiralBank.filter(exercise => exercise.unitId === unit.id)],
}))

const readingById = new Map([...readings, ...advancedReadings].map(reading => [reading.id, reading]))

export function courseProgress(data: StudyData) {
  const correct = new Set(data.attempts.filter(attempt => attempt.result === 'correct').map(attempt => attempt.exerciseId))
  const mastered = new Set<string>()
  return courseUnits.map(unit => {
    const solved = unit.exercises.filter(exercise => correct.has(exercise.id))
    const correctSentences = solved.filter(exercise => exercise.type === 'sentence').length
    const demonstratedSkills = (unit.skills ?? []).filter(skill => solved.some(exercise => exercise.tags.includes(skill)))
    const readingQuestions = unit.reading ? readingById.get(unit.reading.id)?.questions ?? [] : []
    const correctReading = readingQuestions.filter(question => correct.has(question.id)).length
    const writing = unit.writing
    const hasWriting = !!writing && data.writing.some(entry =>
      entry.assignmentId === unit.id && wordCount(entry.text) >= writing.minWords && writing.checklist.every(item => entry.checked.includes(item)),
    )
    const missing = unit.requires.filter(id => !mastered.has(id))
    const complete = missing.length === 0 && solved.length >= unit.minCorrect && correctSentences >= (unit.minSentences ?? 0)
      && demonstratedSkills.length === (unit.skills?.length ?? 0) && correctReading >= (unit.reading?.minCorrect ?? 0)
      && (!writing || hasWriting)
    if (complete) mastered.add(unit.id)

    return { unit, solved: solved.length, correctSentences, demonstratedSkills, correctReading, hasWriting, missing, complete }
  })
}

export type CourseProgress = ReturnType<typeof courseProgress>[number]

export function availableUnits(data: StudyData) {
  return courseProgress(data).filter(item => item.missing.length === 0).map(item => item.unit)
}

export function availablePractice(data: StudyData) {
  const unlocked = new Set(availableUnits(data).map(unit => unit.id))
  return [
    ...foundationBank,
    ...advancedUnits.filter(unit => unlocked.has(unit.id)).flatMap(unit => unit.exercises),
    ...spiralBank.filter(exercise => unlocked.has(exercise.unitId)),
  ]
}

export function availableSentences(data: StudyData) {
  return availablePractice(data).filter(exercise => exercise.type === 'sentence')
}

export function availableReadings(data: StudyData) {
  const unlocked = new Set(availableUnits(data).flatMap(unit => unit.reading ? [unit.reading.id] : []))
  return [...readings, ...advancedReadings.filter(reading => unlocked.has(reading.id))]
}

export function availableCards(data: StudyData) {
  return [...cards, ...availableUnits(data).flatMap(unit => unit.vocabulary ?? [])]
}

export function wordCount(text: string) {
  return text.match(/[\p{L}\p{N}]+(?:[-’'][\p{L}\p{N}]+)*/gu)?.length ?? 0
}
