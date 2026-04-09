'use client'

import { useState } from 'react'
import { Wand2, ChevronDown } from 'lucide-react'

const projectTypes = ['Website', 'SaaS', 'Portal', 'Landing Page', 'Mobile App', 'API']
const levels = ['Simple', 'Standard', 'Advanced']
const monetizations = ['Free', 'Subscriptions', 'One-time Payment', 'Marketplace', 'Credits']

interface Blueprint {
  summary: string
  modules: string[]
  stack: string[]
  database: string
}

export default function BuilderPage() {
  const [description, setDescription] = useState('')
  const [type, setType] = useState('Website')
  const [level, setLevel] = useState('Standard')
  const [monetization, setMonetization] = useState('Free')
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [loading, setLoading] = useState(false)
  const [blueprint, setBlueprint] = useState<Blueprint | null>(null)

  async function generateBlueprint() {
    if (!description.trim()) return
    setLoading(true)
    // Simulate a blueprint for demo purposes; replace with API call
    await new Promise((r) => setTimeout(r, 1200))
    setBlueprint({
      summary: `A ${level.toLowerCase()} ${type.toLowerCase()} — ${description.trim().slice(0, 80)}`,
      modules: ['Auth', 'Dashboard', 'Core Feature', 'API Layer', 'Database', 'UI Components', 'Admin Panel', 'Billing'],
      stack: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe', 'Vercel'],
      database: 'PostgreSQL via Supabase (users, projects, subscriptions, logs)',
    })
    setLoading(false)
  }

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">AI Builder</h1>
        <p className="text-[#9CA3AF] text-sm mt-1">Describe what you want to build and get a complete blueprint</p>
      </div>

      {/* Input */}
      <div className="bg-[#0B1020] rounded-2xl border border-white/5 p-6 space-y-4">
        <label className="block text-sm font-medium text-white">Describe what you want to build</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder={'Write in natural language. Example: "A platform where coaches can sell memberships and host content"'}
          rows={4}
          className="w-full bg-[#050816] border border-white/10 rounded-xl p-4 text-sm text-white placeholder-[#9CA3AF] resize-none outline-none focus:border-[#6366F1]/50 transition-colors"
        />

        {/* Advanced options */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-xs text-[#9CA3AF] hover:text-white transition-colors"
        >
          <ChevronDown size={14} className={`transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
          Advanced options
        </button>

        {showAdvanced && (
          <div className="grid grid-cols-3 gap-4 pt-2">
            {[
              { label: 'Type', options: projectTypes, value: type, set: setType },
              { label: 'Complexity', options: levels, value: level, set: setLevel },
              { label: 'Monetization', options: monetizations, value: monetization, set: setMonetization },
            ].map(({ label, options, value, set }) => (
              <div key={label}>
                <label className="block text-xs text-[#9CA3AF] mb-2">{label}</label>
                <select
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  className="w-full bg-[#050816] border border-white/10 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#6366F1]/50"
                >
                  {options.map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={generateBlueprint}
          disabled={!description.trim() || loading}
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium text-sm transition-colors"
        >
          <Wand2 size={16} />
          {loading ? 'Generating Blueprint...' : 'Generate Blueprint'}
        </button>
      </div>

      {/* Blueprint result */}
      {blueprint && (
        <div className="grid grid-cols-3 gap-6">
          {/* Architecture */}
          <div className="bg-[#0B1020] rounded-2xl border border-white/5 p-5 space-y-4">
            <h2 className="font-semibold text-white">📐 Architecture</h2>
            <div>
              <p className="text-xs text-[#9CA3AF] mb-1">Summary</p>
              <p className="text-sm text-white leading-relaxed">{blueprint.summary}</p>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] mb-2">Tech Stack</p>
              <div className="flex flex-wrap gap-2">
                {blueprint.stack.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 bg-[#6366F1]/10 text-[#6366F1] rounded-lg border border-[#6366F1]/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-[#9CA3AF] mb-1">Database</p>
              <p className="text-xs text-white leading-relaxed">{blueprint.database}</p>
            </div>
          </div>

          {/* Modules */}
          <div className="bg-[#0B1020] rounded-2xl border border-white/5 p-5">
            <h2 className="font-semibold text-white mb-4">🧩 Modules</h2>
            <div className="space-y-2">
              {blueprint.modules.map((m, i) => (
                <div key={m} className="flex items-center gap-3 py-2 px-3 bg-[#050816] rounded-lg">
                  <span className="text-xs text-[#9CA3AF] w-5">{i + 1}</span>
                  <span className="text-sm text-white">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-[#0B1020] rounded-2xl border border-white/5 p-5">
            <h2 className="font-semibold text-white mb-4">🚀 Next Steps</h2>
            <div className="space-y-3 text-sm text-[#9CA3AF]">
              <p>1. Review your blueprint above</p>
              <p>2. Go to Chat in Dev Mode</p>
              <p>3. Say: &ldquo;Build module 1: Auth&rdquo;</p>
              <p>4. Follow the generated code</p>
              <p>5. Deploy to Vercel for free</p>
            </div>
            <a
              href="/chat"
              className="mt-6 flex items-center justify-center gap-2 bg-[#6366F1] hover:bg-indigo-500 text-white py-3 rounded-xl text-sm font-medium transition-colors"
            >
              Open Dev Mode Chat
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
