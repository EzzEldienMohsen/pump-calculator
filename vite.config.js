import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    exclude: ['pdfjs-dist']
  },
  resolve: {
    alias: {
      'pdfjs-dist/build/pdf.worker.min.mjs': resolve(__dirname, 'node_modules/pdfjs-dist/build/pdf.worker.min.mjs')
    }
  }
})
