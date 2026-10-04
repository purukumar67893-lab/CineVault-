import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, 
  X, 
  History, 
  Trash2, 
  ArrowRight, 
  Star, 
  Film, 
  Clapperboard, 
  User, 
  Clock 
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { Movie } from '../types/movie';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { 
    movies, 
    searchHistory, 
    addSearchHistory, 
    clearSearchHistory, 
    setActiveMovie, 
    markAsViewed 
  } = useMovies();

  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        // toggle modal
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Instant multi-attribute search
  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return movies.filter(movie => {
      const matchTitle = movie.title.toLowerCase().includes(q) || movie.originalTitle?.toLowerCase().includes(q);
      const matchDirector = movie.director.toLowerCase().includes(q);
      const matchCast = movie.cast.some(actor => actor.toLowerCase().includes(q));
      const matchGenre = movie.genre.some(g => g.toLowerCase().includes(q));
      const matchLang = movie.language.toLowerCase().includes(q);
      const matchYear = movie.year.toString().includes(q);
      const matchType = movie.type.toLowerCase().includes(q);
      const matchCategory = movie.category.toLowerCase().includes(q);

      return matchTitle || matchDirector || matchCast || matchGenre || matchLang || matchYear || matchType || matchCategory;
    });
  }, [query, movies]);

  // Quick suggestions based on active dataset
  const suggestions = useMemo(() => {
    return ['Kalki', 'Mirzapur', 'Sci-Fi', 'Action', 'Dual Audio', 'South Indian', '4K UHD'];
  }, []);

  if (!isOpen) return null;

  const handleSelectMovie = (movie: Movie) => {
    addSearchHistory(movie.title);
    markAsViewed(movie.id);
    setActiveMovie(movie);
    onClose();
  };

  const handleSuggestionClick = (text: string) => {
    setQuery(text);
    addSearchHistory(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-md p-4 pt-16 sm:pt-20">
      <div 
        className="w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0d121c] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="flex items-center border-b border-slate-800 px-4 py-3.5">
          <Search className="h-5 w-5 text-indigo-400 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search movies, web series, actors, directors, genres, years..."
            autoFocus
            className="w-full bg-transparent px-3 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="mr-2 text-xs text-slate-400 hover:text-white"
              title="Clear input"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[65vh] overflow-y-auto custom-scrollbar p-4 space-y-4">
          
          {/* If there's an active query */}
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <span>Search Results ({results.length})</span>
                <span className="text-[11px] text-indigo-400 font-normal">Found across titles, actors & directors</span>
              </div>

              {results.length > 0 ? (
                <div className="space-y-2">
                  {results.map(movie => (
                    <div
                      key={movie.id}
                      onClick={() => handleSelectMovie(movie)}
                      className="group flex items-center justify-between rounded-xl bg-slate-900/80 p-2.5 hover:bg-slate-800/90 border border-slate-800/80 hover:border-indigo-500/50 cursor-pointer transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={movie.poster}
                          alt={movie.title}
                          className="h-14 w-10 shrink-0 rounded-lg object-cover bg-slate-950"
                        />
                        <div className="min-w-0">
                          <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 truncate">
                            {movie.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-slate-400">
                            <span className="tabular-nums">{movie.year}</span>
                            <span>·</span>
                            <span>{movie.category}</span>
                            <span>·</span>
                            <span className="text-indigo-400">{movie.quality}</span>
                          </div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">
                            Cast: {movie.cast.slice(0, 3).join(', ')}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="flex items-center gap-1 rounded bg-black/60 px-2 py-1 text-xs font-bold text-amber-400">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>{movie.rating.toFixed(1)}</span>
                        </span>
                        <ArrowRight className="h-4 w-4 text-slate-500 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Film className="mx-auto h-10 w-10 text-slate-600 mb-2" />
                  <p className="text-sm font-semibold text-slate-300">No titles matched "{query}"</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Try searching for an actor like "Prabhas" or "Manoj Bajpayee", or a genre like "Action".
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Idle View: Search History + Quick Suggestions */
            <div className="space-y-5">
              
              {/* Recent Searches */}
              {searchHistory.length > 0 && (
                <div>
                  <div className="flex items-center justify-between pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <History className="h-3.5 w-3.5 text-indigo-400" />
                      Recent Searches
                    </span>
                    <button
                      onClick={clearSearchHistory}
                      className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {searchHistory.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(item)}
                        className="rounded-lg bg-slate-900 border border-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              <div>
                <div className="pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Trending Keywords & Genres
                </div>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((sug, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(sug)}
                      className="rounded-lg bg-indigo-950/40 border border-indigo-500/20 px-3 py-1.5 text-xs text-indigo-300 hover:bg-indigo-900/60 hover:text-white transition-colors"
                    >
                      {sug}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Catalog Spotlight */}
              <div>
                <div className="pb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Popular Titles
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {movies.slice(0, 4).map(movie => (
                    <div
                      key={movie.id}
                      onClick={() => handleSelectMovie(movie)}
                      className="flex items-center gap-3 rounded-lg bg-slate-900/60 p-2 hover:bg-slate-800/80 cursor-pointer border border-slate-800 transition-colors"
                    >
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="h-10 w-8 rounded object-cover"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-white truncate">{movie.title}</div>
                        <div className="text-[11px] text-slate-400">{movie.year} · {movie.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer info */}
        <div className="border-t border-slate-800 bg-[#090d14] px-4 py-2.5 flex items-center justify-between text-[11px] text-slate-500">
          <span>Tip: Press ESC to close</span>
          <span>CineVault Instant Multi-Engine</span>
        </div>
      </div>
    </div>
  );
};
