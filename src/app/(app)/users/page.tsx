import { UserPlus, MoreVertical } from 'lucide-react'

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', plan: 'Pro', joined: 'Jan 5, 2024', status: 'active' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', plan: 'Free', joined: 'Feb 12, 2024', status: 'active' },
  { id: '3', name: 'Carol White', email: 'carol@example.com', plan: 'Agency', joined: 'Mar 1, 2024', status: 'active' },
  { id: '4', name: 'Dave Lee', email: 'dave@example.com', plan: 'Free', joined: 'Mar 20, 2024', status: 'suspended' },
]

const planColor: Record<string, string> = {
  Free: 'text-[#9CA3AF] bg-white/5',
  Pro: 'text-[#6366F1] bg-[#6366F1]/10',
  Agency: 'text-[#F97316] bg-[#F97316]/10',
}
const statusColor: Record<string, string> = {
  active: 'text-[#22C55E] bg-[#22C55E]/10',
  suspended: 'text-red-400 bg-red-400/10',
}

export default function UsersPage() {
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>
          <p className="text-[#9CA3AF] text-sm mt-1">Manage platform users and permissions</p>
        </div>
        <button className="flex items-center gap-2 bg-[#6366F1] hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <UserPlus size={16} />
          Invite User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Total Users', value: '4' },
          { label: 'Pro Users', value: '1' },
          { label: 'Agency Users', value: '1' },
          { label: 'Free Users', value: '2' },
        ].map((s) => (
          <div key={s.label} className="bg-[#0B1020] rounded-xl border border-white/5 p-4">
            <p className="text-xs text-[#9CA3AF]">{s.label}</p>
            <p className="text-2xl font-bold text-white mt-1">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#0B1020] rounded-xl border border-white/5 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">User</th>
              <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">Plan</th>
              <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">Joined</th>
              <th className="text-left px-5 py-3 text-[#9CA3AF] font-medium">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#6366F1]/20 flex items-center justify-center text-xs font-bold text-[#6366F1]">
                      {u.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white font-medium">{u.name}</p>
                      <p className="text-xs text-[#9CA3AF]">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${planColor[u.plan]}`}>{u.plan}</span>
                </td>
                <td className="px-5 py-4 text-[#9CA3AF]">{u.joined}</td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[u.status]}`}>{u.status}</span>
                </td>
                <td className="px-5 py-4">
                  <button className="p-1.5 text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
                    <MoreVertical size={14} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
