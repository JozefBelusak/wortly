import { Check, CircleAlert, CornerDownLeft, Lightbulb } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { ContextText } from '../components/ContextText'
import type { Study } from '../hooks/useStudy'
import { exerciseRule, feedbackRule } from '../data/lessons/rules'
import type { RuleReference } from '../data/lessons/rules'
import { ruleMisses } from '../utils/lessonProgress'
import { TheoryBlock } from './TheoryBlock'
import { topics } from '../types'
import type { Exercise as ExerciseModel, LessonAnswer } from '../types'
import { gradeAnswer } from '../utils/grade'
import { hidesForm, protectedForms, testedVocabulary } from '../utils/contextVocabulary'
import type { Grade } from '../utils/grade'

export function Exercise({ exercise, study, onNext, nextLabel = 'Ďalšia úloha', assessment, reviewing = false }: {
  exercise: ExerciseModel
  study: Study
  onNext: () => void
  nextLabel?: string
  assessment?: (answer: LessonAnswer) => void
  reviewing?: boolean
}) {
  const [answer, setAnswer] = useState('')
  const [previous, setPrevious] = useState<string>()
  const [attempts, setAttempts] = useState(0)
  const [result, setResult] = useState<Grade>()
  const [hint, showHint] = useState(false)
  const [revealed, setRevealed] = useState(false)
  const [lastRule, setLastRule] = useState<RuleReference>()
  const [review, setReview] = useState<RuleReference>()
  const [justReviewed, setJustReviewed] = useState<string>()
  const [submitted, setSubmitted] = useState(false)
  const input = useRef<HTMLTextAreaElement>(null)
  const form = useRef<HTMLFormElement>(null)
  const correct = !!result && result.status !== 'incorrect'
  const done = correct || revealed
  const toSlovak = exercise.type === 'reverse'
  const blank = exercise.prompt.includes('___')
  const testsVocabulary = testedVocabulary(exercise)
  const vocabularyLocked = testsVocabulary && !attempts
  const { glossary, subjectChange } = assessment ? {} : exercise.support ?? {}
  const blocked = useMemo(() => done || testsVocabulary ? undefined : protectedForms(exercise), [done, testsVocabulary, exercise])
  const hidePerfect = !done && exercise.tags.some(tag => tag === 'perfekt-aux' || tag === 'participle')
  const [subjectSentence, subjectInstruction] = subjectChange ? exercise.prompt.split(' → ', 2) : []
  const promptLanguage = exercise.promptLanguage ?? (exercise.type === 'sentence' || (exercise.type === 'grammar' && !blank) ? undefined : 'de')
  const promptNote = exercise.prompt.search(/\s[\(→]/u)

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!answer.trim() || answer.trim() === previous || done || submitted) return
    const grade = gradeAnswer(exercise, answer)
    const wrong = grade.status === 'incorrect'
    const rule = wrong ? feedbackRule(exercise, answer, grade) : lastRule ?? exerciseRule(exercise)
    const ruleId = rule?.section.id
    study.record(exercise, wrong ? 'incorrect' : 'correct', wrong ? grade.topic : undefined, wrong ? grade.skill : undefined, ruleId)

    if (assessment) {
      setSubmitted(true)
      assessment({ exerciseId: exercise.id, response: answer.trim(), correct: !wrong, ruleId })
      return
    }
    setResult(grade)
    setLastRule(rule)
    setPrevious(answer.trim())
    setAttempts(attempts + 1)
    if (wrong) input.current?.focus()
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

  if (review) {
    const close = () => {
      setReview(undefined)
      requestAnimationFrame(() => input.current?.focus())
    }
    return <RuleDrill reference={review} study={study} onBack={close} onComplete={() => {
      setJustReviewed(review.section.id)
      close()
    }} backLabel="Späť k pôvodnej úlohe" original={exercise} />
  }
  const feedback = result?.status === 'incorrect' ? lastRule : undefined
  const repeatRule = feedback && !reviewing && ruleMisses(study.data.attempts, feedback.section.id) >= 2
  const solutions = [exercise.answer, ...exercise.acceptedAnswers]
  const note = result?.status === 'incorrect' ? result.note : undefined
  const safeNote = note && !hidesForm(note, solutions) ? note : undefined
  const ruleText = feedback && [feedback.section.rule, feedback.section.explanation].find(text =>
    !hidesForm(text, solutions) && !hidesForm(safeNote, [text]))
  const example = feedback?.section.examples.find(text => !hidesForm(text, solutions))
  const hintText = exercise.hint.trim()
  const showExtraHint = !!hintText && !hidesForm(hintText, solutions) &&
    ![safeNote, feedback?.section.rule, ruleText, example].some(text => hidesForm(text, [hintText]) || hidesForm(hintText, text ? [text] : []))

  return (
    <article className="panel exercise-panel">
      <div className="exercise-topic"><span className="tag">{exercise.difficulty}</span>{!assessment && <span>{topics[exercise.tags[0]]}</span>}</div>
      <p className="exercise-prompt" lang={promptLanguage}>
        {subjectChange && subjectInstruction ? <>
          <span lang="de"><ContextText text={subjectSentence} hints={glossary} blocked={blocked} hidePerfect={hidePerfect}
            mark={{ term: subjectChange.from, title: 'Pôvodný podmet' }} /></span>
          <span className="exercise-instruction"><ContextText text={subjectInstruction} mixed
            blocked={blocked} mark={{ term: subjectChange.to, title: 'Nový podmet' }} /></span>
        </> : <ContextText text={exercise.prompt} mixed={promptLanguage !== 'de'}
          mixedFrom={promptNote < 0 ? undefined : promptNote}
          hints={glossary} blocked={blocked} hidePerfect={hidePerfect} disabled={!!assessment || vocabularyLocked} />}
      </p>
      <form ref={form} onSubmit={submit}>
        <label className="field-label" htmlFor="answer">{blank ? 'Doplň chýbajúci výraz' : toSlovak ? 'Tvoja odpoveď po slovensky' : 'Tvoja odpoveď po nemecky'}</label>
        <textarea id="answer" ref={input} value={answer} onChange={event => setAnswer(event.target.value)} onKeyDown={handleKey} rows={blank ? 2 : 3} placeholder={blank ? 'Napíš chýbajúci výraz…' : 'Napíš svoju odpoveď…'} readOnly={done || submitted} spellCheck={false} autoCapitalize="off" lang={toSlovak ? 'sk' : 'de'} />
        {!toSlovak && !done && <div className="answer-tools"><div className="character-keys" aria-label="Nemecké znaky">{['ä', 'ö', 'ü', 'ß', 'Ä', 'Ö', 'Ü'].map(character => <button key={character} type="button" onMouseDown={event => event.preventDefault()} onClick={() => insert(character)}>{character}</button>)}</div><span className="keyboard-hint"><CornerDownLeft size={14} /> Enter skontroluje</span></div>}
        {result && <div className={`feedback ${correct ? 'success' : 'try-again'}`} role="status">{correct ? <Check size={19} /> : <CircleAlert size={19} />}<div><strong>{result.title}</strong>{result.status === 'incorrect' && safeNote && <p>{safeNote}</p>}</div></div>}
        {feedback && !done && (ruleText || example || repeatRule) && <div className="rule-feedback">
          <strong>{feedback.section.title}</strong>
          {ruleText && <p><ContextText text={ruleText} mixed blocked={blocked} hidePerfect={hidePerfect} /></p>}
          {example && <p lang="de" className="rule-example"><ContextText text={example} blocked={blocked} hidePerfect={hidePerfect} /></p>}
          {repeatRule && <button className="button button-secondary" type="button" onClick={() => setReview(feedback)}>Zopakovať pravidlo</button>}
        </div>}
        {justReviewed && !done && <p className="feedback success" role="status">Pravidlo máš precvičené. Skús ešte raz pôvodnú vetu.</p>}
        {hint && showExtraHint && !done && <div className="feedback hint"><Lightbulb size={18} /><p><ContextText text={hintText} mixed blocked={blocked} hidePerfect={hidePerfect} /></p></div>}
        {done && <div className="solution"><strong>Vzorová odpoveď</strong><p lang={toSlovak ? 'sk' : 'de'}><ContextText text={exercise.answer} mixed={toSlovak} /></p><p><ContextText text={exercise.explanation} mixed /></p></div>}
        <div className="button-row">
          {assessment ? <button className="button button-primary" disabled={!answer.trim() || submitted}>Odovzdať odpoveď</button>
            : done ? <button type="button" className="button button-primary" onClick={onNext}>{nextLabel}</button> : <>
            <button className="button button-primary" disabled={!answer.trim() || answer.trim() === previous}>{attempts ? 'Skús ešte raz' : 'Skontrolovať'}</button>
            {attempts > 0 && showExtraHint && !hint && <button type="button" className="button button-secondary" onClick={() => showHint(true)}>Zobraziť nápovedu</button>}
            {attempts >= 2 && !reviewing && <button type="button" className="button button-secondary" onClick={() => setRevealed(true)}>Ukázať riešenie</button>}
          </>}
        </div>
      </form>
    </article>
  )
}

export function RuleDrill({ reference, study, onBack, onComplete, backLabel = 'Späť', original }: {
  reference: RuleReference; study: Study; onBack?: () => void; onComplete: () => void; backLabel?: string; original?: ExerciseModel
}) {
  const [position, setPosition] = useState(0)
  const { section } = reference
  const candidates = [...section.reviewExercises, ...section.exercises]
  const alternatives = candidates.filter(item => item.prompt !== original?.prompt && item.answer !== original?.answer)
  const exercises = (alternatives.length >= 2 ? alternatives : candidates).slice(0, 2)
  const exercise = exercises[position]
  return <section className="rule-drill" aria-label="Opakovanie pravidla">
    {onBack && <button type="button" className="button button-secondary rule-back" onClick={onBack}>{backLabel}</button>}
    <TheoryBlock section={section} />
    <ExercisePosition position={position + 1} total={exercises.length} />
    <Exercise key={exercise.id} exercise={exercise} study={study} reviewing
      onNext={position + 1 === exercises.length ? onComplete : () => setPosition(position + 1)}
      nextLabel={position + 1 === exercises.length ? 'Dokončiť opakovanie' : undefined} />
  </section>
}

export function ExercisePosition({ position, total, label = 'Úloha' }: { position: number; total: number; label?: string }) {
  return <div className="exercise-position"><span>{label} <strong>{position} z {total}</strong></span><progress max={total} value={position} aria-label={`${label} ${position} z ${total}`} /></div>
}
