/**
 * Khipu Design System - Design Tokens
 * Extracted from Figma: Pagos Automáticos - MUI v610
 *
 * These tokens define the visual language of the Khipu payment platform.
 * All components should reference these tokens instead of hardcoded values.
 *
 * THEME MODES:
 * This token system supports both light and dark modes.
 * Currently only light mode is fully implemented from Figma.
 * Dark mode tokens are prepared for future implementation.
 */

// =============================================================================
// COLOR TOKENS - LIGHT MODE
// =============================================================================

const lightModeColors = {
  // Primary palette - Purple (Khipu brand)
  primary: {
   main: '#4CAF50',      // ← ACTUAL: Verde
    light: '#81C784',
    dark: '#388E3C',
    contrastText: '#FFFFFF',
    states: {
      hover: 'rgba(131, 71, 173, 0.04)',
      selected: 'rgba(131, 71, 173, 0.08)',
      focus: 'rgba(131, 71, 173, 0.12)',
      focusVisible: 'rgba(131, 71, 173, 0.30)',
      outlinedBorder: 'rgba(131, 71, 173, 0.50)',
    },
  },

  // Secondary palette - Cyan/Turquoise
  secondary: {
    main: '#3CB4E5',
    light: '#6AC6EB',
    dark: '#198EBE',
    contrastText: '#FFFFFF',
  },

  // Text colors (based on black with opacity)
  text: {
    primary: 'rgba(0, 0, 0, 0.87)',
    secondary: 'rgba(0, 0, 0, 0.60)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    hint: 'rgba(0, 0, 0, 0.38)',
  },

  // Background colors
  background: {
    default: '#FFFFFF',
    paper: '#FFFFFF',
    elevated: '#FAFAFA',
  },

  // Action colors
  action: {
    active: 'rgba(0, 0, 0, 0.56)',
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.38)',
    disabledBackground: 'rgba(0, 0, 0, 0.12)',
    focus: 'rgba(0, 0, 0, 0.12)',
  },

  // Divider
  divider: 'rgba(0, 0, 0, 0.12)',

  // Component-specific colors
  components: {
    input: {
      outlined: {
        enabledBorder: 'rgba(0, 0, 0, 0.23)',
        hoverBorder: 'rgba(0, 0, 0, 0.87)',
      },
    },
  },
} as const;

// =============================================================================
// COLOR TOKENS - DARK MODE (Prepared for future implementation)
// =============================================================================

const darkModeColors = {
  // Primary palette - Purple (Khipu brand) - From Figma K-Tokens
  primary: {
    main: '#E3B5FF',
    light: '#F1D6FF',
    dark: '#4C0676',
    contrastText: 'rgba(76, 6, 118, 0.87)',
    states: {
      hover: 'rgba(227, 181, 255, 0.08)',
      selected: 'rgba(227, 181, 255, 0.16)',
      focus: 'rgba(227, 181, 255, 0.24)',
      focusVisible: 'rgba(227, 181, 255, 0.40)',
      outlinedBorder: 'rgba(227, 181, 255, 0.50)',
    },
  },

  // Secondary palette - Cyan/Turquoise - From Figma K-Tokens
  secondary: {
    main: '#B5EAFF',
    light: '#D6F3FF',
    dark: '#065676',
    contrastText: 'rgba(6, 86, 118, 0.87)',
  },

  // Text colors (based on white with opacity) - From Figma K-Tokens
  text: {
    primary: 'rgba(255, 255, 255, 1)',
    secondary: 'rgba(255, 255, 255, 0.70)',
    disabled: 'rgba(255, 255, 255, 0.38)',
    hint: 'rgba(255, 255, 255, 0.38)',
  },

  // Background colors - From Figma K-Tokens
  background: {
    default: '#181818',
    paper: '#121212',
    elevated: '#2C2C2C',
  },

  // Action colors (based on white with opacity) - From Figma K-Tokens
  action: {
    active: 'rgba(255, 255, 255, 0.56)',
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.38)',
    disabledBackground: 'rgba(255, 255, 255, 0.12)',
    focus: 'rgba(255, 255, 255, 0.12)',
  },

  // Divider
  divider: 'rgba(255, 255, 255, 0.12)',

  // Component-specific colors - From Figma K-Tokens
  components: {
    input: {
      outlined: {
        enabledBorder: 'rgba(255, 255, 255, 0.23)',
        hoverBorder: 'rgba(255, 255, 255, 1)',
      },
    },
  },
} as const;

// =============================================================================
// SEMANTIC COLORS (Same in both light and dark mode)
// =============================================================================

const semanticColors = {
  success: {
    main: '#2E7D32',
    light: '#4CAF50',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },

  warning: {
    main: '#ED6C02',
    light: '#FF9800',
    dark: '#E65100',
    contrastText: '#FFFFFF',
  },

  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
    contrastText: '#FFFFFF',
  },

  info: {
    main: '#0288D1',
    light: '#03A9F4',
    dark: '#01579B',
    contrastText: '#FFFFFF',
  },
} as const;

// =============================================================================
// COLOR EXPORTS
// =============================================================================

/**
 * Color tokens organized by theme mode
 */
export const colorsByMode = {
  light: lightModeColors,
  dark: darkModeColors,
} as const;

/**
 * Default color export (light mode for backward compatibility)
 *
 * @deprecated Use `colorsByMode.light` or `colorsByMode.dark` instead
 * This export maintains backward compatibility with existing code.
 */
export const colors = {
  ...lightModeColors,
  ...semanticColors,
} as const;

// =============================================================================
// TYPOGRAPHY TOKENS
// =============================================================================

export const fontFamilies = {
  primary: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  secondary: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  mono: '"Roboto Mono", "SF Mono", "Monaco", monospace',
} as const;

// Font feature settings from Figma - disables ligatures
export const fontFeatureSettings = "'liga' off, 'clig' off" as const;

export const fontWeights = {
  light: 300,
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
} as const;

export const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
} as const;

export const lineHeights = {
  tight: 1.2,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.66,
  loose: 2,
} as const;

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0.15px',
  wide: '0.4px',
  wider: '0.46px',
  widest: '1px',
} as const;

// Typography presets (matching MUI/Figma)
export const typography = {
  h1: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.bold,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.bold,
    fontSize: '2rem',
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.semiBold,
    fontSize: '1.75rem',
    lineHeight: 1.2,
    letterSpacing: '0em',
  },
  h4: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.semiBold,
    fontSize: '1.5rem',
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  h5: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.semiBold,
    fontSize: '1.25rem',
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  h6: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.semiBold,
    fontSize: '1.25rem', // 20px
    lineHeight: '32px',
    letterSpacing: '0.15px',
  },
  subtitle1: {
    fontFamily: fontFamilies.secondary,
    fontWeight: fontWeights.regular,
    fontSize: '1rem',
    lineHeight: 1.75,
    letterSpacing: '0.00938em',
  },
  subtitle2: {
    fontFamily: fontFamilies.secondary,
    fontWeight: fontWeights.medium,
    fontSize: '0.875rem',
    lineHeight: 1.57,
    letterSpacing: '0.00714em',
  },
  body1: {
    fontFamily: fontFamilies.secondary,
    fontWeight: fontWeights.regular,
    fontSize: '1rem', // 16px
    lineHeight: 1.5,
    letterSpacing: '0.15px',
  },
  body2: {
    fontFamily: fontFamilies.secondary,
    fontWeight: fontWeights.regular,
    fontSize: '0.875rem',
    lineHeight: 1.43,
    letterSpacing: '0.01071em',
  },
  button: {
    fontFamily: fontFamilies.secondary,
    fontWeight: fontWeights.medium,
    fontSize: '0.9375rem', // 15px
    lineHeight: '26px',
    letterSpacing: '0.46px',
    textTransform: 'uppercase' as const,
  },
  caption: {
    fontFamily: fontFamilies.secondary,
    fontWeight: fontWeights.regular,
    fontSize: '0.75rem', // 12px
    lineHeight: 1.66,
    letterSpacing: '0.4px',
  },
  overline: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.regular,
    fontSize: '0.75rem', // 12px
    lineHeight: '15px',
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
  },
  inputValue: {
    fontFamily: fontFamilies.secondary,
    fontWeight: fontWeights.regular,
    fontSize: '1rem',
    lineHeight: '24px',
    letterSpacing: '0.15px',
  },
  inputLabel: {
    fontFamily: fontFamilies.secondary,
    fontWeight: fontWeights.regular,
    fontSize: '0.75rem',
    lineHeight: '12px',
    letterSpacing: '0.15px',
  },
} as const;

// =============================================================================
// SPACING TOKENS
// =============================================================================

export const spacing = {
  0: '0px',
  1: '8px',
  2: '16px',
  3: '24px',
  4: '32px',
  5: '40px',
  6: '48px',
  7: '56px',
  8: '64px',
  9: '72px',
  10: '80px',
  11: '88px',
  12: '96px',
} as const;

// =============================================================================
// SEMANTIC SPACING (From Figma Design)
// =============================================================================

export const semanticSpacing = {
  // Card spacing
  card: {
    paddingY: '10px',
    paddingX: '20px',
    padding: '10px 20px',
    gap: '16px',        // Internal gap between card elements
    listGap: '12px',    // Gap between cards in a list
  },

  // Box/Container spacing
  box: {
    paddingY: '32px',
    paddingX: '20px',
    padding: '32px 20px',
  },

  // Input spacing
  input: {
    paddingY: '16px',
    paddingX: '12px',
    padding: '16px 12px',
  },

  // Button spacing
  button: {
    paddingY: '8px',
    paddingX: '22px',
    padding: '8px 22px',
  },

  // Layout gaps
  sectionGap: '32px',
  formGap: '20px',
  inlineGap: '8px',
  stackGap: '16px',

  // Modal
  modalPadding: '24px',
} as const;

// =============================================================================
// BORDER RADIUS TOKENS
// =============================================================================

export const borderRadius = {
  none: '0px',
  sm: '4px',     // Default MUI/Figma border radius
  md: '8px',
  lg: '12px',
  xl: '16px',
  '2xl': '20px',
  '3xl': '24px',
  full: '9999px',

  // Component-specific
  button: '4px',
  input: '4px',
  card: '20px',
  modal: '20px',
  chip: '16px',
  avatar: '100px',
  iconContainer: '10px',
} as const;

// =============================================================================
// SHADOW TOKENS
// =============================================================================

export const shadows = {
  none: 'none',

  // From Figma: elevation/2 (used on primary buttons)
  elevation2: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',

  // Semantic shadows from Figma
  button: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)', // elevation/2
  card: 'none', // Figma cards use borders, not shadows
  modal: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',
  dropdown: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
} as const;

// =============================================================================
// BORDER TOKENS (From Figma)
// =============================================================================

export const borders = {
  // Card borders (no shadow in Figma)
  card: '1px solid rgba(0, 0, 0, 0.42)',
  cardSelected: '2px solid #8347AD',

  // Input borders
  inputOutlined: '1px solid rgba(0, 0, 0, 0.23)',
  inputStandard: '1px solid rgba(0, 0, 0, 0.42)',

  // Button borders
  buttonOutlinedPrimary: '1px solid rgba(131, 71, 173, 0.5)',
  buttonOutlinedInfo: '1px solid rgba(2, 136, 209, 0.5)',

  // Dividers
  divider: '1px solid #e0e0e0',
  container: '1px solid rgba(58, 53, 65, 0.3)',
} as const;

// =============================================================================
// Z-INDEX TOKENS
// =============================================================================

export const zIndex = {
  mobileStepper: 1000,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
} as const;

// =============================================================================
// TRANSITION TOKENS
// =============================================================================

export const transitions = {
  duration: {
    shortest: 150,
    shorter: 200,
    short: 250,
    standard: 300,
    complex: 375,
    enteringScreen: 225,
    leavingScreen: 195,
  },
  easing: {
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
  },
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  xs: '444px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1536px',
} as const;

// =============================================================================
// COMBINED THEME EXPORT
// =============================================================================

/**
 * Complete token set with theme mode support
 */
export const tokensByMode = {
  light: {
    colors: { ...lightModeColors, ...semanticColors },
    fontFamilies,
    fontWeights,
    fontSizes,
    lineHeights,
    letterSpacings,
    typography,
    spacing,
    semanticSpacing,
    borderRadius,
    borders,
    shadows,
    zIndex,
    transitions,
    breakpoints,
  },
  dark: {
    colors: { ...darkModeColors, ...semanticColors },
    fontFamilies,
    fontWeights,
    fontSizes,
    lineHeights,
    letterSpacings,
    typography,
    spacing,
    semanticSpacing,
    borderRadius,
    borders,
    shadows,
    zIndex,
    transitions,
    breakpoints,
  },
} as const;

/**
 * Default token export (light mode for backward compatibility)
 *
 * @deprecated Use `tokensByMode.light` or `tokensByMode.dark` instead
 * This export maintains backward compatibility with existing code.
 */
export const tokens = {
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
  borders,
  shadows,
  zIndex,
  transitions,
  breakpoints,
} as const;

// =============================================================================
// THEME MODE UTILITIES
// =============================================================================

/**
 * Theme mode type
 */
export type ThemeMode = 'light' | 'dark';

/**
 * Get tokens for a specific theme mode
 * @param mode - 'light' or 'dark'
 * @returns Token set for the specified mode
 */
export function getTokensForMode(mode: ThemeMode = 'light') {
  return tokensByMode[mode];
}

/**
 * Get colors for a specific theme mode
 * @param mode - 'light' or 'dark'
 * @returns Color tokens for the specified mode
 */
export function getColorsForMode(mode: ThemeMode = 'light') {
  return mode === 'light'
    ? { ...lightModeColors, ...semanticColors }
    : { ...darkModeColors, ...semanticColors };
}

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type Tokens = typeof tokens;
export type TokensByMode = typeof tokensByMode;
export type Colors = typeof colors;
export type LightModeColors = typeof lightModeColors;
export type DarkModeColors = typeof darkModeColors;
export type SemanticColors = typeof semanticColors;
export type Typography = typeof typography;
export type Borders = typeof borders;
export type Shadows = typeof shadows;

export default tokens;
