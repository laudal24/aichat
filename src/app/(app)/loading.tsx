import { Spinner } from '@/components/ui/Spinner'

export default function AppLoading() {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <Spinner size="lg" />
        <p className="text-sm text-[#9CA3AF]">Loading…</p>
      </div>
    </div>
  )
}
