import React, { forwardRef, useId } from 'react';
import { clsx } from '../../core/utils';

export interface KdsCardPlanProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  price: string;
  period?: string;
  features?: string[];
  recommended?: boolean;
  badgeText?: string;
  action?: React.ReactNode;
  /** Short line under the title, e.g. "Incluye descuentos por volumen." */
  description?: string;
  /** Shows a check icon before each feature (decorative). */
  checkFeatures?: boolean;
  /**
   * Radio group name. Together with `value` it makes the card selectable: it renders a
   * native `<input type="radio">` and the title becomes its label, stretched over the
   * whole card. Cards sharing a `name` form one group (arrow keys, form submit).
   */
  name?: string;
  /** Value submitted for this plan when it is selected. Requires `name`. */
  value?: string;
  /** Controlled checked state of the radio. */
  selected?: boolean;
  /** Called with `value` when the user selects this card. */
  onSelectedChange?: (value: string) => void;
}

export const KdsCardPlan = forwardRef<HTMLDivElement, KdsCardPlanProps>(
  (
    {
      title,
      price,
      period,
      features,
      recommended,
      badgeText,
      action,
      description,
      checkFeatures,
      name,
      value,
      selected,
      onSelectedChange,
      className,
      ...props
    },
    ref,
  ) => {
    const radioId = useId();
    const priceId = `${radioId}-price`;
    // The badge is shown above the title but sits after the price in the DOM, so it is
    // announced with the option through aria-describedby (price, then badge).
    const badgeId = `${radioId}-badge`;
    const selectable = name !== undefined && value !== undefined;

    return (
      <div
        ref={ref}
        className={clsx(
          'kds-card-plan',
          recommended && 'recommended',
          selectable && 'kds-card-plan--selectable',
          className,
        )}
        {...props}
      >
        {selectable && (
          <input
            type="radio"
            className="kds-card-plan-radio"
            id={radioId}
            name={name}
            value={value}
            checked={selected}
            onChange={() => onSelectedChange?.(value)}
            aria-describedby={badgeText ? `${priceId} ${badgeId}` : priceId}
          />
        )}
        <div className="kds-card-plan-header">
          <h3>{selectable ? <label htmlFor={radioId}>{title}</label> : title}</h3>
        </div>
        <div className="kds-card-plan-price" id={selectable ? priceId : undefined}>
          <span className="kds-price">{price}</span>
          {period && <span className="kds-price-period">/{period}</span>}
        </div>
        {description && <div className="kds-card-plan-description">{description}</div>}
        {badgeText && (
          <span className="kds-card-plan-badge" id={selectable ? badgeId : undefined}>
            {badgeText}
          </span>
        )}
        {features && features.length > 0 && (
          <ul
            className={clsx('kds-card-plan-features', checkFeatures && 'kds-card-plan-features--check')}
          >
            {features.map((f, i) => (
              <li key={i}>
                {checkFeatures && (
                  <i className="material-symbols-outlined" aria-hidden="true">
                    check
                  </i>
                )}
                {f}
              </li>
            ))}
          </ul>
        )}
        {action}
      </div>
    );
  },
);
KdsCardPlan.displayName = 'KdsCardPlan';

export interface KdsCardPlanGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible name of the group (e.g. "Plan de cobro"). */
  label: string;
}

/**
 * Wraps selectable KdsCardPlan cards in a labelled `role="radiogroup"` laid out with the
 * `.kds-card-plan-group` grid: as many columns as fit in the group's own width (cards
 * keep their 260px minimum), so it also works inside a narrow card next to a sidebar.
 */
export const KdsCardPlanGroup = forwardRef<HTMLDivElement, KdsCardPlanGroupProps>(
  ({ label, className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={label}
      className={clsx('kds-card-plan-group', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
KdsCardPlanGroup.displayName = 'KdsCardPlanGroup';
