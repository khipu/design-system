import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsSecureFooterProps extends React.HTMLAttributes<HTMLElement> {}

export const KdsSecureFooter = forwardRef<HTMLElement, KdsSecureFooterProps>(
  ({ children, className, ...props }, ref) => (
    <footer ref={ref} className={clsx('kds-secure-footer', className)} {...props}>
      <i className="material-symbols-outlined">lock</i>
      {children || <span>Pago seguro con Khipu</span>}
    </footer>
  ),
);
KdsSecureFooter.displayName = 'KdsSecureFooter';
