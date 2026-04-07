import { CATEGORIES } from '../../data/categories.js'

/**
 * TopBar — Barra superior con título, filtro activo y estadísticas.
 */
export function TopBar({ currentPage, categoryFilter, guideCount, totalViews, onClearFilter, onBack }) {
  const PAGE_TITLES = {
    home:      'Base de Conocimiento',
    favorites: 'Guías Favoritas',
    create:    'Crear nueva guía',
    downloads: 'Descargas y configuración',
    guide:     null, // el título lo pone GuidePage
  }

  const title = categoryFilter
    ? `${CATEGORIES[categoryFilter]?.emoji} ${CATEGORIES[categoryFilter]?.label}`
    : (PAGE_TITLES[currentPage] ?? 'TechDoc UTS')

  return (
    <header className="topbar">

      {/* Botón volver (solo en vista de guía) */}
      {currentPage === 'guide' && (
        <button className="topbar__back-btn" onClick={onBack}>
          ← Volver
        </button>
      )}

      <span className="topbar__title">{title}</span>

      {/* Chip para limpiar filtro de categoría */}
      {categoryFilter && (
        <button className="topbar__filter-chip" onClick={onClearFilter}>
          × Limpiar filtro
        </button>
      )}

      <span className="topbar__meta">
        {guideCount} guías · {totalViews} consultas
      </span>
    </header>
  )
}
