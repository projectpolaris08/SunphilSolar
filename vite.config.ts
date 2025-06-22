import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import sitemap from "vite-plugin-sitemap";

// ✅ Safely load JSON without import assertions
const blogPostSlugs: string[] = JSON.parse(
  fs.readFileSync("./src/data/blogPostSlugs.json", "utf-8")
);

// Add all project routes
const projectRoutes = [
  "vista-verde-north-caloocan",
  "sariaya-quezon",
  "goa-camarines-sur",
  "cabanatuan-nueva-ecija",
  "porac-pampanga",
  "birvillage-qc",
  "cabanatuan-nueva-ecija-6kw",
  "lubao-pampanga",
  "umingan-pangasinan",
  "bacoor-cavite",
  "bagumbong-caloocan",
  "lemery-batangas",
  "pandacan-manila",
  "alisha-nueva-ecija",
  "iba-zambales",
  "binangonan-rizal",
  "siruma-camarines-sur",
  "san-antonio-quezon",
  "upper-bicutan-taguig",
  "taytay-rizal",
  "batasan-qc",
  "san-mateo-rizal",
  "san-mateo-rizal-2",
  "lemery-batangas-2",
  "san-fernando-pampanga",
];

const staticRoutes = [
  "/products",
  "/calculator",
  "/about",
  "/contact",
  "/blog",
  "/solarprojects",
];

const dynamicRoutes = [
  ...blogPostSlugs.map((slug: string) => `/blog/${slug}`),
  ...projectRoutes.map((projectId: string) => `/solarprojects/${projectId}`),
];

const allRoutes = ["/", ...staticRoutes, ...dynamicRoutes];

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: "https://sunphilsolar.com",
      dynamicRoutes: allRoutes,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
    },
  },
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
