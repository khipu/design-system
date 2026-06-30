/**
 * Khipu Design System
 *
 * A comprehensive design system for the Khipu payment platform.
 * Built with TypeScript, React, and BeerCSS.
 *
 * IMPORTANT: Consumers must load the CSS bundle:
 *   import '@khipu/design-system/beercss/css';
 *
 * @packageDocumentation
 */

// =============================================================================
// THEME
// =============================================================================

export { KdsThemeProvider, type KdsThemeProviderProps } from './theme/KdsThemeProvider';

// =============================================================================
// DESIGN TOKENS
// =============================================================================

export {
  // Token collections
  tokens,
  tokensByMode,
  colorsByMode,

  // Individual token categories
  colors,
  fontFamilies,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  typography,
  spacing,
  semanticSpacing,
  borderRadius,
  shadows,
  zIndex,
  transitions,
  breakpoints,

  // Types
  type Tokens,
  type TokensByMode,
  type Colors,
  type Typography as TypographyTokens,
  type ThemeMode,
} from './tokens';

// =============================================================================
// CORE COMPONENTS
// =============================================================================

export * from './components/core';

// =============================================================================
// DOMAIN COMPONENTS
// =============================================================================

export * from './components/domain';

// =============================================================================
// HOOKS
// =============================================================================

export {
  useCopyToClipboard,
  useAutoHide,
  useCountdown,
  useTabsKeyboard,
  useStickyInvoiceCollapse,
  useExpandToggle,
} from './components/core/hooks';
export type { UseStickyInvoiceCollapseOptions } from './components/core/hooks';
export type {
  UseExpandToggleOptions,
  UseExpandToggleResult,
  ExpandToggleProps,
  ExpandPanelProps,
} from './components/core/hooks';

// =============================================================================
// UTILITIES
// =============================================================================

export { clsx, getContrastColor, lighten } from './components/core/utils';
