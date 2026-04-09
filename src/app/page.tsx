import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050816] text-[#F9FAFB] flex flex-col">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#6366F1] flex items-center justify-center font-bold text-white text-sm">
            AI
          </div>
          <span className="font-bold text-lg tracking-tight">AIChat Studio</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-[#9CA3AF]">
          <Link href="#features" className="hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#pricing" className="hover:text-white transition-colors">
            Pricing
          </Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Dashboard
          </Link>
          <Link
            href="/chat"
            className="bg-[#6366F1] text-white px-4 py-2 rounded-lg hover:bg-indigo-500 transition-colors"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-8 py-20">
        <div className="inline-flex items-center gap-2 bg-[#6366F1]/10 border border-[#6366F1]/30 px-4 py-1.5 rounded-full text-sm text-[#6366F1] mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse" />
          AI-Powered Platform Builder
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Build anything with
          <br />
          <span className="text-[#6366F1]">AI as your partner</span>
        </h1>
        <p className="text-xl text-[#9CA3AF] max-w-2xl mb-10">
          Describe what you want to build. AIChat Studio generates complete websites, apps and
          platforms — with code, architecture and deployment instructions.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/chat"
            className="bg-[#6366F1] hover:bg-indigo-500 text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors"
          >
            Start Building Free
          </Link>
          <Link
            href="/dashboard"
            className="border border-white/10 hover:border-white/20 text-[#9CA3AF] hover:text-white px-8 py-3.5 rounded-xl font-semibold text-lg transition-colors"
          >
            View Dashboard
          </Link>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="px-8 py-20 bg-[#0B1020]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Everything you need to build</h2>
          <p className="text-[#9CA3AF] text-center mb-12">Two modes, unlimited possibilities</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '💬',
                title: 'Chat Mode',
                desc: 'Natural conversation with your AI. Explain ideas, get suggestions, analyze problems and plan your build.',
              },
              {
                icon: '⚡',
                title: 'Dev Mode',
                desc: 'Split-screen with chat + live code editor and preview. Generate full applications with one prompt.',
              },
              {
                icon: '🏗️',
                title: 'AI Builder',
                desc: 'Describe your platform in plain language. Get a complete blueprint, architecture and code.',
              },
              {
                icon: '📦',
                title: 'Project Manager',
                desc: 'Organize all your builds. Version history, duplicate projects, share with clients.',
              },
              {
                icon: '🎨',
                title: 'Templates',
                desc: 'Start from proven blueprints: SaaS, coach platform, marketplace, landing page.',
              },
              {
                icon: '🚀',
                title: 'Deploy Ready',
                desc: 'Export code as ZIP or deploy directly to Vercel, Netlify, Railway or Render for free.',
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-[#050816] rounded-2xl p-6 border border-white/5 hover:border-[#6366F1]/30 transition-colors"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-[#9CA3AF] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="px-8 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Simple Pricing</h2>
          <p className="text-[#9CA3AF] text-center mb-12">Start free. Scale when you grow.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                plan: 'Free',
                price: '$0',
                period: '/month',
                features: ['3 projects', '50 AI generations/month', 'Community templates', 'Export code'],
                cta: 'Start Free',
                highlight: false,
              },
              {
                plan: 'Pro',
                price: '$29',
                period: '/month',
                features: [
                  'Unlimited projects',
                  '500 AI generations/month',
                  'All templates',
                  'Priority AI',
                  'Export + deploy',
                ],
                cta: 'Start Pro',
                highlight: true,
              },
              {
                plan: 'Agency',
                price: '$99',
                period: '/month',
                features: [
                  'Unlimited everything',
                  'White-label option',
                  'Client management',
                  'Reseller program',
                  'API access',
                ],
                cta: 'Contact Sales',
                highlight: false,
              },
            ].map((p) => (
              <div
                key={p.plan}
                className={`rounded-2xl p-6 border ${
                  p.highlight
                    ? 'bg-[#6366F1]/10 border-[#6366F1]/50'
                    : 'bg-[#0B1020] border-white/5'
                }`}
              >
                {p.highlight && (
                  <div className="text-xs font-semibold text-[#6366F1] mb-3 uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{p.plan}</h3>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-4xl font-bold">{p.price}</span>
                  <span className="text-[#9CA3AF] mb-1">{p.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#9CA3AF]">
                      <span className="text-[#22C55E]">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/chat"
                  className={`block text-center py-3 rounded-xl font-semibold transition-colors ${
                    p.highlight
                      ? 'bg-[#6366F1] hover:bg-indigo-500 text-white'
                      : 'border border-white/10 hover:border-white/20 text-[#9CA3AF] hover:text-white'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-8 text-center text-sm text-[#9CA3AF]">
        <p>© 2024 AIChat Studio. Built with AI, for builders.</p>
      </footer>
    </div>
  )
}
