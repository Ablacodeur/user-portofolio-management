import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/uploads': '', // Redirige les requêtes vers le backend
    },
  },
  define: {
    'import.meta.env': process.env, // Charge les variables d'environnement
  },
})