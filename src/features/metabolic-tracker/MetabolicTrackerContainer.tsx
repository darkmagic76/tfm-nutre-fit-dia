import { useTrackerStore } from './store'
import { MetabolicTrackerView } from './MetabolicTrackerView'
import type { FormEvent } from 'react'

export function MetabolicTrackerContainer() {
  const {
    weight, height, age, diagnosisAge, gender, paf, caloricTarget, profileError,
    setWeight, setHeight, setAge, setDiagnosisAge, setGender, setPaf, calculateTarget,
  } = useTrackerStore()

  const handleCalculate = (e: FormEvent) => {
    e.preventDefault()
    calculateTarget()
  }

  return (
    <MetabolicTrackerView
      form={{ weight, height, age, diagnosisAge, gender, paf, setWeight, setHeight, setAge, setDiagnosisAge, setGender, setPaf }}
      caloricTarget={caloricTarget}
      profileError={profileError}
      onCalculate={handleCalculate}
    />
  )
}
