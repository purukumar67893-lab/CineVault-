import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Film, 
  Download, 
  Star, 
  Bookmark, 
  Heart, 
  Clock, 
  Calendar,
  Share2,
  Maximize,
  Minimize,
  Copy,
  Check,
  Zap
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

export const MovieDetailsModal: React.FC = () => {
  const { 
    activeMovie, 
    setActiveMovie, 
    setPlayingMovie, 
    setTrailerMovie, 
    setDownloadMovie,
    movies,
    watchlist,
    favorites,
    toggleWatchlist,
    toggleFavorite,
    markAsViewed
  } = useMovies();

  const [isMaximized, setIsMaximized] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!activeMovie) return null;

  const isBookmarked = watchlist.includes(activeMovie.id);
  const isFavorited = favorites.includes(activeMovie.id);

  // Similar movies: same category or matching genre
  const similarMovies = movies.filter(m => 
    m.id !== activeMovie.id && 
    (m.category === activeMovie.category || m.genre.some(g => activeMovie.genre.includes(g)))
  ).slice(0, 6);

  const handleWatch = () => {
    markAsViewed(activeMovie.id);
    setPlayingMovie(activeMovie);
  };

  const handleTrailer = () => {
    setTrailerMovie(activeMovie);
  };

  const handleDownload = () => {
    setDownloadMovie(activeMovie);
  };

  const handleQuickQualityDownload = (quality: string) => {
    const opt = activeMovie.downloads?.find(d => d.resolution.includes(quality));
    const url = opt?.directUrl || opt?.servers[0]?.url || activeMovie.stream_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeMovie.title.replace(/\s+/g, '_')}_${quality}.mp4`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyLink = () => {
    const link = activeMovie.stream_url || window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 backdrop-blur-md ${
      isMaximized ? 'p-0' : 'p-2 sm:p-4 lg:p-6'
    }`}>
      <div 
        className={`relative my-auto flex flex-col overflow-hidden border border-slate-800 bg-[#0a0e17] text-white shadow-2xl transition-all duration-300 ${
          isMaximized 
            ? 'h-screen w-screen rounded-none' 
            : 'w-full max-w-4xl rounded-2xl'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Top Control Buttons: Maximize + Close */}
        <div className="absolute right-4 top-4 z-30 flex items-center gap-2">
          <button
            onClick={() => setIsMaximized(prev => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 hover:bg-black/90 transition-colors"
            title={isMaximized ? "Restore default view" : "Maximize theater view"}
          >
            {isMaximized ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setActiveMovie(null)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/20 hover:bg-black/90 transition-colors"
            aria-label="Close Movie Details"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Hero Backdrop Banner */}
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden shrink-0">
          <img
            src={activeMovie.backdrop}
            alt={activeMovie.title}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17] via-transparent to-[#0a0e17]/60" />

          {/* Floating Watch stream CTA in banner */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
            <div className="hidden sm:block">
              <span className="rounded bg-indigo-600 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-white">
                {activeMovie.category}
              </span>
              <span className="ml-2 rounded bg-slate-900/80 px-2 py-0.5 text-xs font-bold text-indigo-300 border border-slate-700">
                {activeMovie.quality}
              </span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleWatch}
                className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xl hover:bg-indigo-500 active:scale-95 transition-all"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>Watch Stream (Maximize)</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xl hover:bg-emerald-500 active:scale-95 transition-all"
              >
                <Download className="h-4 w-4" />
                <span>Download Center</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-8 space-y-6">
          
          {/* Main Info Row: Poster + Specs */}
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            
            {/* Poster Card */}
            <div className="w-36 sm:w-48 lg:w-56 shrink-0 -mt-16 sm:-mt-24 relative z-20 rounded-xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-900">
              <img
                src={activeMovie.poster}
                alt={activeMovie.title}
                referrerPolicy="no-referrer"
                className="w-full object-cover aspect-[3/4]"
              />
            </div>

            {/* Title & Metadata */}
            <div className="flex-1 space-y-3">
              <div>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                  {activeMovie.title}
                </h1>
                {activeMovie.originalTitle && (
                  <p className="text-sm font-medium text-indigo-400 mt-0.5">
                    {activeMovie.originalTitle}
                  </p>
                )}
              </div>

              {/* Zero-Pill Unboxed Metadata with · separator */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-300">
                <span className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="h-4 w-4 fill-amber-400" />
                  <span className="tabular-nums text-white text-sm">{activeMovie.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-xs">/ 10</span>
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1 font-medium">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>{activeMovie.year}</span>
                </span>
                <span className="text-slate-600">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{activeMovie.runtime}</span>
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-indigo-300 font-medium">{activeMovie.type}</span>
              </div>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  onClick={handleWatch}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md hover:bg-indigo-500 transition-colors"
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>Play Movie</span>
                </button>

                <button
                  onClick={handleTrailer}
                  className="flex items-center gap-2 rounded-lg bg-slate-800 px-3.5 py-2 text-xs sm:text-sm font-medium text-slate-200 border border-slate-700 hover:bg-slate-700 transition-colors"
                >
                  <Film className="h-4 w-4 text-purple-400" />
                  <span>Trailer</span>
                </button>

                <button
                  onClick={handleDownload}
                  className="flex items-center gap-2 rounded-lg bg-emerald-950/70 border border-emerald-500/40 px-3.5 py-2 text-xs sm:text-sm font-semibold text-emerald-300 hover:bg-emerald-900/80 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  <span>Download Links</span>
                </button>

                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700 transition-colors"
                  title="Copy video stream URL"
                >
                  {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copiedLink ? 'Link Copied' : 'Link to Video'}</span>
                </button>

                <button
                  onClick={() => toggleWatchlist(activeMovie.id)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    isBookmarked 
                      ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/60' 
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title={isBookmarked ? 'In Watchlist' : 'Add to Watchlist'}
                >
                  <Bookmark className="h-3.5 w-3.5" />
                  <span>{isBookmarked ? 'Saved' : 'Watchlist'}</span>
                </button>

                <button
                  onClick={() => toggleFavorite(activeMovie.id)}
                  className={`flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    isFavorited 
                      ? 'bg-rose-600/30 text-rose-300 border-rose-500/60' 
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title={isFavorited ? 'In Favorites' : 'Add to Favorites'}
                >
                  <Heart className={`h-3.5 w-3.5 ${isFavorited ? 'fill-rose-400' : ''}`} />
                  <span>{isFavorited ? 'Favorited' : 'Favorite'}</span>
                </button>
              </div>

              {/* Direct Quality Download Quick Bar */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-emerald-400" />
                    Instant Download by Quality
                  </span>
                  <span className="text-[10px] text-slate-500">Click to start immediate file download</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {['4K', '1080p', '720p', '480p'].map(q => (
                    <button
                      key={q}
                      onClick={() => handleQuickQualityDownload(q)}
                      className="flex items-center gap-1 rounded bg-slate-900 hover:bg-emerald-950/60 text-slate-300 hover:text-emerald-300 border border-slate-800 hover:border-emerald-500/40 px-2.5 py-1 text-xs font-bold transition-all"
                    >
                      <Download className="h-3 w-3 text-emerald-400" />
                      <span>{q} Direct</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Synopsis */}
              <div className="pt-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">
                  Synopsis
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activeMovie.description}
                </p>
              </div>

            </div>

          </div>

          {/* Details Table: Director, Cast, Languages, Genres */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 font-medium block">Director:</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">{activeMovie.director}</span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">Lead Cast:</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">{activeMovie.cast.join(', ')}</span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">Audio & Languages:</span>
              <span className="text-slate-200 font-semibold mt-0.5 block">{activeMovie.language}</span>
            </div>

            <div>
              <span className="text-slate-400 font-medium block">Genres:</span>
              <span className="text-indigo-300 font-semibold mt-0.5 block">{activeMovie.genre.join(', ')}</span>
            </div>
          </div>

          {/* Verified Downloads Summary Banner */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-indigo-950/40 border border-emerald-500/30">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                <Download className="h-4 w-4 text-emerald-400" />
                Download Options Available (4K, 1080p, 720p, 480p)
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Multi-audio tracks, English subtitles included. Fast direct Cloud CDN mirrors.
              </p>
            </div>
            <button
              onClick={handleDownload}
              className="shrink-0 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 transition-colors"
            >
              Open Download Center
            </button>
          </div>

          {/* Similar Recommended Titles */}
          {similarMovies.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <h3 className="font-display text-base font-bold text-white mb-3">
                You May Also Like
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {similarMovies.map(sim => (
                  <MovieCard key={sim.id} movie={sim} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
