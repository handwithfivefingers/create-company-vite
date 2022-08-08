import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { dependencies } from './package.json'
// https://vitejs.dev/config/

const globalVendorPackages = ['react', 'react-dom', 'react-router-dom']

function renderChunks(deps) {
  let chunks = {}
  Object.keys(deps).forEach((key) => {
    if (globalVendorPackages.includes(key)) return
    chunks[key] = [key]
  })
  return chunks
}

export default defineConfig({
  plugins: [react({})],
  root: '.',
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: 3003,
  },
  esbuild: {
    jsxInject: ``,
  },
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: false,
    reportCompressedSize: false,
    commonjsOptions: {
      sourceMap: false,
    },
    // rollupOptions: {
    //   output: {
    //     manualChunks: {
    //       vendor: globalVendorPackages,
    //       // ...renderChunks(dependencies),
    //     },
    //   },
    // },
  },
})
