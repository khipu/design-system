/**
 * Khipu Design System - Chip Component
 *
 * Native HTML chip with BeerCSS kds-badge styling.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsChipColor = 'primary' | 'success' | 'error' | 'warning' | 'info';

export interface KdsChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  color?: KdsChipColor;
  icon?: string;
  onDelete?: () => void;
}

export const KdsChip = forwardRef<HTMLSpanElement, KdsChipProps>(
  ({ color, icon, onDelete, children, className, ...props }, ref) => (
    <span ref={ref} className={clsx('kds-badge', color, className)} {...props}>
      {icon && <i className="material-symbols-outlined">{icon}</i>}
      {children}
      {onDelete && (
        <button className="kds-btn kds-btn-text kds-btn-sm" onClick={onDelete} aria-label="Eliminar">
          <i className="material-symbols-outlined">close</i>
        </button>
      )}
    </span>
  ),
);
KdsChip.displayName = 'KdsChip';
