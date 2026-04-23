/**
 * Khipu Design System - Chip Component
 *
 * A chip component built on MUI Chip with Khipu design system styling.
 */

import { forwardRef } from 'react';
import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';

// =============================================================================
// TYPES
// =============================================================================

export type KdsChipVariant = 'filled' | 'outlined';
export type KdsChipColor = 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type KdsChipSize = 'small' | 'medium';

export interface KdsChipProps extends Omit<MuiChipProps, 'variant' | 'color' | 'size'> {
  /** Visual variant */
  variant?: KdsChipVariant;
  /** Color scheme */
  color?: KdsChipColor;
  /** Size */
  size?: KdsChipSize;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Chip component for displaying compact information, tags, or actions.
 *
 * @example
 * ```tsx
 * <KdsChip label="ABC123" size="small" variant="outlined" />
 * <KdsChip label="Pagado" color="success" />
 * <KdsChip label="Pendiente" color="warning" onDelete={() => {}} />
 * ```
 */
export const KdsChip = forwardRef<HTMLDivElement, KdsChipProps>(
  (
    {
      variant = 'filled',
      color = 'default',
      size = 'medium',
      sx,
      ...props
    },
    ref
  ) => {
    return (
      <MuiChip
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        sx={{
          borderRadius: '4px',
          ...sx,
        }}
        {...props}
      />
    );
  }
);

KdsChip.displayName = 'KdsChip';

export default KdsChip;
