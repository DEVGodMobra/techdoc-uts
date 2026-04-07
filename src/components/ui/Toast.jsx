/**
 * Toast — Notificación temporal que aparece en la esquina inferior derecha.
 * El componente padre controla cuándo mostrarlo pasando un mensaje no nulo.
 */
export function Toast({ message }) {
  if (!message) return null
  return <div className="toast">{message}</div>
}
