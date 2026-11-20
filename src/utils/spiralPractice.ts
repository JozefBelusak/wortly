import { matchingSkill } from '../data/grammarSkills'
import type { SkillId } from '../data/grammarSkills'
import { levels } from '../types'
import type { Attempt, Exercise, MixedPractice } from '../types'

const recent = 30 * 86_400_000

interface Evidence {
  correct: Set<string>
  misses: number
  lastMiss: number
}

export function isCombined(exercise: Exercise) {
  return exercise.practice ? exercise.practice === 'mixed'
    : exercise.skillTags.length >= 3 && !exercise.prompt.includes('___')
}

export function practicePicker(catalog: Exercise[], attempts: Attempt[], now = Date.now()) {
  const byId = new Map(catalog.map(exercise => [exercise.id, exercise]))
  const evidence = new Map<SkillId, Evidence>()
  const lastAttempt = new Map<string, number>()
  const correctByLevel = levels.map(() => new Set<string>())
  const focusedForms = new Map<SkillId, number>()

  for (const exercise of catalog) {
    if (!isCombined(exercise)) {
      for (const skill of exercise.skillTags) focusedForms.set(skill, (focusedForms.get(skill) ?? 0) + 1)
    }
  }

  function skillEvidence(skill: SkillId) {
    const state = evidence.get(skill) ?? { correct: new Set<string>(), misses: 0, lastMiss: -1 }
    evidence.set(skill, state)
    return state
  }

  attempts.forEach((attempt, position) => {
    const exercise = byId.get(attempt.exerciseId)
    if (!exercise) return
    lastAttempt.set(exercise.id, position)
    if (attempt.result === 'correct') {
      correctByLevel[levels.indexOf(exercise.difficulty)].add(exercise.id)
      for (const skill of exercise.skillTags) {
        const state = skillEvidence(skill)
        state.correct.add(exercise.id)
        state.misses = 0
      }
      return
    }

    const skill = attempt.skill ?? (exercise.practice !== 'mixed' ? matchingSkill(exercise.skillTags, attempt.topic) : undefined)
    if (!skill || attempt.at < now - recent || !exercise.skillTags.includes(skill)) return
    const state = skillEvidence(skill)
    state.misses++
    state.lastMiss = position
  })

  const highest = catalog.reduce((rank, exercise) => Math.max(rank, levels.indexOf(exercise.difficulty)), 0)
  const stage = highest > 1 || correctByLevel[0].size >= 3 || correctByLevel[1].size > 0 ? highest : 0
  const needsRepair = [...evidence].filter(([, state]) => state.misses >= 2)
    .sort(([, a], [, b]) => b.lastMiss - a.lastMiss || b.misses - a.misses)

  function knows(skill: SkillId) {
    const required = (focusedForms.get(skill) ?? 0) === 1 ? 1 : 2
    return (evidence.get(skill)?.correct.size ?? 0) >= required
  }

  function ready(exercise: Exercise) {
    if (!isCombined(exercise)) return false
    const material = exercise.skillTags.filter(skill => skill !== 'meaning')
    const target = Math.max(2, Math.ceil(material.length / 2))
    return material.filter(knows).length >= target
  }

  function pick(items: Exercise[], byFocus = false) {
    function score(exercise: Exercise) {
      if (!byFocus) return 0
      return Math.max(0, ...exercise.skillTags.map(skill => {
        const seen = evidence.get(skill)?.correct.size ?? 0
        return knows(skill) ? 0 : seen === 1 ? 2 : 1
      }))
    }

    return [...items].sort((a, b) => score(b) - score(a)
      || (lastAttempt.get(a.id) ?? -1) - (lastAttempt.get(b.id) ?? -1))[0]
  }

  return function choose(items: Exercise[], position: number, previous?: MixedPractice): MixedPractice | undefined {
    if (!items.length) return undefined
    const candidates = items.length > 1 ? items.filter(item => item.id !== previous?.exerciseId) : items
    const selection = (exercise: Exercise, reason: MixedPractice['reason'], skill?: SkillId): MixedPractice =>
      ({ exerciseId: exercise.id, reason, skill, position })

    for (const [skill] of needsRepair) {
      const options = candidates.filter(item => !isCombined(item) && item.skillTags.includes(skill))
      const shortest = Math.min(...options.map(item => item.skillTags.length))
      const repair = pick(options.filter(item => item.skillTags.length === shortest))
      if (repair) return selection(repair, 'repair', skill)
    }

    const feasible = candidates.filter(exercise => levels.indexOf(exercise.difficulty) <= stage)
    const withinStage = feasible.length ? feasible : candidates
    const older = withinStage.filter(exercise => levels.indexOf(exercise.difficulty) < stage)
    const repairedSkill = previous?.reason === 'repair' ? previous.skill : undefined
    if (repairedSkill) {
      const combined = pick(withinStage.filter(exercise => exercise.skillTags.includes(repairedSkill) && ready(exercise)))
      if (combined) return selection(combined, 'combine')
    }
    if (position % 4 === 0) {
      const review = pick(older.filter(exercise => !isCombined(exercise) || ready(exercise)))
      if (review) return selection(review, 'review')
    }

    const recentStage = withinStage.filter(exercise => levels.indexOf(exercise.difficulty) === stage)
    const current = recentStage.length ? recentStage : withinStage
    if (position % (stage >= 2 ? 4 : 2) !== 1 || repairedSkill) {
      const combined = pick(current.filter(ready)) ?? pick(withinStage.filter(ready))
      if (combined) return selection(combined, 'combine')
    }

    const focus = pick(current.filter(exercise => !isCombined(exercise)), true)
      ?? pick(withinStage.filter(exercise => !isCombined(exercise)), true)
    if (focus) return selection(focus, 'focus')
    return selection(pick(withinStage), 'review')
  }
}
