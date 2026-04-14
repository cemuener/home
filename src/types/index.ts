// TypeScript type definitions for the project

export interface AboutData {
  name: string;
  tagline: string;
  bio: string;
  highlights: string[];
  socialLinks: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'mobile';
  image: string;
  screenshots?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  startDate: string;
  endDate?: string;
}

export interface Mix {
  id: string;
  title: string;
  date: string; // ISO format: "2026-03-15"
  duration: string; // Format: "62:45"
  coverImage: string; // Path: "/assets/images/dj/..."
  embedUrl: string; // Soundcloud/Mixcloud URL
  genres: string[]; // ["House", "Afro", "Oriental"]
  featured: boolean;
}

export interface Event {
  id: string;
  title: string;
  date: string; // ISO format: "2026-06-20"
  venue: string;
  type: 'wedding' | 'birthday' | 'club' | 'corporate';
  status: 'upcoming' | 'past';
  description?: string;
}

// Contact Form Types
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CyclingClass {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  benefits: string[];
  image: string;
  price: number;
  available: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  service: 'dj' | 'cycling' | 'development';
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  photo?: string;
  date: string;
  featured: boolean;
  videoUrl?: string;
}

