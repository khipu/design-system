/**
 * Khipu Design System - Modal Component
 *
 * A modal dialog component built on Radix Dialog with Khipu design system styling.
 * Uses kds-bottom-sheet BeerCSS classes for visual presentation.
 */

import React, { forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from '../utils';

// =============================================================================
// TYPES
// =============================================================================

export type KdsModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface KdsModalProps {
  /** Controls modal visibility */
  open: boolean;
  /** Callback when modal should close */
  onClose: () => void;
  /** Modal title */
  title?: string;
  /** Modal description text */
  description?: string;
  /** Footer content (usually action buttons) */
  footer?: React.ReactNode;
  /** Modal content */
  children: React.ReactNode;
  /** Modal max width */
  size?: KdsModalSize;
  /** Show close button */
  showCloseButton?: boolean;
  /** Additional CSS class */
  className?: string;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Modal dialog component for displaying content that requires attention.
 *
 * Built on Radix Dialog with kds-bottom-sheet BeerCSS classes.
 *
 * @example
 * ```tsx
 * <KdsModal
 *   open={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="Confirmar pago"
 *   footer={
 *     <>
 *       <button onClick={handleCancel}>Cancelar</button>
 *       <button onClick={handleConfirm}>Confirmar</button>
 *     </>
 *   }
 * >
 *   <p>¿Estás seguro de que deseas realizar este pago?</p>
 * </KdsModal>
 * ```
 */
export const KdsModal = forwardRef<HTMLDivElement, KdsModalProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      footer,
      children,
      size = 'md',
      showCloseButton = true,
      className,
    },
    ref,
  ) => (
    <Dialog.Root
      open={open}
      onOpenChange={(o) => {
        if (!o) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="kds-bottom-sheet-scrim" />
        <Dialog.Content
          ref={ref}
          className={clsx(
            'kds-bottom-sheet',
            `kds-bottom-sheet-${size}`,
            className,
          )}
        >
          {title && (
            <div className="kds-bottom-sheet-header">
              <Dialog.Title className="kds-bottom-sheet-title">
                {title}
              </Dialog.Title>
              {showCloseButton && (
                <Dialog.Close asChild>
                  <button
                    className="kds-bottom-sheet-close"
                    aria-label="Cerrar"
                  >
                    <i className="material-symbols-outlined">close</i>
                  </button>
                </Dialog.Close>
              )}
            </div>
          )}
          {description && (
            <Dialog.Description className="kds-bottom-sheet-description">
              {description}
            </Dialog.Description>
          )}
          <div className="kds-bottom-sheet-body">{children}</div>
          {footer && (
            <div className="kds-bottom-sheet-actions">{footer}</div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ),
);
KdsModal.displayName = 'KdsModal';

export default KdsModal;
