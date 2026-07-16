interface ViolationListProps {
  violations: Array<{ message: string; direction?: 'under' | 'over' }>
  type?: 'error' | 'warning'
}

export function ViolationList({ violations, type = 'error' }: ViolationListProps) {
  if (violations.length === 0) return null

  const styles = type === 'error'
    ? 'bg-red-50 text-red-700 border-red-200'
    : 'bg-amber-50 text-amber-700 border-amber-200'

  return (
    <div
      className={`p-3 rounded-lg text-sm space-y-1 border ${styles}`}
      role="alert"
      aria-live="polite"
    >
      <p className="font-medium">
        {type === 'error' ? '⚠️ Violaciones detectadas:' : '💡 Sugerencias:'}
      </p>
      <ul className="list-disc list-inside">
        {violations.map((v, i) => (
          <li key={i}>{v.message}</li>
        ))}
      </ul>
    </div>
  )
}
