/**
 * Khipu Design System - Spinner Component
 *
 * Native HTML spinner with BeerCSS loader styling.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsSpinnerSize = 'small' | 'medium' | 'large';

export interface KdsSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: KdsSpinnerSize;
  label?: string;
}

export const KdsSpinner = forwardRef<HTMLDivElement, KdsSpinnerProps>(
  ({ size = 'medium', label, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-flex kds-flex-col kds-items-center kds-gap-2', className)} role="status" {...props}>
      <span className={clsx('loader', size)} />
      {label && <span className="kds-text-body-small kds-text-muted">{label}</span>}
      {!label && <span className="kds-hidden">Cargando</span>}
    </div>
  ),
);
KdsSpinner.displayName = 'KdsSpinner';
