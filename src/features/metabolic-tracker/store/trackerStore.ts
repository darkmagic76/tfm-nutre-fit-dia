import { create } from 'zustand'
import { z } from 'zod'
import { ValidationError } from '@shared/errors'
import { computeIMC, parseNumeric } from '@shared/utils'
import {
  computeCaloricTarget,
  type CaloricTargetOutput,
} from '../services/caloricTargetService'
import { recordWeight, detectIMCThresholdCrossing } from '../services/biomarkerTrackingService'

const genderSchema = z.enum(['male', 'female'])

const DEFAULT_WEIGHT = '80'
const DEFAULT_HEIGHT = '170'
const DEFAULT_AGE = '55'
const DEFAULT_DIAGNOSIS_AGE = '55'
const DEFAULT_PAF = '1.2'

const WEIGHT_MIN = 30
const WEIGHT_MAX = 300
const HEIGHT_MIN = 100
const HEIGHT_MAX = 250
const AGE_MIN = 18
const AGE_MAX = 120
const PAF_MIN = 1.0
const PAF_MAX = 2.5

const DIAGNOSIS_AGE_MIN = 0
const DIAGNOSIS_AGE_MAX = 120

interface TrackerState {
  weight: string
  height: string
  age: string
  diagnosisAge: string
  gender: 'male' | 'female'
  paf: string
  caloricTarget: CaloricTargetOutput | null
  restrictionActive: boolean
  profileError: ValidationError | null

  setWeight: (v: string) => void
  setHeight: (v: string) => void
  setAge: (v: string) => void
  setDiagnosisAge: (v: string) => void
  setGender: (v: string) => void
  setPaf: (v: string) => void
  setRestrictionActive: (v: boolean) => void
  calculateTarget: () => void
}

export const useTrackerStore = create<TrackerState>((set, get) => ({
  weight: DEFAULT_WEIGHT,
  height: DEFAULT_HEIGHT,
  age: DEFAULT_AGE,
  diagnosisAge: DEFAULT_DIAGNOSIS_AGE,
  gender: 'male',
  paf: DEFAULT_PAF,
  caloricTarget: null,
  restrictionActive: false,
  profileError: null,

  setWeight: v => set({ weight: v }),
  setHeight: v => set({ height: v }),
  setAge: v => set({ age: v }),
  setDiagnosisAge: v => set({ diagnosisAge: v }),

  setGender: v => {
    try {
      const parsed = genderSchema.parse(v)
      set({ gender: parsed, profileError: null })
    } catch (e) {
      set({
        profileError: new ValidationError(
          `Género no válido: ${(e as Error).message}`,
          { value: v },
        ),
      })
    }
  },

  setPaf: v => set({ paf: v }),
  setRestrictionActive: v => set({ restrictionActive: v }),

  calculateTarget: () => {
    const { weight, height, age, diagnosisAge, gender, paf } = get()

    let w: number, h: number, a: number, p: number, da: number
    try {
      w = parseNumeric(weight, WEIGHT_MAX, WEIGHT_MIN)
      h = parseNumeric(height, HEIGHT_MAX, HEIGHT_MIN)
      a = parseNumeric(age, AGE_MAX, AGE_MIN)
      p = parseNumeric(paf, PAF_MAX, PAF_MIN)
      da = parseNumeric(diagnosisAge, DIAGNOSIS_AGE_MAX, DIAGNOSIS_AGE_MIN)
    } catch (e) {
      set({
        profileError:
          e instanceof ValidationError
            ? e
            : new ValidationError(`Error al procesar: ${(e as Error).message}`),
      })
      return
    }

    if (da > a) {
      set({
        profileError: new ValidationError(
          'La edad de diagnóstico no puede ser mayor que la edad actual',
          { diagnosisAge: da, currentAge: a },
        ),
      })
      return
    }

    const imc = computeIMC(w, h)
    const target = computeCaloricTarget({
      weight: w,
      height: h,
      age: a,
      gender,
      physicalActivityFactor: p,
      imc,
      diagnosisAge: da,
    })

    // FR-5.1: record weight reading for biomarker trends
    recordWeight(w, h)
    // Detect if IMC crossed the 25 threshold
    const crossing = detectIMCThresholdCrossing()
    const crossedMessage = crossing === 'crossed_above'
      ? 'IMC ha superado 25 — restricción calórica activada'
      : crossing === 'crossed_below'
        ? 'IMC ha bajado de 25 — restricción calórica desactivada'
        : null

    set({
      caloricTarget: target,
      restrictionActive: target.restrictionActive,
      profileError: crossedMessage
        ? new ValidationError(crossedMessage, { crossing, prevIMC: 'see history' })
        : null,
    })
  },
}))
