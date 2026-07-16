/** ADR-007: Sustainability scoring — domain types aligned with EAT-Lancet and ODS 2030 */

export const Seasonality = {
  IN_SEASON: 'in_season',
  GREENHOUSE: 'greenhouse',
  OUT_OF_SEASON: 'out_of_season',
} as const

export type Seasonality = (typeof Seasonality)[keyof typeof Seasonality]

export const Proximity = {
  LOCAL_KM0: 'km0',
  NATIONAL: 'national',
  IMPORTED: 'imported',
} as const

export type Proximity = (typeof Proximity)[keyof typeof Proximity]

export const PackagingLevel = {
  BULK: 'bulk',
  RECYCLABLE: 'recyclable',
  SINGLE_USE: 'single_use',
} as const

export type PackagingLevel = (typeof PackagingLevel)[keyof typeof PackagingLevel]

export interface EnvironmentalScore {
  /** kg CO2e per kg of food (AESAN 2022 reference values) */
  carbonFootprint: number
  /** Liters of water per kg of food */
  waterFootprint: number
  /** Current seasonal classification */
  seasonality: Seasonality
  /** Geographic origin relative to consumer */
  proximity: Proximity
  /** Packaging sustainability tier */
  packaging: PackagingLevel
  /** Composite 0–100 score. Higher = more sustainable. */
  score: number
}
