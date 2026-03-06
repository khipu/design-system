/**
 * Khipu Design System - Button Component
 *
 * A button component built on MUI Button with Khipu design system styling.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import React, { forwardRef } from 'react';
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

// =============================================================================
// TYPES
// =============================================================================

export type KdsButtonVariant = 'contained' | 'outlined' | 'text';
export type KdsButtonColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type KdsButtonSize = 'small' | 'medium' | 'large';

export interface KdsButtonProps extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  /** Visual style variant */
  variant?: KdsButtonVariant;
  /** Color scheme */
  color?: KdsButtonColor;
  /** Button size */
  size?: KdsButtonSize;
  /** Full width button */
  fullWidth?: boolean;
  /** Loading state - shows spinner and disables button */
  loading?: boolean;
  /** Icon before label */
  startIcon?: React.ReactNode;
  /** Icon after label */
  endIcon?: React.ReactNode;
  /** Content */
  children: React.ReactNode;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Primary action button component.
 *
 * Built on MUI Button with Khipu design system styling.
 *
 * @example
 * ```tsx
 * <KdsButton variant="contained" color="primary">
 *   INGRESAR
 * </KdsButton>
 *
 * <KdsButton variant="outlined" color="info">
 *   RECHAZAR
 * </KdsButton>
 *
 * <KdsButton variant="contained" color="success" fullWidth>
 *   VOLVER AL COMERCIO
 * </KdsButton>
 *
 * <KdsButton loading>
 *   Processing...
 * </KdsButton>
 * ```
 */
export const KdsButton = forwardRef<HTMLButtonElement, KdsButtonProps>(
  (
    {
      variant = 'contained',
      color = 'primary',
      size = 'large',
      fullWidth = false,
      loading = false,
      disabled = false,
      startIcon,
      endIcon,
      children,
      sx,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <MuiButton
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        fullWidth={fullWidth}
        disabled={isDisabled}
        startIcon={loading ? undefined : startIcon}
        endIcon={loading ? undefined : endIcon}
        sx={{
          // Additional custom styles can be merged here
          ...sx,
        }}
        {...props}
      >
        {loading ? (
          <>
            <CircularProgress
              size={20}
              color="inherit"
              sx={{ mr: 1 }}
            />
            {children}
          </>
        ) : (
          children
        )}
      </MuiButton>
    );
  }
);

KdsButton.displayName = 'KdsButton';

export default KdsButton;
