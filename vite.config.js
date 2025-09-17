import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        // Remove the circular import - main.scss is already imported in App.jsx
        // additionalData can be used for global variables/mixins if needed
      },
    },
  },
})
