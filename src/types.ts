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
  difficulty: Level
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

export interface DailyPlan {
  date: string
  cardIds: string[]
  exerciseIds: string[]
  position: number
}

export interface StudyData {
  attempts: Attempt[]
  reviews: Record<string, CardReview>
  words: Word[]
  writing: WritingEntry[]
  checkpoints: Record<string, number>
  sentenceLevel?: Level | ''
  daily?: DailyPlan
}
