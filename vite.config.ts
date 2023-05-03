import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

/* eslint-disable-next-line */
export default defineConfig({
  plugins: [react(), eslint()],
});
