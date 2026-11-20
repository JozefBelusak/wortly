import { Crosshair } from 'lucide-react'
import { useEffect, useState } from 'react'
import { PageIntro } from '../components/Layout'
import { pageLink } from '../components/navigation'
import { availablePractice } from '../data/curriculum'
import { skillName } from '../data/grammarSkills'
import { Exercise } from '../features/Exercise'
import type { Study } from '../hooks/useStudy'
import { practicePicker } from '../utils/spiralPractice'

const labels = {
  repair: 'Precvičenie slabiny',
  review: 'Návrat k staršej látke',
  combine: 'Kombinovaná veta',
  focus: 'Cielené precvičenie',
}

export function Mixed({ study }: { study: Study }) {
  const practice = availablePractice(study.data)
  const [initial] = useState(() => practicePicker(practice, study.data.attempts)(practice, 1))
  const saved = study.data.mixed
  const selection = saved && practice.some(item => item.id === saved.exerciseId) ? saved : initial
  const exercise = practice.find(item => item.id === selection?.exerciseId)
  const { setData } = study

  useEffect(() => {
    if (!selection || selection === saved) return
    setData(data => ({ ...data, mixed: selection }))
  }, [selection, saved, setData])

  function next() {
    if (!selection) return
    setData(data => {
      const bank = availablePractice(data)
      const mixed = practicePicker(bank, data.attempts)(bank, selection.position + 1, selection)
      return { ...data, mixed }
    })
  }

  return <>
    <PageIntro title="Miešaný tréning" description="Striedaj staršie javy s novými. Pri opakovaných chybách dostaneš krátke precvičenie konkrétnej slabiny." />
    {exercise && selection && <div className="training-layout">
      <section className="training-main">
        <div className="mixed-position"><span>{labels[selection.reason]}</span><span>Úloha {selection.position}</span></div>
        <Exercise key={exercise.id} exercise={exercise} record={study.record} onNext={next} />
      </section>
      <aside className="training-sidebar">
        <div className="panel side-note">
          <Crosshair size={20} /><h2>Čo si precvičuješ</h2>
          {selection.skill && <p>Po opakovaných chybách si najprv precvičíš <strong>{skillName(selection.skill)}</strong>.</p>}
          <div className="tag-list">{exercise.skillTags.map(skill => <span className="tag" key={skill}>{skillName(skill)}</span>)}</div>
          <a className="text-link" href={pageLink('course')}>Celá učebná cesta</a>
        </div>
      </aside>
    </div>}
  </>
}
