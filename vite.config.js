import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import {resolve} from 'path'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import {createStyleImportPlugin, ElementPlusResolve} from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true,
    }),

    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      // 配置文件生成位置
      dts: 'src/auto-import.d.ts',
      // ui库解析器
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),

    Components({
      // 指定组件位置，默认是src/components
      dirs: ['src/components'],
      // 搜索子目录
      deep: true,
      // 组件的有效文件扩展名
      extensions: ['vue'],
      // 配置文件生成位置
      dts: 'src/components.d.ts',
      // 需要 Babel 来为 Vue 2 进行转换，出于性能考虑，它默认处于禁用状态。
      directives: true,
      // ui库解析器
      resolvers: [
        ElementPlusResolver({
          importStyle: 'sass',
        }),
      ],
    }),

    createStyleImportPlugin({
      // ui库解析器
      resolves: [
        ElementPlusResolve(),
      ],
      // 自定义规则
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            name = name.substring(3, name.length)
            return `element-plus/theme-chalk/src/${name}.scss`
          },
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.json', '.sass', '.scss', '.less'],
    alias: {
      '@': resolve(__dirname, '.', 'src'),
      '~': resolve(__dirname, 'src', 'assets'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        // 导入全局 scss
        additionalData: `@use "~/css/style.scss" as *;`,
      },
    },
  },
  optimizeDeps: {
    include: ['element-plus', '@element-plus/icons-vue'],
  },
  base: './',
  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  // prevent vite from obscuring rust errors
  clearScreen: false,
  // tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
  },
  // to make use of `TAURI_DEBUG` and other env variables
  // https://tauri.studio/v1/api/config#buildconfig.beforedevcommand
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    outDir: 'dist',
    // Tauri supports es2021
    target: ['es2021', 'chrome100', 'safari13'],
    // don't minify for debug builds
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // produce sourcemaps for debug builds
    sourcemap: !!process.env.TAURI_DEBUG,
    emptyOutDir: false,
    rollupOptions: {
      output: {},
    },
  },
})
