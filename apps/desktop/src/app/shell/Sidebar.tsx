type NavItem = {
  id: string
  label: string
}

type SidebarProps = {
  title: string
  nav: NavItem[]
  activeId: string
  onNavigate: (id: string) => void
}

const icons: Record<string, JSX.Element> = {
  dashboard: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 4h7v7H4zM13 4h7v4h-7zM13 10h7v10h-7zM4 13h7v7H4z" />
    </svg>
  ),
  recipes: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M6 3h12v4H6zM6 9h12v12H6zM9 12h6v2H9zM9 16h6v2H9z" />
    </svg>
  ),
  ingredients: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a6 6 0 0 1 6 6c0 3-2.2 5.5-6 11-3.8-5.5-6-8-6-11a6 6 0 0 1 6-6z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  mealplan: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 4h14v16H5zM8 8h8v2H8zM8 12h8v2H8zM8 16h5v2H8z" />
    </svg>
  ),
}

export default function Sidebar({ title, nav, activeId, onNavigate }: SidebarProps) {
  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__brand">
        <div className="app-sidebar__brand-title">Koji</div>
        <div className="app-sidebar__brand-subtitle">{title}</div>
      </div>

      <nav className="app-nav">
        {nav.map(item => {
          const isActive = item.id === activeId
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`app-nav__button ${isActive ? 'app-nav__button--active' : ''}`}
            >
              <span className="app-nav__icon">{icons[item.id]}</span>
              <span className="app-nav__label">{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}
