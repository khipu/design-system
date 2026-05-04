/**
 * Khipu Design System - StatusBlock Component
 *
 * A status feedback component with icon, title, and description.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsStatusType = 'success' | 'pending' | 'warn' | 'error';

export interface KdsStatusBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  status: KdsStatusType;
  icon?: string;
  title: string;
  description?: string;
  inline?: boolean;
}

export const KdsStatusBlock = forwardRef<HTMLDivElement, KdsStatusBlockProps>(
  ({ status, icon, title, description, inline, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-status-block', inline && 'inline', className)} data-status={status} {...props}>
      <div className="kds-status-block-icon">
        {icon && <i className="material-symbols-outlined">{icon}</i>}
      </div>
      <div>
        <h2 className="kds-status-block-title">{title}</h2>
        {description && <p className="kds-status-block-description">{description}</p>}
      </div>
    </div>
  ),
);
KdsStatusBlock.displayName = 'KdsStatusBlock';
