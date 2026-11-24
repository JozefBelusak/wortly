import { guidedLessons, checkpointPassing } from '../data/lessons/catalog'
import type { Lesson } from '../data/lessons/model'
import type { Attempt, LessonProgress, Level, StudyData } from '../types'

export const emptyLesson: LessonProgress = { step: 0, answers: [] }
export const reviewDelay = 7 * 86_400_000
const recentErrors = 30 * 86_400_000

export type LessonStatus = 'new' | 'learning' | 'practicing' | 'learned' | 'review'
export const lessonStatusLabels = { new: 'Nová', learning: 'Učím sa', practicing: 'Precvičujem', learned: 'Zvládnutá', review: 'Na zopakovanie' }

export function lessonSteps(lesson: Lesson) {
  return [
    ...lesson.sections.flatMap(section => [
      { kind: 'theory' as const, section },
      ...section.exercises.map(exercise => ({ kind: 'practice' as const, exercise })),
    ]),
    { kind: 'transfer' as const, exercise: lesson.transfer },
    { kind: 'reading' as const, exercise: lesson.reading.questions[0] },
  ]
}

export function masteredLevel(data: StudyData, level: Level) {
  return guidedLessons.filter(lesson => lesson.level === level).every(lesson => !!data.lessons?.[lesson.id]?.learnedAt)
}

export function ruleMisses(attempts: Attempt[], ruleId: string, since = 0, now = Date.now()) {
  let count = 0
  for (let index = attempts.length - 1; index >= 0; index--) {
    const attempt = attempts[index]
    if (attempt.at < Math.max(since, now - recentErrors)) break
    if (attempt.ruleId !== ruleId) continue
    if (attempt.result === 'correct') break
    count++
  }
  return count
}

export function lessonStatus(lesson: Lesson, data: StudyData, now = Date.now()): LessonStatus {
  const progress = data.lessons?.[lesson.id]
  if (!progress) return 'new'
  if (progress.learnedAt) {
    const last = progress.reviewedAt ?? progress.learnedAt
    if (now - last >= reviewDelay || lesson.sections.some(section => ruleMisses(data.attempts, section.id, progress.learnedAt, now) >= 2)) return 'review'
    return 'learned'
  }
  if (progress.answers.length === lesson.checkpoint.length && progress.answers.filter(answer => answer.correct).length < checkpointPassing) return 'review'
  if (progress.step >= lesson.sections.length * 3) return 'practicing'
  return progress.step > 0 ? 'learning' : 'new'
}
