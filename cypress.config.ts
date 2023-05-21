import { defineConfig } from 'cypress';

/* eslint-disable-next-line */
export default defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    baseUrl: 'http://localhost:5173/',
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
