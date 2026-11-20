import { shortResponses } from '../data/shortResponses'
import { levels, topics } from '../types'
import { practicePicker } from './spiralPractice'
import type { Card, CardReview, DailyPlan, Exercise, MixedPractice, Rating, StudyData, Topic, Word } from '../types'

const day = 86_400_000

export function scheduleReview(current: CardReview | undefined, rating: Rating, now = Date.now()): CardReview {
  const previous = current?.interval ?? 0
  const interval = {
    again: 10 / 1440,
    hard: Math.max(1, Math.round(previous * 1.25)),
    good: Math.max(3, Math.round(previous * 2)),
    easy: Math.max(5, Math.round(previous * 3)),
  }[rating]
  const successful = rating === 'again' ? 0 : (current?.successful ?? 0) + Number(rating === 'good' || rating === 'easy')
  return { due: now + interval * day, interval, successful }
}

export const wordHeading = (word: Word) => [word.kind === 'noun' ? word.article : '', word.german].filter(Boolean).join(' ')

export function wordCard(word: Word): Card {
  return {
    id: `word-${word.id}`,
    mode: word.kind === 'phrase' ? 'phrase' : 'word',
    front: word.slovak,
    back: [wordHeading(word), word.kind === 'verb' ? word.present : '', word.kind === 'verb' ? word.perfect : ''].filter(Boolean).join(' · '),
    example: word.example || (word.plural ? `Množné číslo: ${word.plural}` : undefined),
    tags: ['vocabulary'],
  }
}

export function dueCards(cards: Card[], reviews: StudyData['reviews'], now = Date.now()) {
  return cards.filter(card => !reviews[card.id] || reviews[card.id].due <= now)
    .sort((a, b) => (reviews[a.id]?.due ?? now) - (reviews[b.id]?.due ?? now))
}

export function weakTopics(data: StudyData, now = Date.now()) {
  const counts = new Map<Topic, number>()
  for (const attempt of data.attempts) {
    if (attempt.result === 'incorrect' && attempt.at >= now - 30 * day) {
      counts.set(attempt.topic, (counts.get(attempt.topic) ?? 0) + 1)
    }
  }
  return [...counts].sort((a, b) => b[1] - a[1]).map(([topic, count]) => ({ topic, count, name: topics[topic] }))
}

export function studyTotals(data: StudyData, seed: Card[]) {
  const words = seed.filter(card => card.mode === 'word' && (data.reviews[card.id]?.successful ?? 0) >= 2).length
    + data.words.filter(word => word.learned || (data.reviews[wordCard(word).id]?.successful ?? 0) >= 2).length
  const sentences = new Set(data.attempts.filter(attempt => attempt.result === 'correct' && (attempt.type === 'sentence' || attempt.type === 'correction')).map(attempt => attempt.exerciseId)).size
  return { words, sentences, weak: weakTopics(data) }
}

export function localDate(now = new Date()) {
  return [now.getFullYear(), now.getMonth() + 1, now.getDate()].map(value => String(value).padStart(2, '0')).join('-')
}

export function makeDailyPlan(data: StudyData, cards: Card[], sentences: Exercise[], grammar: Exercise[], corrections: Exercise[], now = new Date(), catalog = [...sentences, ...grammar, ...corrections]): DailyPlan {
  const date = localDate(now)
  const rotation = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / day)
  const weak = new Map(weakTopics(data, now.getTime()).map(({ topic, count }) => [topic, count]))
  const priority = (item: Card | Exercise) => item.tags.reduce((sum, tag) => sum + (weak.get(tag) ?? 0), 0)

  function rotate<T>(pool: T[]) {
    const shift = pool.length ? rotation % pool.length : 0
    return [...pool.slice(shift), ...pool.slice(0, shift)]
  }

  const choose = practicePicker(catalog, data.attempts, now.getTime())
  let previous: MixedPractice | undefined
  function pickExercises(pool: Exercise[], count: number, repairBank?: Exercise[]) {
    let remaining = rotate(pool).sort((a, b) => priority(b) - priority(a))
    const picked: string[] = []
    for (let index = 0; index < count && remaining.length; index++) {
      const position = (previous?.position ?? rotation % 4) + 1
      const repair = index === 0 && repairBank ? choose(repairBank, position, previous) : undefined
      const next = repair?.reason === 'repair' ? repair : choose(remaining, position, previous)
      if (!next) break
      picked.push(next.exerciseId)
      remaining = remaining.filter(item => item.id !== next.exerciseId)
      previous = next
    }
    return picked
  }

  const recall = cards.filter(card => card.mode === 'word' || card.mode === 'phrase')
  const cardIds = dueCards(rotate(recall), data.reviews, now.getTime())
    .concat(rotate(recall.filter(card => data.reviews[card.id]?.due > now.getTime())))
    .slice(0, 5).map(card => card.id)
  const exerciseIds = [
    ...pickExercises(sentences, 5),
    ...pickExercises(grammar, 3, catalog.filter(item => item.type === 'grammar')),
    ...pickExercises(corrections, 2),
  ]
  const byId = new Map(catalog.map(exercise => [exercise.id, exercise]))
  const practicedLevel = exerciseIds.reduce((highest, id) => {
    const exercise = byId.get(id)
    return exercise ? Math.max(highest, levels.indexOf(exercise.difficulty)) : highest
  }, 0)
  const responses = shortResponses[levels[practicedLevel]]
  const response = responses[rotation % responses.length]
  return { date, cardIds, exerciseIds, position: 0, response }
}

export function formatDate(date: number | Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('sk-SK', options).format(date)
}
