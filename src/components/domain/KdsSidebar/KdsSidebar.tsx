import React, { forwardRef, useEffect, useId, useRef, useState } from 'react';
import { clsx } from '../../core/utils';

export interface KdsSidebarItem {
  label: string;
  href: string;
  /** Material Symbol (decorative). */
  icon?: string;
  /** Current page: `.active` + `aria-current="page"`. */
  active?: boolean;
  /** Opens in a new tab. */
  external?: boolean;
}

export interface KdsSidebarHeader {
  title: string;
  subtitle?: string;
  /** Material Symbol shown instead of the avatar (e.g. 'settings'). */
  icon?: string;
  /** Avatar initial, used when there is no icon. */
  avatar?: string;
  /**
   * Context switcher content (e.g. `.kds-sidebar-nav-item` links). When given, the header
   * becomes a toggle (`role="button"`, keyboard operable) for the floating dropdown.
   */
  menu?: React.ReactNode;
}

export interface KdsSidebarProps extends React.HTMLAttributes<HTMLElement> {
  header: KdsSidebarHeader;
  items: KdsSidebarItem[];
  /** Accessible name of the item nav. @default 'Menú de la cuenta' */
  navLabel?: string;
  /** Mobile drawer state (≤ 768px). */
  open?: boolean;
  /** Called by the drawer's close button and Escape while open. */
  onClose?: () => void;
  /** Title of the mobile drawer bar. @default 'Menú' */
  mobileTitle?: string;
  /** aria-label of the drawer close button. @default 'Cerrar menú' */
  closeLabel?: string;
}

/**
 * Side navigation of the logged-in panel, on the existing `.kds-sidebar` classes (same
 * markup as payment's `_materialSidebar.gsp` + `mat:sidebarHeader`/`mat:sidebarNav`, with
 * the items inside `nav.kds-sidebar-nav` like the DS demo). Desktop: sticky floating card.
 * Mobile: full-width drawer driven by `open`/`onClose`.
 */
export const KdsSidebar = forwardRef<HTMLElement, KdsSidebarProps>(
  (
    {
      header,
      items,
      navLabel = 'Menú de la cuenta',
      open = false,
      onClose,
      mobileTitle = 'Menú',
      closeLabel = 'Cerrar menú',
      className,
      ...props
    },
    ref,
  ) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const asideRef = useRef<HTMLElement | null>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const menuId = useId();
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    const setAsideRef = (el: HTMLElement | null) => {
      asideRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) ref.current = el;
    };

    // Drawer open: focus the close button, Escape closes; on close, focus goes back to
    // whatever opened it (usually the navbar hamburger).
    useEffect(() => {
      if (!open) return undefined;
      const opener = document.activeElement as HTMLElement | null;
      closeRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onCloseRef.current?.();
      };
      document.addEventListener('keydown', onKey);
      return () => {
        document.removeEventListener('keydown', onKey);
        if (opener && opener !== document.body && opener.isConnected) opener.focus();
      };
    }, [open]);

    // On mobile the closed drawer is off-screen: make it inert so its links are neither
    // tabbable nor read. On desktop the sidebar is always visible and never inert.
    useEffect(() => {
      const el = asideRef.current;
      if (!el || typeof window.matchMedia !== 'function') return undefined;
      const mobile = window.matchMedia('(max-width: 768px)');
      const sync = () => el.toggleAttribute('inert', mobile.matches && !open);
      sync();
      mobile.addEventListener('change', sync);
      return () => mobile.removeEventListener('change', sync);
    }, [open]);

    useEffect(() => {
      if (!menuOpen) return undefined;
      const onDocClick = (e: MouseEvent) => {
        if (!headerRef.current?.contains(e.target as Node)) setMenuOpen(false);
      };
      document.addEventListener('click', onDocClick);
      return () => document.removeEventListener('click', onDocClick);
    }, [menuOpen]);

    const hasMenu = header.menu !== undefined;

    // Escape inside the header menu closes only the menu (not the mobile drawer) and
    // returns focus to its toggle.
    const onHeaderKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) {
        e.stopPropagation();
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    const headerContent = (
      <>
        {header.icon ? (
          <i className="material-symbols-outlined kds-sidebar-icon" aria-hidden="true">
            {header.icon}
          </i>
        ) : (
          header.avatar && (
            <div className="kds-sidebar-avatar" aria-hidden="true">
              {header.avatar}
            </div>
          )
        )}
        <div className="kds-sidebar-header-text">
          <div className="kds-sidebar-title">{header.title}</div>
          {header.subtitle && <div className="kds-sidebar-subtitle">{header.subtitle}</div>}
        </div>
      </>
    );

    return (
      <aside
        ref={setAsideRef}
        className={clsx('kds-sidebar', open && 'kds-sidebar-open', className)}
        {...props}
      >
        <div className="kds-sidebar-mobile-header">
          <span>{mobileTitle}</span>
          <button
            ref={closeRef}
            type="button"
            className="kds-sidebar-close-btn"
            aria-label={closeLabel}
            onClick={() => onClose?.()}
          >
            <i className="material-symbols-outlined" aria-hidden="true">
              close
            </i>
          </button>
        </div>

        <div ref={headerRef} className="kds-sidebar-header" onKeyDown={onHeaderKeyDown}>
          {hasMenu ? (
            <>
              {/* The toggle is its own button; the menu links are its sibling, never
                  nested inside it. */}
              <button
                ref={toggleRef}
                type="button"
                className="kds-sidebar-header-toggle"
                aria-haspopup="true"
                aria-expanded={menuOpen}
                aria-controls={menuId}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {headerContent}
                <i className="material-symbols-outlined kds-sidebar-dropdown-icon" aria-hidden="true">
                  expand_more
                </i>
              </button>
              <div
                id={menuId}
                className={clsx(
                  'kds-sidebar-header-dropdown surface elevate border small-round',
                  menuOpen && 'kds-dropdown-open',
                )}
              >
                {header.menu}
              </div>
            </>
          ) : (
            headerContent
          )}
        </div>

        <nav className="kds-sidebar-nav" aria-label={navLabel}>
          {items.map((item, i) => (
            <a
              key={`${i}-${item.href}`}
              href={item.href}
              className={clsx('kds-sidebar-nav-item', item.active && 'active')}
              aria-current={item.active ? 'page' : undefined}
              {...(item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {item.icon && (
                <i className="material-symbols-outlined" aria-hidden="true">
                  {item.icon}
                </i>
              )}
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>
    );
  },
);
KdsSidebar.displayName = 'KdsSidebar';
