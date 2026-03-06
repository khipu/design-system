/**
 * Khipu Design System - LinearProgress Component
 *
 * A linear progress indicator built on MUI LinearProgress with Khipu design system styling.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import React from 'react';
import MuiLinearProgress, { LinearProgressProps as MuiLinearProgressProps } from '@mui/material/LinearProgress';

// =============================================================================
// TYPES
// =============================================================================

export type KdsLinearProgressColor = 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info' | 'inherit';
export type KdsLinearProgressVariant = 'determinate' | 'indeterminate' | 'buffer' | 'query';

export interface KdsLinearProgressProps extends Omit<MuiLinearProgressProps, 'color' | 'variant'> {
  /** Progress bar color */
  color?: KdsLinearProgressColor;
  /** Variant */
  variant?: KdsLinearProgressVariant;
  /** Progress value (0-100) for determinate variant */
  value?: number;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Linear progress indicator component.
 *
 * Built on MUI LinearProgress with Khipu design system styling.
 * Used to show progress at the top of screens in the payment flow.
 *
 * @example
 * ```tsx
 * // Indeterminate progress (loading)
 * <KdsLinearProgress color="info" />
 *
 * // Determinate progress (shows percentage)
 * <KdsLinearProgress color="info" variant="determinate" value={50} />
 *
 * // At top of payment screen
 * <Box sx={{ width: '100%' }}>
 *   <KdsLinearProgress color="info" />
 *   <Box sx={{ p: 3 }}>
 *     {content}
 *   </Box>
 * </Box>
 * ```
 */
export const KdsLinearProgress: React.FC<KdsLinearProgressProps> = ({
  color = 'info',
  variant = 'indeterminate',
  value,
  sx,
  ...props
}) => {
  return (
    <MuiLinearProgress
      color={color}
      variant={variant}
      value={value}
      sx={{
        height: 4,
        borderRadius: 0,
        backgroundColor: 'rgba(3, 169, 244, 0.4)',
        '& .MuiLinearProgress-bar': {
          backgroundColor: '#03A9F4',
        },
        ...sx,
      }}
      {...props}
    />
  );
};

KdsLinearProgress.displayName = 'KdsLinearProgress';

export default KdsLinearProgress;
