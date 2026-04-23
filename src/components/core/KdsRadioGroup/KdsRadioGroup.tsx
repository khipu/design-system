/**
 * Khipu Design System - RadioGroup Component
 *
 * A radio group component built on MUI RadioGroup with Khipu design system styling.
 */

import React, { forwardRef } from 'react';
import MuiRadioGroup, { RadioGroupProps as MuiRadioGroupProps } from '@mui/material/RadioGroup';
import MuiRadio, { RadioProps as MuiRadioProps } from '@mui/material/Radio';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

// =============================================================================
// TYPES
// =============================================================================

export type KdsRadioColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
export type KdsRadioSize = 'small' | 'medium';

export interface KdsRadioOption {
  /** Option value */
  value: string;
  /** Option label */
  label: React.ReactNode;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface KdsRadioGroupProps extends Omit<MuiRadioGroupProps, 'color'> {
  /** Group label */
  label?: React.ReactNode;
  /** Radio options (shorthand for creating Radio + FormControlLabel) */
  options?: KdsRadioOption[];
  /** Color scheme for radio buttons */
  color?: KdsRadioColor;
  /** Size of radio buttons */
  size?: KdsRadioSize;
  /** Whether the entire group is required */
  required?: boolean;
  /** Whether the entire group is disabled */
  disabled?: boolean;
  /** Error state */
  error?: boolean;
}

export interface KdsRadioProps extends Omit<MuiRadioProps, 'color' | 'size'> {
  /** Color scheme */
  color?: KdsRadioColor;
  /** Size */
  size?: KdsRadioSize;
}

// =============================================================================
// COMPONENTS
// =============================================================================

export const KdsRadio = forwardRef<HTMLButtonElement, KdsRadioProps>(
  ({ color = 'primary', size = 'medium', ...props }, ref) => {
    return <MuiRadio ref={ref} color={color} size={size} {...props} />;
  }
);

KdsRadio.displayName = 'KdsRadio';

/**
 * Radio group component for selecting one option from a set.
 *
 * @example
 * ```tsx
 * <KdsRadioGroup
 *   label="Tipo de cuenta"
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   options={[
 *     { value: 'corriente', label: 'Cuenta Corriente' },
 *     { value: 'vista', label: 'Cuenta Vista' },
 *   ]}
 * />
 * ```
 */
export const KdsRadioGroup = forwardRef<HTMLDivElement, KdsRadioGroupProps>(
  (
    {
      label,
      options,
      color = 'primary',
      size = 'medium',
      required = false,
      disabled = false,
      error = false,
      children,
      ...props
    },
    ref
  ) => {
    const radioGroup = (
      <MuiRadioGroup ref={ref} {...props}>
        {options
          ? options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                disabled={disabled || option.disabled}
                control={<MuiRadio color={color} size={size} />}
                label={option.label}
              />
            ))
          : children}
      </MuiRadioGroup>
    );

    if (label) {
      return (
        <FormControl required={required} disabled={disabled} error={error}>
          <FormLabel>{label}</FormLabel>
          {radioGroup}
        </FormControl>
      );
    }

    return radioGroup;
  }
);

KdsRadioGroup.displayName = 'KdsRadioGroup';

export default KdsRadioGroup;
