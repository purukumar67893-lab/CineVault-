import React from 'react';
import { 
  Filter, 
  RotateCcw, 
  Check, 
  ArrowUpDown 
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { 
  CATEGORY_LIST, 
  GENRE_LIST, 
  LANGUAGE_LIST, 
  YEAR_LIST 
} from '../data/initialMovies';

interface FilterBarProps {
  isOpen: boolean;
  onClose?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ isOpen, onClose }) => {
  const { filters, setFilter, resetFilters } = useMovies();

  if (!isOpen) return null;

  return (
    <div className="w-full bg-[#0c1017] border-y border-slate-800/80 px-4 sm:px-6 lg:px-8 py-5 transition-all">
      <div className="mx-auto max-w-7xl space-y-4">
        
        {/* Header & Reset */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-indigo-400" />
            <span className="font-display text-sm font-bold text-white uppercase tracking-wider">
              Catalog Filters
            </span>
          </div>

          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 px-2.5 py-1 text-xs text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60 transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Reset All</span>
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          
          {/* 1. Category / Industry */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Industry / Section
            </label>
            <select
              value={filters.category}
              onChange={e => setFilter({ category: e.target.value })}
              aria-label="Filter by Industry or Section"
              className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              {CATEGORY_LIST.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 2. Format / Type */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Type
            </label>
            <select
              value={filters.type}
              onChange={e => setFilter({ type: e.target.value })}
              aria-label="Filter by Type"
              className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              <option value="All">All Types</option>
              <option value="Movie">Movies</option>
              <option value="Web Series">Web Series</option>
            </select>
          </div>

          {/* 3. Genre */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Genre
            </label>
            <select
              value={filters.genre}
              onChange={e => setFilter({ genre: e.target.value })}
              aria-label="Filter by Genre"
              className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              {GENRE_LIST.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          {/* 4. Language */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Language / Audio
            </label>
            <select
              value={filters.language}
              onChange={e => setFilter({ language: e.target.value })}
              aria-label="Filter by Language or Audio"
              className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              {LANGUAGE_LIST.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>

          {/* 5. Year */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Release Year
            </label>
            <select
              value={filters.year}
              onChange={e => setFilter({ year: e.target.value })}
              aria-label="Filter by Release Year"
              className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-slate-200 focus:border-indigo-500 focus:outline-none"
            >
              {YEAR_LIST.map(yr => (
                <option key={yr} value={yr}>{yr}</option>
              ))}
            </select>
          </div>

        </div>

        {/* Sorting Segmented Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <ArrowUpDown className="h-3.5 w-3.5 text-slate-400" />
            <span className="font-semibold text-slate-300">Sort By:</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'latest', label: 'Latest Added' },
              { id: 'rating', label: 'Highest Rating' },
              { id: 'popular', label: 'Most Popular' },
              { id: 'title', label: 'A-Z Alphabetical' }
            ].map(sortOption => (
              <button
                key={sortOption.id}
                onClick={() => setFilter({ sortBy: sortOption.id as any })}
                className={`flex items-center gap-1 rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                  filters.sortBy === sortOption.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {filters.sortBy === sortOption.id && <Check className="h-3 w-3" />}
                <span>{sortOption.label}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
