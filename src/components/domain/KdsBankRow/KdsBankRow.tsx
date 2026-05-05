import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsBankRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  name: string;
  logoUrl?: string;
  selected?: boolean;
}

export const KdsBankRow = forwardRef<HTMLButtonElement, KdsBankRowProps>(
  ({ name, logoUrl, selected, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx('kds-bank-row', selected && 'selected', className)}
      {...props}
    >
      <span className="kds-bank-row-logo">
        {logoUrl ? <img src={logoUrl} alt={name} /> : <span className="initials">{name.charAt(0)}</span>}
      </span>
      <span className="kds-bank-row-name">{name}</span>
      <i className="material-symbols-outlined">{selected ? 'check_circle' : 'chevron_right'}</i>
    </button>
  ),
);
KdsBankRow.displayName = 'KdsBankRow';
