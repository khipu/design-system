import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsCardPlanProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  price: string;
  features?: string[];
  recommended?: boolean;
}

export const KdsCardPlan = forwardRef<HTMLDivElement, KdsCardPlanProps>(
  ({ title, price, features, recommended, className, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('kds-card-plan', recommended && 'recommended', className)}
      {...props}
    >
      {recommended && <span className="kds-card-plan-badge">Recomendado</span>}
      <h3 className="kds-card-plan-title">{title}</h3>
      <span className="kds-card-plan-price">{price}</span>
      {features && features.length > 0 && (
        <ul className="kds-card-plan-features">
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      )}
    </div>
  ),
);
KdsCardPlan.displayName = 'KdsCardPlan';
