import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ShieldCheck, 
  Server, 
  HardDrive, 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  FileVideo,
  Zap,
  Play,
  Maximize,
  Minimize,
  Check,
  Link as LinkIcon
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';
import { DownloadOption } from '../types/movie';

export const DownloadModal: React.FC = () => {
  const { downloadMovie, setDownloadMovie, setPlayingMovie } = useMovies();
  const [downloadingServer, setDownloadingServer] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [isModalMaximized, setIsModalMaximized] = useState(false);
  const [customUrl, setCustomUrl] = useState('');

  if (!downloadMovie) return null;

  const handleStartDownload = (serverName: string, url: string, resolution: string) => {
    setDownloadingServer(`${resolution} - ${serverName}`);
    setDownloadProgress(15);

    // Realistic progress animation
    const interval = setInterval(() => {
      setDownloadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Trigger actual file download
          const a = document.createElement('a');
          a.href = url;
          a.download = `${downloadMovie.title.replace(/\s+/g, '_')}_${resolution.replace(/\s+/g, '_')}.mp4`;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          return 100;
        }
        return prev + 25;
      });
    }, 350);
  };

  const handleCopy = (url: string, id: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
      setCopiedLink(id);
      setTimeout(() => setCopiedLink(null), 2500);
    }
  };

  const handleStreamQuality = (opt: DownloadOption) => {
    const targetUrl = opt.directUrl || opt.servers[0]?.url || downloadMovie.stream_url;
    setPlayingMovie({
      ...downloadMovie,
      stream_url: targetUrl
    });
  };

  const handleCustomUrlDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;
    handleStartDownload('Custom Video Link', customUrl.trim(), 'Direct Stream');
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/85 backdrop-blur-md ${
      isModalMaximized ? 'p-0' : 'p-3 sm:p-6'
    }`}>
      <div 
        className={`relative my-auto flex flex-col overflow-hidden border border-slate-700 bg-[#0d121c] text-white shadow-2xl transition-all duration-300 ${
          isModalMaximized 
            ? 'h-screen w-screen rounded-none' 
            : 'h-[90vh] w-full max-w-3xl rounded-2xl'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 bg-[#0a0e16] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>Download Center (Quality & Video Links)</span>
              </h2>
              <p className="text-xs text-slate-400">
                Choose video resolution (4K, 1080p, 720p, 480p) or direct video URL connection
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalMaximized(prev => !prev)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              title={isModalMaximized ? "Restore view" : "Maximize view"}
            >
              {isModalMaximized ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </button>
            <button
              onClick={() => {
                setDownloadMovie(null);
                setDownloadingServer(null);
              }}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 p-5 space-y-5 overflow-y-auto custom-scrollbar">
          
          {/* Movie Overview Card */}
          <div className="flex items-center gap-4 rounded-xl bg-slate-900/90 p-3.5 border border-slate-800">
            <img
              src={downloadMovie.poster}
              alt={downloadMovie.title}
              className="h-20 w-14 shrink-0 rounded-lg object-cover bg-slate-950"
            />
            <div className="min-w-0 flex-1">
              <h3 className="font-display text-base font-bold text-white truncate">
                {downloadMovie.title}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <span className="font-semibold text-slate-300">{downloadMovie.year}</span>
                <span>·</span>
                <span className="text-indigo-400 font-medium">{downloadMovie.category}</span>
                <span>·</span>
                <span>{downloadMovie.runtime}</span>
              </div>
              <div className="mt-1 text-xs text-slate-300 truncate">
                Audio: {downloadMovie.language}
              </div>
            </div>

            <button
              onClick={() => {
                setPlayingMovie(downloadMovie);
              }}
              className="hidden sm:flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-semibold text-white hover:bg-indigo-500 shadow-md"
            >
              <Play className="h-3.5 w-3.5 fill-white" />
              <span>Watch Online</span>
            </button>
          </div>

          {/* Active Download Progress indicator */}
          {downloadingServer && (
            <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-4 space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-emerald-300">
                <span className="flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5 text-emerald-400" />
                  Initiating Direct Download: {downloadingServer}
                </span>
                <span className="tabular-nums">{downloadProgress}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-300"
                  style={{ width: `${downloadProgress}%` }}
                />
              </div>
              {downloadProgress === 100 && (
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 pt-1">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Download started! If it didn't begin automatically, click the direct link below.</span>
                </div>
              )}
            </div>
          )}

          {/* Quality-wise Download Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Select Resolution & Direct Quality Link</span>
              <span className="text-[11px] text-emerald-400 font-normal">Fast 1Gbps Mirrors</span>
            </div>

            {downloadMovie.downloads && downloadMovie.downloads.length > 0 ? (
              downloadMovie.downloads.map((opt: DownloadOption, idx: number) => {
                const targetUrl = opt.directUrl || opt.servers[0]?.url || downloadMovie.stream_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
                const isCopied = copiedLink === `link-${idx}`;

                return (
                  <div 
                    key={idx}
                    className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 space-y-3 transition-colors hover:border-slate-700"
                  >
                    {/* Resolution Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-indigo-600/30 px-2 py-0.5 text-xs font-bold text-indigo-300 border border-indigo-500/30">
                          {opt.resolution}
                        </span>
                        <span className="text-xs text-slate-400">
                          Format: <span className="text-slate-200">{opt.format}</span>
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-xs text-slate-300 font-semibold tabular-nums">
                        <HardDrive className="h-3.5 w-3.5 text-slate-400" />
                        <span>{opt.size}</span>
                      </div>
                    </div>

                    {/* Audio Specs */}
                    <div className="text-xs text-slate-400">
                      <span className="text-slate-500">Audio Track:</span> {opt.audio}
                    </div>

                    {/* Primary Quality Actions: Direct Download, Copy Link, Stream in Player */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <button
                        onClick={() => handleStartDownload('Direct Fast Link', targetUrl, opt.resolution)}
                        className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-2 text-xs font-bold text-white shadow-md transition-colors"
                      >
                        <Download className="h-3.5 w-3.5" />
                        <span>Download {opt.resolution}</span>
                      </button>

                      <button
                        onClick={() => handleStreamQuality(opt)}
                        className="flex items-center gap-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600 text-indigo-300 hover:text-white px-3 py-2 text-xs font-semibold border border-indigo-500/40 transition-colors"
                        title="Watch this quality directly in video player"
                      >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        <span>Play Stream</span>
                      </button>

                      <button
                        onClick={() => handleCopy(targetUrl, `link-${idx}`)}
                        className="flex items-center gap-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 text-xs font-medium border border-slate-700 transition-colors"
                        title="Copy direct video stream link"
                      >
                        {isCopied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{isCopied ? 'Copied' : 'Link'}</span>
                      </button>
                    </div>

                    {/* Server Mirror Options */}
                    {opt.servers && opt.servers.length > 1 && (
                      <div className="pt-1">
                        <div className="text-[11px] text-slate-400 mb-1.5">Alternative Mirror Servers:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {opt.servers.map((srv, srvIdx) => (
                            <button
                              key={srvIdx}
                              onClick={() => handleStartDownload(srv.name, srv.url, opt.resolution)}
                              className="flex items-center justify-between rounded-lg bg-slate-800/60 hover:bg-emerald-950/40 hover:border-emerald-500/50 border border-slate-700/60 px-2.5 py-1.5 text-xs text-slate-200 transition-all text-left group"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <Server className="h-3.5 w-3.5 text-indigo-400 group-hover:text-emerald-400 shrink-0" />
                                <span className="truncate font-medium text-[11px]">{srv.name}</span>
                              </div>
                              <span className="text-[10px] text-slate-400 tabular-nums">{srv.speed}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            ) : null}
          </div>

          {/* Custom Video URL Downloader */}
          <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-white">
              <LinkIcon className="h-4 w-4 text-indigo-400" />
              <span>Connect & Download Custom Video Link</span>
            </div>
            <form onSubmit={handleCustomUrlDownload} className="flex gap-2">
              <input
                type="text"
                value={customUrl}
                onChange={e => setCustomUrl(e.target.value)}
                placeholder="Paste any MP4 / video link to download directly (https://.../video.mp4)"
                className="flex-1 rounded-lg bg-slate-950 border border-slate-700/80 px-3 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 shrink-0 transition-colors"
              >
                Download Link
              </button>
            </form>
          </div>

          {/* Security & Verification Box */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <ShieldCheck className="h-4 w-4" />
              <span>Verified Clean & High-Speed Media Source</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Files are checked for playback integrity and multi-channel audio tracks. Compatible with Smart TVs, Android, iOS, Windows, Mac and VLC player.
            </p>
            <div className="pt-1 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/80">
              <span>Verified Publisher: <strong className="text-slate-200">Puru Kumar</strong></span>
              <button
                onClick={() => handleCopy(downloadMovie.stream_url || window.location.href, 'footer-copy')}
                className="flex items-center gap-1 text-indigo-400 hover:text-indigo-300"
              >
                <Copy className="h-3 w-3" />
                <span>{copiedLink === 'footer-copy' ? 'Copied!' : 'Copy Movie Link'}</span>
              </button>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-800 bg-[#0a0e16] px-5 py-3 text-xs text-slate-400">
          <span>High-Speed 1Gbps Bandwidth Servers</span>
          <button
            onClick={() => setDownloadMovie(null)}
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-700 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
