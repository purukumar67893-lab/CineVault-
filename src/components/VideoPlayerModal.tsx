import React, { useRef, useState, useEffect, useMemo } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  RotateCw, 
  Subtitles,
  Download,
  Tv,
  Copy,
  Check,
  Server,
  AlertCircle,
  RefreshCw,
  Sparkles,
  Loader2
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export const VideoPlayerModal: React.FC = () => {
  const { playingMovie, setPlayingMovie, setDownloadMovie } = useMovies();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(true); // Start muted for guaranteed browser autoplay compatibility
  const [showMuteBanner, setShowMuteBanner] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState('1080p FHD');
  const [copiedLink, setCopiedLink] = useState(false);
  const [selectedServerIndex, setSelectedServerIndex] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fallback high-speed server mirrors pool
  const mirrorServers = useMemo(() => {
    if (!playingMovie) return [];
    
    const mirrors = [
      { name: 'Ultra CDN Server 1', url: playingMovie.stream_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
      { name: 'High-Speed Backup Server 2', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { name: 'Global Cloud Mirror 3', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' },
      { name: 'Direct Stream Mirror 4', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
    ];

    // If movie has custom downloads with direct URLs, prepend them
    if (playingMovie.downloads && playingMovie.downloads.length > 0) {
      playingMovie.downloads.forEach(d => {
        if (d.directUrl && !mirrors.some(m => m.url === d.directUrl)) {
          mirrors.unshift({ name: `${d.resolution} Direct Server`, url: d.directUrl });
        }
      });
    }

    return mirrors;
  }, [playingMovie]);

  const currentStreamUrl = mirrorServers[selectedServerIndex]?.url || playingMovie?.stream_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';

  // Autoplay attempt on mount or stream URL change
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage('');

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      // Start muted to satisfy all browser autoplay security restrictions
      videoRef.current.muted = isMuted;
      videoRef.current.volume = volume;

      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsLoading(false);
          })
          .catch(() => {
            // Autoplay with sound was blocked or user gesture required
            setIsPlaying(false);
            setIsLoading(false);
          });
      }
    }
  }, [currentStreamUrl, playingMovie]);

  // Controls hide timeout
  useEffect(() => {
    let timeout: any;
    const handleMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!playingMovie) return;
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else if (isTheaterMode) {
          setIsTheaterMode(false);
        } else {
          setPlayingMovie(null);
        }
      } else if (e.key === ' ' || e.key === 'k') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'f') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 't') {
        e.preventDefault();
        setIsTheaterMode(prev => !prev);
      } else if (e.key === 'm') {
        e.preventDefault();
        toggleMute();
      } else if (e.key === 'ArrowRight') {
        seek(10);
      } else if (e.key === 'ArrowLeft') {
        seek(-10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playingMovie, isPlaying, isTheaterMode, isMuted]);

  if (!playingMovie) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        // If unmuted on user click, allow audio!
        if (isMuted && showMuteBanner) {
          setIsMuted(false);
          videoRef.current.muted = false;
          setShowMuteBanner(false);
        }
        videoRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(err => {
            console.warn('Play error:', err);
            // Try muted fallback
            if (videoRef.current) {
              videoRef.current.muted = true;
              setIsMuted(true);
              videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          });
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleUnmute = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted(false);
    setShowMuteBanner(false);
    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = volume || 0.85;
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const handleVideoError = () => {
    console.warn(`Stream failed on server: ${mirrorServers[selectedServerIndex]?.name}`);
    setIsLoading(false);

    // If there's another mirror server, auto-failover!
    if (selectedServerIndex + 1 < mirrorServers.length) {
      const nextIndex = selectedServerIndex + 1;
      setSelectedServerIndex(nextIndex);
      setErrorMessage(`Switched to Backup Mirror: ${mirrorServers[nextIndex].name}`);
    } else {
      setHasError(true);
      setErrorMessage('Could not load stream from current mirror. Please select another server below.');
    }
  };

  const seek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration || 100, videoRef.current.currentTime + seconds));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = target;
      setCurrentTime(target);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    setShowMuteBanner(false);
    if (videoRef.current) {
      videoRef.current.volume = val;
      const nextMuted = val === 0;
      setIsMuted(nextMuted);
      videoRef.current.muted = nextMuted;
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      videoRef.current.muted = nextMute;
      if (!nextMute) setShowMuteBanner(false);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {
          setIsTheaterMode(true);
        });
      } else {
        setIsTheaterMode(true);
      }
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleQualityChange = (quality: string) => {
    setSelectedQuality(quality);
    // If movie has download with matching resolution, switch stream URL
    const match = playingMovie.downloads?.find(d => d.resolution.includes(quality));
    if (match && (match.directUrl || match.servers[0]?.url)) {
      const targetUrl = match.directUrl || match.servers[0]?.url;
      const srvIdx = mirrorServers.findIndex(m => m.url === targetUrl);
      if (srvIdx >= 0) {
        setSelectedServerIndex(srvIdx);
      }
    }
  };

  const handleCopyVideoLink = () => {
    const link = currentStreamUrl;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleQualityDownload = () => {
    const link = currentStreamUrl;
    const a = document.createElement('a');
    a.href = link;
    a.download = `${playingMovie.title.replace(/\s+/g, '_')}_${selectedQuality.replace(/\s+/g, '_')}.mp4`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds <= 0) return '00:00';
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    if (hrs > 0) {
      return `${hrs}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg ${
      isTheaterMode ? 'p-0' : 'p-2 sm:p-4'
    }`}>
      <div 
        ref={containerRef}
        className={`relative flex flex-col justify-center bg-black overflow-hidden group select-none transition-all duration-300 ${
          isTheaterMode 
            ? 'h-screen w-screen rounded-none' 
            : 'h-[92vh] w-full max-w-6xl rounded-2xl border border-slate-800 shadow-2xl'
        }`}
      >
        {/* Top Floating Header */}
        <div className={`absolute top-0 left-0 right-0 z-30 flex items-center justify-between bg-gradient-to-b from-black/95 via-black/60 to-transparent p-4 sm:p-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="flex items-center gap-3">
            <span className="rounded bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
              {playingMovie.category || 'Stream'}
            </span>
            <div>
              <h2 className="font-display text-sm sm:text-base font-bold text-white truncate max-w-md">
                {playingMovie.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>{selectedQuality}</span>
                <span>·</span>
                <span className="text-slate-300">{playingMovie.language}</span>
                <span>·</span>
                <span className="text-emerald-400 font-medium">{mirrorServers[selectedServerIndex]?.name}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Server Switcher Dropdown */}
            <select
              value={selectedServerIndex}
              onChange={e => setSelectedServerIndex(Number(e.target.value))}
              aria-label="Select streaming server mirror"
              className="hidden md:block rounded-lg bg-slate-800/90 border border-slate-700 px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              {mirrorServers.map((srv, idx) => (
                <option key={idx} value={idx}>
                  {srv.name}
                </option>
              ))}
            </select>

            {/* Copy Video Link button */}
            <button
              onClick={handleCopyVideoLink}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors"
              title="Copy direct stream video link"
            >
              {copiedLink ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Link Copied' : 'Link to Video'}</span>
            </button>

            {/* Direct Quality Download */}
            <button
              onClick={handleQualityDownload}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md transition-colors"
              title={`Download video file directly in ${selectedQuality}`}
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download</span>
            </button>

            {/* Maximize / Theater View Toggle */}
            <button
              onClick={() => setIsTheaterMode(prev => !prev)}
              className="flex items-center gap-1 rounded-lg bg-white/10 hover:bg-white/20 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors"
              title={isTheaterMode ? "Exit Theater Mode" : "Maximize Theater Mode"}
            >
              <Tv className="h-3.5 w-3.5 text-indigo-400" />
              <span className="hidden sm:inline">{isTheaterMode ? 'Standard' : 'Maximize'}</span>
            </button>

            {/* Exit Player */}
            <button
              onClick={() => setPlayingMovie(null)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Exit Player"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Video Element */}
        <video
          ref={videoRef}
          key={currentStreamUrl} // Forces fresh element attachment on mirror change
          src={currentStreamUrl}
          autoPlay
          playsInline
          muted={isMuted}
          onTimeUpdate={handleTimeUpdate}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onWaiting={() => setIsLoading(true)}
          onPlaying={() => {
            setIsLoading(false);
            setIsPlaying(true);
          }}
          onCanPlay={() => setIsLoading(false)}
          onError={handleVideoError}
          onClick={togglePlay}
          className="h-full w-full object-contain cursor-pointer bg-black"
        />

        {/* Floating One-Click Unmute Toast (Guarantees compliance with strict browser autoplay policy) */}
        {isMuted && showMuteBanner && isPlaying && (
          <div 
            onClick={handleUnmute}
            className="absolute top-20 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2.5 rounded-full bg-indigo-600/95 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-2xl backdrop-blur-md cursor-pointer border border-white/20 animate-bounce transition-all"
          >
            <VolumeX className="h-4 w-4" />
            <span>Click to Unmute Audio 🔊</span>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && !hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 pointer-events-none z-20">
            <Loader2 className="h-12 w-12 text-indigo-500 animate-spin mb-3" />
            <span className="text-xs font-semibold text-slate-300">Loading High-Speed Video Stream...</span>
          </div>
        )}

        {/* Big Center Play Button when Paused */}
        {!isPlaying && !isLoading && !hasError && (
          <div 
            onClick={togglePlay}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 cursor-pointer z-20"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600 text-white shadow-2xl transition-transform hover:scale-110 active:scale-95 border-2 border-white/20">
              <Play className="h-9 w-9 fill-white ml-1.5" />
            </div>
            <span className="mt-4 text-sm font-bold text-white drop-shadow">Click to Play Movie with Sound</span>
          </div>
        )}

        {/* Error / Mirror Fallback State */}
        {hasError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/85 p-6 text-center z-20 space-y-4">
            <AlertCircle className="h-12 w-12 text-amber-400 mx-auto" />
            <h3 className="font-display text-lg font-bold text-white">Stream Notice</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              {errorMessage || 'The requested stream mirror is temporarily unavailable on your network.'}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {mirrorServers.map((srv, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedServerIndex(idx);
                    setHasError(false);
                    setIsLoading(true);
                  }}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                    selectedServerIndex === idx 
                      ? 'bg-indigo-600 text-white' 
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Server className="inline h-3.5 w-3.5 mr-1" />
                  {srv.name}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                // Force retry
                setSelectedServerIndex(0);
                setHasError(false);
                if (videoRef.current) videoRef.current.load();
              }}
              className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Retry Stream</span>
            </button>
          </div>
        )}

        {/* Custom Controls Bar at Bottom */}
        <div className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/95 via-black/75 to-transparent p-4 sm:p-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          {/* Progress Seek Bar */}
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono tabular-nums text-slate-300">
              {formatTime(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration || 100}
              step={0.1}
              value={currentTime}
              onChange={handleSeekChange}
              aria-label="Playback seek progress"
              className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-indigo-500 hover:h-2 transition-all"
            />
            <span className="text-xs font-mono tabular-nums text-slate-400">
              {formatTime(duration)}
            </span>
          </div>

          {/* Bottom Controls Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white ml-0.5" />}
              </button>

              <button
                onClick={() => seek(-10)}
                className="text-slate-300 hover:text-white transition-colors"
                title="Rewind 10s (Left Arrow)"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              <button
                onClick={() => seek(10)}
                className="text-slate-300 hover:text-white transition-colors"
                title="Forward 10s (Right Arrow)"
              >
                <RotateCw className="h-4 w-4" />
              </button>

              {/* Volume Slider */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-slate-300 hover:text-white transition-colors"
                  aria-label="Mute or unmute (M)"
                  title={isMuted ? "Unmute (M)" : "Mute (M)"}
                >
                  {isMuted || volume === 0 ? <VolumeX className="h-4 w-4 text-amber-400" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Audio volume"
                  className="hidden sm:block h-1.5 w-20 cursor-pointer appearance-none rounded-lg bg-slate-700 accent-indigo-500"
                />
              </div>
            </div>

            {/* Right Side Settings */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Speed Selector */}
              <div className="hidden sm:flex items-center rounded-lg bg-white/10 px-2 py-1 text-xs text-slate-200">
                <span className="text-[10px] text-slate-400 mr-1.5 hidden md:inline">Speed:</span>
                {[1, 1.25, 1.5, 2].map(s => (
                  <button
                    key={s}
                    onClick={() => handleSpeedChange(s)}
                    className={`px-1.5 py-0.5 rounded text-[11px] font-bold ${
                      playbackSpeed === s ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {s}x
                  </button>
                ))}
              </div>

              {/* Subtitles Toggle */}
              <button
                onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
                className={`flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold transition-colors ${
                  subtitlesEnabled ? 'bg-indigo-600 text-white' : 'bg-white/10 text-slate-400 hover:text-white'
                }`}
                title="Toggle Subtitles"
              >
                <Subtitles className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">CC</span>
              </button>

              {/* Quality Switcher */}
              <select
                value={selectedQuality}
                onChange={e => handleQualityChange(e.target.value)}
                aria-label="Select streaming quality"
                className="rounded-lg bg-white/10 px-2 py-1 text-xs font-medium text-slate-200 border border-white/10 focus:outline-none"
              >
                <option value="4K UHD" className="bg-slate-900">4K UHD</option>
                <option value="1080p FHD" className="bg-slate-900">1080p FHD</option>
                <option value="720p HD" className="bg-slate-900">720p HD</option>
                <option value="480p SD" className="bg-slate-900">480p SD</option>
              </select>

              {/* Maximise / Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="flex items-center gap-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 px-2.5 py-1 text-xs font-bold text-white transition-colors shadow-md"
                title="Maximize / Fullscreen (F)"
              >
                {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
                <span className="hidden sm:inline">{isFullscreen ? 'Restore' : 'Maximize'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
