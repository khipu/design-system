/**
 * Khipu Design System - Modal Component
 *
 * A modal dialog component built on MUI Dialog with Khipu design system styling.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import React from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';

// =============================================================================
// TYPES
// =============================================================================

export type KdsModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface KdsModalProps extends Omit<DialogProps, 'maxWidth' | 'title'> {
  /** Controls modal visibility */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: React.ReactNode;
  /** Modal content */
  children: React.ReactNode;
  /** Footer content (usually action buttons) */
  footer?: React.ReactNode;
  /** Modal max width */
  size?: KdsModalSize;
  /** Show close button */
  showCloseButton?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Modal dialog component for displaying content that requires attention.
 *
 * Built on MUI Dialog with Khipu design system styling.
 *
 * @example
 * ```tsx
 * // Token authorization modal
 * <KdsModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title={
 *     <>
 *       Autoriza la operación desde tu App{' '}
 *       <Typography component="span" color="info.main">tokenPass</Typography>
 *     </>
 *   }
 *   footer={
 *     <Button disabled fullWidth>CONTINUAR</Button>
 *   }
 * >
 *   <Box sx={{ textAlign: 'center' }}>
 *     <img src={tokenImage} alt="TokenPass" />
 *     <Typography color="text.disabled">3:27 restantes</Typography>
 *   </Box>
 * </KdsModal>
 *
 * // Confirmation modal
 * <KdsModal
 *   open={isOpen}
 *   onClose={handleCancel}
 *   title="Confirmar pago"
 *   footer={
 *     <>
 *       <Button variant="text" onClick={handleCancel}>Cancelar</Button>
 *       <Button onClick={handleConfirm}>Confirmar</Button>
 *     </>
 *   }
 * >
 *   <p>¿Estás seguro de que deseas realizar este pago?</p>
 * </KdsModal>
 * ```
 */
export const KdsModal: React.FC<KdsModalProps> = ({
  open,
  onClose,
  title,
  children,
  footer,
  size = 'sm',
  showCloseButton = true,
  ...props
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={size}
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
        },
      }}
      {...props}
    >
      {(title || showCloseButton) && (
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: title ? 'space-between' : 'flex-end',
            fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
            fontFeatureSettings: "'liga' off, 'clig' off",
            fontWeight: 600,
            fontSize: '1.25rem',
            lineHeight: '32px',
            letterSpacing: '0.15px',
            textAlign: 'center',
            py: 2,
            px: 3,
          }}
        >
          {title && <Box sx={{ flex: 1 }}>{title}</Box>}
          {showCloseButton && (
            <IconButton
              aria-label="Cerrar"
              onClick={onClose}
              sx={{
                color: 'text.secondary',
                ml: 'auto',
              }}
            >
              <CloseIcon />
            </IconButton>
          )}
        </DialogTitle>
      )}

      <DialogContent
        sx={{
          px: 3,
          py: 2,
        }}
      >
        {children}
      </DialogContent>

      {footer && (
        <DialogActions
          sx={{
            px: 3,
            py: 2,
            gap: 1,
          }}
        >
          {footer}
        </DialogActions>
      )}
    </Dialog>
  );
};

KdsModal.displayName = 'KdsModal';

export default KdsModal;
