// import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { dependencies } from './package.json'
import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/

const globalVendorPackages = ['react', 'react-dom', 'react-router-dom']
const __dirname = new URL('.', import.meta.url).pathname
console.log('__dirname', __dirname)
function renderChunks(deps) {
  let chunks = {}
  Object.keys(deps).forEach((key) => {
    if (globalVendorPackages.includes(key)) return
    chunks[key] = [key]
  })
  return chunks
}

export default defineConfig(({ command }) => {
  let configs = {
    envPrefix: ['MAIL_', 'GG_', 'VITE_'],
    plugins: [
      react({}),
      visualizer({
        emitFile: true,
        filename: 'stats.html',
      }),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: [path.resolve(__dirname, 'src/test/setup/setup.js')],
    },
    root: '.',
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    server: {
      watch: {
        usePolling: true,
      },
      host: true,
      strictPort: true,
      port: 3003,
    },
    build: {
      outDir: 'www',
      minify: 'esbuild',
      sourcemap: false,
      treeshake: true,
      reportCompressedSize: false,
      commonjsOptions: {
        sourceMap: false,
      },
    },
  }

  if (command === 'serve') {
    return {
      ...configs,
    }
  } else {
    return {
      ...configs,
      esbuild: {
        drop: ['console', 'debugger'],
      },
    }
  }
})
