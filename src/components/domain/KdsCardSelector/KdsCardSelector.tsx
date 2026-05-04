import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsCardSelectorProps extends React.HTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  icon?: string;
  label: string;
  description?: string;
}

export const KdsCardSelector = forwardRef<HTMLButtonElement, KdsCardSelectorProps>(
  ({ selected, icon, label, description, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx('kds-card-selector', selected && 'selected', className)}
      aria-pressed={selected}
      {...props}
    >
      {icon && <i className="material-symbols-outlined">{icon}</i>}
      <span className="kds-card-selector-label">{label}</span>
      {description && <span className="kds-card-selector-description">{description}</span>}
    </button>
  ),
);
KdsCardSelector.displayName = 'KdsCardSelector';
