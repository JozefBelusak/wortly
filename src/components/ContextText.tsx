import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { isGermanMatch, lookupContext, tokens, vocabularyMatches } from '../utils/contextVocabulary'
import type { VocabularyHints } from '../utils/contextVocabulary'
import { useContextVocabulary } from './ContextVocabulary'

const noHints: VocabularyHints = []
const noWords: readonly string[] = []

export function ContextText({ text, mixed = false, disabled = false, hints = noHints, highlight = noWords,
  blocked = noWords, hidePerfect = false, mixedFrom = Infinity, mark }: {
  text: string
  mixed?: boolean
  disabled?: boolean
  hints?: VocabularyHints
  highlight?: readonly string[]
  blocked?: readonly string[]
  hidePerfect?: boolean
  mixedFrom?: number
  mark?: { term: string; title: string }
}) {
  const vocabulary = useContextVocabulary()
  const open = vocabulary?.open
  const closeFor = vocabulary?.closeFor
  const root = useRef<HTMLSpanElement>(null)
  const selection = useRef('')
  const [focused, setFocused] = useState(-1)
  const words = useMemo(() => tokens(text), [text])
  const enabled = !disabled && !!open
  const found = useMemo(() => enabled ? vocabularyMatches(text, words, hints) : [], [enabled, text, words, hints])
  const available = useMemo(() => words.flatMap((word, index) =>
    enabled && ((!mixed && word.start < mixedFrom) || isGermanMatch(word, index, found)) ? [index] : []), [enabled, words, mixed, mixedFrom, found])
  const emphasized = useMemo(() => {
    const keys = new Set(highlight.map(term => term.toLocaleLowerCase('de')))
    const result = new Set<number>()
    if (!keys.size) return result
    words.forEach((word, index) => {
      if (keys.has(word.text.toLocaleLowerCase('de'))) result.add(index)
    })
    for (const match of found) {
      const phrase = text.slice(words[match.first].start, words[match.last].end).toLocaleLowerCase('de')
      if (!keys.has(phrase)) continue
      for (let index = match.first; index <= match.last; index++) result.add(index)
    }
    return result
  }, [words, found, text, highlight])

  const show = useCallback((start: number, end: number, anchor: HTMLElement | Range, focusFrom?: HTMLElement) => {
    const element = root.current
    const lookup = lookupContext(text, words, found, start, end, !mixed && end < mixedFrom)
    if (element && lookup && open) open({ root: element, lookup, anchor, blocked, hidePerfect, focusFrom })
  }, [text, words, found, open, blocked, hidePerfect, mixed, mixedFrom])

  useEffect(() => {
    const element = root.current
    if (!available.length || !element) return
    let timer: number
    const selected = () => {
      if (window.getSelection()?.isCollapsed) selection.current = ''
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const native = window.getSelection()
        if (!native || native.isCollapsed || !native.rangeCount) {
          selection.current = ''
          return
        }
        const range = native.getRangeAt(0)
        if (!element.contains(range.startContainer) || !element.contains(range.endContainer)) {
          selection.current = ''
          return
        }
        const prefix = document.createRange()
        prefix.selectNodeContents(element)
        prefix.setEnd(range.startContainer, range.startOffset)
        const start = prefix.toString().length
        const end = start + range.toString().length
        const signature = start + ':' + end
        if (selection.current === signature || !available.some(index => words[index].end > start && words[index].start < end)) return
        selection.current = signature
        show(start, end, range.cloneRange())
      }, 160)
    }
    document.addEventListener('selectionchange', selected)
    return () => {
      window.clearTimeout(timer)
      document.removeEventListener('selectionchange', selected)
    }
  }, [available, words, show])

  useEffect(() => {
    const element = root.current
    return () => { if (element) closeFor?.(element) }
  }, [text, enabled, closeFor])

  const active = vocabulary?.active?.root === root.current ? vocabulary?.active : null
  const markedStart = mark ? text.indexOf(mark.term) : -1
  const tabStop = available.includes(focused) ? focused : available[0]
  let lastEnd = 0

  function wordElement(index: number) {
    return root.current?.querySelector<HTMLElement>('[data-context-word="' + index + '"]')
  }

  function onKey(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
    event.preventDefault()
    const next = available[available.indexOf(tabStop) + (event.key === 'ArrowLeft' ? -1 : 1)]
    if (next === undefined) return
    setFocused(next)
    wordElement(next)?.scrollIntoView({ block: 'nearest', inline: 'nearest' })
  }

  if ((!enabled || !available.length) && markedStart === -1) return <>{text}</>

  return <>
    {tabStop !== undefined && <button type="button" className="context-keyboard" aria-haspopup="dialog"
      aria-label={'Slovníková pomoc – ' + words[tabStop].text}
      aria-description="Šípkami vyber slovo, klávesom Enter otvor význam."
      onKeyDown={onKey} onClick={event => {
        const anchor = wordElement(tabStop)
        if (anchor) show(words[tabStop].start, words[tabStop].end, anchor, event.currentTarget)
      }} />}
    <span className="context-text" ref={root} lang={mixed ? undefined : 'de'}>
    {words.map((word, index) => {
      const before = text.slice(lastEnd, word.start)
      lastEnd = word.end
      const subject = mark && word.start === markedStart && word.text === mark.term
      const content = subject ? <mark lang="de" title={mark.title}>{word.text}</mark> : word.text
      if (!available.includes(index)) return <Fragment key={word.start}>{before}{content}</Fragment>
      const className = [
        'context-token',
        tabStop === index ? 'context-keyboard-word' : '',
        emphasized.has(index) ? 'context-emphasis' : '',
        active && word.start >= active.from && word.end <= active.to ? 'context-active' : '',
      ].filter(Boolean).join(' ')
      return <Fragment key={word.start}>{before}<span
        data-context-word={index} className={className} lang={mixed ? 'de' : undefined}
        role="button" aria-haspopup="dialog"
        onClick={event => {
          const native = window.getSelection()
          if (native && !native.isCollapsed && root.current?.contains(native.anchorNode)) return
          show(word.start, word.end, event.currentTarget)
        }}
      >{content}</span></Fragment>
    })}
    {text.slice(lastEnd)}
    </span>
  </>
}
