import { useEffect, useState } from 'react'
import type { SkillId } from '../data/grammarSkills'
import type { Attempt, Exercise, Rating, StudyData, Topic } from '../types'
import { scheduleReview } from '../utils/study'

const key = 'deutschheft.study.v1'
const empty: StudyData = { attempts: [], reviews: {}, words: [], writing: [], checkpoints: {} }

function load(): StudyData {
  try {
    const raw = localStorage.getItem(key)
    return raw ? { ...empty, ...JSON.parse(raw) } : empty
  } catch {
    return empty
  }
}

export function useStudy() {
  const [data, setData] = useState(load)
  const [saveFailed, setSaveFailed] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(data))
      setSaveFailed(false)
    } catch {
      setSaveFailed(true)
    }
  }, [data])

  function record(exercise: Exercise, result: Attempt['result'], topic: Topic = exercise.tags[0] ?? 'vocabulary', skill?: SkillId) {
    const attempt: Attempt = { exerciseId: exercise.id, type: exercise.type, result, topic, skill, at: Date.now() }
    setData(current => ({ ...current, attempts: [...current.attempts, attempt] }))
  }

  function rate(id: string, rating: Rating) {
    setData(current => ({ ...current, reviews: { ...current.reviews, [id]: scheduleReview(current.reviews[id], rating) } }))
  }

  function checkpoint(section: string, index: number) {
    setData(current => ({ ...current, checkpoints: { ...current.checkpoints, [section]: index } }))
  }

  return { data, setData, record, rate, checkpoint, saveFailed }
}

export type Study = ReturnType<typeof useStudy>
