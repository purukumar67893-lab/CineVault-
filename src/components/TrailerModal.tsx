import React from 'react';
import { X, Film, Play, Download } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export const TrailerModal: React.FC = () => {
  const { trailerMovie, setTrailerMovie, setPlayingMovie, setDownloadMovie } = useMovies();

  if (!trailerMovie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6">
      <div 
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0a0e17] text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#090d15] px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Film className="h-4 w-4 text-purple-400" />
            <h2 className="font-display text-sm sm:text-base font-bold text-white truncate max-w-md">
              {trailerMovie.title} - Official Theatrical Trailer
            </h2>
          </div>

          <button
            onClick={() => setTrailerMovie(null)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            aria-label="Close trailer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Video Player / Embed */}
        <div className="relative aspect-video w-full bg-black">
          {trailerMovie.stream_url ? (
            <video
              src={trailerMovie.stream_url}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          ) : (
            <iframe
              src={trailerMovie.trailer_url}
              title={`${trailerMovie.title} Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full border-0"
            />
          )}
        </div>

        {/* Footer info & CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-[#090d15] px-5 py-3">
          <div className="text-xs text-slate-400">
            <span className="font-semibold text-white">{trailerMovie.category}</span> · {trailerMovie.year} · {trailerMovie.runtime}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const m = trailerMovie;
                setTrailerMovie(null);
                setPlayingMovie(m);
              }}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-indigo-500 transition-colors"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>Watch Full Movie</span>
            </button>
            <button
              onClick={() => {
                const m = trailerMovie;
                setTrailerMovie(null);
                setDownloadMovie(m);
              }}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-500 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
