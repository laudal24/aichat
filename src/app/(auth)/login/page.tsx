'use client'

import Link from 'next/link'
import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { login } from '@/lib/auth/actions'

function LoginForm() {
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    const data = new FormData(e.currentTarget)
    const next = searchParams.get('next')
    if (next) data.set('next', next)
    const result = await login(data)
    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Welcome back</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">Sign in to your AIChat Studio account</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[#9CA3AF]">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              className="w-full bg-[#050816] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#9CA3AF] outline-none focus:border-[#6366F1]/50 transition-colors pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <div className="flex items-center justify-end">
          <Link href="/forgot-password" className="text-xs text-[#6366F1] hover:text-indigo-400 transition-colors">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" className="w-full" loading={loading} size="lg">
          <LogIn size={16} />
          {loading ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#9CA3AF]">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[#6366F1] hover:text-indigo-400 font-medium transition-colors">
            Create one free
          </Link>
        </p>
      </div>

      {/* Divider */}
      <div className="my-6 flex items-center gap-4">
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-xs text-[#9CA3AF]">or continue with</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>

      {/* Social sign-in stubs */}
      <div className="grid grid-cols-2 gap-3">
        {['Google', 'GitHub'].map((provider) => (
          <Button key={provider} variant="secondary" size="md" className="w-full" type="button">
            {provider}
          </Button>
        ))}
      </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
