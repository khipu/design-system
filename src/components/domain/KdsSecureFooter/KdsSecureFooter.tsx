import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsSecureFooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'inside';
}

export const KdsSecureFooter = forwardRef<HTMLElement, KdsSecureFooterProps>(
  ({ variant = 'default', children, className, ...props }, ref) => (
    <footer ref={ref} className={clsx('kds-secure-footer', variant === 'inside' && 'inside', className)} {...props}>
      <i className="material-symbols-outlined">lock</i>
      {children || <span>Pago seguro con Khipu</span>}
    </footer>
  ),
);
KdsSecureFooter.displayName = 'KdsSecureFooter';
