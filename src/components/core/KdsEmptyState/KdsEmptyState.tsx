/**
 * Khipu Design System - EmptyState Component
 *
 * Estado vacío para búsquedas y listas filtradas sin resultados: ícono +
 * mensaje principal + sugerencia opcional, centrados.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';
import { KdsTypography } from '../KdsTypography';

export interface KdsEmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ícono Material Symbols. Por defecto `hide_source` (sin resultados). */
  icon?: string;
  /** Mensaje principal, p.ej. "Sin coincidencias". */
  title: string;
  /** Sugerencia secundaria, p.ej. "Intenta buscando otro banco". */
  description?: string;
}

/**
 * KdsEmptyState — estado "sin resultados" para búsquedas/listas filtradas
 * (p.ej. `KdsSearchField` + `KdsBankList`).
 *
 * Canoniza el patrón que khenshin-web renderizaba a mano en la búsqueda de
 * bancos (cuyo markup de utilidades quedaba en block: kds-flex-col no define
 * display, y los párrafos heredaban márgenes de BeerCSS). La clase propia
 * resetea márgenes, centra y dimensiona el ícono.
 * `role="status"` para que los lectores de pantalla anuncien el cambio cuando
 * el filtro se queda sin resultados.
 *
 * @css .kds-empty-state
 */
export const KdsEmptyState = forwardRef<HTMLDivElement, KdsEmptyStateProps>(
  ({ icon = 'hide_source', title, description, className, ...props }, ref) => (
    <div
      ref={ref}
      role="status"
      className={clsx('kds-empty-state', className)}
      {...props}
    >
      <i className="material-symbols-outlined" aria-hidden="true">
        {icon}
      </i>
      <div className="kds-empty-state-text">
        <KdsTypography variant="body" color="primary">
          {title}
        </KdsTypography>
        {description && (
          <KdsTypography variant="body" color="secondary">
            {description}
          </KdsTypography>
        )}
      </div>
    </div>
  ),
);
KdsEmptyState.displayName = 'KdsEmptyState';
