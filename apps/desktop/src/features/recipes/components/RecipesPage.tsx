import { useMemo, useState } from 'react'
import { RECIPES } from '@/features/recipes/services/recipes.service'
import type { Recipe } from '@/features/recipes/types'
import RecipeModal from '@/features/recipes/components/RecipeModal'

function createBlankRecipe(): Recipe {
  return {
    id: `r-${Date.now()}`,
    title: '',
    description: '',
    servings: 1,
    prepMinutes: 5,
    cookMinutes: 10,
    tags: [],
    ingredients: [{ item: '' }],
    steps: [''],
  }
}

export default function RecipesPage() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState<Recipe[]>(RECIPES as Recipe[])

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<'new' | 'edit'>('new')
  const [draft, setDraft] = useState<Recipe>(createBlankRecipe())

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return recipes
    return recipes.filter(r =>
      [r.title, r.description, r.tags.join(' ')].join(' ').toLowerCase().includes(q),
    )
  }, [query, recipes])

  function openNew() {
    setModalMode('new')
    setDraft(createBlankRecipe())
    setModalOpen(true)
  }

  function openEdit(r: Recipe) {
    setModalMode('edit')
    setDraft(r)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  function saveRecipe(next: Recipe) {
    setRecipes(prev => {
      const exists = prev.some(r => r.id === next.id)
      if (exists) return prev.map(r => (r.id === next.id ? next : r))
      return [next, ...prev]
    })
    setModalOpen(false)
  }

  function deleteRecipe(id: string) {
    const ok = window.confirm('Delete this recipe?')
    if (!ok) return
    setRecipes(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Recipes</h1>

        <div className="page__toolbar">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search…"
            className="input page__search"
          />

          <button onClick={openNew} className="button--primary">
            + New
          </button>
        </div>
      </div>

      <div className="page__list">
        {filtered.map(r => (
          <div key={r.id} className="card">
            <div className="card__header">
              <h2>{r.title}</h2>
              <span className="card__meta">
                {r.prepMinutes + r.cookMinutes} min • {r.servings} servings
              </span>

              <div className="card__actions">
                <button onClick={() => openEdit(r)} className="button--ghost">
                  Edit
                </button>

                <button onClick={() => deleteRecipe(r.id)} className="button--ghost">
                  Delete
                </button>
              </div>
            </div>

            <p className="card__description">{r.description}</p>

            <div className="tag-list">
              {r.tags.map(t => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>

            <details className="details">
              <summary className="details__summary">Details</summary>
              <div className="details__body">
                <div>
                  <div className="section-title">Ingredients</div>
                  <ul className="list">
                    {r.ingredients
                      .filter(i => (i.item ?? '').trim().length > 0 || (i.qty ?? '').trim().length > 0)
                      .map((i, idx) => (
                        <li key={idx}>
                          {(i.item ?? '').trim()}
                          {i.qty ? ` — ${i.qty}` : ''}
                        </li>
                      ))}
                  </ul>
                </div>

                <div>
                  <div className="section-title">Steps</div>
                  <ol className="list">
                    {r.steps.filter(s => s.trim().length > 0).map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>

      <RecipeModal open={modalOpen} mode={modalMode} initial={draft} onClose={closeModal} onSave={saveRecipe} />
    </div>
  )
}
