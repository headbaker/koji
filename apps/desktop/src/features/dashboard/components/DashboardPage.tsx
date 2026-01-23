export default function DashboardPage() {
  return (
    <div className="page">
      <h1 className="page__title">Dashboard</h1>
      <p className="page__lead">Aqui pondremos un resumen del día, acciones rápidas, flujo de meal prep.</p>

      <div className="card">
        <div className="section-title">Next</div>
        <ul className="list">
          <li>Add “New Recipe” (CRUD)</li>
          <li>Persist recipes to disk (JSON/SQLite)</li>
          <li>Search + tags</li>
        </ul>
      </div>
    </div>
  )
}
