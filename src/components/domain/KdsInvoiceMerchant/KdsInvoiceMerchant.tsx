import React, { forwardRef, useState } from 'react';
import { clsx } from '../../core/utils';
import { useLogoBackdrop } from './useLogoBackdrop';

export interface KdsInvoiceMerchantProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Logo URL del comercio. Si falla la carga (o no se provee), cae al ícono `storefront`. */
  logoUrl?: string;
  /**
   * Color de marca del tile de fallback (ícono `storefront`). Si se omite, usa el fondo
   * púrpura del DS. No aplica cuando hay logo: los logos van sobre el fondo neutro para
   * que las transparencias no queden sobre el color de marca.
   */
  brandColor?: string;
}

/**
 * KdsInvoiceMerchant — avatar cuadrado del comercio dentro del `kds-invoice-header`.
 *
 * Renderiza el markup canónico `.kds-invoice-merchant` (decorativo: `aria-hidden`), con el
 * logo del comercio y fallback al ícono `storefront` si la imagen no carga. El logo se muestra
 * completo (`contain`) sobre el fondo neutro (`.kds-invoice-merchant-neutral`); el color de
 * marca solo pinta el tile de fallback. Dentro de `.kds-invoice-sticky` el tamaño colapsa
 * con el scroll vía el CSS del DS (`--collapse-progress`).
 *
 * Reemplaza la imagen + `onerror` inline del header server-side por manejo de error en React.
 *
 * @css .kds-invoice-merchant, .kds-invoice-merchant-neutral, .kds-invoice-merchant img, .kds-invoice-merchant i
 */
export const KdsInvoiceMerchant = forwardRef<HTMLDivElement, KdsInvoiceMerchantProps>(
  ({ logoUrl, brandColor, className, style, ...props }, ref) => {
    const [failed, setFailed] = useState(false);
    const showLogo = !!logoUrl && !failed;
    const backdrop = useLogoBackdrop(showLogo ? logoUrl : undefined);

    return (
      <div
        ref={ref}
        className={clsx(
          'kds-invoice-merchant',
          showLogo && 'kds-invoice-merchant-neutral',
          showLogo && backdrop === 'dark' && 'dark',
          className,
        )}
        aria-hidden="true"
        style={!showLogo && brandColor ? { background: brandColor, ...style } : style}
        {...props}
      >
        {showLogo ? (
          <img src={logoUrl} alt="" onError={() => setFailed(true)} />
        ) : (
          <i className="material-symbols-outlined">storefront</i>
        )}
      </div>
    );
  },
);
KdsInvoiceMerchant.displayName = 'KdsInvoiceMerchant';
