import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    allowedHosts: [
      'devhub.com',
      'devhub.pro',
      'api.devhub.com',
      'api.devhub.pro',
      'www.devhub.com',
      'www.devhub.pro',
      'www.api.devhub.com',
      'www.api.devhub.pro',
    ],
  },
})