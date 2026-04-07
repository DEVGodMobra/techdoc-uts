import { FORMATO_XLSX_BASE64 } from '../data/formatoData.js'

export function DownloadsPage() {

  function descargarExcel() {
    const byteChars   = atob(FORMATO_XLSX_BASE64)
    const byteNumbers = Array.from(byteChars).map(c => c.charCodeAt(0))
    const byteArray   = new Uint8Array(byteNumbers)
    const blob        = new Blob([byteArray], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
    const url  = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href     = url
    link.download = 'Formato_Troubleshooting_UTS.xlsx'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Descargas</h1>
        <p style={{ fontSize: 13, color: 'var(--clr-text-muted)' }}>
          Formatos oficiales — Área de Recursos Informáticos UTS.
        </p>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 40, height: 40, background: '#d1fae5', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20 }}>
            📊
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>Formato de Troubleshooting UTS</div>
            <div style={{ fontSize: 12, color: 'var(--clr-text-muted)', marginTop: 2 }}>
              Formato oficial Excel · Resolución MEN 000237 de 2025
            </div>
          </div>
        </div>

        <div style={{ background: 'var(--clr-surface-alt)', borderRadius: 8, padding: 14, fontSize: 12, color: 'var(--clr-text-muted)', lineHeight: 1.9, marginBottom: 16, fontFamily: 'monospace' }}>
          <strong>UNIDADES TECNOLÓGICAS DE SANTANDER</strong><br />
          Área de Recursos Informáticos — Soporte Técnico | N° _____<br />
          Acreditada en Alta Calidad — Resolución MEN 000237 de 2025<br />
          <br />
          ── FORMATO DE DOCUMENTACIÓN DE TROUBLESHOOTING ──<br />
          <br />
          Fecha: ____________  |  Técnico: ____________________<br />
          Equipo afectado: ___________  |  Marca / Modelo: ______<br />
          N° Ticket GLPI: _______  |  Dependencia / Sede: _______<br />
          <br />
          Síntoma reportado: ________________________________<br />
          Diagnóstico técnico: ______________________________<br />
          Procedimiento: [referencia a guía TechDoc UTS]<br />
          Herramientas utilizadas: __________________________<br />
          Resultado: ☐ Solucionado  ☐ Escalado  ☐ Pendiente<br />
          Observaciones: ___________________________________<br />
          <br />
          Firma Técnico: __________  |  Firma Supervisor: ______
        </div>

        <button
          className="btn btn--primary"
          onClick={descargarExcel}
          style={{ display: 'flex', alignItems: 'center', gap: 8 }}
        >
          📊 Descargar Formato Excel (.xlsx)
        </button>

        <p style={{ fontSize: 11, color: 'var(--clr-text-subtle)', marginTop: 10 }}>
          Archivo: Formato_Troubleshooting_UTS.xlsx · Compatible con Excel y LibreOffice
        </p>
      </div>
    </div>
  )
}