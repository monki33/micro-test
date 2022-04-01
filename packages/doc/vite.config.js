import { join, resolve } from 'path'
import { writeFileSync } from 'fs'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { baseProd } from '@mictest/library/config/vite.build'

// https://vitejs.dev/config/
export default ({ mode }) => defineConfig({
  base: `${mode === 'production' ? baseProd : ''}/${loadEnv(mode, process.cwd()).VITE_CONTEXT}/`,
  server: {
    port: 3034,
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
    vue(),
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
    // 自定义插件
    (function() {
      let basePath = ''
      return {
        name: 'vite:micro-app',
        apply: 'build',
        configResolved(config) {
          basePath = `${config.base}${config.build.assetsDir}/`
        },
        writeBundle(options, bundle) {
          for (const chunkName in bundle) {
            if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
              const chunk = bundle[chunkName]
              if (chunk.fileName && chunk.fileName.endsWith('.js')) {
                chunk.code = chunk.code.replace(/(from|import\()(\s*['"])(\.\.?\/)/g, (all, $1, $2, $3) => {
                  return all.replace($3, new URL($3, basePath))
                })
                const fullPath = join(options.dir, chunk.fileName)
                writeFileSync(fullPath, chunk.code)
              }
            }
          }
        },
      }
    })(),
  ],
})
