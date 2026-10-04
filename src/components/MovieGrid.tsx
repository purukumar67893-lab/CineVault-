import React from 'react';
import { Film } from 'lucide-react';
import { Movie } from '../types/movie';
import { MovieCard } from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  countLabel?: string;
  onClearFilters?: () => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ 
  movies, 
  title, 
  countLabel,
  onClearFilters 
}) => {
  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800/80 border border-slate-700/60 text-slate-400 mb-4">
          <Film className="h-8 w-8 text-indigo-400/60" />
        </div>
        <h3 className="font-display text-lg font-bold text-white">No Movies or Series Found</h3>
        <p className="mt-1 text-sm text-slate-400 max-w-md">
          We couldn't find any titles matching your current filter or search criteria.
        </p>
        {onClearFilters && (
          <button
            onClick={onClearFilters}
            className="mt-5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
          >
            Clear All Filters & Show Everything
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full">
      {(title || countLabel) && (
        <div className="flex items-center justify-between mb-4 px-1">
          {title && (
            <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white">
              {title}
            </h2>
          )}
          {countLabel && (
            <span className="text-xs text-slate-400 font-medium tabular-nums">
              {countLabel}
            </span>
          )}
        </div>
      )}

      {/* Grid: 2 cols on mobile, 3-4 on tablet, 5-7 on desktop / large displays */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3 sm:gap-4">
        {movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
