import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';
import { useLogoBackdrop } from '../KdsInvoiceMerchant';

export interface KdsMerchantTileProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Nombre del merchant (usado para alt del logo o initials fallback). */
  name: string;
  /** URL del logo del merchant. Si está presente, renderiza `<img>` dentro del tile. */
  logoUrl?: string;
  /** Initials custom (2-3 letras). Si no se provee, usa las primeras 2 letras de `name`. */
  initials?: string;
  /** Variante compacta: 40×40 en vez de 56×56. */
  compact?: boolean;
}

/**
 * KdsMerchantTile — tile cuadrado con logo del comercio o initials.
 *
 * Layout (spec):
 * - `56 x 56` (default) / `40 x 40` (compact)
 * - `border-radius: var(--kds-radius-card)`
 * - `background: var(--kds-color-primary-deep)` (#5B3DB5)
 * - `color: white`, `display: grid; place-items: center`
 * - Initials: `font-size: xl` (20px), `font-weight: 700`, `letter-spacing: 0.02em`
 *
 * Variante logo:
 * - Agrega clase `.logo`, padding `var(--kds-spacing-0-5)` (4px)
 * - `<img>` interna: `object-fit: cover`, `border-radius: var(--kds-radius-md)`
 *
 * Compose with: este componente SOLO renderiza el tile cuadrado. Para el header
 * de comercio completo ("estás pagando a" + nombre), envolver en el patrón
 * `.kds-merchant`:
 * ```html
 * <div class="kds-merchant">
 *   <!-- KdsMerchantTile → .kds-merchant-tile -->
 *   <div class="kds-merchant-meta">
 *     <span class="kds-merchant-label">Estás pagando a</span>
 *     <strong>Comercial Santiago SpA</strong>
 *   </div>
 * </div>
 * ```
 * Spacing canónico: `.kds-merchant` gap `var(--kds-spacing-1-75)`; label
 * `margin-bottom: var(--kds-spacing-0-25)`. Ver `Patterns/CSS-only → MerchantHeader`.
 *
 * @css .kds-merchant-tile, .kds-merchant-tile.logo, .kds-merchant.compact .kds-merchant-tile
 */
export const KdsMerchantTile = forwardRef<HTMLDivElement, KdsMerchantTileProps>(
  ({ name, logoUrl, initials, compact, className, ...props }, ref) => {
    const displayInitials = (initials ?? name.slice(0, 2)).toUpperCase();
    const backdrop = useLogoBackdrop(logoUrl);
    return (
      <div
        ref={ref}
        className={clsx(
          'kds-merchant-tile',
          logoUrl && 'logo',
          logoUrl && backdrop === 'dark' && 'dark',
          compact && 'compact',
          className,
        )}
        aria-label={name}
        {...props}
      >
        {logoUrl ? <img src={logoUrl} alt={name} /> : displayInitials}
      </div>
    );
  },
);
KdsMerchantTile.displayName = 'KdsMerchantTile';
