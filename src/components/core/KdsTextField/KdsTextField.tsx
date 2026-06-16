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
 * Variante `revealable` (campo de contraseña con mostrar/ocultar):
 * - El toggle es un `<a role="button">` — BeerCSS posiciona como icono del field a
 *   `:is(i, img, svg, progress.circle, a)` y da `pointer-events: all` solo a `<a>`/`.front`,
 *   así que el anchor es el elemento interactivo idiomático del field (no `<button>`).
 *
 * @gsp `mat:textField`, `mat:emailField`, `mat:passwordField`, `mat:numberField` (taglib `matFieldImpl`)
 */

import React, { forwardRef, useState } from 'react';
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
  /**
   * Campo de contraseña con toggle interactivo de mostrar/ocultar.
   *
   * Renderiza un botón "ojo" como suffix que alterna el `type` del input entre
   * `password` (oculto) y `text` (visible). Cuando es `true`, el `type` se
   * gestiona internamente (se ignora la prop `type`). No tiene efecto si el
   * field es `readOnly`. Toma precedencia sobre `endIcon`.
   */
  revealable?: boolean;
  /**
   * aria-label del toggle de contraseña, para i18n.
   * @default 'Mostrar u ocultar contraseña'
   */
  revealLabel?: string;
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
      type,
      revealable,
      revealLabel = 'Mostrar u ocultar contraseña',
      ...props
    },
    ref,
  ) => {
    const [revealed, setRevealed] = useState(false);
    const fieldId = id || `kds-field-${label.toLowerCase().replace(/\s+/g, '-')}`;
    // El toggle de contraseña solo aplica en campos editables (no readOnly ni disabled).
    const isRevealable = !!revealable && !readOnly && !props.disabled;
    // Cuando es revealable, el componente controla el `type`; si no, respeta el del consumidor.
    const inputType = isRevealable ? (revealed ? 'text' : 'password') : type;
    // readOnly hace que el "lock" icon se renderice al final como suffix.
    const hasSuffix = !!endIcon || readOnly || isRevealable;

    const toggleReveal = () => setRevealed((v) => !v);
    const onToggleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
      // `<a role=button>` debe operar con Enter y Space como un botón nativo.
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleReveal();
      }
    };

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
          type={inputType}
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
        {/* Toggle interactivo de contraseña (suffix). `<a>` es el elemento que BeerCSS
            posiciona como icono del field y al que da `pointer-events: all`. */}
        {isRevealable && (
          <a
            className="kds-field-reveal"
            role="button"
            tabIndex={0}
            aria-label={revealLabel}
            aria-pressed={revealed}
            onClick={toggleReveal}
            onKeyDown={onToggleKeyDown}
          >
            <i className="material-symbols-outlined" aria-hidden="true">
              {revealed ? 'visibility' : 'visibility_off'}
            </i>
          </a>
        )}
        {endIcon && !readOnly && !isRevealable && (
          <i className="material-symbols-outlined">{endIcon}</i>
        )}
        {helperText && <span className="helper">{helperText}</span>}
      </div>
    );
  },
);

KdsTextField.displayName = 'KdsTextField';
