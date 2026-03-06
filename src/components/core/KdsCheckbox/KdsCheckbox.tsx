/**
 * Khipu Design System - Checkbox Component
 *
 * A checkbox component built on MUI Checkbox with Khipu design system styling.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import React, { forwardRef } from 'react';
import MuiCheckbox, { CheckboxProps as MuiCheckboxProps } from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// =============================================================================
// TYPES
// =============================================================================

export type KdsCheckboxColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'default';
export type KdsCheckboxSize = 'small' | 'medium';

export interface KdsCheckboxProps extends Omit<MuiCheckboxProps, 'color' | 'size'> {
  /** Label text or element */
  label?: React.ReactNode;
  /** Color scheme */
  color?: KdsCheckboxColor;
  /** Size */
  size?: KdsCheckboxSize;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Checkbox component for binary choices.
 *
 * Built on MUI Checkbox with Khipu design system styling.
 *
 * @example
 * ```tsx
 * <KdsCheckbox
 *   label="Acepto los términos y condiciones de uso"
 *   checked={accepted}
 *   onChange={(e) => setAccepted(e.target.checked)}
 * />
 *
 * <KdsCheckbox
 *   label={
 *     <>
 *       Acepto los <a href="/terms">términos y condiciones</a>
 *     </>
 *   }
 * />
 *
 * <KdsCheckbox indeterminate />
 * ```
 */
export const KdsCheckbox = forwardRef<HTMLButtonElement, KdsCheckboxProps>(
  (
    {
      label,
      color = 'primary',
      size = 'medium',
      disabled = false,
      ...props
    },
    ref
  ) => {
    const checkbox = (
      <MuiCheckbox
        ref={ref}
        color={color}
        size={size}
        disabled={disabled}
        {...props}
      />
    );

    if (label) {
      return (
        <FormControlLabel
          control={checkbox}
          label={label}
          disabled={disabled}
        />
      );
    }

    return checkbox;
  }
);

KdsCheckbox.displayName = 'KdsCheckbox';

export default KdsCheckbox;
