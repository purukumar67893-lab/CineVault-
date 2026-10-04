import { Movie } from '../types/movie';

export const INITIAL_MOVIES: Movie[] = [
  {
    id: 'cine-01',
    title: 'Kalki: Chrono Uprising',
    originalTitle: 'कालकी: क्रोनो अपराइजिंग',
    description: 'In a dystopian neon-washed metropolis of 2898 AD, a mysterious rogue cyber-warrior rises against an omnipotent syndicate to protect the reincarnation of divine cosmic balance.',
    poster: '/src/assets/images/poster_bollywood_epic_1791117250110.jpg',
    backdrop: '/src/assets/images/hero_cinematic_backdrop_1791117223849.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-', // working fallback
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    year: 2025,
    rating: 8.8,
    votesCount: '48.2k',
    language: 'Hindi (Original) + English Sub',
    genre: ['Action', 'Sci-Fi', 'Fantasy'],
    runtime: '2h 45m',
    director: 'Nag Ashwin & Puru Media Studio',
    cast: ['Prabhas Kumar', 'Deepika Padukone', 'Amitabh Bachchan', 'Kamal Haasan'],
    type: 'Movie',
    category: 'Bollywood',
    quality: '4K UHD',
    featured: true,
    isTrending: true,
    isLatest: true,
    created_at: '2025-01-15T10:00:00Z',
    downloads: [
      {
        resolution: '4K Ultra HD',
        size: '3.4 GB',
        format: 'MKV (x265 HEVC 10-Bit)',
        audio: 'Dolby Atmos TrueHD 7.1 (Hindi + Eng)',
        servers: [
          { name: 'Ultra CDN Server 1 (Instant Fast)', speed: '50 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
          { name: 'High Speed Mirror (Cloudflare)', speed: '35 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
          { name: 'Google Drive VIP Mirror', speed: '40 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
        ]
      },
      {
        resolution: '1080p FHD',
        size: '1.9 GB',
        format: 'MP4 / MKV (x264 WebRip)',
        audio: 'Hindi 5.1 DD + English Stereo',
        servers: [
          { name: 'Ultra CDN Server 1', speed: '45 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' },
          { name: 'Direct High-Speed Hub', speed: '30 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
        ]
      },
      {
        resolution: '720p HD',
        size: '950 MB',
        format: 'MP4 (Optimized for Mobile/Tablet)',
        audio: 'Hindi Stereo 192kbps',
        servers: [
          { name: 'Fast Direct Download', speed: '25 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
        ]
      },
      {
        resolution: '480p SD',
        size: '420 MB',
        format: 'MP4 Mobile Friendly',
        audio: 'Hindi AAC',
        servers: [
          { name: 'Mobile Direct Server', speed: '15 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-02',
    title: 'Shadow Protocol: Tokyo Drift',
    originalTitle: 'シャドウ・プロトコル',
    description: 'An elite undercover cyber detective must infiltrate a rogue syndicate operating within the neon labyrinth of high-stakes corporate espionage and street warfare.',
    poster: '/src/assets/images/poster_cyber_thriller_1791117262582.jpg',
    backdrop: '/src/assets/images/hero_action_thriller_1791117236537.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    year: 2025,
    rating: 8.6,
    votesCount: '32.1k',
    language: 'Dual Audio (Hindi + English)',
    genre: ['Action', 'Thriller', 'Crime'],
    runtime: '2h 14m',
    director: 'Kenji Sato & David Ross',
    cast: ['Ryunosuke Kamiki', 'Hiroyuki Sanada', 'Jessica Henwick'],
    type: 'Movie',
    category: 'Hollywood',
    quality: '1080p WebRip',
    featured: true,
    isTrending: true,
    isLatest: true,
    created_at: '2025-02-10T12:00:00Z',
    downloads: [
      {
        resolution: '1080p FHD',
        size: '2.1 GB',
        format: 'MKV (x264 Clean)',
        audio: 'Dual Audio (Hindi 5.1 + English 5.1)',
        servers: [
          { name: 'Primary Super-CDN Mirror', speed: '45 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
          { name: 'Backup High-Speed Mirror', speed: '30 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
        ]
      },
      {
        resolution: '720p HD',
        size: '880 MB',
        format: 'MP4 HEVC',
        audio: 'Hindi Clean Stereo',
        servers: [
          { name: 'Fast Direct Download', speed: '25 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
        ]
      },
      {
        resolution: '480p SD',
        size: '390 MB',
        format: 'MP4',
        audio: 'Hindi AAC',
        servers: [
          { name: 'Mobile Direct Server', speed: '15 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-03',
    title: 'Devara: Wrath of the Seas',
    originalTitle: 'దేవర',
    description: 'Set along the treacherous coastal waters of the Bay of Bengal, a fearsome chieftain wages war against international smugglers to defend his seafaring clan and legacy.',
    poster: '/src/assets/images/poster_bollywood_epic_1791117250110.jpg',
    backdrop: '/src/assets/images/hero_action_thriller_1791117236537.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    year: 2024,
    rating: 8.5,
    votesCount: '54.7k',
    language: 'Telugu (Hindi Dubbed)',
    genre: ['Action', 'Drama', 'Thriller'],
    runtime: '2h 50m',
    director: 'Koratala Siva',
    cast: ['NTR Jr.', 'Saif Ali Khan', 'Janhvi Kapoor', 'Prakash Raj'],
    type: 'Movie',
    category: 'South Indian',
    quality: '4K UHD',
    featured: true,
    isTrending: true,
    isLatest: false,
    created_at: '2024-11-20T08:00:00Z',
    downloads: [
      {
        resolution: '4K Ultra HD',
        size: '3.6 GB',
        format: 'MKV 10-Bit HDR',
        audio: 'Dolby Atmos (Hindi Dubbed + Telugu)',
        servers: [
          { name: 'Direct Cloud CDN', speed: '48 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
        ]
      },
      {
        resolution: '1080p FHD',
        size: '2.0 GB',
        format: 'MKV Dual Audio',
        audio: 'Hindi DD 5.1 + Telugu DD 5.1',
        servers: [
          { name: 'Fast Mirror 1', speed: '32 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
        ]
      },
      {
        resolution: '720p HD',
        size: '890 MB',
        format: 'MP4 WebRip',
        audio: 'Hindi Clean Stereo',
        servers: [
          { name: 'Mobile Direct Server', speed: '20 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-04',
    title: 'The Family Syndicate',
    originalTitle: 'द फैमिली सिंडिकेट',
    description: 'Season 3: When a covert cyber terror cell strikes regional financial hubs, a battle-hardened senior intelligence officer must operate completely off the grid while maintaining his double life.',
    poster: '/src/assets/images/poster_cyber_thriller_1791117262582.jpg',
    backdrop: '/src/assets/images/hero_cinematic_backdrop_1791117223849.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    year: 2025,
    rating: 8.9,
    votesCount: '62.4k',
    language: 'Hindi',
    genre: ['Crime', 'Action', 'Thriller'],
    runtime: 'Season 3 (8 Episodes)',
    director: 'Raj & DK',
    cast: ['Manoj Bajpayee', 'Priyamani', 'Sharib Hashmi', 'Samantha Ruth Prabhu'],
    type: 'Web Series',
    category: 'Web Series',
    quality: '1080p WebRip',
    featured: true,
    isTrending: true,
    isLatest: true,
    created_at: '2025-02-01T15:00:00Z',
    downloads: [
      {
        resolution: '1080p FHD',
        size: '4.8 GB (Complete Batch Zip)',
        format: 'MKV WebRip All 8 Episodes',
        audio: 'Hindi 5.1 Surround',
        servers: [
          { name: 'Series Batch Direct Mirror', speed: '50 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' }
        ]
      },
      {
        resolution: '720p HD',
        size: '2.2 GB (Complete Batch)',
        format: 'MP4 HEVC',
        audio: 'Hindi Clean Stereo',
        servers: [
          { name: 'Fast Mirror Server', speed: '30 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-05',
    title: 'Cyberpunk Noir: Neo Mumbai',
    originalTitle: 'साइबरपंक नॉयर',
    description: 'In the towering holographic corridors of South Mumbai 2077, private investigator Kabir Verma takes on a missing-person case that unravels a conspiracy touching mind-control neural implants.',
    poster: '/src/assets/images/poster_cyber_thriller_1791117262582.jpg',
    backdrop: '/src/assets/images/hero_cinematic_backdrop_1791117223849.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    year: 2026,
    rating: 8.7,
    votesCount: '19.8k',
    language: 'Hindi + English Sub',
    genre: ['Sci-Fi', 'Mystery', 'Crime'],
    runtime: '2h 22m',
    director: 'Vikramaditya Motwane',
    cast: ['Nawazuddin Siddiqui', 'Radhika Apte', 'Jim Sarbh'],
    type: 'Movie',
    category: 'Hindi Dubbed',
    quality: '4K UHD',
    featured: false,
    isTrending: true,
    isLatest: true,
    created_at: '2026-01-10T10:00:00Z',
    downloads: [
      {
        resolution: '4K Ultra HD',
        size: '3.2 GB',
        format: 'MKV 10-Bit HEVC',
        audio: 'Hindi Dolby Atmos 7.1',
        servers: [
          { name: 'Ultra CDN Fast Mirror', speed: '50 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
        ]
      },
      {
        resolution: '1080p FHD',
        size: '1.8 GB',
        format: 'MP4 WebRip',
        audio: 'Hindi 5.1 Audio',
        servers: [
          { name: 'Direct Download Server', speed: '35 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-06',
    title: 'Sita: Song of the Stars',
    originalTitle: 'सीता: तारों का गीत',
    description: 'An acclaimed animated musical triumph recounting the grand Ramayana epic through vibrant visual art, jazz melodies, and profound mythological wonder.',
    poster: '/src/assets/images/poster_bollywood_epic_1791117250110.jpg',
    backdrop: '/src/assets/images/hero_cinematic_backdrop_1791117223849.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    year: 2024,
    rating: 8.3,
    votesCount: '21.5k',
    language: 'Hindi + English',
    genre: ['Animation', 'Fantasy', 'Adventure'],
    runtime: '1h 35m',
    director: 'Nina Paley & Anand Kumar',
    cast: ['Annette Hanshaw', 'Aseem Chhabra', 'Bhavana Nagulapally'],
    type: 'Movie',
    category: 'Bollywood',
    quality: '1080p WebRip',
    featured: false,
    isTrending: false,
    isLatest: false,
    created_at: '2024-08-12T09:00:00Z',
    downloads: [
      {
        resolution: '1080p FHD',
        size: '1.4 GB',
        format: 'MP4 Clean',
        audio: 'Stereo Hi-Fi 320kbps',
        servers: [
          { name: 'Public Domain Free CDN', speed: '30 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-07',
    title: 'Leo: Bloodline Awakening',
    originalTitle: 'லியோ',
    description: 'A mild-mannered cafe owner in a sleepy hill station finds his peaceful life shattered when relentless cartel assassins arrive, mistaking him for a legendary underworld enforcer.',
    poster: '/src/assets/images/poster_bollywood_epic_1791117250110.jpg',
    backdrop: '/src/assets/images/hero_action_thriller_1791117236537.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    year: 2024,
    rating: 8.1,
    votesCount: '78.3k',
    language: 'Tamil (Hindi Dubbed)',
    genre: ['Action', 'Thriller', 'Crime'],
    runtime: '2h 44m',
    director: 'Lokesh Kanagaraj',
    cast: ['Thalapathy Vijay', 'Sanjay Dutt', 'Trisha Krishnan', 'Arjun Sarja'],
    type: 'Movie',
    category: 'South Indian',
    quality: '4K UHD',
    featured: false,
    isTrending: true,
    isLatest: false,
    created_at: '2024-05-18T14:30:00Z',
    downloads: [
      {
        resolution: '4K Ultra HD',
        size: '3.1 GB',
        format: 'MKV 10-Bit x265',
        audio: 'Hindi 5.1 DD + Tamil Atmos',
        servers: [
          { name: 'Primary Mirror', speed: '45 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
        ]
      },
      {
        resolution: '1080p FHD',
        size: '1.7 GB',
        format: 'MKV Dual Audio',
        audio: 'Hindi Dual Audio',
        servers: [
          { name: 'Direct Mirror', speed: '32 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-08',
    title: 'The Continental Heist',
    originalTitle: 'द कॉन्टिनेंटल हाइस्ट',
    description: 'A coalition of five master illusionists and tech saboteurs plan the ultimate heist inside a subterranean vault floating on international waters.',
    poster: '/src/assets/images/poster_cyber_thriller_1791117262582.jpg',
    backdrop: '/src/assets/images/hero_action_thriller_1791117236537.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    year: 2025,
    rating: 8.4,
    votesCount: '41.0k',
    language: 'Dual Audio (Hindi + English)',
    genre: ['Action', 'Thriller', 'Crime'],
    runtime: '2h 08m',
    director: 'Christopher McQuarrie',
    cast: ['Tom Cruise', 'Hayley Atwell', 'Ving Rhames', 'Simon Pegg'],
    type: 'Movie',
    category: 'Hollywood',
    quality: '1080p WebRip',
    featured: false,
    isTrending: true,
    isLatest: true,
    created_at: '2025-01-28T16:00:00Z',
    downloads: [
      {
        resolution: '1080p FHD',
        size: '2.0 GB',
        format: 'MKV Dual Audio Clean',
        audio: 'Hindi DD+ 5.1 & English DD+ 5.1',
        servers: [
          { name: 'Fast G-Drive Mirror', speed: '42 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' }
        ]
      },
      {
        resolution: '720p HD',
        size: '860 MB',
        format: 'MP4 x264',
        audio: 'Hindi Clean Stereo',
        servers: [
          { name: 'Mobile Direct Server', speed: '24 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-09',
    title: 'Mirzapur: Throne of Blood',
    originalTitle: 'मिर्ज़ापुर: रक्त का सिंहासन',
    description: 'Season 4: The power struggle for the heartland empire reaches fever pitch as new contenders rise from the ashes to challenge the undisputed kingpin.',
    poster: '/src/assets/images/poster_bollywood_epic_1791117250110.jpg',
    backdrop: '/src/assets/images/hero_action_thriller_1791117236537.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    year: 2025,
    rating: 8.8,
    votesCount: '95.6k',
    language: 'Hindi (Original)',
    genre: ['Crime', 'Action', 'Drama'],
    runtime: 'Season 4 (10 Episodes)',
    director: 'Gurmmeet Singh & Anand Iyer',
    cast: ['Pankaj Tripathi', 'Ali Fazal', 'Shweta Tripathi', 'Vijay Varma'],
    type: 'Web Series',
    category: 'Web Series',
    quality: '4K UHD',
    featured: false,
    isTrending: true,
    isLatest: true,
    created_at: '2025-02-14T11:00:00Z',
    downloads: [
      {
        resolution: '4K Ultra HD',
        size: '6.5 GB (All Episodes Pack)',
        format: 'MKV 10-Bit HDR',
        audio: 'Hindi 5.1 DD Surround',
        servers: [
          { name: 'High Speed Mega Server', speed: '55 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }
        ]
      },
      {
        resolution: '1080p FHD',
        size: '3.8 GB (Zip Pack)',
        format: 'MKV WebRip',
        audio: 'Hindi 5.1 DD',
        servers: [
          { name: 'Direct Cloud Mirror', speed: '38 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-10',
    title: 'Interstellar Odyssey: Beyond the Horizon',
    originalTitle: 'इंटरस्टेलर ओडिसी',
    description: 'When the fabric of space-time begins warping around Jupiter’s moon Europa, an international crew of physicists and cosmonauts embarks on humanity’s ultimate voyage.',
    poster: '/src/assets/images/poster_cyber_thriller_1791117262582.jpg',
    backdrop: '/src/assets/images/hero_cinematic_backdrop_1791117223849.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4',
    year: 2026,
    rating: 9.1,
    votesCount: '112.4k',
    language: 'Dual Audio (Hindi + English)',
    genre: ['Sci-Fi', 'Adventure', 'Drama'],
    runtime: '2h 52m',
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'],
    type: 'Movie',
    category: 'Hollywood',
    quality: '4K UHD',
    featured: false,
    isTrending: true,
    isLatest: true,
    created_at: '2026-02-05T09:30:00Z',
    downloads: [
      {
        resolution: '4K Ultra HD',
        size: '4.2 GB',
        format: 'MKV IMAX Enhanced',
        audio: 'Hindi 5.1 DD + English TrueHD Atmos',
        servers: [
          { name: 'Ultra CDN Fast Direct', speed: '60 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4' }
        ]
      },
      {
        resolution: '1080p FHD',
        size: '2.4 GB',
        format: 'MKV Dual Audio',
        audio: 'Hindi + English DD 5.1',
        servers: [
          { name: 'Google Drive Speed Link', speed: '40 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4' }
        ]
      },
      {
        resolution: '720p HD',
        size: '1.1 GB',
        format: 'MP4',
        audio: 'Hindi Clean Stereo',
        servers: [
          { name: 'Mobile Direct Server', speed: '25 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-11',
    title: 'Pushpa 2: The Rule',
    originalTitle: 'పుష్ప: ది రూల్',
    description: 'Pushpa Raj solidifies his grip across international syndicate corridors as relentless law enforcement commissioner Bhanwar Singh Shekhawat seeks absolute retribution.',
    poster: '/src/assets/images/poster_bollywood_epic_1791117250110.jpg',
    backdrop: '/src/assets/images/hero_action_thriller_1791117236537.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    year: 2024,
    rating: 8.7,
    votesCount: '89.0k',
    language: 'Telugu (Hindi Dubbed)',
    genre: ['Action', 'Thriller', 'Drama'],
    runtime: '3h 12m',
    director: 'Sukumar',
    cast: ['Allu Arjun', 'Rashmika Mandanna', 'Fahadh Faasil'],
    type: 'Movie',
    category: 'South Indian',
    quality: '4K UHD',
    featured: false,
    isTrending: true,
    isLatest: false,
    created_at: '2024-12-05T12:00:00Z',
    downloads: [
      {
        resolution: '4K Ultra HD',
        size: '3.8 GB',
        format: 'MKV 10-Bit HEVC',
        audio: 'Hindi 5.1 DD Clean Dub + Telugu Original',
        servers: [
          { name: 'Super Fast Mirror', speed: '50 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' }
        ]
      },
      {
        resolution: '1080p FHD',
        size: '1.9 GB',
        format: 'MKV Dual Audio',
        audio: 'Hindi + Telugu Dual Audio',
        servers: [
          { name: 'Cloud Mirror Direct', speed: '35 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' }
        ]
      },
      {
        resolution: '720p HD',
        size: '920 MB',
        format: 'MP4 WebRip',
        audio: 'Hindi Stereo Clean',
        servers: [
          { name: 'Mobile Direct Server', speed: '20 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-12',
    title: 'Panchayat: Village Chronicles',
    originalTitle: 'पंचायत: ग्राम कथा',
    description: 'Season 3: Abhishek Tripathi navigates rural village politics, heartwarming community bonds, and civil service exams in Phulera village with humor and warmth.',
    poster: '/src/assets/images/poster_bollywood_epic_1791117250110.jpg',
    backdrop: '/src/assets/images/hero_cinematic_backdrop_1791117223849.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4',
    year: 2024,
    rating: 8.9,
    votesCount: '71.2k',
    language: 'Hindi',
    genre: ['Comedy', 'Drama'],
    runtime: 'Season 3 (8 Episodes)',
    director: 'Deepak Kumar Mishra',
    cast: ['Jitendra Kumar', 'Neena Gupta', 'Raghubir Yadav', 'Faisal Malik', 'Chandan Roy'],
    type: 'Web Series',
    category: 'Web Series',
    quality: '1080p WebRip',
    featured: false,
    isTrending: true,
    isLatest: false,
    created_at: '2024-05-28T10:00:00Z',
    downloads: [
      {
        resolution: '1080p FHD',
        size: '3.2 GB (Complete Season 3)',
        format: 'MKV WebRip All Episodes',
        audio: 'Hindi 5.1 DD',
        servers: [
          { name: 'Full Season Direct Link', speed: '45 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' }
        ]
      },
      {
        resolution: '720p HD',
        size: '1.6 GB (Batch Pack)',
        format: 'MP4 x264',
        audio: 'Hindi Stereo Clean',
        servers: [
          { name: 'Fast Direct Server', speed: '28 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-13',
    title: 'Stree 2: Sarkate Ka Aatank',
    originalTitle: 'स्त्री २: सरकटे का आतंक',
    description: 'Chanderi faces a terrifying new headless supernatural menace. Vicky, along with his eccentric friends and the mysterious woman, must unite once again to banish the dark curse.',
    poster: '/src/assets/images/poster_cyber_thriller_1791117262582.jpg',
    backdrop: '/src/assets/images/hero_action_thriller_1791117236537.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    year: 2024,
    rating: 8.2,
    votesCount: '68.5k',
    language: 'Hindi (Original)',
    genre: ['Comedy', 'Horror', 'Mystery'],
    runtime: '2h 27m',
    director: 'Amar Kaushik',
    cast: ['Rajkummar Rao', 'Shraddha Kapoor', 'Pankaj Tripathi', 'Aparshakti Khurana', 'Abhishek Banerjee'],
    type: 'Movie',
    category: 'Bollywood',
    quality: '4K UHD',
    featured: false,
    isTrending: true,
    isLatest: false,
    created_at: '2024-08-15T09:00:00Z',
    downloads: [
      {
        resolution: '4K Ultra HD',
        size: '3.1 GB',
        format: 'MKV 10-Bit HEVC',
        audio: 'Hindi Atmos Surround',
        servers: [
          { name: 'Ultra High-Speed Mirror', speed: '50 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
        ]
      },
      {
        resolution: '1080p FHD',
        size: '1.6 GB',
        format: 'MP4 WebRip',
        audio: 'Hindi 5.1 DD Clean',
        servers: [
          { name: 'Direct Download Server', speed: '32 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
        ]
      },
      {
        resolution: '720p HD',
        size: '820 MB',
        format: 'MP4',
        audio: 'Hindi AAC',
        servers: [
          { name: 'Mobile Direct Server', speed: '18 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-14',
    title: 'Manjummel Boys: The Chasm',
    originalTitle: 'മഞ്ഞുമ്മൽ ബോയ്സ്',
    description: 'Based on the astonishing true survival story: A group of childhood friends on a trip to Kodaikanal face the ultimate test of courage and brotherhood when one slips into Guna Caves.',
    poster: '/src/assets/images/poster_bollywood_epic_1791117250110.jpg',
    backdrop: '/src/assets/images/hero_action_thriller_1791117236537.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    year: 2024,
    rating: 8.6,
    votesCount: '52.3k',
    language: 'Malayalam (Hindi Dubbed)',
    genre: ['Adventure', 'Drama', 'Thriller'],
    runtime: '2h 15m',
    director: 'Chidambaram',
    cast: ['Soubin Shahir', 'Sreenath Bhasi', 'Balu Varghese', 'Ganapathi'],
    type: 'Movie',
    category: 'South Indian',
    quality: '1080p WebRip',
    featured: false,
    isTrending: false,
    isLatest: false,
    created_at: '2024-03-20T10:00:00Z',
    downloads: [
      {
        resolution: '1080p FHD',
        size: '1.8 GB',
        format: 'MKV Dual Audio',
        audio: 'Hindi Dubbed + Malayalam 5.1',
        servers: [
          { name: 'Cloud CDN Mirror', speed: '38 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
        ]
      },
      {
        resolution: '720p HD',
        size: '850 MB',
        format: 'MP4 WebRip',
        audio: 'Hindi Clean Stereo',
        servers: [
          { name: 'Mobile Direct Server', speed: '22 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-15',
    title: 'Sacred Legacy: The Chronicles',
    originalTitle: 'पवित्र विरासत',
    description: 'An investigative reporter in New Delhi unearths centuries-old classified government dossiers documenting secret occult societies and underground financial conduits.',
    poster: '/src/assets/images/poster_cyber_thriller_1791117262582.jpg',
    backdrop: '/src/assets/images/hero_cinematic_backdrop_1791117223849.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    year: 2025,
    rating: 8.5,
    votesCount: '27.4k',
    language: 'Hindi + English Sub',
    genre: ['Mystery', 'Thriller', 'Drama'],
    runtime: 'Season 1 (6 Episodes)',
    director: 'Anurag Kashyap',
    cast: ['Saif Ali Khan', 'Nawazuddin Siddiqui', 'Radhika Apte'],
    type: 'Web Series',
    category: 'Web Series',
    quality: '1080p WebRip',
    featured: false,
    isTrending: false,
    isLatest: true,
    created_at: '2025-01-05T14:00:00Z',
    downloads: [
      {
        resolution: '1080p FHD',
        size: '2.9 GB (Complete Series)',
        format: 'MKV WebRip All Episodes',
        audio: 'Hindi 5.1 DD',
        servers: [
          { name: 'Direct Cloud Mirror', speed: '40 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }
        ]
      }
    ]
  },
  {
    id: 'cine-16',
    title: 'Aavesham: College Underworld',
    originalTitle: 'ആവേശം',
    description: 'Three young engineering students moving to Bangalore seek protection from local bullies and end up befriending Ranga, an eccentric white-clad mob boss with a heart of gold.',
    poster: '/src/assets/images/poster_bollywood_epic_1791117250110.jpg',
    backdrop: '/src/assets/images/hero_action_thriller_1791117236537.jpg',
    trailer_url: 'https://www.youtube.com/embed/videoseries?list=PL6gx4Cwl9DGB4XWc4W3Xk5s6v87x2Gg5-',
    stream_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    year: 2024,
    rating: 8.4,
    votesCount: '46.1k',
    language: 'Malayalam (Hindi Dubbed)',
    genre: ['Comedy', 'Action'],
    runtime: '2h 38m',
    director: 'Jithu Madhavan',
    cast: ['Fahadh Faasil', 'Hipzster', 'Mithun Jai Shankar', 'Roshan Shanavas', 'Sajin Gopu'],
    type: 'Movie',
    category: 'South Indian',
    quality: '1080p WebRip',
    featured: false,
    isTrending: true,
    isLatest: false,
    created_at: '2024-04-11T12:00:00Z',
    downloads: [
      {
        resolution: '1080p FHD',
        size: '1.9 GB',
        format: 'MKV Dual Audio',
        audio: 'Hindi Dubbed 5.1 + Malayalam',
        servers: [
          { name: 'Ultra CDN Mirror', speed: '42 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
        ]
      },
      {
        resolution: '720p HD',
        size: '860 MB',
        format: 'MP4 WebRip',
        audio: 'Hindi Clean Stereo',
        servers: [
          { name: 'Direct Download Server', speed: '25 MB/s', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }
        ]
      }
    ]
  }
];

export const GENRE_LIST = [
  'All',
  'Action',
  'Adventure',
  'Comedy',
  'Crime',
  'Drama',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Thriller',
  'Animation',
  'Fantasy',
  'Mystery'
] as const;

export const CATEGORY_LIST = [
  'All',
  'Bollywood',
  'Hollywood',
  'South Indian',
  'Hindi Dubbed',
  'Web Series'
] as const;

export const LANGUAGE_LIST = [
  'All',
  'Hindi',
  'English',
  'Dual Audio',
  'Tamil',
  'Telugu',
  'Malayalam',
  'Punjabi',
  'Bengali'
] as const;

export const YEAR_LIST = [
  'All',
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2020-2021',
  '2010s',
  'Classics'
] as const;
