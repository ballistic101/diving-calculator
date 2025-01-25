import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills()  
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@models': path.resolve(__dirname, 'src/models'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      path: 'rollup-plugin-node-polyfills/polyfills/path',
    }
  } 
})