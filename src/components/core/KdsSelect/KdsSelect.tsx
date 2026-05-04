/**
 * Khipu Design System - Select Component
 *
 * A select dropdown component built on Radix UI Select with BeerCSS field styling.
 */

import React, { forwardRef } from 'react';
import * as Select from '@radix-ui/react-select';
import { clsx } from '../utils';

// =============================================================================
// TYPES
// =============================================================================

export interface KdsSelectProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: boolean;
  helperText?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

export interface KdsSelectItemProps extends Select.SelectItemProps {
  children: React.ReactNode;
}

// =============================================================================
// COMPONENTS
// =============================================================================

/**
 * Select dropdown component for choosing one option from a list.
 *
 * @example
 * ```tsx
 * <KdsSelect
 *   label="Banco"
 *   value={bank}
 *   onValueChange={setBank}
 *   placeholder="Selecciona tu banco"
 * >
 *   <KdsSelect.Item value="bci">BCI</KdsSelect.Item>
 *   <KdsSelect.Item value="santander">Santander</KdsSelect.Item>
 * </KdsSelect>
 * ```
 */
const KdsSelectRoot = forwardRef<HTMLDivElement, KdsSelectProps>(
  (
    {
      value,
      onValueChange,
      placeholder,
      label,
      error,
      helperText,
      disabled,
      fullWidth = true,
      children,
      className,
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={clsx(
        'kds-select',
        error && 'kds-select-error',
        fullWidth && 'kds-select-full',
        className,
      )}
    >
      {label && <label className="kds-select-label">{label}</label>}
      <Select.Root value={value} onValueChange={onValueChange} disabled={disabled}>
        <Select.Trigger className="kds-select-trigger">
          <Select.Value placeholder={placeholder} />
          <Select.Icon className="kds-select-icon">
            <i className="material-symbols-outlined">expand_more</i>
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="kds-select-content" position="popper" sideOffset={4}>
            <Select.Viewport className="kds-select-viewport">
              {children}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      {helperText && (
        <span className={clsx('kds-select-helper', error && 'kds-select-helper-error')}>
          {helperText}
        </span>
      )}
    </div>
  ),
);
KdsSelectRoot.displayName = 'KdsSelect';

const KdsSelectItem = forwardRef<HTMLDivElement, KdsSelectItemProps>(
  ({ children, className, ...props }, ref) => (
    <Select.Item ref={ref} className={clsx('kds-select-item', className)} {...props}>
      <Select.ItemText>{children}</Select.ItemText>
      <Select.ItemIndicator className="kds-select-item-indicator">
        <i className="material-symbols-outlined">check</i>
      </Select.ItemIndicator>
    </Select.Item>
  ),
);
KdsSelectItem.displayName = 'KdsSelect.Item';

export const KdsSelect = Object.assign(KdsSelectRoot, {
  Item: KdsSelectItem,
});
