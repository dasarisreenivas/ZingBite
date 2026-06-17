import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/zingbite/',
  server: {
    proxy: {
      '/zingbite/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/zingbite/ws': {
        target: 'ws://localhost:8080',
        ws: true
      }
    }
  }
})
