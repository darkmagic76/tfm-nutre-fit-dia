import { Card } from '@shared/ui'
import type { Food } from '@shared/domain'
import type { CaloricTargetOutput } from '@features/metabolic-tracker/services/caloricTargetService'
import type { ValidationResult } from '@shared/services/rationValidator'
import { CaloricSummary } from './components/CaloricSummary'
import { FoodList } from './components/FoodList'
import { DailyViolations } from './components/DailyViolations'

interface DailyLogViewProps {
  todayLog: Food[]
  todayValidation: ValidationResult | null
  caloricTarget: CaloricTargetOutput | null
  totalKcal: number
  onRemoveFood: (index: number) => void
}

export function DailyLogView({
  todayLog,
  todayValidation,
  caloricTarget,
  totalKcal,
  onRemoveFood,
}: DailyLogViewProps) {
  return (
    <Card
      title="📝 Registro de hoy"
      description={caloricTarget
        ? `Objetivo: ${caloricTarget.target} kcal | Ingerido: ${Math.round(totalKcal)} kcal${caloricTarget.restrictionActive ? ` | Déficit: ${caloricTarget.deficit} kcal` : ''}`
        : 'Usá el Semáforo para añadir alimentos al registro de hoy.'}
    >
      {caloricTarget && <CaloricSummary caloricTarget={caloricTarget} totalKcal={totalKcal} />}

      {!caloricTarget && (
        <p className="text-amber-600 text-sm" role="status">
          💡 Configurá tu perfil metabólico para ver el objetivo calórico.
        </p>
      )}

      <FoodList foods={todayLog} onRemove={onRemoveFood} />

      {todayValidation && <DailyViolations validation={todayValidation} hasFoods={todayLog.length > 0} />}
    </Card>
  )
}
