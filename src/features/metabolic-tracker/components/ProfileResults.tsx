import { StatCard } from '@shared/ui'
import type { CaloricTargetOutput } from '../services/caloricTargetService'

interface ProfileResultsProps {
  caloricTarget: CaloricTargetOutput
}

export function ProfileResults({ caloricTarget }: ProfileResultsProps) {
  return (
    <div className="grid grid-cols-2 gap-3" aria-label="Resultados del perfil metabólico" aria-live="polite">
      <StatCard label="BMR" value={`${caloricTarget.bmr} kcal`} />
      <StatCard label="TDEE" value={`${caloricTarget.tdee} kcal`} />
      <StatCard
        label="Déficit"
        value={`${caloricTarget.deficit} kcal`}
        variant={caloricTarget.restrictionActive ? 'danger' : 'default'}
        sub={caloricTarget.restrictionActive ? 'IMC > 25' : 'Sin restricción'}
      />
      <StatCard label="Objetivo diario" value={`${caloricTarget.target} kcal`} variant="success" />
    </div>
  )
}
