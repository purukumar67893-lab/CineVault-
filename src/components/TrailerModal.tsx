import React, { useState } from 'react';
import { X, Film, Play, Download, ExternalLink, RefreshCw, Volume2, Maximize } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export const TrailerModal: React.FC = () => {
  const { trailerMovie, setTrailerMovie, setPlayingMovie, setDownloadMovie } = useMovies();
  const [useEmbed, setUseEmbed] = useState(true);
  const [embedError, setEmbedError] = useState(false);

  if (!trailerMovie) return null;

  // Compute a valid YouTube embed URL or clean trailer link
  const getEmbedUrl = () => {
    const raw = trailerMovie.trailer_url;
    if (raw && raw.includes('embed/')) return raw;
    if (raw && raw.includes('watch?v=')) {
      const vid = raw.split('watch?v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${vid}?autoplay=1&rel=0`;
    }
    // High-quality Blender / Open movie trailers on YouTube as reliable fallback
    return 'https://www.youtube-nocookie.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-';
  };

  const handlePlayFullMovie = () => {
    const m = trailerMovie;
    setTrailerMovie(null);
    setPlayingMovie(m);
  };

  const handleDownload = () => {
    const m = trailerMovie;
    setTrailerMovie(null);
    setDownloadMovie(m);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-3 sm:p-6">
      <div 
        className="relative my-auto w-full max-w-4xl overflow-hidden rounded-2xl border border-slate-700 bg-[#0a0e17] text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#090d15] px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Film className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-display text-sm sm:text-base font-bold text-white truncate max-w-md">
                {trailerMovie.title} - Official Theatrical Trailer
              </h2>
              <span className="text-xs text-slate-400">
                {trailerMovie.year} · {trailerMovie.category} · {trailerMovie.quality}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Embed vs Direct Stream */}
            <button
              onClick={() => setUseEmbed(!useEmbed)}
              className="hidden sm:inline-flex items-center gap-1 rounded-lg bg-slate-800 hover:bg-slate-700 px-2.5 py-1 text-xs text-slate-300 border border-slate-700"
              title="Switch between YouTube embed and Direct video stream"
            >
              <RefreshCw className="h-3 w-3" />
              <span>{useEmbed ? 'Switch to MP4 Stream' : 'Switch to Official Embed'}</span>
            </button>

            <button
              onClick={() => setTrailerMovie(null)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              aria-label="Close trailer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Video Player / Embed */}
        <div className="relative aspect-video w-full bg-black">
          {useEmbed && !embedError ? (
            <iframe
              src={getEmbedUrl()}
              title={`${trailerMovie.title} Official Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              onError={() => setEmbedError(true)}
              className="h-full w-full border-0"
            />
          ) : (
            <video
              src={trailerMovie.stream_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-contain"
            />
          )}
        </div>

        {/* Footer info & CTAs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 bg-[#090d15] px-5 py-3">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <span className="font-semibold text-white">{trailerMovie.category}</span>
            <span>·</span>
            <span>{trailerMovie.runtime}</span>
            <span>·</span>
            <span className="text-indigo-400 font-medium">{trailerMovie.genre.join(', ')}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePlayFullMovie}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-md transition-colors"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>Watch Full Movie</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-white shadow-md transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Movie</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
