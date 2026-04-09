import Link from 'next/link'
import { Sparkles } from 'lucide-react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center px-4">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-[#6366F1] flex items-center justify-center">
          <Sparkles size={18} className="text-white" />
        </div>
        <span className="font-bold text-lg text-white tracking-tight">AIChat Studio</span>
      </Link>

      {/* Card */}
      <div className="w-full max-w-md bg-[#0B1020] border border-white/5 rounded-2xl p-8">
        {children}
      </div>

      {/* Footer */}
      <p className="mt-6 text-xs text-[#9CA3AF]">
        © {new Date().getFullYear()} AIChat Studio. All rights reserved.
      </p>
    </div>
  )
}
