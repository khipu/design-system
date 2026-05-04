/**
 * Khipu Design System - Stepper Component
 *
 * Native HTML stepper for multi-step flows.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsStepperProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: number;
  current: number;
}

export const KdsStepper = forwardRef<HTMLDivElement, KdsStepperProps>(
  ({ steps, current, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-stepper', className)} data-steps={steps} data-current={current} {...props}>
      {Array.from({ length: steps }, (_, i) => (
        <div key={i} className={clsx('kds-step', i < current && 'completed', i === current && 'current')}>
          <div className="kds-step-indicator">{i < current ? '✓' : i + 1}</div>
          {i < steps - 1 && <div className="kds-step-line" />}
        </div>
      ))}
    </div>
  ),
);
KdsStepper.displayName = 'KdsStepper';
