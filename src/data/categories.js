/**
 * Definición de categorías de la plataforma TechDoc UTS.
 * Cada categoría tiene un identificador único, etiqueta, emoji,
 * color de acento y clases de color para badges.
 */

export const CATEGORIES = {
  hardware: {
    id: 'hardware',
    label: 'Hardware',
    emoji: '🖥️',
    color: '#3b82f6',
    bgColor: '#dbeafe',
    textColor: '#1e40af',
    borderColor: '#93c5fd',
  },
  software: {
    id: 'software',
    label: 'Software',
    emoji: '💾',
    color: '#8b5cf6',
    bgColor: '#ede9fe',
    textColor: '#5b21b6',
    borderColor: '#c4b5fd',
  },
  redes: {
    id: 'redes',
    label: 'Redes',
    emoji: '🌐',
    color: '#10b981',
    bgColor: '#d1fae5',
    textColor: '#065f46',
    borderColor: '#6ee7b7',
  },
  impresoras: {
    id: 'impresoras',
    label: 'Impresoras',
    emoji: '🖨️',
    color: '#f59e0b',
    bgColor: '#fef3c7',
    textColor: '#92400e',
    borderColor: '#fcd34d',
  },
}

export const CATEGORY_LIST = Object.values(CATEGORIES)
