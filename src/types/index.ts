// ─── User & Auth ────────────────────────────────────────────────────────────

export type UserRole = 'user' | 'admin' | 'agency'
export type PlanType = 'free' | 'pro' | 'agency'
export type UserStatus = 'active' | 'suspended' | 'pending'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: UserRole
  plan: PlanType
  status: UserStatus
  createdAt: string
  updatedAt: string
}

// ─── Project ────────────────────────────────────────────────────────────────

export type ProjectStatus = 'draft' | 'active' | 'deployed' | 'archived'
export type ProjectType =
  | 'Next.js App'
  | 'React + Node'
  | 'Landing Page'
  | 'SaaS'
  | 'E-commerce'
  | 'API'

export interface Project {
  id: string
  name: string
  type: ProjectType
  status: ProjectStatus
  modules: number
  userId: string
  updatedAt: string
  createdAt: string
}

// ─── Chat ───────────────────────────────────────────────────────────────────

export type ChatRole = 'user' | 'assistant' | 'system'
export type ChatMode = 'chat' | 'dev'

export interface ChatMessage {
  role: ChatRole
  content: string
}

export interface ChatSession {
  id: string
  title: string
  messages: ChatMessage[]
  mode: ChatMode
  projectId?: string
  createdAt: string
  updatedAt: string
}

// ─── Template ───────────────────────────────────────────────────────────────

export interface Template {
  id: string
  name: string
  description: string
  tags: string[]
  emoji: string
  popular: boolean
  category: string
}

// ─── Billing ────────────────────────────────────────────────────────────────

export type InvoiceStatus = 'paid' | 'pending' | 'failed' | 'free'

export interface Invoice {
  id: string
  date: string
  amount: string
  status: InvoiceStatus
}

export interface Plan {
  id: PlanType
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  current: boolean
  highlight: boolean
  generationsPerMonth: number
  projectLimit: number | 'unlimited'
}

// ─── Onboarding ─────────────────────────────────────────────────────────────

export type OnboardingStep = 'welcome' | 'goals' | 'stack' | 'done'

export interface OnboardingState {
  step: OnboardingStep
  goals: string[]
  preferredStack: string
  projectIdea?: string
}

// ─── Admin ──────────────────────────────────────────────────────────────────

export interface AdminStats {
  totalUsers: number
  activeUsers: number
  totalProjects: number
  totalGenerations: number
  mrrUsd: number
  churnRate: number
}

// ─── Theme ──────────────────────────────────────────────────────────────────

export type Theme = 'dark' | 'light' | 'system'

// ─── API Responses ───────────────────────────────────────────────────────────

export interface ApiError {
  error: string
  code?: string
  statusCode?: number
}
