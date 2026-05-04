import React, { forwardRef } from 'react';
import { clsx } from '../utils';
import { useAutoHide } from '../hooks/useAutoHide';

export type KdsSnackbarType = 'success' | 'error' | 'info';

export interface KdsSnackbarProps extends React.HTMLAttributes<HTMLDivElement> {
  message: string;
  type?: KdsSnackbarType;
  duration?: number;
  onClose?: () => void;
  open?: boolean;
}

export const KdsSnackbar = forwardRef<HTMLDivElement, KdsSnackbarProps>(
  ({ message, type, duration = 5000, onClose, open = true, className, ...props }, ref) => {
    const { visible } = useAutoHide(duration, onClose);
    if (!open || !visible) return null;

    return (
      <div ref={ref} role="status" className={clsx('snackbar', 'active', type, className)} {...props}>
        <span>{message}</span>
        {onClose && (
          <button onClick={onClose} aria-label="Cerrar">
            <i className="material-symbols-outlined">close</i>
          </button>
        )}
      </div>
    );
  },
);
KdsSnackbar.displayName = 'KdsSnackbar';
