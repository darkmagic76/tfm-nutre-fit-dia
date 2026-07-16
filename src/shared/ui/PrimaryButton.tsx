import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function PrimaryButton({ children, disabled, ...props }: PrimaryButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className="flex-1 min-h-[44px] bg-emerald-700 text-white py-2 rounded-lg text-sm font-medium disabled:opacity-40 hover:bg-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 transition"
    >
      {children}
    </button>
  )
}
