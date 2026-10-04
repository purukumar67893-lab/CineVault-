import React, { useState } from 'react';
import { 
  Play, 
  Download, 
  Star, 
  Bookmark, 
  Heart, 
  Clock 
} from 'lucide-react';
import { Movie } from '../types/movie';
import { useMovies } from '../context/MovieContext';

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const { 
    setActiveMovie, 
    setPlayingMovie, 
    setDownloadMovie, 
    toggleWatchlist, 
    toggleFavorite, 
    watchlist, 
    favorites, 
    markAsViewed 
  } = useMovies();

  const [imgError, setImgError] = useState(false);
  const isBookmarked = watchlist.includes(movie.id);
  const isFavorited = favorites.includes(movie.id);

  const handleClick = () => {
    markAsViewed(movie.id);
    setActiveMovie(movie);
  };

  const handlePlayDirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    markAsViewed(movie.id);
    setPlayingMovie(movie);
  };

  const handleDownloadDirect = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDownloadMovie(movie);
  };

  const handleToggleWatchlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchlist(movie.id);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(movie.id);
  };

  return (
    <div 
      onClick={handleClick}
      className="group relative flex flex-col cursor-pointer overflow-hidden rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-indigo-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-950/20 active:scale-[0.98]"
    >
      {/* Poster Image Container with 3:4 Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-950">
        {!imgError ? (
          <img
            src={movie.poster}
            alt={movie.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-950 p-4 text-center">
            <span className="font-display text-sm font-bold text-slate-300">{movie.title}</span>
            <span className="mt-1 text-xs text-indigo-400">{movie.category}</span>
          </div>
        )}

        {/* Top Badges: Quality on Left, Rating on Right */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
          <span className="rounded bg-black/80 backdrop-blur-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-300 border border-indigo-500/30">
            {movie.quality}
          </span>
          <span className="flex items-center gap-0.5 rounded bg-black/80 backdrop-blur-md px-1.5 py-0.5 text-[10px] font-bold text-amber-400 border border-amber-400/20">
            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
            <span className="tabular-nums text-slate-100">{movie.rating.toFixed(1)}</span>
          </span>
        </div>

        {/* Dark Vignette Overlay on Hover with Quick Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <button
              onClick={handlePlayDirect}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-500 transition-transform active:scale-95"
              title="Watch Stream"
            >
              <Play className="h-4 w-4 fill-white ml-0.5" />
            </button>
            <button
              onClick={handleDownloadDirect}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 transition-transform active:scale-95"
              title="Download Links"
            >
              <Download className="h-4 w-4" />
            </button>
            <button
              onClick={handleToggleWatchlist}
              className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md border border-white/20 transition-colors ${
                isBookmarked ? 'bg-indigo-600 text-white' : 'bg-black/60 text-slate-200 hover:text-white'
              }`}
              title={isBookmarked ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-md border border-white/20 transition-colors ${
                isFavorited ? 'bg-rose-600 text-white' : 'bg-black/60 text-slate-200 hover:text-white'
              }`}
              title={isFavorited ? 'Remove from Favorites' : 'Add to Favorites'}
            >
              <Heart className={`h-3.5 w-3.5 ${isFavorited ? 'fill-white' : ''}`} />
            </button>
          </div>
          <div className="text-center text-[11px] text-slate-300 flex items-center justify-center gap-1">
            <Clock className="h-3 w-3 text-slate-400" />
            <span>{movie.runtime}</span>
          </div>
        </div>
      </div>

      {/* Movie Details Under Poster */}
      <div className="flex flex-col p-2.5 sm:p-3 text-left flex-1 justify-between gap-1.5">
        <div>
          {/* Title */}
          <h3 
            className="text-xs sm:text-sm font-semibold text-slate-100 line-clamp-1 group-hover:text-indigo-300 transition-colors"
            title={movie.title}
          >
            {movie.title}
          </h3>

          {/* Unboxed Metadata (Zero-Pill Discipline) */}
          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-slate-400">
            <span className="font-medium text-slate-300 tabular-nums">{movie.year}</span>
            <span className="text-slate-600">·</span>
            <span className="truncate max-w-[90px] sm:max-w-[110px] text-slate-300">{movie.language.split(' ')[0]}</span>
            <span className="text-slate-600">·</span>
            <span className="text-indigo-400/90">{movie.genre[0]}</span>
          </div>
        </div>

        {/* Mobile-visible quick action bar */}
        <div className="flex sm:hidden items-center justify-between pt-1 border-t border-slate-800/80 text-[10px] text-slate-400">
          <span className="truncate text-indigo-400 font-medium">{movie.category}</span>
          <div className="flex items-center gap-2">
            <button onClick={handleDownloadDirect} className="p-1 text-emerald-400 hover:text-emerald-300">
              <Download className="h-3.5 w-3.5" />
            </button>
            <button onClick={handlePlayDirect} className="p-1 text-indigo-400 hover:text-indigo-300">
              <Play className="h-3.5 w-3.5 fill-indigo-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
