import { Check, CircleAlert, CornerDownLeft, Lightbulb } from 'lucide-react'
import { useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import type { Study } from '../hooks/useStudy'
import { topics } from '../types'
import type { Exercise as ExerciseModel } from '../types'
import { gradeAnswer } from '../utils/grade'
import type { Grade } from '../utils/grade'

function highlightSubject(text: string, subject: string, label: string) {
  const start = text.indexOf(subject)
  if (start === -1) return text

  return <>{text.slice(0, start)}<mark lang="de" title={label}>{subject}</mark>{text.slice(start + subject.length)}</>
}

export function Exercise({ exercise, record, onNext, nextLabel = 'Ďalšia úloha' }: {
  exercise: ExerciseModel; record: Study['record']; onNext: () => void; nextLabel?: string
}) {
  const [answer, setAnswer] = useState('')
  const [previous, setPrevious] = useState<string>()
  const [attempts, setAttempts] = useState(0)
  const [result, setResult] = useState<Grade>()
  const [hint, showHint] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const input = useRef<HTMLTextAreaElement>(null)
  const form = useRef<HTMLFormElement>(null)
  const correct = !!result && result.status !== 'incorrect'
  const done = correct || revealed
  const toSlovak = exercise.type === 'reverse'
  const blank = exercise.prompt.includes('___')
  const { glossary, subjectChange } = exercise.support ?? {}
  const [subjectSentence, subjectInstruction] = subjectChange ? exercise.prompt.split(' → ', 2) : []
  const promptLanguage = exercise.promptLanguage ?? (exercise.type === 'sentence' || (exercise.type === 'grammar' && !blank) ? undefined : 'de')

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!answer.trim() || answer.trim() === previous || done) return
    const grade = gradeAnswer(exercise, answer)
    setResult(grade)
    setPrevious(answer.trim())
    setAttempts(attempts + 1)
    record(exercise, grade.status === 'incorrect' ? 'incorrect' : 'correct', grade.status === 'incorrect' ? grade.topic : undefined, grade.status === 'incorrect' ? grade.skill : undefined)
    if (grade.status === 'incorrect') input.current?.focus()
  }

  function handleKey(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault()
      form.current?.requestSubmit()
    }
  }

  function insert(character: string) {
    const field = input.current
    if (!field) return
    const { selectionStart, selectionEnd } = field
    setAnswer(answer.slice(0, selectionStart) + character + answer.slice(selectionEnd))
    requestAnimationFrame(() => {
      field.focus()
      field.setSelectionRange(selectionStart + 1, selectionStart + 1)
    })
  }

  return (
    <article className="panel exercise-panel">
      <div className="exercise-topic"><span className="tag">{exercise.difficulty}</span><span>{topics[exercise.tags[0]]}</span></div>
      <p className="exercise-prompt" lang={promptLanguage}>
        {subjectChange && subjectInstruction ? <>
          <span lang="de">{highlightSubject(subjectSentence, subjectChange.from, 'Pôvodný podmet')}</span>
          <span className="exercise-instruction">{highlightSubject(subjectInstruction, subjectChange.to, 'Nový podmet')}</span>
        </> : exercise.prompt}
      </p>
      {glossary && glossary.length > 0 && <div className="exercise-glossary">
        <p>Slová z úlohy</p>
        <dl>{glossary.map(([german, slovak]) => <div key={german}><dt lang="de">{german}</dt><dd>{slovak}</dd></div>)}</dl>
      </div>}
      <form ref={form} onSubmit={submit}>
        <label className="field-label" htmlFor="answer">{blank ? 'Doplň chýbajúci výraz' : toSlovak ? 'Tvoja odpoveď po slovensky' : 'Tvoja odpoveď po nemecky'}</label>
        <textarea id="answer" ref={input} value={answer} onChange={event => setAnswer(event.target.value)} onKeyDown={handleKey} rows={blank ? 2 : 3} placeholder={blank ? 'Napíš chýbajúci výraz…' : 'Napíš svoju odpoveď…'} readOnly={done} spellCheck={false} autoCapitalize="off" lang={toSlovak ? 'sk' : 'de'} />
        {!toSlovak && !done && <div className="answer-tools"><div className="character-keys" aria-label="Nemecké znaky">{['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map(character => <button key={character} type="button" onMouseDown={event => event.preventDefault()} onClick={() => insert(character)}>{character}</button>)}</div><span className="keyboard-hint"><CornerDownLeft size={14} /> Enter skontroluje</span></div>}
        {result && <div className={`feedback ${correct ? 'success' : 'try-again'}`} role="status">{correct ? <Check size={19} /> : <CircleAlert size={19} />}<div><strong>{result.title}</strong>{result.status === 'incorrect' && result.note && <p>{result.note}</p>}</div></div>}
        {hint && !done && <div className="feedback hint"><Lightbulb size={18} /><p>{exercise.hint}</p></div>}
        {done && <div className="solution"><strong>Vzorová odpoveď</strong><p lang={toSlovak ? 'sk' : 'de'}>{exercise.answer}</p><p>{exercise.explanation}</p></div>}
        <div className="button-row">
          {done ? <button type="button" className="button button-primary" onClick={onNext}>{nextLabel}</button> : <>
            <button className="button button-primary" disabled={!answer.trim() || answer.trim() === previous}>{attempts ? 'Skús ešte raz' : 'Skontrolovať'}</button>
            {attempts > 0 && !hint && <button type="button" className="button button-secondary" onClick={() => showHint(true)}>Zobraziť nápovedu</button>}
            {attempts >= 2 && <button type="button" className="button button-secondary" onClick={() => setRevealed(true)}>Ukázať riešenie</button>}
          </>}
        </div>
      </form>
    </article>
  )
}

export function ExercisePosition({ position, total, label = 'Úloha' }: { position: number; total: number; label?: string }) {
  return <div className="exercise-position"><span>{label} <strong>{position} z {total}</strong></span><progress max={total} value={position} aria-label={`${label} ${position} z ${total}`} /></div>
}
