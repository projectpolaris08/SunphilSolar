import { ReactNode } from "react";

export interface BlogPost {
  id: number;
  title: string;
  author: string;
  date: string; // ISO format (YYYY-MM-DD)
  slug: string;
  tags: string[];
  excerpt: string;
  metaDescription: string;
  featuredImage?: {
    url: string;
    alt: string;
    width?: number;
    height?: number;
  };
  fullContent: ReactNode;
  readingTime?: number;
  isFeatured?: boolean;
}

// Export everything to make sure the types are accessible
export * from './blog';