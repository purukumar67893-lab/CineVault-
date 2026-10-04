export type MovieType = 'Movie' | 'Web Series' | 'TV Series';

export type MovieCategory = 
  | 'Bollywood'
  | 'Hollywood'
  | 'South Indian'
  | 'Hindi Dubbed'
  | 'Web Series';

export type MovieGenre = 
  | 'Action'
  | 'Adventure'
  | 'Comedy'
  | 'Crime'
  | 'Drama'
  | 'Horror'
  | 'Romance'
  | 'Sci-Fi'
  | 'Thriller'
  | 'Animation'
  | 'Fantasy'
  | 'Mystery';

export type MovieLanguage =
  | 'Hindi'
  | 'English'
  | 'Dual Audio (Hindi + English)'
  | 'Tamil (Hindi Dubbed)'
  | 'Telugu (Hindi Dubbed)'
  | 'Malayalam (Hindi Dubbed)'
  | 'Kannada'
  | 'Punjabi'
  | 'Bengali';

export interface DownloadOption {
  resolution: '4K Ultra HD' | '1080p FHD' | '720p HD' | '480p SD';
  size: string;
  format: string;
  audio: string;
  directUrl?: string;
  servers: {
    name: string;
    speed: string;
    url: string;
  }[];
}

export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  description: string;
  poster: string;
  backdrop: string;
  trailer_url: string;
  stream_url?: string;
  year: number;
  rating: number; // e.g. 8.4
  votesCount?: string;
  language: string;
  genre: string[];
  runtime: string; // e.g. "2h 28m" or "Season 1 (8 Ep)"
  director: string;
  cast: string[];
  type: MovieType;
  category: MovieCategory;
  quality: '4K UHD' | '1080p WebRip' | '720p HD' | 'HEVC 10-Bit' | 'HDRip' | 'BluRay';
  featured: boolean;
  isTrending?: boolean;
  isLatest?: boolean;
  downloads: DownloadOption[];
  created_at: string;
}

export interface FilterState {
  searchQuery: string;
  category: string; // 'All' or specific
  type: string; // 'All' or MovieType
  genre: string; // 'All' or MovieGenre
  language: string; // 'All' or specific
  year: string; // 'All', '2026', '2025', etc.
  sortBy: 'latest' | 'rating' | 'popular' | 'title';
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  avatar?: string;
  joinedAt: string;
}
