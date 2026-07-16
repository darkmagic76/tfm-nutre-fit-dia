import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PlanView } from './PlanView'
import { FoodCategory } from '@shared/domain'
import type { WeeklyPlan } from './services/planGenerator'

const invalidPlan: WeeklyPlan = {
  days: [{ day: 1, entries: [] }, { day: 2, entries: [] }],
  dailyResults: [
    {
      valid: false,
      violations: [
        {
          category: FoodCategory.CEREALS,
          current: 10,
          limit: 6,
          direction: 'over',
          unit: 'day',
          message: 'cereals: 10 raciones (máx 6/día)',
        },
      ],
      animalProteinCount: 0,
    },
    {
      valid: true,
      violations: [],
      animalProteinCount: 0,
    },
  ],
  weeklyResult: {
    valid: false,
    violations: [
      {
        category: FoodCategory.LEGUMES,
        current: 1,
        limit: 4,
        direction: 'under',
        unit: 'week',
        message: 'legumes: 1 raciones (mín 4/semana)',
      },
    ],
    animalProteinCount: 0,
  },
  valid: false,
}

describe('PlanView', () => {
  const defaultProps = {
    restrictionActive: false,
    weeklyPlan: null as WeeklyPlan | null,
    onToggleRestriction: vi.fn(),
    onGeneratePlan: vi.fn(),
  }

  it('renders checkbox and generate button', () => {
    render(<PlanView {...defaultProps} />)
    expect(screen.getByLabelText(/activar restricción calórica/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /generar plan/i })).toBeInTheDocument()
  })

  it('displays valid plan status', () => {
    const validPlan: WeeklyPlan = {
      ...invalidPlan,
      valid: true,
      weeklyResult: { ...invalidPlan.weeklyResult, valid: true, violations: [] },
      dailyResults: [{ ...invalidPlan.dailyResults[0], valid: true, violations: [] }],
    }
    render(<PlanView {...defaultProps} weeklyPlan={validPlan} />)
    const status = screen.getByRole('status')
    expect(status.textContent).toContain('Plan válido')
  })

  it('displays weekly violations for invalid plan', () => {
    render(<PlanView {...defaultProps} weeklyPlan={invalidPlan} />)
    const alerts = screen.getAllByRole('alert')
    const alertTexts = alerts.map(a => a.textContent).join(' ')
    expect(alertTexts).toContain('Violaciones detectadas')
    expect(alertTexts).toContain('legumes: 1 raciones')
  })

  it('displays daily violation details', () => {
    render(<PlanView {...defaultProps} weeklyPlan={invalidPlan} />)
    expect(screen.getByText('Día 1: 1 violaciones')).toBeInTheDocument()
    expect(screen.getByText('cereals: 10 raciones (máx 6/día)')).toBeInTheDocument()
  })
})
