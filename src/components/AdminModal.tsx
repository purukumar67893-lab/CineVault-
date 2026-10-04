import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Trash2, 
  Edit3, 
  Star, 
  Film, 
  ShieldCheck, 
  RotateCcw, 
  Check, 
  Save, 
  Sparkles,
  Maximize,
  Minimize,
  Cloud,
  Globe,
  ExternalLink,
  Copy,
  Server
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { Movie, MovieCategory, MovieType } from '../types/movie';
import { CATEGORY_LIST, GENRE_LIST, LANGUAGE_LIST } from '../data/initialMovies';

export const AdminModal: React.FC = () => {
  const { 
    isAdminOpen, 
    setIsAdminOpen, 
    movies, 
    addMovie, 
    updateMovie, 
    deleteMovie, 
    resetToDefaults,
    user 
  } = useMovies();

  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'stats' | 'publish'>('list');
  const [editingMovieId, setEditingMovieId] = useState<string | null>(null);
  const [isModalMaximized, setIsModalMaximized] = useState(false);
  const [copiedCloudUrl, setCopiedCloudUrl] = useState(false);
  const [adminSearch, setAdminSearch] = useState('');
  const [movieToDelete, setMovieToDelete] = useState<{
    id: string;
    title: string;
    poster?: string;
    year?: number;
    category?: string;
  } | null>(null);
  const [deleteToast, setDeleteToast] = useState<string | null>(null);

  const handleDeleteMovie = (id: string, movieTitle: string) => {
    deleteMovie(id);
    setMovieToDelete(null);
    if (editingMovieId === id) {
      handleResetForm();
      setActiveTab('list');
    }
    setDeleteToast(`"${movieTitle}" was permanently deleted from the website.`);
    setTimeout(() => setDeleteToast(null), 4000);
  };

  // Form State
  const [title, setTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [description, setDescription] = useState('');
  const [poster, setPoster] = useState('');
  const [backdrop, setBackdrop] = useState('');
  const [trailerUrl, setTrailerUrl] = useState('');
  const [streamUrl, setStreamUrl] = useState('');
  const [url4k, setUrl4k] = useState('');
  const [size4k, setSize4k] = useState('3.5 GB');
  const [url1080p, setUrl1080p] = useState('');
  const [size1080p, setSize1080p] = useState('1.9 GB');
  const [url720p, setUrl720p] = useState('');
  const [size720p, setSize720p] = useState('880 MB');
  const [url480p, setUrl480p] = useState('');
  const [size480p, setSize480p] = useState('420 MB');
  const [year, setYear] = useState(2025);
  const [rating, setRating] = useState(8.5);
  const [language, setLanguage] = useState('Hindi + English');
  const [genres, setGenres] = useState<string[]>(['Action', 'Thriller']);
  const [runtime, setRuntime] = useState('2h 20m');
  const [director, setDirector] = useState('');
  const [cast, setCast] = useState('');
  const [type, setType] = useState<MovieType>('Movie');
  const [category, setCategory] = useState<MovieCategory>('Bollywood');
  const [quality, setQuality] = useState<'4K UHD' | '1080p WebRip' | '720p HD'>('1080p WebRip');
  const [featured, setFeatured] = useState(false);

  if (!isAdminOpen) return null;

  const startEdit = (movie: Movie) => {
    setEditingMovieId(movie.id);
    setTitle(movie.title);
    setOriginalTitle(movie.originalTitle || '');
    setDescription(movie.description);
    setPoster(movie.poster);
    setBackdrop(movie.backdrop);
    setTrailerUrl(movie.trailer_url);
    setStreamUrl(movie.stream_url || '');

    // Extract quality URLs from downloads if existing
    const opt4k = movie.downloads?.find(d => d.resolution === '4K Ultra HD');
    const opt1080 = movie.downloads?.find(d => d.resolution === '1080p FHD');
    const opt720 = movie.downloads?.find(d => d.resolution === '720p HD');
    const opt480 = movie.downloads?.find(d => d.resolution === '480p SD');

    setUrl4k(opt4k?.directUrl || opt4k?.servers[0]?.url || movie.stream_url || '');
    setSize4k(opt4k?.size || '3.5 GB');
    setUrl1080p(opt1080?.directUrl || opt1080?.servers[0]?.url || movie.stream_url || '');
    setSize1080p(opt1080?.size || '1.9 GB');
    setUrl720p(opt720?.directUrl || opt720?.servers[0]?.url || movie.stream_url || '');
    setSize720p(opt720?.size || '880 MB');
    setUrl480p(opt480?.directUrl || opt480?.servers[0]?.url || movie.stream_url || '');
    setSize480p(opt480?.size || '420 MB');

    setYear(movie.year);
    setRating(movie.rating);
    setLanguage(movie.language);
    setGenres(movie.genre);
    setRuntime(movie.runtime);
    setDirector(movie.director);
    setCast(movie.cast.join(', '));
    setType(movie.type);
    setCategory(movie.category);
    setQuality(movie.quality as any);
    setFeatured(movie.featured);
    setActiveTab('add');
  };

  const handleResetForm = () => {
    setEditingMovieId(null);
    setTitle('');
    setOriginalTitle('');
    setDescription('');
    setPoster('/src/assets/images/poster_bollywood_epic_1791117250110.jpg');
    setBackdrop('/src/assets/images/hero_cinematic_backdrop_1791117223849.jpg');
    setTrailerUrl('https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-');
    setStreamUrl('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4');
    setUrl4k('');
    setSize4k('3.5 GB');
    setUrl1080p('');
    setSize1080p('1.9 GB');
    setUrl720p('');
    setSize720p('880 MB');
    setUrl480p('');
    setSize480p('420 MB');
    setYear(2025);
    setRating(8.5);
    setLanguage('Hindi (Original)');
    setGenres(['Action', 'Thriller']);
    setRuntime('2h 15m');
    setDirector('');
    setCast('');
    setType('Movie');
    setCategory('Bollywood');
    setQuality('1080p WebRip');
    setFeatured(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const mainStream = streamUrl || url1080p || url720p || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

    const movieData = {
      title,
      originalTitle: originalTitle.trim() || undefined,
      description,
      poster: poster || '/src/assets/images/poster_bollywood_epic_1791117250110.jpg',
      backdrop: backdrop || '/src/assets/images/hero_cinematic_backdrop_1791117223849.jpg',
      trailer_url: trailerUrl || 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
      stream_url: mainStream,
      year: Number(year),
      rating: Number(rating),
      votesCount: '15.4k',
      language,
      genre: genres.length > 0 ? genres : ['Action'],
      runtime,
      director: director || 'Puru Media Studio',
      cast: cast.split(',').map(c => c.trim()).filter(Boolean),
      type,
      category,
      quality,
      featured,
      isTrending: true,
      downloads: [
        {
          resolution: '4K Ultra HD' as const,
          size: size4k || '3.5 GB',
          format: 'MKV 10-Bit HEVC',
          audio: 'Dolby Atmos 7.1',
          directUrl: url4k || mainStream,
          servers: [
            { name: 'Ultra High-Speed 4K Server 1', speed: '55 MB/s', url: url4k || mainStream },
            { name: '4K Cloudflare Mirror 2', speed: '40 MB/s', url: url4k || mainStream }
          ]
        },
        {
          resolution: '1080p FHD' as const,
          size: size1080p || '1.9 GB',
          format: 'MKV WebRip Dual Audio',
          audio: 'Hindi 5.1 DD Clean',
          directUrl: url1080p || mainStream,
          servers: [
            { name: 'Ultra Fast FHD Server 1', speed: '50 MB/s', url: url1080p || mainStream },
            { name: 'Direct Cloud Mirror', speed: '35 MB/s', url: url1080p || mainStream }
          ]
        },
        {
          resolution: '720p HD' as const,
          size: size720p || '880 MB',
          format: 'MP4 Clean',
          audio: 'Hindi Stereo Clean',
          directUrl: url720p || mainStream,
          servers: [
            { name: 'Mobile Direct Server', speed: '25 MB/s', url: url720p || mainStream }
          ]
        },
        {
          resolution: '480p SD' as const,
          size: size480p || '420 MB',
          format: 'MP4 Mobile',
          audio: 'Hindi AAC',
          directUrl: url480p || mainStream,
          servers: [
            { name: 'Mobile Light Mirror', speed: '15 MB/s', url: url480p || mainStream }
          ]
        }
      ]
    };

    if (editingMovieId) {
      const existing = movies.find(m => m.id === editingMovieId);
      if (existing) {
        updateMovie({
          ...existing,
          ...movieData
        });
      }
    } else {
      addMovie(movieData);
    }

    handleResetForm();
    setActiveTab('list');
  };

  const toggleGenreSelection = (g: string) => {
    if (g === 'All') return;
    setGenres(prev => 
      prev.includes(g) ? prev.filter(item => item !== g) : [...prev, g]
    );
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md ${
      isModalMaximized ? 'p-0' : 'p-3 sm:p-6'
    }`}>
      <div 
        className={`relative my-auto flex flex-col overflow-hidden border border-slate-700 bg-[#0d121c] text-white shadow-2xl transition-all duration-300 ${
          isModalMaximized 
            ? 'h-screen w-screen rounded-none' 
            : 'h-[90vh] w-full max-w-5xl rounded-2xl'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#090d15] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>CineVault Publisher Admin</span>
                <span className="rounded bg-indigo-600/30 px-2 py-0.5 text-[10px] font-bold text-indigo-300">
                  Puru Kumar
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Manage movies, series, streaming URLs, download mirrors, and catalog stats
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalMaximized(prev => !prev)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              title={isModalMaximized ? "Restore size" : "Maximize view"}
            >
              {isModalMaximized ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
            <button
              onClick={() => setIsAdminOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              title="Close panel"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Sub-nav Tabs */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#0c1018] px-6 py-2.5">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('list')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'list' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Movie Catalog ({movies.length})
            </button>
            <button
              onClick={() => {
                if (activeTab !== 'add') handleResetForm();
                setActiveTab('add');
              }}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'add' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Plus className="h-3.5 w-3.5" />
              <span>{editingMovieId ? 'Edit Title' : 'Add New Title'}</span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'stats' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              Analytics & Storage
            </button>
            <button
              onClick={() => setActiveTab('publish')}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === 'publish' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cloud className="h-3.5 w-3.5 text-sky-400" />
              <span>Google Cloud & Publish</span>
            </button>
          </div>

          <button
            onClick={resetToDefaults}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-amber-400 transition-colors"
            title="Reset catalog back to initial state"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset Demo DB</span>
          </button>
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4">
          
          {/* Delete Toast Notification */}
          {deleteToast && (
            <div className="rounded-xl border border-rose-500/40 bg-rose-950/40 p-3 text-xs font-semibold text-rose-300 flex items-center justify-between animate-in fade-in duration-200">
              <div className="flex items-center gap-2">
                <Trash2 className="h-4 w-4 text-rose-400" />
                <span>{deleteToast}</span>
              </div>
              <button
                type="button"
                onClick={() => setDeleteToast(null)}
                className="text-xs text-rose-400 hover:text-white"
              >
                Dismiss
              </button>
            </div>
          )}

          {/* TAB 1: LIST VIEW */}
          {activeTab === 'list' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    Showing {movies.filter(m => m.title.toLowerCase().includes(adminSearch.toLowerCase()) || m.category.toLowerCase().includes(adminSearch.toLowerCase())).length} of {movies.length} titles
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={adminSearch}
                    onChange={e => setAdminSearch(e.target.value)}
                    placeholder="Search titles to edit or delete..."
                    className="w-48 sm:w-64 rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
                  />
                  <button
                    onClick={() => {
                      handleResetForm();
                      setActiveTab('add');
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-indigo-500 shrink-0"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Title</span>
                  </button>
                </div>
              </div>

              <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden">
                {movies
                  .filter(m => 
                    !adminSearch.trim() || 
                    m.title.toLowerCase().includes(adminSearch.toLowerCase()) || 
                    m.category.toLowerCase().includes(adminSearch.toLowerCase())
                  )
                  .map(movie => (
                  <div key={movie.id} className="flex items-center justify-between p-3.5 hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        className="h-12 w-9 rounded object-cover bg-slate-950 shrink-0 border border-slate-800"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-white truncate max-w-sm">
                            {movie.title}
                          </h4>
                          {movie.featured && (
                            <span className="rounded bg-amber-500/20 px-1.5 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-500/30">
                              Featured
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <span className="text-indigo-400 font-medium">{movie.category}</span>
                          <span>·</span>
                          <span>{movie.type}</span>
                          <span>·</span>
                          <span className="tabular-nums">{movie.year}</span>
                          <span>·</span>
                          <span className="flex items-center gap-0.5 text-amber-400">
                            <Star className="h-3 w-3 fill-amber-400" />
                            {movie.rating.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-4">
                      <button
                        type="button"
                        onClick={() => startEdit(movie)}
                        className="flex items-center gap-1 h-8 px-2.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-indigo-600 hover:text-white transition-colors text-xs font-medium"
                        title="Edit title details"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setMovieToDelete({
                          id: movie.id,
                          title: movie.title,
                          poster: movie.poster,
                          year: movie.year,
                          category: movie.category
                        })}
                        className="flex items-center gap-1 h-8 px-2.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 text-xs font-semibold transition-all shadow-sm"
                        title={`Delete "${movie.title}" from catalog`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: ADD / EDIT MOVIE FORM */}
          {activeTab === 'add' && (
            <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl mx-auto">
              <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold text-white">
                    {editingMovieId ? 'Update Catalog Title' : 'Add New Title to Database'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Fields are stored and persisted across sessions in browser storage.
                  </p>
                </div>
                {editingMovieId && (
                  <button
                    type="button"
                    onClick={handleResetForm}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Cancel Editing
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Movie / Series Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    placeholder="e.g. Kalki 2898 AD"
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Original Title (Devanagari / Native) */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Native / Original Title
                  </label>
                  <input
                    type="text"
                    value={originalTitle}
                    onChange={e => setOriginalTitle(e.target.value)}
                    placeholder="e.g. कालकी 2898 AD"
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  >
                    {CATEGORY_LIST.filter(c => c !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Type */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Format Type *
                  </label>
                  <select
                    value={type}
                    onChange={e => setType(e.target.value as any)}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Movie">Movie</option>
                    <option value="Web Series">Web Series</option>
                    <option value="TV Series">TV Series</option>
                  </select>
                </div>

                {/* Year & Rating */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Release Year *
                  </label>
                  <input
                    type="number"
                    required
                    min={1920}
                    max={2030}
                    value={year}
                    onChange={e => setYear(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    IMDb Rating (1 - 10) *
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={1}
                    max={10}
                    value={rating}
                    onChange={e => setRating(Number(e.target.value))}
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Runtime & Language */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Runtime
                  </label>
                  <input
                    type="text"
                    value={runtime}
                    onChange={e => setRuntime(e.target.value)}
                    placeholder="e.g. 2h 45m or Season 1 (8 Ep)"
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Audio / Language
                  </label>
                  <input
                    type="text"
                    value={language}
                    onChange={e => setLanguage(e.target.value)}
                    placeholder="e.g. Hindi (Original) + English Sub"
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Director & Cast */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Director
                  </label>
                  <input
                    type="text"
                    value={director}
                    onChange={e => setDirector(e.target.value)}
                    placeholder="e.g. Nag Ashwin"
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Star Cast (comma-separated)
                  </label>
                  <input
                    type="text"
                    value={cast}
                    onChange={e => setCast(e.target.value)}
                    placeholder="e.g. Prabhas, Deepika Padukone, Amitabh Bachchan"
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Poster & Backdrop URLs */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Poster Image URL / Path
                  </label>
                  <input
                    type="text"
                    value={poster}
                    onChange={e => setPoster(e.target.value)}
                    placeholder="/src/assets/images/poster_..."
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Backdrop Banner Image URL / Path
                  </label>
                  <input
                    type="text"
                    value={backdrop}
                    onChange={e => setBackdrop(e.target.value)}
                    placeholder="/src/assets/images/hero_..."
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                {/* Stream URL & Trailer URL */}
                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Primary Direct Stream Video Link (URL) *
                  </label>
                  <input
                    type="text"
                    value={streamUrl}
                    onChange={e => setStreamUrl(e.target.value)}
                    placeholder="https://commondatastorage.googleapis.com/.../movie.mp4"
                    className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                  />
                  <p className="text-[11px] text-slate-500 mt-1">
                    Used for online streaming player and default video connection.
                  </p>
                </div>
              </div>

              {/* Quality Download Links Section */}
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-indigo-500/20 pb-2">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                      <span>Quality-Wise Download Links & Files</span>
                    </h4>
                    <p className="text-[11px] text-indigo-300">
                      Set direct video download links and sizes for each resolution (4K, 1080p, 720p, 480p)
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* 4K */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-indigo-300">4K Ultra HD Download Link:</span>
                      <input
                        type="text"
                        value={size4k}
                        onChange={e => setSize4k(e.target.value)}
                        placeholder="3.5 GB"
                        className="w-20 rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-300 border border-slate-800"
                        title="File size"
                      />
                    </div>
                    <input
                      type="text"
                      value={url4k}
                      onChange={e => setUrl4k(e.target.value)}
                      placeholder="https://.../movie_4k.mp4 (or leave blank to use primary link)"
                      className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-2.5 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* 1080p */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-indigo-300">1080p FHD Download Link:</span>
                      <input
                        type="text"
                        value={size1080p}
                        onChange={e => setSize1080p(e.target.value)}
                        placeholder="1.9 GB"
                        className="w-20 rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-300 border border-slate-800"
                        title="File size"
                      />
                    </div>
                    <input
                      type="text"
                      value={url1080p}
                      onChange={e => setUrl1080p(e.target.value)}
                      placeholder="https://.../movie_1080p.mp4"
                      className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-2.5 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* 720p */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-indigo-300">720p HD Download Link:</span>
                      <input
                        type="text"
                        value={size720p}
                        onChange={e => setSize720p(e.target.value)}
                        placeholder="880 MB"
                        className="w-20 rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-300 border border-slate-800"
                        title="File size"
                      />
                    </div>
                    <input
                      type="text"
                      value={url720p}
                      onChange={e => setUrl720p(e.target.value)}
                      placeholder="https://.../movie_720p.mp4"
                      className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-2.5 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  {/* 480p */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-indigo-300">480p SD Download Link:</span>
                      <input
                        type="text"
                        value={size480p}
                        onChange={e => setSize480p(e.target.value)}
                        placeholder="420 MB"
                        className="w-20 rounded bg-slate-900 px-1.5 py-0.5 text-[10px] text-slate-300 border border-slate-800"
                        title="File size"
                      />
                    </div>
                    <input
                      type="text"
                      value={url480p}
                      onChange={e => setUrl480p(e.target.value)}
                      placeholder="https://.../movie_480p.mp4"
                      className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-2.5 py-1.5 text-xs text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Genre Selector */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                  Select Genres (Multi-select)
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {GENRE_LIST.filter(g => g !== 'All').map(g => (
                    <button
                      type="button"
                      key={g}
                      onClick={() => toggleGenreSelection(g)}
                      className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                        genres.includes(g)
                          ? 'bg-indigo-600 text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Synopsis / Description *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Enter full plot summary and highlights..."
                  className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              {/* Featured checkbox */}
              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={featured}
                  onChange={e => setFeatured(e.target.checked)}
                  className="h-4 w-4 rounded border-slate-700 bg-slate-900 text-indigo-600 focus:ring-0"
                />
                <label htmlFor="featuredToggle" className="text-xs font-medium text-slate-300">
                  Feature in Homepage Hero Carousel Showcase
                </label>
              </div>

              {/* Form buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500 shadow transition-colors"
                  >
                    <Save className="h-4 w-4" />
                    <span>{editingMovieId ? 'Save Title Changes' : 'Create & Publish Title'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('list')}
                    className="rounded-lg bg-slate-800 px-4 py-2.5 text-xs text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                </div>

                {editingMovieId && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setMovieToDelete({
                        id: editingMovieId,
                        title,
                        poster,
                        year,
                        category
                      })}
                      className="flex items-center gap-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/40 px-3.5 py-2 text-xs font-bold transition-all shadow-sm"
                      title="Permanently delete this movie from database"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Delete Movie</span>
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}

          {/* TAB 3: STATS & ANALYTICS */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs text-slate-400">Total Catalog Titles</span>
                  <div className="font-display text-2xl font-bold text-white tabular-nums mt-1">
                    {movies.length}
                  </div>
                  <div className="text-[11px] text-indigo-400 mt-1">
                    {movies.filter(m => m.type === 'Movie').length} Movies · {movies.filter(m => m.type === 'Web Series').length} Series
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs text-slate-400">Hero Featured Highlights</span>
                  <div className="font-display text-2xl font-bold text-amber-400 tabular-nums mt-1">
                    {movies.filter(m => m.featured).length}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Active in main slider showcase
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                  <span className="text-xs text-slate-400">Publisher Entity</span>
                  <div className="font-display text-lg font-bold text-emerald-400 mt-1">
                    Puru Kumar
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Verified Portal Operator
                  </div>
                </div>
              </div>

              {/* Categories Breakdown */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
                <h4 className="font-display text-sm font-bold text-white">
                  Titles Distribution by Industry
                </h4>
                <div className="space-y-2 text-xs">
                  {CATEGORY_LIST.filter(c => c !== 'All').map(cat => {
                    const count = movies.filter(m => m.category === cat).length;
                    const pct = Math.round((count / (movies.length || 1)) * 100);
                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex justify-between text-slate-300">
                          <span>{cat}</span>
                          <span className="tabular-nums font-semibold">{count} titles ({pct}%)</span>
                        </div>
                        <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: GOOGLE CLOUD & PUBLISH DASHBOARD */}
          {activeTab === 'publish' && (
            <div className="space-y-6 animate-in fade-in">
              {/* Cloud Status Banner */}
              <div className="rounded-2xl border border-sky-500/30 bg-gradient-to-r from-sky-950/40 via-indigo-950/30 to-[#0d121c] p-5 sm:p-6 shadow-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/40 shadow-inner">
                      <Cloud className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                          Active & Live on Google Cloud Run
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mt-0.5">
                        CineVault Production Service
                      </h3>
                      <p className="text-xs text-slate-300">
                        Hosted on Google Cloud Run container infrastructure in region <code className="text-sky-300">asia-east1</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="https://ais-pre-4cdvxw64h635x5ltik52ek-439247631676.asia-east1.run.app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-sky-950/40 transition-all active:scale-95"
                    >
                      <Globe className="h-4 w-4" />
                      <span>Open Live Website</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                    </a>

                    <a
                      href="https://console.cloud.google.com/run?project=439247631676"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors"
                    >
                      <Server className="h-4 w-4 text-sky-400" />
                      <span>Google Cloud Console</span>
                      <ExternalLink className="h-3.5 w-3.5 opacity-70" />
                    </a>
                  </div>
                </div>

                {/* Production URL copy box */}
                <div className="mt-5 rounded-xl bg-slate-950/80 border border-slate-800 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-0.5">
                      Production Public Google URL
                    </span>
                    <span className="font-mono text-xs text-sky-300 break-all select-all">
                      https://ais-pre-4cdvxw64h635x5ltik52ek-439247631676.asia-east1.run.app
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText('https://ais-pre-4cdvxw64h635x5ltik52ek-439247631676.asia-east1.run.app');
                      setCopiedCloudUrl(true);
                      setTimeout(() => setCopiedCloudUrl(false), 3000);
                    }}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-sky-600/30 hover:bg-sky-600 border border-sky-500/40 px-3.5 py-1.5 text-xs font-semibold text-sky-200 hover:text-white transition-all shrink-0"
                  >
                    {copiedCloudUrl ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Public Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Infrastructure Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
                  <span className="text-xs text-slate-400">Google Cloud Project ID</span>
                  <div className="font-mono text-sm font-bold text-white">439247631676</div>
                  <div className="text-[11px] text-slate-400">Default AI Studio Cloud Project</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
                  <span className="text-xs text-slate-400">Hosting Engine</span>
                  <div className="text-sm font-bold text-sky-400">Google Cloud Run</div>
                  <div className="text-[11px] text-slate-400">Auto-scaling Node.js & Vite Container</div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-1">
                  <span className="text-xs text-slate-400">Publisher Identity</span>
                  <div className="text-sm font-bold text-emerald-400">Puru Kumar</div>
                  <div className="text-[11px] text-slate-400">purukumar67893@gmail.com</div>
                </div>
              </div>

              {/* How to Manage in Google Cloud Console */}
              <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
                <h4 className="font-display text-sm font-bold text-white flex items-center gap-2">
                  <Server className="h-4 w-4 text-sky-400" />
                  <span>How to Publish and Manage in Google Cloud Console</span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="rounded-lg bg-slate-950/70 p-3.5 border border-slate-800/80 space-y-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600/30 text-indigo-400 text-[11px] font-bold">1</span>
                    <h5 className="font-semibold text-white">Share from AI Studio</h5>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Click the <strong>Share</strong> button in the top-right corner of Google AI Studio to set access permissions or share directly with anyone.
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-950/70 p-3.5 border border-slate-800/80 space-y-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600/30 text-indigo-400 text-[11px] font-bold">2</span>
                    <h5 className="font-semibold text-white">Google Cloud Console Access</h5>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      Open <a href="https://console.cloud.google.com/run?project=439247631676" target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">console.cloud.google.com</a> to view service metrics, CPU/memory scaling, and request logs.
                    </p>
                  </div>

                  <div className="rounded-lg bg-slate-950/70 p-3.5 border border-slate-800/80 space-y-1.5">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600/30 text-indigo-400 text-[11px] font-bold">3</span>
                    <h5 className="font-semibold text-white">Custom Domain Setup</h5>
                    <p className="text-slate-400 leading-relaxed text-[11px]">
                      In Google Cloud Console, navigate to <strong>Cloud Run &gt; Manage Custom Domains</strong> to connect your own domain (e.g. <code>cinevault.com</code>) with free Google-managed SSL.
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400">
                    Need direct Cloud Console overview?
                  </span>
                  <a
                    href="https://console.cloud.google.com/?project=439247631676"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300 font-semibold"
                  >
                    <span>Open Google Cloud Console Home</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="border-t border-slate-800 bg-[#090d15] px-6 py-3 flex items-center justify-between text-xs text-slate-400">
          <span>Logged in as: <strong className="text-white">{user?.name || 'Administrator'}</strong></span>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="rounded-lg bg-slate-800 px-4 py-1.5 text-xs text-slate-200 hover:bg-slate-700"
          >
            Done
          </button>
        </div>

        {/* High-Visibility Confirmation Modal Dialog for Delete */}
        {movieToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4 animate-in fade-in duration-150">
            <div 
              className="w-full max-w-md rounded-2xl border border-rose-500/50 bg-[#0d121c] p-6 shadow-2xl space-y-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-600/20 text-rose-400 border border-rose-500/40">
                  <Trash2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-base font-bold text-white">Delete Title from Website?</h3>
                  <p className="text-xs text-rose-300 font-medium">This cannot be undone.</p>
                </div>
              </div>

              <div className="flex items-center gap-3.5 rounded-xl bg-slate-900/90 p-3.5 border border-slate-800">
                {movieToDelete.poster ? (
                  <img src={movieToDelete.poster} alt={movieToDelete.title} className="h-16 w-12 rounded object-cover border border-slate-700 shrink-0 bg-slate-950" />
                ) : (
                  <div className="h-16 w-12 rounded bg-slate-800 flex items-center justify-center text-slate-500">
                    <Film className="h-5 w-5" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-white text-sm truncate">{movieToDelete.title}</h4>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {movieToDelete.year || 2025} · {movieToDelete.category || 'Movie'}
                  </div>
                  <p className="text-[11px] text-rose-400 mt-1 font-medium">
                    Will be permanently removed from catalog, streams & downloads.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setMovieToDelete(null)}
                  className="rounded-lg bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteMovie(movieToDelete.id, movieToDelete.title)}
                  className="flex items-center gap-2 rounded-lg bg-rose-600 hover:bg-rose-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-rose-950/50 transition-colors active:scale-95"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Yes, Delete Movie</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
