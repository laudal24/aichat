import { HTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
  highlight?: boolean
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ hover, highlight, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          'bg-[#0B1020] rounded-xl border p-5',
          highlight ? 'border-[#6366F1]/40' : 'border-white/5',
          hover && 'transition-colors hover:border-[#6366F1]/30 cursor-pointer',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    )
  },
)
Card.displayName = 'Card'
