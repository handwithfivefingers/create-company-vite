import { defineConfig, loadEnv } from 'vite'
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

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  let configs = {
    // define: {
    //   VITE__APP_ENV__: { ...env },
    // },
    envPrefix: ['MAIL_', 'GG_', 'VITE_'],
    plugins: [react({})],
    root: '.',
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    server: {
      port: 3003,
    },
    // esbuild: {
    //   jsxInject: ``,
    // },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      sourcemap: false,
      treeshake: true,
      reportCompressedSize: false,
      commonjsOptions: {
        sourceMap: false,
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: globalVendorPackages,
            //       ...renderChunks(dependencies),
          },
        },
      },
    },
  }

  if (command === 'serve') {
    // dev build
    return {
      ...configs,
      // optimizeDeps: {
      //   force: true, // --> Force clear cache
      // },
    }
  } else {
    // command === 'build'

    return {
      ...configs,
      // optimizeDeps: {
      //   force: true, // --> Force clear cache
      // },
    }
  }
})
