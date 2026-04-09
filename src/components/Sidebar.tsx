'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  LayoutDashboard,
  FolderOpen,
  Wand2,
  MessageSquare,
  LayoutTemplate,
  Users,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShieldCheck,
} from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'

const navItems = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/projects', icon: FolderOpen, label: 'Projects' },
  { href: '/builder', icon: Wand2, label: 'AI Builder' },
  { href: '/chat', icon: MessageSquare, label: 'Chat' },
  { href: '/templates', icon: LayoutTemplate, label: 'Templates' },
  { href: '/users', icon: Users, label: 'Users' },
  { href: '/admin', icon: ShieldCheck, label: 'Admin' },
  { href: '/billing', icon: CreditCard, label: 'Billing' },
  { href: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`flex flex-col bg-[#0B1020] border-r border-white/5 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-[#6366F1] flex items-center justify-center flex-shrink-0">
          <Sparkles size={16} className="text-white" />
        </div>
        {!collapsed && (
          <span className="font-bold text-sm text-white truncate">AIChat Studio</span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map(({ href, icon: Icon, label }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm ${
                active
                  ? 'bg-[#6366F1]/20 text-[#6366F1] font-medium'
                  : 'text-[#9CA3AF] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={18} className="flex-shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User + collapse */}
      <div className="border-t border-white/5 p-3 space-y-2">
        {!collapsed && (
          <>
            <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-[#6366F1] flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                U
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-white truncate">User</p>
                <p className="text-xs text-[#9CA3AF] truncate">Free Plan</p>
              </div>
            </div>
            <ThemeToggle collapsed={false} />
          </>
        )}
        {collapsed && <ThemeToggle collapsed />}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center py-2 text-[#9CA3AF] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  )
}
