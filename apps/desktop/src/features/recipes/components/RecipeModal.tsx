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
      role="dialog"
      aria-modal="true"
      aria-labelledby="recipe-modal-title"
      className="modal"
    >
      <div className="modal__header">
        <div id="recipe-modal-title" className="modal__title">
          {mode === 'new' ? 'New Recipe' : 'Edit Recipe'}
        </div>

        <div className="modal__actions">
          <button onClick={handleCancel} className="button--ghost">
            Cancel
          </button>

          <button onClick={handleSave} disabled={!canSave} className="button--primary">
            Save
          </button>
        </div>
      </div>

      <div className="modal__body">
        <div className="form-grid">
          <label className="form-label">Title</label>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Miso soup"
            className="input"
          />
        </div>

        <div className="form-grid">
          <label className="form-label">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Short description…"
            rows={3}
            className="textarea"
          />
        </div>

        <div className="form-grid form-grid--columns">
          <div className="form-grid">
            <label className="form-label">Servings</label>
            <input
              value={servings}
              onChange={e => setServings(e.target.value)}
              inputMode="numeric"
              placeholder="1"
              className="input"
            />
          </div>

          <div className="form-grid">
            <label className="form-label">Prep (min)</label>
            <input
              value={prepMinutes}
              onChange={e => setPrepMinutes(e.target.value)}
              inputMode="numeric"
              placeholder="0"
              className="input"
            />
          </div>

          <div className="form-grid">
            <label className="form-label">Cook (min)</label>
            <input
              value={cookMinutes}
              onChange={e => setCookMinutes(e.target.value)}
              inputMode="numeric"
              placeholder="0"
              className="input"
            />
          </div>
        </div>

        <div className="form-grid">
          <label className="form-label">Tags (comma separated)</label>
          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="e.g. meal-prep, japanese, fast"
            className="input"
          />
        </div>

        <div className="form-grid form-grid--two">
          <div className="form-grid">
            <label className="form-label">Ingredients (one per line, use “qty | item”)</label>
            <textarea
              value={ingredientsText}
              onChange={e => setIngredientsText(e.target.value)}
              rows={10}
              placeholder={`500 ml | Water\n1 tbsp | Miso paste\nTofu`}
              className="textarea mono"
            />
          </div>

          <div className="form-grid">
            <label className="form-label">Steps (one per line)</label>
            <textarea
              value={stepsText}
              onChange={e => setStepsText(e.target.value)}
              rows={10}
              placeholder={`Boil water\nDissolve miso\nServe`}
              className="textarea mono"
            />
          </div>
        </div>
      </div>
    </dialog>
  )
}
