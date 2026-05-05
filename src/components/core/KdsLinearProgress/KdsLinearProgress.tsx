/**
 * Khipu Design System - LinearProgress Component
 *
 * Native HTML progress element with BeerCSS styling.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsLinearProgressProps extends React.HTMLAttributes<HTMLProgressElement> {
  value?: number;
  max?: number;
}

export const KdsLinearProgress = forwardRef<HTMLProgressElement, KdsLinearProgressProps>(
  ({ value, max = 100, className, ...props }, ref) => (
    <progress ref={ref} className={clsx('kds-progress', className)} value={value} max={max} {...props} />
  ),
);
KdsLinearProgress.displayName = 'KdsLinearProgress';
