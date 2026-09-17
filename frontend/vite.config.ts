import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  server: {
    port: 5185,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/api': process.env.BACKEND_URL || 'http://localhost:5085',
    },
  },
});
