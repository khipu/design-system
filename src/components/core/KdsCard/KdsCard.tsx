/**
 * Khipu Design System - Card Component
 *
 * A card component built with native HTML and kds-* CSS classes.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

// =============================================================================
// TYPES
// =============================================================================

export type KdsCardVariant = 'elevated' | 'outlined';

export interface KdsCardProps extends React.HTMLAttributes<HTMLElement> {
  /** Visual variant */
  variant?: KdsCardVariant;
  /** Dimmed appearance */
  dimmed?: boolean;
}

export interface KdsCardSectionProps extends React.HTMLAttributes<HTMLDivElement> {}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Card container component for grouping related content.
 *
 * Built with native HTML and kds-* CSS classes.
 *
 * @example
 * ```tsx
 * // Basic card
 * <KdsCard>
 *   <KdsCardBody>Content</KdsCardBody>
 * </KdsCard>
 *
 * // Card with header and footer
 * <KdsCard>
 *   <KdsCardHeader>Title</KdsCardHeader>
 *   <KdsCardBody>Content</KdsCardBody>
 *   <KdsCardFooter>Footer</KdsCardFooter>
 * </KdsCard>
 * ```
 */
export const KdsCard = forwardRef<HTMLElement, KdsCardProps>(
  ({ variant = 'elevated', dimmed, children, className, ...props }, ref) => (
    <article
      ref={ref}
      className={clsx(
        variant === 'elevated' ? 'kds-card-elevated' : 'kds-card-outlined',
        dimmed && 'kds-card-dimmed',
        className,
      )}
      {...props}
    >
      {children}
    </article>
  ),
);
KdsCard.displayName = 'KdsCard';

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * Card header section.
 */
export const KdsCardHeader = forwardRef<HTMLDivElement, KdsCardSectionProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-card-header', className)} {...props}>
      {children}
    </div>
  ),
);
KdsCardHeader.displayName = 'KdsCardHeader';

/**
 * Main content area of the card.
 */
export const KdsCardBody = forwardRef<HTMLDivElement, KdsCardSectionProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-card-body', className)} {...props}>
      {children}
    </div>
  ),
);
KdsCardBody.displayName = 'KdsCardBody';

/**
 * Card footer section, typically for actions.
 */
export const KdsCardFooter = forwardRef<HTMLDivElement, KdsCardSectionProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-card-footer', className)} {...props}>
      {children}
    </div>
  ),
);
KdsCardFooter.displayName = 'KdsCardFooter';

export default KdsCard;
