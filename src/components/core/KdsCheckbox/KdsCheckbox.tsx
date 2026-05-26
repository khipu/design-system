/**
 * Khipu Design System - Checkbox Component
 *
 * Wrapper React que matchea exactamente el markup del taglib `mat:checkBox` de payment:
 *
 *   <label class="checkbox">
 *     <input type="checkbox" id="..." name="..." value="..." [checked] [disabled]>
 *     <span>Label</span>
 *   </label>
 *
 * BeerCSS oculta el input via `opacity: 0` y renderiza un sprite vía `::before` con
 * `content: "check_box_outline_blank"` usando la fuente Material Symbols Outlined.
 *
 * NO agregamos `htmlFor` al label porque el `<input>` está anidado dentro: la
 * asociación es implícita y `for` puede causar doble-disparo del click event.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Texto del label mostrado al lado del sprite. Opcional (puede usar aria-label). */
  label?: string;
}

export const KdsCheckbox = forwardRef<HTMLInputElement, KdsCheckboxProps>(
  ({ label, className, ...props }, ref) => (
    <label className={clsx('checkbox', className)}>
      <input ref={ref} type="checkbox" {...props} />
      <span>{label}</span>
    </label>
  ),
);
KdsCheckbox.displayName = 'KdsCheckbox';
