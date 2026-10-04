import React, { useState, useMemo } from 'react';
import { 
  Flame, 
  Film, 
  Tv, 
  Sparkles, 
  SlidersHorizontal, 
  TrendingUp, 
  Clapperboard, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { MovieProvider, useMovies } from './context/MovieContext';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { MovieRow } from './components/MovieRow';
import { MovieGrid } from './components/MovieGrid';
import { FilterBar } from './components/FilterBar';
import { SearchModal } from './components/SearchModal';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { TrailerModal } from './components/TrailerModal';
import { DownloadModal } from './components/DownloadModal';
import { AuthModal } from './components/AuthModal';
import { AdminModal } from './components/AdminModal';
import { CustomLinkModal } from './components/CustomLinkModal';
import { UserLibraryView } from './components/UserLibraryView';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { 
    movies, 
    filters, 
    setFilter, 
    resetFilters, 
    activeNavTab, 
    setActiveNavTab 
  } = useMovies();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Compute filtered movies for browse & search views
  const filteredMovies = useMemo(() => {
    return movies.filter(m => {
      // Category filter
      if (filters.category !== 'All' && m.category !== filters.category) return false;
      // Type filter
      if (filters.type !== 'All' && m.type !== filters.type) return false;
      // Genre filter
      if (filters.genre !== 'All' && !m.genre.includes(filters.genre)) return false;
      // Language filter
      if (filters.language !== 'All') {
        const langLower = m.language.toLowerCase();
        const filterLower = filters.language.toLowerCase();
        if (!langLower.includes(filterLower)) return false;
      }
      // Year filter
      if (filters.year !== 'All') {
        if (filters.year === '2026' && m.year !== 2026) return false;
        if (filters.year === '2025' && m.year !== 2025) return false;
        if (filters.year === '2024' && m.year !== 2024) return false;
        if (filters.year === '2023' && m.year !== 2023) return false;
        if (filters.year === '2022' && m.year !== 2022) return false;
        if (filters.year === '2020-2021' && (m.year < 2020 || m.year > 2021)) return false;
        if (filters.year === '2010s' && (m.year < 2010 || m.year > 2019)) return false;
        if (filters.year === 'Classics' && m.year >= 2010) return false;
      }
      // Search query
      if (filters.searchQuery.trim()) {
        const q = filters.searchQuery.toLowerCase();
        const matchesTitle = m.title.toLowerCase().includes(q);
        const matchesCast = m.cast.some(actor => actor.toLowerCase().includes(q));
        const matchesDirector = m.director.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCast && !matchesDirector) return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'popular') return (b.votesCount || '0').localeCompare(a.votesCount || '0');
      if (filters.sortBy === 'title') return a.title.localeCompare(b.title);
      // default: latest
      return b.year - a.year;
    });
  }, [movies, filters]);

  // Specific thematic slices for homepage rows
  const trendingMovies = useMemo(() => movies.filter(m => m.isTrending || m.rating >= 8.5), [movies]);
  const latestMovies = useMemo(() => movies.filter(m => m.year >= 2025), [movies]);
  const bollywoodMovies = useMemo(() => movies.filter(m => m.category === 'Bollywood'), [movies]);
  const southMovies = useMemo(() => movies.filter(m => m.category === 'South Indian'), [movies]);
  const hollywoodMovies = useMemo(() => movies.filter(m => m.category === 'Hollywood'), [movies]);
  const hindiDubbedMovies = useMemo(() => movies.filter(m => m.category === 'Hindi Dubbed' || m.language.includes('Hindi Dubbed')), [movies]);
  const webSeries = useMemo(() => movies.filter(m => m.type === 'Web Series'), [movies]);
  const actionThrillers = useMemo(() => movies.filter(m => m.genre.includes('Action') || m.genre.includes('Thriller')), [movies]);

  // Determine if filter is actively applied
  const hasActiveFilters = 
    filters.category !== 'All' || 
    filters.type !== 'All' || 
    filters.genre !== 'All' || 
    filters.language !== 'All' || 
    filters.year !== 'All' || 
    filters.searchQuery !== '';

  const handleQuickCategory = (cat: string) => {
    setActiveNavTab(cat === 'All' ? 'home' : cat.toLowerCase());
    setFilter({ category: cat, type: 'All', genre: 'All', searchQuery: '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#080b11] text-slate-100">
      
      {/* Navigation Header */}
      <Header 
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenFilters={() => setIsFiltersOpen(prev => !prev)}
      />

      {/* Filter drawer / bar */}
      <FilterBar 
        isOpen={isFiltersOpen} 
        onClose={() => setIsFiltersOpen(false)} 
      />

      {/* Content Area */}
      <main className="flex-1 pb-16">
        
        {/* VIEW 1: USER LIBRARY (Watchlist, Favorites, History) */}
        {activeNavTab === 'library' ? (
          <UserLibraryView />
        ) : hasActiveFilters || activeNavTab !== 'home' ? (
          /* VIEW 2: FILTERED CATALOG / CATEGORY GRID */
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            
            {/* Breadcrumb / Title Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                  {filters.category !== 'All' ? `${filters.category} Collection` :
                   filters.type !== 'All' ? `${filters.type} Collection` :
                   filters.genre !== 'All' ? `${filters.genre} Movies & Series` :
                   'Movie & Series Catalog'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Showing {filteredMovies.length} verified titles with 4K, 1080p, 720p streams and fast download mirrors
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFiltersOpen(prev => !prev)}
                  className="flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>{isFiltersOpen ? 'Hide Filters' : 'Refine Filters'}</span>
                </button>
                <button
                  onClick={resetFilters}
                  className="rounded-lg bg-indigo-600/20 px-3 py-1.5 text-xs font-semibold text-indigo-400 hover:bg-indigo-600/30 border border-indigo-500/30 transition-colors"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Responsive Movie Grid: 2 cols on phone, 3-4 on tablet, 5-7 on desktop */}
            <MovieGrid 
              movies={filteredMovies}
              onClearFilters={resetFilters}
            />

          </div>
        ) : (
          /* VIEW 3: RICH HOMEPAGE EXPERIENCE */
          <div>
            
            {/* Cinematic Featured Hero Slider */}
            <HeroSlider />

            {/* Quick Industry Filter Tabs */}
            <div className="w-full border-b border-slate-800/80 bg-[#0a0e16]/80 backdrop-blur-sm sticky top-16 z-30">
              <div className="mx-auto flex max-w-7xl items-center gap-2 overflow-x-auto no-scrollbar px-4 sm:px-6 lg:px-8 py-3">
                {[
                  { id: 'All', label: 'All Catalog', icon: Sparkles },
                  { id: 'Bollywood', label: 'Bollywood', icon: Film },
                  { id: 'Hollywood', label: 'Hollywood Dual Audio', icon: Film },
                  { id: 'South Indian', label: 'South Indian Hindi', icon: Flame },
                  { id: 'Hindi Dubbed', label: 'Hindi Dubbed', icon: Clapperboard },
                  { id: 'Web Series', label: 'Web Series', icon: Tv },
                ].map(item => {
                  const Icon = item.icon;
                  const isActive = filters.category === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleQuickCategory(item.id)}
                      className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all ${
                        isActive 
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20' 
                          : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* SECTION 1: Trending Now */}
            <MovieRow 
              title="Trending Movies & Shows" 
              subtitle="Most popular and highest-rated titles this week"
              movies={trendingMovies}
              onViewAll={() => handleQuickCategory('All')}
            />

            {/* SECTION 2: Latest Releases (2025-2026) */}
            <MovieRow 
              title="Latest Releases (2025 - 2026)" 
              subtitle="Fresh theatrical and OTT premier titles"
              movies={latestMovies}
              onViewAll={() => setFilter({ year: '2025' })}
            />

            {/* SECTION 3: Bollywood Blockbusters */}
            <MovieRow 
              title="Bollywood Blockbusters" 
              subtitle="Hindi cinema masterpieces, action sagas and dramas"
              movies={bollywoodMovies}
              onViewAll={() => handleQuickCategory('Bollywood')}
            />

            {/* SECTION 4: South Indian Hindi Dubbed */}
            <MovieRow 
              title="South Indian Cinema (Hindi Dubbed)" 
              subtitle="Telugu, Tamil, Malayalam & Kannada powerhouses"
              movies={southMovies}
              onViewAll={() => handleQuickCategory('South Indian')}
            />

            {/* SECTION 5: Hollywood Hits (Dual Audio) */}
            <MovieRow 
              title="Hollywood Hits (Dual Audio)" 
              subtitle="English & Hindi 5.1 Dolby audio action and sci-fi"
              movies={hollywoodMovies}
              onViewAll={() => handleQuickCategory('Hollywood')}
            />

            {/* SECTION 6: Binge Web Series */}
            <MovieRow 
              title="Binge-Worthy Web Series" 
              subtitle="Complete season packs with multi-episodes"
              movies={webSeries}
              onViewAll={() => setFilter({ type: 'Web Series' })}
            />

            {/* SECTION 7: Action & High-Octane Thrillers */}
            <MovieRow 
              title="Action & Suspense Thrillers" 
              subtitle="Edge-of-the-seat thrillers in 4K UHD and 1080p"
              movies={actionThrillers}
              onViewAll={() => setFilter({ genre: 'Action' })}
            />

            {/* Entire Catalog Explorer Grid at the bottom */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-800/80">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
                    Explore Complete Catalog
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                    Browse all movies, series, qualities, and authorized mirrors
                  </p>
                </div>
                <button
                  onClick={() => setIsFiltersOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
                >
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  <span>Filter Catalog</span>
                </button>
              </div>

              <MovieGrid movies={movies} />
            </section>

          </div>
        )}

      </main>

      {/* Modals & Overlays */}
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />

      <MovieDetailsModal />
      <VideoPlayerModal />
      <TrailerModal />
      <DownloadModal />
      <CustomLinkModal />
      <AuthModal />
      <AdminModal />

      {/* Footer with Publisher Puru Kumar Acknowledgement */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <MovieProvider>
      <MainContent />
    </MovieProvider>
  );
}
