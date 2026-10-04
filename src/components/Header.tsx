import React, { useState } from 'react';
import { 
  Search, 
  Bookmark, 
  Heart, 
  User, 
  Menu, 
  X, 
  ShieldCheck, 
  LogOut, 
  SlidersHorizontal,
  Flame,
  Film,
  Tv,
  Link as LinkIcon
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenFilters: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch, onOpenFilters }) => {
  const { 
    user, 
    watchlist, 
    favorites, 
    activeNavTab, 
    setActiveNavTab, 
    setFilter, 
    setIsAdminOpen, 
    setIsAuthOpen, 
    setIsCustomLinkModalOpen,
    logout 
  } = useMovies();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNavClick = (tab: string, category?: string, type?: string) => {
    setActiveNavTab(tab);
    setMobileMenuOpen(false);
    if (category) {
      setFilter({ category, type: 'All', genre: 'All', searchQuery: '' });
    } else if (type) {
      setFilter({ type, category: 'All', genre: 'All', searchQuery: '' });
    } else {
      setFilter({ category: 'All', type: 'All', genre: 'All', searchQuery: '' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#080b11]/90 backdrop-blur-md transition-all">
      {/* Primary Top Bar adhering to Top Bar Contract */}
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Zone 1: Single element Brand Wordmark */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2 text-left focus-visible:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 font-display font-black text-white shadow-md shadow-indigo-500/20">
              CV
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-black tracking-tight text-white hover:text-indigo-300 transition-colors">
                CineVault
              </span>
              <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                Puru Kumar
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: Clean text nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors hover:text-white ${
              activeNavTab === 'home' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-500 pb-0.5' : ''
            }`}
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('bollywood', 'Bollywood')}
            className={`transition-colors hover:text-white ${
              activeNavTab === 'bollywood' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-500 pb-0.5' : ''
            }`}
          >
            Bollywood
          </button>
          <button
            onClick={() => handleNavClick('hollywood', 'Hollywood')}
            className={`transition-colors hover:text-white ${
              activeNavTab === 'hollywood' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-500 pb-0.5' : ''
            }`}
          >
            Hollywood
          </button>
          <button
            onClick={() => handleNavClick('south', 'South Indian')}
            className={`transition-colors hover:text-white ${
              activeNavTab === 'south' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-500 pb-0.5' : ''
            }`}
          >
            South Indian
          </button>
          <button
            onClick={() => handleNavClick('hindi-dubbed', 'Hindi Dubbed')}
            className={`transition-colors hover:text-white ${
              activeNavTab === 'hindi-dubbed' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-500 pb-0.5' : ''
            }`}
          >
            Hindi Dubbed
          </button>
          <button
            onClick={() => handleNavClick('series', undefined, 'Web Series')}
            className={`transition-colors hover:text-white ${
              activeNavTab === 'series' ? 'text-indigo-400 font-semibold border-b-2 border-indigo-500 pb-0.5' : ''
            }`}
          >
            Web Series
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Instant Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-lg bg-slate-800/80 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/50 transition-all focus:outline-none"
            title="Search Movies, Cast & Directors (Ctrl+K)"
          >
            <Search className="h-3.5 w-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search...</span>
            <kbd className="hidden lg:inline rounded bg-slate-900 px-1 text-[10px] text-slate-400">⌘K</kbd>
          </button>

          {/* Connect Video Link Button */}
          <button
            onClick={() => setIsCustomLinkModalOpen(true)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/60 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:text-white border border-indigo-500/30 transition-all"
            title="Connect Video Link to stream or download in quality"
          >
            <LinkIcon className="h-3.5 w-3.5 text-indigo-400" />
            <span className="hidden sm:inline">Link to Video</span>
          </button>

          {/* Filter Bar Launcher */}
          <button
            onClick={onOpenFilters}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white border border-slate-700/50 transition-colors"
            title="Filter by Year, Genre & Language"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>

          {/* Library / Watchlist */}
          <button
            onClick={() => handleNavClick('library')}
            className={`relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/50 transition-colors ${
              activeNavTab === 'library' 
                ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50' 
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700/80 hover:text-white'
            }`}
            title="Watchlist & Favorites"
          >
            <Bookmark className="h-4 w-4" />
            {watchlist.length > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white">
                {watchlist.length}
              </span>
            )}
          </button>

          {/* User / Admin Profile Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 rounded-lg bg-slate-800/80 px-2.5 py-1.5 border border-slate-700/50 text-xs text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="hidden sm:inline font-medium max-w-[100px] truncate">{user.name}</span>
                {user.role === 'admin' && (
                  <ShieldCheck className="h-3.5 w-3.5 text-amber-400" />
                )}
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-700 bg-slate-900 p-2 shadow-xl z-50">
                  <div className="border-b border-slate-800 px-3 py-2">
                    <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    <div className="mt-1 text-[10px] text-indigo-400 font-medium">
                      {user.role === 'admin' ? 'Catalog Administrator' : 'Portal Member'}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        handleNavClick('library');
                        setProfileDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                      Watchlist ({watchlist.length})
                    </button>
                    <button
                      onClick={() => {
                        handleNavClick('library');
                        setProfileDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white"
                    >
                      <Heart className="h-3.5 w-3.5" />
                      Favorites ({favorites.length})
                    </button>

                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          setIsAdminOpen(true);
                          setProfileDropdownOpen(false);
                        }}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-950/40 hover:text-amber-200"
                      >
                        <ShieldCheck className="h-3.5 w-3.5" />
                        Admin Dashboard
                      </button>
                    )}
                  </div>

                  <div className="border-t border-slate-800 pt-1">
                    <button
                      onClick={() => {
                        logout();
                        setProfileDropdownOpen(false);
                      }}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true, 'login')}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 transition-colors"
            >
              <User className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700/50 bg-slate-800/80 text-slate-300 md:hidden hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-800 bg-[#0c1017] px-4 py-4 md:hidden animate-in slide-in-from-top duration-200">
          <div className="space-y-1 pb-3">
            <button
              onClick={() => handleNavClick('home')}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeNavTab === 'home' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Flame className="h-4 w-4 text-amber-400" />
              Home / Featured
            </button>
            <button
              onClick={() => handleNavClick('bollywood', 'Bollywood')}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeNavTab === 'bollywood' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Film className="h-4 w-4 text-indigo-400" />
              Bollywood Movies
            </button>
            <button
              onClick={() => handleNavClick('hollywood', 'Hollywood')}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeNavTab === 'hollywood' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Film className="h-4 w-4 text-blue-400" />
              Hollywood Movies
            </button>
            <button
              onClick={() => handleNavClick('south', 'South Indian')}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeNavTab === 'south' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Film className="h-4 w-4 text-emerald-400" />
              South Indian (Hindi Dubbed)
            </button>
            <button
              onClick={() => handleNavClick('hindi-dubbed', 'Hindi Dubbed')}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeNavTab === 'hindi-dubbed' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Film className="h-4 w-4 text-purple-400" />
              Hindi Dubbed
            </button>
            <button
              onClick={() => handleNavClick('series', undefined, 'Web Series')}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeNavTab === 'series' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Tv className="h-4 w-4 text-rose-400" />
              Web Series
            </button>
            <button
              onClick={() => handleNavClick('library')}
              className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                activeNavTab === 'library' ? 'bg-indigo-600/20 text-indigo-400' : 'text-slate-300 hover:bg-slate-800'
              }`}
            >
              <Bookmark className="h-4 w-4 text-amber-400" />
              Watchlist & Favorites
            </button>
            <button
              onClick={() => {
                setIsCustomLinkModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-indigo-300 hover:bg-indigo-950/40"
            >
              <LinkIcon className="h-4 w-4 text-indigo-400" />
              Connect Video Link (Stream & Download)
            </button>
            {user?.role === 'admin' && (
              <button
                onClick={() => {
                  setIsAdminOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-amber-300 hover:bg-amber-950/40"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin Panel
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
