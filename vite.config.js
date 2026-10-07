import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  // Relative asset URLs support both GitHub Pages project paths and custom domains.
  base: './',
  plugins: [vue(), tailwindcss()],
})
