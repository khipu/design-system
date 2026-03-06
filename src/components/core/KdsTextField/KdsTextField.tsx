/**
 * Khipu Design System - TextField Component
 *
 * A text input component built on MUI TextField with Khipu design system styling.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import React, { forwardRef } from 'react';
import MuiTextField, { TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

// =============================================================================
// TYPES
// =============================================================================

export type KdsTextFieldVariant = 'outlined' | 'filled' | 'standard';
export type KdsTextFieldSize = 'small' | 'medium';

export interface KdsTextFieldProps extends Omit<MuiTextFieldProps, 'variant' | 'size'> {
  /** Visual variant */
  variant?: KdsTextFieldVariant;
  /** Input size */
  size?: KdsTextFieldSize;
  /** Icon/element at the start of input */
  startAdornment?: React.ReactNode;
  /** Icon/element at the end of input */
  endAdornment?: React.ReactNode;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Text input field with label, validation, and adornments.
 *
 * Built on MUI TextField with Khipu design system styling.
 *
 * @example
 * ```tsx
 * <KdsTextField
 *   label="RUT Suscriptor"
 *   placeholder="12.345.678-9"
 *   endAdornment={<PersonIcon />}
 * />
 *
 * <KdsTextField
 *   label="Buscar por nombre"
 *   variant="outlined"
 * />
 *
 * <KdsTextField
 *   label="Contraseña"
 *   type="password"
 *   error
 *   helperText="Contraseña incorrecta"
 * />
 * ```
 */
export const KdsTextField = forwardRef<HTMLInputElement, KdsTextFieldProps>(
  (
    {
      variant = 'outlined',
      size = 'medium',
      fullWidth = true,
      startAdornment,
      endAdornment,
      InputProps,
      ...props
    },
    ref
  ) => {
    // Merge adornments with any existing InputProps
    const mergedInputProps = {
      ...InputProps,
      ...(startAdornment && {
        startAdornment: (
          <InputAdornment position="start">
            {startAdornment}
          </InputAdornment>
        ),
      }),
      ...(endAdornment && {
        endAdornment: (
          <InputAdornment position="end">
            {endAdornment}
          </InputAdornment>
        ),
      }),
    };

    return (
      <MuiTextField
        inputRef={ref}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        InputProps={mergedInputProps}
        {...props}
      />
    );
  }
);

KdsTextField.displayName = 'KdsTextField';

export default KdsTextField;
