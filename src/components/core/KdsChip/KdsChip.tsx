/**
 * Khipu Design System - Chip Component
 *
 * Chip/badge inline con color, icon opcional y close opcional (deletable).
 *
 * Specs (CSS-derived):
 * - `.kds-badge`: inline-flex, align-items center, gap 4px, padding 2px 8px, radius sm
 * - `font-size: xs`, `font-weight: medium`, `line-height: 1.5`
 * - Icon prefix `<i>`: 14px, inline
 * - Close button (`.kds-badge-close`): 16×16 circular discreto, NO usa kds-btn
 *
 * Variantes de color: primary | success | error | warning | info
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsChipColor = 'primary' | 'success' | 'error' | 'warning' | 'info';

export interface KdsChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color variant. */
  color?: KdsChipColor;
  /** Material Symbol opcional al inicio del chip. */
  icon?: string;
  /**
   * Callback cuando se hace click en el icon de cerrar.
   * Si está definido, renderiza un icon-button discreto (NO usa kds-btn).
   */
  onDelete?: () => void;
}

export const KdsChip = forwardRef<HTMLSpanElement, KdsChipProps>(
  ({ color, icon, onDelete, children, className, ...props }, ref) => (
    <span ref={ref} className={clsx('kds-badge', color, className)} {...props}>
      {icon && <i className="material-symbols-outlined">{icon}</i>}
      <span>{children}</span>
      {onDelete && (
        <button
          type="button"
          className="kds-badge-close"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Eliminar"
        >
          <i className="material-symbols-outlined">close</i>
        </button>
      )}
    </span>
  ),
);
KdsChip.displayName = 'KdsChip';
