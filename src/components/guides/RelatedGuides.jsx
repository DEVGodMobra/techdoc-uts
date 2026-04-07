import { Badge } from '../ui/Badge.jsx'

/**
 * RelatedGuides — Sección "Ver también" al final de una guía.
 * Muestra tarjetas compactas de las guías relacionadas.
 */
export function RelatedGuides({ relatedGuides, onOpen }) {
  if (!relatedGuides || relatedGuides.length === 0) return null

  return (
    <section style={{ marginTop: 24 }}>
      <h3 style={{
        fontSize: 12, fontWeight: 700, textTransform: 'uppercase',
        letterSpacing: '.6px', color: 'var(--clr-text-muted)', marginBottom: 10,
      }}>
        Ver también
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
        {relatedGuides.map(guide => (
          <article
            key={guide.id}
            className="card"
            onClick={() => onOpen(guide.id)}
            style={{
              padding: '10px 12px',
              cursor: 'pointer',
              transition: 'border-color var(--transition)',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--clr-accent)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--clr-border)')}
          >
            <div style={{ marginBottom: 6 }}>
              <Badge categoryId={guide.category} />
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.4, marginBottom: 4 }}>
              {guide.title}
            </div>
            <div style={{ fontSize: 11, color: 'var(--clr-text-subtle)' }}>
              {guide.steps.length} pasos · {guide.views} consultas
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
