import { BookOpen, ChevronDown, Pencil, Plus, Search, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { PageIntro } from '../components/Layout'
import { pageLink } from '../components/navigation'
import type { Study } from '../hooks/useStudy'
import { wordKinds } from '../types'
import type { Word } from '../types'
import { wordHeading } from '../utils/study'

const blankWord: Word = { id: '', german: '', slovak: '', kind: 'noun', article: '', plural: '', present: '', perfect: '', example: '', learned: false }

export function Vocabulary({ study }: { study: Study }) {
  const [editing, setEditing] = useState<Word>()
  const [search, setSearch] = useState('')
  const words = study.data.words.filter(word => `${wordHeading(word)} ${word.slovak}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()))

  function save(draft: Word) {
    const word = { ...draft, id: draft.id || (globalThis.crypto?.randomUUID?.() ?? Date.now().toString()) }
    study.setData(current => ({ ...current, words: draft.id ? current.words.map(item => item.id === draft.id ? word : item) : [...current.words, word] }))
    setEditing(undefined)
  }

  return <>
    <PageIntro title="Môj slovník" description="Zapíš si vlastné slovíčka a frázy. Objavia sa aj medzi kartičkami." action={<button className="button button-primary" onClick={() => setEditing(blankWord)}><Plus size={18} /> Pridať slovo</button>} />
    {study.data.words.length > 0 ? <>
      <div className="toolbar"><label className="search-input"><Search size={17} /><input type="search" aria-label="Hľadať v slovníku" placeholder="Hľadať v slovníku…" value={search} onChange={event => setSearch(event.target.value)} /></label><span className="muted">Počet záznamov: {words.length}</span></div>
      {words.length ? <div className="panel word-list">{words.map(word => <article className="word-row" key={word.id}>
        <div><span className="word-kind">{wordKinds[word.kind]}</span><h2><span lang="de">{wordHeading(word)}</span> <span>– {word.slovak}</span></h2>
          {word.kind === 'noun' && word.plural && <p>Množné číslo: <span lang="de">{word.plural}</span></p>}
          {word.kind === 'verb' && (word.present || word.perfect) && <p lang="de">{[word.present, word.perfect].filter(Boolean).join(' · ')}</p>}
          {word.example && <p className="example" lang="de">{word.example}</p>}
        </div>
        <div className="word-actions">
          <label className="learned-label"><input type="checkbox" checked={word.learned} onChange={event => { const learned = event.target.checked; study.setData(current => ({ ...current, words: current.words.map(item => item.id === word.id ? { ...item, learned } : item) })) }} /> Zvládnuté</label>
          <button className="icon-button" aria-label={`Upraviť ${wordHeading(word)}`} onClick={() => setEditing(word)}><Pencil size={17} /></button>
        </div>
      </article>)}</div> : <p className="empty-inline" role="status">V slovníku sa nenašiel žiadny zodpovedajúci výraz.</p>}
    </> : <div className="panel finish-panel"><BookOpen size={30} /><h2>Prvé slovo do zošita</h2><p>Pridaj výraz, ktorý si chceš zapamätať. Pri podstatných menách sa oplatí zapísať si aj člen a množné číslo.</p><div className="button-row"><button className="button button-primary" onClick={() => setEditing(blankWord)}><Plus size={17} /> Pridať slovo</button><a className="button button-secondary" href={pageLink('flashcards')}>Otvoriť kartičky</a></div></div>}
    {editing && <WordEditor initial={editing} onCancel={() => setEditing(undefined)} onSave={save} />}
  </>
}

function WordEditor({ initial, onSave, onCancel }: { initial: Word; onSave: (word: Word) => void; onCancel: () => void }) {
  const [draft, setDraft] = useState(initial)
  const dialog = useRef<HTMLDialogElement>(null)
  useEffect(() => { dialog.current?.showModal() }, [])

  function update<K extends keyof Word>(key: K, value: Word[K]) {
    setDraft(current => ({ ...current, [key]: value }))
  }

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!draft.german.trim() || !draft.slovak.trim()) return
    let german = draft.german.trim()
    let article = draft.article
    const prefixed = draft.kind === 'noun' ? german.match(/^(der|die|das)\s+(.+)$/i) : null
    if (prefixed) {
      article ||= prefixed[1].toLowerCase() as Word['article']
      german = prefixed[2]
    }
    onSave({ ...draft, german, article, slovak: draft.slovak.trim(), plural: draft.plural.trim(), perfect: draft.perfect.trim(), present: draft.present.trim(), example: draft.example.trim() })
  }

  return <dialog ref={dialog} className="word-dialog" aria-labelledby="word-editor-title" onCancel={event => { event.preventDefault(); onCancel() }}>
    <div className="dialog-heading"><h2 id="word-editor-title">{initial.id ? 'Upraviť slovo' : 'Pridať slovo'}</h2><button className="icon-button" type="button" aria-label="Zavrieť" onClick={onCancel}><X size={19} /></button></div>
    <form onSubmit={submit} className="word-form">
      <div className="form-grid">
        <label>Nemecký výraz <input value={draft.german} onChange={event => update('german', event.target.value)} lang="de" required autoFocus placeholder="Freund" /></label>
        <label>Slovenský význam <input value={draft.slovak} onChange={event => update('slovak', event.target.value)} required placeholder="kamarát" /></label>
        <label>Slovný druh <span className="select-wrap"><select value={draft.kind} onChange={event => update('kind', event.target.value as Word['kind'])}>{Object.entries(wordKinds).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select><ChevronDown size={16} /></span></label>
        {draft.kind === 'noun' && <>
          <label>Člen <span className="select-wrap"><select value={draft.article} onChange={event => update('article', event.target.value as Word['article'])}><option value="">Vyber člen</option><option>der</option><option>die</option><option>das</option></select><ChevronDown size={16} /></span></label>
          <label>Množné číslo <input value={draft.plural} onChange={event => update('plural', event.target.value)} lang="de" placeholder="die Freunde" /></label>
        </>}
        {draft.kind === 'verb' && <>
          <label>Tvar pre er/sie/es <input value={draft.present} onChange={event => update('present', event.target.value)} lang="de" placeholder="fährt" /></label>
          <label>Perfekt <input value={draft.perfect} onChange={event => update('perfect', event.target.value)} lang="de" placeholder="ist gefahren" /></label>
        </>}
      </div>
      <label>Vlastná príkladová veta <textarea value={draft.example} onChange={event => update('example', event.target.value)} rows={2} lang="de" /></label>
      <label className="learned-label"><input type="checkbox" checked={draft.learned} onChange={event => update('learned', event.target.checked)} /> Označiť ako zvládnuté</label>
      <div className="button-row"><button className="button button-primary" disabled={!draft.german.trim() || !draft.slovak.trim()}>Uložiť slovo</button><button type="button" className="button button-secondary" onClick={onCancel}>Zrušiť</button></div>
    </form>
  </dialog>
}
