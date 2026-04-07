import { useState, useCallback } from 'react'
import { Sidebar }         from './components/layout/Sidebar.jsx'
import { TopBar }          from './components/layout/TopBar.jsx'
import { Toast }           from './components/ui/Toast.jsx'
import { HomePage }        from './pages/HomePage.jsx'
import { GuidePage }       from './pages/GuidePage.jsx'
import { CreateGuidePage } from './pages/CreateGuidePage.jsx'
import { DownloadsPage }   from './pages/DownloadsPage.jsx'
import { useGuides }       from './hooks/useGuides.js'

/**
 * App — Componente raíz de TechDoc UTS.
 *
 * Gestiona el estado de navegación (página activa, filtro de categoría,
 * búsqueda) y distribuye props a cada página. Toda la lógica de datos
 * vive en el hook useGuides.
 */
export default function App() {
  /* ——— Estado de datos (guías, favoritos, etc.) ——— */
  const {
    guides,
    favorites,
    favoriteGuides,
    featuredGuides,
    topGuides,
    guideCounts,
    stats,
    searchGuides,
    guidesByCategory,
    incrementViews,
    toggleFavorite,
    addGuide,
    getGuideById,
  } = useGuides()

  /* ——— Estado de navegación ——— */
  const [currentPage,     setCurrentPage]     = useState('home')
  const [selectedGuideId, setSelectedGuideId] = useState(null)
  const [categoryFilter,  setCategoryFilter]  = useState(null)
  const [searchQuery,     setSearchQuery]      = useState('')
  const [toast,           setToast]            = useState(null)

  /* ——— Helpers de navegación ——— */
  function showToast(message) {
    setToast(message)
    setTimeout(() => setToast(null), 2500)
  }

  function navigateTo(page, { clearFilter = true } = {}) {
    setCurrentPage(page)
    setSelectedGuideId(null)
    setSearchQuery('')
    if (clearFilter) setCategoryFilter(null)
  }

  const handleSidebarNavigate = useCallback(({ type, id }) => {
    if (type === 'page') {
      navigateTo(id)
    } else if (type === 'category') {
      setCategoryFilter(id)
      setCurrentPage('home')
      setSearchQuery('')
      setSelectedGuideId(null)
    }
  }, [])

  function handleOpenGuide(guideId) {
    incrementViews(guideId)
    setSelectedGuideId(guideId)
    setCurrentPage('guide')
  }

  function handleToggleFavorite(guideId) {
    const isNowFavorite = !favorites.includes(guideId)
    toggleFavorite(guideId)
    showToast(isNowFavorite ? '⭐ Marcada como favorita' : 'Removida de favoritas')
  }

  function handleBackFromGuide() {
    setCurrentPage('home')
    setSelectedGuideId(null)
  }

  function handleClearCategoryFilter() {
    setCategoryFilter(null)
  }

  function handleSaveNewGuide(guide) {
    addGuide(guide)
    showToast('✅ Guía guardada exitosamente')
  }

  /* ——— Guías a mostrar en HomePage según contexto ——— */
  const guidesForHome = categoryFilter
    ? guidesByCategory(categoryFilter)
    : guides

  const favGuidesForHome = categoryFilter
    ? favoriteGuides.filter(g => g.category === categoryFilter)
    : favoriteGuides

  /* ——— Render de la página activa ——— */
  function renderPage() {
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            guides={currentPage === 'favorites' ? favGuidesForHome : guidesForHome}
            featuredGuides={featuredGuides}
            topGuides={topGuides}
            stats={stats}
            favorites={favorites}
            categoryFilter={categoryFilter}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenGuide={handleOpenGuide}
            onToggleFavorite={handleToggleFavorite}
            onSelectCategory={id => handleSidebarNavigate({ type: 'category', id })}
          />
        )

      case 'favorites':
        return (
          <HomePage
            guides={favoriteGuides}
            featuredGuides={[]}
            topGuides={[]}
            stats={{ ...stats, total: favoriteGuides.length }}
            favorites={favorites}
            categoryFilter={null}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenGuide={handleOpenGuide}
            onToggleFavorite={handleToggleFavorite}
            onSelectCategory={id => handleSidebarNavigate({ type: 'category', id })}
          />
        )

      case 'guide':
        return (
          <GuidePage
            guide={getGuideById(selectedGuideId)}
            allGuides={guides}
            isFavorite={favorites.includes(selectedGuideId)}
            onBack={handleBackFromGuide}
            onOpenGuide={handleOpenGuide}
            onToggleFavorite={handleToggleFavorite}
          />
        )

      case 'create':
        return <CreateGuidePage onSave={handleSaveNewGuide} />

      case 'downloads':
        return <DownloadsPage />

      default:
        return null
    }
  }

  return (
    <div className="layout">
      <Sidebar
        currentPage={currentPage}
        categoryFilter={categoryFilter}
        favCount={favorites.length}
        guideCounts={guideCounts}
        onNavigate={handleSidebarNavigate}
      />

      <div className="layout__main">
        <TopBar
          currentPage={currentPage}
          categoryFilter={categoryFilter}
          guideCount={guides.length}
          totalViews={stats.totalViews}
          onClearFilter={handleClearCategoryFilter}
          onBack={handleBackFromGuide}
        />

        <main className="layout__content">
          {renderPage()}
        </main>
      </div>

      <Toast message={toast} />
    </div>
  )
}
