import React, { forwardRef } from 'react';
import { clsx } from '../utils';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

export interface KdsCopyRowProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'children'> {
  label: string;
  value: string;
  icon?: string;
  toastText?: string;
}

export const KdsCopyRow = forwardRef<HTMLButtonElement, KdsCopyRowProps>(
  ({ label, value, icon, toastText = 'Copiado', className, ...props }, ref) => {
    const { copied, copy } = useCopyToClipboard();

    return (
      <button
        ref={ref}
        type="button"
        className={clsx('kds-copy-row', copied && 'copied', className)}
        onClick={() => copy(value)}
        {...props}
      >
        {icon && <i className="material-symbols-outlined">{icon}</i>}
        <div>
          <span className="kds-copy-row-label">{label}</span>
          <span className="kds-copy-row-value">{value}</span>
        </div>
        <span className="kds-copy-toast">
          <i className="material-symbols-outlined">check_circle</i>
          {toastText}
        </span>
      </button>
    );
  },
);
KdsCopyRow.displayName = 'KdsCopyRow';
