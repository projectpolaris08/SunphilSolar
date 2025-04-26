import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path'; // Add this import

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Add this alias
      '@components': path.resolve(__dirname, './src/components'),
    }
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});