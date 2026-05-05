/**
 * Khipu Design System - Alert Component
 *
 * An alert component built with native HTML and kds-* CSS classes.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

// =============================================================================
// TYPES
// =============================================================================

export type KdsAlertSeverity = 'success' | 'info' | 'warning' | 'error';

export interface KdsAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alert severity/type */
  severity: KdsAlertSeverity;
  /** Alert title */
  title?: string;
  /** Material Symbols icon name, e.g. "info" */
  icon?: string;
  /** Inline variant (compact display) */
  inline?: boolean;
  /** Alert content */
  children: React.ReactNode;
  /** Closable alert */
  onClose?: () => void;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Alert component for displaying important messages.
 *
 * Built with native HTML and kds-* CSS classes from the BeerCSS bundle.
 *
 * @example
 * ```tsx
 * // Info alert (like in subscription details)
 * <KdsAlert severity="info">
 *   El tope mensual corresponde al monto máximo posible a cobrar mensualmente.
 * </KdsAlert>
 *
 * // Success alert
 * <KdsAlert severity="success" title="¡Todo listo!">
 *   Espera la confirmación por parte de tu banco
 * </KdsAlert>
 *
 * // Warning alert
 * <KdsAlert severity="warning" onClose={() => setOpen(false)}>
 *   Tu sesión expirará pronto
 * </KdsAlert>
 *
 * // Error alert
 * <KdsAlert severity="error">
 *   Ha ocurrido un error al procesar tu pago
 * </KdsAlert>
 * ```
 */
export const KdsAlert = forwardRef<HTMLDivElement, KdsAlertProps>(
  ({ severity, title, icon, inline, onClose, children, className, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={clsx('kds-alert', `kds-${severity}`, inline && 'kds-alert-inline', className)}
      {...props}
    >
      {icon && (
        <div className="kds-alert-icon">
          <i className="material-symbols-outlined">{icon}</i>
        </div>
      )}
      <div className="kds-alert-content">
        {title && <p className="kds-alert-title">{title}</p>}
        <p className="kds-alert-description">{children}</p>
      </div>
      {onClose && (
        <button className="kds-btn kds-btn-text kds-btn-sm" onClick={onClose} aria-label="Cerrar">
          <i className="material-symbols-outlined">close</i>
        </button>
      )}
    </div>
  ),
);

KdsAlert.displayName = 'KdsAlert';
