import Link from 'next/link'
import { ArrowRight, Clock, Zap, FolderOpen, Globe } from 'lucide-react'

const stats = [
  { label: 'Total Projects', value: '3', sub: '+1 this week' },
  { label: 'AI Generations', value: '47', sub: '3 remaining today' },
  { label: 'Deployed Apps', value: '1', sub: 'Pro plan: unlimited' },
]

const projects = [
  { id: '1', name: 'SaaS Platform', type: 'Next.js App', time: '2 hours ago', status: 'active' },
  { id: '2', name: 'E-commerce Store', type: 'React + Node', time: '1 day ago', status: 'draft' },
  { id: '3', name: 'Coach Website', type: 'Landing Page', time: '3 days ago', status: 'deployed' },
]

const statusColor: Record<string, string> = {
  active: 'text-[#22C55E] bg-[#22C55E]/10',
  draft: 'text-[#9CA3AF] bg-white/5',
  deployed: 'text-[#6366F1] bg-[#6366F1]/10',
}

const tips = [
  'Build a SaaS landing page with pricing table and waitlist form',
  'Create a full-stack todo app with auth and database',
  'Generate an e-commerce storefront with product cards and cart',
]

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Welcome back 👋</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">Here&apos;s what&apos;s happening with your projects</p>
        </div>
        <Link
          href="/builder"
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Zap size={16} />
          New AI Project
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#0B1020] rounded-xl p-5 border border-white/5">
            <p className="text-[#9CA3AF] text-sm">{s.label}</p>
            <p className="text-3xl font-bold text-white mt-1">{s.value}</p>
            <p className="text-xs text-[#9CA3AF] mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { href: '/builder', icon: Zap, title: 'New AI Project', desc: 'Build with AI from scratch', color: 'text-[#6366F1]' },
            { href: '/chat', icon: Globe, title: 'New Website', desc: 'Chat and generate a site', color: 'text-[#22C55E]' },
            { href: '/templates', icon: FolderOpen, title: 'Use Template', desc: 'Start from a blueprint', color: 'text-[#F97316]' },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              className="bg-[#0B1020] rounded-xl p-5 border border-white/5 hover:border-[#6366F1]/30 transition-colors flex items-start gap-4"
            >
              <div className={`mt-0.5 ${a.color}`}>
                <a.icon size={20} />
              </div>
              <div>
                <p className="font-medium text-white text-sm">{a.title}</p>
                <p className="text-xs text-[#9CA3AF] mt-0.5">{a.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Projects + Tips */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recent Projects */}
        <div className="col-span-2 bg-[#0B1020] rounded-xl border border-white/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Recent Projects</h2>
            <Link href="/projects" className="text-xs text-[#6366F1] hover:text-indigo-400 flex items-center gap-1">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="space-y-3">
            {projects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="flex items-center justify-between py-3 px-4 bg-[#050816] rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#6366F1]/20 flex items-center justify-center">
                    <FolderOpen size={14} className="text-[#6366F1]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{p.name}</p>
                    <p className="text-xs text-[#9CA3AF]">{p.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                    <Clock size={11} /> {p.time}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>
                    {p.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* AI Tips */}
        <div className="bg-[#0B1020] rounded-xl border border-white/5 p-5">
          <h2 className="font-semibold text-white mb-4">✨ Try these prompts</h2>
          <div className="space-y-3">
            {tips.map((tip) => (
              <Link
                key={tip}
                href={`/chat?prompt=${encodeURIComponent(tip)}`}
                className="block text-xs text-[#9CA3AF] hover:text-white bg-[#050816] hover:bg-white/5 rounded-lg p-3 transition-colors border border-white/5 hover:border-[#6366F1]/30"
              >
                &ldquo;{tip}&rdquo;
              </Link>
            ))}
          </div>
          <Link
            href="/chat"
            className="mt-4 w-full flex items-center justify-center gap-2 text-sm text-[#6366F1] hover:text-indigo-400 transition-colors"
          >
            Open AI Chat <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
