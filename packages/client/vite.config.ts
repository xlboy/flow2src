import react from '@vitejs/plugin-react';
import path from 'path';
import { inspectorServer } from 'react-dev-inspector/plugins/vite';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const pathResolve = (dir: string) => path.resolve(__dirname, '.', dir);

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 2999
  },
  plugins: [
    react({
      babel: { plugins: [] }
    }),
    // https://github.com/pd4d10/vite-plugin-svgr
    svgr(),
    // https://github.com/zthxxx/react-dev-inspector#usage-with-vite2
    inspectorServer()
  ],
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: pathResolve('src') + '/'
      }
    ]
  },
  css: {
    preprocessorOptions: {
      less: {
        // modifyVars: { '@primary-color': '#13c2c2' },
        javascriptEnabled: true
      }
    }
  }
});
