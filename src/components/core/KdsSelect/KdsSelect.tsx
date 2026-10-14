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
 * Variante `readOnly` (valor precargado que no se edita, ej. datos que vienen del banco):
 * `<select>` no soporta `readonly` y `disabled` no envía el valor en el form, así que se
 * renderiza el mismo markup que `KdsTextField readOnly` (`.field.locked` + candado) con el
 * texto de la opción elegida, más un `<input type="hidden">` que lleva `name` y el value:
 *
 *   <div class="field label border suffix locked">
 *     <input type="text" id="..." value="Santander" placeholder=" " readonly>
 *     <label for="...">Banco</label>
 *     <i class="material-symbols-outlined" aria-hidden="true">lock</i>
 *     <input type="hidden" name="bank" value="santander">
 *   </div>
 *
 * En ese modo el `ref` no se asigna (no hay `<select>` en el DOM).
 *
 * @gsp `mat:select` taglib (MaterialTagLib.groovy:260); readOnly → `mat:fieldLocked` + `g:hiddenField`
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
  /**
   * Solo lectura: muestra el texto de la opción elegida en un field `.locked` con candado y
   * envía el value por un `<input type="hidden">` (lleva `name` y `form`). `disabled` tiene
   * precedencia.
   *
   * En este modo no hay `<select>` en el DOM: el `ref` queda en `null` y solo pasan al input
   * visible los atributos `aria-*`, `data-*` y `title` (no los handlers de evento del select).
   * `required` se muestra como `*` en la label pero no se aplica: un campo readonly no se valida.
   */
  readOnly?: boolean;
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
      readOnly,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const fieldId = id || `kds-select-${label.toLowerCase().replace(/\s+/g, '-')}`;

    if (readOnly && !disabled) {
      const selectedValue = String(props.value ?? props.defaultValue ?? '');
      const selectedLabel = options.find((opt) => opt.value === selectedValue)?.label ?? '';
      // Only attributes that make sense on a text input are carried over; select-typed
      // event handlers do not apply to it.
      const passthrough = Object.fromEntries(
        Object.entries(props).filter(
          ([key]) => key.startsWith('aria-') || key.startsWith('data-') || key === 'title',
        ),
      );
      return (
        <div
          className={clsx(
            'field',
            'label',
            'border',
            'suffix',
            'locked',
            prefixIcon && 'prefix',
            error && 'invalid',
            fullWidth && 'kds-w-full',
            className,
          )}
        >
          {prefixIcon && <i className="material-symbols-outlined">{prefixIcon}</i>}
          {/* No `required`: a readonly input is barred from constraint validation, so the
              attribute would only make screen readers announce a requirement that never
              applies. The visual mark stays in the label. */}
          <input {...passthrough} id={fieldId} type="text" value={selectedLabel} placeholder=" " readOnly />
          <label htmlFor={fieldId}>
            {label}
            {required && ' *'}
          </label>
          <i className="material-symbols-outlined" aria-hidden="true">
            lock
          </i>
          {props.name && (
            <input type="hidden" name={props.name} value={selectedValue} form={props.form} />
          )}
          {helperText && <span className="helper">{helperText}</span>}
        </div>
      );
    }

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
