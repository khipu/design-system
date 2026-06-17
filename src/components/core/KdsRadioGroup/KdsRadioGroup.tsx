/**
 * Khipu Design System - RadioGroup Component
 *
 * Native HTML radio group with BeerCSS `.radio` class.
 *
 * Contrato BeerCSS:
 *   <fieldset class="kds-radio-group">
 *     <legend>Label</legend>
 *     <label class="radio">
 *       <input type="radio" name="x" value="a" />
 *       <span>Opción A</span>
 *     </label>
 *     ...
 *   </fieldset>
 *
 * Specs:
 * - Input oculto, sprite circular generado por `:is(.checkbox, .radio) > span::before`
 * - Tamaño default 18x18; modifiers `.small` (14px) / `.large` (22px)
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsRadioOption {
  value: string;
  /** Texto o nodo del label de la opción (permite contenido rico: montos, enlaces, tablas). */
  label: React.ReactNode;
  disabled?: boolean;
}

export interface KdsRadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  label?: string;
  name: string;
  options: KdsRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  /** Tamaño del sprite del radio (aplicado a cada opción). */
  size?: 'small' | 'large';
  /**
   * Variante de presentación.
   * - `'default'`: filas simples (radio + texto).
   * - `'card'`: cada opción como fila con borde (estilo selección de banco/cuenta);
   *   hover y opción seleccionada resaltada. Mantiene el control radio.
   * @default 'default'
   */
  variant?: 'default' | 'card';
}

export const KdsRadioGroup = forwardRef<HTMLFieldSetElement, KdsRadioGroupProps>(
  ({ label, name, options, value, onChange, size, variant, className, ...props }, ref) => (
    <fieldset
      ref={ref}
      className={clsx('kds-radio-group', variant === 'card' && 'kds-radio-group--card', className)}
      {...props}
    >
      {label && <legend>{label}</legend>}
      {options.map((opt) => (
        <label key={opt.value} className={clsx('radio', size)}>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            disabled={opt.disabled}
            onChange={() => onChange?.(opt.value)}
          />
          <span>{opt.label}</span>
        </label>
      ))}
    </fieldset>
  ),
);
KdsRadioGroup.displayName = 'KdsRadioGroup';
