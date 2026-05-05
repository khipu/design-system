import React, { forwardRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from '../../core/utils';

export interface KdsBottomSheetProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  /** Portal container — pass a ref to mount inside a specific element instead of document.body */
  container?: HTMLElement | null;
}

export const KdsBottomSheet = forwardRef<HTMLDivElement, KdsBottomSheetProps>(
  ({ open, onClose, title, children, actions, className, container }, ref) => (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className="kds-bottom-sheet-scrim open">
          <Dialog.Content ref={ref} className={clsx('kds-bottom-sheet', className)}>
            <div className="kds-bottom-sheet-grabber" />
            {title && <Dialog.Title className="kds-bottom-sheet-title">{title}</Dialog.Title>}
            <div className="kds-bottom-sheet-body">{children}</div>
            {actions && <div className="kds-bottom-sheet-actions">{actions}</div>}
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  ),
);
KdsBottomSheet.displayName = 'KdsBottomSheet';
