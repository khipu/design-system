/**
 * Khipu Design System - TextField Component
 *
 * Matchea exactamente el markup que genera `matFieldImpl()` del taglib `mat:textField` de payment:
 *
 *   <div class="field label border [prefix] [suffix] [invalid|valid|info|warning]">
 *     <i class="material-symbols-outlined">prefixIcon</i>    // si startIcon
 *     <input type="..." id="..." name="..." value="..." placeholder=" " [required] [disabled]>
 *     <label for="...">Label [*]</label>
 *     <i class="material-symbols-outlined">suffixIcon</i>    // si endIcon
 *     <span class="helper">errorMessage o help</span>        // si helperText
 *   </div>
 *
 * Reglas críticas del truco floating-label de BeerCSS:
 * - `placeholder=" "` (un espacio) — NUNCA aceptar placeholder real del consumidor.
 *   BeerCSS usa `input:placeholder-shown ~ label` para mantener la label abajo cuando el input
 *   está vacío. Si pasas un placeholder real, el label se queda siempre arriba y se superpone.
 * - El wrapper DEBE tener `.prefix` cuando hay icono al inicio (alinea la label al lado del icono).
 * - El wrapper DEBE tener `.suffix` cuando hay icono al final.
 *
 * @gsp `mat:textField`, `mat:emailField`, `mat:passwordField`, `mat:numberField` (taglib `matFieldImpl`)
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

// Omit `placeholder` — el componente lo controla internamente (siempre `" "`)
export interface KdsTextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'placeholder'> {
  /** Floating label. */
  label: string;
  /** Helper text bajo el field (error o info). */
  helperText?: string;
  /** Estado inválido — aplica `.invalid` al wrapper. */
  error?: boolean;
  /** Full width (default: true). */
  fullWidth?: boolean;
  /** Material Symbol al inicio del input (aplica clase `.prefix`). */
  startIcon?: string;
  /** Material Symbol al final del input (aplica clase `.suffix`). */
  endIcon?: string;
}

export const KdsTextField = forwardRef<HTMLInputElement, KdsTextFieldProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = true,
      readOnly,
      startIcon,
      endIcon,
      required,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const fieldId = id || `kds-field-${label.toLowerCase().replace(/\s+/g, '-')}`;
    // readOnly hace que el "lock" icon se renderice al final como suffix.
    const hasSuffix = !!endIcon || readOnly;

    return (
      <div
        className={clsx(
          'field',
          'label',
          'border',
          startIcon && 'prefix',
          hasSuffix && 'suffix',
          error && 'invalid',
          readOnly && 'locked',
          fullWidth && 'kds-w-full',
          className,
        )}
      >
        {startIcon && <i className="material-symbols-outlined">{startIcon}</i>}
        <input
          ref={ref}
          id={fieldId}
          readOnly={readOnly}
          required={required}
          {...props}
          /* `placeholder=" "` va DESPUÉS del spread para que NO se pueda override:
             el truco floating-label requiere exactamente un espacio. */
          placeholder=" "
        />
        <label htmlFor={fieldId}>
          {label}
          {required && ' *'}
        </label>
        {readOnly && <i className="material-symbols-outlined">lock</i>}
        {endIcon && !readOnly && <i className="material-symbols-outlined">{endIcon}</i>}
        {helperText && <span className="helper">{helperText}</span>}
      </div>
    );
  },
);

KdsTextField.displayName = 'KdsTextField';
