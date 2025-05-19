import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // 设置路径别名
      components: fileURLToPath(new URL('./src/components', import.meta.url)),
      composables: fileURLToPath(new URL('./src/composables', import.meta.url)),
      assets: fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  }
})
