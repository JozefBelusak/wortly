import { ChevronDown, CircleCheck, NotebookPen } from 'lucide-react'
import { useState } from 'react'
import { PageIntro } from '../components/Layout'
import { pageLink } from '../components/navigation'
import { availableAdvancedExercises, availableSentences } from '../data/curriculum'
import { corrections } from '../data/corrections'
import { grammar } from '../data/grammar'
import { reverseSentences } from '../data/sentences'
import { Exercise, ExercisePosition } from '../features/Exercise'
import type { Study } from '../hooks/useStudy'
import { levels, topics } from '../types'
import type { Exercise as Item, Topic } from '../types'

const modes = {
  sentences: { title: 'Tvorba viet', description: 'Prelož alebo preformuluj vetu podľa zadania. Precvičíš si tak prirodzené nemecké vyjadrovanie.' },
  grammar: { title: 'Gramatika', description: 'Vyber si tému a precvič ju dopĺňaním tvarov alebo skladaním viet.' },
  correction: { title: 'Oprava viet', description: 'Nájdi chybu v nemeckej vete a prepíš celú vetu správne.' },
  translation: { title: 'Preklad', description: 'Precvič si písanie po nemecky alebo porozumenie nemeckému textu.' },
}
type Mode = keyof typeof modes

export function Training({ mode, study, initialTopic }: { mode: Mode; study: Study; initialTopic: string | null }) {
  const [requestedTopic, setTopic] = useState(initialTopic ?? '')
  const [direction, setDirection] = useState('de')
  const sentences = availableSentences(study.data)
  const grammarBank = [...grammar, ...availableAdvancedExercises(study.data).filter(exercise => exercise.type === 'grammar')]
  const topicsInUse = new Set([...grammarBank, ...sentences, ...corrections].flatMap(exercise => exercise.tags))
  const grammarTopics = (Object.keys(topics) as Topic[]).filter(topic => topicsInUse.has(topic))
  const topic = mode === 'grammar' ? grammarTopics.find(item => item === requestedTopic) ?? '' : ''
  const eligibleLevels = levels.filter(level => sentences.some(item => item.difficulty === level))
  const level = mode === 'sentences' ? eligibleLevels.find(item => item === study.data.sentenceLevel) ?? '' : ''
  const { title, description } = modes[mode]
  const translations = direction === 'sk' ? reverseSentences : sentences.filter(exercise => exercise.promptLanguage !== 'de')
  const bank = mode === 'grammar' ? grammarBank : mode === 'correction' ? corrections : mode === 'translation' ? translations : sentences
  const primary = bank.filter(item => !topic || item.tags.includes(topic))
  const related = topic ? [...sentences, ...corrections].filter(item => item.tags.includes(topic)) : []
  const pool = (primary.length ? primary : related).filter(item => !level || item.difficulty === level)
  const section = [mode, mode === 'translation' ? direction : '', topic, level].filter(Boolean).join('/')
  const position = Math.min(study.data.checkpoints[section] ?? 0, pool.length)
  const item = pool[position]

  return <>
    <PageIntro title={title} description={description} />
    <div className="training-layout">
      <section className="training-main">
        {(mode === 'grammar' || mode === 'translation' || mode === 'sentences') && <div className="toolbar">
          {mode === 'grammar' && <label className="inline-field">Téma <span className="select-wrap"><select value={topic} onChange={event => setTopic(event.target.value)}><option value="">Všetky témy</option>{grammarTopics.map(item => <option value={item} key={item}>{topics[item]}</option>)}</select><ChevronDown size={16} /></span></label>}
          {mode === 'translation' && <div className="segmented" aria-label="Smer prekladu"><button aria-pressed={direction === 'de'} onClick={() => setDirection('de')}>Slovenčina → nemčina</button><button aria-pressed={direction === 'sk'} onClick={() => setDirection('sk')}>Nemčina → slovenčina</button></div>}
          {mode === 'sentences' && <label className="inline-field">Náročnosť <span className="select-wrap"><select value={level} onChange={event => { const value = eligibleLevels.find(item => item === event.target.value) ?? ''; study.setData(current => ({ ...current, sentenceLevel: value })) }}><option value="">{eligibleLevels.length === 2 ? 'A1 aj A2' : 'Všetky dostupné úrovne'}</option>{eligibleLevels.map(item => <option key={item} value={item}>{item}</option>)}</select><ChevronDown size={16} /></span></label>}
        </div>}
        {item ? <>
          <ExercisePosition position={position + 1} total={pool.length} />
          <Exercise key={`${section}-${item.id}`} exercise={item} record={study.record} onNext={() => study.checkpoint(section, position + 1)} nextLabel={position + 1 === pool.length ? 'Dokončiť cvičenie' : undefined} />
        </> : <div className="panel finish-panel"><CircleCheck size={28} /><h2>Cvičenie dokončené</h2><p>Prešiel si všetkých {pool.length} úloh v tomto výbere.</p><button className="button button-primary" onClick={() => study.checkpoint(section, 0)}>Zopakovať cvičenie</button></div>}
      </section>
      <aside className="training-sidebar">
        <div className="panel side-note">
          <NotebookPen size={20} /><h2>Poznámka k úlohe</h2>
          <p>{item ? instructions(item) : 'Pri ďalšom precvičovaní si môžeš prejsť témy, v ktorých sa ti chyby opakovali.'}</p>
          {item && <div className="tag-list">{item.tags.map(tag => <span className="tag" key={tag}>{topics[tag]}</span>)}</div>}
          {!item && <a className="text-link" href={pageLink('progress')}>Zobraziť progres</a>}
        </div>
      </aside>
    </div>
  </>
}

function instructions(item: Item) {
  if (item.type === 'reverse') return 'Zachovaj význam celej vety. Použi prirodzený slovenský slovosled.'
  if (item.type === 'correction') return 'Napíš celú opravenú vetu. Pred odoslaním skontroluj, či sa jej význam nezmenil.'
  if (item.prompt.includes('___')) return 'Napíš iba výraz, ktorý patrí na vyznačené miesto.'
  return 'Napíš odpoveď vrátane veľkých písmen a prehlások. Po chybe si môžeš vyžiadať nápovedu.'
}
