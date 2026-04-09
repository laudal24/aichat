import {
  Users,
  FolderOpen,
  Zap,
  TrendingUp,
  ShieldAlert,
  MoreVertical,
  Activity,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

const stats = [
  { label: 'Total Users', value: '1,284', change: '+12%', icon: Users, color: 'text-[#6366F1]', bg: 'bg-[#6366F1]/10' },
  { label: 'Total Projects', value: '3,847', change: '+8%', icon: FolderOpen, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/10' },
  { label: 'AI Generations', value: '48,293', change: '+31%', icon: Zap, color: 'text-[#F97316]', bg: 'bg-[#F97316]/10' },
  { label: 'MRR (USD)', value: '$4,120', change: '+19%', icon: TrendingUp, color: 'text-sky-400', bg: 'bg-sky-400/10' },
]

const recentUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', plan: 'Pro', status: 'active', joined: '2 min ago' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', plan: 'Free', status: 'active', joined: '1 hour ago' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', plan: 'Agency', status: 'active', joined: '3 hours ago' },
  { id: '4', name: 'Dave Lee', email: 'dave@example.com', plan: 'Free', status: 'suspended', joined: '1 day ago' },
  { id: '5', name: 'Eve Carter', email: 'eve@example.com', plan: 'Pro', status: 'active', joined: '2 days ago' },
]

const planBadge: Record<string, React.ComponentProps<typeof Badge>['variant']> = {
  Free: 'default',
  Pro: 'purple',
  Agency: 'orange',
}

const statusBadge: Record<string, React.ComponentProps<typeof Badge>['variant']> = {
  active: 'success',
  suspended: 'danger',
  pending: 'warning',
}

const recentActivity = [
  { id: '1', event: 'New user registered', detail: 'Eve Carter signed up', time: '2 min ago', icon: Users },
  { id: '2', event: 'Pro plan subscribed', detail: 'alice@example.com → Pro', time: '15 min ago', icon: Zap },
  { id: '3', event: 'User suspended', detail: 'dave@example.com', time: '1 hour ago', icon: ShieldAlert },
  { id: '4', event: 'Agency plan subscribed', detail: 'carol@example.com → Agency', time: '3 hours ago', icon: TrendingUp },
]

export default function AdminPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">Platform overview and management</p>
        </div>
        <div className="flex items-center gap-2 bg-[#22C55E]/10 border border-[#22C55E]/20 px-3 py-1.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-xs text-[#22C55E] font-medium">All systems operational</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <Card key={s.label}>
            <div className="flex items-start justify-between mb-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${s.bg}`}>
                <s.icon size={18} className={s.color} />
              </div>
              <Badge variant="success">{s.change}</Badge>
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-[#9CA3AF] mt-0.5">{s.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Users table */}
        <div className="col-span-2">
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <h2 className="font-semibold text-white flex items-center gap-2">
                <Users size={16} className="text-[#9CA3AF]" /> Recent Users
              </h2>
              <a href="/users" className="text-xs text-[#6366F1] hover:text-indigo-400 transition-colors">
                View all
              </a>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">User</th>
                  <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">Plan</th>
                  <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">Status</th>
                  <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">Joined</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((u) => (
                  <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-[#6366F1]/20 flex items-center justify-center text-xs font-bold text-[#6366F1] shrink-0">
                          {u.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-white text-xs font-medium">{u.name}</p>
                          <p className="text-[#9CA3AF] text-xs">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={planBadge[u.plan]}>{u.plan}</Badge>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge variant={statusBadge[u.status]}>{u.status}</Badge>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-[#9CA3AF]">{u.joined}</td>
                    <td className="px-5 py-3.5">
                      <button className="p-1 text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                        <MoreVertical size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* Activity feed */}
        <div>
          <Card>
            <h2 className="font-semibold text-white flex items-center gap-2 mb-4">
              <Activity size={16} className="text-[#9CA3AF]" /> Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                    <a.icon size={13} className="text-[#9CA3AF]" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-white truncate">{a.event}</p>
                    <p className="text-xs text-[#9CA3AF] truncate">{a.detail}</p>
                    <p className="text-xs text-[#9CA3AF]/60 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Plan distribution */}
          <Card className="mt-4">
            <h2 className="font-semibold text-white mb-4 text-sm">Plan Distribution</h2>
            {[
              { plan: 'Free', count: 847, pct: 66, color: 'bg-[#9CA3AF]/30' },
              { plan: 'Pro', count: 361, pct: 28, color: 'bg-[#6366F1]' },
              { plan: 'Agency', count: 76, pct: 6, color: 'bg-[#F97316]' },
            ].map((p) => (
              <div key={p.plan} className="mb-3">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-[#9CA3AF]">{p.plan}</span>
                  <span className="text-white font-medium">{p.count}</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${p.color} rounded-full`} style={{ width: `${p.pct}%` }} />
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  )
}
