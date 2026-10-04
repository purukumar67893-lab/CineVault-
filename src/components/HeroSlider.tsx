import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Film, 
  Info, 
  Download, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Globe
} from 'lucide-react';
import { Movie } from '../types/movie';
import { useMovies } from '../context/MovieContext';

export const HeroSlider: React.FC = () => {
  const { movies, setActiveMovie, setPlayingMovie, setTrailerMovie, setDownloadMovie, markAsViewed } = useMovies();
  
  // Pick top featured movies
  const featuredMovies = movies.filter(m => m.featured).slice(0, 5);
  const slides = featuredMovies.length > 0 ? featuredMovies : movies.slice(0, 5);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isHovered, slides.length]);

  if (slides.length === 0) return null;

  const current = slides[currentIndex];

  const handleWatch = (movie: Movie) => {
    markAsViewed(movie.id);
    setPlayingMovie(movie);
  };

  const handleTrailer = (movie: Movie) => {
    setTrailerMovie(movie);
  };

  const handleDetails = (movie: Movie) => {
    markAsViewed(movie.id);
    setActiveMovie(movie);
  };

  const handleDownload = (movie: Movie) => {
    setDownloadMovie(movie);
  };

  return (
    <div 
      className="relative w-full overflow-hidden bg-[#07090e] border-b border-slate-800/80"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic 16:9 Backdrop Container */}
      <div className="relative h-[480px] sm:h-[540px] md:h-[600px] lg:h-[640px] w-full">
        {/* Backdrop Image with Multi-layer Scrim */}
        <img
          src={current.backdrop}
          alt={current.title}
          referrerPolicy="no-referrer"
          className="absolute inset-0 h-full w-full object-cover object-center transition-all duration-700 ease-out scale-105"
        />

        {/* Cinematic Gradient Scrims (Bottom, Left, and Radial Vignette) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080b11] via-[#080b11]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080b11] via-[#080b11]/80 to-transparent lg:w-3/4" />
        <div className="absolute inset-0 bg-radial-[at_top_right] from-transparent via-[#080b11]/40 to-[#080b11]/90" />

        {/* Content Container */}
        <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-6 lg:gap-10 w-full pt-10 sm:pt-6">
            
            {/* Left Column: Movie Info & CTAs */}
            <div className="flex-1 max-w-2xl text-left space-y-4">
              
              {/* Category & Quality Tag line */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-300">
                <span className="rounded bg-indigo-600/90 px-2 py-0.5 font-bold uppercase tracking-wider text-white text-[11px]">
                  {current.category}
                </span>
                <span className="rounded bg-slate-800/90 px-2 py-0.5 font-semibold text-indigo-300 border border-slate-700/80 text-[11px]">
                  {current.quality}
                </span>
                <span className="text-slate-400">·</span>
                <span className="flex items-center gap-1 font-semibold text-amber-400">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="tabular-nums text-white">{current.rating.toFixed(1)}</span>
                  <span className="text-slate-400 text-[11px]">({current.votesCount || '25k'})</span>
                </span>
              </div>

              {/* Movie Title */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight line-clamp-2">
                {current.title}
              </h1>

              {/* Metadata Unboxed Text (Zero-Pill discipline) */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-300">
                <span className="font-medium text-slate-200">{current.year}</span>
                <span className="text-slate-500">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-slate-400" />
                  <span>{current.runtime}</span>
                </span>
                <span className="text-slate-500">·</span>
                <span>{current.genre.join(', ')}</span>
                <span className="text-slate-500">·</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Globe className="h-3.5 w-3.5 text-slate-400" />
                  <span>{current.language}</span>
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-slate-300/90 leading-relaxed line-clamp-3 sm:line-clamp-3 max-w-xl">
                {current.description}
              </p>

              {/* Action Buttons Row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleWatch(current)}
                  className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 active:scale-95 transition-all"
                >
                  <Play className="h-4 w-4 fill-white" />
                  <span>Watch Now</span>
                </button>

                <button
                  onClick={() => handleTrailer(current)}
                  className="flex items-center gap-2 rounded-lg bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-700 hover:text-white active:scale-95 transition-all"
                >
                  <Film className="h-4 w-4 text-purple-400" />
                  <span>Trailer</span>
                </button>

                <button
                  onClick={() => handleDownload(current)}
                  className="flex items-center gap-2 rounded-lg bg-slate-800/90 border border-slate-700/80 px-4 py-2.5 text-sm font-medium text-slate-200 hover:bg-emerald-950/60 hover:text-emerald-300 hover:border-emerald-500/50 active:scale-95 transition-all"
                  title="Download in 4K, 1080p, 720p"
                >
                  <Download className="h-4 w-4 text-emerald-400" />
                  <span>Download</span>
                </button>

                <button
                  onClick={() => handleDetails(current)}
                  className="flex items-center gap-1.5 rounded-lg bg-transparent px-3 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
                >
                  <Info className="h-4 w-4" />
                  <span>More Details</span>
                </button>
              </div>

            </div>

            {/* Right Column: Hero Poster Spotlight (Hidden on small mobile, visible on sm+) */}
            <div className="hidden sm:block shrink-0">
              <div 
                onClick={() => handleDetails(current)}
                className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-700/80 shadow-2xl shadow-black/80 transition-transform duration-300 hover:scale-105 w-44 md:w-52 lg:w-60"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-slate-800">
                  <img
                    src={current.poster}
                    alt={current.title}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-xs font-medium text-white flex items-center gap-1">
                      <Play className="h-3.5 w-3.5 fill-white" /> Quick Preview
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1))}
          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10 hover:bg-black/80 transition-all z-20"
          aria-label="Previous Featured Movie"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={() => setCurrentIndex(prev => (prev + 1) % slides.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm border border-white/10 hover:bg-black/80 transition-all z-20"
          aria-label="Next Featured Movie"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Carousel Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentIndex ? 'w-8 bg-indigo-500' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
