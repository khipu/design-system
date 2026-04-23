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
  // Source of truth: Figma K-Tokens (extracted via figma-plugin-token-extractor)
  primary: {
    main: '#8347AD',        // From Figma: primary/main
    light: '#9B6BBD',       // From Figma: primary/light
    dark: '#5B3179',        // From Figma: primary/dark
    container: '#F3E5FF',   // Light purple background for chips/badges
    contrastText: '#FFFFFF',
    states: {
      hover: 'rgba(131, 71, 173, 0.04)',         // primary.main with 4% opacity
      selected: 'rgba(131, 71, 173, 0.08)',      // primary.main with 8% opacity
      focus: 'rgba(131, 71, 173, 0.12)',         // primary.main with 12% opacity
      focusVisible: 'rgba(131, 71, 173, 0.30)',  // primary.main with 30% opacity
      outlinedBorder: 'rgba(131, 71, 173, 0.50)', // primary.main with 50% opacity
    },
  },

  // Secondary palette - Cyan/Turquoise (Khipu brand complementary)
  // Source of truth: Figma K-Tokens (extracted via figma-plugin-token-extractor)
  secondary: {
    main: '#3CB4E5',        // From Figma: secondary/main
    light: '#6AC6EB',       // From Figma: secondary/light
    dark: '#198EBE',        // From Figma: secondary/dark
    contrastText: '#FFFFFF',
  },

  // Text colors (updated to match khenshin-web)
  text: {
    primary: '#333333',                    // From khenshin-web
    secondary: 'rgba(0, 0, 0, 0.60)',      // Keep DS value
    disabled: '#9E9E9E',                   // From khenshin-web
    hint: 'rgba(0, 0, 0, 0.38)',          // Keep DS value
    muted: '#81848F',                      // From khenshin-web - merchant names, less emphasis
    strong: '#272930',                     // From khenshin-web - surface/prominent text
    accent: '#4C4E64',                     // From khenshin-web - accent/branded text
    tertiary: '#646872',                   // From khenshin-web - tertiary context text
    footer: '#666666',                     // From khenshin-web - footer/auxiliary text
  },

  // Background colors (updated to match khenshin-web)
  background: {
    default: '#FFFFFF',     // White - neutral for all apps
    paper: '#FFFFFF',
    elevated: '#FAFAFA',
    brandSubtle: '#F0F0FA', // Subtle brand-tinted surface (e.g. icon boxes, accented headers)
    muted: '#F5F5F5',       // Light gray background for app shells, sections
  },

  // Neutral grays (for borders, backgrounds, etc.)
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Action colors (updated to match khenshin-web)
  action: {
    active: 'rgba(0, 0, 0, 0.56)',        // Keep DS value
    hover: 'rgba(0, 0, 0, 0.04)',         // Keep DS value
    selected: 'rgba(0, 0, 0, 0.08)',      // Keep DS value
    disabled: '#9E9E9E',                  // From khenshin-web
    disabledBackground: '#E0E0E0',        // From khenshin-web
    focus: 'rgba(0, 0, 0, 0.12)',        // Keep DS value
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
    snackbar: {
      successBg: 'rgba(46, 125, 50, 0.08)',    // success.main with 8% opacity
      warningBg: 'rgba(237, 108, 2, 0.08)',    // warning.main with 8% opacity
      errorBg: 'rgba(211, 47, 47, 0.08)',      // error.main with 8% opacity
      infoBg: 'rgba(2, 136, 209, 0.08)',       // info.main with 8% opacity
    },
    alert: {
      infoBg: '#EFF6FF',      // blue-50
      warningBg: '#FFFBEB',   // amber-50
      successBg: '#ECFDF5',   // green-50
      errorBg: '#FEF2F2',     // red-50
      // Text colors for outlined alerts (from khenshin-web)
      successText: '#1E4620',
      warningText: '#663C00',
      errorText: '#5F2120',
      infoText: '#014361',
      // Border colors for outlined alerts (from khenshin-web)
      successBorder: '#2CA24D',
      warningBorder: '#FF9800',
      errorBorder: '#E53E3E',
      infoBorder: '#006699',
    },
  },
};

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

  // Secondary palette - Cyan/Turquoise (Khipu brand complementary) - From Figma K-Tokens
  secondary: {
    main: '#B5EAFF',        // From Figma: secondary/main
    light: '#D6F3FF',       // From Figma: secondary/light
    dark: '#065676',        // From Figma: secondary/dark
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
    snackbar: {
      successBg: 'rgba(76, 175, 80, 0.16)',    // success.light with 16% opacity for dark mode
      warningBg: 'rgba(255, 152, 0, 0.16)',    // warning.light with 16% opacity for dark mode
      errorBg: 'rgba(239, 83, 80, 0.16)',      // error.light with 16% opacity for dark mode
      infoBg: 'rgba(3, 169, 244, 0.16)',       // info.light with 16% opacity for dark mode
    },
  },
};

// =============================================================================
// SEMANTIC COLORS (Same in both light and dark mode)
// =============================================================================

const semanticColors = {
  // Updated to match Figma (source of truth)
  success: {
    main: '#2E7D32',        // From Figma: green/800
    light: '#4CAF50',       // From Figma: green/500
    dark: '#1B5E20',        // From Figma: green/900
    container: '#ECFDF5',   // Light green background for chips/badges
    contrastText: '#FFFFFF',
  },

  warning: {
    main: '#EF6C00',        // From Figma: warning/main
    light: '#FF9800',       // From Figma: warning/light
    dark: '#E65100',        // From Figma: warning/dark
    container: '#FFFBEB',   // Light amber background for chips/badges
    contrastText: '#FFFFFF',
  },

  error: {
    main: '#D32F2F',
    light: '#EF5350',
    dark: '#C62828',
    container: '#FEF2F2',  // Light red background for chips/badges
    contrastText: '#FFFFFF',
  },

  info: {
    50: '#E1F5FE',
    100: '#B3E5FC',
    main: '#0288D1',
    light: '#03A9F4',
    dark: '#01579B',
    container: '#EFF6FF',  // Light blue background for chips/badges
    contrastText: '#FFFFFF',
  },
};

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
  md: '1rem',       // 16px (alias of base)
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
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  h2: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.bold,
    fontSize: '2rem',
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  h3: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.semiBold,
    fontSize: '1.75rem',
    lineHeight: 1.2,
    letterSpacing: '0em',
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  h4: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.semiBold,
    fontSize: '1.5rem',
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  h5: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.semiBold,
    fontSize: '1.25rem',
    lineHeight: 1.334,
    letterSpacing: '0em',
    marginBlockStart: 0,
    marginBlockEnd: 0,
  },
  h6: {
    fontFamily: fontFamilies.primary,
    fontWeight: fontWeights.semiBold,
    fontSize: '1.25rem', // 20px
    lineHeight: '32px',
    letterSpacing: '0.15px',
    marginBlockStart: 0,
    marginBlockEnd: 0,
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
  0.25: '2px',    // Quarter of base
  0.5: '4px',     // Half of base
  0.75: '6px',    // 3/4 of base
  1: '8px',       // Base unit
  1.25: '10px',   // 1.25x base (for OTP gap)
  1.5: '12px',    // 1.5x base
  1.75: '14px',   // 1.75x base (for bank-row padding)
  2: '16px',      // 2x base
  2.5: '20px',    // 2.5x base
  3: '24px',      // 3x base
  3.5: '28px',    // 3.5x base
  4: '32px',      // 4x base
  4.5: '36px',    // 4.5x base
  5: '40px',      // 5x base
  5.5: '44px',    // 5.5x base
  6: '48px',      // 6x base
  7: '56px',      // 7x base
  8: '64px',      // 8x base
  9: '72px',      // 9x base
  10: '80px',     // 10x base
  11: '88px',     // 11x base
  12: '96px',     // 12x base
  20: '160px',    // 20x base
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
    minHeight: '50px',  // Altura mínima para coincidir con KdsButton
    iconSize: '20px',   // Tamaño de iconos en botones (Material Design medium)
  },

  // Layout gaps
  sectionGap: '32px',
  formGap: '20px',
  inlineGap: '8px',
  stackGap: '16px',

  // Modal
  modalPadding: '24px',

  // Sidebar/Navigation
  sidebar: {
    width: '280px',          // Full sidebar width
    widthCollapsed: '72px',  // Collapsed sidebar (icon-only mode)
    widthMobile: '100%',     // Mobile drawer width (full width)
    headerPadding: '16px',   // Header padding
    navItemPaddingY: '8px',  // Nav item vertical padding
    navItemPaddingX: '12px', // Nav item horizontal padding
    navItemMarginX: '12px',  // Nav item horizontal margin
    navItemGap: '12px',      // Gap between icon and text
    submenuIndent: '64px',   // Submenu items left padding
    iconSize: '24px',        // Icon font size
    iconSizeMd: '32px',
    iconContainerSize: '40px', // Icon circular container size
    labelPaddingX: '24px',   // Section label horizontal padding
    labelPaddingY: '8px',    // Section label vertical padding
    labelMarginTop: '16px',  // Section label top margin
    labelFontSize: '11px',   // Section label font size
    zIndex: 100,             // Sidebar z-index (below navbar 1000)
    zIndexMobile: 1000,      // Mobile drawer z-index (above content)
    transition: '0.2s',      // Transition duration
    collapsableMaxHeight: '500px', // Max height for collapsable content when open
  },
} as const;

// =============================================================================
// BREAKPOINTS
// =============================================================================

export const breakpoints = {
  // Alineados con BeerCSS para consistencia
  mobile: '600px',    // < 600px = mobile (BeerCSS: s)
  tablet: '840px',    // 600px - 840px = tablet (BeerCSS: m)
  desktop: '1280px',  // > 840px = desktop (BeerCSS: l/xl)

  // Valores legacy (mantener por compatibilidad)
  legacyMobile: '768px',
  legacyTablet: '1024px',
} as const;

// =============================================================================
// RESPONSIVE SPACING TOKENS (Mobile-First)
// =============================================================================

/**
 * Spacing responsive - valores cambian según breakpoint
 * Base = Mobile (< 600px), luego tablet (>= 600px), luego desktop (>= 840px)
 */
export const responsiveSpacing = {
  // Container padding
  container: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
  },

  // Card/Component padding
  card: {
    mobile: '16px',
    tablet: '20px',
    desktop: '24px',
  },

  // Section gaps
  sectionGap: {
    mobile: '24px',
    tablet: '32px',
    desktop: '48px',
  },

  // Element gaps (between items)
  elementGap: {
    mobile: '12px',
    tablet: '16px',
    desktop: '24px',
  },

  // Margin between sections
  sectionMargin: {
    mobile: '16px',
    tablet: '24px',
    desktop: '32px',
  },
} as const;

// =============================================================================
// RESPONSIVE TYPOGRAPHY (Mobile-First)
// =============================================================================

/**
 * Typography responsive - font sizes cambian según breakpoint
 * Usa clamp() para fluid typography O valores discretos por breakpoint
 */
export const responsiveTypography = {
  h1: {
    mobile: '1.75rem',   // 28px
    tablet: '2rem',      // 32px
    desktop: '2.5rem',   // 40px
    // Alternativa con clamp: 'clamp(1.75rem, 4vw, 2.5rem)'
  },
  h2: {
    mobile: '1.5rem',    // 24px
    tablet: '1.75rem',   // 28px
    desktop: '2rem',     // 32px
  },
  h3: {
    mobile: '1.25rem',   // 20px
    tablet: '1.5rem',    // 24px
    desktop: '1.75rem',  // 28px
  },
  h4: {
    mobile: '1.125rem',  // 18px
    tablet: '1.25rem',   // 20px
    desktop: '1.5rem',   // 24px
  },
  h5: {
    mobile: '1rem',      // 16px
    tablet: '1.125rem',  // 18px
    desktop: '1.25rem',  // 20px
  },
  h6: {
    mobile: '1rem',      // 16px
    tablet: '1rem',      // 16px
    desktop: '1.25rem',  // 20px
  },
  body1: {
    mobile: '0.875rem',  // 14px
    tablet: '0.9375rem', // 15px
    desktop: '1rem',     // 16px
  },
  body2: {
    mobile: '0.8125rem', // 13px
    tablet: '0.875rem',  // 14px
    desktop: '0.875rem', // 14px
  },
  button: {
    mobile: '0.875rem',  // 14px
    tablet: '0.9375rem', // 15px
    desktop: '0.9375rem', // 15px
  },
  caption: {
    mobile: '0.6875rem', // 11px
    tablet: '0.75rem',   // 12px
    desktop: '0.75rem',  // 12px
  },
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
  card: '14px',  // Payment card radius (between lg=12px and xl=16px) - Beer CSS Proposal
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

  // Material Design elevation levels (from MUI)
  1: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  2: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  4: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  6: '0px 3px 4px -2px rgba(0,0,0,0.2), 0px 6px 7px 0px rgba(0,0,0,0.14), 0px 2px 12px 1px rgba(0,0,0,0.12)',
  8: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',
  16: '0px 8px 10px -5px rgba(0,0,0,0.2), 0px 16px 24px 2px rgba(0,0,0,0.14), 0px 6px 30px 5px rgba(0,0,0,0.12)',
  24: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)',

  // Elevation aliases
  elevation1: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
  elevation2: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
  elevation3: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
  elevation4: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)',

  // Semantic aliases
  md: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)', // Same as elevation 4
  button: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)', // elevation 2
  card: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)', // elevation 1
  modal: '0px 11px 15px -7px rgba(0,0,0,0.2), 0px 24px 38px 3px rgba(0,0,0,0.14), 0px 9px 46px 8px rgba(0,0,0,0.12)', // elevation 24
  dropdown: '0px 5px 5px -3px rgba(0,0,0,0.2), 0px 8px 10px 1px rgba(0,0,0,0.14), 0px 3px 14px 2px rgba(0,0,0,0.12)', // elevation 8
  stepperInfo: '0 2px 4px rgba(2, 136, 209, 0.25)',     // Info color shadow for current step
  stepperSuccess: '0 2px 4px rgba(46, 125, 50, 0.25)', // Success color shadow for completed step
} as const;

// =============================================================================
// BORDER TOKENS (From Figma)
// =============================================================================

export const borders = {
  // Generic border colors (without 1px solid prefix)
  light: '#DDDEE0',       // From khenshin-web - light borders
  medium: '#999999',      // gray-500 equivalent
  dark: '#666666',        // gray-700 equivalent

  // Border widths
  widthSm: '1px',
  widthMd: '2px',

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
    responsiveSpacing,
    responsiveTypography,
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
    responsiveSpacing,
    responsiveTypography,
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
  responsiveSpacing,
  responsiveTypography,
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
