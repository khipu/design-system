import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';
import { KhipuWordmark } from './KhipuWordmark';

export interface KdsSecureFooterProps extends React.HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'inside';
  /** Muestra el logo de Khipu (a color). Default: true. */
  showLogo?: boolean;
  /**
   * Logo del proveedor de pagos (PSP) que contrató a Khipu. Si se provee, se renderiza
   * a la derecha del logo de Khipu separado por un divisor (ej. "Khipu | klap").
   * El consumidor pasa el `<img>`/SVG del PSP — el DS no empaqueta logos de terceros.
   */
  psp?: React.ReactNode;
}

export const KdsSecureFooter = forwardRef<HTMLElement, KdsSecureFooterProps>(
  ({ variant = 'default', showLogo = true, psp, children, className, ...props }, ref) => (
    <footer ref={ref} className={clsx('kds-secure-footer', variant === 'inside' && 'inside', className)} {...props}>
      <svg className="kds-secure-footer-lock" viewBox="0 0 24 24" aria-hidden="true">
        <rect x="4.5" y="10.5" width="15" height="10" rx="2.25" />
        <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
      </svg>
      {/* El texto NO incluye "Khipu": la marca la aporta el logo a continuación. */}
      {children || <span>Pago seguro procesado por</span>}
      {showLogo && <KhipuWordmark />}
      {psp && (
        <>
          <span className="kds-secure-footer-sep" aria-hidden="true" />
          {psp}
        </>
      )}
    </footer>
  ),
);
KdsSecureFooter.displayName = 'KdsSecureFooter';
