import { useEffect, useState } from 'react'
import { ContextVocabularyProvider } from './components/ContextVocabulary'
import { Layout } from './components/Layout'
import { navigation, readPage } from './components/navigation'
import { useStudy } from './hooks/useStudy'
import { Course } from './pages/Course'
import { Daily } from './pages/Daily'
import { Dashboard } from './pages/Dashboard'
import { Flashcards } from './pages/Flashcards'
import { Progress } from './pages/Progress'
import { Learn } from './pages/Learn'
import { Review } from './pages/Review'
import { Mixed } from './pages/Mixed'
import { Reading } from './pages/Reading'
import { Training } from './pages/Training'
import { Vocabulary } from './pages/Vocabulary'
import { Writing } from './pages/Writing'

export default function App() {
  const study = useStudy()
  const [{ page, query }, setRoute] = useState(readPage)

  useEffect(() => {
    const change = () => {
      setRoute(readPage())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', change)
    return () => window.removeEventListener('hashchange', change)
  }, [])

  useEffect(() => {
    document.title = `${navigation[page].label} · Deutschheft`
  }, [page])

  const key = `${page}:${query.toString()}`
  return <ContextVocabularyProvider study={study} routeKey={key}><Layout page={page} saveFailed={study.saveFailed}>
    {page === 'home' && <Dashboard data={study.data} />}
    {page === 'course' && (query.has('bloky') || query.has('lekcia')
      ? <Course key={key} study={study} unitId={query.get('lekcia')} />
      : <Learn key={key} study={study} topicId={query.get('tema')} practice={query.has('cvic')} />)}
    {page === 'daily' && <Daily study={study} />}
    {page === 'review' && <Review study={study} />}
    {page === 'mixed' && <Mixed study={study} />}
    {(page === 'sentences' || page === 'grammar' || page === 'correction' || page === 'translation') && <Training key={key} mode={page} study={study} initialTopic={query.get('topic')} />}
    {page === 'flashcards' && <Flashcards key={key} study={study} unitId={query.get('lekcia')} />}
    {page === 'reading' && <Reading key={key} study={study} lessonId={query.get('lekcia')} />}
    {page === 'writing' && <Writing key={key} study={study} assignmentId={query.get('zadanie')} />}
    {page === 'vocabulary' && <Vocabulary study={study} />}
    {page === 'progress' && <Progress data={study.data} />}
  </Layout></ContextVocabularyProvider>
}
