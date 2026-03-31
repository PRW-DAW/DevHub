import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
