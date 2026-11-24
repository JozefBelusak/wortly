import { BookPlus, Check, X } from 'lucide-react'
import { createContext, useCallback, useContext, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { partsOfSpeech } from '../data/contextEntries'
import type { Study } from '../hooks/useStudy'
import { hidesForm, notebookWord, rememberWord, vocabularyStatus, vocabularyStatusLabel } from '../utils/contextVocabulary'
import type { VocabularyLookup } from '../utils/contextVocabulary'

interface OpenVocabulary {
  lookup: VocabularyLookup
  root: HTMLElement
  anchor: HTMLElement | Range
  blocked: readonly string[]
  hidePerfect: boolean
  focusFrom?: HTMLElement
}

const VocabularyContext = createContext<{
  open: (popup: OpenVocabulary) => void
  closeFor: (root: HTMLElement) => void
  active: { root: HTMLElement; from: number; to: number } | null
} | null>(null)

export const useContextVocabulary = () => useContext(VocabularyContext)

export function ContextVocabularyProvider({ study, routeKey, children }: {
  study: Study; routeKey: string; children: ReactNode
}) {
  const [popup, setPopup] = useState<OpenVocabulary | null>(null)
  const current = useRef<OpenVocabulary | null>(null)
  const { setData } = study

  const close = useCallback((returnFocus = false) => {
    const previous = current.current
    current.current = null
    setPopup(null)
    if (returnFocus && previous?.focusFrom?.isConnected) previous.focusFrom.focus()
  }, [])

  useEffect(() => { close() }, [close, routeKey])

  const closeFor = useCallback((root: HTMLElement) => {
    if (current.current?.root === root) close()
  }, [close])

  const open = useCallback((next: OpenVocabulary) => {
    if (current.current?.root === next.root && current.current.lookup.from === next.lookup.from &&
      current.current.lookup.to === next.lookup.to && current.current.focusFrom === next.focusFrom) return
    current.current = next
    setPopup(next)
    const { entry, entryId, term } = next.lookup
    if (entryId) {
      const lastSeen = Date.now()
      setData(data => ({
        ...data,
        vocabularyExposure: {
          ...data.vocabularyExposure,
          [entryId]: {
            term: entry?.lemma ?? term, translation: entry?.translation ?? '',
            opens: (data.vocabularyExposure?.[entryId]?.opens ?? 0) + 1, lastSeen,
          },
        },
      }))
    }
  }, [setData])

  const value = useMemo(() => ({
    open, closeFor,
    active: popup && { root: popup.root, from: popup.lookup.from, to: popup.lookup.to },
  }), [open, closeFor, popup])

  return <VocabularyContext.Provider value={value}>
    {children}
    {popup && createPortal(<VocabularyPopup popup={popup} study={study} close={close} />, document.body)}
  </VocabularyContext.Provider>
}

function VocabularyPopup({ popup, study, close }: {
  popup: OpenVocabulary; study: Study; close: (returnFocus?: boolean) => void
}) {
  const box = useRef<HTMLDivElement>(null)
  const titleId = useId()
  const { lookup, root, anchor, focusFrom, blocked, hidePerfect } = popup
  const { entry, entryId, term } = lookup
  const word = entry && notebookWord(study.data, entry)
  const status = entryId && vocabularyStatus(study.data, entryId, word)
  const participle = hidePerfect ? entry?.perfect?.split(' ').at(-1) : undefined
  const example = hidesForm(lookup.example, participle ? [...blocked, participle] : blocked) ? '' : lookup.example
  const hiddenLemma = hidesForm(entry?.lemma, blocked) && entry?.lemma !== term
  const article = hidesForm(entry?.article, blocked) ? '' : entry?.article
  const plural = hidesForm(entry?.plural, blocked) ? '' : entry?.plural
  const infinitive = hidesForm(entry?.infinitive, blocked) ? '' : entry?.infinitive
  const perfect = (hidePerfect && entry?.perfect) || hidesForm(entry?.perfect, blocked) ? '' : entry?.perfect
  const noPlural = entry?.part === 'noun' && entry.plural === ''
  const canSave = entry && !hiddenLemma && article === entry.article && plural === entry.plural &&
    infinitive === entry.infinitive && perfect === entry.perfect

  useLayoutEffect(() => {
    const element = box.current
    if (!element) return
    const viewport = window.visualViewport
    const position = () => {
      if (!root.isConnected) return
      const rect = anchor.getBoundingClientRect()
      const left = viewport?.offsetLeft ?? 0
      const top = viewport?.offsetTop ?? 0
      const width = viewport?.width ?? window.innerWidth
      const height = viewport?.height ?? window.innerHeight
      if (rect.bottom < top || rect.top > top + height) { close(); return }
      const margin = 10
      element.style.maxWidth = Math.max(0, width - 2 * margin) + 'px'
      element.style.maxHeight = Math.max(0, height - 2 * margin) + 'px'
      const { offsetWidth, offsetHeight } = element
      const below = rect.bottom + 8
      const above = rect.top - offsetHeight - 8
      const x = Math.min(Math.max(left + margin, rect.left), left + width - margin - offsetWidth)
      const y = Math.min(Math.max(top + margin, below + offsetHeight <= top + height - margin ? below : above),
        top + height - margin - offsetHeight)
      element.style.left = x + 'px'
      element.style.top = y + 'px'
    }
    position()
    const observer = new ResizeObserver(position)
    observer.observe(element)
    window.addEventListener('scroll', position, true)
    window.addEventListener('resize', position)
    viewport?.addEventListener('resize', position)
    viewport?.addEventListener('scroll', position)
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', position, true)
      window.removeEventListener('resize', position)
      viewport?.removeEventListener('resize', position)
      viewport?.removeEventListener('scroll', position)
    }
  }, [root, anchor, close])

  useEffect(() => {
    if (focusFrom) box.current?.focus()
    const outside = (event: PointerEvent) => {
      const target = event.target
      if (target instanceof Element && (box.current?.contains(target) || target.closest('[data-context-word]'))) return
      close()
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close(true) }
    }
    document.addEventListener('pointerdown', outside, true)
    document.addEventListener('keydown', escape)
    return () => {
      document.removeEventListener('pointerdown', outside, true)
      document.removeEventListener('keydown', escape)
    }
  }, [popup, focusFrom, close])

  return <div ref={box} className="context-popup" role="dialog" tabIndex={-1} aria-labelledby={titleId}>
    <header>
      <div>
        {entry && <p className="context-part">{partsOfSpeech[entry.part]}</p>}
        <h2 id={titleId} lang="de">{entry && !hiddenLemma ? entry.lemma : term}</h2>
      </div>
      <button className="icon-button" type="button" aria-label="Zavrieť slovníkovú bublinu" onClick={() => close(true)}><X size={17} /></button>
    </header>
    {entry ? <>
      <p className="context-translation">{entry.translation}</p>
      {entry.meaning && entry.meaning !== entry.translation && <div className="context-meaning"><small>V tomto kontexte</small><p>{entry.meaning}</p></div>}
      {entry.germanMeaning && <div className="context-meaning" lang="de">{entry.germanMeaning}</div>}
      {(article || plural || noPlural || infinitive || perfect) && <dl className="context-forms">
        {article && <div><dt>Člen</dt><dd lang="de">{article}</dd></div>}
        {plural && <div><dt>Množné číslo</dt><dd lang="de">{plural}</dd></div>}
        {noPlural && <div><dt>Množné číslo</dt><dd>Bežne bez plurálu</dd></div>}
        {infinitive && <div><dt>Infinitív</dt><dd lang="de">{infinitive}</dd></div>}
        {perfect && <div><dt>Perfekt</dt><dd lang="de">{perfect}</dd></div>}
      </dl>}
      {example && example.toLocaleLowerCase('de') !== term.toLocaleLowerCase('de') &&
        <p className="context-example" lang="de">{example}</p>}
      <footer>
        {canSave && !word && <button type="button" className="button button-secondary" onClick={() =>
          study.setData(data => rememberWord(data, entry, example === term ? '' : example))}><BookPlus size={16} /> Pridať do slovníka</button>}
        {status && <span className="context-status" role="status">{word && <Check size={15} />}{vocabularyStatusLabel[status]}</span>}
      </footer>
    </> : <><p className="muted">Tento výraz zatiaľ v kontextovom slovníku chýba.</p>
      {status && <footer><span className="context-status" role="status">{vocabularyStatusLabel[status]}</span></footer>}
    </>}
  </div>
}
