import { BookOpen, CalendarDays, ChevronRight, Menu, Moon, Sun, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { formatDate } from '../utils/study'
import { navigation, pageLink } from './navigation'
import type { Page } from './navigation'

const groups: { label: string; pages: Page[] }[] = [
  { label: 'Učenie', pages: ['home', 'course'] },
  { label: 'Precvičovanie', pages: ['mixed', 'sentences', 'grammar', 'translation', 'correction'] },
  { label: 'Opakovanie', pages: ['daily', 'review'] },
  { label: 'Slovná zásoba', pages: ['vocabulary', 'flashcards'] },
  { label: 'Čítanie a písanie', pages: ['reading', 'writing'] },
  { label: 'Výsledky', pages: ['progress'] },
]

function getTheme() {
  try {
    return localStorage.getItem('deutschheft.theme') === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export function Layout({ page, saveFailed, children }: { page: Page; saveFailed: boolean; children: ReactNode }) {
  const [theme, setTheme] = useState(getTheme)
  const [menu, setMenu] = useState(false)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try { localStorage.setItem('deutschheft.theme', theme) } catch { /* Theme still works for this session. */ }
  }, [theme])

  useEffect(() => {
    if (!menu) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenu(false) }
    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, [menu])

  return (
    <div className="app-shell" data-menu={menu ? 'open' : 'closed'}>
      <a className="skip" href="#main-content" onClick={event => { event.preventDefault(); document.getElementById('main-content')?.focus() }}>Preskočiť na obsah</a>
      {menu && <button className="drawer-backdrop" aria-label="Zavrieť navigáciu" onClick={() => setMenu(false)} />}
      <aside className="sidebar" id="sidebar">
        <a className="brand" href={pageLink('home')} onClick={() => setMenu(false)}>
          <span className="brand-mark"><BookOpen size={20} strokeWidth={1.65} /></span>
          <span><strong>Deutschheft</strong><small>Študijný zošit</small></span>
        </a>
        <nav aria-label="Hlavná navigácia">
          {groups.map(group => (
            <div className="nav-group" key={group.label}>
              <p>{group.label}</p>
              {group.pages.map(item => {
                const { label, icon: Icon } = navigation[item]
                return <a href={pageLink(item)} key={item} className="nav-link" aria-current={page === item ? 'page' : undefined} onClick={() => setMenu(false)}><Icon size={17} strokeWidth={1.7} />{label}</a>
              })}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button type="button" className="theme-button" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />} {theme === 'light' ? 'Tmavý režim' : 'Svetlý režim'}
          </button>
        </div>
      </aside>
      <div className="workspace">
        <header className="topbar">
          <div className="topbar-inner">
            <button className="icon-button menu-button" aria-label={menu ? 'Zavrieť navigáciu' : 'Otvoriť navigáciu'} aria-expanded={menu} aria-controls="sidebar" onClick={() => setMenu(!menu)}>{menu ? <X size={21} /> : <Menu size={21} />}</button>
            <div className="breadcrumbs"><span>Učebňa</span><ChevronRight size={14} /><strong>{navigation[page].label}</strong></div>
            <div className="header-date"><CalendarDays size={16} strokeWidth={1.65} /> <time>{formatDate(new Date(), { weekday: 'long', month: 'long', day: 'numeric' })}</time></div>
          </div>
        </header>
        <main id="main-content" className="main" tabIndex={-1}>
          {saveFailed && <p className="notice" role="status">Prehliadač momentálne neumožňuje uložiť progres. Zmeny zostanú dostupné do zatvorenia stránky.</p>}
          {children}
        </main>
      </div>
    </div>
  )
}

export function PageIntro({ title, description, action }: { title: ReactNode; description?: ReactNode; action?: ReactNode }) {
  return <header className="page-intro"><div><h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</header>
}
