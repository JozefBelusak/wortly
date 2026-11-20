import { ChevronDown, NotebookPen } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { PageIntro } from '../components/Layout'
import { pageLink } from '../components/navigation'
import { availableUnits, wordCount } from '../data/curriculum'
import { writingChecklist, writingPrompts } from '../data/writing'
import type { Study } from '../hooks/useStudy'
import type { WritingEntry } from '../types'
import { formatDate } from '../utils/study'

export function Writing({ study, assignmentId }: { study: Study; assignmentId: string | null }) {
  const assignments = availableUnits(study.data).filter(unit => unit.writing)
  const [selected, setSelected] = useState(assignments.find(unit => unit.id === assignmentId)?.id ?? '0')
  const [text, setText] = useState('')
  const [checked, setChecked] = useState<string[]>([])
  const [status, setStatus] = useState('')
  const unit = assignments.find(item => item.id === selected)
  const assignment = unit?.writing
  const assignmentLanguage: WritingEntry['promptLanguage'] = assignment ? assignment.language ?? 'de' : undefined
  const prompt = assignment?.instruction ?? writingPrompts[Number(selected)]
  const checklist = assignment?.checklist ?? writingChecklist
  const words = wordCount(text)
  const checklistComplete = checklist.every(item => checked.includes(item))
  const canSave = words >= (assignment?.minWords ?? 1) && (!assignment || checklistComplete)

  function save(event: FormEvent) {
    event.preventDefault()
    if (!canSave) return
    const at = Date.now()
    const entry = { id: String(at), assignmentId: unit?.id, prompt, promptLanguage: assignmentLanguage, text: text.trim(), checked, at }
    study.setData(current => ({ ...current, writing: [entry, ...current.writing] }))
    setText('')
    setChecked([])
    setStatus(assignment ? 'Text bol uložený a započítaný do lekcie.' : 'Text bol pridaný do histórie.')
  }

  return <>
    {unit && <a className="text-link back-link" href={pageLink('course', { lekcia: unit.id })}>Späť na lekciu</a>}
    <PageIntro title="Voľné písanie" description="Napíš krátky text po nemecky a prejdi si ho podľa kontrolného zoznamu." />
    <form className="training-layout" onSubmit={save}>
      <section className="panel writing-panel">
        <label className="field-label" htmlFor="writing-prompt">Téma písania</label>
        <span className="select-wrap"><select id="writing-prompt" value={selected} onChange={event => { setSelected(event.target.value); setChecked([]); setStatus('') }}>
          <optgroup label="Vlastné precvičovanie">{writingPrompts.map((item, index) => <option value={index} key={item}>{promptNames[index]}</option>)}</optgroup>
          {assignments.length > 0 && <optgroup label="Učebná cesta">{assignments.map(item => <option value={item.id} key={item.id}>{item.level} · {item.title}</option>)}</optgroup>}
        </select><ChevronDown size={16} /></span>
        <h2 lang={assignmentLanguage}>{prompt}</h2>
        <label className="field-label" htmlFor="writing-text">Tvoj text po nemecky</label>
        <textarea id="writing-text" rows={9} value={text} onChange={event => { setText(event.target.value); setStatus('') }} lang="de" placeholder="Začni prvou vetou…" spellCheck={false} />
        <div className="writing-actions"><span>Počet slov: {words}{assignment && ' / ' + assignment.minWords + ' požadovaných'}</span><button className="button button-primary" disabled={!canSave}>Uložiť text</button></div>
        {assignment && words >= assignment.minWords && !checklistComplete && <p className="writing-criteria">Pred uložením prejdi kontrolný zoznam.</p>}
        {status && <p className="feedback success" role="status">{status}</p>}
      </section>
      <aside className="training-sidebar"><fieldset className="panel writing-checklist"><legend>Kontrolný zoznam</legend><p>{assignment ? 'Pred uložením potvrď všetky body zadania.' : 'Označ, čo si v texte použil alebo skontroloval.'}</p>{checklist.map(item => <label key={item} lang={assignmentLanguage}><input type="checkbox" checked={checked.includes(item)} onChange={event => setChecked(event.target.checked ? [...checked, item] : checked.filter(value => value !== item))} />{item}</label>)}</fieldset></aside>
    </form>
    <section className="writing-history">
      <div className="section-title"><h2><NotebookPen size={20} /> História textov</h2></div>
      {study.data.writing.length ? study.data.writing.map(entry => <details className="panel saved-text" key={entry.id}>
        <summary><span lang={entry.promptLanguage}>{entry.prompt}</span><time>{formatDate(entry.at, { dateStyle: 'medium' })}</time></summary>
        <p lang="de">{entry.text}</p>
        {entry.checked.length > 0 && <div className="tag-list">{entry.checked.map(item => <span className="tag" key={item}>{item}</span>)}</div>}
      </details>) : <p className="muted">Tu sa zobrazia tvoje uložené texty.</p>}
    </section>
  </>
}

const promptNames = ['Bežný deň', 'Včerajšok', 'Plány na víkend', 'Práca', 'Univerzita', 'Fitnescentrum', 'Stretnutie', 'Výlet', 'Prečo sa učím nemčinu', 'Autoškola']
