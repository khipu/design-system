/**
 * Khipu Design System - Select Component
 *
 * Native HTML `<select>` wrapped en el patrón BeerCSS `field label border`.
 * Matchea exactamente el markup que genera la taglib `mat:select` de payment.
 *
 * Markup canónico:
 *
 *   <div class="field label border [prefix] [invalid|valid|info|warning]">
 *     <i class="material-symbols-outlined">prefixIcon</i>  // opcional
 *     <select id="..." name="..." [required] [disabled]>
 *       <option value="">Placeholder...</option>           // opcional (noSelection)
 *       <option value="bci">BCI</option>
 *       ...
 *     </select>
 *     <label for="...">Banco *</label>
 *     <span class="helper">errorMessage o help</span>      // opcional
 *   </div>
 *
 * BeerCSS dibuja el chevron automáticamente, el floating label, focus ring, etc.
 *
 * @gsp `mat:select` taglib (MaterialTagLib.groovy:260)
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsSelectOption {
  /** Valor del `<option>` (string serializable). */
  value: string;
  /** Texto visible del `<option>`. */
  label: string;
  /** Si está disabled. */
  disabled?: boolean;
}

export interface KdsSelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  /** Floating label. */
  label: string;
  /** Lista de opciones del select. */
  options: KdsSelectOption[];
  /**
   * Texto del primer `<option>` con value="" (placeholder). Si está vacío, no se renderiza.
   * Equivalente a `noSelection` del taglib.
   */
  placeholder?: string;
  /** Helper text bajo el field (error o info). */
  helperText?: string;
  /** Estado inválido — aplica clase `.invalid` al wrapper. */
  error?: boolean;
  /** Material Symbols icon al inicio del field (aplica clase `.prefix`). */
  prefixIcon?: string;
  /** Full width (default: true). */
  fullWidth?: boolean;
}

export const KdsSelect = forwardRef<HTMLSelectElement, KdsSelectProps>(
  (
    {
      label,
      options,
      placeholder,
      helperText,
      error,
      prefixIcon,
      fullWidth = true,
      disabled,
      required,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const fieldId = id || `kds-select-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div
        className={clsx(
          'field',
          'label',
          'border',
          prefixIcon && 'prefix',
          error && 'invalid',
          fullWidth && 'kds-w-full',
          className,
        )}
      >
        {prefixIcon && <i className="material-symbols-outlined">{prefixIcon}</i>}
        <select
          ref={ref}
          id={fieldId}
          disabled={disabled}
          required={required}
          {...props}
        >
          {placeholder !== undefined && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <label htmlFor={fieldId}>
          {label}
          {required && ' *'}
        </label>
        {helperText && <span className="helper">{helperText}</span>}
      </div>
    );
  },
);

KdsSelect.displayName = 'KdsSelect';
