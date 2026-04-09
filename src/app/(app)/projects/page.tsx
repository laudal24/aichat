import { FolderOpen, Plus, Clock, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'

const projects = [
  { id: '1', name: 'SaaS Platform', type: 'Next.js App', updated: '2 hours ago', status: 'active', modules: 3 },
  { id: '2', name: 'E-commerce Store', type: 'React + Node', updated: '1 day ago', status: 'draft', modules: 1 },
  { id: '3', name: 'Coach Website', type: 'Landing Page', updated: '3 days ago', status: 'deployed', modules: 5 },
]

const statusColor: Record<string, string> = {
  active: 'text-[#22C55E] bg-[#22C55E]/10',
  draft: 'text-[#9CA3AF] bg-white/5',
  deployed: 'text-[#6366F1] bg-[#6366F1]/10',
}

export default function ProjectsPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">Manage all your AI-generated builds</p>
        </div>
        <Link
          href="/builder"
          className="flex items-center gap-2 bg-[#6366F1] hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus size={16} />
          New Project
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((p) => (
          <div key={p.id} className="bg-[#0B1020] rounded-xl border border-white/5 p-5 hover:border-[#6366F1]/30 transition-colors group">
            <div className="flex items-start justify-between mb-4">
              <div className="w-10 h-10 rounded-lg bg-[#6366F1]/20 flex items-center justify-center">
                <FolderOpen size={18} className="text-[#6366F1]" />
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[p.status]}`}>
                {p.status}
              </span>
            </div>
            <h3 className="font-semibold text-white mb-1">{p.name}</h3>
            <p className="text-xs text-[#9CA3AF] mb-3">{p.type}</p>
            <p className="text-xs text-[#9CA3AF] mb-4">{p.modules} modules generated</p>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1 text-xs text-[#9CA3AF]">
                <Clock size={11} /> {p.updated}
              </span>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Link href={`/chat?project=${p.id}`} className="p-1.5 text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                  <ExternalLink size={13} />
                </Link>
                <button className="p-1.5 text-[#9CA3AF] hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* New project card */}
        <Link
          href="/builder"
          className="bg-[#0B1020] rounded-xl border border-dashed border-white/10 p-5 flex flex-col items-center justify-center gap-3 hover:border-[#6366F1]/50 hover:bg-[#6366F1]/5 transition-colors min-h-[180px]"
        >
          <div className="w-10 h-10 rounded-lg border border-dashed border-[#6366F1]/50 flex items-center justify-center">
            <Plus size={18} className="text-[#6366F1]" />
          </div>
          <p className="text-sm text-[#9CA3AF]">Create new project</p>
        </Link>
      </div>
    </div>
  )
}
