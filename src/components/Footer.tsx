import React from 'react';
import { ShieldCheck, Heart, Film, Globe } from 'lucide-react';
import { useMovies } from '../context/MovieContext';

export const Footer: React.FC = () => {
  const { setActiveNavTab, setFilter, setIsAdminOpen } = useMovies();

  const handleNav = (tab: string, category?: string) => {
    setActiveNavTab(tab);
    if (category) {
      setFilter({ category, type: 'All', genre: 'All', searchQuery: '' });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-[#06080d] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 font-display font-black text-white text-sm">
                CV
              </div>
              <span className="font-display text-lg font-black text-white tracking-tight">
                CineVault
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Modern high-speed cinematic portal for verified legal movies, web series, trailers and public-domain film catalogs.
            </p>
            <div className="pt-1 text-[11px] text-indigo-400 font-medium flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Published by <strong>Puru Kumar</strong></span>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-3">
              Explore Catalog
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => handleNav('bollywood', 'Bollywood')} className="hover:text-white transition-colors">
                  Bollywood Blockbusters
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hollywood', 'Hollywood')} className="hover:text-white transition-colors">
                  Hollywood Hits (Dual Audio)
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('south', 'South Indian')} className="hover:text-white transition-colors">
                  South Indian Cinema
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('hindi-dubbed', 'Hindi Dubbed')} className="hover:text-white transition-colors">
                  Hindi Dubbed Releases
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('series', undefined)} className="hover:text-white transition-colors">
                  Binge Web Series
                </button>
              </li>
            </ul>
          </div>

          {/* Resolutions & Features */}
          <div>
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-3">
              Formats & Delivery
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>4K Ultra HD & 10-Bit HEVC</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span>1080p FHD & 720p HD Dual Audio</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
                <span>Dolby Atmos 5.1 & TrueHD Audio</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                <span>Multi-Subtitles (English / Hindi)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                <span>Mobile-Optimized Fast Mirrors</span>
              </li>
            </ul>
          </div>

          {/* Legal Compliance & Disclaimer */}
          <div className="space-y-2">
            <h4 className="font-display text-xs font-bold text-white uppercase tracking-wider mb-3">
              Legal Compliance
            </h4>
            <p className="text-[11px] leading-relaxed text-slate-400">
              CineVault respects intellectual property laws. We only index authorized streams, open-source film foundations (such as Blender Open Movie projects), trailers, and licensed metadata. We do not host, scrape, or distribute unauthorized copyrighted media.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => setIsAdminOpen(true)}
                className="text-[11px] text-slate-400 hover:text-white underline underline-offset-2"
              >
                Publisher Portal Access
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="border-t border-slate-800/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} CineVault Portal · Designed & Published by <span className="font-semibold text-slate-200">Puru Kumar</span>. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Verified Public-Domain & Open Media</span>
            <span>·</span>
            <span>Ultra Fast CDN Network</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
