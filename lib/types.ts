/**
 * Type definitions for CV Portfolio data structures
 */

export interface Experience {
  role: string;
  company: string;
  period: string;
  logo: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

export interface Project {
  title: string;
  description: string;
  stack: string[];
  challenges: string[];
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  thumbnail: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  photo: string;
  text: string;
  rating: number;
}

export interface Degree {
  title: string;
  institution: string;
  year: string;
  icon: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  badge: string;
  verifyUrl: string;
}

export interface Education {
  degrees: Degree[];
  certifications: Certification[];
}

export interface Skill {
  skill: string;
  level: number;
  fullMark: number;
  category: "cloud" | "devops" | "programming" | "ai" | "soft";
}

export interface AboutMe {
  title: string;
  subtitle: string;
  bio: string;
  values: string[];
  achievements: string[];
  cta: string;
}
