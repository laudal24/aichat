'use client'

import { useEffect } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#050816] flex flex-col items-center justify-center text-center px-6">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4">
          <AlertTriangle size={28} className="text-red-400" />
        </div>
        <h1 className="text-xl font-bold text-white mb-2">Something went wrong</h1>
        <p className="text-[#9CA3AF] text-sm max-w-sm mb-6">
          An unexpected error occurred. Please try again or go back to the dashboard.
        </p>
        {error.digest && (
          <p className="text-xs text-[#9CA3AF]/60 mb-6 font-mono">Error ID: {error.digest}</p>
        )}
        <div className="flex items-center gap-3">
          <button
            onClick={reset}
            className="flex items-center gap-2 bg-[#6366F1] hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <RefreshCw size={15} /> Try again
          </button>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 border border-white/10 hover:border-white/20 text-[#9CA3AF] hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
          >
            <Home size={15} /> Dashboard
          </Link>
        </div>
      </body>
    </html>
  )
}
