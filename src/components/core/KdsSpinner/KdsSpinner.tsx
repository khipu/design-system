/**
 * Khipu Design System - Spinner Component
 *
 * Spinner circular animado usando el patrón nativo de BeerCSS:
 *   <progress class="circle [small|large] indeterminate"></progress>
 *
 * Tamaños (BeerCSS):
 * - `small` → 1.5rem (24px)
 * - default → 2.5rem (40px)
 * - `large` → 3.5rem (56px)
 *
 * El `<progress>` indeterminate aplica animación `to-rotate 1s linear infinite` con
 * gradient cónico (currentColor / `--active`).
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsSpinnerSize = 'small' | 'medium' | 'large';

export interface KdsSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Tamaño del spinner. Default `medium` (sin modifier = 2.5rem). */
  size?: KdsSpinnerSize;
  /** Texto bajo el spinner (visible). Si se omite, se usa "Cargando" como sr-only para a11y. */
  label?: string;
}

/** Mapeo a la clase BeerCSS (`medium` = sin modifier). */
const SIZE_CLASS: Record<KdsSpinnerSize, string | null> = {
  small: 'small',
  medium: null,
  large: 'large',
};

export const KdsSpinner = forwardRef<HTMLDivElement, KdsSpinnerProps>(
  ({ size = 'medium', label, className, ...props }, ref) => {
    const sizeClass = SIZE_CLASS[size];
    return (
      <div
        ref={ref}
        className={clsx('kds-flex kds-flex-col kds-items-center kds-gap-2', className)}
        role="status"
        {...props}
      >
        <progress className={clsx('circle indeterminate', sizeClass)} />
        {label && <span className="kds-text-body-small kds-text-muted">{label}</span>}
        {!label && <span className="kds-hidden">Cargando</span>}
      </div>
    );
  },
);
KdsSpinner.displayName = 'KdsSpinner';
