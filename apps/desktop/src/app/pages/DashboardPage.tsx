export default function DashboardPage() {
  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <h1 style={{ margin: 0 }}>Dashboard</h1>
      <p style={{ margin: 0, opacity: 0.8 }}>
        Aqui pondremos un resumen del día, acciones rápidas, flujo de meal prep.
      </p>

      <div
        style={{
          marginTop: 10,
          padding: 16,
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.10)',
          background: 'rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 6 }}>Next</div>
        <ul style={{ margin: 0, paddingLeft: 18, opacity: 0.9 }}>
          <li>Add “New Recipe” (CRUD)</li>
          <li>Persist recipes to disk (JSON/SQLite)</li>
          <li>Search + tags</li>
        </ul>
      </div>
    </div>
  )
}
