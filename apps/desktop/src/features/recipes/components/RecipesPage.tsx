import { useMemo, useState } from 'react'
import { RECIPES } from '@/features/recipes/services/recipes'
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
    <div style={{ display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Recipes</h1>

        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search…"
          style={{
            marginLeft: 'auto',
            padding: '8px 10px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.06)',
            color: 'inherit',
            width: 280,
          }}
        />

        <button
          onClick={openNew}
          style={{
            padding: '8px 12px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.08)',
            color: 'inherit',
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          + New
        </button>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {filtered.map(r => (
          <div
            key={r.id}
            style={{
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16,
              padding: 14,
              background: 'rgba(255,255,255,0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
              <h2 style={{ margin: 0 }}>{r.title}</h2>
              <span style={{ opacity: 0.7, fontSize: 12 }}>
                {r.prepMinutes + r.cookMinutes} min • {r.servings} servings
              </span>

              <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
                <button
                  onClick={() => openEdit(r)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'inherit',
                    cursor: 'pointer',
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteRecipe(r.id)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(255,255,255,0.04)',
                    color: 'inherit',
                    cursor: 'pointer',
                    opacity: 0.9,
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

            <p style={{ margin: '8px 0 10px', opacity: 0.9 }}>{r.description}</p>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
              {r.tags.map(t => (
                <span
                  key={t}
                  style={{
                    fontSize: 12,
                    padding: '4px 8px',
                    borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.12)',
                    opacity: 0.85,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            <details>
              <summary style={{ cursor: 'pointer', opacity: 0.9 }}>Details</summary>
              <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>Ingredients</div>
                  <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95 }}>
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
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>Steps</div>
                  <ol style={{ margin: 0, paddingLeft: 18, opacity: 0.95 }}>
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
