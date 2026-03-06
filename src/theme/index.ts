/**
 * Khipu Design System - MUI Theme Configuration
 *
 * This theme is based on the Figma design: Pagos Automáticos - MUI v610
 * All values are extracted from the Figma design tokens.
 */

import { createTheme, ThemeOptions } from '@mui/material/styles';
import {
  colors,
  fontFamilies,
  fontWeights,
  fontSizes
} from '../tokens';

// =============================================================================
// DESIGN TOKENS (imported from ../tokens/index.ts)
// =============================================================================

// Use imported colors from tokens (single source of truth!)
// Add missing properties that theme needs but tokens don't have yet
const figmaColors = {
  ...colors,
  // Add states to info color (not in tokens yet)
  info: {
    ...colors.info,
    states: {
      outlinedBorder: 'rgba(2, 136, 209, 0.5)',
    },
  },
  // Add input colors (not in tokens yet)
  input: {
    outlined: {
      enabledBorder: 'rgba(0, 0, 0, 0.23)',
      hoverBorder: 'rgba(0, 0, 0, 0.87)',
      standardBorder: 'rgba(0, 0, 0, 0.42)',
    },
  },
  // Add alert colors (not in tokens yet)
  alert: {
    info: {
      background: '#E5F6FD',
      color: '#014361',
    },
    success: {
      background: '#EDF7ED',
      color: '#1E4620',
    },
  },
};

// Use imported typography from tokens
const figmaTypography = {
  fontFamily: {
    primary: fontFamilies.primary,
    secondary: fontFamilies.secondary,
    display: fontFamilies.primary,
  },
  fontWeight: fontWeights,
  fontSize: {
    xs: fontSizes.xs,
    sm: fontSizes.sm,
    base: fontSizes.base,
    button: '0.9375rem', // Not in tokens yet
    md: '0.875rem', // Not in tokens yet
    lg: fontSizes.lg,
    xl: fontSizes.xl,
  },
};

// =============================================================================
// MUI THEME PALETTE
// =============================================================================

const palette = {
  primary: {
    main: figmaColors.primary.main,
    light: figmaColors.primary.light,
    dark: figmaColors.primary.dark,
    contrastText: figmaColors.primary.contrastText,
  },
  secondary: {
    main: '#9C27B0',
    light: '#BA68C8',
    dark: '#7B1FA2',
    contrastText: '#FFFFFF',
  },
  success: {
    main: figmaColors.success.main,
    light: figmaColors.success.light,
    dark: figmaColors.success.dark,
    contrastText: figmaColors.success.contrastText,
  },
  warning: {
    main: figmaColors.warning.main,
    light: figmaColors.warning.light,
    dark: figmaColors.warning.dark,
    contrastText: figmaColors.warning.contrastText,
  },
  error: {
    main: figmaColors.error.main,
    light: figmaColors.error.light,
    dark: figmaColors.error.dark,
    contrastText: figmaColors.error.contrastText,
  },
  info: {
    main: figmaColors.info.main,
    light: figmaColors.info.light,
    dark: figmaColors.info.dark,
    contrastText: figmaColors.info.contrastText,
  },
  text: {
    primary: figmaColors.text.primary,
    secondary: figmaColors.text.secondary,
    disabled: figmaColors.text.disabled,
  },
  background: {
    default: figmaColors.background.default,
    paper: figmaColors.background.paper,
  },
  action: {
    active: figmaColors.action.active,
    hover: figmaColors.action.hover,
    selected: figmaColors.action.selected,
    disabled: figmaColors.action.disabled,
    disabledBackground: figmaColors.action.disabledBackground,
    focus: figmaColors.action.focus,
  },
  divider: figmaColors.divider,
};

// =============================================================================
// MUI TYPOGRAPHY
// =============================================================================

const typography = {
  fontFamily: `${figmaTypography.fontFamily.primary}, ${figmaTypography.fontFamily.secondary}, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`,

  // Headings - Public Sans SemiBold
  h1: {
    fontFamily: figmaTypography.fontFamily.primary,
    fontWeight: figmaTypography.fontWeight.bold,
    fontSize: '2.5rem',
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
  },
  h2: {
    fontFamily: figmaTypography.fontFamily.primary,
    fontWeight: figmaTypography.fontWeight.bold,
    fontSize: '2rem',
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  h3: {
    fontFamily: figmaTypography.fontFamily.primary,
    fontWeight: figmaTypography.fontWeight.semiBold,
    fontSize: '1.75rem',
    lineHeight: 1.2,
    letterSpacing: '0em',
  },
  h4: {
    fontFamily: figmaTypography.fontFamily.primary,
    fontWeight: figmaTypography.fontWeight.semiBold,
    fontSize: '1.5rem',
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  // H5 - Inter Medium 24px (from Figma Light/Typography/H5)
  h5: {
    fontFamily: figmaTypography.fontFamily.display,
    fontWeight: figmaTypography.fontWeight.medium,
    fontSize: '1.5rem', // 24px
    lineHeight: 1.334,
    letterSpacing: '0em',
  },
  // H6 - Public Sans SemiBold 20px (from Figma Light/Typography/H6)
  h6: {
    fontFamily: figmaTypography.fontFamily.primary,
    fontWeight: figmaTypography.fontWeight.semiBold,
    fontSize: '1.25rem', // 20px
    lineHeight: '32px',
    letterSpacing: '0.15px',
  },
  // Subtitle1 - Roboto Regular 16px
  subtitle1: {
    fontFamily: figmaTypography.fontFamily.secondary,
    fontWeight: figmaTypography.fontWeight.regular,
    fontSize: '1rem',
    lineHeight: 1.75,
    letterSpacing: '0.15px',
  },
  // Subtitle2 - Roboto Medium 14px
  subtitle2: {
    fontFamily: figmaTypography.fontFamily.secondary,
    fontWeight: figmaTypography.fontWeight.medium,
    fontSize: '0.875rem',
    lineHeight: 1.57,
    letterSpacing: '0.1px',
  },
  // Body1 - From Figma typography/body1: Roboto Regular 16px
  body1: {
    fontFamily: figmaTypography.fontFamily.secondary,
    fontWeight: figmaTypography.fontWeight.regular,
    fontSize: '1rem', // 16px
    lineHeight: 1.5,
    letterSpacing: '0.15px',
  },
  // Body2 - Roboto Regular 14px
  body2: {
    fontFamily: figmaTypography.fontFamily.secondary,
    fontWeight: figmaTypography.fontWeight.regular,
    fontSize: '0.875rem', // 14px
    lineHeight: 1.43,
    letterSpacing: '0.17px',
  },
  // Button - From Figma button/large: Roboto Medium 15px
  button: {
    fontFamily: figmaTypography.fontFamily.secondary,
    fontWeight: figmaTypography.fontWeight.medium,
    fontSize: '0.9375rem', // 15px
    lineHeight: '26px',
    letterSpacing: '0.46px',
    textTransform: 'uppercase' as const,
  },
  // Caption - From Figma typography/caption: Roboto Regular 12px
  caption: {
    fontFamily: figmaTypography.fontFamily.secondary,
    fontWeight: figmaTypography.fontWeight.regular,
    fontSize: '0.75rem', // 12px
    lineHeight: 1.66,
    letterSpacing: '0.4px',
  },
  // Overline - From Figma Light/Typography/Overline: Public Sans Regular 12px
  overline: {
    fontFamily: figmaTypography.fontFamily.primary,
    fontWeight: figmaTypography.fontWeight.regular,
    fontSize: '0.75rem', // 12px
    lineHeight: '15px',
    letterSpacing: '1px',
    textTransform: 'uppercase' as const,
  },
};

// =============================================================================
// SHAPE
// =============================================================================

const shape = {
  borderRadius: 4, // borderRadius from Figma
};

// =============================================================================
// COMPONENT OVERRIDES
// =============================================================================

const components: ThemeOptions['components'] = {
  // CSS Baseline - Font imports
  MuiCssBaseline: {
    styleOverrides: `
      @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Public+Sans:ital,wght@0,100..900;1,100..900&display=swap');
    `,
  },

  // ==========================================================================
  // BUTTON - Figma button/large specs
  // ==========================================================================
  MuiButton: {
    styleOverrides: {
      root: {
        fontFamily: figmaTypography.fontFamily.secondary,
        fontWeight: figmaTypography.fontWeight.medium,
        fontSize: '0.9375rem', // 15px
        lineHeight: '26px',
        letterSpacing: '0.46px',
        textTransform: 'uppercase',
        borderRadius: 4,
        minHeight: 50,
        padding: '8px 22px',
        // Disabled state from Figma
        '&.Mui-disabled': {
          backgroundColor: figmaColors.action.disabledBackground,
          color: figmaColors.action.disabled,
        },
      },
      contained: {
        // elevation/2 from Figma
        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)',
        '&:hover': {
          boxShadow: '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        },
      },
      containedPrimary: {
        backgroundColor: figmaColors.primary.main,
        color: figmaColors.primary.contrastText,
        '&:hover': {
          backgroundColor: figmaColors.primary.dark,
        },
      },
      containedSuccess: {
        // Success button uses success.light (#4CAF50) from Figma
        backgroundColor: figmaColors.success.light,
        color: figmaColors.success.contrastText,
        '&:hover': {
          backgroundColor: figmaColors.success.main,
        },
      },
      containedInfo: {
        backgroundColor: figmaColors.info.light,
        color: figmaColors.info.contrastText,
        '&:hover': {
          backgroundColor: figmaColors.info.main,
        },
      },
      outlined: {
        borderWidth: 1,
        '&:hover': {
          borderWidth: 1,
        },
      },
      outlinedPrimary: {
        borderColor: figmaColors.primary.states.outlinedBorder,
        color: figmaColors.primary.main,
        '&:hover': {
          backgroundColor: figmaColors.primary.states.hover,
          borderColor: figmaColors.primary.main,
        },
      },
      outlinedInfo: {
        // From Figma: info/_states/outlinedBorder
        borderColor: figmaColors.info.states.outlinedBorder,
        color: figmaColors.info.main,
        '&:hover': {
          backgroundColor: 'rgba(2, 136, 209, 0.04)',
          borderColor: figmaColors.info.main,
        },
      },
      sizeSmall: {
        padding: '6px 16px',
        fontSize: '0.8125rem',
        minHeight: 32,
      },
      sizeMedium: {
        padding: '8px 22px',
        fontSize: '0.9375rem',
        minHeight: 42,
      },
      sizeLarge: {
        padding: '8px 22px',
        fontSize: '0.9375rem',
        minHeight: 50,
      },
    },
    defaultProps: {
      disableElevation: false,
    },
  },

  // ==========================================================================
  // TEXT FIELD - Figma input specs
  // ==========================================================================
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 4,
          fontFamily: figmaTypography.fontFamily.secondary,
          fontSize: '1rem', // 16px from _fontSize/1rem
          lineHeight: '24px',
          letterSpacing: '0.15px',
          '& fieldset': {
            borderColor: figmaColors.input.outlined.enabledBorder,
            borderWidth: 1,
          },
          '&:hover fieldset': {
            borderColor: figmaColors.input.outlined.hoverBorder,
          },
          '&.Mui-focused fieldset': {
            borderColor: figmaColors.primary.main,
            borderWidth: 2,
          },
        },
        '& .MuiInputLabel-root': {
          fontFamily: figmaTypography.fontFamily.secondary,
          fontSize: '1rem',
          letterSpacing: '0.15px',
          color: figmaColors.text.secondary,
          '&.Mui-focused': {
            color: figmaColors.primary.main,
          },
          '&.MuiInputLabel-shrink': {
            fontSize: '0.75rem', // 12px when shrunk
            lineHeight: '12px',
            letterSpacing: '0.15px',
          },
        },
        '& .MuiInputBase-input': {
          fontFamily: figmaTypography.fontFamily.secondary,
          fontSize: '1rem',
          fontWeight: figmaTypography.fontWeight.regular,
          lineHeight: '24px',
          letterSpacing: '0.15px',
          color: figmaColors.text.primary,
          padding: '16px 12px',
          '&::placeholder': {
            color: figmaColors.text.secondary,
            opacity: 1,
          },
        },
        // Adornment styling
        '& .MuiInputAdornment-root': {
          color: figmaColors.action.active,
        },
      },
    },
    defaultProps: {
      variant: 'outlined',
      fullWidth: true,
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: figmaColors.input.outlined.enabledBorder,
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: figmaColors.input.outlined.hoverBorder,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: figmaColors.primary.main,
          borderWidth: 2,
        },
      },
      input: {
        padding: '16px 12px',
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        fontFamily: figmaTypography.fontFamily.secondary,
        '&.Mui-focused': {
          color: figmaColors.primary.main,
        },
      },
      shrink: {
        fontSize: '0.75rem',
      },
    },
  },

  // ==========================================================================
  // CHECKBOX - Figma checkbox specs with purple checked state
  // ==========================================================================
  MuiCheckbox: {
    styleOverrides: {
      root: {
        padding: 9,
        color: figmaColors.action.active,
        '&.Mui-checked': {
          color: figmaColors.primary.main,
        },
        '&.MuiCheckbox-indeterminate': {
          color: figmaColors.primary.main,
        },
        '&:hover': {
          backgroundColor: figmaColors.primary.states.hover,
        },
      },
      colorPrimary: {
        '&.Mui-checked': {
          color: figmaColors.primary.main,
        },
      },
    },
    defaultProps: {
      color: 'primary',
    },
  },

  MuiFormControlLabel: {
    styleOverrides: {
      root: {
        marginLeft: -9,
        marginRight: 0,
      },
      label: {
        fontFamily: figmaTypography.fontFamily.secondary,
        fontSize: '1rem',
        fontWeight: figmaTypography.fontWeight.regular,
        lineHeight: 1.5,
        letterSpacing: '0.15px',
        color: figmaColors.text.secondary,
      },
    },
  },

  // ==========================================================================
  // CARD - Figma card specs with 6px border radius and outlined border
  // ==========================================================================
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 6,
        // Default shadow from Figma --joy-shadow-xs
        boxShadow: '0px 1px 2px 0px rgba(187, 187, 187, 0.12)',
      },
    },
  },

  MuiCardActionArea: {
    styleOverrides: {
      root: {
        '&:hover': {
          backgroundColor: figmaColors.action.hover,
        },
      },
    },
  },

  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: '16px 20px',
        '&:last-child': {
          paddingBottom: '16px',
        },
      },
    },
  },

  // ==========================================================================
  // LINEAR PROGRESS - Figma info color (#03A9F4) progress bar
  // ==========================================================================
  MuiLinearProgress: {
    styleOverrides: {
      root: {
        height: 4,
        borderRadius: 0,
        '&.MuiLinearProgress-colorInfo': {
          backgroundColor: `rgba(3, 169, 244, 0.4)`,
          '& .MuiLinearProgress-bar': {
            backgroundColor: figmaColors.info.light, // #03A9F4
          },
        },
        '&.MuiLinearProgress-colorPrimary': {
          backgroundColor: `rgba(131, 71, 173, 0.4)`,
          '& .MuiLinearProgress-bar': {
            backgroundColor: figmaColors.primary.main, // #8347AD
          },
        },
      },
      bar: {
        borderRadius: 0,
      },
    },
    defaultProps: {
      color: 'info',
    },
  },

  // ==========================================================================
  // CIRCULAR PROGRESS
  // ==========================================================================
  MuiCircularProgress: {
    styleOverrides: {
      colorPrimary: {
        color: figmaColors.primary.main,
      },
    },
    defaultProps: {
      color: 'primary',
    },
  },

  // ==========================================================================
  // ALERT - Figma alert backgrounds and colors
  // ==========================================================================
  MuiAlert: {
    styleOverrides: {
      root: {
        borderRadius: 4,
        fontFamily: figmaTypography.fontFamily.secondary,
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.17px',
        padding: '6px 16px',
      },
      standardInfo: {
        backgroundColor: figmaColors.alert.info.background, // #E5F6FD
        color: figmaColors.alert.info.color, // #014361
        '& .MuiAlert-icon': {
          color: figmaColors.alert.info.color,
        },
      },
      standardSuccess: {
        backgroundColor: figmaColors.alert.success.background, // #EDF7ED
        color: figmaColors.alert.success.color, // #1E4620
        '& .MuiAlert-icon': {
          color: figmaColors.success.main,
        },
      },
      standardWarning: {
        backgroundColor: '#FFF4E5',
        color: '#663C00',
        '& .MuiAlert-icon': {
          color: figmaColors.warning.main,
        },
      },
      standardError: {
        backgroundColor: '#FDEDED',
        color: '#5F2120',
        '& .MuiAlert-icon': {
          color: figmaColors.error.main,
        },
      },
      icon: {
        padding: '7px 0',
        marginRight: 12,
      },
    },
  },

  MuiAlertTitle: {
    styleOverrides: {
      root: {
        fontFamily: figmaTypography.fontFamily.secondary,
        fontWeight: figmaTypography.fontWeight.medium,
        fontSize: '1rem',
        lineHeight: 1.5,
        marginBottom: 4,
      },
    },
  },

  // ==========================================================================
  // DIALOG/MODAL - Figma modal specs
  // ==========================================================================
  MuiDialog: {
    styleOverrides: {
      paper: {
        borderRadius: 12,
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      },
    },
  },

  MuiDialogTitle: {
    styleOverrides: {
      root: {
        fontFamily: figmaTypography.fontFamily.primary,
        fontWeight: figmaTypography.fontWeight.semiBold,
        fontSize: '1.25rem',
        lineHeight: '32px',
        letterSpacing: '0.15px',
        padding: '16px 24px',
      },
    },
  },

  MuiDialogContent: {
    styleOverrides: {
      root: {
        padding: '16px 24px',
      },
    },
  },

  MuiDialogActions: {
    styleOverrides: {
      root: {
        padding: '16px 24px',
        gap: 8,
      },
    },
  },

  // ==========================================================================
  // TOOLTIP - Figma tooltip specs
  // ==========================================================================
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: 'rgba(97, 97, 97, 0.9)',
        fontFamily: figmaTypography.fontFamily.secondary,
        fontWeight: figmaTypography.fontWeight.medium,
        fontSize: '0.875rem',
        lineHeight: '24px',
        letterSpacing: '0.17px',
        borderRadius: 4,
        padding: '4px 8px',
      },
    },
  },

  // ==========================================================================
  // TYPOGRAPHY COMPONENT
  // ==========================================================================
  MuiTypography: {
    styleOverrides: {
      root: {
        // Default to body text styling
      },
    },
  },

  // ==========================================================================
  // DIVIDER
  // ==========================================================================
  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: '#DDDEE0',
      },
    },
  },

  // ==========================================================================
  // LINK
  // ==========================================================================
  MuiLink: {
    styleOverrides: {
      root: {
        color: figmaColors.info.main,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },

  // ==========================================================================
  // ICON BUTTON
  // ==========================================================================
  MuiIconButton: {
    styleOverrides: {
      root: {
        color: figmaColors.text.secondary,
        '&:hover': {
          backgroundColor: figmaColors.action.hover,
        },
      },
    },
  },
};

// =============================================================================
// CREATE THEME
// =============================================================================

export const khipuTheme = createTheme({
  palette,
  typography,
  shape,
  components,
});

// =============================================================================
// EXPORTS
// =============================================================================

export default khipuTheme;

// Export theme types for TypeScript
export type KhipuTheme = typeof khipuTheme;

// Export Figma colors for direct usage in components
export { figmaColors, figmaTypography };
