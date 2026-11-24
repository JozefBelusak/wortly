import { Crosshair } from 'lucide-react'
import { PageIntro } from '../components/Layout'
import { pageLink } from '../components/navigation'
import { availableCards } from '../data/curriculum'
import { guidedLessons } from '../data/lessons/catalog'
import { levels } from '../types'
import { lessonStatus, lessonStatusLabels } from '../utils/lessonProgress'
import type { StudyData } from '../types'
import { studyTotals } from '../utils/study'

export function Progress({ data }: { data: StudyData }) {
  const { words, sentences, weak } = studyTotals(data, availableCards(data))
  const correct = data.attempts.filter(attempt => attempt.result === 'correct').length
  return <>
    <PageIntro title="Progres" description="Pozri sa, čo už zvládaš a pri ktorých témach sa chyby opakujú." action={<a className="button button-primary" href={pageLink('daily')}>Denné opakovanie</a>} />
    <div className="stats-strip wide-stats">
      <div className="stat"><div><strong>{words}</strong><span>Zvládnuté slová</span></div></div>
      <div className="stat"><div><strong>{sentences}</strong><span>Správne napísané vety</span></div></div>
      <div className="stat"><div><strong>{data.attempts.length ? `${Math.round(correct / data.attempts.length * 100)} %` : '–'}</strong><span>Úspešnosť pokusov</span></div></div>
    </div>
    <section className="panel topic-panel guided-progress">
      <div className="section-title"><h2>Učebná cesta A1 až B2</h2><a className="text-link" href={pageLink('course')}>Otvoriť lekcie</a></div>
      {levels.map(level => {
        const lessons = guidedLessons.filter(item => item.level === level)
        const count = lessons.filter(item => data.lessons?.[item.id]?.learnedAt).length
        return <details key={level} className="progress-level">
          <summary><strong>{level}</strong><span>{count} z {lessons.length} zvládnutých</span></summary>
          <ul>{lessons.map(lesson => {
            const state = lessonStatus(lesson, data)
            return <li key={lesson.id}><a className="text-link" href={pageLink('course', { tema: lesson.id })}>{lesson.title}</a><span className={'status-text ' + state}>{lessonStatusLabels[state]}</span></li>
          })}</ul>
        </details>
      })}
    </section>
    <section className="panel topic-panel">
      <div className="section-title"><h2><Crosshair size={21} /> Témy na zopakovanie</h2></div>
      <p className="muted">Nesprávne pokusy za posledných 30 dní. Denné opakovanie uprednostní témy s najviac chybami.</p>
      {weak.length ? <ul className="topic-list">{weak.map(({ topic, count, name }) => <li key={topic}>
        <div><strong>{name}</strong><span>Počet chýb: {count}</span></div>
        <progress aria-label={`${name}, počet chýb: ${count}`} max={weak[0].count} value={count} />
        <a className="button button-secondary" href={pageLink('grammar', { topic })}>Precvičiť</a>
      </li>)}</ul> : <div className="empty-inline">Po prvých cvičeniach sa tu zobrazia témy, ktoré si môžeš zopakovať. <a className="text-link" href={pageLink('sentences')}>Začať tvoriť vety</a></div>}
    </section>
  </>
}
