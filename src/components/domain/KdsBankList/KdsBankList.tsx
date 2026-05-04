import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsBankListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const KdsBankList = forwardRef<HTMLDivElement, KdsBankListProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-bank-list', className)} role="list" {...props}>
      {children}
    </div>
  ),
);
KdsBankList.displayName = 'KdsBankList';
