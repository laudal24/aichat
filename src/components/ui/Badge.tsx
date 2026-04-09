import { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'orange'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'text-[#9CA3AF] bg-white/5',
  success: 'text-[#22C55E] bg-[#22C55E]/10',
  warning: 'text-yellow-400 bg-yellow-400/10',
  danger: 'text-red-400 bg-red-400/10',
  info: 'text-sky-400 bg-sky-400/10',
  purple: 'text-[#6366F1] bg-[#6366F1]/10',
  orange: 'text-[#F97316] bg-[#F97316]/10',
}

export function Badge({ variant = 'default', className, children, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center text-xs px-2 py-0.5 rounded-full font-medium',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}
