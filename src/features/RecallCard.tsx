import { Eye, RotateCcw, Square, Volume2 } from 'lucide-react'
import { useState } from 'react'
import { ContextText } from '../components/ContextText'
import { useGermanSpeech } from '../hooks/useGermanSpeech'
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
  const { playing, message, speak } = useGermanSpeech()
  const { example } = card
  return <article className="panel recall-card">
    <div className="exercise-topic"><span className="tag">{cardModes[card.mode]}</span></div>
    <p className="recall-label">{card.mode === 'verb' || card.mode === 'transformation' ? 'Vybav si nemecký tvar' : card.frontLanguage === 'de' ? 'Welcher Ausdruck passt?' : 'Povedz po nemecky'}</p>
    <h2 lang={card.frontLanguage}><ContextText text={card.front} mixed={card.frontLanguage !== 'de'} disabled={!revealed} /></h2>
    {revealed ? <>
      <div className="recall-answer">
        <div className="recall-line">
          <p lang="de"><ContextText text={card.back} /></p>
          <SpeechButton label={card.mode === 'context' ? 'vetu' : 'výraz'} playing={playing === 'answer'} onClick={() => speak('answer', card.back)} />
        </div>
        {example && <div className="recall-line recall-example">
          <small lang={example.startsWith('Množné číslo:') ? undefined : 'de'}><ContextText text={example} mixed={example.startsWith('Množné číslo:')} /></small>
          <SpeechButton label={example.startsWith('Množné číslo:') ? 'množné číslo' : 'vetu'} playing={playing === 'example'} onClick={() => speak('example', example)} />
        </div>}
        {message && <small className="speech-message" role="status">{message}</small>}
      </div>
      <fieldset className="rating-field"><legend>Ako ľahko si si odpoveď vybavil?</legend><div className="rating-grid">{ratings.map(([value, label, delay]) => <button key={value} className="button button-secondary" onClick={() => onRate(value)}><strong>{value === 'again' && <RotateCcw size={14} />} {label}</strong><span>{delay}</span></button>)}</div></fieldset>
    </> : <button className="button button-primary" onClick={() => setRevealed(true)}><Eye size={17} /> Odhaľ odpoveď</button>}
  </article>
}

function SpeechButton({ label, playing, onClick }: { label: string; playing: boolean; onClick: () => void }) {
  return <button className="speech-button" type="button" onClick={onClick}>
    {playing ? <Square size={15} /> : <Volume2 size={17} />} {playing ? 'Zastaviť' : 'Prehrať'} {label}
  </button>
}
