/**
 * Khipu Design System - Typography Component
 *
 * Unified typography component that provides consistent text styles
 * based on the Figma design system. Consolidates all typography variants
 * into a single, easy-to-use component.
 */

import { forwardRef } from 'react';
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import { SxProps, Theme } from '@mui/material/styles';

/**
 * Custom Khipu typography variants that map to specific design tokens
 */
export type KdsTypographyVariant =
  // Display / Hero text
  | 'display1'      // 40px Bold - Hero headlines
  | 'display2'      // 32px Bold - Large headlines
  // Headings
  | 'heading1'      // 28px SemiBold - Section headings
  | 'heading2'      // 24px SemiBold - Subsection headings
  | 'heading3'      // 20px SemiBold - Page titles, dialog titles
  // Body text
  | 'bodyLarge'     // 16px Regular - Large body text
  | 'body'          // 14px Regular - Default body text
  | 'bodySmall'     // 12px Regular - Small body text
  // Labels & UI elements
  | 'label'         // 12px SemiBold UPPERCASE - Section labels, overlines
  | 'labelSmall'    // 10px Medium - Footer codes, small labels
  // Merchant/Card specific
  | 'cardTitle'     // 16px SemiBold - Card/merchant titles
  | 'cardSubtitle'  // 14px SemiBold - Card subtitles
  // Semantic colors
  | 'muted'         // 14px Regular - Muted/secondary text
  | 'link';         // 14px Regular - Link text style

export interface KdsTypographyProps extends Omit<MuiTypographyProps, 'variant'> {
  /**
   * The typography variant to use
   * @default 'body'
   */
  variant?: KdsTypographyVariant | MuiTypographyProps['variant'];
  /**
   * Text color preset
   */
  color?: 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'error' | 'success' | 'info' | 'inherit';
  /**
   * Whether to truncate text with ellipsis
   */
  truncate?: boolean;
  /**
   * Maximum number of lines before truncating (requires truncate=true)
   */
  maxLines?: number;
}

// Figma color tokens
const colorMap: Record<string, string> = {
  primary: '#272930',      // onSurface
  secondary: 'rgba(0, 0, 0, 0.60)',
  tertiary: '#81848F',
  disabled: '#9797A5',
  error: '#D32F2F',
  success: '#2E7D32',
  info: '#0288D1',
  inherit: 'inherit',
};

// Font feature settings from Figma - disables ligatures
const fontFeatureSettings = "'liga' off, 'clig' off";

// Custom variant style definitions based on Figma
const variantStyles: Record<KdsTypographyVariant, SxProps<Theme>> = {
  // Display variants
  display1: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 700,
    fontSize: '2.5rem',    // 40px
    lineHeight: 1.2,
    letterSpacing: '-0.01562em',
  },
  display2: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 700,
    fontSize: '2rem',      // 32px
    lineHeight: 1.2,
    letterSpacing: '-0.00833em',
  },
  // Heading variants
  heading1: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 600,
    fontSize: '1.75rem',   // 28px
    lineHeight: 1.2,
    letterSpacing: 0,
  },
  heading2: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 600,
    fontSize: '1.5rem',    // 24px
    lineHeight: 1.235,
    letterSpacing: '0.00735em',
  },
  heading3: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 600,
    fontSize: '1.25rem',   // 20px
    lineHeight: '32px',
    letterSpacing: '0.15px',
  },
  // Body variants
  bodyLarge: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 400,
    fontSize: '1rem',      // 16px
    lineHeight: 1.5,
    letterSpacing: '0.15px',
  },
  body: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 400,
    fontSize: '0.875rem',  // 14px
    lineHeight: 1.43,
    letterSpacing: '0.17px',
  },
  bodySmall: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 400,
    fontSize: '0.75rem',   // 12px
    lineHeight: 1.66,
    letterSpacing: '0.4px',
  },
  // Label variants
  label: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 400,
    fontSize: '0.75rem',   // 12px
    lineHeight: '15px',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  labelSmall: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 500,
    fontSize: '0.625rem',  // 10px
    lineHeight: '14px',
    letterSpacing: 0,
  },
  // Card variants
  cardTitle: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 600,
    fontSize: '1rem',      // 16px
    lineHeight: '24px',
    letterSpacing: '0.15px',
  },
  cardSubtitle: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 600,
    fontSize: '0.875rem',  // 14px
    lineHeight: '20px',
    letterSpacing: '0.15px',
  },
  // Semantic variants
  muted: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 400,
    fontSize: '0.875rem',  // 14px
    lineHeight: 1.43,
    letterSpacing: '0.17px',
    color: '#81848F',
  },
  link: {
    fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    fontFeatureSettings,
    fontWeight: 400,
    fontSize: '0.875rem',  // 14px
    lineHeight: 1.43,
    letterSpacing: '0.17px',
    color: '#0288D1',
    textDecoration: 'none',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

// Map custom variants to MUI base variants for accessibility
const muiVariantMap: Record<KdsTypographyVariant, MuiTypographyProps['variant']> = {
  display1: 'h1',
  display2: 'h2',
  heading1: 'h3',
  heading2: 'h4',
  heading3: 'h6',
  bodyLarge: 'body1',
  body: 'body2',
  bodySmall: 'caption',
  label: 'overline',
  labelSmall: 'caption',
  cardTitle: 'subtitle1',
  cardSubtitle: 'subtitle2',
  muted: 'body2',
  link: 'body2',
};

// Check if variant is a custom Khipu variant
const isKhipuVariant = (variant: string): variant is KdsTypographyVariant => {
  return variant in variantStyles;
};

/**
 * Typography component for consistent text styling across the Khipu design system.
 *
 * @example
 * // Display text
 * <KdsTypography variant="display1">Hero Headline</KdsTypography>
 *
 * // Heading
 * <KdsTypography variant="heading3">Page Title</KdsTypography>
 *
 * // Body text
 * <KdsTypography variant="body">Regular body text</KdsTypography>
 *
 * // Label
 * <KdsTypography variant="label">Section Label</KdsTypography>
 *
 * // With color
 * <KdsTypography variant="body" color="tertiary">Muted text</KdsTypography>
 *
 * // Truncated text
 * <KdsTypography variant="body" truncate maxLines={2}>Long text...</KdsTypography>
 */
export const KdsTypography = forwardRef<HTMLSpanElement, KdsTypographyProps>(
  ({ variant = 'body', color = 'primary', truncate, maxLines, sx, ...props }, ref) => {
    const isCustomVariant = typeof variant === 'string' && isKhipuVariant(variant);

    // Build sx styles
    const combinedSx: SxProps<Theme> = [
      // Apply custom variant styles if it's a Khipu variant
      isCustomVariant ? variantStyles[variant] : {},
      // Apply color (unless it's muted or link which have built-in colors)
      isCustomVariant && variant !== 'muted' && variant !== 'link' && color
        ? { color: colorMap[color] || color }
        : {},
      // Truncation styles
      truncate
        ? {
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            ...(maxLines
              ? {
                  display: '-webkit-box',
                  WebkitLineClamp: maxLines,
                  WebkitBoxOrient: 'vertical',
                }
              : {
                  whiteSpace: 'nowrap',
                }),
          }
        : {},
      // User-provided sx
      ...(Array.isArray(sx) ? sx : [sx]),
    ];

    return (
      <MuiTypography
        ref={ref}
        variant={isCustomVariant ? muiVariantMap[variant] : variant}
        sx={combinedSx}
        {...props}
      />
    );
  }
);

KdsTypography.displayName = 'KdsTypography';

export default KdsTypography;
