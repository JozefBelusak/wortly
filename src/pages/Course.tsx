import { BookOpen, Check, CircleCheck, LockKeyhole, NotebookPen } from 'lucide-react'
import { PageIntro } from '../components/Layout'
import { pageLink } from '../components/navigation'
import { availableReadings, courseProgress } from '../data/curriculum'
import type { CourseProgress } from '../data/curriculum'
import { Exercise, ExercisePosition } from '../features/Exercise'
import type { Study } from '../hooks/useStudy'
import { levels, topics } from '../types'

const levelTitles = { A1: 'Základy', A2: 'Vety v súvislostiach', B1: 'Samostatné vyjadrovanie', B2: 'Presnosť a argumentácia' }
const unitLink = (id: string) => pageLink('course', { lekcia: id })

export function Course({ study, unitId }: { study: Study; unitId: string | null }) {
  const progress = courseProgress(study.data)
  const current = progress.find(item => item.unit.id === unitId)
  const next = progress.find(item => item.missing.length === 0 && !item.complete)

  if (current) return <UnitPage study={study} current={current} progress={progress} next={next} />

  return <>
    <PageIntro title="Učebná cesta" description="Od prvej vety po súvislý text. Správne odpovede z bežných cvičení sa započítavajú aj tu." action={next && <a className="button button-primary" href={unitLink(next.unit.id)}>Pokračovať v učení</a>} />
    <div className="course-levels">
      {levels.map(level => {
        const items = progress.filter(item => item.unit.level === level)
        return <section className="course-level" key={level}>
          <header className="course-level-header">
            <div><span className="tag">{level}</span><h2>{levelTitles[level]}</h2></div>
            <p>{items.filter(item => item.complete).length} z {items.length} zvládnutých</p>
          </header>
          <div className="course-unit-list">
            {items.map(item => <a className="panel course-unit" href={unitLink(item.unit.id)} key={item.unit.id}>
              <div><h3>{item.unit.title}</h3><p>{item.unit.goal}</p></div>
              {item.complete ? <span className="course-status complete"><CircleCheck size={17} /> Zvládnutá</span>
                : item.missing.length ? <span className="course-status"><LockKeyhole size={16} /> Zamknutá</span>
                  : <span className="course-status ready">{item.solved ? 'Rozpracovaná' : 'Dostupná'}</span>}
            </a>)}
          </div>
        </section>
      })}
    </div>
  </>
}

function UnitPage({ study, current, progress, next }: { study: Study; current: CourseProgress; progress: CourseProgress[]; next?: CourseProgress }) {
  const { unit } = current
  const checkpoint = 'course/' + unit.id
  const position = Math.min(study.data.checkpoints[checkpoint] ?? 0, unit.exercises.length)
  const exercise = unit.exercises[position]
  const reading = availableReadings(study.data).find(item => item.id === unit.reading?.id)

  return <>
    <a className="text-link back-link" href={pageLink('course')}>Celá učebná cesta</a>
    <PageIntro title={unit.title} description={unit.goal} action={<span className="level-label">{unit.level} · {levelTitles[unit.level]}</span>} />
    {current.missing.length > 0 ? <section className="panel finish-panel">
      <LockKeyhole size={26} /><h2>Lekcia sa ešte neodomkla</h2><p>Najprv dokonči tieto lekcie.</p>
      <ul className="course-prerequisites">{progress.filter(item => current.missing.includes(item.unit.id)).map(item => <li key={item.unit.id}><a className="text-link" href={unitLink(item.unit.id)}>{item.unit.title}</a></li>)}</ul>
    </section> : <div className="training-layout">
      <section className="training-main">
        {current.complete && next && <a className="button button-primary course-next" href={unitLink(next.unit.id)}><CircleCheck size={17} /> Ďalšia lekcia</a>}
        {unit.guide && <details className="panel course-guide" open>
          <summary>Pravidlo a príklad</summary>
          <p lang={unit.guide.language}>{unit.guide.rule}</p>
          <p lang="de" className="course-example">{unit.guide.example}</p>
        </details>}
        {exercise ? <>
          <ExercisePosition position={position + 1} total={unit.exercises.length} />
          <Exercise key={exercise.id} exercise={exercise} record={study.record} onNext={() => study.checkpoint(checkpoint, position + 1)} nextLabel={position + 1 === unit.exercises.length ? 'Ukončiť cvičenia' : undefined} />
        </> : <div className="panel finish-panel">
          <CircleCheck size={26} /><h2>Cvičenia máš prejdené</h2>
          <p>{current.complete ? 'Túto lekciu máš zvládnutú.' : 'V prehľade lekcie uvidíš, ktoré podmienky ešte treba splniť.'}</p>
          <button className="button button-secondary" onClick={() => study.checkpoint(checkpoint, 0)}>Zopakovať cvičenia</button>
        </div>}
      </section>
      <aside className="training-sidebar course-aside">
        <section className="panel side-note">
          {current.complete ? <CircleCheck size={21} /> : <NotebookPen size={21} />}
          <h2>{current.complete ? 'Lekcia zvládnutá' : 'Na zvládnutie lekcie'}</h2>
          <ul className="mastery-list">
            <MasteryCheck done={current.solved >= unit.minCorrect}>{Math.min(current.solved, unit.minCorrect)} z {unit.minCorrect} správnych úloh</MasteryCheck>
            {unit.minSentences && <MasteryCheck done={current.correctSentences >= unit.minSentences}>{unit.minSentences === 1 ? 'Aspoň jedna správne vytvorená veta' : 'Aspoň ' + unit.minSentences + ' správne vytvorené vety'}</MasteryCheck>}
            {unit.skills?.map(skill => <MasteryCheck key={skill} done={current.demonstratedSkills.includes(skill)}>{topics[skill]}</MasteryCheck>)}
            {!!unit.reading?.minCorrect && <MasteryCheck done={current.correctReading >= unit.reading.minCorrect}>{Math.min(current.correctReading, unit.reading.minCorrect)} z {unit.reading.minCorrect} správnych odpovedí pri čítaní</MasteryCheck>}
            {unit.writing && <MasteryCheck done={current.hasWriting}>Uložený vlastný text</MasteryCheck>}
          </ul>
        </section>
        {(reading || unit.writing || unit.vocabulary?.length) && <section className="panel side-note">
          <BookOpen size={20} /><h2>Ďalšie úlohy k lekcii</h2>
          <div className="course-resource-links">
            {reading && <a className="text-link" href={pageLink('reading', { lekcia: reading.id })}><span>Prečítať text</span><small lang="de">{reading.title}</small></a>}
            {unit.writing && <a className="text-link" href={pageLink('writing', { zadanie: unit.id })}><span>Napísať vlastný text</span><small>Minimálne {unit.writing.minWords} slov</small></a>}
            {!!unit.vocabulary?.length && <a className="text-link" href={pageLink('flashcards', { lekcia: unit.id })}><span>Precvičiť slovnú zásobu</span><small>{unit.vocabulary.length} kartičky</small></a>}
          </div>
        </section>}
      </aside>
    </div>}
  </>
}

function MasteryCheck({ done, children }: { done: boolean; children: React.ReactNode }) {
  return <li className={done ? 'mastery-done' : undefined}>
    <span className="mastery-indicator" aria-label={done ? 'Splnené' : 'Zatiaľ nesplnené'} role="img">{done && <Check size={13} />}</span>{children}
  </li>
}
