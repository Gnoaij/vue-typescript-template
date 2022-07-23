import { fileURLToPath, URL } from 'url'

import { defineConfig, splitVendorChunkPlugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'

import compression from 'vite-plugin-compression'

import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import icons from 'unplugin-icons/vite'
import iconsResolver from 'unplugin-icons/resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy(),
    splitVendorChunkPlugin(),
    compression(),
    autoImport({
      include: [/\.[jt]sx?$/, /\.vue$/],
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true,
        globalsPropValue: 'readonly'
      }
    }),
    components({
      resolvers: [
        iconsResolver({
          prefix: 'icon',
          alias: {
            ms: 'material-symbols'
          }
        })
      ]
    }),
    icons()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use '@/assets/css/_/mixins' as M;
          @use '@/assets/css/_/themes' as T;
          @use '@/assets/css/_/variables' as V;
        `
      }
    }
  },
  server: {
    port: 8080,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        // manualChunks: (id: string) => {
        //   const match = /\/node_modules\/([^/]+)\//.exec(id)
        //   if (match) {
        //     switch (match[1]) {
        //       case '@vue':
        //       case 'vue-router':
        //       case 'pinia':
        //       case 'axios':
        //         return match[1]
        //       default:
        //         return 'vendor'
        //     }
        //   }
        // },
        assetFileNames: ({ name }) => {
          let dir = 'assets'
          if (!name) {
            return `${dir}/[name].[hash].[ext]`
          }
          if (/\.css$/i.test(name)) {
            dir = 'css'
          } else if (/\.(png|jpe?g|gif|svg)$/i.test(name)) {
            dir = 'img'
          } else if (/\.(eot|otf|ttf|woff2?)$/i.test(name)) {
            dir = 'font'
          } else if (/\.(mp3|mp4|webm|ogg|wav|flac|aac)$/i.test(name)) {
            dir = 'media'
          }
          return `${dir}/[name].[hash].[ext]`
        },
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js'
      }
    }
  }
})
