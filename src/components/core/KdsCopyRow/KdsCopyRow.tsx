import React, { forwardRef } from 'react';
import { clsx } from '../utils';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

export interface KdsCopyRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  value: string;
}

export const KdsCopyRow = forwardRef<HTMLDivElement, KdsCopyRowProps>(
  ({ label, value, className, ...props }, ref) => {
    const { copied, copy } = useCopyToClipboard();
    return (
      <div ref={ref} className={clsx('kds-copy-row', copied && 'copied', className)} {...props}>
        <span className="kds-copy-row-label">{label}</span>
        <span className="kds-copy-row-value">{value}</span>
        <button className="kds-copy-row-btn" onClick={() => copy(value)} aria-label={`Copiar ${label}`}>
          <i className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</i>
        </button>
      </div>
    );
  },
);
KdsCopyRow.displayName = 'KdsCopyRow';
