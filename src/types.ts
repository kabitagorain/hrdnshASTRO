export interface Pricing {
  oneTime: number;
  weekly: number;
}

export interface PaymentLinks {
  default: {
    oneTime: string;
    weekly: string;
  };
  [key: string]: any;
}

export interface BusinessOwner {
  summary: string;
  benefits: string[];
}

export interface Developer {
  summary: string;
  benefits: string[];
}

export interface Service {
  id: string;
  number: string;
  category: string;
  updatedAt: string;
  title: string;
  tagline: string;
  icon: string;
  pricing: Pricing;
  payment_links: PaymentLinks;
  businessOwner: BusinessOwner;
  developer: Developer;
  deliverables: string[];
  timeline: string;
  techStack: string[];
}

export interface Profile {
  name: string;
  fname: string;
  lname: string;
  apndx: string;
  title: string;
  tagline: string;
  email: string;
  phone: string;
  upwork: string;
  location: string;
  url: string;
  bio: string[];
  techStack: {
    category: string;
    items: string[];
  }[];
  stats: {
    label: string;
    value: string;
  }[];
}

export interface SiteData {
  siteName: string;
  brandName: string;
  url: string;
  email: string;
  phone: string;
  whatsapp: string;
  upwork: string;
  location: string;
  defaultOgImage: string;
  defaultDescription: string;
  serviceTypes: string[];
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  service: string;
}

export interface RecommendationItem {
  name: string;
  tagline: string;
  description: string;
  url: string;
  badge: string;
  badgeColor: string;
  pros: string[];
  startingPrice: string;
}

export interface RecommendationCategory {
  category: string;
  icon: string;
  items: RecommendationItem[];
}
