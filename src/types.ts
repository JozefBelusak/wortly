import type { SkillId } from './data/grammarSkills'

export const topics = {
  conjugation: 'Časovanie slovies',
  'word-order': 'Slovosled',
  akkusativ: 'Akkusativ',
  dativ: 'Dativ',
  articles: 'Členy',
  'perfekt-aux': 'Perfekt – haben a sein',
  participle: 'Partizip II',
  modal: 'Modálne slovesá',
  separable: 'Odlučiteľné slovesá',
  subordinate: 'Vedľajšie vety',
  reflexive: 'Reflexívne slovesá',
  location: 'Wo a Wohin',
  possessive: 'Privlastňovacie zámená',
  pronouns: 'Osobné zámená',
  preterite: 'Präteritum',
  infinitive: 'Infinitiv mit zu',
  relative: 'Relativsätze',
  adjectives: 'Adjektivendungen',
  temporal: 'Časové vedľajšie vety',
  subjunctive: 'Konjunktiv II',
  passive: 'Passiv',
  connectors: 'Spojky a argumentácia',
  prepositions: 'Pokročilé predložky',
  genitive: 'Genitiv',
  'verb-prepositions': 'Slovesá a predložkové väzby',
  negation: 'Zápor',
  future: 'Futur I',
  'noun-declension': 'Skloňovanie podstatných mien',
  'word-formation': 'Slovotvorba',
  vocabulary: 'Slovná zásoba',
} as const

export type Topic = keyof typeof topics
export const levels = ['A1', 'A2', 'B1', 'B2'] as const
export type Level = typeof levels[number]
export type ExerciseType = 'sentence' | 'grammar' | 'correction' | 'reading' | 'reverse'

export interface ExerciseSupport {
  glossary: [german: string, slovak: string][]
  subjectChange?: { from: string; to: string }
}

export interface Exercise {
  id: string
  type: ExerciseType
  prompt: string
  promptLanguage?: 'sk' | 'de'
  answer: string
  acceptedAnswers: string[]
  hint: string
  explanation: string
  tags: Topic[]
  skillTags: SkillId[]
  difficulty: Level
  practice?: 'focused' | 'mixed'
  diagnostics?: { skill: SkillId; patterns: string[]; hint: string }[]
  lessonId?: string
  theorySectionId?: string
  errorRules?: { pattern: string; theorySectionId: string }[]
  readingFacts?: string[][]
  support?: ExerciseSupport
}

export const cardModes = {
  word: 'Slovíčka',
  phrase: 'Frázy',
  transformation: 'Gramatické tvary',
  verb: 'Slovesné tvary',
  context: 'Vety v kontexte',
} as const

export type CardMode = keyof typeof cardModes

export interface Card {
  id: string
  mode: CardMode
  front: string
  frontLanguage?: 'de' | 'sk'
  back: string
  tags: Topic[]
  example?: string
}

export const wordKinds = {
  noun: 'Podstatné meno',
  verb: 'Sloveso',
  adjective: 'Prídavné meno',
  adverb: 'Príslovka',
  phrase: 'Fráza',
  other: 'Iné',
} as const

export interface Word {
  id: string
  german: string
  slovak: string
  kind: keyof typeof wordKinds
  article: '' | 'der' | 'die' | 'das'
  plural: string
  present: string
  perfect: string
  example: string
  learned: boolean
  contextEntryId?: string
  contextMeaning?: string
}

export interface VocabularyExposure {
  term: string
  translation: string
  opens: number
  lastSeen: number
}

export interface Reading {
  id: string
  title: string
  description: string
  difficulty: Level
  minutes: number
  paragraphs: string[]
  glossary: Record<string, string>
  glossaryLanguage?: 'sk' | 'de'
  questions: Exercise[]
}

export type Rating = 'again' | 'hard' | 'good' | 'easy'
export interface CardReview {
  due: number
  interval: number
  successful: number
}

export interface Attempt {
  exerciseId: string
  type: ExerciseType
  result: 'correct' | 'incorrect'
  topic: Topic
  skill?: SkillId
  ruleId?: string
  at: number
}

export interface WritingEntry {
  id: string
  assignmentId?: string
  prompt: string
  promptLanguage?: 'sk' | 'de'
  text: string
  checked: string[]
  at: number
}

export interface CourseWriting {
  instruction: string
  language?: 'sk'
  minWords: number
  checklist: string[]
}

export interface CourseUnit {
  id: string
  level: Level
  title: string
  goal: string
  requires: string[]
  exercises: Exercise[]
  skills?: Topic[]
  guide?: { rule: string; example: string; language?: 'de' }
  minCorrect: number
  minSentences?: number
  vocabulary?: Card[]
  reading?: { id: string; minCorrect: number }
  writing?: CourseWriting
}

export interface ShortResponse {
  prompt: string
  note: string
  language?: 'de'
}

export interface DailyPlan {
  date: string
  cardIds: string[]
  exerciseIds: string[]
  position: number
  response?: ShortResponse
}

export interface MixedPractice {
  exerciseId: string
  reason: 'repair' | 'combine' | 'review' | 'focus'
  skill?: SkillId
  position: number
}

export interface LessonAnswer {
  exerciseId: string
  response: string
  correct: boolean
  ruleId?: string
}

export interface LessonProgress {
  step: number
  answers: LessonAnswer[]
  learnedAt?: number
  reviewedAt?: number
}

export interface StudyData {
  attempts: Attempt[]
  reviews: Record<string, CardReview>
  words: Word[]
  vocabularyExposure?: Record<string, VocabularyExposure>
  writing: WritingEntry[]
  checkpoints: Record<string, number>
  sentenceLevel?: Level | ''
  daily?: DailyPlan
  mixed?: MixedPractice
  lessons?: Record<string, LessonProgress>
  activeLessonId?: string
}
