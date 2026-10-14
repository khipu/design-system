import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsNavbarProps extends React.HTMLAttributes<HTMLElement> {
  /** Logo or brand text inside `a.kds-navbar-brand`. */
  brand: React.ReactNode;
  /** @default '/' */
  brandHref?: string;
  /**
   * `primary`: brand-colored bar (logged-in panel). `surface`: light bar with a bottom
   * border (logged-out pages).
   * @default 'primary'
   */
  variant?: 'primary' | 'surface';
  /** Renders the mobile hamburger (`.kds-hamburger-btn`) when given. */
  onMenuClick?: () => void;
  /** Hamburger `aria-expanded` (the sidebar drawer state). */
  menuOpen?: boolean;
  /** Hamburger `aria-controls`: the sidebar `id`. */
  menuControls?: string;
  /** Hamburger aria-label. @default 'Menú' */
  menuLabel?: string;
  /** Right-hand actions (after the flexible spacer). */
  children?: React.ReactNode;
}

/**
 * Top bar of the panel, on the existing classes (same markup as payment's
 * `_materialNavbar.gsp`): `nav.primary` / `nav.surface`, `.kds-container-center`,
 * optional `.kds-hamburger-btn` (mobile only), `a.kds-navbar-brand`, a `.max` spacer and
 * the actions.
 */
export const KdsNavbar = forwardRef<HTMLElement, KdsNavbarProps>(
  (
    {
      brand,
      brandHref = '/',
      variant = 'primary',
      onMenuClick,
      menuOpen,
      menuControls,
      menuLabel = 'Menú',
      children,
      className,
      ...props
    },
    ref,
  ) => (
    <nav
      ref={ref}
      className={clsx(
        variant === 'primary' ? 'primary no-margin' : 'no-margin surface secondary-nav-border',
        className,
      )}
      {...props}
    >
      <div className="kds-container-center">
        {onMenuClick && (
          <button
            type="button"
            className="kds-hamburger-btn"
            aria-label={menuLabel}
            aria-expanded={menuOpen}
            aria-controls={menuControls}
            onClick={onMenuClick}
          >
            <i className="material-symbols-outlined" aria-hidden="true">
              menu
            </i>
          </button>
        )}
        <a href={brandHref} className="kds-navbar-brand">
          {brand}
        </a>
        <div className="max" />
        {children}
      </div>
    </nav>
  ),
);
KdsNavbar.displayName = 'KdsNavbar';
