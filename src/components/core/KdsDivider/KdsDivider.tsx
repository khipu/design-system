/**
 * Khipu Design System - Divider Component
 *
 * Native HTML divider with BeerCSS styling.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsDividerProps extends React.HTMLAttributes<HTMLHRElement> {
  dashed?: boolean;
  /**
   * Centered text over the line (e.g. "o" between two alternatives). Renders the existing
   * `.kds-divider-text` (a `<div>` with the text in a `<span>`) instead of an `<hr>`; the text
   * stays readable by screen readers. `dashed` does not apply.
   */
  label?: React.ReactNode;
}

export const KdsDivider = forwardRef<HTMLHRElement, KdsDividerProps>(
  ({ dashed, label, className, ...props }, ref) =>
    label != null && label !== '' ? (
      <div
        // The ref is typed for the <hr>; with a label it points to the wrapper <div>.
        ref={ref as unknown as React.Ref<HTMLDivElement>}
        className={clsx('kds-divider-text', className)}
        {...(props as React.HTMLAttributes<HTMLDivElement>)}
      >
        <span>{label}</span>
      </div>
    ) : (
      <hr ref={ref} className={clsx(dashed ? 'kds-hr-dashed' : 'kds-hr', className)} {...props} />
    ),
);
KdsDivider.displayName = 'KdsDivider';
