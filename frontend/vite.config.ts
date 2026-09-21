import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/dash-compras-sla/',
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
      '/dash-compras-sla/api': {
        target: process.env.BACKEND_URL || 'http://localhost:5085',
        rewrite: (path) => path.replace(/^\/dash-compras-sla/, ''),
      },
    },
  },
});
