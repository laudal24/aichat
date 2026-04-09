import { InputHTMLAttributes, forwardRef } from 'react'
import { clsx } from 'clsx'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, className, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-')
    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-medium text-[#9CA3AF]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(
            'w-full bg-[#050816] border rounded-lg px-3 py-2.5 text-sm text-white placeholder-[#9CA3AF] outline-none transition-colors',
            error
              ? 'border-red-500/50 focus:border-red-500'
              : 'border-white/10 focus:border-[#6366F1]/50',
            className,
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-400">{error}</p>}
        {hint && !error && <p className="text-xs text-[#9CA3AF]">{hint}</p>}
      </div>
    )
  },
)
Input.displayName = 'Input'
