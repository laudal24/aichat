import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AIChat Studio – AI Platform Builder',
  description: 'Build complete websites, apps, and platforms with AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
