import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The contact form posts to /api/contact. In development that is proxied to
// the Node service in /server (run it with `npm start` there) so the browser
// stays same-origin and CORS never enters the picture. In production either
// put the two behind one domain with the same /api prefix, or point
// VITE_CONTACT_ENDPOINT at the service's full URL and add the site's origin
// to its ALLOWED_ORIGINS.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: process.env.CONTACT_SERVER_URL || 'http://localhost:8787',
        changeOrigin: true,
      },
    },
  },
});
