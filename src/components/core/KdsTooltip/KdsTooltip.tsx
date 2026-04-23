/**
 * Khipu Design System - Tooltip Component
 *
 * A tooltip component built on MUI Tooltip with Khipu design system styling.
 */

import React from 'react';
import MuiTooltip, { TooltipProps as MuiTooltipProps } from '@mui/material/Tooltip';

// =============================================================================
// TYPES
// =============================================================================

export type KdsTooltipPlacement = MuiTooltipProps['placement'];

export interface KdsTooltipProps extends Omit<MuiTooltipProps, 'arrow'> {
  /** Show arrow pointing to the reference element */
  arrow?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Tooltip component for displaying additional information on hover.
 *
 * @example
 * ```tsx
 * <KdsTooltip title="Copiar al portapapeles">
 *   <IconButton><ContentCopy /></IconButton>
 * </KdsTooltip>
 * ```
 */
export const KdsTooltip: React.FC<KdsTooltipProps> = ({
  arrow = false,
  ...props
}) => {
  return <MuiTooltip arrow={arrow} {...props} />;
};

KdsTooltip.displayName = 'KdsTooltip';

export default KdsTooltip;
