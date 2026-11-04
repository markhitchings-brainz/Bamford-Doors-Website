import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

export default defineConfig(async ({ command }) => {
  const rawPort = process.env.PORT;
  let port: number | undefined;

  if (rawPort) {
    port = Number(rawPort);
    if (Number.isNaN(port) || port <= 0) {
      throw new Error(`Invalid PORT value: "${rawPort}"`);
    }
  } else if (command === 'serve') {
    throw new Error(
      'PORT environment variable is required but was not provided.',
    );
  }

  const basePath = process.env.BASE_PATH || (command === 'build' ? '/' : null);

  if (!basePath) {
    throw new Error(
      'BASE_PATH environment variable is required but was not provided.',
    );
  }

  return {
    base: basePath,
    plugins: [
      {
        name: 'static-page-preview-fallback',
        configurePreviewServer(server) {
          // Vite normally falls back to index.html, which is now a rendered
          // homepage. Match the production host's client-only fallback instead.
          return () => {
            server.middlewares.use((req, _res, next) => {
              const originalPath = new URL(req.originalUrl || '/', 'http://preview.local').pathname;
              if (req.url?.split('?')[0] === '/index.html' && originalPath !== '/' && originalPath !== '/index.html') {
                req.url = '/spa.html';
              }
              next();
            });
          };
        },
      },
      react(),
      tailwindcss(),
      runtimeErrorOverlay(),
      ...(process.env.NODE_ENV !== 'production' &&
      process.env.REPL_ID !== undefined
        ? [
            await import('@replit/vite-plugin-cartographer').then((m) =>
              m.cartographer({
                root: path.resolve(import.meta.dirname, '..'),
              }),
            ),
            await import('@replit/vite-plugin-dev-banner').then((m) =>
              m.devBanner(),
            ),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, 'src'),
        '@assets': path.resolve(
          import.meta.dirname,
          '..',
          '..',
          'attached_assets',
        ),
      },
      dedupe: ['react', 'react-dom', '@tanstack/react-query'],
    },
    // The generated API client lives in a workspace package with a different
    // React peer resolution. Process its query hooks through Vite so SSR uses
    // this app's single React instance, just like the browser build.
    ssr: {
      noExternal: ['@tanstack/react-query', '@tanstack/query-core'],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, 'dist/public'),
      emptyOutDir: true,
    },
    server: {
      ...(port !== undefined ? { port } : {}),
      strictPort: true,
      host: '0.0.0.0',
      allowedHosts: true,
      fs: {
        strict: true,
      },
    },
    preview: {
      ...(port !== undefined ? { port } : {}),
      host: '0.0.0.0',
      allowedHosts: true,
    },
  };
});
