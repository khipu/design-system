import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsMontoRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Título principal (e.g. "Monto a transferir"). */
  title: string;
  /** Valor destacado (e.g. "$3.300"). */
  value: string;
  /**
   * Texto secundario opcional bajo el título (deadline/subtitle).
   * Acepta un nodo React para incluir line-breaks o formato.
   */
  deadline?: React.ReactNode;
}

/**
 * KdsMontoRow — bloque destacado de monto con título + deadline opcional + valor.
 *
 * Layout (spec):
 * - `display: flex; justify-content: space-between`
 * - `padding: 14px 0 8px`
 * - `border-top: 1px dashed var(--kds-border-medium)`
 *
 * Tipografía:
 * - `.kds-monto-row-title`: `font-size: sm`, `font-weight: 500`
 * - `.kds-monto-row-deadline`: `font-size: xs`, `color: text-secondary`
 * - `.kds-monto-row-value`: `font-size: 24px`, `font-weight: 700`, `letter-spacing: tight`
 *
 * @gsp `_manualVerifyChileMaterial.gsp` y demás manualVerify
 * @css .kds-monto-row, .kds-monto-row-title, .kds-monto-row-deadline, .kds-monto-row-value
 */
export const KdsMontoRow = forwardRef<HTMLDivElement, KdsMontoRowProps>(
  ({ title, value, deadline, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-monto-row', className)} {...props}>
      <div>
        <div className="kds-monto-row-title">{title}</div>
        {deadline && <div className="kds-monto-row-deadline">{deadline}</div>}
      </div>
      <div className="kds-monto-row-value">{value}</div>
    </div>
  ),
);
KdsMontoRow.displayName = 'KdsMontoRow';
