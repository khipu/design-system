/**
 * Khipu Design System - Button Component
 *
 * A button component built with native HTML and kds-* CSS classes.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

// =============================================================================
// TYPES
// =============================================================================

export type KdsButtonVariant = 'primary' | 'secondary' | 'outlined' | 'outlined-white' | 'text' | 'success';
export type KdsButtonSize = 'sm' | 'md';

export interface KdsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: KdsButtonVariant;
  /** Button size */
  size?: KdsButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Material Symbols icon name before label, e.g. "download" */
  startIcon?: string;
  /** Material Symbols icon name after label, e.g. "arrow_forward" */
  endIcon?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Primary action button component.
 *
 * Built with native HTML and kds-* CSS classes from the BeerCSS bundle.
 *
 * @example
 * ```tsx
 * <KdsButton variant="primary">
 *   Continuar
 * </KdsButton>
 *
 * <KdsButton variant="outlined">
 *   Cancelar
 * </KdsButton>
 *
 * <KdsButton variant="success" fullWidth>
 *   Finalizar
 * </KdsButton>
 *
 * <KdsButton loading>
 *   Procesando...
 * </KdsButton>
 *
 * <KdsButton startIcon="download">
 *   Descargar comprobante
 * </KdsButton>
 * ```
 */
export const KdsButton = forwardRef<HTMLButtonElement, KdsButtonProps>(
  (
    {
      variant = 'primary',
      size,
      fullWidth = false,
      loading = false,
      disabled = false,
      startIcon,
      endIcon,
      children,
      className,
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      className={clsx(
        'kds-btn',
        `kds-btn-${variant}`,
        size && `kds-btn-${size}`,
        fullWidth && 'kds-btn-block',
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {!loading && startIcon && (
        <span className="kds-icon">
          <i className="material-symbols-outlined">{startIcon}</i>
        </span>
      )}
      {loading ? (
        <>
          <span className="loader small" />
          <span>{children}</span>
        </>
      ) : (
        <span>{children}</span>
      )}
      {!loading && endIcon && (
        <span className="kds-icon">
          <i className="material-symbols-outlined">{endIcon}</i>
        </span>
      )}
    </button>
  ),
);

KdsButton.displayName = 'KdsButton';

