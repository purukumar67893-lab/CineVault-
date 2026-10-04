import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie, FilterState, UserProfile } from '../types/movie';
import { INITIAL_MOVIES } from '../data/initialMovies';

interface MovieContextType {
  movies: Movie[];
  favorites: string[];
  watchlist: string[];
  recentlyViewed: string[];
  searchHistory: string[];
  activeMovie: Movie | null;
  playingMovie: Movie | null;
  trailerMovie: Movie | null;
  downloadMovie: Movie | null;
  isAdminOpen: boolean;
  isAuthOpen: boolean;
  isCustomLinkModalOpen: boolean;
  authMode: 'login' | 'signup';
  user: UserProfile | null;
  filters: FilterState;
  activeNavTab: string;

  // Actions
  setActiveMovie: (movie: Movie | null) => void;
  setPlayingMovie: (movie: Movie | null) => void;
  setTrailerMovie: (movie: Movie | null) => void;
  setDownloadMovie: (movie: Movie | null) => void;
  setIsAdminOpen: (open: boolean) => void;
  setIsAuthOpen: (open: boolean, mode?: 'login' | 'signup') => void;
  setIsCustomLinkModalOpen: (open: boolean) => void;
  playCustomVideoLink: (url: string, title?: string) => void;
  setActiveNavTab: (tab: string) => void;
  
  // Library Actions
  toggleFavorite: (movieId: string) => void;
  toggleWatchlist: (movieId: string) => void;
  clearWatchlist: () => void;
  clearFavorites: () => void;
  clearRecentlyViewed: () => void;
  markAsViewed: (movieId: string) => void;
  removeFromRecentlyViewed: (movieId: string) => void;
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  removeSearchHistoryItem: (item: string) => void;

  // Filters
  setFilter: (updates: Partial<FilterState>) => void;
  resetFilters: () => void;

  // CRUD
  addMovie: (movie: Omit<Movie, 'id' | 'created_at'>) => void;
  updateMovie: (movie: Movie) => void;
  deleteMovie: (movieId: string) => void;
  resetToDefaults: () => void;

  // Auth
  login: (email: string, name?: string, role?: 'user' | 'admin') => void;
  logout: () => void;
}

const DEFAULT_FILTERS: FilterState = {
  searchQuery: '',
  category: 'All',
  type: 'All',
  genre: 'All',
  language: 'All',
  year: 'All',
  sortBy: 'latest'
};

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load movies from local storage or fallback to INITIAL_MOVIES
  const [movies, setMovies] = useState<Movie[]>(() => {
    try {
      const saved = localStorage.getItem('cinevault_movies_v3');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_MOVIES;
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cinevault_favs');
      return saved ? JSON.parse(saved) : ['cine-01', 'cine-03'];
    } catch {
      return ['cine-01', 'cine-03'];
    }
  });

  const [watchlist, setWatchlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cinevault_watchlist');
      return saved ? JSON.parse(saved) : ['cine-04', 'cine-10'];
    } catch {
      return ['cine-04', 'cine-10'];
    }
  });

  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cinevault_recent');
      return saved ? JSON.parse(saved) : ['cine-01', 'cine-02'];
    } catch {
      return ['cine-01', 'cine-02'];
    }
  });

  const [searchHistory, setSearchHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('cinevault_search_history');
      return saved ? JSON.parse(saved) : ['Kalki', 'Mirzapur', 'Action', 'Dual Audio'];
    } catch {
      return ['Kalki', 'Mirzapur', 'Action'];
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('cinevault_user');
      return saved ? JSON.parse(saved) : {
        id: 'user-puru',
        name: 'Puru Kumar (Publisher)',
        email: 'purukumar67893@gmail.com',
        role: 'admin',
        joinedAt: '2025-01-01'
      };
    } catch {
      return null;
    }
  });

  const [filters, setFiltersState] = useState<FilterState>(DEFAULT_FILTERS);
  const [activeNavTab, setActiveNavTab] = useState<string>('home');
  const [activeMovie, setActiveMovie] = useState<Movie | null>(null);
  const [playingMovie, setPlayingMovie] = useState<Movie | null>(null);
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [downloadMovie, setDownloadMovie] = useState<Movie | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCustomLinkModalOpen, setIsCustomLinkModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const playCustomVideoLink = (url: string, title?: string) => {
    if (!url.trim()) return;
    const tempMovie: Movie = {
      id: `custom-${Date.now()}`,
      title: title || 'Custom Video Stream',
      originalTitle: 'Direct Video URL Stream',
      description: `Playing direct video link: ${url}`,
      poster: '/src/assets/images/poster_cyber_thriller_1791117262582.jpg',
      backdrop: '/src/assets/images/hero_cinematic_backdrop_1791117223849.jpg',
      trailer_url: url,
      stream_url: url,
      year: new Date().getFullYear(),
      rating: 9.0,
      votesCount: 'Direct Link',
      language: 'Direct Audio Stream',
      genre: ['Direct Stream', 'Action'],
      runtime: 'Full Video',
      director: 'User Connected Stream',
      cast: ['Custom Link Source'],
      type: 'Movie',
      category: 'Hollywood',
      quality: '1080p WebRip',
      featured: false,
      created_at: new Date().toISOString(),
      downloads: [
        {
          resolution: '1080p FHD',
          size: 'Direct Source Stream',
          format: 'MP4 / Direct Link',
          audio: 'Original Audio Stream',
          directUrl: url,
          servers: [
            { name: 'Direct Stream Mirror 1', speed: '50 MB/s', url },
            { name: 'Fast CDN Mirror 2', speed: '40 MB/s', url }
          ]
        },
        {
          resolution: '720p HD',
          size: 'Standard Quality',
          format: 'MP4',
          audio: 'Stereo',
          directUrl: url,
          servers: [
            { name: 'Fast Download Mirror', speed: '30 MB/s', url }
          ]
        }
      ]
    };
    setPlayingMovie(tempMovie);
  };

  // Persistence
  useEffect(() => {
    localStorage.setItem('cinevault_movies_v3', JSON.stringify(movies));
  }, [movies]);

  useEffect(() => {
    localStorage.setItem('cinevault_favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('cinevault_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('cinevault_recent', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  useEffect(() => {
    localStorage.setItem('cinevault_search_history', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('cinevault_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('cinevault_user');
    }
  }, [user]);

  const toggleFavorite = (movieId: string) => {
    setFavorites(prev => 
      prev.includes(movieId) ? prev.filter(id => id !== movieId) : [movieId, ...prev]
    );
  };

  const toggleWatchlist = (movieId: string) => {
    setWatchlist(prev => 
      prev.includes(movieId) ? prev.filter(id => id !== movieId) : [movieId, ...prev]
    );
  };

  const clearWatchlist = () => {
    setWatchlist([]);
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const clearRecentlyViewed = () => {
    setRecentlyViewed([]);
  };

  const markAsViewed = (movieId: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(id => id !== movieId);
      return [movieId, ...filtered].slice(0, 20);
    });
  };

  const removeFromRecentlyViewed = (movieId: string) => {
    setRecentlyViewed(prev => prev.filter(id => id !== movieId));
  };

  const addSearchHistory = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchHistory(prev => {
      const filtered = prev.filter(item => item.toLowerCase() !== trimmed.toLowerCase());
      return [trimmed, ...filtered].slice(0, 10);
    });
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const removeSearchHistoryItem = (itemToRemove: string) => {
    setSearchHistory(prev => prev.filter(i => i !== itemToRemove));
  };

  const setFilter = (updates: Partial<FilterState>) => {
    setFiltersState(prev => ({ ...prev, ...updates }));
  };

  const resetFilters = () => {
    setFiltersState(DEFAULT_FILTERS);
  };

  const addMovie = (movieData: Omit<Movie, 'id' | 'created_at'>) => {
    const newMovie: Movie = {
      ...movieData,
      id: `cine-${Date.now()}`,
      created_at: new Date().toISOString()
    };
    setMovies(prev => [newMovie, ...prev]);
  };

  const updateMovie = (updated: Movie) => {
    setMovies(prev => prev.map(m => m.id === updated.id ? updated : m));
    if (activeMovie?.id === updated.id) {
      setActiveMovie(updated);
    }
  };

  const deleteMovie = (movieId: string) => {
    setMovies(prev => {
      const filtered = prev.filter(m => m.id !== movieId);
      try {
        localStorage.setItem('cinevault_movies_v3', JSON.stringify(filtered));
      } catch (err) {
        console.error('Failed to sync movies to storage:', err);
      }
      return filtered;
    });
    if (activeMovie?.id === movieId) {
      setActiveMovie(null);
    }
    if (playingMovie?.id === movieId) {
      setPlayingMovie(null);
    }
    if (trailerMovie?.id === movieId) {
      setTrailerMovie(null);
    }
    if (downloadMovie?.id === movieId) {
      setDownloadMovie(null);
    }
    setFavorites(prev => prev.filter(id => id !== movieId));
    setWatchlist(prev => prev.filter(id => id !== movieId));
    setRecentlyViewed(prev => prev.filter(id => id !== movieId));
  };

  const resetToDefaults = () => {
    setMovies(INITIAL_MOVIES);
    try {
      localStorage.setItem('cinevault_movies_v3', JSON.stringify(INITIAL_MOVIES));
    } catch (err) {
      console.error(err);
    }
  };

  const login = (email: string, name?: string, role: 'user' | 'admin' = 'user') => {
    const newUser: UserProfile = {
      id: `user-${Date.now()}`,
      name: name || email.split('@')[0],
      email,
      role: email.includes('admin') || email.includes('puru') ? 'admin' : role,
      joinedAt: new Date().toISOString().split('T')[0]
    };
    setUser(newUser);
    setIsAuthOpen(false);
  };

  const logout = () => {
    setUser(null);
  };

  const openAuth = (open: boolean, mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(open);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        favorites,
        watchlist,
        recentlyViewed,
        searchHistory,
        activeMovie,
        playingMovie,
        trailerMovie,
        downloadMovie,
        isAdminOpen,
        isAuthOpen,
        isCustomLinkModalOpen,
        authMode,
        user,
        filters,
        activeNavTab,
        setActiveMovie,
        setPlayingMovie,
        setTrailerMovie,
        setDownloadMovie,
        setIsAdminOpen,
        setIsAuthOpen: openAuth,
        setIsCustomLinkModalOpen,
        playCustomVideoLink,
        setActiveNavTab,
        toggleFavorite,
        toggleWatchlist,
        clearWatchlist,
        clearFavorites,
        clearRecentlyViewed,
        markAsViewed,
        removeFromRecentlyViewed,
        addSearchHistory,
        clearSearchHistory,
        removeSearchHistoryItem,
        setFilter,
        resetFilters,
        addMovie,
        updateMovie,
        deleteMovie,
        resetToDefaults,
        login,
        logout
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};
