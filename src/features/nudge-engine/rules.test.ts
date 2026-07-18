import { describe, it, expect } from 'vitest'
import { SAFETY_RULES, HIGH_GLYCEMIC_FRUITS } from './rules'
import { emptyCounts } from '@shared/services/rationValidator'
import { FoodCategory } from '@shared/domain'
import type { NudgeContext } from './types'

function makeContext(overrides: Partial<NudgeContext> = {}): NudgeContext {
  return {
    restrictionActive: false,
    animalProteinCount: 0,
    minutesSinceHydration: 0,
    isTodayValid: true,
    counts: emptyCounts(),
    containsHighGlycemicFruit: false,
    currentHour: 12,
    ...overrides,
  }
}

describe('SAFETY_RULES', () => {
  describe('CEREALS_RESTRICTION', () => {
    const rule = SAFETY_RULES.find(r => r.id === 'CEREALS_RESTRICTION')
    it('exists with correct id', () => {
      expect(rule).toBeDefined()
    })

    it('fires when restrictionActive and CEREALS > 4', () => {
      const ctx = makeContext({
        restrictionActive: true,
        counts: { ...emptyCounts(), [FoodCategory.CEREALS]: 5 },
      })
      expect(rule!.condition(ctx)).toBe(true)
    })

    it('does NOT fire when restrictionActive is false despite high cereals', () => {
      const ctx = makeContext({
        restrictionActive: false,
        counts: { ...emptyCounts(), [FoodCategory.CEREALS]: 5 },
      })
      expect(rule!.condition(ctx)).toBe(false)
    })

    it('does NOT fire when CEREALS = 4 (boundary, ≤4 is within limit)', () => {
      const ctx = makeContext({
        restrictionActive: true,
        counts: { ...emptyCounts(), [FoodCategory.CEREALS]: 4 },
      })
      expect(rule!.condition(ctx)).toBe(false)
    })
  })

  describe('FRUITS_GLYCEMIC_ALERT', () => {
    const rule = SAFETY_RULES.find(r => r.id === 'FRUITS_GLYCEMIC_ALERT')
    it('exists with correct id', () => {
      expect(rule).toBeDefined()
    })

    it('fires when containsHighGlycemicFruit is true', () => {
      const ctx = makeContext({ containsHighGlycemicFruit: true })
      expect(rule!.condition(ctx)).toBe(true)
    })

    it('does NOT fire when containsHighGlycemicFruit is false', () => {
      const ctx = makeContext({ containsHighGlycemicFruit: false })
      expect(rule!.condition(ctx)).toBe(false)
    })
  })

  describe('VEGETABLES_DEFICIT', () => {
    const rule = SAFETY_RULES.find(r => r.id === 'VEGETABLES_DEFICIT')
    it('exists with correct id', () => {
      expect(rule).toBeDefined()
    })

    it('fires when VEGETABLES < 3 and hour >= 20', () => {
      const ctx = makeContext({
        counts: { ...emptyCounts(), [FoodCategory.VEGETABLES]: 2 },
        currentHour: 20,
      })
      expect(rule!.condition(ctx)).toBe(true)
    })

    it('does NOT fire when hour=19 (before evening gate)', () => {
      const ctx = makeContext({
        counts: { ...emptyCounts(), [FoodCategory.VEGETABLES]: 2 },
        currentHour: 19,
      })
      expect(rule!.condition(ctx)).toBe(false)
    })

    it('does NOT fire when VEGETABLES = 3 (sufficient)', () => {
      const ctx = makeContext({
        counts: { ...emptyCounts(), [FoodCategory.VEGETABLES]: 3 },
        currentHour: 21,
      })
      expect(rule!.condition(ctx)).toBe(false)
    })
  })
})

describe('HIGH_GLYCEMIC_FRUITS set', () => {
  it('contains known high-glycemic fruits', () => {
    expect(HIGH_GLYCEMIC_FRUITS.has('uva')).toBe(true)
    expect(HIGH_GLYCEMIC_FRUITS.has('dátil')).toBe(true)
    expect(HIGH_GLYCEMIC_FRUITS.has('higo')).toBe(true)
    expect(HIGH_GLYCEMIC_FRUITS.has('pasa')).toBe(true)
    expect(HIGH_GLYCEMIC_FRUITS.has('plátano maduro')).toBe(true)
  })

  it('does not contain low-glycemic fruits like manzana', () => {
    expect(HIGH_GLYCEMIC_FRUITS.has('manzana')).toBe(false)
  })
})
