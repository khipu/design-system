/**
 * Khipu Design System - Checkbox Component
 *
 * Native HTML checkbox with BeerCSS styling.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsCheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const KdsCheckbox = forwardRef<HTMLInputElement, KdsCheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    const fieldId = id || `kds-cb-${label?.toLowerCase().replace(/\s+/g, '-') || 'check'}`;
    return (
      <label className={clsx('field', className)} htmlFor={fieldId}>
        <input ref={ref} type="checkbox" id={fieldId} {...props} />
        <span>{label}</span>
      </label>
    );
  },
);
KdsCheckbox.displayName = 'KdsCheckbox';
