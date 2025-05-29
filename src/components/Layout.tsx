import { ReactNode } from 'react'
import Link from 'next/link'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm p-4">
        <div className="max-w-4xl mx-auto flex justify-between">
          <Link href="/" className="font-bold text-lg text-swedish-blue">
            Hälsa Lagom
          </Link>
          <nav className="space-x-4">
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-4xl mx-auto w-full p-4">{children}</main>
    </div>
  )
}
