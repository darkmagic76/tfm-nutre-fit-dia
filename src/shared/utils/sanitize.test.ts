import { describe, it, expect } from 'vitest'
import { sanitizeNumeric } from './sanitize'

describe('sanitizeNumeric', () => {
  it('parses a normal decimal value', () => {
    expect(sanitizeNumeric('80.5', 300, 0)).toBe(80.5)
  })

  it('rejects multiple decimal points via parseFloat truncation', () => {
    expect(sanitizeNumeric('80.5.3', 300, 0)).toBe(80.5)
  })

  it('clamps values above max', () => {
    expect(sanitizeNumeric('999', 300, 30)).toBe(300)
  })

  it('returns min for non-numeric input', () => {
    expect(sanitizeNumeric('abc', 300, 30)).toBe(30)
  })

  it('clamps values below min', () => {
    expect(sanitizeNumeric('10', 300, 30)).toBe(30)
  })

  it('handles empty string', () => {
    expect(sanitizeNumeric('', 300, 30)).toBe(30)
  })
})
