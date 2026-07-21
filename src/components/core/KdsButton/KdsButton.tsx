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

export type KdsButtonVariant = 'primary' | 'secondary' | 'outlined' | 'outlined-white' | 'text' | 'success' | 'warning' | 'error' | 'error-text';
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
 * Compose with: para apilar CTAs al pie de una card, envolver en
 * `.kds-btn-stack` (NO usar gap/margin inline) — primario arriba, outlined
 * debajo, todos `fullWidth`. Ver `Patterns/CSS-only → ButtonStack`.
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
      {loading ? (
        <>
          <progress className="circle indeterminate small" />
          <span>{children}</span>
        </>
      ) : (
        /* Iconos DENTRO del label (inline): si el texto envuelve en pantallas angostas,
           el icono fluye con la primera linea en vez de quedar anclado al borde del boton. */
        <span className="kds-btn-label">
          {startIcon && (
            <span className="kds-icon kds-icon-start">
              <i className="material-symbols-outlined">{startIcon}</i>
            </span>
          )}
          {children}
          {endIcon && (
            <span className="kds-icon kds-icon-end">
              <i className="material-symbols-outlined">{endIcon}</i>
            </span>
          )}
        </span>
      )}
    </button>
  ),
);

KdsButton.displayName = 'KdsButton';

