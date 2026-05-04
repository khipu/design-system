/**
 * Khipu Design System - RadioGroup Component
 *
 * Native HTML radio group with BeerCSS styling.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsRadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface KdsRadioGroupProps extends Omit<React.FieldsetHTMLAttributes<HTMLFieldSetElement>, 'onChange'> {
  label?: string;
  name: string;
  options: KdsRadioOption[];
  value?: string;
  onChange?: (value: string) => void;
}

export const KdsRadioGroup = forwardRef<HTMLFieldSetElement, KdsRadioGroupProps>(
  ({ label, name, options, value, onChange, className, ...props }, ref) => (
    <fieldset ref={ref} className={clsx('kds-radio-group', className)} {...props}>
      {label && <legend>{label}</legend>}
      {options.map((opt) => (
        <label key={opt.value} className="field">
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
