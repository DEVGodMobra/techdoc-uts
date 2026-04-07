import { useState } from 'react'

const EMPTY_STEP = { action: '', how: '', why: '', code: '' }

/**
 * CreateGuidePage — Formulario estructurado para documentar una nueva guía técnica.
 * Obliga a completar todos los campos del estándar TechDoc UTS:
 * título, descripción, cuándo usar, herramientas y pasos (qué / cómo / por qué).
 */
export function CreateGuidePage({ onSave }) {
  const [form, setForm] = useState({
    title:      '',
    category:   'hardware',
    description:'',
    whenToUse:  '',
    tools:      '',
    expectedResult: '',
    possibleErrors: '',
    recommendations: '',
  })
  const [steps, setSteps] = useState([{ ...EMPTY_STEP }])
  const [saved, setSaved] = useState(false)
  const [errors, setErrors] = useState({})

  /* ——— Actualizar campos del formulario principal ——— */
  function updateForm(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }))
  }

  /* ——— Gestión de pasos dinámicos ——— */
  function addStep() {
    setSteps(prev => [...prev, { ...EMPTY_STEP }])
  }

  function removeStep(index) {
    setSteps(prev => prev.filter((_, i) => i !== index))
  }

  function updateStep(index, field, value) {
    setSteps(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s))
  }

  /* ——— Validación ——— */
  function validate() {
    const newErrors = {}
    if (!form.title.trim())       newErrors.title = 'El título es obligatorio'
    if (!form.description.trim()) newErrors.description = 'La descripción es obligatoria'
    if (steps.every(s => !s.action.trim())) newErrors.steps = 'Agrega al menos un paso con acción'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /* ——— Guardar guía ——— */
  function handleSave() {
    if (!validate()) return

    const newGuide = {
      id:           'g' + Date.now(),
      title:         form.title.trim(),
      category:      form.category,
      description:   form.description.trim(),
      whenToUse:     form.whenToUse.split('\n').map(s => s.trim()).filter(Boolean),
      tools:         form.tools.split('\n').map(s => s.trim()).filter(Boolean),
      steps:         steps.filter(s => s.action.trim()).map((s, i) => ({ n: i + 1, ...s })),
      expectedResult: form.expectedResult.trim(),
      possibleErrors: form.possibleErrors.split('\n').map(s => s.trim()).filter(Boolean),
      recommendations: form.recommendations.split('\n').map(s => s.trim()).filter(Boolean),
      equipment:     [],
      relatedGuides: [],
      tags:          [],
      views:         0,
      featured:      false,
      author:        'Soporte Técnico UTS',
      createdAt:     new Date().toISOString().split('T')[0],
    }

    onSave(newGuide)
    setSaved(true)
    setTimeout(() => setSaved(false), 3500)
  }

  return (
    <div style={{ maxWidth: 660, margin: '0 auto' }}>

      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Nueva guía técnica</h1>
        <p style={{ fontSize: 13, color: 'var(--clr-text-muted)' }}>
          Documenta el procedimiento siguiendo el estándar TechDoc UTS.
        </p>
      </div>

      {/* ── Sección 1: Información general ── */}
      <FormSection title="📌 Información general">
        <div className="field">
          <label className="field__label">Título de la guía *</label>
          <input
            className="field__input"
            value={form.title}
            onChange={e => updateForm('title', e.target.value)}
            placeholder="Ej: Cómo configurar monitor dual en Windows 10"
          />
          {errors.title && <FieldError message={errors.title} />}
        </div>

        <div className="field">
          <label className="field__label">Categoría *</label>
          <select className="field__select" value={form.category} onChange={e => updateForm('category', e.target.value)}>
            <option value="hardware">🖥️ Hardware</option>
            <option value="software">💾 Software</option>
            <option value="redes">🌐 Redes</option>
            <option value="impresoras">🖨️ Impresoras</option>
          </select>
        </div>

        <div className="field">
          <label className="field__label">Descripción del problema *</label>
          <textarea
            className="field__textarea"
            value={form.description}
            onChange={e => updateForm('description', e.target.value)}
            placeholder="Explica brevemente qué problema resuelve esta guía y en qué contexto aplica..."
          />
          {errors.description && <FieldError message={errors.description} />}
        </div>

        <div className="field">
          <label className="field__label">¿Cuándo usar esta guía? (una situación por línea)</label>
          <textarea
            className="field__textarea"
            value={form.whenToUse}
            onChange={e => updateForm('whenToUse', e.target.value)}
            placeholder={"Cuando el usuario no puede imprimir\nCuando se reinstala el sistema operativo\nCuando aparece mensaje de error..."}
          />
        </div>

        <div className="field">
          <label className="field__label">Herramientas necesarias (una por línea)</label>
          <textarea
            className="field__textarea"
            style={{ minHeight: 70 }}
            value={form.tools}
            onChange={e => updateForm('tools', e.target.value)}
            placeholder={"CMD como administrador\nDisco externo con espacio suficiente\nPermisos de administrador local"}
          />
        </div>
      </FormSection>

      {/* ── Sección 2: Pasos del procedimiento ── */}
      <FormSection title="🔍 Procedimiento paso a paso">
        {errors.steps && <FieldError message={errors.steps} />}

        {steps.map((step, i) => (
          <div key={i} style={{ background: 'var(--clr-surface-alt)', borderRadius: 'var(--radius-md)', padding: 14, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--clr-accent)' }}>
                Paso {i + 1}
              </span>
              {steps.length > 1 && (
                <button className="btn btn--danger btn--sm" onClick={() => removeStep(i)}>
                  Eliminar paso
                </button>
              )}
            </div>

            <div className="field">
              <label className="field__label">Acción (qué hacer)</label>
              <input className="field__input" value={step.action} onChange={e => updateStep(i, 'action', e.target.value)} placeholder="Ej: Abrir CMD como administrador" />
            </div>
            <div className="field">
              <label className="field__label">Cómo hacerlo (instrucciones detalladas)</label>
              <textarea className="field__textarea" style={{ minHeight: 64 }} value={step.how} onChange={e => updateStep(i, 'how', e.target.value)} placeholder="Descripción paso a paso de cómo ejecutar la acción..." />
            </div>
            <div className="field">
              <label className="field__label">Por qué se hace (justificación técnica)</label>
              <textarea className="field__textarea" style={{ minHeight: 54 }} value={step.why} onChange={e => updateStep(i, 'why', e.target.value)} placeholder="Explica la razón técnica de este paso..." />
            </div>
            <div className="field" style={{ marginBottom: 0 }}>
              <label className="field__label">Comando o código (opcional)</label>
              <textarea className="field__textarea field__textarea--mono" style={{ minHeight: 50 }} value={step.code} onChange={e => updateStep(i, 'code', e.target.value)} placeholder={"ipconfig /release\nipconfig /renew"} />
            </div>
          </div>
        ))}

        <button className="btn btn--secondary btn--full" onClick={addStep}>
          + Agregar otro paso
        </button>
      </FormSection>

      {/* ── Sección 3: Resultado y observaciones ── */}
      <FormSection title="✅ Resultado y observaciones">
        <div className="field">
          <label className="field__label">Resultado esperado</label>
          <textarea className="field__textarea" value={form.expectedResult} onChange={e => updateForm('expectedResult', e.target.value)} placeholder="Describe qué debe ocurrir cuando el procedimiento es exitoso..." />
        </div>
        <div className="field">
          <label className="field__label">Posibles errores y soluciones (uno por línea)</label>
          <textarea className="field__textarea" value={form.possibleErrors} onChange={e => updateForm('possibleErrors', e.target.value)} placeholder={"Acceso denegado: abrir CMD como administrador\nRuta incorrecta: verificar nombre de usuario..."} />
        </div>
        <div className="field" style={{ marginBottom: 0 }}>
          <label className="field__label">Recomendaciones del técnico (una por línea)</label>
          <textarea className="field__textarea" value={form.recommendations} onChange={e => updateForm('recommendations', e.target.value)} placeholder={"Siempre verificar el espacio disponible antes de iniciar\nDocumentar en el ticket GLPI..."} />
        </div>
      </FormSection>

      <button className="btn btn--primary btn--full" onClick={handleSave} style={{ marginBottom: 24 }}>
        Guardar guía técnica
      </button>

      {saved && (
        <div className="success-alert">
          ✅ Guía guardada exitosamente. Ya aparece en el catálogo de TechDoc UTS.
        </div>
      )}
    </div>
  )
}

/* ——— Componentes auxiliares locales ——— */
function FormSection({ title, children }) {
  return (
    <div className="card" style={{ padding: 20, marginBottom: 16 }}>
      <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.6px', color: 'var(--clr-text-muted)', marginBottom: 16 }}>
        {title}
      </h2>
      {children}
    </div>
  )
}

function FieldError({ message }) {
  return (
    <span style={{ fontSize: 11, color: '#dc2626', marginTop: 4, display: 'block' }}>
      {message}
    </span>
  )
}
