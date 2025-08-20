import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

export default defineConfig({
  base: './',
  path: path.resolve(__dirname, './dist'),
  server: {
    host: true,
    port: 1000
  },
  plugins: [
    vue(),
    AutoImport(
      {
        imports: [
          'vue',
          'vue-router',
          'pinia',
        ],
        dirs: [
          'src/composables',
          'src/stores',
          'src/composables/**'
        ],
        dts: './auto-imports.d.ts'
      }
    ),
    Components({
      dirs: ['src/components', 'src/views'],
      extensions: ['vue'],
      deep: true,
      dts: './components.d.ts'
    })
  ]
})