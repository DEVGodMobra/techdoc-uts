import { useState, useEffect, useMemo, useCallback } from 'react'
import { GUIDES as LOCAL_GUIDES } from '../data/guides.js'
import { loadGuides, saveGuide } from '../services/guidesService.js'

export function useGuides() {
  const [guides, setGuides]   = useState([])
  const [loading, setLoading] = useState(true)
  const [favorites, setFavorites] = useState([])

  /* Carga inicial desde Firebase */
  useEffect(() => {
    loadGuides()
      .then(data => {
        /* Si Firebase está vacío carga las guías locales */
        setGuides(data.length > 0 ? data : LOCAL_GUIDES)
      })
      .catch(() => setGuides(LOCAL_GUIDES))
      .finally(() => setLoading(false))
  }, [])

  const featuredGuides = useMemo(() => guides.filter(g => g.featured), [guides])
  const topGuides      = useMemo(() => [...guides].sort((a,b) => b.views - a.views).slice(0,4), [guides])
  const favoriteGuides = useMemo(() => guides.filter(g => favorites.includes(g.id)), [guides, favorites])

  const guideCounts = useMemo(() =>
    guides.reduce((acc, g) => ({ ...acc, [g.category]: (acc[g.category] ?? 0) + 1 }), {})
  , [guides])

  const stats = useMemo(() => ({
    total:      guides.length,
    featured:   guides.filter(g => g.featured).length,
    totalSteps: guides.reduce((s,g) => s + g.steps.length, 0),
    totalViews: guides.reduce((s,g) => s + g.views, 0),
  }), [guides])

  const searchGuides = useCallback((query) => {
    if (!query.trim()) return guides
    const q = query.toLowerCase()
    return guides.filter(g =>
      g.title.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some(t => t.toLowerCase().includes(q))
    )
  }, [guides])

  const guidesByCategory = useCallback((cat) =>
    guides.filter(g => g.category === cat)
  , [guides])

  function incrementViews(id) {
    setGuides(prev => prev.map(g => g.id === id ? { ...g, views: g.views + 1 } : g))
  }

  function toggleFavorite(id) {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
    return !favorites.includes(id)
  }

  async function addGuide(newGuide) {
    try {
      const id = await saveGuide(newGuide)
      setGuides(prev => [{ ...newGuide, id }, ...prev])
    } catch {
      setGuides(prev => [newGuide, ...prev])
    }
  }

  function getGuideById(id) {
    return guides.find(g => g.id === id) ?? null
  }

  return {
    guides, loading, favorites, favoriteGuides,
    featuredGuides, topGuides, guideCounts, stats,
    searchGuides, guidesByCategory,
    incrementViews, toggleFavorite, addGuide, getGuideById,
  }
}