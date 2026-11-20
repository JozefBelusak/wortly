import { skillName, skillTopic } from './grammarSkills'
import type { SkillId } from './grammarSkills'
import type { Exercise, Level } from '../types'

export interface SpiralExercise extends Exercise {
  unitId: string
}

type Diagnostic = [skill: SkillId, patterns: string[], hint: string]
type SpiralRow = [
  kind: 'grammar' | 'sentence' | 'translation' | 'correction',
  skills: SkillId[],
  prompt: string,
  answer: string,
  explanation: string,
  alternatives?: string[],
  diagnostics?: Diagnostic[],
]

export function spiral(unitId: string, difficulty: Level, rows: SpiralRow[]): SpiralExercise[] {
  return rows.map(([kind, skills, prompt, answer, explanation, acceptedAnswers = [], diagnostics = []], index) => ({
    id: 'spiral-' + unitId + '-' + (index + 1),
    unitId,
    type: kind === 'translation' ? 'sentence' : kind,
    promptLanguage: kind === 'translation' ? 'sk' : 'de',
    difficulty,
    prompt,
    answer,
    explanation,
    acceptedAnswers,
    hint: 'Zameraj sa na ' + skillName(skills[0]) + '.',
    tags: [...new Set(skills.map(skillTopic))],
    skillTags: skills,
    practice: (kind === 'grammar' && prompt.includes('___')) || skills.length < 3 ? 'focused' : 'mixed',
    diagnostics: diagnostics.map(([skill, patterns, hint]) => ({ skill, patterns, hint })),
  }))
}
