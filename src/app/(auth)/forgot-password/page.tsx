'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Mail, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { resetPassword } from '@/lib/auth/actions'

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    setLoading(true)
    const result = await resetPassword(new FormData(e.currentTarget))
    setLoading(false)
    if (result?.error) {
      setError(result.error)
    } else {
      setSent(true)
    }
  }

  if (sent) {
    return (
      <>
        <div className="mb-6 text-center">
          <div className="w-12 h-12 rounded-full bg-[#6366F1]/20 flex items-center justify-center mx-auto mb-4">
            <Mail size={24} className="text-[#6366F1]" />
          </div>
          <h1 className="text-2xl font-bold text-white">Check your email</h1>
          <p className="text-sm text-[#9CA3AF] mt-2">
            We sent a password reset link to <strong className="text-white">{email}</strong>.
            Check your inbox and follow the instructions.
          </p>
        </div>
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm text-[#6366F1] hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to sign in
        </Link>
      </>
    )
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Reset your password</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {error && <p className="text-xs text-red-400">{error}</p>}

        <Button type="submit" className="w-full" loading={loading} size="lg">
          <Mail size={16} />
          {loading ? 'Sending…' : 'Send reset link'}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <Link
          href="/login"
          className="flex items-center justify-center gap-2 text-sm text-[#9CA3AF] hover:text-white transition-colors"
        >
          <ArrowLeft size={14} />
          Back to sign in
        </Link>
      </div>
    </>
  )
}
