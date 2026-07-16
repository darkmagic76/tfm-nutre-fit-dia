interface NumberFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  id: string
  min?: number
  step?: string
}

export function NumberField({ label, value, onChange, id, min, step }: NumberFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-stone-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type="number"
        value={value}
        onChange={e => onChange(e.target.value)}
        min={min}
        step={step}
        className="w-full min-h-[44px] p-2 border border-stone-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none"
        aria-label={label}
        inputMode="decimal"
      />
    </div>
  )
}
