import { topics } from '../types'
import type { Card, CardReview, DailyPlan, Exercise, Rating, StudyData, Topic, Word } from '../types'

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

export function makeDailyPlan(data: StudyData, cards: Card[], sentences: Exercise[], grammar: Exercise[], corrections: Exercise[], now = new Date()): DailyPlan {
  const date = localDate(now)
  const rotation = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / day)
  const weak = new Map(weakTopics(data, now.getTime()).map(({ topic, count }) => [topic, count]))
  const priority = (item: Card | Exercise) => item.tags.reduce((sum, tag) => sum + (weak.get(tag) ?? 0), 0)

  function pick<T extends Card | Exercise>(pool: T[], count: number, extraPriority: (item: T) => number = () => 0) {
    const shift = rotation % pool.length
    const rotated = [...pool.slice(shift), ...pool.slice(0, shift)]
    return rotated.sort((a, b) => priority(b) + extraPriority(b) - priority(a) - extraPriority(a)).slice(0, count).map(item => item.id)
  }

  const recall = cards.filter(card => card.mode === 'word' || card.mode === 'phrase')
  const cardIds = pick(recall, 5, card => !data.reviews[card.id] || data.reviews[card.id].due <= now.getTime() ? 100 : 0)
  const exerciseIds = [...pick(sentences, 5), ...pick(grammar, 3), ...pick(corrections, 2)]
  return { date, cardIds, exerciseIds, position: 0 }
}

export function formatDate(date: number | Date, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat('sk-SK', options).format(date)
}
