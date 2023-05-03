/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vitest/config';
/// <reference types="vitest" />
/// <reference types="vite/client" />
/* eslint-disable-next-line */
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup-test.ts'],
    // setupFiles: ['./src/setup-test.ts', 'jest-canvas-mock'],
  },
});
