/**
 * Khipu Design System - Tabs Component
 *
 * Matchea exactamente el markup que usa producción payment:
 *
 *   <div class="kds-segmented-tabs" role="tablist">
 *     <button type="button" class="active" role="tab" aria-selected="true">Personas</button>
 *     <button type="button" role="tab" aria-selected="false">Empresas</button>
 *   </div>
 *
 * Solo existe la variante segmented — producción payment no usa otra cosa, y el
 * "standard" Material Design 3 underline tab no está en el Khipu DS.
 *
 * @gsp `_choosePaymentMethodFormMaterial.gsp` (líneas 18-25)
 */

import React, { forwardRef, Children, useMemo } from 'react';
import { clsx } from '../utils';
import { useTabsKeyboard } from '../hooks/useTabsKeyboard';

export interface KdsTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Índice 0-based del tab activo. */
  activeIndex: number;
  /** Callback cuando cambia el tab activo. */
  onChange: (index: number) => void;
}

export const KdsTabs = forwardRef<HTMLDivElement, KdsTabsProps>(
  ({ activeIndex, onChange, children, className, style, ...props }, ref) => {
    const tabCount = Children.count(children);
    const { onKeyDown } = useTabsKeyboard(tabCount, activeIndex, onChange);

    // CSS custom properties para que `.kds-segmented-tabs::before` (el background del active) se anime.
    const mergedStyle = useMemo(
      () => ({
        ...style,
        '--_tab-count': tabCount,
        '--_active-idx': activeIndex,
      }) as React.CSSProperties,
      [tabCount, activeIndex, style],
    );

    return (
      <div
        ref={ref}
        role="tablist"
        className={clsx('kds-segmented-tabs', className)}
        style={mergedStyle}
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
      type="button"
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
