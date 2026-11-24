import { BookOpen, CircleCheck, ClipboardList, Crosshair, Layers3, PencilLine, Play, Shapes, Shuffle, TextCursorInput } from 'lucide-react'
import { PageIntro } from '../components/Layout'
import { navigation, pageLink } from '../components/navigation'
import type { Page } from '../components/navigation'
import { availableCards, nextGuidedLesson } from '../data/curriculum'
import type { StudyData } from '../types'
import { dueCards, localDate, studyTotals, wordCard } from '../utils/study'

const shortcuts = [
  { page: 'mixed', icon: Shuffle, detail: 'Spoj staršie javy s novými', tone: 'blue' },
  { page: 'sentences', icon: PencilLine, detail: 'Prelož a preformuluj vety', tone: 'blue' },
  { page: 'flashcards', icon: Layers3, detail: 'Vybav si slová a celé frázy', tone: 'ochre' },
  { page: 'reading', icon: BookOpen, detail: 'Krátke texty s otázkami', tone: 'green' },
] as const satisfies readonly { page: Page; icon: typeof Shapes; detail: string; tone: string }[]

export function Dashboard({ data }: { data: StudyData }) {
  const cards = availableCards(data)
  const lesson = nextGuidedLesson(data)
  const totals = studyTotals(data, cards)
  const due = dueCards([...cards, ...data.words.map(wordCard)], data.reviews).length
  const lessonStarted = lesson && (data.lessons?.[lesson.id]?.step ?? 0) > 0
  const today = data.daily?.date === localDate() ? data.daily : undefined
  const dailyDone = today && today.position >= 16

  return (
    <>
      <PageIntro title="Prehľad štúdia" description="Precvičuj si nemčinu písaním, čítaním a opravou vlastných chýb." action={<a className="level-label course-overview-link" href={pageLink('course')}><BookOpen size={15} /> Učebná cesta A1 – B2</a>} />
      <section className="dashboard-hero" aria-labelledby="continue-title">
        <div className="hero-art" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}brandenburger-tor.webp`} alt="" fetchPriority="high" /></div>
        <div className="hero-content">
          <p className="eyebrow"><span className="gold-rule" /> {lesson ? 'Lekcia ' + lesson.level : 'Opakovanie'}</p>
          <h2 id="continue-title">{lesson?.title ?? 'Miešaný tréning'}</h2>
          <p>{lesson?.goal ?? 'Zopakuj si naučené pravidlá v kombinovaných úlohách.'}</p>
          <div className="hero-actions">
            <a className="button button-gold" href={lesson ? pageLink('course', { tema: lesson.id }) : pageLink('mixed')}><Play size={15} /> {lesson ? lessonStarted ? 'Pokračovať v lekcii' : 'Začať lekciu' : 'Otvoriť tréning'}</a>
          </div>
        </div>
      </section>
      <section className="stats-strip" aria-label="Štatistiky štúdia">
        <div className="stat"><span className="feature-icon green"><CircleCheck size={20} /></span><div><strong>{totals.words}</strong><span>Zvládnuté slová</span></div></div>
        <div className="stat"><span className="feature-icon blue"><TextCursorInput size={20} /></span><div><strong>{totals.sentences}</strong><span>Správne napísané vety</span></div></div>
        <div className="stat"><span className="feature-icon ochre"><Crosshair size={20} /></span><div><strong>{totals.weak.length}</strong><span>Témy na zopakovanie</span></div></div>
      </section>
      <div className="dashboard-bottom">
        <section className="practice-section" aria-labelledby="practice-title">
          <div className="section-title"><h2 id="practice-title">Precvičovanie</h2></div>
          <div className="shortcut-grid">
            {shortcuts.map(({ page, icon: Icon, detail, tone }) => <a className="shortcut" key={page} href={pageLink(page)}><span className={`feature-icon ${tone}`}><Icon size={20} strokeWidth={1.65} /></span><span><strong>{navigation[page].label}</strong><small>{detail}</small></span></a>)}
          </div>
        </section>
        <section className="practice-section" aria-labelledby="review-title">
          <div className="section-title"><h2 id="review-title">Čo zopakovať</h2></div>
          <div className="review-box">
            <div className="review-info">
              <span className="feature-icon ochre"><ClipboardList size={20} strokeWidth={1.7} /></span>
              <div><h3>Denné opakovanie</h3><p>{dailyDone ? 'Dnešné opakovanie je hotové' : today ? `${today.position} zo 16 úloh hotových` : '16 úloh · 10–15 minút'}</p></div>
            </div>
            {totals.weak.length > 0 ? <p className="review-note">Na precvičenie sa hodí <a href={pageLink('review')}>{totals.weak[0].name}</a>. Počet nedávnych chýb: {totals.weak[0].count}.</p> : <p className="review-note">Kartičky pripravené na opakovanie: <strong>{due}</strong></p>}
            <a className="button button-secondary" href={pageLink('daily')}>{dailyDone ? 'Zobraziť prehľad' : today?.position ? 'Pokračovať v opakovaní' : 'Začať opakovanie'}</a>
          </div>
        </section>
      </div>
    </>
  )
}
