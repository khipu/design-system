import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsQrRowProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  qrValue: string;
}

export const KdsQrRow = forwardRef<HTMLDivElement, KdsQrRowProps>(
  ({ label, qrValue, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-qr-row', className)} {...props}>
      <span className="kds-qr-row-label">{label}</span>
      <span className="kds-qr-row-value">{qrValue}</span>
    </div>
  ),
);
KdsQrRow.displayName = 'KdsQrRow';
