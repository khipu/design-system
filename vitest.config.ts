import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    // CSS contract tests read the DS stylesheet as text (`?raw`); vitest stubs CSS to '' otherwise.
    css: { include: [/khipu-components\.css/] },
  },
});
