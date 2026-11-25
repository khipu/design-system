import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'jsdom',
          globals: true,
          setupFiles: ['./src/test-setup.ts'],
          // CSS contract tests read the DS stylesheet as text (`?raw`); vitest stubs CSS to '' otherwise.
          css: { include: [/khipu-components\.css/] },
        },
      },
      {
        extends: true,
        plugins: [
          // Runs each story's play function (and a11y checks) as a Vitest test.
          // See: https://storybook.js.org/docs/writing-tests/integrations/vitest-addon
          storybookTest({ configDir: path.join(dirname, '.storybook') }),
        ],
        // Pre-bundle these so Vite doesn't discover-then-reload mid-run: on a cold
        // cache (every CI job) that reload kills the browser session outright
        // ("Vite unexpectedly reloaded a test" / "Browser connection was closed").
        optimizeDeps: {
          include: [
            'react',
            'react-dom',
            'react-dom/client',
            'react/jsx-dev-runtime',
            'react/jsx-runtime',
            'clsx',
            '@radix-ui/react-dialog',
            '@radix-ui/react-select',
            '@radix-ui/react-tooltip',
          ],
        },
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
});
