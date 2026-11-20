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
  vocabulary: 'Slovná zásoba',
} as const

export type Topic = keyof typeof topics
export type Level = 'A1' | 'A2'
export type ExerciseType = 'sentence' | 'grammar' | 'correction' | 'reading' | 'reverse'

export interface Exercise {
  id: string
  type: ExerciseType
  prompt: string
  answer: string
  acceptedAnswers: string[]
  hint: string
  explanation: string
  tags: Topic[]
  difficulty: Level
  readingFacts?: string[][]
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
  prompt: string
  text: string
  checked: string[]
  at: number
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
