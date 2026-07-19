import { useState, useCallback, useEffect } from 'react'

export type Tab = 'scanner' | 'log' | 'metabolic' | 'plan' | 'activity' | 'nudges' | 'sustainability'

export const TABS: Array<{ id: Tab; label: string; icon: string }> = [
  { id: 'scanner', label: 'Semáforo', icon: '🔍' },
  { id: 'log', label: 'Hoy', icon: '📝' },
  { id: 'metabolic', label: 'Perfil', icon: '📊' },
  { id: 'plan', label: 'Plan', icon: '📅' },
  { id: 'activity', label: 'Actividad', icon: '🏃' },
  { id: 'nudges', label: 'Nudges', icon: '🔔' },
  { id: 'sustainability', label: 'Eco', icon: '🌍' },
]

export function useTabNavigation() {
  const [tab, setTab] = useState<Tab>('scanner')

  const handleKeyNav = useCallback((e: KeyboardEvent) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return
    const currentIndex = TABS.findIndex(t => t.id === tab)
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setTab(TABS[(currentIndex + 1) % TABS.length].id)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setTab(TABS[(currentIndex - 1 + TABS.length) % TABS.length].id)
    }
  }, [tab])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyNav)
    return () => document.removeEventListener('keydown', handleKeyNav)
  }, [handleKeyNav])

  return { tab, setTab }
}
