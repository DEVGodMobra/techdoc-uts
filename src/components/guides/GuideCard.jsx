import { Badge } from '../ui/Badge.jsx'

/**
 * GuideCard — Tarjeta de preview de una guía técnica.
 * Muestra categoría, título, descripción recortada, vistas y pasos.
 */
export function GuideCard({ guide, isFavorite, onOpen, onToggleFavorite }) {
  function handleFavoriteClick(e) {
    e.stopPropagation() // no abrir la guía al hacer clic en favorito
    onToggleFavorite(guide.id)
  }

  return (
    <article
      className="card"
      onClick={() => onOpen(guide.id)}
      style={{
        padding: 16,
        cursor: 'pointer',
        transition: 'border-color var(--transition), transform var(--transition)',
        borderColor: guide.featured ? 'rgba(37,99,235,.35)' : undefined,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--clr-accent)'
        e.currentTarget.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = guide.featured ? 'rgba(37,99,235,.35)' : 'var(--clr-border)'
        e.currentTarget.style.transform = 'none'
      }}
    >
      {/* Cabecera: badge + destacada */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <Badge categoryId={guide.category} />
        {guide.featured && (
          <span style={{ fontSize: 10, color: '#d97706', marginLeft: 'auto', flexShrink: 0 }}>
            ★ Destacada
          </span>
        )}
      </div>

      {/* Título */}
      <h3 style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 6 }}>
        {guide.title}
      </h3>

      {/* Descripción recortada */}
      <p style={{ fontSize: 12, color: 'var(--clr-text-muted)', lineHeight: 1.5, marginBottom: 10 }}>
        {guide.description.length > 120
          ? guide.description.slice(0, 120) + '…'
          : guide.description}
      </p>

      {/* Footer: estadísticas + favorito */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 11, color: 'var(--clr-text-subtle)',
      }}>
        <span>👁 {guide.views}</span>
        <span>·</span>
        <span>{guide.steps.length} pasos</span>
        <span>·</span>
        <span>{guide.author}</span>

        <button
          onClick={handleFavoriteClick}
          style={{
            marginLeft: 'auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: isFavorite ? '#f59e0b' : 'var(--clr-text-subtle)',
            fontSize: 14,
            transition: 'color var(--transition)',
          }}
          title={isFavorite ? 'Quitar de favoritas' : 'Marcar como favorita'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
    </article>
  )
}
