import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // Correct import

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Corrected URL
        secure: false,
        changeOrigin: true, // Optional, but can help with CORS issues
      },
    },
  },
  plugins: [react()],
});
