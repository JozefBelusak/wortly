import type { Exercise, ExerciseType, Level, Topic } from '../types'

export type ExerciseRow = [
  prompt: string,
  answer: string,
  tags: Topic[],
  hint: string,
  explanation: string,
  acceptedAnswers?: string[],
]

export function makeExercises(type: ExerciseType, prefix: string, difficulty: Level, rows: ExerciseRow[]): Exercise[] {
  return rows.map(([prompt, answer, tags, hint, explanation, acceptedAnswers = []], index) => ({
    id: `${prefix}-${index + 1}`, type, difficulty, prompt, answer, tags, hint, explanation, acceptedAnswers,
  }))
}
