import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Download, 
  Link as LinkIcon, 
  Maximize, 
  Sparkles, 
  Film, 
  Check, 
  HardDrive 
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export const CustomLinkModal: React.FC = () => {
  const { isCustomLinkModalOpen, setIsCustomLinkModalOpen, playCustomVideoLink } = useMovies();
  
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [selectedQuality, setSelectedQuality] = useState<'4K Ultra HD' | '1080p FHD' | '720p HD' | '480p SD'>('1080p FHD');
  const [isStartingDownload, setIsStartingDownload] = useState(false);

  if (!isCustomLinkModalOpen) return null;

  const handleStreamNow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoUrl.trim()) return;
    playCustomVideoLink(videoUrl.trim(), videoTitle.trim() || undefined);
    setIsCustomLinkModalOpen(false);
  };

  const handleDownloadNow = () => {
    if (!videoUrl.trim()) return;
    setIsStartingDownload(true);
    
    setTimeout(() => {
      const a = document.createElement('a');
      a.href = videoUrl.trim();
      const safeTitle = (videoTitle.trim() || 'Custom_Video').replace(/\s+/g, '_');
      a.download = `${safeTitle}_${selectedQuality.replace(/\s+/g, '_')}.mp4`;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setIsStartingDownload(false);
      setIsCustomLinkModalOpen(false);
    }, 500);
  };

  const handleLoadSample = (url: string, title: string, quality: any) => {
    setVideoUrl(url);
    setVideoTitle(title);
    setSelectedQuality(quality);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div 
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-700 bg-[#0d121c] p-6 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <LinkIcon className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-white">
                Connect Direct Video Link
              </h2>
              <p className="text-xs text-slate-400">
                Stream or download any direct MP4 / WebM / video URL in your desired quality
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCustomLinkModalOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleStreamNow} className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Direct Video Stream Link (URL) *
            </label>
            <div className="relative">
              <input
                type="url"
                required
                value={videoUrl}
                onChange={e => setVideoUrl(e.target.value)}
                placeholder="https://example.com/movie_stream.mp4"
                className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Supports direct video formats (.mp4, .webm, HLS streams, direct CDN links)
            </p>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Video Title (Optional)
            </label>
            <input
              type="text"
              value={videoTitle}
              onChange={e => setVideoTitle(e.target.value)}
              placeholder="e.g. My Connected Video Stream"
              className="w-full rounded-lg bg-slate-900 border border-slate-700/80 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
            />
          </div>

          {/* Quality Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Select Desired Quality
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: '4K Ultra HD', label: '4K UHD' },
                { id: '1080p FHD', label: '1080p FHD' },
                { id: '720p HD', label: '720p HD' },
                { id: '480p SD', label: '480p SD' }
              ].map(q => (
                <button
                  type="button"
                  key={q.id}
                  onClick={() => setSelectedQuality(q.id as any)}
                  className={`flex items-center justify-center gap-1 rounded-lg py-2 text-xs font-semibold border transition-all ${
                    selectedQuality === q.id
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  {selectedQuality === q.id && <Check className="h-3 w-3" />}
                  <span>{q.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dual Action Buttons: Stream (Maximize) vs Direct Download */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 text-xs font-bold text-white shadow-md hover:bg-indigo-500 transition-colors"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>Watch Maximize</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadNow}
              disabled={!videoUrl.trim() || isStartingDownload}
              className="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 disabled:opacity-50 py-2.5 text-xs font-bold text-white shadow-md hover:bg-emerald-500 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>{isStartingDownload ? 'Starting...' : `Download ${selectedQuality.split(' ')[0]}`}</span>
            </button>
          </div>
        </form>

        {/* Quick Sample Links */}
        <div className="mt-5 border-t border-slate-800 pt-3 space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Quick Test Video Links (High Speed CDNs)
          </div>
          <div className="space-y-1.5 text-xs">
            <button
              type="button"
              onClick={() => handleLoadSample(
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
                'Tears of Steel (Sci-Fi Cinema)',
                '4K Ultra HD'
              )}
              className="flex w-full items-center justify-between rounded-lg bg-slate-900 p-2 hover:bg-slate-800 border border-slate-800 text-left transition-colors"
            >
              <span className="text-slate-200 font-medium">Tears of Steel 4K UHD</span>
              <span className="text-[10px] text-indigo-400 font-bold">Load 4K Link</span>
            </button>

            <button
              type="button"
              onClick={() => handleLoadSample(
                'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                'Big Buck Bunny (Animation FHD)',
                '1080p FHD'
              )}
              className="flex w-full items-center justify-between rounded-lg bg-slate-900 p-2 hover:bg-slate-800 border border-slate-800 text-left transition-colors"
            >
              <span className="text-slate-200 font-medium">Big Buck Bunny 1080p FHD</span>
              <span className="text-[10px] text-emerald-400 font-bold">Load 1080p Link</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
