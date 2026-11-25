import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsRecapItem {
  label: string;
  value?: string;
  placeholder?: string;
}

/**
 * Row layout. `inline` (default): label left, value right (`space-between`). `columns`: label
 * column at 38% and the value next to it, both start-aligned — for long values such as the
 * onboarding review summary.
 */
export type KdsRecapListLayout = 'inline' | 'columns';

export interface KdsRecapListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: KdsRecapItem[];
  /** Row layout. Applies `.kds-recap-list--columns` for `columns`. @default 'inline' */
  layout?: KdsRecapListLayout;
  /**
   * Framed list (`.kds-recap-list--boxed`): padding, subtle border and card radius, the same
   * surface as `.kds-summary-panel`. For a highlighted fact such as the risk cap or a case number.
   */
  boxed?: boolean;
}

export const KdsRecapList = forwardRef<HTMLUListElement, KdsRecapListProps>(
  ({ items, layout = 'inline', boxed, className, ...props }, ref) => (
    <ul
      ref={ref}
      className={clsx(
        'kds-recap-list',
        layout === 'columns' && 'kds-recap-list--columns',
        boxed && 'kds-recap-list--boxed',
        className,
      )}
      {...props}
    >
      {items.map((item, i) => (
        <li key={i}>
          <span className="kds-key">{item.label}</span>
          <span className={clsx('kds-value', !item.value && item.placeholder && 'placeholder')}>
            {item.value || item.placeholder || '-'}
          </span>
        </li>
      ))}
    </ul>
  ),
);
KdsRecapList.displayName = 'KdsRecapList';
