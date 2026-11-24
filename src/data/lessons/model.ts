import type { SkillId } from '../grammarSkills'
import { skillTopic } from '../grammarSkills'
import type { Exercise, Level, Reading } from '../../types'

export interface Lesson {
  id: string
  level: Level
  title: string
  goal: string
  prerequisites: string[]
  tags: SkillId[]
  sections: TheorySection[]
  transfer: Exercise
  reading: Reading
  checkpoint: Exercise[]
  practice: Exercise[]
}

export interface TheorySection {
  id: string
  title: string
  explanation: string
  rule: string
  examples: string[]
  mistake: [wrong: string, corrected: string]
  table?: [string, string][]
  tags: SkillId[]
  exercises: Exercise[]
  reviewExercises: Exercise[]
}

export type TaskSeed = [
  prompt: string, answer: string, alternatives?: string[],
  kind?: 'grammar' | 'sentence' | 'correction' | 'reverse', language?: 'de' | 'sk',
]
export type SectionSeed = [
  title: string, explanation: string, rule: string, example: string,
  mistake: [wrong: string, corrected: string], skill: SkillId,
  exercises: [TaskSeed, TaskSeed], table?: [string, string][],
]
export type LessonSeed = {
  id: string
  level: Level
  title: string
  goal: string
  tags: SkillId[]
  sections: [SectionSeed, SectionSeed, ...SectionSeed[]]
  transfer: TaskSeed
  reading: [title: string, text: string, question: TaskSeed]
  test?: TaskSeed[]
  review?: Record<number, [TaskSeed, TaskSeed]>
  errorRules?: [pattern: string, sectionIndex: number][]
  prerequisites?: string[]
}

export function task(seed: TaskSeed, id: string, level: Level, tags: SkillId[], lessonId: string, section: Pick<TheorySection, 'id' | 'rule' | 'explanation'>): Exercise {
  const [prompt, answer, acceptedAnswers = [], type = 'grammar', language = type === 'sentence' ? 'sk' : 'de'] = seed
  return {
    id, type, prompt, answer, acceptedAnswers, difficulty: level, lessonId, theorySectionId: section.id,
    promptLanguage: language, skillTags: tags, tags: [...new Set(tags.map(skillTopic))],
    hint: section.rule, explanation: section.explanation,
  }
}
