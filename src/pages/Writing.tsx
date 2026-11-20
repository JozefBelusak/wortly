import { ChevronDown, NotebookPen } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { PageIntro } from '../components/Layout'
import { writingChecklist, writingPrompts } from '../data/writing'
import type { Study } from '../hooks/useStudy'
import { formatDate } from '../utils/study'

export function Writing({ study }: { study: Study }) {
  const [selected, setSelected] = useState(0)
  const [text, setText] = useState('')
  const [checked, setChecked] = useState<string[]>([])
  const [status, setStatus] = useState('')
  const prompt = writingPrompts[selected]
  const words = text.trim() ? text.trim().split(/\s+/).length : 0

  function save(event: FormEvent) {
    event.preventDefault()
    if (!text.trim()) return
    const at = Date.now()
    const entry = { id: String(at), prompt, text: text.trim(), checked, at }
    study.setData(current => ({ ...current, writing: [entry, ...current.writing] }))
    setText('')
    setChecked([])
    setStatus('Text bol pridaný do histórie.')
  }

  return <>
    <PageIntro title="Voľné písanie" description="Napíš krátky text po nemecky a prejdi si ho podľa kontrolného zoznamu." />
    <form className="training-layout" onSubmit={save}>
      <section className="panel writing-panel">
        <label className="field-label" htmlFor="writing-prompt">Téma písania</label>
        <span className="select-wrap"><select id="writing-prompt" value={selected} onChange={event => setSelected(Number(event.target.value))}>{writingPrompts.map((item, index) => <option value={index} key={item}>{promptNames[index]}</option>)}</select><ChevronDown size={16} /></span>
        <h2>{prompt}</h2>
        <label className="field-label" htmlFor="writing-text">Tvoj text po nemecky</label>
        <textarea id="writing-text" rows={9} value={text} onChange={event => { setText(event.target.value); setStatus('') }} lang="de" placeholder="Začni prvou vetou…" spellCheck={false} />
        <div className="writing-actions"><span>Počet slov: {words}</span><button className="button button-primary" disabled={!words}>Uložiť text</button></div>
        {status && <p className="feedback success" role="status">{status}</p>}
      </section>
      <aside className="training-sidebar"><fieldset className="panel writing-checklist"><legend>Kontrolný zoznam</legend><p>Označ, čo si v texte použil alebo skontroloval.</p>{writingChecklist.map(item => <label key={item}><input type="checkbox" checked={checked.includes(item)} onChange={event => setChecked(event.target.checked ? [...checked, item] : checked.filter(value => value !== item))} />{item}</label>)}</fieldset></aside>
    </form>
    <section className="writing-history">
      <div className="section-title"><h2><NotebookPen size={20} /> História textov</h2></div>
      {study.data.writing.length ? study.data.writing.map(entry => <details className="panel saved-text" key={entry.id}>
        <summary>{entry.prompt}<time>{formatDate(entry.at, { dateStyle: 'medium' })}</time></summary>
        <p lang="de">{entry.text}</p>
        {entry.checked.length > 0 && <div className="tag-list">{entry.checked.map(item => <span className="tag" key={item}>{item}</span>)}</div>}
      </details>) : <p className="muted">Tu sa zobrazia tvoje uložené texty.</p>}
    </section>
  </>
}

const promptNames = ['Bežný deň', 'Včerajšok', 'Plány na víkend', 'Práca', 'Univerzita', 'Fitnescentrum', 'Stretnutie', 'Výlet', 'Prečo sa učím nemčinu', 'Autoškola']
