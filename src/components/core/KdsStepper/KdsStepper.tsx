/**
 * Khipu Design System - Stepper Component
 *
 * Matchea exactamente el markup del taglib `mat:stepper` de payment:
 *
 *   <div class="kds-stepper">
 *     <div class="kds-step [completed|current]">
 *       <div class="kds-step-indicator"></div>   <!-- vacío: check via CSS -->
 *       <div class="kds-step-label">Label</div>
 *     </div>
 *     ...
 *   </div>
 *
 * Specs CSS-driven:
 * - La línea conectora horizontal es `.kds-stepper::before` (NO un `<div>`).
 * - El check de completed viene de `.kds-step-indicator::after { content: "check" }`.
 * - Sin `numbered` el número del step está oculto (`font-size: 0`).
 *
 * Modificadores opcionales (aditivos; sin ellos el markup es el de arriba):
 * - `.kds-stepper--numbered`: número dentro del indicador (`numbered`).
 * - `.kds-stepper--primary`: paso actual en color de marca (`color="primary"`).
 * - `.kds-stepper--current-label`: con el stepper angosto (≤ 560px de ancho propio,
 *   container query) solo se ve la etiqueta del paso actual (`currentLabelOnly`).
 * El paso actual lleva `aria-current="step"`.
 *
 * @gsp `mat:stepper` taglib (MaterialTagLib.groovy:817)
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Labels de cada step. La longitud del array determina el número de pasos. */
  steps: string[];
  /**
   * Índice 0-based del step actual.
   * - Steps `< current` → `.completed` (verde con check)
   * - Step `== current` → `.current` (azul info, o primary con `color="primary"`)
   * - Steps `> current` → pending (gris)
   */
  current: number;
  /**
   * Muestra el número de paso (1-based) dentro del indicador. Los pasos completados
   * mantienen el check. Aplica `.kds-stepper--numbered`.
   */
  numbered?: boolean;
  /**
   * Color del paso actual: `info` (default, como hasta ahora) o `primary` (color de marca).
   * `primary` aplica `.kds-stepper--primary`.
   * @default 'info'
   */
  color?: 'info' | 'primary';
  /**
   * Con el stepper angosto (≤ 560px de su propio ancho, no del viewport: container query)
   * muestra solo la etiqueta del paso actual; las demás
   * quedan ocultas visualmente pero disponibles para lectores de pantalla.
   * Aplica `.kds-stepper--current-label`.
   */
  currentLabelOnly?: boolean;
}

export const KdsStepper = forwardRef<HTMLDivElement, KdsStepperProps>(
  ({ steps, current, numbered, color = 'info', currentLabelOnly, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx(
        'kds-stepper',
        numbered && 'kds-stepper--numbered',
        color === 'primary' && 'kds-stepper--primary',
        currentLabelOnly && 'kds-stepper--current-label',
        className,
      )}
      {...props}
    >
      {steps.map((label, i) => (
        <div
          key={`${i}-${label}`}
          className={clsx('kds-step', i < current && 'completed', i === current && 'current')}
          aria-current={i === current ? 'step' : undefined}
        >
          <div className="kds-step-indicator">{numbered ? i + 1 : null}</div>
          <div className="kds-step-label">{label}</div>
        </div>
      ))}
    </div>
  ),
);
KdsStepper.displayName = 'KdsStepper';
