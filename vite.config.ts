import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import sitemap from 'vite-plugin-sitemap';

// ✅ Safely load JSON without import assertions
const blogPostSlugs: string[] = JSON.parse(
  fs.readFileSync('./src/data/blogPostSlugs.json', 'utf-8')
);

const staticRoutes = [
  '/products',
  '/calculator',
  '/about',
  '/contact',
  '/blog',
];

const dynamicRoutes = blogPostSlugs.map((slug: string) => `/blog/${slug}`);
const allRoutes = ['/', ...staticRoutes, ...dynamicRoutes];

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://sunphilsolar.com',
      dynamicRoutes: allRoutes,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
