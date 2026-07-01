/**
 * Khipu Design System - Floating Action Button (FAB)
 *
 * A circular, icon-only floating button built with native HTML and kds-* CSS classes.
 * Presentational only: pair it with `useHideOnScroll` and drive the `hidden` prop for
 * hide-on-scroll behavior.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

// =============================================================================
// TYPES
// =============================================================================

export type KdsFabPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'none';

export interface KdsFabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Material Symbols icon name, e.g. "close". */
  icon: string;
  /** Accessible label — required, since the button is icon-only. */
  'aria-label': string;
  /** Corner to pin to (fixed). Use `none` to leave positioning to the consumer. Default `top-right`. */
  position?: KdsFabPosition;
  /** When true, animates the button out (fade + slight move) and disables interaction. */
  hidden?: boolean;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Floating action button — circular, icon-only, with an animated hide state.
 *
 * @example
 * ```tsx
 * // Static, pinned top-right
 * <KdsFab icon="close" aria-label="Cancelar pago" onClick={openCancel} />
 *
 * // Hide on scroll down, show on scroll up
 * const { hidden } = useHideOnScroll();
 * <KdsFab icon="close" aria-label="Cancelar pago" hidden={hidden} onClick={openCancel} />
 * ```
 */
export const KdsFab = forwardRef<HTMLButtonElement, KdsFabProps>(
  ({ icon, position = 'top-right', hidden = false, className, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx(
        'kds-fab',
        position !== 'none' && `kds-fab--${position}`,
        hidden && 'kds-fab--hidden',
        className,
      )}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
      {...props}
    >
      <i className="material-symbols-outlined">{icon}</i>
    </button>
  ),
);

KdsFab.displayName = 'KdsFab';
