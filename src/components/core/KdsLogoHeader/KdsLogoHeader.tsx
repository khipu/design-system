/**
 * Khipu Design System - LogoHeader Component
 *
 * A header bar component that displays the Khipu logo, a transaction code,
 * and a close button. Used at the top of payment flow screens.
 *
 * Built with composable sub-components for maximum flexibility.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

// Import Khipu logo
import khipuLogo from '../../../assets/images/khipu-logo-color.svg';

// =============================================================================
// TYPES
// =============================================================================

export interface KdsLogoHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content - typically LogoHeader sub-components */
  children?: React.ReactNode;
}

export interface KdsLogoHeaderLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Custom logo content. Defaults to Khipu text logo */
  children?: React.ReactNode;
}

export interface KdsLogoHeaderSeparatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Separator character. Defaults to "|" */
  children?: React.ReactNode;
}

export interface KdsLogoHeaderCodeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Transaction or reference code to display */
  children: React.ReactNode;
}

export interface KdsLogoHeaderCloseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Callback fired when the close button is clicked */
  onClose?: () => void;
}

// =============================================================================
// DEFAULT KHIPU LOGO
// =============================================================================

const KhipuLogo = () => (
  <img
    src={khipuLogo}
    alt="Khipu"
    className="kds-logo-header-logo-img"
  />
);

// =============================================================================
// SUB-COMPONENTS
// =============================================================================

/**
 * Logo section of the LogoHeader.
 *
 * @example
 * ```tsx
 * <KdsLogoHeaderLogo />
 *
 * <KdsLogoHeaderLogo>
 *   <img src="/custom-logo.svg" alt="Custom Logo" />
 * </KdsLogoHeaderLogo>
 * ```
 */
export const KdsLogoHeaderLogo = forwardRef<HTMLDivElement, KdsLogoHeaderLogoProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('kds-logo-header-logo', className)}
        {...props}
      >
        {children || <KhipuLogo />}
      </div>
    );
  }
);

KdsLogoHeaderLogo.displayName = 'KdsLogoHeaderLogo';

/**
 * Separator element between logo and code.
 *
 * @example
 * ```tsx
 * <KdsLogoHeaderSeparator />
 *
 * <KdsLogoHeaderSeparator>•</KdsLogoHeaderSeparator>
 * ```
 */
export const KdsLogoHeaderSeparator = forwardRef<HTMLSpanElement, KdsLogoHeaderSeparatorProps>(
  ({ children = '|', className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx('kds-logo-header-separator', className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

KdsLogoHeaderSeparator.displayName = 'KdsLogoHeaderSeparator';

/**
 * Transaction code section.
 *
 * @example
 * ```tsx
 * <KdsLogoHeaderCode>HUSK-P7ZZ-XGYG</KdsLogoHeaderCode>
 * ```
 */
export const KdsLogoHeaderCode = forwardRef<HTMLSpanElement, KdsLogoHeaderCodeProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx('kds-logo-header-code', className)}
        {...props}
      >
        {children}
      </span>
    );
  }
);

KdsLogoHeaderCode.displayName = 'KdsLogoHeaderCode';

/**
 * Close button for the header.
 *
 * @example
 * ```tsx
 * <KdsLogoHeaderCloseButton onClose={() => handleClose()} />
 * ```
 */
export const KdsLogoHeaderCloseButton = forwardRef<HTMLButtonElement, KdsLogoHeaderCloseButtonProps>(
  ({ onClose, className, ...props }, ref) => {
    return (
      <div className="kds-logo-header-close-wrapper">
        <button
          ref={ref}
          onClick={onClose}
          className={clsx('kds-btn kds-btn-icon', className)}
          aria-label="close"
          {...props}
        >
          <i className="material-symbols-outlined">close</i>
        </button>
      </div>
    );
  }
);

KdsLogoHeaderCloseButton.displayName = 'KdsLogoHeaderCloseButton';

// =============================================================================
// MAIN COMPONENT
// =============================================================================

/**
 * LogoHeader bar component.
 *
 * A composable header component that can be used with sub-components
 * for maximum flexibility, or with default children for quick usage.
 *
 * @example
 * ```tsx
 * // Composable usage
 * <KdsLogoHeader>
 *   <KdsLogoHeaderLogo />
 *   <KdsLogoHeaderSeparator />
 *   <KdsLogoHeaderCode>HUSK-P7ZZ-XGYG</KdsLogoHeaderCode>
 *   <KdsLogoHeaderCloseButton onClose={() => handleClose()} />
 * </KdsLogoHeader>
 *
 * // Simple usage with defaults
 * <KdsLogoHeader>
 *   <KdsLogoHeaderLogo />
 *   <KdsLogoHeaderSeparator />
 *   <KdsLogoHeaderCode>ABC-1234-XYZ</KdsLogoHeaderCode>
 * </KdsLogoHeader>
 * ```
 */
export const KdsLogoHeader = forwardRef<HTMLDivElement, KdsLogoHeaderProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('kds-brand-row', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

KdsLogoHeader.displayName = 'KdsLogoHeader';
