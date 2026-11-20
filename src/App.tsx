import { useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { navigation, readPage } from './components/navigation'
import { useStudy } from './hooks/useStudy'
import { Daily } from './pages/Daily'
import { Dashboard } from './pages/Dashboard'
import { Flashcards } from './pages/Flashcards'
import { Progress } from './pages/Progress'
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
  return <Layout page={page} saveFailed={study.saveFailed}>
    {page === 'home' && <Dashboard data={study.data} />}
    {page === 'daily' && <Daily study={study} />}
    {(page === 'sentences' || page === 'grammar' || page === 'correction' || page === 'translation') && <Training key={key} mode={page} study={study} initialTopic={query.get('topic')} />}
    {page === 'flashcards' && <Flashcards study={study} />}
    {page === 'reading' && <Reading key={key} study={study} lessonId={query.get('lekcia')} />}
    {page === 'writing' && <Writing study={study} />}
    {page === 'vocabulary' && <Vocabulary study={study} />}
    {page === 'progress' && <Progress data={study.data} />}
  </Layout>
}
