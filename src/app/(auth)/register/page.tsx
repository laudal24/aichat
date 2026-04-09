'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { register } from '@/lib/auth/actions'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [errors, setErrors] = useState<Partial<typeof form>>({})
  const [serverError, setServerError] = useState('')

  function validate() {
    const e: Partial<typeof form> = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters.'
    return e
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setServerError('')
    setLoading(true)
    const result = await register(new FormData(e.currentTarget))
    if (result?.error) {
      setServerError(result.error)
      setLoading(false)
    }
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Create your account</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">Start building with AI for free</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="name"
          placeholder="Jane Smith"
          autoComplete="name"
          value={form.name}
          error={errors.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />

        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={form.email}
          error={errors.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[#9CA3AF]">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Min. 8 characters"
              autoComplete="new-password"
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
          {errors.password && <p className="text-xs text-red-400">{errors.password}</p>}
        </div>

        {serverError && <p className="text-xs text-red-400">{serverError}</p>}

        <p className="text-xs text-[#9CA3AF]">
          By creating an account you agree to our{' '}
          <Link href="/terms" className="text-[#6366F1] hover:text-indigo-400 transition-colors">Terms of Service</Link>
          {' '}and{' '}
          <Link href="/privacy" className="text-[#6366F1] hover:text-indigo-400 transition-colors">Privacy Policy</Link>.
        </p>

        <Button type="submit" className="w-full" loading={loading} size="lg">
          <UserPlus size={16} />
          {loading ? 'Creating account…' : 'Create free account'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#9CA3AF]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#6366F1] hover:text-indigo-400 font-medium transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </>
  )
}
