import type { ReactNode } from 'react'
import Sidebar from '@/app/shell/Sidebar'

type NavItem = {
  id: string
  label: string
}

type AppShellProps = {
  title: string
  nav: NavItem[]
  activeId: string
  onNavigate: (id: string) => void
  children: ReactNode
}

export default function AppShell({ title, nav, activeId, onNavigate, children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar title={title} nav={nav} activeId={activeId} onNavigate={onNavigate} />

      {/* Main */}
      <main className="app-main">{children}</main>
    </div>
  )
}
