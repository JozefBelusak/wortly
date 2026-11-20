import type { Exercise, ExerciseSupport, ExerciseType, Level, Topic } from '../types'
import { inferSkillTags } from './grammarSkills'

export type ExerciseRow = [
  prompt: string,
  answer: string,
  tags: Topic[],
  hint: string,
  explanation: string,
  acceptedAnswers?: string[],
  support?: ExerciseSupport,
]

export function makeExercises(type: ExerciseType, prefix: string, difficulty: Level, rows: ExerciseRow[]): Exercise[] {
  return rows.map(([prompt, answer, tags, hint, explanation, acceptedAnswers = [], support], index) => ({
    id: `${prefix}-${index + 1}`, type, difficulty, prompt, answer, tags, hint, explanation, acceptedAnswers, support,
    skillTags: inferSkillTags(type, tags, prompt, answer),
  }))
}
