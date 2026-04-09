'use client'

import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from './ThemeProvider'
import type { Theme } from '@/types'

const options: { value: Theme; icon: React.ElementType; label: string }[] = [
  { value: 'light', icon: Sun, label: 'Light' },
  { value: 'dark', icon: Moon, label: 'Dark' },
  { value: 'system', icon: Monitor, label: 'System' },
]

interface ThemeToggleProps {
  collapsed?: boolean
}

export function ThemeToggle({ collapsed }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()

  if (collapsed) {
    const current = options.find((o) => o.value === theme) ?? options[1]
    const Icon = current.icon
    const next = options[(options.indexOf(current) + 1) % options.length]
    return (
      <button
        onClick={() => setTheme(next.value)}
        title={`Switch to ${next.label} mode`}
        className="w-full flex items-center justify-center py-2 text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
      >
        <Icon size={15} />
      </button>
    )
  }

  return (
    <div className="flex items-center gap-1 bg-[#050816] rounded-lg p-1">
      {options.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          title={`${label} mode`}
          className={`flex-1 flex items-center justify-center py-1.5 rounded-md transition-colors ${
            theme === value
              ? 'bg-[#6366F1]/20 text-[#6366F1]'
              : 'text-[#9CA3AF] hover:text-white'
          }`}
        >
          <Icon size={13} />
        </button>
      ))}
    </div>
  )
}
