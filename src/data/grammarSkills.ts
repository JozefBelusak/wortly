import type { ExerciseType, Level, Topic } from '../types'

export const grammarSkills = {
  conjugation: ['Časovanie', 'conjugation', 'A1'],
  gender: ['der, die, das', 'articles', 'A1'],
  plural: ['Množné číslo', 'articles', 'A1'],
  nominative: ['Nominativ', 'articles', 'A1'],
  accusative: ['Akkusativ', 'akkusativ', 'A1'],
  dative: ['Dativ', 'dativ', 'A2'],
  genitive: ['Genitiv', 'genitive', 'B1'],
  'two-way': ['Wechselpräpositionen', 'location', 'A2'],
  wo: ['Wo? · poloha', 'location', 'A1'],
  wohin: ['Wohin? · smer', 'location', 'A1'],
  'fixed-prep': ['Predložky s pevným pádom', 'prepositions', 'A2'],
  'verb-prep': ['Slovesá s predložkami', 'verb-prepositions', 'B1'],
  'da-wo': ['Worauf, darauf a podobné tvary', 'verb-prepositions', 'B1'],
  v2: ['Sloveso na druhej pozícii', 'word-order', 'A1'],
  subordinate: ['Slovosled vo vedľajšej vete', 'subordinate', 'A2'],
  'verb-bracket': ['Viac slovies vo vete', 'word-order', 'A2'],
  weil: ['Weil', 'subordinate', 'A2'],
  dass: ['Dass', 'subordinate', 'A2'],
  wenn: ['Wenn', 'subordinate', 'A2'],
  obwohl: ['Obwohl', 'connectors', 'B1'],
  trotzdem: ['Trotzdem', 'connectors', 'B1'],
  'main-link': ['Deshalb, deswegen, außerdem, allerdings', 'connectors', 'A2'],
  indirect: ['Ob a nepriame otázky', 'subordinate', 'B1'],
  'als-wenn': ['Als alebo wenn', 'temporal', 'B1'],
  'time-clause': ['Bevor, nachdem, während, seitdem, bis', 'temporal', 'B1'],
  tekamolo: ['TeKaMoLo a neutrálne poradie', 'word-order', 'B1'],
  separable: ['Odlučiteľné predpony', 'separable', 'A1'],
  inseparable: ['Neodlučiteľné predpony', 'word-formation', 'A2'],
  perfect: ['Perfekt', 'perfekt-aux', 'A2'],
  participle: ['Partizip II', 'participle', 'A2'],
  preterite: ['Präteritum', 'preterite', 'A2'],
  pluperfect: ['Plusquamperfekt', 'preterite', 'B1'],
  future: ['Futur I', 'future', 'B1'],
  'modal-present': ['Modálne slovesá v prítomnosti', 'modal', 'A1'],
  'modal-past': ['Modálne slovesá v minulosti', 'modal', 'A2'],
  subjunctive: ['Konjunktiv II', 'subjunctive', 'B2'],
  zu: ['Infinitiv mit zu', 'infinitive', 'B1'],
  'um-zu': ['Um … zu', 'infinitive', 'B1'],
  'ohne-zu': ['Ohne … zu', 'infinitive', 'B1'],
  'statt-zu': ['Statt … zu', 'infinitive', 'B1'],
  reflexive: ['Reflexívne slovesá', 'reflexive', 'A2'],
  'reflexive-prep': ['Reflexívne slovesá s predložkou', 'reflexive', 'B1'],
  possessive: ['Privlastňovacie zámená', 'possessive', 'A1'],
  personal: ['Osobné zámená a ich pády', 'pronouns', 'A1'],
  'pronoun-order': ['Poradie zámen', 'pronouns', 'B1'],
  'negation-choice': ['Nicht alebo kein', 'negation', 'A1'],
  'negation-position': ['Poloha nicht', 'negation', 'A2'],
  'adjective-endings': ['Koncovky prídavných mien', 'adjectives', 'B1'],
  comparison: ['Stupňovanie a porovnávanie', 'adjectives', 'A2'],
  relative: ['Relatívne vety', 'relative', 'B1'],
  'relative-prep': ['Relatívne zámeno s predložkou', 'relative', 'B1'],
  'passive-present': ['Passiv v Präsens', 'passive', 'B2'],
  'passive-past': ['Passiv v Präterite a Perfekte', 'passive', 'B2'],
  'noun-declension': ['N-Deklination', 'noun-declension', 'B1'],
  'word-formation': ['Slovotvorba', 'word-formation', 'B1'],
  'paired-links': ['Einerseits, sowohl, weder', 'connectors', 'B2'],
  reading: ['Porozumenie textu', 'vocabulary', 'A1'],
  meaning: ['Slovná zásoba a význam', 'vocabulary', 'A1'],
} as const satisfies Record<string, readonly [string, Topic, Level]>

export type SkillId = keyof typeof grammarSkills
export const skillName = (skill: SkillId) => grammarSkills[skill][0]
export const skillTopic = (skill: SkillId): Topic => grammarSkills[skill][1]

const legacyTags = {
  conjugation: 'conjugation',
  'word-order': 'v2',
  akkusativ: 'accusative',
  dativ: 'dative',
  articles: 'gender',
  'perfekt-aux': 'perfect',
  participle: 'participle',
  modal: 'modal-present',
  separable: 'separable',
  subordinate: 'subordinate',
  reflexive: 'reflexive',
  location: 'wo',
  possessive: 'possessive',
  pronouns: 'personal',
  preterite: 'preterite',
  infinitive: 'zu',
  relative: 'relative',
  adjectives: 'adjective-endings',
  temporal: 'time-clause',
  subjunctive: 'subjunctive',
  passive: 'passive-present',
  connectors: 'main-link',
  prepositions: 'fixed-prep',
  genitive: 'genitive',
  'verb-prepositions': 'verb-prep',
  negation: 'negation-choice',
  future: 'future',
  'noun-declension': 'noun-declension',
  'word-formation': 'word-formation',
  vocabulary: 'meaning',
} as const satisfies Record<Topic, SkillId>

export function matchingSkill(skills: SkillId[], topic: Topic) {
  const matches = skills.filter(skill => skillTopic(skill) === topic)
  return matches.length === 1 ? matches[0] : undefined
}

export function inferSkillTags(type: ExerciseType, topics: Topic[], prompt: string, answer: string): SkillId[] {
  if (type === 'reading') return ['reading']
  if (type === 'reverse') return ['meaning']

  const text = (prompt + ' ' + answer).toLocaleLowerCase()
  const skills = new Set<SkillId>(topics.map(topic => legacyTags[topic]))

  if (topics.includes('location')) {
    if (/\b(?:ins|ans|aufs|in die|auf die|nach hause|wohin)\b/.test(text)) {
      skills.delete('wo')
      skills.add('wohin')
    }
    if (/\b(?:ins|im|in d[ia]e?|in der|aufs|auf die|auf der)\b/.test(text)) skills.add('two-way')
  }
  if (topics.includes('modal') && /\b(?:konnte|musste|wollte|durfte|sollte|mochte)\w*\b/.test(text)) {
    skills.delete('modal-present')
    skills.add('modal-past')
  }
  if (type === 'sentence' || type === 'correction') {
    if (topics.includes('modal') || topics.includes('participle') || topics.includes('perfekt-aux')) skills.add('verb-bracket')
    if (/\bkein(?:e|en|em|er|es)?\b/.test(text)) skills.add('negation-choice')
    if (/\bnicht\b/.test(answer.toLowerCase())) skills.add('negation-position')
  }
  if (topics.includes('subordinate') || topics.includes('word-order')) {
    if (/\bweil\b/.test(text)) skills.add('weil')
    if (/\bdass\b/.test(text)) skills.add('dass')
    if (/\bwenn\b/.test(text)) skills.add('wenn')
  }
  if (topics.includes('word-order') && /\b(?:deshalb|deswegen|außerdem|allerdings)\b/.test(text)) skills.add('main-link')
  if (topics.includes('relative') && /\b(?:mit dem|von der|in dem)\b/.test(text)) skills.add('relative-prep')
  if (topics.includes('participle') && /\b(?:hatte|hatten|war|waren)\b/.test(answer.toLowerCase())) skills.add('pluperfect')
  if (topics.includes('passive') && /\b(?:wurde|wurden|worden)\b/.test(text)) {
    skills.delete('passive-present')
    skills.add('passive-past')
  }
  if (topics.includes('infinitive') && /\bum\b[^.!?]*\bzu\b/.test(text)) skills.add('um-zu')
  return [...skills]
}
