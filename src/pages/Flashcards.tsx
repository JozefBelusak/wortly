import { ChevronDown, Layers3 } from 'lucide-react'
import { useState } from 'react'
import { PageIntro } from '../components/Layout'
import { pageLink } from '../components/navigation'
import { availableCards, availableUnits } from '../data/curriculum'
import { ExercisePosition } from '../features/Exercise'
import { RecallCard } from '../features/RecallCard'
import type { Study } from '../hooks/useStudy'
import { cardModes } from '../types'
import type { CardMode } from '../types'
import { dueCards, formatDate, wordCard } from '../utils/study'

export function Flashcards({ study, unitId }: { study: Study; unitId: string | null }) {
  const [mode, setMode] = useState('')
  const [scope, setScope] = useState('due')
  const [completed, setCompleted] = useState<string[]>([])
  const unit = availableUnits(study.data).find(item => item.id === unitId && item.vocabulary?.length)
  const cards = unit?.vocabulary ?? [...availableCards(study.data), ...study.data.words.map(wordCard)]
  const pool = cards.filter(card => !mode || card.mode === mode)
  const scheduled = dueCards(pool, study.data.reviews)
  const available = (scope === 'due' ? scheduled : pool).filter(card => !completed.includes(card.id))
  const card = available[0]
  const nextDate = Math.min(...pool.flatMap(item => {
    const review = study.data.reviews[item.id]
    return review?.due > Date.now() ? [review.due] : []
  }))

  return <>
    {unit && <a className="text-link back-link" href={pageLink('course', { lekcia: unit.id })}>Späť na lekciu</a>}
    <PageIntro title={unit ? 'Kartičky · ' + unit.title : 'Kartičky'} description="Najskôr si odpoveď vybav, potom ju odhaľ a ohodnoť si pamäť." />
    <div className="training-layout">
      <section className="training-main">
        <div className="toolbar">
          <label className="inline-field">Režim <span className="select-wrap"><select value={mode} onChange={event => { setMode(event.target.value); setCompleted([]) }}><option value="">Všetky kartičky</option>{(Object.keys(cardModes) as CardMode[]).map(item => <option key={item} value={item}>{cardModes[item]}</option>)}</select><ChevronDown size={16} /></span></label>
          <div className="segmented" aria-label="Výber kartičiek"><button aria-pressed={scope === 'due'} onClick={() => { setScope('due'); setCompleted([]) }}>Na opakovanie</button><button aria-pressed={scope === 'all'} onClick={() => { setScope('all'); setCompleted([]) }}>Všetky</button></div>
        </div>
        {card ? <><ExercisePosition position={completed.length + 1} total={completed.length + available.length} label="Kartička" /><RecallCard key={card.id} card={card} onRate={rating => { study.rate(card.id, rating); setCompleted([...completed, card.id]) }} /></> :
          <div className="panel finish-panel"><Layers3 size={28} /><h2>Kartičky máš prejdené</h2>{Number.isFinite(nextDate) && <p>Najbližšie opakovanie {formatDate(nextDate, { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}.</p>}<button className="button button-secondary" onClick={() => { setScope('all'); setCompleted([]) }}>Prejsť všetky kartičky</button></div>}
      </section>
      <aside className="training-sidebar"><div className="panel side-note"><Layers3 size={20} /><h2>Na opakovanie</h2><p>V tomto výbere máš {scheduled.length} kartičiek pripravených na opakovanie. Termín ďalšieho opakovania sa upraví podľa hodnotenia.</p><a className="text-link" href={pageLink('vocabulary')}>Otvoriť môj slovník</a></div></aside>
    </div>
  </>
}
