/**
 * Khipu Design System - Typography Component
 *
 * Native HTML + kds-* classes for consistent text styles based on design tokens.
 * Renders semantic HTML elements (h1-h6, p, span, label) with corresponding CSS classes.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

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
  | 'body-large'    // 16px Regular - Large body text
  | 'body'          // 14px Regular - Default body text
  | 'body-small'    // 12px Regular - Small body text
  // Labels & UI elements
  | 'label'         // 12px SemiBold UPPERCASE - Section labels, overlines
  | 'label-small'   // 10px Medium - Footer codes, small labels
  // Semantic colors
  | 'muted'         // 14px Regular - Muted/secondary text
  | 'link';         // 14px Regular - Link text style

type ElementTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div' | 'label';

/**
 * Map typography variants to their semantic HTML elements
 */
const variantTag: Record<KdsTypographyVariant, ElementTag> = {
  display1: 'h1',
  display2: 'h2',
  heading1: 'h1',
  heading2: 'h2',
  heading3: 'h3',
  'body-large': 'p',
  body: 'p',
  'body-small': 'p',
  label: 'span',
  'label-small': 'span',
  muted: 'p',
  link: 'span',
};

export interface KdsTypographyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The typography variant to use
   * @default 'body'
   */
  variant?: KdsTypographyVariant;
  /**
   * Text color preset
   */
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'inherit';
  /**
   * Override the default HTML element for the variant
   */
  as?: ElementTag;
}

/**
 * Typography component for consistent text styling across the Khipu design system.
 *
 * @example
 * // Display text - renders as <h1> with kds-text-display1
 * <KdsTypography variant="display1">Hero Headline</KdsTypography>
 *
 * // Heading - renders as <h2> with kds-text-heading2
 * <KdsTypography variant="heading2">Section Title</KdsTypography>
 *
 * // Body text - renders as <p> with kds-text-body
 * <KdsTypography variant="body">Regular body text</KdsTypography>
 *
 * // Label - renders as <span> with kds-text-label
 * <KdsTypography variant="label">Section Label</KdsTypography>
 *
 * // With color
 * <KdsTypography variant="body" color="muted">Muted text</KdsTypography>
 *
 * // Override element with as prop
 * <KdsTypography variant="heading1" as="div">Custom element</KdsTypography>
 */
export const KdsTypography = forwardRef<HTMLElement, KdsTypographyProps>(
  ({ variant = 'body', color, as, children, className, ...props }, ref) => {
    const Tag = as || variantTag[variant];

    return (
      <Tag
        ref={ref as React.Ref<HTMLParagraphElement>}
        className={clsx(
          `kds-text-${variant}`,
          color && color !== 'inherit' && `kds-text-${color}`,
          className,
        )}
        {...props}
      >
        {children}
      </Tag>
    );
  }
);

KdsTypography.displayName = 'KdsTypography';

export default KdsTypography;
