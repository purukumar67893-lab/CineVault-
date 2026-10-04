import React, { useRef, useState, useEffect } from 'react';
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
  ExternalLink,
  Copy,
  Check
} from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export const VideoPlayerModal: React.FC = () => {
  const { playingMovie, setPlayingMovie, setDownloadMovie } = useMovies();
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [selectedQuality, setSelectedQuality] = useState('1080p FHD');
  const [copiedLink, setCopiedLink] = useState(false);

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

  // Sync fullscreen change listener
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
  }, [playingMovie, isPlaying, isTheaterMode]);

  if (!playingMovie) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const seek = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration, videoRef.current.currentTime + seconds));
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
    if (videoRef.current) {
      videoRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMute = !isMuted;
      setIsMuted(nextMute);
      videoRef.current.muted = nextMute;
    }
  };

  // Fullscreen / Maximise
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {
          // If native fullscreen is blocked in iframe, fallback to theater maximize
          setIsTheaterMode(true);
        });
      } else {
        setIsTheaterMode(true);
      }
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const togglePictureInPicture = async () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture();
        } else {
          await videoRef.current.requestPictureInPicture();
        }
      } catch {
        // Picture-in-picture fallback
      }
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
  };

  const handleCopyVideoLink = () => {
    const link = playingMovie.stream_url || window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleQualityDownload = () => {
    // Direct quality download trigger
    const link = playingMovie.stream_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4';
    const a = document.createElement('a');
    a.href = link;
    a.download = `${playingMovie.title.replace(/\s+/g, '_')}_${selectedQuality.replace(/\s+/g, '_')}.mp4`;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '00:00';
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
        <div className={`absolute top-0 left-0 right-0 z-30 flex items-center justify-between bg-gradient-to-b from-black/90 via-black/50 to-transparent p-4 sm:p-6 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <div className="flex items-center gap-3">
            <span className="rounded bg-indigo-600 px-2 py-0.5 text-xs font-bold text-white uppercase tracking-wider">
              {playingMovie.category || 'Streaming'}
            </span>
            <div>
              <h2 className="font-display text-sm sm:text-base font-bold text-white truncate max-w-md">
                {playingMovie.title}
              </h2>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Playing in {selectedQuality}</span>
                <span>·</span>
                <span className="text-slate-300">{playingMovie.language}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Copy Video Link button */}
            <button
              onClick={handleCopyVideoLink}
              className="flex items-center gap-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 px-3 py-1.5 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors"
              title="Copy direct video link URL"
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
              <span>Download ({selectedQuality})</span>
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
          src={playingMovie.stream_url || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'}
          autoPlay
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          className="h-full w-full object-contain cursor-pointer"
        />

        {/* Big Center Play/Pause button on Pause */}
        {!isPlaying && (
          <div 
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-indigo-600/90 text-white shadow-2xl transition-transform hover:scale-110 active:scale-95">
              <Play className="h-8 w-8 fill-white ml-1" />
            </div>
          </div>
        )}

        {/* Custom Controls Bar at Bottom */}
        <div className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-4 sm:p-6 transition-opacity duration-300 ${
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
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-white ml-0.5" />}
              </button>

              <button
                onClick={() => seek(-10)}
                className="text-slate-300 hover:text-white transition-colors"
                title="Rewind 10s"
              >
                <RotateCcw className="h-4 w-4" />
              </button>

              <button
                onClick={() => seek(10)}
                className="text-slate-300 hover:text-white transition-colors"
                title="Forward 10s"
              >
                <RotateCw className="h-4 w-4" />
              </button>

              {/* Volume Slider */}
              <div className="hidden sm:flex items-center gap-2">
                <button
                  onClick={toggleMute}
                  className="text-slate-300 hover:text-white transition-colors"
                  aria-label="Mute or unmute"
                >
                  {isMuted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  aria-label="Audio volume"
                  className="h-1.5 w-20 cursor-pointer appearance-none rounded-lg bg-slate-700 accent-indigo-500"
                />
              </div>
            </div>

            {/* Right Side Settings */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Speed Selector */}
              <div className="flex items-center rounded-lg bg-white/10 px-2 py-1 text-xs text-slate-200">
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
                onChange={e => setSelectedQuality(e.target.value)}
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
                className="flex items-center gap-1 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 px-2.5 py-1 text-xs font-bold text-white transition-colors"
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
