import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsQrRowProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Primary label (e.g. "Pagar escaneando QR") */
  name: string;
  /** Secondary description line */
  description?: string;
  /** Badge text (e.g. "Rápido") */
  badge?: string;
  /** Material icon name for the avatar. Defaults to "qr_code_2" */
  icon?: string;
}

export const KdsQrRow = forwardRef<HTMLButtonElement, KdsQrRowProps>(
  ({ name, description, badge, icon = 'qr_code_2', className, ...props }, ref) => (
    <button ref={ref} type="button" className={clsx('kds-qr-row', className)} {...props}>
      <span className="kds-qr-avatar" aria-hidden="true">
        <i className="material-symbols-outlined">{icon}</i>
      </span>
      <span className="kds-qr-text">
        <span className="title">{name}</span>
        {description && <span className="sub">{description}</span>}
      </span>
      {badge && <span className="kds-qr-badge">{badge}</span>}
      <i className="material-symbols-outlined">chevron_right</i>
    </button>
  ),
);
KdsQrRow.displayName = 'KdsQrRow';
