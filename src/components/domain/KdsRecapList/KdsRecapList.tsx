import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsRecapItem {
  label: string;
  value: React.ReactNode;
}

export interface KdsRecapListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: KdsRecapItem[];
}

export const KdsRecapList = forwardRef<HTMLDListElement, KdsRecapListProps>(
  ({ items, className, ...props }, ref) => (
    <dl ref={ref} className={clsx('kds-recap-list', className)} {...props}>
      {items.map((item, i) => (
        <div key={i} className="kds-recap-item">
          <dt>{item.label}</dt>
          <dd>{item.value}</dd>
        </div>
      ))}
    </dl>
  ),
);
KdsRecapList.displayName = 'KdsRecapList';
