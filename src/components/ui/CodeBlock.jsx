import { useState } from 'react'

/**
 * CodeBlock — Bloque de código con resaltado y botón de copiar.
 * Las líneas que empiezan con '//' se muestran en color tenue (comentarios).
 */
export function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    // Copiar solo las líneas que NO son comentarios
    const executable = code
      .split('\n')
      .filter(line => !line.trim().startsWith('//'))
      .join('\n')
      .trim()

    navigator.clipboard?.writeText(executable).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="code-block">
      <button className="code-block__copy-btn" onClick={handleCopy}>
        {copied ? '✓ Copiado' : 'Copiar'}
      </button>
      <pre>
        {code.split('\n').map((line, i) => {
          const isComment = line.trim().startsWith('//')
          return (
            <span
              key={i}
              style={{ color: isComment ? '#64748b' : '#e2e8f0', display: 'block' }}
            >
              {line}
            </span>
          )
        })}
      </pre>
    </div>
  )
}
