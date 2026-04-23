/**
 * Khipu Design System - Select Component
 *
 * A select dropdown component built on MUI Select with Khipu design system styling.
 */

import React, { forwardRef } from 'react';
import MuiSelect, { SelectProps as MuiSelectProps } from '@mui/material/Select';
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

// =============================================================================
// TYPES
// =============================================================================

export type KdsSelectVariant = 'outlined' | 'filled' | 'standard';
export type KdsSelectSize = 'small' | 'medium';

export interface KdsSelectOption {
  /** Option value */
  value: string | number;
  /** Option label */
  label: React.ReactNode;
  /** Whether this option is disabled */
  disabled?: boolean;
}

export interface KdsSelectProps extends Omit<MuiSelectProps, 'variant' | 'size'> {
  /** Visual variant */
  variant?: KdsSelectVariant;
  /** Size */
  size?: KdsSelectSize;
  /** Select options (shorthand for creating MenuItems) */
  options?: KdsSelectOption[];
  /** Helper text below the select */
  helperText?: React.ReactNode;
  /** Whether the field is full width */
  fullWidth?: boolean;
}

export interface KdsMenuItemProps extends MuiMenuItemProps {}

// =============================================================================
// COMPONENTS
// =============================================================================

export const KdsMenuItem = forwardRef<HTMLLIElement, KdsMenuItemProps>(
  (props, ref) => {
    return <MuiMenuItem ref={ref} {...props} />;
  }
);

KdsMenuItem.displayName = 'KdsMenuItem';

/**
 * Select dropdown component for choosing one option from a list.
 *
 * @example
 * ```tsx
 * <KdsSelect
 *   label="Banco"
 *   value={bank}
 *   onChange={(e) => setBank(e.target.value)}
 *   options={[
 *     { value: 'bci', label: 'BCI' },
 *     { value: 'santander', label: 'Santander' },
 *   ]}
 * />
 * ```
 */
export const KdsSelect = forwardRef<HTMLDivElement, KdsSelectProps>(
  (
    {
      variant = 'outlined',
      size = 'medium',
      label,
      options,
      helperText,
      fullWidth = true,
      error,
      required,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const labelId = label ? `kds-select-label-${String(label).replace(/\s/g, '-')}` : undefined;

    return (
      <FormControl
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        error={error}
        required={required}
        disabled={disabled}
      >
        {label && <InputLabel id={labelId}>{label}</InputLabel>}
        <MuiSelect
          ref={ref}
          labelId={labelId}
          label={label}
          variant={variant}
          size={size}
          {...props}
        >
          {options
            ? options.map((option) => (
                <MuiMenuItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                >
                  {option.label}
                </MuiMenuItem>
              ))
            : children}
        </MuiSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  }
);

KdsSelect.displayName = 'KdsSelect';

export default KdsSelect;
