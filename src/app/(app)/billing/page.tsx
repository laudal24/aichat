import { Check, Zap } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    desc: 'Perfect to get started',
    features: ['3 projects', '50 AI generations/month', 'Community templates', 'Code export (ZIP)'],
    cta: 'Current Plan',
    current: true,
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/month',
    desc: 'For serious builders',
    features: [
      'Unlimited projects',
      '500 AI generations/month',
      'All templates',
      'Priority AI (GPT-4o)',
      'Export + Deploy',
      'Custom domain',
    ],
    cta: 'Upgrade to Pro',
    current: false,
    highlight: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    price: '$99',
    period: '/month',
    desc: 'For teams and agencies',
    features: [
      'Unlimited everything',
      'White-label option',
      'Client management',
      'Reseller program',
      'API access',
      'Priority support',
    ],
    cta: 'Contact Sales',
    current: false,
    highlight: false,
  },
]

const invoices = [
  { id: 'INV-001', date: 'Mar 1, 2024', amount: '$0.00', status: 'Free' },
]

export default function BillingPage() {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Billing</h1>
        <p className="text-[#9CA3AF] text-sm mt-1">Manage your plan and payment details</p>
      </div>

      {/* Current plan banner */}
      <div className="bg-[#6366F1]/10 border border-[#6366F1]/30 rounded-xl p-5 flex items-center justify-between">
        <div>
          <p className="text-sm text-[#9CA3AF]">Current plan</p>
          <p className="text-xl font-bold text-white mt-0.5">Free <span className="text-[#9CA3AF] text-sm font-normal">— 50 AI gen remaining this month</span></p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#6366F1]">
          <Zap size={14} />
          <span>Upgrade for more</span>
        </div>
      </div>

      {/* Plans */}
      <div>
        <h2 className="font-semibold text-white mb-4">Available Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div
              key={p.id}
              className={`rounded-xl p-6 border flex flex-col ${
                p.highlight ? 'bg-[#6366F1]/10 border-[#6366F1]/40' : 'bg-[#0B1020] border-white/5'
              }`}
            >
              {p.highlight && (
                <span className="text-xs text-[#6366F1] font-semibold uppercase tracking-wider mb-3">Most Popular</span>
              )}
              <h3 className="text-lg font-bold text-white">{p.name}</h3>
              <p className="text-xs text-[#9CA3AF] mb-3">{p.desc}</p>
              <div className="flex items-end gap-1 mb-5">
                <span className="text-3xl font-bold text-white">{p.price}</span>
                <span className="text-[#9CA3AF] text-sm mb-0.5">{p.period}</span>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                    <Check size={13} className="text-[#22C55E] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button
                disabled={p.current}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  p.current
                    ? 'bg-white/5 text-[#9CA3AF] cursor-default'
                    : p.highlight
                    ? 'bg-[#6366F1] hover:bg-indigo-500 text-white'
                    : 'border border-white/10 hover:border-white/20 text-[#9CA3AF] hover:text-white'
                }`}
              >
                {p.cta}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Invoices */}
      <div>
        <h2 className="font-semibold text-white mb-4">Invoice History</h2>
        <div className="bg-[#0B1020] rounded-xl border border-white/5 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">Invoice</th>
                <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">Date</th>
                <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">Amount</th>
                <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-white/5 last:border-0 hover:bg-white/2">
                  <td className="px-5 py-3 text-white">{inv.id}</td>
                  <td className="px-5 py-3 text-[#9CA3AF]">{inv.date}</td>
                  <td className="px-5 py-3 text-white">{inv.amount}</td>
                  <td className="px-5 py-3">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-[#9CA3AF]">{inv.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
