import { NotificationType, NotificationSeverity, FoodCategory } from '@shared/domain'
import type { SafetyRule } from './types'

/** High-glycemic fruits that trigger a safety alert when consumed */
export const HIGH_GLYCEMIC_FRUITS: ReadonlySet<string> = new Set([
  'uva',
  'dátil',
  'higo',
  'pasa',
  'plátano maduro',
])

/** All safety rules evaluated by the nudge engine */
export const SAFETY_RULES: SafetyRule[] = [
  {
    id: 'CEREALS_RESTRICTION',
    type: NotificationType.SAFETY_ALERT,
    severity: NotificationSeverity.HARD_BLOCK,
    cooldown: 24 * 60, // 24 hours in minutes
    title: 'Límite de cereales excedido',
    body: 'Has superado las 4 raciones de cereales permitidas durante la restricción calórica.',
    condition: ctx =>
      ctx.restrictionActive && ctx.counts[FoodCategory.CEREALS] > 4,
  },
  {
    id: 'FRUITS_GLYCEMIC_ALERT',
    type: NotificationType.SAFETY_ALERT,
    severity: NotificationSeverity.SOFT_WARN,
    cooldown: 24 * 60, // 24 hours in minutes
    title: 'Fruta de alto índice glucémico',
    body: 'Has registrado una fruta con alto índice glucémico. Considera alternativas como manzana o pera.',
    condition: ctx => ctx.containsHighGlycemicFruit,
  },
  {
    id: 'VEGETABLES_DEFICIT',
    type: NotificationType.SAFETY_ALERT,
    severity: NotificationSeverity.SOFT_WARN,
    cooldown: 6 * 60, // 6 hours in minutes
    title: '¿Has comido suficientes verduras?',
    body: 'Llevas menos de 3 raciones de verduras hoy. Intenta incluir una ración en la cena.',
    condition: ctx =>
      ctx.counts[FoodCategory.VEGETABLES] < 3 && ctx.currentHour >= 20,
  },
]
