import React, { forwardRef, Children } from 'react';
import { clsx } from '../utils';
import { useTabsKeyboard } from '../hooks/useTabsKeyboard';

export interface KdsTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  activeIndex: number;
  onChange: (index: number) => void;
  variant?: 'standard' | 'segmented';
}

export const KdsTabs = forwardRef<HTMLDivElement, KdsTabsProps>(
  ({ activeIndex, onChange, variant = 'standard', children, className, ...props }, ref) => {
    const tabCount = Children.count(children);
    const { onKeyDown } = useTabsKeyboard(tabCount, activeIndex, onChange);

    return (
      <div
        ref={ref}
        role="tablist"
        className={clsx(variant === 'segmented' ? 'kds-segmented-tabs' : 'kds-tabs', className)}
        onKeyDown={onKeyDown}
        {...props}
      >
        {Children.map(children, (child, i) => {
          if (!React.isValidElement(child)) return child;
          return React.cloneElement(child as React.ReactElement<KdsTabInternalProps>, {
            _active: i === activeIndex,
            _onClick: () => onChange(i),
          });
        })}
      </div>
    );
  },
);
KdsTabs.displayName = 'KdsTabs';

interface KdsTabInternalProps {
  _active?: boolean;
  _onClick?: () => void;
}

export interface KdsTabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const KdsTab = forwardRef<HTMLButtonElement, KdsTabProps & KdsTabInternalProps>(
  ({ _active, _onClick, children, className, ...props }, ref) => (
    <button
      ref={ref}
      role="tab"
      aria-selected={_active}
      tabIndex={_active ? 0 : -1}
      className={clsx(_active && 'active', className)}
      onClick={_onClick}
      {...props}
    >
      {children}
    </button>
  ),
);
KdsTab.displayName = 'KdsTab';

export interface KdsTabPanelProps extends React.HTMLAttributes<HTMLDivElement> {
  active: boolean;
}

export const KdsTabPanel = forwardRef<HTMLDivElement, KdsTabPanelProps>(
  ({ active, children, className, ...props }, ref) => (
    <div
      ref={ref}
      role="tabpanel"
      hidden={!active}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
);
KdsTabPanel.displayName = 'KdsTabPanel';
