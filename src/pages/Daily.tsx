import { BookOpen, CircleCheck, ClipboardList, Clock3 } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { ContextText } from '../components/ContextText'
import { PageIntro } from '../components/Layout'
import { pageLink } from '../components/navigation'
import { availableCards, availablePractice } from '../data/curriculum'
import { transformations } from '../data/grammar'
import { shortResponses } from '../data/shortResponses'
import { Exercise, ExercisePosition } from '../features/Exercise'
import { RecallCard } from '../features/RecallCard'
import type { Study } from '../hooks/useStudy'
import type { ShortResponse } from '../types'
import { localDate, makeDailyPlan, weakTopics, wordCard } from '../utils/study'

const sections = [
  { label: 'Vybavenie slov a fráz', count: 5 },
  { label: 'Tvorba a preklad viet', count: 5 },
  { label: 'Gramatické tvary', count: 3 },
  { label: 'Oprava chybných viet', count: 2 },
  { label: 'Vlastná veta', count: 1 },
]
const total = sections.reduce((sum, section) => sum + section.count, 0)

export function Daily({ study }: { study: Study }) {
  const { data, setData } = study
  const exercises = availablePractice(data)
  const pool = [...availableCards(data), ...data.words.map(wordCard)]
  const date = localDate()
  const plan = data.daily?.date === date ? data.daily : undefined
  const position = plan?.position ?? 0
  const response = plan?.response ?? shortResponses.A2[0]
  const card = plan && pool.find(item => item.id === plan.cardIds[position])
  const exercise = plan && exercises.find(item => item.id === plan.exerciseIds[position - plan.cardIds.length])
  const weak = weakTopics(data).slice(0, 3)

  function advance() {
    setData(current => current.daily?.date === date
      ? { ...current, daily: { ...current.daily, position: current.daily.position + 1 } }
      : current)
  }

  return <>
    <PageIntro title="Denné opakovanie" description="Krátky tréning z piatich typov úloh podľa tém, v ktorých sa ti chyby opakujú." action={<span className="level-label"><Clock3 size={16} /> 10–15 minút</span>} />
    <div className="training-layout">
      <section className="training-main">
        {!plan ? <div className="panel finish-panel daily-start"><ClipboardList size={30} /><h2>Dnešný tréning</h2><p>Pripravíme 16 úloh. Keď sa sem dnes vrátiš, pokračuješ pri poslednej úlohe.</p><button className="button button-primary" onClick={() => setData(current => ({ ...current, daily: makeDailyPlan(current, pool,
          exercises.filter(item => item.type === 'sentence'),
          exercises.filter(item => item.type === 'grammar' && (item.lessonId
            || (!item.prompt.includes('___') && (item.practice === 'mixed' || transformations.some(form => form.id === item.id))))),
          exercises.filter(item => item.type === 'correction'),
          new Date(), exercises,
        ) }))}>Začať opakovanie</button></div>
          : position >= total ? <div className="panel finish-panel"><CircleCheck size={30} /><h2>Dnešné opakovanie je hotové</h2><p>Prešiel si všetkých {total} úloh. Zajtra tu nájdeš ďalší výber.</p><a className="button button-primary" href={pageLink('progress')}>Zobraziť progres</a></div>
            : <><ExercisePosition position={position + 1} total={total} />
              {card ? <RecallCard key={card.id} card={card} onRate={rating => { study.rate(card.id, rating); advance() }} />
                : exercise ? <Exercise key={exercise.id} exercise={exercise} study={study} onNext={advance} />
                  : <DailySentence response={response} onSave={text => {
                    const at = Date.now()
                    setData(current => ({ ...current, writing: [{ id: String(at), prompt: response.prompt, promptLanguage: response.language, text, checked: [], at }, ...current.writing] }))
                    advance()
                  }} />}
            </>}
      </section>
      <aside className="training-sidebar">
        <div className="panel side-note"><BookOpen size={21} /><h2>Plán opakovania</h2><ul className="daily-outline">{sections.map((item, index) => {
          const start = sections.slice(0, index).reduce((sum, section) => sum + section.count, 0)
          const done = position >= start + item.count
          return <li key={item.label} aria-current={plan && position >= start && !done ? 'step' : undefined}>{done ? <CircleCheck size={16} /> : <span>{item.count}</span>}{item.label}</li>
        })}</ul>
        {weak.length > 0 && <div className="tag-list">{weak.map(item => <span className="tag" key={item.topic}>{item.name}</span>)}</div>}</div>
      </aside>
    </div>
  </>
}

function DailySentence({ response, onSave }: { response: ShortResponse; onSave: (text: string) => void }) {
  const [text, setText] = useState('')
  function submit(event: FormEvent) {
    event.preventDefault()
    if (text.trim()) onSave(text.trim())
  }
  return <form className="panel exercise-panel" onSubmit={submit}><p className="exercise-prompt" lang={response.language}><ContextText text={response.prompt} mixed={response.language !== 'de'} /></p><label className="field-label" htmlFor="daily-writing">Tvoja veta po nemecky</label><textarea id="daily-writing" lang="de" rows={3} value={text} onChange={event => setText(event.target.value)} placeholder="Napíš vlastnú vetu…" /><p className="muted" lang={response.language}><ContextText text={response.note} mixed={response.language !== 'de'} /></p><button className="button button-primary" disabled={!text.trim()}>Uložiť vetu a dokončiť</button></form>
}
