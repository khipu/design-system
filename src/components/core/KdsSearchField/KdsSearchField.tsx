/**
 * Khipu Design System - SearchField Component
 *
 * Campo de búsqueda reutilizable (input `type="search"`) con el mismo look que el
 * search del `KdsBankModal`: borde sutil, radio md, foco con borde primario y halo.
 * Sin label flotante. Pensado para usarse standalone (ej: lista de bancos inline en
 * khenshin) o dentro del `KdsBankModal`, que lo consume como única fuente de verdad.
 *
 * Acepta value, onChange, placeholder, etc. por spread de las props nativas del input.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsSearchFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Muestra un ícono de lupa al inicio del campo (additive, off por defecto). */
  withIcon?: boolean;
}

export const KdsSearchField = forwardRef<HTMLInputElement, KdsSearchFieldProps>(
  ({ className, withIcon = false, ...props }, ref) => {
    const input = (
      <input
        ref={ref}
        type="search"
        className={clsx('kds-search-field', className)}
        {...props}
      />
    );

    if (!withIcon) {
      return input;
    }

    return (
      <div className="kds-search-field-wrapper">
        <i className="material-symbols-outlined kds-search-field-icon" aria-hidden="true">
          search
        </i>
        {input}
      </div>
    );
  },
);
KdsSearchField.displayName = 'KdsSearchField';
