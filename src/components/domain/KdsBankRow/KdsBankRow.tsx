import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsBankRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'name'> {
  /**
   * Contenido principal de la fila. Acepta texto o nodo — permite contenido en
   * columnas por elemento (p. ej. tipo de cuenta · Nº · saldo) para selección de cuentas.
   */
  name: React.ReactNode;
  logoUrl?: string;
  selected?: boolean;
  /**
   * Oculta el slot de logo/iniciales. Útil para filas sin marca (p. ej. selección
   * de cuenta de origen, que no tiene logo).
   */
  hideLogo?: boolean;
}

export const KdsBankRow = forwardRef<HTMLButtonElement, KdsBankRowProps>(
  ({ name, logoUrl, selected, hideLogo, className, ...props }, ref) => {
    // Las iniciales / `alt` solo aplican cuando el contenido es texto plano.
    const nameStr = typeof name === 'string' ? name : '';
    return (
      <button
        ref={ref}
        type="button"
        className={clsx('kds-bank-row', selected && 'selected', className)}
        {...props}
      >
        {!hideLogo && (
          <span className="kds-bank-row-logo">
            {logoUrl ? (
              <img src={logoUrl} alt={nameStr} />
            ) : (
              <span className="initials">{nameStr.charAt(0)}</span>
            )}
          </span>
        )}
        <span className="kds-bank-row-name">{name}</span>
        <i className="material-symbols-outlined">{selected ? 'check_circle' : 'chevron_right'}</i>
      </button>
    );
  },
);
KdsBankRow.displayName = 'KdsBankRow';
