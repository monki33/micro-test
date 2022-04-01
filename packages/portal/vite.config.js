import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  base: `${loadEnv(mode, process.cwd()).VITE_CONTEXT}`,
  server: {
    port: 1000,
  },
  resolve: {
    alias: {
      '@': `${resolve(__dirname, 'src')}/`,
      '@img': `${resolve(__dirname, 'src/assets/images')}/`,
      '@style': `${resolve(__dirname, 'src/assets/styles')}/`,
      '@comp': `${resolve(__dirname, 'src/components')}/`,
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => /^micro-app/.test(tag),
        },
      },
    }),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'vuex',
        '@vueuse/core',
      ],
      dts: true,
    }),
    Components({
      dirs: ['src/components'],
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
    Pages({
      pagesDir: 'src/views',
    }),
    Layouts({
      pagesDir: 'src/layouts',
      defaultLayout: 'Default',
    }),
  ],
})
