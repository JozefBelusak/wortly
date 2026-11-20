import { BookOpen, ChartNoAxesColumnIncreasing, ClipboardList, FilePenLine, House, Languages, Layers3, NotebookPen, PencilLine, Shapes, SpellCheck } from 'lucide-react'

export const navigation = {
  home: { label: 'Prehľad', icon: House },
  daily: { label: 'Denné opakovanie', icon: ClipboardList },
  sentences: { label: 'Tvorba viet', icon: PencilLine },
  grammar: { label: 'Gramatika', icon: Shapes },
  flashcards: { label: 'Kartičky', icon: Layers3 },
  reading: { label: 'Čítanie', icon: BookOpen },
  correction: { label: 'Oprava viet', icon: SpellCheck },
  translation: { label: 'Preklad', icon: Languages },
  writing: { label: 'Voľné písanie', icon: FilePenLine },
  vocabulary: { label: 'Slovník', icon: NotebookPen },
  progress: { label: 'Progres', icon: ChartNoAxesColumnIncreasing },
} as const

export type Page = keyof typeof navigation

export const pageLink = (page: Page, query?: Record<string, string>) => `#/${page}${query ? `?${new URLSearchParams(query)}` : ''}`

export function readPage() {
  const [requested, rawQuery] = location.hash.replace(/^#\/?/, '').split('?')
  const page = Object.hasOwn(navigation, requested) ? requested as Page : 'home'
  return { page, query: new URLSearchParams(rawQuery) }
}
