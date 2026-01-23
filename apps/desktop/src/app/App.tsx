import { useMemo, useState } from 'react'
import AppShell from '@/app/shell/AppShell'
import { DashboardPage } from '@/features/dashboard'
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
        <div className="page placeholder">
          <h1 className="page__title">Ingredients</h1>
          <p className="page__lead">Placeholder.</p>
        </div>
      )}

      {view === 'mealplan' && (
        <div className="page placeholder">
          <h1 className="page__title">Meal Plan</h1>
          <p className="page__lead">Placeholder.</p>
        </div>
      )}
    </AppShell>
  )
}
