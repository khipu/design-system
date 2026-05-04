import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsCardSelectorProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: string;
  title: string;
  description?: string;
  selected?: boolean;
}

export const KdsCardSelector = forwardRef<HTMLButtonElement, KdsCardSelectorProps>(
  ({ icon, title, description, selected, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx('kds-card-selector', selected && 'selected', className)}
      {...props}
    >
      {icon && (
        <span className="kds-card-selector-icon">
          <i className="material-symbols-outlined">{icon}</i>
        </span>
      )}
      <span className="kds-card-selector-title">{title}</span>
      {description && <span className="kds-card-selector-description">{description}</span>}
    </button>
  ),
);
KdsCardSelector.displayName = 'KdsCardSelector';
