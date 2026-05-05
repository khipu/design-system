/**
 * Vitest test setup
 * Configures @testing-library/jest-dom matchers and polyfills
 */
import '@testing-library/jest-dom';

// Polyfill ResizeObserver for Radix UI components (jsdom doesn't provide it)
if (!(globalThis as any).ResizeObserver) {
  (globalThis as any).ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}
