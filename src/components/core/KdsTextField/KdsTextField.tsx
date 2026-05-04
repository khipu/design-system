/**
 * Khipu Design System - TextField Component
 *
 * A text input component built with native HTML and BeerCSS floating labels.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

// =============================================================================
// TYPES
// =============================================================================

export interface KdsTextFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text for the field */
  label: string;
  /** Helper text shown below field (error or info) */
  helperText?: string;
  /** Error state - applies invalid class and red styling */
  error?: boolean;
  /** Full width field (default: true) */
  fullWidth?: boolean;
  /** Material Symbols icon name at the start of input, e.g. "search" */
  startIcon?: string;
  /** Material Symbols icon name at the end of input, e.g. "visibility_off" */
  endIcon?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Text input field with label, validation, and icons.
 *
 * Built with native HTML and BeerCSS floating labels.
 * The label animates up when the input has focus or value.
 *
 * @example
 * ```tsx
 * <KdsTextField
 *   label="RUT Suscriptor"
 *   placeholder="12.345.678-9"
 * />
 *
 * <KdsTextField
 *   label="Buscar por nombre"
 *   startIcon="search"
 * />
 *
 * <KdsTextField
 *   label="Contraseña"
 *   type="password"
 *   error
 *   helperText="Contraseña incorrecta"
 * />
 *
 * <KdsTextField
 *   label="Monto"
 *   value="$1.000"
 *   readOnly
 * />
 * ```
 */
export const KdsTextField = forwardRef<HTMLInputElement, KdsTextFieldProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = true,
      readOnly,
      startIcon,
      endIcon,
      className,
      id,
      ...props
    },
    ref,
  ) => {
    const fieldId = id || `kds-field-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div
        className={clsx(
          'field', 'label', 'border',
          error && 'invalid',
          readOnly && 'locked',
          fullWidth && 'kds-w-full',
          className,
        )}
      >
        {startIcon && <i className="material-symbols-outlined">{startIcon}</i>}
        <input
          ref={ref}
          id={fieldId}
          placeholder=" "
          readOnly={readOnly}
          {...props}
        />
        <label htmlFor={fieldId}>{label}</label>
        {readOnly && <i className="material-symbols-outlined">lock</i>}
        {endIcon && !readOnly && <i className="material-symbols-outlined">{endIcon}</i>}
        {helperText && <span className="helper">{helperText}</span>}
      </div>
    );
  },
);

KdsTextField.displayName = 'KdsTextField';
