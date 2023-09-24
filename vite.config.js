// import { defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
// import { dependencies } from './package.json'
// import { visualizer } from 'rollup-plugin-visualizer'
// https://vitejs.dev/config/

// const globalVendorPackages = ['react', 'react-dom', 'react-router-dom']

// function renderChunks(deps) {
//   // This seperate Deps as single files
//   let chunks = {}
//   Object.keys(deps).forEach((key) => {
//     // console.log('deps', key)
//     if (globalVendorPackages.includes(key)) return
//     chunks[key] = [key]
//   })
//   return chunks
// }

export default defineConfig(({ command, mode }) => {
  let configs = {
    envPrefix: ['MAIL_', 'GG_', 'VITE_'],
    // plugins: [react({}), visualizer(), splitVendorChunkPlugin()],
    plugins: [react({})],
    root: '.',
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
    },
    server: {
      port: 3003,
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      sourcemap: false,
      treeshake: true,
      reportCompressedSize: false,
      commonjsOptions: {
        sourceMap: false,
      },
      // rollupOptions: {
      //   output: {
      //     manualChunks: {
      //       ...renderChunks(dependencies),
      //       vendor: globalVendorPackages,
      //     },
      //   },
      // },
    },
  }

  if (command === 'serve') {
    // dev build
    return {
      ...configs,
    }
  } else {
    // command === 'build'
    return {
      ...configs,
      esbuild: {
        drop: ['console', 'debugger'],
      },
    }
  }
})
