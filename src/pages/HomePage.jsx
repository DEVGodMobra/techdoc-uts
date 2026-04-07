import { useMemo } from 'react'
import { GuideCard } from '../components/guides/GuideCard.jsx'
import { CATEGORY_LIST } from '../data/categories.js'

/**
 * HomePage — Vista principal con buscador, categorías y listados de guías.
 */
export function HomePage({
  guides, featuredGuides, topGuides, stats, favorites,
  categoryFilter, searchQuery, onSearchChange,
  onOpenGuide, onToggleFavorite, onSelectCategory,
}) {
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null
    const q = searchQuery.toLowerCase()
    return guides.filter(g =>
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [guides, searchQuery])

  const displayGuides = categoryFilter ? guides : null
  const isFiltered = !!categoryFilter || !!searchQuery.trim()

  return (
    <div style={{ maxWidth: 860, margin: '0 auto' }}>

      {/* Estadísticas globales */}
      {!isFiltered && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          {[
            { value: stats.total,      label: 'Guías técnicas' },
            { value: stats.featured,   label: 'Guías destacadas' },
            { value: stats.totalSteps, label: 'Pasos documentados' },
            { value: stats.totalViews, label: 'Consultas totales' },
          ].map((s, i) => (
            <div key={i} className="card" style={{ flex: 1, padding: '10px 14px' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--clr-accent)' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'var(--clr-text-muted)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Buscador */}
      <div style={{ position: 'relative', maxWidth: 560, margin: '0 auto 24px' }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 14 }}>
          🔍
        </span>
        <input
          className="field__input"
          style={{ paddingLeft: 38 }}
          placeholder="Buscar guías por nombre, descripción o etiqueta..."
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
        />
      </div>

      {/* Resultados de búsqueda */}
      {searchResults && (
        <>
          <SectionTitle>Resultados ({searchResults.length})</SectionTitle>
          {searchResults.length === 0
            ? <EmptyState message={`Sin resultados para "${searchQuery}"`} />
            : <GuidesGrid guides={searchResults} favorites={favorites} onOpen={onOpenGuide} onToggle={onToggleFavorite} />}
        </>
      )}

      {/* Vista de categoría filtrada */}
      {!searchResults && displayGuides && (
        <>
          <SectionTitle>{displayGuides.length} guías en esta categoría</SectionTitle>
          {displayGuides.length === 0
            ? <EmptyState message="No hay guías en esta categoría todavía." />
            : <GuidesGrid guides={displayGuides} favorites={favorites} onOpen={onOpenGuide} onToggle={onToggleFavorite} />}
        </>
      )}

      {/* Vista principal sin filtros */}
      {!searchResults && !displayGuides && (
        <>
          <SectionTitle>Categorías</SectionTitle>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 28 }}>
            {CATEGORY_LIST.map(cat => {
              const count = guides.filter(g => g.category === cat.id).length
              return (
                <CategoryCard key={cat.id} cat={cat} count={count} onClick={() => onSelectCategory(cat.id)} />
              )
            })}
          </div>

          <SectionTitle>⭐ Guías destacadas</SectionTitle>
          <GuidesGrid guides={featuredGuides} favorites={favorites} onOpen={onOpenGuide} onToggle={onToggleFavorite} style={{ marginBottom: 28 }} />

          <SectionTitle>🔥 Más consultadas</SectionTitle>
          <GuidesGrid guides={topGuides} favorites={favorites} onOpen={onOpenGuide} onToggle={onToggleFavorite} />
        </>
      )}
    </div>
  )
}

function SectionTitle({ children }) {
  return (
    <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--clr-text-muted)', marginBottom: 12 }}>
      {children}
    </h2>
  )
}

function GuidesGrid({ guides, favorites, onOpen, onToggle, style }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12, ...style }}>
      {guides.map(g => (
        <GuideCard key={g.id} guide={g} isFavorite={favorites.includes(g.id)} onOpen={onOpen} onToggleFavorite={onToggle} />
      ))}
    </div>
  )
}

function CategoryCard({ cat, count, onClick }) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{ padding: 14, textAlign: 'center', cursor: 'pointer', transition: 'border-color var(--transition), transform var(--transition)' }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = cat.color; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--clr-border)'; e.currentTarget.style.transform = 'none' }}
    >
      <div style={{ fontSize: 24, marginBottom: 6 }}>{cat.emoji}</div>
      <div style={{ fontSize: 12, fontWeight: 700, color: cat.color }}>{cat.label}</div>
      <div style={{ fontSize: 11, color: 'var(--clr-text-subtle)', marginTop: 2 }}>{count} guía{count !== 1 ? 's' : ''}</div>
    </div>
  )
}

function EmptyState({ message }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--clr-text-muted)' }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>🔍</div>
      <div style={{ fontSize: 14 }}>{message}</div>
    </div>
  )
}
