import { BookOpen, CircleCheck, LockKeyhole, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { ContextText } from '../components/ContextText'
import { PageIntro } from '../components/Layout'
import { pageLink } from '../components/navigation'
import { guidedAccess, nextGuidedLesson } from '../data/curriculum'
import { checkpointPassing, guidedLessons } from '../data/lessons/catalog'
import type { Lesson } from '../data/lessons/model'
import { ruleById } from '../data/lessons/rules'
import type { RuleReference } from '../data/lessons/rules'
import { Exercise, ExercisePosition, RuleDrill } from '../features/Exercise'
import { TheoryBlock } from '../features/TheoryBlock'
import type { Study } from '../hooks/useStudy'
import { levels } from '../types'
import type { LessonAnswer, LessonProgress } from '../types'
import { emptyLesson, lessonStatus, lessonStatusLabels, lessonSteps, ruleMisses } from '../utils/lessonProgress'

const levelsInfo = { A1: 'Základy', A2: 'Vety v súvislostiach', B1: 'Samostatné vyjadrovanie', B2: 'Presnosť a argumentácia' }
export const learnLink = (id: string) => pageLink('course', { tema: id })
const practiceLink = (id: string) => pageLink('course', { tema: id, cvic: '1' })
const fullUnitLink = pageLink('course', { bloky: '1' })

export function Learn({ study, topicId, practice }: { study: Study; topicId: string | null; practice: boolean }) {
  const open = guidedAccess(study.data)
  const selected = guidedLessons.find(lesson => lesson.id === topicId)
  const next = nextGuidedLesson(study.data, open)

  if (selected) {
    if (!open(selected)) return <>
      <a className="text-link back-link" href={pageLink('course')}>Učebná cesta</a>
      <PageIntro title={selected.title} description={selected.goal} />
      <section className="panel finish-panel"><LockKeyhole size={27} /><h2>Lekcia je zatiaľ zamknutá</h2>
        <p>{selected.level === 'B1' ? 'Dokonči základné úrovne alebo súhrnné cvičenia A1–A2.' : 'Dokonči B1 alebo súhrnné cvičenia potrebné na odomknutie B2.'}</p>
        {selected.prerequisites.filter(id => !study.data.lessons?.[id]?.learnedAt).map(id =>
          <p key={id}><a className="text-link" href={learnLink(id)}>{guidedLessons.find(item => item.id === id)?.title ?? id}</a></p>,
        )}
        {next && <a className="button button-primary" href={learnLink(next.id)}>Pokračovať v dostupnej lekcii</a>}
      </section>
    </>
    return practice && study.data.lessons?.[selected.id]?.learnedAt
      ? <TopicPractice study={study} lesson={selected} />
      : <LessonPage study={study} lesson={selected} />
  }

  return <>
    <PageIntro title="Učebná cesta" description="Prejdi krátke pravidlo, hneď ho použi a na konci si over zvládnutie témy."
      action={next && <a href={learnLink(next.id)} className="button button-primary">{study.data.lessons?.[next.id]?.step ? 'Pokračovať v lekcii' : 'Otvoriť ďalšiu lekciu'}</a>} />
    <div className="learn-tools"><a className="text-link" href={fullUnitLink}>Súhrnné cvičenia a dlhšie zadania</a></div>
    <div className="course-levels">
      {levels.map(level => {
        const lessons = guidedLessons.filter(lesson => lesson.level === level)
        const mastered = lessons.filter(lesson => study.data.lessons?.[lesson.id]?.learnedAt).length
        return <section className="course-level" key={level}>
          <header className="course-level-header"><div><span className="tag">{level}</span><h2>{levelsInfo[level]}</h2></div><p>{mastered} z {lessons.length} zvládnutých</p></header>
          <div className="learn-list">{lessons.map(lesson => {
            const status = lessonStatus(lesson, study.data)
            return <a className="panel learned-topic" href={learnLink(lesson.id)} key={lesson.id}>
              <span><strong>{lesson.title}</strong><small>{lesson.goal}</small></span>
              <span className={'status-text ' + status}>{!open(lesson) ? <><LockKeyhole size={14}/> Zamknutá</> : lessonStatusLabels[status]}</span>
            </a>
          })}</div>
        </section>
      })}
    </div>
  </>
}

function LessonPage({ study, lesson }: { study: Study; lesson: Lesson }) {
  const [reviewing, setReviewing] = useState<RuleReference>()
  const steps = lessonSteps(lesson)
  const state = study.data.lessons?.[lesson.id] ?? emptyLesson
  const status = lessonStatus(lesson, study.data)
  const step = steps[state.step]
  const assessment = lesson.checkpoint[state.answers.length]
  const errors = state.answers.filter(answer => !answer.correct)
  const suspect = lesson.sections.find(section => ruleMisses(study.data.attempts, section.id, state.learnedAt) >= 2)
  const scores = new Map<string, number>()
  for (const answer of errors) if (answer.ruleId) scores.set(answer.ruleId, (scores.get(answer.ruleId) ?? 0) + 1)
  const mostMissed = [...scores].sort((a, b) => b[1] - a[1])[0]?.[0]
  const section = suspect ?? (state.learnedAt ? undefined : ruleById(mostMissed)?.section) ?? lesson.sections[0]
  const reference = { lesson, section }
  const firstAttempt = !state.learnedAt
  const needsReview = status === 'review'

  function save(change: (previous: LessonProgress) => LessonProgress) {
    study.setData(current => {
      const previous = current.lessons?.[lesson.id] ?? emptyLesson
      const updated = change(previous)
      return updated === previous ? current : { ...current, activeLessonId: lesson.id, lessons: { ...current.lessons, [lesson.id]: updated } }
    })
  }

  function move() {
    save(previous => previous.step === state.step ? { ...previous, step: previous.step + 1 } : previous)
    requestAnimationFrame(() => document.querySelector<HTMLElement>('.lesson-stage')?.focus())
  }

  function record(answer: LessonAnswer) {
    save(previous => {
      if (previous.step < steps.length || previous.answers.length !== state.answers.length) return previous
      const answers = [...previous.answers, answer]
      const passed = answers.length === lesson.checkpoint.length && answers.filter(item => item.correct).length >= checkpointPassing
      return { ...previous, answers, learnedAt: passed ? Date.now() : previous.learnedAt }
    })
  }

  function reviewComplete() {
    save(previous => previous.learnedAt ? { ...previous, reviewedAt: Date.now() } : { ...previous, answers: [] })
    setReviewing(undefined)
  }

  return <>
    <a className="text-link back-link" href={pageLink('course')}>Učebná cesta</a>
    <PageIntro title={lesson.title} description={lesson.goal} action={<span className="level-label">{lesson.level} · {lessonStatusLabels[status]}</span>} />
    <div className="training-layout">
      <div className="training-main lesson-stage" tabIndex={-1}>
        {reviewing ? <RuleDrill reference={reviewing} study={study} onBack={() => setReviewing(undefined)} onComplete={reviewComplete} />
          : step ? <>
            <ExercisePosition position={state.step + 1} total={steps.length} label="Krok" />
            {step.kind === 'theory' ? <>
              <TheoryBlock section={step.section} />
              <button type="button" className="button button-primary lesson-next" onClick={move}>Skúsiť cvičenie</button>
            </> : <>
              {step.kind === 'transfer' && <div className="section-title"><h2>Použi to s tým, čo už vieš</h2></div>}
              {step.kind === 'reading' && <section className="panel mini-reading">
                <h2 lang="de"><ContextText text={lesson.reading.title} /></h2>
                {lesson.reading.paragraphs.map(paragraph => <p lang="de" key={paragraph}><ContextText text={paragraph} /></p>)}
              </section>}
              <Exercise study={study} exercise={step.exercise} key={step.exercise.id} onNext={move} nextLabel={step.kind === 'reading' ? 'Prejsť na checkpoint' : 'Pokračovať v lekcii'} />
            </>}
          </>
          : assessment && firstAttempt ? <>
            <div className="section-title"><h2>Checkpoint</h2></div>
            {state.answers.length === 0 && <p className="checkpoint-note muted">Odpovedz samostatne. Na zvládnutie potrebuješ aspoň {checkpointPassing} správne odpovede z {lesson.checkpoint.length}.</p>}
            <ExercisePosition position={state.answers.length + 1} total={lesson.checkpoint.length} />
            <Exercise exercise={assessment} key={assessment.id} study={study} onNext={() => {}} assessment={record} />
          </> : <section className="panel finish-panel lesson-result">
            {firstAttempt ? <RotateCcw size={27}/> : <CircleCheck size={28}/>}
            <h2>{firstAttempt ? 'Pravidlo si ešte precvičíme' : 'Lekcia zvládnutá'}</h2>
            <p>Správne si odpovedal na {state.answers.length - errors.length} z {lesson.checkpoint.length} úloh.</p>
            {firstAttempt ? <p>Zopakuj si časť „{section.title}“ a vyrieš dve krátke úlohy. Potom môžeš checkpoint skúsiť znova.</p>
              : <p>Téma pribudla do precvičovania aj denného opakovania.</p>}
            <div className="button-row">
              {needsReview && <button className="button button-primary" type="button" onClick={() => setReviewing(reference)}>Zopakovať pravidlo</button>}
              {!firstAttempt && <a className={needsReview ? 'button button-secondary' : 'button button-primary'} href={practiceLink(lesson.id)}>Precvičiť túto tému</a>}
              {!firstAttempt && <a className="button button-secondary" href={pageLink('course')}>Výber lekcie</a>}
              {!firstAttempt && lesson.id === 'text-argumentation' && <><a className="button button-secondary" href={pageLink('writing', { zadanie: 'b2-abwaegen' })}>Napísať dlhší text</a><a className="button button-secondary" href={pageLink('reading', { lekcia: 'b2-verkehr' })}>Prečítať dlhší text</a></>}
            </div>
            {errors.length > 0 && <details className="checkpoint-errors">
              <summary>Prejsť chybné odpovede</summary>
              <ul>{errors.map(answer => {
                const item = lesson.checkpoint.find(task => task.id === answer.exerciseId)
                return <li key={answer.exerciseId}><strong lang={item?.promptLanguage}>{item?.prompt}</strong><p>{answer.response}</p><p lang="de">{item?.answer}</p><p>{ruleById(answer.ruleId)?.section.rule ?? item?.explanation}</p></li>
              })}</ul>
            </details>}
          </section>}
      </div>
      <aside className="training-sidebar">
        <section className="panel side-note"><BookOpen size={19}/><h2>Priebeh lekcie</h2>
          <ol className="lesson-outline">
            {lesson.sections.map((section, index) => <li key={section.id} data-done={state.step >= (index + 1) * 3} aria-current={state.step >= index * 3 && state.step < (index + 1) * 3 ? 'step' : undefined}>{section.title}</li>)}
            <li data-done={state.step >= steps.length - 1} aria-current={step?.kind === 'transfer' ? 'step' : undefined}>Kombinovaná úloha</li>
            <li data-done={state.step >= steps.length} aria-current={step?.kind === 'reading' ? 'step' : undefined}>Krátke čítanie</li>
            <li data-done={!!state.learnedAt} aria-current={!step && assessment && firstAttempt ? 'step' : undefined}>Checkpoint</li>
          </ol>
        </section>
      </aside>
    </div>
  </>
}

function TopicPractice({ study, lesson }: { study: Study; lesson: Lesson }) {
  const [position, setPosition] = useState(0)
  const [pool] = useState(() => {
    const last = new Map(study.data.attempts.map((attempt, index) => [attempt.exerciseId, index]))
    return [...lesson.practice].sort((a, b) => (last.get(a.id) ?? -1) - (last.get(b.id) ?? -1))
  })
  const task = pool[position]
  return <>
    <a className="text-link back-link" href={learnLink(lesson.id)}>Späť k lekcii</a>
    <PageIntro title={'Precvičovanie · ' + lesson.title}/>
    <div className="training-layout"><section className="training-main">{task ? <>
      <ExercisePosition position={position + 1} total={pool.length} />
      <Exercise key={task.id} exercise={task} study={study} onNext={() => setPosition(position + 1)} />
    </> : <div className="panel finish-panel"><CircleCheck size={28}/><h2>Cvičenia máš prejdené</h2><button className="button button-secondary" onClick={() => setPosition(0)}>Zopakovať sadu</button></div>}</section></div>
  </>
}
