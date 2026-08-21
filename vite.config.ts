import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const socialUrl = (process.env.VITE_SITE_URL || '.').replace(/\/$/, '');

export default defineConfig({
  base: './',
  plugins: [
    react(),
    {
      name: 'birthday-social-url',
      transformIndexHtml(html) {
        return html.replaceAll('__SITE_URL__', socialUrl);
      },
    },
  ],
  build: {
    target: 'es2022',
  },
});
