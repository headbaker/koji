import { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/electron-vite.animate.svg'
import './App.css'

import RecipesPage from './pages/RecipesPage'

function App() {
  const [count, setCount] = useState(0)
  const [view, setView] = useState<'home' | 'recipes'>('home')

  // Si quieres que Recipes use tu CSS global, lo dejamos así.
  if (view === 'recipes') {
    return (
      <>
        <div style={{ display: 'flex', gap: 12, padding: 16, alignItems: 'center' }}>
          <button onClick={() => setView('home')}>← Back</button>
          <strong>Recipes</strong>
        </div>
        <RecipesPage />
      </>
    )
  }

  return (
    <>
      <div>
        <a href="https://electron-vite.github.io" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Culos + Tetas</h1>

      <div className="card">
        <button onClick={() => setCount(count + 1)}>count is {count}</button>

        <p>
          Edit <code>src/app/App.tsx</code> and P-utos
        </p>

        <div style={{ marginTop: 12 }}>
          <button onClick={() => setView('recipes')}>Open Recipes</button>
        </div>
      </div>

      <p className="read-the-docs">Click on the Vite and React logos to learn more jaja x¿</p>
    </>
  )
}

export default App