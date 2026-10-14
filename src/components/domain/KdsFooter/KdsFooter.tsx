import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsFooterLink {
  label: string;
  href: string;
  /** Opens in a new tab (`target="_blank" rel="noopener noreferrer"`). */
  external?: boolean;
}

export interface KdsFooterColumn {
  title: string;
  links: KdsFooterLink[];
}

export interface KdsFooterProps extends React.HTMLAttributes<HTMLElement> {
  columns: KdsFooterColumn[];
  /** Bottom part after the columns: social links, addresses, copyright. */
  children?: React.ReactNode;
}

/**
 * Site footer of the panel, on the existing classes (same markup as payment's
 * `_materialFooter.gsp`): `footer.primary`, `.kds-container-center`, a `.kds-grid` of
 * columns (12 / 6 / 2 cols by breakpoint) each with an `h6` title and a
 * `nav.kds-footer-nav` named by that title.
 */
export const KdsFooter = forwardRef<HTMLElement, KdsFooterProps>(
  ({ columns, children, className, ...props }, ref) => (
    <footer ref={ref} className={clsx('primary', className)} {...props}>
      <div className="kds-container-center">
        <div className="kds-grid">
          {columns.map((column) => (
            <div key={column.title} className="kds-col-sm-12 kds-col-md-6 kds-col-lg-2">
              <h6 className="kds-text-center">{column.title}</h6>
              <nav className="kds-footer-nav" aria-label={column.title}>
                {column.links.map((link, i) => (
                  <a
                    key={`${i}-${link.href}`}
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          ))}
        </div>
        {children}
      </div>
    </footer>
  ),
);
KdsFooter.displayName = 'KdsFooter';
