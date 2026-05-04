import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsBankRowProps extends React.HTMLAttributes<HTMLButtonElement> {
  bankName: string;
  bankLogo?: string;
  selected?: boolean;
}

export const KdsBankRow = forwardRef<HTMLButtonElement, KdsBankRowProps>(
  ({ bankName, bankLogo, selected, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx('kds-bank-row', selected && 'selected', className)}
      aria-pressed={selected}
      {...props}
    >
      {bankLogo && <img src={bankLogo} alt="" className="kds-bank-row-logo" />}
      <span className="kds-bank-row-name">{bankName}</span>
    </button>
  ),
);
KdsBankRow.displayName = 'KdsBankRow';
