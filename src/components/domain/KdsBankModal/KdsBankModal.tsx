import React, { forwardRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { clsx } from '../../core/utils';

export interface KdsBankModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  children: React.ReactNode;
  className?: string;
  /** Portal container — pass a ref to mount inside a specific element instead of document.body */
  container?: HTMLElement | null;
}

export const KdsBankModal = forwardRef<HTMLDivElement, KdsBankModalProps>(
  ({ open, onClose, title = 'Selecciona tu banco', searchPlaceholder = 'Buscar banco...', onSearch, children, className, container }, ref) => {
    const [query, setQuery] = useState('');

    const handleSearch = (value: string) => {
      setQuery(value);
      onSearch?.(value);
    };

    return (
      <Dialog.Root open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
        <Dialog.Portal container={container}>
          <Dialog.Overlay className="kds-bank-modal-scrim open">
            <Dialog.Content ref={ref} className={clsx('kds-bank-modal', className)}>
              <div className="kds-bank-modal-header">
                <Dialog.Title asChild>
                  <h3>{title}</h3>
                </Dialog.Title>
                <Dialog.Close asChild>
                  <button className="kds-bank-modal-close" aria-label="Cerrar">
                    <i className="material-symbols-outlined">close</i>
                  </button>
                </Dialog.Close>
              </div>
              <div className="kds-bank-modal-search">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
              <div className="kds-bank-modal-body">
                {children}
              </div>
            </Dialog.Content>
          </Dialog.Overlay>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);
KdsBankModal.displayName = 'KdsBankModal';
