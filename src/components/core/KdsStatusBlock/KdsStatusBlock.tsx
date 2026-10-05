/**
 * Khipu Design System - StatusBlock Component
 *
 * Bloque de resultado (icono + título + descripción) para pantallas de éxito/error/pendiente.
 *
 * Spacing: el padding vertical estándar es `--kds-spacing-2` (16px) — el mismo rhythm
 * inter-elementos que usan `kds-btn-stack` y `kds-hr-dashed`. Usarlo standalone (sin
 * envolverlo en wrappers con su propio padding) para no duplicar el espacio.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsStatusType = 'success' | 'pending' | 'warn' | 'error' | 'info';

export interface KdsStatusBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  status: KdsStatusType;
  icon?: string;
  title: string;
  /**
   * Texto descriptivo bajo el título. Acepta `ReactNode` para permitir énfasis
   * en línea (p.ej. un lead-in en `<strong>` seguido del detalle). Se renderiza
   * dentro de un `<p>`, así que usar solo contenido válido como hijo de párrafo.
   *
   * With `inline`, the description goes below the icon+title row as a full-width
   * paragraph (result screens), and the block owns the spacing around it: the
   * consumer does not add margins to the description or to what follows it.
   */
  description?: React.ReactNode;
  inline?: boolean;
}

export const KdsStatusBlock = forwardRef<HTMLDivElement, KdsStatusBlockProps>(
  ({ status, icon, title, description, inline, className, ...props }, ref) => {
    const descriptionBelowRow = Boolean(inline && description);
    const descriptionNode = description ? <p className="kds-status-block-description">{description}</p> : null;
    return (
      <div
        ref={ref}
        className={clsx(
          'kds-status-block',
          inline && 'inline',
          descriptionBelowRow && 'kds-status-block--described',
          className,
        )}
        data-status={status}
        {...props}
      >
        <div className="kds-status-block-icon">
          {icon && <i className="material-symbols-outlined">{icon}</i>}
        </div>
        <div>
          <h2 className="kds-status-block-title">{title}</h2>
          {!descriptionBelowRow && descriptionNode}
        </div>
        {descriptionBelowRow && descriptionNode}
      </div>
    );
  },
);
KdsStatusBlock.displayName = 'KdsStatusBlock';
