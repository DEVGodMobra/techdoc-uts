import { CATEGORY_LIST } from '../../data/categories.js'

/**
 * Sidebar — Navegación lateral izquierda.
 * Recibe la página/filtro activo y un callback para cambiar de sección.
 */
export function Sidebar({ currentPage, categoryFilter, favCount, guideCounts, onNavigate }) {
  const mainNavItems = [
    { id: 'home',      label: 'Inicio',       icon: '🏠' },
    { id: 'favorites', label: 'Favoritas',    icon: '⭐', badge: favCount > 0 ? favCount : null },
    { id: 'create',    label: 'Nueva guía',   icon: '＋' },
    { id: 'downloads', label: 'Descargas',    icon: '⬇' },
  ]

  return (
    <aside className="layout__sidebar">

      {/* Logo */}
      <div className="sidebar__logo">
        <div className="sidebar__logo-icon">🛠</div>
        <div>
          <div className="sidebar__logo-title">TechDoc UTS</div>
          <div className="sidebar__logo-sub">Soporte Técnico</div>
        </div>
      </div>

      {/* Navegación principal */}
      <nav className="sidebar__nav">
        <div className="sidebar__section-label">Navegación</div>

        {mainNavItems.map(item => (
          <div
            key={item.id}
            className={`nav-item ${currentPage === item.id && !categoryFilter ? 'nav-item--active' : ''}`}
            onClick={() => onNavigate({ type: 'page', id: item.id })}
          >
            <span className="nav-item__icon">{item.icon}</span>
            <span className="nav-item__label">{item.label}</span>
            {item.badge && (
              <span className="nav-item__badge">{item.badge}</span>
            )}
          </div>
        ))}

        {/* Categorías */}
        <div className="sidebar__section-label">Categorías</div>

        {CATEGORY_LIST.map(cat => (
          <div
            key={cat.id}
            className={`nav-item ${categoryFilter === cat.id ? 'nav-item--active' : ''}`}
            onClick={() => onNavigate({ type: 'category', id: cat.id })}
          >
            <span className="nav-item__icon">{cat.emoji}</span>
            <span className="nav-item__label">{cat.label}</span>
            <span className="nav-item__count">{guideCounts[cat.id] ?? 0}</span>
          </div>
        ))}
      </nav>

      {/* Pie del sidebar */}
      <div className="sidebar__bottom">
        <div className="sidebar__footer-text">
          Área de Recursos Informáticos<br />
          Acreditada Alta Calidad MEN 2025
        </div>
      </div>
    </aside>
  )
}
