import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import sitemap from "vite-plugin-sitemap";

// ✅ Safely load JSON without import assertions
const blogPostSlugs: string[] = JSON.parse(
  fs.readFileSync("./src/data/blogPostSlugs.json", "utf-8")
);

// ✅ Dynamically read project IDs from projects.ts
function getProjectIdsFromProjects(): string[] {
  const projectsContent = fs.readFileSync("./src/data/projects.ts", "utf-8");
  const regex = /id:\s*"([^"]+)"/g;
  const matches = [...projectsContent.matchAll(regex)];
  return matches.map((match) => match[1]);
}

const projectRoutes = getProjectIdsFromProjects();

const staticRoutes = [
  "/products",
  "/calculator",
  "/about",
  "/contact",
  "/blog",
  "/solarprojects",
  "/case-studies",
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
