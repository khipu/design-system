import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsInvoiceStickyProps extends React.HTMLAttributes<HTMLDivElement> {}

export const KdsInvoiceSticky = forwardRef<HTMLDivElement, KdsInvoiceStickyProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-card-elevated', 'kds-invoice-sticky', className)} {...props}>
      {children}
    </div>
  ),
);
KdsInvoiceSticky.displayName = 'KdsInvoiceSticky';
