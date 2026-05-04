import React, { forwardRef } from 'react';
import { clsx } from '../utils';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

export interface KdsCopyableTableRow {
  label: string;
  value: string;
}

export interface KdsCopyableTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: KdsCopyableTableRow[];
}

export const KdsCopyableTable = forwardRef<HTMLDivElement, KdsCopyableTableProps>(
  ({ rows, className, ...props }, ref) => {
    const { copied, copy } = useCopyToClipboard();

    const handleCopyAll = () => {
      const text = rows.map((r) => `${r.label}: ${r.value}`).join('\n');
      copy(text);
    };

    return (
      <div ref={ref} className={clsx('kds-copyable-table', className)} {...props}>
        {rows.map((row) => (
          <div key={row.label} className="kds-copyable-table-row">
            <span className="kds-copyable-table-label">{row.label}</span>
            <span className="kds-copyable-table-value">{row.value}</span>
          </div>
        ))}
        <button className="kds-copyable-table-copy-all" onClick={handleCopyAll} aria-label="Copiar todo">
          <i className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</i>
          <span>{copied ? 'Copiado' : 'Copiar todo'}</span>
        </button>
      </div>
    );
  },
);
KdsCopyableTable.displayName = 'KdsCopyableTable';
