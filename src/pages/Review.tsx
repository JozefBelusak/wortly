import { Crosshair } from 'lucide-react'
import { useState } from 'react'
import { PageIntro } from '../components/Layout'
import { pageLink } from '../components/navigation'
import { guidedLessons } from '../data/lessons/catalog'
import type { RuleReference } from '../data/lessons/rules'
import { RuleDrill } from '../features/Exercise'
import type { Study } from '../hooks/useStudy'
import { vocabularyStatus } from '../utils/contextVocabulary'
import { lessonStatus, ruleMisses } from '../utils/lessonProgress'
import { weakTopics } from '../utils/study'
import { learnLink } from './Learn'

export function Review({ study }: { study: Study }) {
  const [current, setCurrent] = useState<RuleReference>()
  const { data } = study
  const recurring = guidedLessons.flatMap(lesson => lesson.sections.map(section => ({
    lesson, section, misses: ruleMisses(data.attempts, section.id),
  }))).filter(item => item.misses >= 2).sort((a, b) => b.misses - a.misses)
  const due = guidedLessons.filter(lesson => data.lessons?.[lesson.id]?.learnedAt && lessonStatus(lesson, data) === 'review')
  const weak = weakTopics(data)
  const repeatedWords = Object.entries(data.vocabularyExposure ?? {})
    .filter(([id, item]) => item.opens >= 3 && item.translation && vocabularyStatus(data, id, data.words.find(word => word.contextEntryId === id)) !== 'known')
    .sort(([, a], [, b]) => b.opens - a.opens || b.lastSeen - a.lastSeen)
    .slice(0, 8)

  function complete() {
    const lesson = current?.lesson
    if (lesson) study.setData(previous => {
      const progress = previous.lessons?.[lesson.id]
      if (!progress?.learnedAt) return previous
      return { ...previous, lessons: { ...previous.lessons, [lesson.id]: { ...progress, reviewedAt: Date.now() } } }
    })
    setCurrent(undefined)
  }

  return <>
    <PageIntro title="Slabé miesta" description="Vráť sa ku konkrétnemu pravidlu a hneď si ho precvič."
      action={<div className="review-actions"><a className="button button-primary" href={pageLink('daily')}>Denné opakovanie</a><a className="button button-secondary" href={pageLink('flashcards')}>Kartičky na opakovanie</a></div>} />
    {current ? <div className="training-layout"><section className="training-main"><RuleDrill reference={current} study={study} onBack={() => setCurrent(undefined)} onComplete={complete} /></section></div> : <>
      <section className="panel topic-panel">
        <div className="section-title"><h2><Crosshair size={21} /> Opakované chyby</h2></div>
        {recurring.length ? <ul className="review-rules">{recurring.map(item =>
          <li key={item.section.id}><div><strong>{item.section.title}</strong><small>{item.lesson.title} · {item.misses} nesprávnych pokusov</small></div>
            <button className="button button-secondary" type="button" onClick={() => setCurrent(item)}>Zopakovať pravidlo</button></li>,
        )}</ul> : <p className="muted">Keď sa chyba zopakuje, nájdeš tu príslušné pravidlo.</p>}
      </section>
      {due.length > 0 && <section className="panel topic-panel review-followup">
        <div className="section-title"><h2>Lekcie na zopakovanie</h2></div>
        <ul className="review-rules">{due.map(lesson => <li key={lesson.id}><strong>{lesson.title}</strong><a className="button button-secondary" href={learnLink(lesson.id)}>Otvoriť lekciu</a></li>)}</ul>
      </section>}
      {repeatedWords.length > 0 && <section className="panel topic-panel review-followup">
        <div className="section-title"><h2>Často vyhľadávané slovíčka</h2></div>
        <ul className="review-rules">{repeatedWords.map(([id, item]) => <li key={id}>
          <div><strong lang="de">{item.term}</strong><small>{item.translation}</small></div>
          <small>{item.opens}× otvorené</small>
        </li>)}</ul>
      </section>}
      {weak.length > 0 && <section className="panel topic-panel review-followup">
        <div className="section-title"><h2>Precvičiť podľa témy</h2></div>
        <ul className="review-rules">{weak.map(({ topic, name, count }) => <li key={topic}><div><strong>{name}</strong><small>{count} nesprávnych pokusov za posledných 30 dní</small></div>
          <a className="button button-secondary" href={pageLink('grammar', { topic })}>Precvičiť</a></li>)}</ul>
      </section>}
    </>}
  </>
}
