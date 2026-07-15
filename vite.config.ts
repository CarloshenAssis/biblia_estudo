import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icons/app-icon.svg', 'icons/app-icon-full.svg'],
      manifest: {
        name: 'Bíblia Expositor',
        short_name: 'Expositor',
        description: 'A Palavra. Explicada. Aplicada. Transformadora.',
        lang: 'pt-BR',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#F4EFE4',
        theme_color: '#2A1D12',
        icons: [
          { src: '/icons/icon-48.png?v=3', sizes: '48x48', type: 'image/png' },
          { src: '/icons/icon-72.png?v=3', sizes: '72x72', type: 'image/png' },
          { src: '/icons/icon-96.png?v=3', sizes: '96x96', type: 'image/png' },
          { src: '/icons/icon-128.png?v=3', sizes: '128x128', type: 'image/png' },
          { src: '/icons/icon-144.png?v=3', sizes: '144x144', type: 'image/png' },
          { src: '/icons/icon-152.png?v=3', sizes: '152x152', type: 'image/png' },
          { src: '/icons/icon-192.png?v=3', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-384.png?v=3', sizes: '384x384', type: 'image/png' },
          { src: '/icons/icon-512.png?v=3', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/maskable-512.png?v=3', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallbackDenylist: [/^\/icons\//],
        skipWaiting: true,
        clientsClaim: true,
        cleanupOutdatedCaches: true,
      },
    }),
  ],
});
