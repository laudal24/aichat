import Link from 'next/link'
import { ArrowRight, Zap } from 'lucide-react'

const templates = [
  {
    id: 'saas',
    name: 'SaaS Platform',
    desc: 'Auth, dashboard, billing, admin. Full subscription business.',
    tags: ['Next.js', 'Stripe', 'Supabase'],
    emoji: '⚡',
    popular: true,
  },
  {
    id: 'coach',
    name: 'Coach Platform',
    desc: 'Sell memberships, host content, manage clients.',
    tags: ['Next.js', 'Stripe', 'Video'],
    emoji: '🎯',
    popular: false,
  },
  {
    id: 'landing',
    name: 'Landing Page',
    desc: 'High-conversion landing with waitlist, pricing, and testimonials.',
    tags: ['Next.js', 'Tailwind', 'Resend'],
    emoji: '🚀',
    popular: false,
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    desc: 'Multi-vendor store. Sellers, buyers, commissions, payouts.',
    tags: ['Next.js', 'Stripe Connect', 'Postgres'],
    emoji: '🏪',
    popular: true,
  },
  {
    id: 'blog',
    name: 'Blog / Content',
    desc: 'CMS-powered blog with SEO, RSS, newsletter and comments.',
    tags: ['Next.js', 'MDX', 'Resend'],
    emoji: '📝',
    popular: false,
  },
  {
    id: 'api',
    name: 'API Service',
    desc: 'Public API with auth, rate limiting, docs and dashboard.',
    tags: ['Node.js', 'Postgres', 'Redis'],
    emoji: '🔌',
    popular: false,
  },
]

export default function TemplatesPage() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Templates</h1>
        <p className="text-[#9CA3AF] text-sm mt-1">Start from a proven blueprint and customise with AI</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t) => (
          <div key={t.id} className="bg-[#0B1020] rounded-xl border border-white/5 p-6 hover:border-[#6366F1]/30 transition-colors group flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <span className="text-3xl">{t.emoji}</span>
              {t.popular && (
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20">
                  Popular
                </span>
              )}
            </div>
            <h3 className="font-semibold text-white mb-2">{t.name}</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed flex-1">{t.desc}</p>
            <div className="flex flex-wrap gap-1.5 my-4">
              {t.tags.map((tag) => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-white/5 text-[#9CA3AF] rounded-lg">
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href={`/builder?template=${t.id}`}
              className="flex items-center justify-center gap-2 py-2.5 bg-[#6366F1]/10 hover:bg-[#6366F1] border border-[#6366F1]/30 hover:border-[#6366F1] text-[#6366F1] hover:text-white rounded-lg text-sm font-medium transition-all"
            >
              <Zap size={14} /> Use Template <ArrowRight size={13} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
