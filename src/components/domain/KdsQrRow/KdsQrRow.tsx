import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsQrRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  name: string;
  logoUrl?: string;
  description?: string;
}

export const KdsQrRow = forwardRef<HTMLButtonElement, KdsQrRowProps>(
  ({ name, logoUrl, description, className, ...props }, ref) => (
    <button ref={ref} type="button" className={clsx('kds-bank-row', className)} {...props}>
      <span className="kds-bank-row-logo">
        {logoUrl ? <img src={logoUrl} alt={name} /> : <i className="material-symbols-outlined">qr_code</i>}
      </span>
      <div>
        <span className="kds-bank-row-name">{name}</span>
        {description && <span className="kds-text-secondary">{description}</span>}
      </div>
      <i className="material-symbols-outlined">chevron_right</i>
    </button>
  ),
);
KdsQrRow.displayName = 'KdsQrRow';
