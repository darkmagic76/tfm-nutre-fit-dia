import { Card } from '@shared/ui'
import { PROTEIN_EMISSION_RATIOS, SCORING_WEIGHTS } from '@shared/sustainability'

interface SustainabilityViewProps {
  zeroWasteCount: number
  totalFoods: number
}

export function SustainabilityView({ zeroWasteCount, totalFoods }: SustainabilityViewProps) {
  return (
    <Card
      title="🌍 Sostenibilidad"
      description="Impacto ambiental según AESAN 2022 y ODS 2030"
    >
      <div className="space-y-4 text-sm" role="region" aria-label="Información de sostenibilidad">
        <section>
          <h3 className="font-semibold text-emerald-700 mb-1">Puntuación Ambiental</h3>
          <p className="text-stone-600">
            Cada alimento recibe una puntuación de 0–100 basada en:
          </p>
          <ul className="list-disc list-inside ml-2 mt-1 text-stone-500 space-y-0.5">
            <li>Huella de carbono — {SCORING_WEIGHTS.carbon * 100}% del peso</li>
            <li>Temporalidad (producto de temporada) — {SCORING_WEIGHTS.seasonality * 100}%</li>
            <li>Proximidad (origen local/KM0) — {SCORING_WEIGHTS.proximity * 100}%</li>
          </ul>
        </section>

        <section>
          <h3 className="font-semibold text-emerald-700 mb-1">Zero-Waste</h3>
          <p className="text-stone-600">
            Productos con defectos estéticos pero perfectamente comestibles:{' '}
            <span className="font-medium text-emerald-600">{zeroWasteCount}</span> de{' '}
            <span className="font-medium">{totalFoods}</span> alimentos
          </p>
          <p className="text-stone-400 text-xs mt-1">
            ♻️ Zero-Waste · 🥕 KM0 / Defectos estéticos
          </p>
        </section>

        <section>
          <h3 className="font-semibold text-emerald-700 mb-1">Emisiones Comparativas</h3>
          <p className="text-stone-600 text-xs mb-2">
            kg CO₂eq por kg de alimento (EAT-Lancet)
          </p>
          <div className="grid grid-cols-2 gap-1 text-xs">
            {Object.entries(PROTEIN_EMISSION_RATIOS).map(([key, value]) => (
              <div key={key} className="flex justify-between bg-stone-50 px-2 py-1 rounded">
                <span className="text-stone-600">{key}</span>
                <span className="font-mono text-stone-800">{value.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Card>
  )
}
