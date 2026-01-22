import { useEffect, useMemo, useRef, useState } from 'react'
import type { Recipe } from '@/features/recipes/types'

type RecipeModalProps = {
  open: boolean
  mode: 'new' | 'edit'
  initial: Recipe
  onClose: () => void
  onSave: (recipe: Recipe) => void
}

function safeInt(value: string, fallback: number) {
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) ? n : fallback
}

function ingredientsToText(ings: Recipe['ingredients']) {
  // format: "qty | item" or "item"
  return ings
    .map(i => {
      const item = (i.item ?? '').trim()
      const qty = (i.qty ?? '').trim()
      if (!item && !qty) return ''
      return qty ? `${qty} | ${item}` : item
    })
    .filter(Boolean)
    .join('\n')
}

function textToIngredients(text: string): Recipe['ingredients'] {
  const lines = text
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)

  return lines.map(line => {
    const parts = line.split('|').map(p => p.trim())
    if (parts.length >= 2) {
      const qty = parts[0]
      const item = parts.slice(1).join(' | ').trim()
      return { item, qty }
    }
    return { item: line }
  })
}

function stepsToText(steps: string[]) {
  return steps.map(s => s.trim()).filter(Boolean).join('\n')
}

function textToSteps(text: string) {
  return text
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean)
}

export default function RecipeModal({ open, mode, initial, onClose, onSave }: RecipeModalProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  // Form fields
  const [title, setTitle] = useState(initial.title)
  const [description, setDescription] = useState(initial.description)
  const [servings, setServings] = useState(String(initial.servings))
  const [prepMinutes, setPrepMinutes] = useState(String(initial.prepMinutes))
  const [cookMinutes, setCookMinutes] = useState(String(initial.cookMinutes))
  const [tags, setTags] = useState(initial.tags.join(', '))
  const [ingredientsText, setIngredientsText] = useState(ingredientsToText(initial.ingredients))
  const [stepsText, setStepsText] = useState(stepsToText(initial.steps))

  // Reset form whenever we open with a new "initial"
  useEffect(() => {
    if (!open) return
    setTitle(initial.title)
    setDescription(initial.description)
    setServings(String(initial.servings))
    setPrepMinutes(String(initial.prepMinutes))
    setCookMinutes(String(initial.cookMinutes))
    setTags(initial.tags.join(', '))
    setIngredientsText(ingredientsToText(initial.ingredients))
    setStepsText(stepsToText(initial.steps))
  }, [open, initial])

  // Control the native dialog open/close
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  const canSave = useMemo(() => title.trim().length > 0, [title])

  function handleCancel() {
    onClose()
  }

  function handleSave() {
    if (!canSave) return

    const next: Recipe = {
      ...initial,
      title: title.trim(),
      description: description.trim(),
      servings: Math.max(1, safeInt(servings, initial.servings || 1)),
      prepMinutes: Math.max(0, safeInt(prepMinutes, initial.prepMinutes || 0)),
      cookMinutes: Math.max(0, safeInt(cookMinutes, initial.cookMinutes || 0)),
      tags: tags
        .split(',')
        .map(t => t.trim())
        .filter(Boolean),
      ingredients: textToIngredients(ingredientsText),
      steps: textToSteps(stepsText),
    }

    onSave(next)
  }

  return (
    <dialog
      ref={dialogRef}
      onCancel={e => {
        e.preventDefault()
        handleCancel()
      }}
      style={{
        width: 'min(920px, calc(100vw - 32px))',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 18,
        padding: 0,
        background: '#0b0d10',
        color: 'rgba(255,255,255,0.92)',
      }}
    >
      <div style={{ padding: 16, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>
            {mode === 'new' ? 'New Recipe' : 'Edit Recipe'}
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
            <button
              onClick={handleCancel}
              style={{
                padding: '8px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.12)',
                background: 'rgba(255,255,255,0.04)',
                color: 'inherit',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={!canSave}
              style={{
                padding: '8px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.12)',
                background: canSave ? 'rgba(255,255,255,0.10)' : 'rgba(255,255,255,0.04)',
                opacity: canSave ? 1 : 0.5,
                color: 'inherit',
                cursor: canSave ? 'pointer' : 'not-allowed',
                fontWeight: 700,
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>

      <div style={{ padding: 16, display: 'grid', gap: 14 }}>
        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ opacity: 0.8, fontSize: 12 }}>Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Miso soup"
            style={{
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.05)',
              color: 'inherit',
            }}
          />
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ opacity: 0.8, fontSize: 12 }}>Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Short description…"
            rows={3}
            style={{
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.05)',
              color: 'inherit',
              resize: 'vertical',
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ opacity: 0.8, fontSize: 12 }}>Servings</label>
            <input
              value={servings}
              onChange={e => setServings(e.target.value)}
              inputMode="numeric"
              placeholder="1"
              style={{
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.05)',
                color: 'inherit',
              }}
            />
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ opacity: 0.8, fontSize: 12 }}>Prep (min)</label>
            <input
              value={prepMinutes}
              onChange={e => setPrepMinutes(e.target.value)}
              inputMode="numeric"
              placeholder="0"
              style={{
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.05)',
                color: 'inherit',
              }}
            />
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ opacity: 0.8, fontSize: 12 }}>Cook (min)</label>
            <input
              value={cookMinutes}
              onChange={e => setCookMinutes(e.target.value)}
              inputMode="numeric"
              placeholder="0"
              style={{
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.05)',
                color: 'inherit',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 8 }}>
          <label style={{ opacity: 0.8, fontSize: 12 }}>Tags (comma separated)</label>
          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="e.g. meal-prep, japanese, fast"
            style={{
              padding: '10px 12px',
              borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.14)',
              background: 'rgba(255,255,255,0.05)',
              color: 'inherit',
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ opacity: 0.8, fontSize: 12 }}>
              Ingredients (one per line, use “qty | item”)
            </label>
            <textarea
              value={ingredientsText}
              onChange={e => setIngredientsText(e.target.value)}
              rows={10}
              placeholder={`500 ml | Water\n1 tbsp | Miso paste\nTofu`}
              style={{
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.05)',
                color: 'inherit',
                resize: 'vertical',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: 12,
              }}
            />
          </div>

          <div style={{ display: 'grid', gap: 8 }}>
            <label style={{ opacity: 0.8, fontSize: 12 }}>Steps (one per line)</label>
            <textarea
              value={stepsText}
              onChange={e => setStepsText(e.target.value)}
              rows={10}
              placeholder={`Boil water\nDissolve miso\nServe`}
              style={{
                padding: '10px 12px',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.14)',
                background: 'rgba(255,255,255,0.05)',
                color: 'inherit',
                resize: 'vertical',
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
                fontSize: 12,
              }}
            />
          </div>
        </div>
      </div>
    </dialog>
  )
}
