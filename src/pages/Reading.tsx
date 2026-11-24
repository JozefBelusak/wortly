import { BookOpen, CircleCheck, Clock3 } from 'lucide-react'
import { useMemo } from 'react'
import { ContextText } from '../components/ContextText'
import { PageIntro } from '../components/Layout'
import { pageLink } from '../components/navigation'
import { availableReadings, availableUnits } from '../data/curriculum'
import { Exercise, ExercisePosition } from '../features/Exercise'
import type { Study } from '../hooks/useStudy'
import type { Reading as Lesson } from '../types'

export function Reading({ study, lessonId }: { study: Study; lessonId: string | null }) {
  const readings = availableReadings(study.data)
  const lesson = readings.find(item => item.id === lessonId)
  const unit = availableUnits(study.data).find(item => item.reading?.id === lessonId)
  if (lesson) return <ReadingLesson lesson={lesson} study={study} unitId={unit?.id} />

  return <>
    <PageIntro title="Čítanie" description="Prečítaj si text a odpovedz vlastnými slovami po nemecky. Ďalšie texty odomykáš na učebnej ceste." />
    <div className="resource-grid">{readings.map(item => {
      const answered = Math.min(study.data.checkpoints[`reading/${item.id}`] ?? 0, item.questions.length)
      return <a className="panel reading-link" href={pageLink('reading', { lekcia: item.id })} key={item.id}>
        <span className="reading-meta"><span className="tag">{item.difficulty}</span><span><Clock3 size={15} /> {item.minutes} min čítania</span></span>
        <h2 lang="de">{item.title}</h2><p lang={!item.questions[0]?.lessonId && (item.difficulty === 'B1' || item.difficulty === 'B2') ? 'de' : 'sk'}>{item.description}</p>
        <span className="reading-link-footer"><BookOpen size={16} /> {answered ? `${answered} z ${item.questions.length} otázok` : `${item.questions.length} otázok`}</span>
      </a>
    })}</div>
  </>
}

function ReadingLesson({ lesson, study, unitId }: { lesson: Lesson; study: Study; unitId?: string }) {
  const terms = Object.keys(lesson.glossary)
  const hints = useMemo(() => Object.entries(lesson.glossary).map(([term, meaning]) =>
    [term, meaning, lesson.glossaryLanguage] as const), [lesson.glossary, lesson.glossaryLanguage])
  const key = `reading/${lesson.id}`
  const position = study.data.checkpoints[key] ?? 0
  const question = lesson.questions[position]

  return <>
    <div className="reading-back">
      <a className="text-link back-link" href={pageLink('reading')}>Všetky texty</a>
      {lesson.questions[0]?.lessonId && <a className="text-link back-link" href={pageLink('course', { tema: lesson.questions[0].lessonId })}>Späť k téme</a>}
      {unitId && <a className="text-link back-link" href={pageLink('course', { lekcia: unitId })}>Späť na lekciu</a>}
    </div>
    <PageIntro title={<ContextText text={lesson.title} />} description={<ContextText text={lesson.description}
      mixed={!!lesson.questions[0]?.lessonId || (lesson.difficulty !== 'B1' && lesson.difficulty !== 'B2')} />} action={<span className="level-label">{lesson.difficulty} · {lesson.minutes} min čítania</span>} />
    <div className="reading-column">
      <article className="panel reading-text">
        <p className="glossary-instruction">Klikni na slovo alebo označ frázu.</p>
        <div lang="de">{lesson.paragraphs.map(paragraph =>
          <p key={paragraph}><ContextText text={paragraph} hints={hints} highlight={terms} /></p>,
        )}</div>
      </article>
      <div className="section-title"><h2>Porozumenie textu</h2></div>
      {question ? <>
        <ExercisePosition position={position + 1} total={lesson.questions.length} label="Otázka" />
        <Exercise key={question.id} exercise={question} study={study} onNext={() => study.checkpoint(key, position + 1)} nextLabel={position + 1 === lesson.questions.length ? 'Dokončiť lekciu' : 'Ďalšia otázka'} />
      </> : <div className="panel finish-panel"><CircleCheck size={28} /><h2>Lekcia dokončená</h2><div className="button-row"><a className="button button-primary" href={pageLink('reading')}>Vybrať ďalší text</a><button className="button button-secondary" onClick={() => study.checkpoint(key, 0)}>Zopakovať otázky</button></div></div>}
    </div>
  </>
}
