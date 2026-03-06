/**
 * Khipu Design System - Spinner Component
 *
 * A loading spinner component built on MUI CircularProgress with Khipu design system styling.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import React from 'react';
import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

// =============================================================================
// TYPES
// =============================================================================

export type KdsSpinnerSize = 'small' | 'medium' | 'large';
export type KdsSpinnerColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit';

export interface KdsSpinnerProps extends Omit<CircularProgressProps, 'size' | 'color'> {
  /** Spinner size */
  size?: KdsSpinnerSize;
  /** Spinner color */
  color?: KdsSpinnerColor;
  /** Custom size in pixels */
  customSize?: number;
  /** Accessible label */
  label?: string;
}

// =============================================================================
// SIZE MAPPINGS
// =============================================================================

const sizeMap: Record<KdsSpinnerSize, number> = {
  small: 20,
  medium: 40,
  large: 60,
};

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Loading spinner component.
 *
 * Built on MUI CircularProgress with Khipu design system styling.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <KdsSpinner size="medium" color="primary" />
 *
 * // Inside a button
 * <Button loading>
 *   Processing...
 * </Button>
 *
 * // Centered in container
 * <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
 *   <KdsSpinner size="large" />
 * </Box>
 * ```
 */
export const KdsSpinner: React.FC<KdsSpinnerProps> = ({
  size = 'medium',
  color = 'primary',
  customSize,
  label = 'Cargando...',
  sx,
  ...props
}) => {
  const spinnerSize = customSize || sizeMap[size];

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      role="progressbar"
      aria-label={label}
    >
      <CircularProgress
        size={spinnerSize}
        color={color}
        sx={sx}
        {...props}
      />
    </Box>
  );
};

KdsSpinner.displayName = 'KdsSpinner';

export default KdsSpinner;
