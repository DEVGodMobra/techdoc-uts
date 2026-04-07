import { useState } from 'react'
import { CodeBlock } from './CodeBlock.jsx'

/**
 * StepCard — Tarjeta expandible para un paso del procedimiento.
 * Muestra el número, la acción y al expandir: cómo, por qué y código opcional.
 */
export function StepCard({ step, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div className="card" style={{ marginBottom: 8 }}>

      {/* Cabecera clickeable */}
      <button
        onClick={() => setOpen(prev => !prev)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          width: '100%',
          padding: '14px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'background var(--transition)',
          borderRadius: 'var(--radius-lg)',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = 'var(--clr-surface-alt)')}
        onMouseLeave={e => (e.currentTarget.style.background = 'none')}
      >
        <span
          style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'var(--clr-accent)', color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 700, flexShrink: 0,
          }}
        >
          {step.n}
        </span>

        <span style={{ fontSize: 14, fontWeight: 600, flex: 1, color: 'var(--clr-text)' }}>
          {step.action}
        </span>

        <span
          style={{
            color: 'var(--clr-text-subtle)',
            fontSize: 16,
            transition: 'transform 200ms',
            transform: open ? 'rotate(90deg)' : 'none',
          }}
        >
          ›
        </span>
      </button>

      {/* Cuerpo expandible */}
      {open && (
        <div style={{ padding: '0 16px 16px 56px' }}>

          <StepRow label="Qué hacer / Cómo hacerlo" content={step.how} />
          <StepRow label="Por qué se hace" content={step.why} />

          {step.code && <CodeBlock code={step.code} />}
        </div>
      )}
    </div>
  )
}

/* Sub-componente para cada fila de contenido dentro del paso */
function StepRow({ label, content }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div
        style={{
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '.6px', color: 'var(--clr-text-subtle)', marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 13, color: 'var(--clr-text-muted)',
          lineHeight: 1.6, whiteSpace: 'pre-line',
        }}
      >
        {content}
      </div>
    </div>
  )
}
