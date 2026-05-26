/**
 * Khipu Design System - Stepper Component
 *
 * Matchea exactamente el markup del taglib `mat:stepper` de payment:
 *
 *   <div class="kds-stepper">
 *     <div class="kds-step [completed|current]">
 *       <div class="kds-step-indicator"></div>   <!-- vacío: número/check via CSS -->
 *       <div class="kds-step-label">Label</div>
 *     </div>
 *     ...
 *   </div>
 *
 * Specs CSS-driven:
 * - La línea conectora horizontal es `.kds-stepper::before` (NO un `<div>`).
 * - El check de completed viene de `.kds-step-indicator::after { content: "check" }`.
 * - El número del step está oculto (`font-size: 0`) — el design no usa números.
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
   * - Step `== current` → `.current` (azul info)
   * - Steps `> current` → pending (gris)
   */
  current: number;
}

export const KdsStepper = forwardRef<HTMLDivElement, KdsStepperProps>(
  ({ steps, current, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-stepper', className)} {...props}>
      {steps.map((label, i) => (
        <div
          key={`${i}-${label}`}
          className={clsx('kds-step', i < current && 'completed', i === current && 'current')}
        >
          <div className="kds-step-indicator" />
          <div className="kds-step-label">{label}</div>
        </div>
      ))}
    </div>
  ),
);
KdsStepper.displayName = 'KdsStepper';
