'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, ArrowRight, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import type { OnboardingStep } from '@/types'

const goals = [
  { id: 'saas', label: '⚡ Build a SaaS', desc: 'Subscriptions, auth, dashboard' },
  { id: 'landing', label: '🚀 Launch a landing page', desc: 'High-conversion, waitlist' },
  { id: 'ecommerce', label: '🛍 E-commerce store', desc: 'Products, cart, checkout' },
  { id: 'portfolio', label: '🎨 Portfolio / blog', desc: 'Personal brand, content' },
  { id: 'api', label: '🔌 API / backend', desc: 'Node.js, auth, database' },
  { id: 'other', label: '🧩 Something else', desc: 'Custom project idea' },
]

const stacks = [
  { id: 'nextjs', label: 'Next.js + Tailwind', icon: '▲' },
  { id: 'react', label: 'React + Node', icon: '⚛' },
  { id: 'vue', label: 'Vue + Nuxt', icon: '💚' },
  { id: 'nopreference', label: 'No preference', icon: '🎲' },
]

const steps: OnboardingStep[] = ['welcome', 'goals', 'stack', 'done']

function StepIndicator({ current }: { current: OnboardingStep }) {
  const index = steps.indexOf(current)
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              i < index
                ? 'bg-[#22C55E] text-white'
                : i === index
                ? 'bg-[#6366F1] text-white'
                : 'bg-white/10 text-[#9CA3AF]'
            }`}
          >
            {i < index ? <Check size={12} /> : i + 1}
          </div>
          {i < steps.length - 1 && (
            <div className={`h-0.5 w-8 rounded-full ${i < index ? 'bg-[#22C55E]' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState<OnboardingStep>('welcome')
  const [selectedGoals, setSelectedGoals] = useState<string[]>([])
  const [selectedStack, setSelectedStack] = useState('')

  function toggleGoal(id: string) {
    setSelectedGoals((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    )
  }

  function next() {
    const idx = steps.indexOf(step)
    if (idx < steps.length - 1) setStep(steps[idx + 1])
  }

  async function finish() {
    // TODO: Save onboarding state to Supabase
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center px-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10 justify-center">
          <div className="w-9 h-9 rounded-xl bg-[#6366F1] flex items-center justify-center">
            <Sparkles size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight">AIChat Studio</span>
        </div>

        <div className="bg-[#0B1020] border border-white/5 rounded-2xl p-8">
          <StepIndicator current={step} />

          {/* ── Step: Welcome ─────────────────────── */}
          {step === 'welcome' && (
            <div className="text-center space-y-4">
              <div className="text-5xl mb-2">👋</div>
              <h1 className="text-2xl font-bold text-white">Welcome to AIChat Studio</h1>
              <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-sm mx-auto">
                We&apos;ll set up your workspace in under 2 minutes. Answer a couple of quick questions so we can tailor your experience.
              </p>
              <Button size="lg" className="w-full mt-4" onClick={next}>
                Let&apos;s get started <ArrowRight size={16} />
              </Button>
            </div>
          )}

          {/* ── Step: Goals ──────────────────────── */}
          {step === 'goals' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white">What do you want to build?</h2>
                <p className="text-sm text-[#9CA3AF] mt-1">Select all that apply.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {goals.map((g) => {
                  const active = selectedGoals.includes(g.id)
                  return (
                    <button
                      key={g.id}
                      onClick={() => toggleGoal(g.id)}
                      className={`text-left p-4 rounded-xl border transition-colors ${
                        active
                          ? 'bg-[#6366F1]/10 border-[#6366F1]/50 text-white'
                          : 'bg-[#050816] border-white/5 text-[#9CA3AF] hover:border-white/20'
                      }`}
                    >
                      <p className="text-sm font-medium">{g.label}</p>
                      <p className="text-xs mt-0.5 opacity-70">{g.desc}</p>
                    </button>
                  )
                })}
              </div>
              <Button size="lg" className="w-full" onClick={next} disabled={selectedGoals.length === 0}>
                Continue <ArrowRight size={16} />
              </Button>
            </div>
          )}

          {/* ── Step: Stack ──────────────────────── */}
          {step === 'stack' && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white">Preferred tech stack?</h2>
                <p className="text-sm text-[#9CA3AF] mt-1">We&apos;ll use this as default for code generation.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {stacks.map((s) => {
                  const active = selectedStack === s.id
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStack(s.id)}
                      className={`flex items-center gap-3 p-4 rounded-xl border transition-colors ${
                        active
                          ? 'bg-[#6366F1]/10 border-[#6366F1]/50 text-white'
                          : 'bg-[#050816] border-white/5 text-[#9CA3AF] hover:border-white/20'
                      }`}
                    >
                      <span className="text-xl">{s.icon}</span>
                      <span className="text-sm font-medium">{s.label}</span>
                    </button>
                  )
                })}
              </div>
              <Button size="lg" className="w-full" onClick={next} disabled={!selectedStack}>
                Continue <ArrowRight size={16} />
              </Button>
            </div>
          )}

          {/* ── Step: Done ───────────────────────── */}
          {step === 'done' && (
            <div className="text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-[#22C55E]/20 flex items-center justify-center mx-auto">
                <Check size={28} className="text-[#22C55E]" />
              </div>
              <h2 className="text-2xl font-bold text-white">You&apos;re all set!</h2>
              <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs mx-auto">
                Your workspace is ready. Head to the dashboard and start building your first project with AI.
              </p>
              <Button size="lg" className="w-full" onClick={finish}>
                Go to dashboard <ArrowRight size={16} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
