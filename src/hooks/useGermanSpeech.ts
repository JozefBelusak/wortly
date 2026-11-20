import { useEffect, useRef, useState } from 'react'

type Segment = 'answer' | 'example'
const germanFemale = /katja|hedda|anna|marlene|vicki|petra|katrin|kerstin|frau|female/i

export function germanVoice(voices: SpeechSynthesisVoice[]) {
  const german = voices.filter(voice => /^de(?:[-_]|$)/i.test(voice.lang))
  const standard = german.filter(voice => /^de[-_]de$/i.test(voice.lang))
  return standard.find(voice => germanFemale.test(voice.name)) ?? german.find(voice => germanFemale.test(voice.name))
    ?? standard[0] ?? german[0]
}

export function useGermanSpeech() {
  const [playing, setPlaying] = useState<Segment>()
  const [message, setMessage] = useState('')
  const current = useRef<SpeechSynthesisUtterance | null>(null)

  function cancel() {
    if (!current.current) return
    current.current.onend = null
    current.current.onerror = null
    current.current = null
    window.speechSynthesis.cancel()
  }

  useEffect(() => cancel, [])

  function speak(segment: Segment, text: string) {
    setMessage('')
    cancel()
    setPlaying(undefined)
    if (playing === segment) return
    if (!('speechSynthesis' in window) || !('SpeechSynthesisUtterance' in window)) {
      setMessage('Tento prehliadač nepodporuje prehrávanie výslovnosti.')
      return
    }

    const voices = window.speechSynthesis.getVoices()
    const voice = germanVoice(voices)
    if (voices.length && !voice) {
      setMessage('V zariadení chýba nemecký hlas. Pridaj ho v nastaveniach reči a skús znova.')
      return
    }

    const script = text.replace(/^Množné číslo:\s*/u, '').replace(/\s*·\s*/g, '. ')
    const utterance = new SpeechSynthesisUtterance(script)
    utterance.lang = voice?.lang ?? 'de-DE'
    if (voice) utterance.voice = voice
    utterance.rate = 0.88
    utterance.onend = () => {
      if (current.current !== utterance) return
      current.current = null
      setPlaying(undefined)
    }
    utterance.onerror = () => {
      utterance.onend?.({} as SpeechSynthesisEvent)
      setMessage('Výslovnosť sa nepodarilo prehrať. Skús znova alebo skontroluj nemecký hlas v zariadení.')
    }

    current.current = utterance
    setPlaying(segment)
    window.speechSynthesis.speak(utterance)
  }

  return { playing, message, speak }
}
