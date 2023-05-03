import { defineConfig } from 'cypress';

/* eslint-disable-next-line */
export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
