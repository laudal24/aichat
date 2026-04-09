import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050816] flex flex-col items-center justify-center text-center px-6">
      <div className="text-8xl font-black text-[#6366F1]/20 mb-2 select-none">404</div>
      <h1 className="text-2xl font-bold text-white mb-2">Page not found</h1>
      <p className="text-[#9CA3AF] text-sm max-w-sm mb-8">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Home size={15} /> Go to dashboard
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 border border-white/10 hover:border-white/20 text-[#9CA3AF] hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
        >
          <Search size={15} /> Back to home
        </Link>
      </div>
    </div>
  )
}
