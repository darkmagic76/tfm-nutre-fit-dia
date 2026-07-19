import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SustainabilityContainer } from './SustainabilityContainer'

describe('SustainabilityContainer', () => {
  it('renders the sustainability card with title', () => {
    render(<SustainabilityContainer />)
    expect(screen.getByText('🌍 Sostenibilidad')).toBeDefined()
  })

  it('displays zero-waste food count', () => {
    render(<SustainabilityContainer />)
    const heading = screen.getByRole('heading', { name: /Zero-Waste/i })
    expect(heading).toBeDefined()
  })

  it('displays emission comparison grid', () => {
    render(<SustainabilityContainer />)
    expect(screen.getByText(/Emisiones Comparativas/i)).toBeDefined()
  })

  it('displays scoring weights', () => {
    render(<SustainabilityContainer />)
    expect(screen.getByText(/huella de carbono/i)).toBeDefined()
    expect(screen.getByText(/temporalidad/i)).toBeDefined()
    expect(screen.getByText(/proximidad/i)).toBeDefined()
  })
})
