'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import type { Theme } from '@/types'

interface ThemeContextValue {
  theme: Theme
  resolvedTheme: 'dark' | 'light'
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  resolvedTheme: 'dark',
  setTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')
  const [resolvedTheme, setResolvedTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as Theme | null) ?? 'dark'
    applyTheme(stored)
    setThemeState(stored)
  }, [])

  function applyTheme(t: Theme) {
    const root = document.documentElement
    let resolved: 'dark' | 'light'
    if (t === 'system') {
      resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    } else {
      resolved = t
    }
    root.classList.toggle('dark', resolved === 'dark')
    root.classList.toggle('light', resolved === 'light')
    setResolvedTheme(resolved)
  }

  function setTheme(t: Theme) {
    localStorage.setItem('theme', t)
    applyTheme(t)
    setThemeState(t)
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
