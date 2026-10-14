import React, { forwardRef, useId } from 'react';
import { clsx } from '../../core/utils';

export interface KdsCardSelectorProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  icon?: string;
  title: string;
  description?: string;
  /** Button mode: highlights the card (`.selected`). */
  selected?: boolean;
  /**
   * Radio mode (requires `name` and `value`): the card becomes a native radio option
   * (`.kds-card-selector--radio`): a `<div>` with an `<input type="radio">` and the title as
   * its label stretched over the card. Needed for block content such as lists in
   * `children`, which a `<button>` cannot hold. Cards sharing a `name` form one group
   * (arrow keys, form submit) without JS. Explicit opt-in: without it, `name`/`value` stay
   * on the `<button>` as before (e.g. a submit button).
   */
  radio?: boolean;
  /** Button mode: the button's `name`. Radio mode: the radio group name. */
  name?: string;
  /** Button mode: the button's `value`. Radio mode: the value submitted for this option. */
  value?: string;
  /** Radio mode: controlled checked state. */
  checked?: boolean;
  /** Radio mode: called with `value` when the user picks this card. */
  onCheckedChange?: (value: string) => void;
  /**
   * Extra content under the description (`.kds-card-selector-details`). In button mode it
   * must be inline content (it renders in a `<span>`); use radio mode for lists or blocks.
   */
  children?: React.ReactNode;
}

/**
 * The ref points to the `<button>` in button mode and to the card `<div>` in radio mode.
 */
export const KdsCardSelector = forwardRef<HTMLElement, KdsCardSelectorProps>(
  (
    {
      icon,
      title,
      description,
      selected,
      radio,
      name,
      value,
      checked,
      onCheckedChange,
      children,
      className,
      disabled,
      type,
      ...props
    },
    ref,
  ) => {
    const radioId = useId();
    const descriptionId = `${radioId}-description`;

    const iconNode = icon && (
      <span className="kds-card-selector-icon" aria-hidden="true">
        <i className="material-symbols-outlined">{icon}</i>
      </span>
    );

    if (radio && name !== undefined && value !== undefined) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          className={clsx('kds-card-selector', 'kds-card-selector--radio', className)}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
          <input
            type="radio"
            className="kds-card-selector-radio"
            id={radioId}
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={() => onCheckedChange?.(value)}
            aria-describedby={description ? descriptionId : undefined}
          />
          {iconNode}
          <label htmlFor={radioId} className="kds-card-selector-title">
            {title}
          </label>
          {description && (
            <span className="kds-card-selector-description" id={descriptionId}>
              {description}
            </span>
          )}
          {children && <div className="kds-card-selector-details">{children}</div>}
        </div>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type ?? 'button'}
        className={clsx('kds-card-selector', selected && 'selected', className)}
        disabled={disabled}
        name={name}
        value={value}
        {...props}
      >
        {iconNode}
        <span className="kds-card-selector-title">{title}</span>
        {description && <span className="kds-card-selector-description">{description}</span>}
        {children && <span className="kds-card-selector-details">{children}</span>}
      </button>
    );
  },
);
KdsCardSelector.displayName = 'KdsCardSelector';

export interface KdsCardSelectorGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Accessible name of the group (e.g. "Tipo de contribuyente"). */
  label: string;
}

/**
 * Wraps radio-mode KdsCardSelector cards in a labelled `role="radiogroup"` laid out with
 * the `.kds-card-selector-group` grid: as many columns as fit in the group's own width.
 */
export const KdsCardSelectorGroup = forwardRef<HTMLDivElement, KdsCardSelectorGroupProps>(
  ({ label, className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="radiogroup"
      aria-label={label}
      className={clsx('kds-card-selector-group', className)}
      {...props}
    >
      {children}
    </div>
  ),
);
KdsCardSelectorGroup.displayName = 'KdsCardSelectorGroup';
