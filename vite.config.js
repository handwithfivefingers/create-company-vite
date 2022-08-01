import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// https://vitejs.dev/config/
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
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    },
    outDir: 'dist',
  },
})
