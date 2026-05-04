import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsCardPlanProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  price: string;
  period?: string;
  features?: string[];
  recommended?: boolean;
  badgeText?: string;
  action?: React.ReactNode;
}

export const KdsCardPlan = forwardRef<HTMLDivElement, KdsCardPlanProps>(
  ({ title, price, period, features, recommended, badgeText, action, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('kds-card-plan', recommended && 'recommended', className)}
      {...props}
    >
      {badgeText && <span className="kds-card-plan-badge">{badgeText}</span>}
      <div className="kds-card-plan-header">
        <h3>{title}</h3>
      </div>
      <div className="kds-card-plan-price">
        <span>{price}</span>
        {period && <span>/{period}</span>}
      </div>
      {features && features.length > 0 && (
        <ul className="kds-card-plan-features">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
      {action}
    </div>
  ),
);
KdsCardPlan.displayName = 'KdsCardPlan';
