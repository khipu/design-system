import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsRecapItem {
  label: string;
  value?: string;
  placeholder?: string;
}

export interface KdsRecapListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: KdsRecapItem[];
}

export const KdsRecapList = forwardRef<HTMLUListElement, KdsRecapListProps>(
  ({ items, className, ...props }, ref) => (
    <ul ref={ref} className={clsx('kds-recap-list', className)} {...props}>
      {items.map((item, i) => (
        <li key={i}>
          <span className="k">{item.label}</span>
          <span className={clsx('v', !item.value && item.placeholder && 'placeholder')}>
            {item.value || item.placeholder || '-'}
          </span>
        </li>
      ))}
    </ul>
  ),
);
KdsRecapList.displayName = 'KdsRecapList';
