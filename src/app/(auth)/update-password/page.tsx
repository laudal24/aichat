'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff, KeyRound, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { updatePassword } from '@/lib/auth/actions'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }

    setLoading(true)
    const fd = new FormData()
    fd.set('password', form.password)
    const result = await updatePassword(fd)
    setLoading(false)

    if (result?.error) {
      setError(result.error)
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/dashboard'), 2000)
    }
  }

  if (success) {
    return (
      <div className="text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto">
          <Check size={24} className="text-[#22C55E]" />
        </div>
        <h1 className="text-2xl font-bold text-white">Password updated!</h1>
        <p className="text-sm text-[#9CA3AF]">
          Your password has been changed. Redirecting to your dashboard…
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Set new password</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">
          Choose a strong password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[#9CA3AF]">New password</label>
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
        </div>

        {/* Confirm password */}
        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-[#9CA3AF]">Confirm password</label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              name="confirm"
              placeholder="Repeat your password"
              autoComplete="new-password"
              value={form.confirm}
              onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
              className="w-full bg-[#050816] border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#9CA3AF] outline-none focus:border-[#6366F1]/50 transition-colors pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-white transition-colors"
              aria-label={showConfirm ? 'Hide password' : 'Show password'}
            >
              {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        {error && <p className="text-xs text-red-400">{error}</p>}

        <Button type="submit" className="w-full" loading={loading} size="lg">
          <KeyRound size={16} />
          {loading ? 'Updating…' : 'Update password'}
        </Button>
      </form>
    </>
  )
}
