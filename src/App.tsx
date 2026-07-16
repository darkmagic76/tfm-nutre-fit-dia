import { TabButton } from '@shared/ui'
import { useTabNavigation, TABS } from '@shared/hooks/useTabNavigation'
import { ScannerContainer } from '@features/nutritional-traffic-light/ScannerContainer'
import { DailyLogContainer } from '@features/med-diet-validator/DailyLogContainer'
import { MetabolicTrackerContainer } from '@features/metabolic-tracker/MetabolicTrackerContainer'
import { PlanContainer } from '@features/recipe-engine/PlanContainer'

export default function App() {
  const { tab, setTab } = useTabNavigation()

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900">
      <header className="bg-emerald-800 text-white p-4 sm:p-6" role="banner">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">NutreFitDia</h1>
        <p className="text-center text-emerald-200 text-xs sm:text-sm mt-1">
          Ecosistema de Autocuidado Integral para Diabetes Tipo 2
        </p>
        <nav
          className="flex justify-center gap-2 mt-4 flex-wrap"
          role="tablist"
          aria-label="Navegación principal"
        >
          {TABS.map(t => (
            <TabButton
              key={t.id}
              active={tab === t.id}
              onClick={() => setTab(t.id)}
              aria-controls={`panel-${t.id}`}
            >
              {t.icon} {t.label}
            </TabButton>
          ))}
        </nav>
        <p className="text-center text-emerald-300 text-[10px] mt-2">
          Usá ← → para navegar entre pestañas
        </p>
      </header>

      <main className="max-w-3xl mx-auto p-4 sm:p-6" id="main-content">
        <div role="tabpanel" id="panel-scanner" hidden={tab !== 'scanner'} aria-label="Semáforo nutricional">
          {tab === 'scanner' && <ScannerContainer />}
        </div>
        <div role="tabpanel" id="panel-log" hidden={tab !== 'log'} aria-label="Registro diario">
          {tab === 'log' && <DailyLogContainer />}
        </div>
        <div role="tabpanel" id="panel-metabolic" hidden={tab !== 'metabolic'} aria-label="Perfil metabólico">
          {tab === 'metabolic' && <MetabolicTrackerContainer />}
        </div>
        <div role="tabpanel" id="panel-plan" hidden={tab !== 'plan'} aria-label="Plan semanal">
          {tab === 'plan' && <PlanContainer />}
        </div>
      </main>

      <footer className="text-center text-stone-400 text-xs p-4 border-t border-stone-200" role="contentinfo">
        <p>TFM · NutreFitDia · erMedDiet + AESAN 2022</p>
        <p className="mt-1">
          ⚕️ Toda recomendación debe ser validada por un dietista-nutricionista colegiado
        </p>
        <p className="mt-1">
          <a href="/.well-known/security.txt" className="underline hover:text-stone-600">Seguridad</a>
        </p>
      </footer>
    </div>
  )
}
