import { useMemo, useState } from 'react'
import AppShell from '@/app/shell/AppShell'
import DashboardPage from '@/app/pages/DashboardPage'
import { RecipesPage } from '@/features/recipes'

type ViewId = 'dashboard' | 'recipes' | 'ingredients' | 'mealplan'

export default function App() {
  const nav = useMemo(
    () => [
      { id: 'dashboard', label: 'Dashboard' },
      { id: 'recipes', label: 'Recipes' },
      { id: 'ingredients', label: 'Ingredients' },
      { id: 'mealplan', label: 'Meal Plan' },
    ],
    [],
  )

  const [view, setView] = useState<ViewId>('dashboard')

  return (
    <AppShell title="Kitchen workflow" nav={nav} activeId={view} onNavigate={id => setView(id as ViewId)}>
      {view === 'dashboard' && <DashboardPage />}
      {view === 'recipes' && <RecipesPage />}

      {view === 'ingredients' && (
        <div style={{ display: 'grid', gap: 8 }}>
          <h1 style={{ margin: 0 }}>Ingredients</h1>
          <p style={{ margin: 0, opacity: 0.8 }}>Placeholder.</p>
        </div>
      )}

      {view === 'mealplan' && (
        <div style={{ display: 'grid', gap: 8 }}>
          <h1 style={{ margin: 0 }}>Meal Plan</h1>
          <p style={{ margin: 0, opacity: 0.8 }}>Placeholder.</p>
        </div>
      )}
    </AppShell>
  )
}
