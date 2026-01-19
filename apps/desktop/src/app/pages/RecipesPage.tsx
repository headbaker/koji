import { useMemo, useState } from 'react'
import { RECIPES } from '../data/recipes'

export default function RecipesPage() {
  const [query, setQuery] = useState('')

  const recipes = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return RECIPES
    return RECIPES.filter(r =>
      [r.title, r.description, r.tags.join(' ')].join(' ').toLowerCase().includes(q),
    )
  }, [query])

  return (
    <div style={{ padding: 16, display: 'grid', gap: 12 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>Recipes</h1>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar… (miso, meal prep, desayuno)"
          style={{
            marginLeft: 'auto',
            padding: '8px 10px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.06)',
            color: 'inherit',
            width: 320,
          }}
        />
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {recipes.map(r => (
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
                {r.prepMinutes + r.cookMinutes} min • {r.servings} porciones
              </span>
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
              <summary style={{ cursor: 'pointer', opacity: 0.9 }}>Ver ingredientes y pasos</summary>
              <div style={{ display: 'grid', gap: 10, marginTop: 10 }}>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>Ingredientes</div>
                  <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.95 }}>
                    {r.ingredients.map((i, idx) => (
                      <li key={idx}>
                        {i.item}
                        {i.qty ? ` — ${i.qty}` : ''}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>Pasos</div>
                  <ol style={{ margin: 0, paddingLeft: 18, opacity: 0.95 }}>
                    {r.steps.map((s, idx) => (
                      <li key={idx}>{s}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </details>
          </div>
        ))}
      </div>
    </div>
  )
}