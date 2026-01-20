import React from 'react'

type NavItem = {
  id: string
  label: string
}

type AppShellProps = {
  title: string
  nav: NavItem[]
  activeId: string
  onNavigate: (id: string) => void
  children: React.ReactNode
}

export default function AppShell({ title, nav, activeId, onNavigate, children }: AppShellProps) {
  return (
    <div
      style={{
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        background: '#0b0d10',
        color: 'rgba(255,255,255,0.92)',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          borderRight: '1px solid rgba(255,255,255,0.08)',
          padding: 14,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <div style={{ display: 'grid', gap: 6, padding: 10 }}>
          <div style={{ fontWeight: 800, letterSpacing: 0.3 }}>Koji</div>
          <div style={{ opacity: 0.65, fontSize: 12 }}>{title}</div>
        </div>

        <nav style={{ display: 'grid', gap: 6 }}>
          {nav.map(item => {
            const isActive = item.id === activeId
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                style={{
                  textAlign: 'left',
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.10)',
                  background: isActive ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.04)',
                  color: 'inherit',
                  cursor: 'pointer',
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {item.label}
              </button>
            )
          })}
        </nav>


      </aside>

      {/* Main */}
      <main style={{ padding: 18, overflow: 'auto' }}>{children}</main>
    </div>
  )
}
