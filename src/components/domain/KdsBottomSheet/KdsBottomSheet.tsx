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
}

export const KdsBottomSheet = forwardRef<HTMLDivElement, KdsBottomSheetProps>(
  ({ open, onClose, title, children, actions, className }, ref) => (
    <Dialog.Root open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="kds-bottom-sheet-scrim" />
        <Dialog.Content ref={ref} className={clsx('kds-bottom-sheet', className)}>
          <div className="kds-bottom-sheet-grabber" />
          {title && <Dialog.Title className="kds-bottom-sheet-title">{title}</Dialog.Title>}
          <div className="kds-bottom-sheet-body">{children}</div>
          {actions && <div className="kds-bottom-sheet-actions">{actions}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  ),
);
KdsBottomSheet.displayName = 'KdsBottomSheet';
