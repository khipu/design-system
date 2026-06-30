import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsInvoiceStickyProps extends React.HTMLAttributes<HTMLElement> {}

export const KdsInvoiceSticky = forwardRef<HTMLElement, KdsInvoiceStickyProps>(
  ({ children, className, ...props }, ref) => (
    <article
      ref={ref}
      className={clsx('kds-card-elevated', 'kds-invoice-sticky', className)}
      {...props}
    >
      {children}
    </article>
  ),
);
KdsInvoiceSticky.displayName = 'KdsInvoiceSticky';
