import { Eye, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { cardModes } from '../types'
import type { Card, Rating } from '../types'

const ratings: [Rating, string, string][] = [
  ['again', 'Znova', 'O 10 minút'],
  ['hard', 'Ťažké', 'Najskôr zajtra'],
  ['good', 'Dobre', 'Aspoň o 3 dni'],
  ['easy', 'Ľahké', 'Aspoň o 5 dní'],
]

export function RecallCard({ card, onRate }: { card: Card; onRate: (rating: Rating) => void }) {
  const [revealed, setRevealed] = useState(false)
  return <article className="panel recall-card">
    <div className="exercise-topic"><span className="tag">{cardModes[card.mode]}</span></div>
    <p className="recall-label">{card.mode === 'verb' || card.mode === 'transformation' ? 'Vybav si nemecký tvar' : 'Povedz po nemecky'}</p>
    <h2>{card.front}</h2>
    {revealed ? <>
      <div className="recall-answer" aria-live="polite"><p lang="de">{card.back}</p>{card.example && <small>{card.example}</small>}</div>
      <fieldset className="rating-field"><legend>Ako ľahko si si odpoveď vybavil?</legend><div className="rating-grid">{ratings.map(([value, label, delay]) => <button key={value} className="button button-secondary" onClick={() => onRate(value)}><strong>{value === 'again' && <RotateCcw size={14} />} {label}</strong><span>{delay}</span></button>)}</div></fieldset>
    </> : <button className="button button-primary" onClick={() => setRevealed(true)}><Eye size={17} /> Odhaľ odpoveď</button>}
  </article>
}
