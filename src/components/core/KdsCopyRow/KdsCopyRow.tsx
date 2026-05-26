/**
 * Khipu Design System - CopyRow Component
 *
 * Fila clickeable que copia su `value` al portapapeles. El ROW completo es el botón.
 *
 * Markup canónico (mirrors `src/beercss/demo/payment-components.html`):
 *
 *   <button class="kds-copy-row" data-copy="value">
 *     <i class="material-symbols-outlined">content_copy</i>   ← icon a la IZQUIERDA
 *     <div>
 *       <span class="kds-copy-row-label">Banco</span>
 *       <span class="kds-copy-row-value">Banco Security</span>
 *     </div>
 *     <span class="kds-copy-toast">
 *       <i class="material-symbols-outlined">check_circle</i> Copiado
 *     </span>
 *   </button>
 *
 * Cuando `.copied`:
 *   - bg → success-soft, border → success-main
 *   - `.kds-copy-toast` aparece (position absolute right, opacity 0 → 1)
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

export interface KdsCopyRowProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'children' | 'onClick'> {
  /** Label arriba (uppercase caption). */
  label: string;
  /** Valor mostrado y copiado al portapapeles. */
  value: string;
  /** Texto del toast cuando se copia. Default: "Copiado". */
  copiedText?: string;
}

export const KdsCopyRow = forwardRef<HTMLButtonElement, KdsCopyRowProps>(
  ({ label, value, copiedText = 'Copiado', className, ...props }, ref) => {
    const { copied, copy } = useCopyToClipboard();
    return (
      <button
        ref={ref}
        type="button"
        className={clsx('kds-copy-row', copied && 'copied', className)}
        data-copy={value}
        onClick={() => copy(value)}
        aria-label={`Copiar ${label}: ${value}`}
        {...props}
      >
        <i className="material-symbols-outlined" aria-hidden="true">
          content_copy
        </i>
        <div>
          <span className="kds-copy-row-label">{label}</span>
          <span className="kds-copy-row-value">{value}</span>
        </div>
        <span className="kds-copy-toast" aria-hidden="true">
          <i className="material-symbols-outlined">check_circle</i> {copiedText}
        </span>
      </button>
    );
  },
);
KdsCopyRow.displayName = 'KdsCopyRow';
