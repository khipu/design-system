/**
 * Khipu Design System - Snackbar Component
 *
 * A snackbar component built on MUI Snackbar with Khipu design system styling.
 */

import { forwardRef } from 'react';
import MuiSnackbar, { SnackbarProps as MuiSnackbarProps } from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// =============================================================================
// TYPES
// =============================================================================

export type KdsSnackbarAnchorVertical = 'top' | 'bottom';
export type KdsSnackbarAnchorHorizontal = 'left' | 'center' | 'right';

export interface KdsSnackbarProps extends Omit<MuiSnackbarProps, 'anchorOrigin'> {
  /** Vertical position */
  vertical?: KdsSnackbarAnchorVertical;
  /** Horizontal position */
  horizontal?: KdsSnackbarAnchorHorizontal;
  /** Show close button */
  showCloseButton?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Snackbar component for brief notifications.
 *
 * @example
 * ```tsx
 * <KdsSnackbar
 *   open={open}
 *   autoHideDuration={5000}
 *   onClose={handleClose}
 *   message="Copiado al portapapeles"
 * />
 * ```
 */
export const KdsSnackbar = forwardRef<HTMLDivElement, KdsSnackbarProps>(
  (
    {
      vertical = 'bottom',
      horizontal = 'center',
      showCloseButton = false,
      onClose,
      ...props
    },
    ref
  ) => {
    const action = showCloseButton ? (
      <IconButton
        size="small"
        aria-label="Cerrar"
        color="inherit"
        onClick={(e) => onClose?.(e, 'escapeKeyDown')}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    ) : undefined;

    return (
      <MuiSnackbar
        ref={ref}
        anchorOrigin={{ vertical, horizontal }}
        onClose={onClose}
        action={props.action || action}
        {...props}
      />
    );
  }
);

KdsSnackbar.displayName = 'KdsSnackbar';

export default KdsSnackbar;
