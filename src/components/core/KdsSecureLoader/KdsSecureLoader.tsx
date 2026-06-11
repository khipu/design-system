/**
 * Khipu Design System - SecureLoader Component
 *
 * Loader de pantalla completa para flujos de pago: anillo circular animado con
 * un candado centrado y, opcionalmente, dos líneas de texto (estado + detalle).
 *
 * El anillo es un arco fino (~2px) rotando, definido en `.kds-secure-loader-ring`.
 * El texto es opcional y se pasa por props (`title`/`message`) porque su contenido
 * lo provee el consumidor (i18n / estado de la operación).
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsSecureLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Frase de estado (línea principal) mostrada sobre el spinner. */
  title?: string;
  /** Detalle/submensaje (color primario) bajo el título. */
  message?: string;
}

export const KdsSecureLoader = forwardRef<HTMLDivElement, KdsSecureLoaderProps>(
  ({ title, message, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-secure-loader', className)} role="status" aria-busy="true" {...props}>
      {(title || message) && (
        <div className="kds-secure-loader-text">
          {title && <p className="kds-secure-loader-title">{title}</p>}
          {message && <p className="kds-secure-loader-message">{message}</p>}
        </div>
      )}
      <div className="kds-secure-loader-spinner">
        <svg className="kds-secure-loader-ring" viewBox="22 22 44 44" aria-hidden="true">
          <circle cx="44" cy="44" r="20.2" />
        </svg>
        <i className="material-symbols-outlined kds-secure-loader-lock" aria-hidden="true">
          lock
        </i>
      </div>
    </div>
  ),
);
KdsSecureLoader.displayName = 'KdsSecureLoader';
