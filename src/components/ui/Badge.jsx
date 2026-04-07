import { CATEGORIES } from '../../data/categories.js'

/**
 * Badge — Etiqueta visual de categoría.
 * Recibe el ID de categoría y renderiza el emoji + label con los colores correctos.
 */
export function Badge({ categoryId }) {
  const cat = CATEGORIES[categoryId]
  if (!cat) return null

  return (
    <span
      className="badge"
      style={{
        background: cat.bgColor,
        color: cat.textColor,
        border: `1px solid ${cat.borderColor}`,
      }}
    >
      {cat.emoji} {cat.label}
    </span>
  )
}
