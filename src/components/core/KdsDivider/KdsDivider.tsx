/**
 * Khipu Design System - Divider Component
 *
 * Native HTML divider with BeerCSS styling.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsDividerProps extends React.HTMLAttributes<HTMLHRElement> {
  dashed?: boolean;
}

export const KdsDivider = forwardRef<HTMLHRElement, KdsDividerProps>(
  ({ dashed, className, ...props }, ref) => (
    <hr ref={ref} className={clsx(dashed ? 'kds-hr-dashed' : 'kds-hr', className)} {...props} />
  ),
);
KdsDivider.displayName = 'KdsDivider';
