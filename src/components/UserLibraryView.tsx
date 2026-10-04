import React, { useState } from 'react';
import { 
  Bookmark, 
  Heart, 
  History, 
  Film, 
  User, 
  ShieldCheck, 
  Calendar,
  Trash2,
  Check
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { MovieGrid } from './MovieGrid';
import { MovieCard } from './MovieCard';

export const UserLibraryView: React.FC = () => {
  const { 
    user, 
    movies, 
    watchlist, 
    favorites, 
    recentlyViewed, 
    clearWatchlist,
    clearFavorites,
    clearRecentlyViewed,
    toggleWatchlist,
    toggleFavorite,
    removeFromRecentlyViewed,
    setIsAdminOpen,
    setIsAuthOpen
  } = useMovies();

  const [activeTab, setActiveTab] = useState<'watchlist' | 'favorites' | 'recent'>('watchlist');
  const [confirmClear, setConfirmClear] = useState(false);

  const watchlistMovies = movies.filter(m => watchlist.includes(m.id));
  const favoriteMovies = movies.filter(m => favorites.includes(m.id));
  const recentMovies = recentlyViewed
    .map(id => movies.find(m => m.id === id))
    .filter(Boolean) as typeof movies;

  const currentMovies = 
    activeTab === 'watchlist' ? watchlistMovies :
    activeTab === 'favorites' ? favoriteMovies :
    recentMovies;

  const handleClearCurrent = () => {
    if (activeTab === 'watchlist') {
      clearWatchlist();
    } else if (activeTab === 'favorites') {
      clearFavorites();
    } else {
      clearRecentlyViewed();
    }
    setConfirmClear(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Banner */}
      <div className="rounded-2xl border border-slate-800 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-2xl font-black text-white shadow-xl shadow-indigo-600/30">
              {user ? user.name.charAt(0).toUpperCase() : 'G'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-white">
                  {user ? user.name : 'Guest User'}
                </h1>
                {user?.role === 'admin' && (
                  <span className="flex items-center gap-1 rounded bg-amber-500/20 px-2 py-0.5 text-xs font-semibold text-amber-300 border border-amber-500/30">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {user ? user.email : 'Sign in to sync your bookmarks & preferences across all devices'}
              </p>
              {user && (
                <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-1">
                  <Calendar className="h-3 w-3" />
                  <span>Member since {user.joinedAt}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {user ? (
              user.role === 'admin' && (
                <button
                  onClick={() => setIsAdminOpen(true)}
                  className="rounded-lg bg-amber-600 px-4 py-2 text-xs font-bold text-white hover:bg-amber-500 shadow-md transition-colors"
                >
                  Manage Catalog (Admin Panel)
                </button>
              )
            ) : (
              <button
                onClick={() => setIsAuthOpen(true, 'login')}
                className="rounded-lg bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500 shadow-md transition-colors"
              >
                Sign In to Account
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-6 grid grid-cols-3 gap-3 border-t border-slate-800/80 pt-6 text-center">
          <div className="rounded-xl bg-slate-900/60 p-3 border border-slate-800">
            <span className="font-display text-xl font-bold text-white tabular-nums">
              {watchlist.length}
            </span>
            <span className="block text-xs text-slate-400 mt-0.5">In Watchlist</span>
          </div>

          <div className="rounded-xl bg-slate-900/60 p-3 border border-slate-800">
            <span className="font-display text-xl font-bold text-rose-400 tabular-nums">
              {favorites.length}
            </span>
            <span className="block text-xs text-slate-400 mt-0.5">Favorites</span>
          </div>

          <div className="rounded-xl bg-slate-900/60 p-3 border border-slate-800">
            <span className="font-display text-xl font-bold text-indigo-400 tabular-nums">
              {recentlyViewed.length}
            </span>
            <span className="block text-xs text-slate-400 mt-0.5">History Items</span>
          </div>
        </div>
      </div>

      {/* Tabs & Delete/Clear Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setActiveTab('watchlist');
              setConfirmClear(false);
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'watchlist'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Bookmark className="h-4 w-4" />
            <span>My Watchlist ({watchlist.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('favorites');
              setConfirmClear(false);
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'favorites'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Heart className="h-4 w-4" />
            <span>Favorites ({favorites.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveTab('recent');
              setConfirmClear(false);
            }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold transition-colors ${
              activeTab === 'recent'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <History className="h-4 w-4" />
            <span>Recently Viewed ({recentlyViewed.length})</span>
          </button>
        </div>

        {/* Delete All / Clear Button with In-UI Confirmation */}
        {currentMovies.length > 0 && (
          <div>
            {confirmClear ? (
              <div className="flex items-center gap-1.5 bg-rose-950/80 border border-rose-500/50 rounded-lg p-1 animate-in fade-in">
                <span className="text-xs font-bold text-rose-200 px-1">Clear all {activeTab}?</span>
                <button
                  type="button"
                  onClick={handleClearCurrent}
                  className="rounded bg-rose-600 hover:bg-rose-500 px-2.5 py-1 text-xs font-bold text-white shadow transition-colors"
                >
                  Yes, Clear
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="rounded bg-slate-800 hover:bg-slate-700 px-2 py-1 text-xs text-slate-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-rose-950/50 hover:border-rose-500/40 text-slate-400 hover:text-rose-300 border border-slate-700 px-3 py-1.5 text-xs font-semibold transition-all"
                title={`Delete/clear all items in ${activeTab}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Clear {activeTab === 'watchlist' ? 'Watchlist' : activeTab === 'favorites' ? 'Favorites' : 'History'}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Movie Grid with direct individual delete/remove buttons */}
      {currentMovies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700/60 text-slate-400 mb-3">
            <Film className="h-7 w-7 text-indigo-400/60" />
          </div>
          <h3 className="font-display text-base font-bold text-white">Your {activeTab === 'watchlist' ? 'Watchlist' : activeTab === 'favorites' ? 'Favorites' : 'Watch History'} is empty</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-sm">
            Browse titles and click the bookmark or favorite button on any movie card to add it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-xs text-slate-400 font-medium">
            {currentMovies.length} titles in {activeTab} · Click trash button on card to remove individual title
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {currentMovies.map(movie => (
              <div key={movie.id} className="relative group/libcard">
                <MovieCard movie={movie} />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (activeTab === 'watchlist') {
                      toggleWatchlist(movie.id);
                    } else if (activeTab === 'favorites') {
                      toggleFavorite(movie.id);
                    } else {
                      removeFromRecentlyViewed(movie.id);
                    }
                  }}
                  className="absolute top-2 right-2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-rose-600/90 hover:bg-rose-500 text-white shadow-lg transition-transform active:scale-90"
                  title={`Remove "${movie.title}" from ${activeTab}`}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
