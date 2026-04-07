import { Badge } from '../components/ui/Badge.jsx'
import { StepCard } from '../components/ui/StepCard.jsx'
import { RelatedGuides } from '../components/guides/RelatedGuides.jsx'
import { CATEGORIES } from '../data/categories.js'

/**
 * GuidePage — Vista completa de una guía técnica.
 * Muestra todos los campos estructurados: descripción, cuándo usar,
 * herramientas, pasos paso a paso, resultado, errores y recomendaciones.
 */
export function GuidePage({ guide, allGuides, isFavorite, onBack, onOpenGuide, onToggleFavorite }) {
  if (!guide) return null

  const relatedGuides = allGuides.filter(g => guide.relatedGuides?.includes(g.id))
  const cat = CATEGORIES[guide.category]

  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>

      {/* Hero de la guía */}
      <div className="card" style={{ padding: 24, marginBottom: 16 }}>
        <div style={{ marginBottom: 12 }}>
          <Badge categoryId={guide.category} />
        </div>

        <h1 style={{ fontSize: 20, fontWeight: 700, lineHeight: 1.3, marginBottom: 8 }}>
          {guide.title}
        </h1>

        <p style={{ fontSize: 14, color: 'var(--clr-text-muted)', lineHeight: 1.6, marginBottom: 16 }}>
          {guide.description}
        </p>

        {/* Metadatos */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, fontSize: 12, color: 'var(--clr-text-subtle)', paddingTop: 12, borderTop: '1px solid var(--clr-border)' }}>
          <MetaItem icon="👁" label={`${guide.views} consultas`} />
          <MetaItem icon="📋" label={`${guide.steps.length} pasos`} />
          <MetaItem icon="👤" label={guide.author} />
          <MetaItem icon="📅" label={guide.createdAt} />
          <button
            onClick={() => onToggleFavorite(guide.id)}
            style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: isFavorite ? '#f59e0b' : 'var(--clr-text-subtle)', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            {isFavorite ? '★ Favorita' : '☆ Marcar favorita'}
          </button>
        </div>
      </div>

      {/* Cuándo usar + Herramientas */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <InfoBlock variant="warning" title="⚠️ Cuándo usar esta guía" items={guide.whenToUse} />
        <InfoBlock variant="info"    title="🛠️ Herramientas necesarias" items={guide.tools} />
      </div>

      {/* Equipos aplicables */}
      {guide.equipment?.length > 0 && (
        <div className="card" style={{ padding: 16, marginBottom: 16 }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--clr-text-muted)', marginBottom: 10 }}>
            🖥️ Equipos aplicables
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {guide.equipment.map((eq, i) => (
              <span key={i} style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: 6, padding: '3px 10px', fontSize: 11, color: '#065f46' }}>
                {eq}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Pasos paso a paso */}
      <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--clr-text-muted)', margin: '20px 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
        🔍 Procedimiento paso a paso
      </h2>

      {guide.steps.map((step, i) => (
        <StepCard key={i} step={step} defaultOpen={i === 0} />
      ))}

      {/* Resultado esperado */}
      <div style={{ marginTop: 16 }}>
        <div className="info-block info-block--success" style={{ marginBottom: 12 }}>
          <div className="info-block__title">✅ Resultado esperado</div>
          <p style={{ fontSize: 13, color: 'var(--clr-success-text)', lineHeight: 1.6 }}>
            {guide.expectedResult}
          </p>
        </div>

        <div className="info-block info-block--warning" style={{ marginBottom: 12 }}>
          <div className="info-block__title">❌ Posibles errores y soluciones</div>
          <ul className="info-block__list">
            {guide.possibleErrors.map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>

        <div className="info-block info-block--info">
          <div className="info-block__title">💡 Recomendaciones del técnico</div>
          <ul className="info-block__list">
            {guide.recommendations.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </div>
      </div>

      {/* Tags */}
      {guide.tags?.length > 0 && (
        <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {guide.tags.map((tag, i) => (
            <span key={i} style={{ background: 'var(--clr-surface-alt)', border: '1px solid var(--clr-border)', borderRadius: 'var(--radius-full)', padding: '2px 8px', fontSize: 11, color: 'var(--clr-text-muted)' }}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Guías relacionadas */}
      <RelatedGuides relatedGuides={relatedGuides} onOpen={onOpenGuide} />
    </div>
  )
}

/* ——— Componentes auxiliares ——— */
function MetaItem({ icon, label }) {
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      {icon} {label}
    </span>
  )
}

function InfoBlock({ variant, title, items }) {
  return (
    <div className={`info-block info-block--${variant}`}>
      <div className="info-block__title">{title}</div>
      <ul className="info-block__list">
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  )
}
