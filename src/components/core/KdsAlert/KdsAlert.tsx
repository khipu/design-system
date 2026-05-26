/**
 * Khipu Design System - Alert Component
 *
 * Alert con icon opcional, content y close button.
 *
 * Specs (CSS-derived):
 * - `.kds-alert`: flex, align-items center, gap 8px, padding 16px, border-radius md, border 1px
 * - `.kds-alert-icon`: 24px, flex-shrink 0
 * - `.kds-alert-content`: flex 1, min-width 0 (permite ellipsis del texto)
 * - Variantes: kds-info / kds-success / kds-warning / kds-error
 * - `.kds-alert-inline` reduce padding y bottom-margin
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export type KdsAlertSeverity = 'success' | 'info' | 'warning' | 'error';

/** Default icon por severity (Material Symbols). */
const DEFAULT_ICONS: Record<KdsAlertSeverity, string> = {
  success: 'check_circle',
  info: 'info',
  warning: 'warning',
  error: 'error',
};

export interface KdsAlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alert severity/type. */
  severity: KdsAlertSeverity;
  /** Alert title (negrita arriba). */
  title?: string;
  /**
   * Material Symbols icon name. Si es `true` (o se omite y hay otra prop), se usa el default por severity.
   * Pasar `false` para ocultar el icon. Pasar un string custom para override.
   */
  icon?: string | boolean;
  /** Inline variant (compact display, sin border-radius grande). */
  inline?: boolean;
  /** Alert body. */
  children: React.ReactNode;
  /** Callback para cerrar — renderiza icon-button discreto a la derecha. */
  onClose?: () => void;
}

export const KdsAlert = forwardRef<HTMLDivElement, KdsAlertProps>(
  ({ severity, title, icon, inline, onClose, children, className, ...props }, ref) => {
    const resolvedIcon =
      icon === false ? null : typeof icon === 'string' ? icon : DEFAULT_ICONS[severity];

    return (
      <div
        ref={ref}
        role="alert"
        className={clsx('kds-alert', `kds-${severity}`, inline && 'kds-alert-inline', className)}
        {...props}
      >
        {resolvedIcon && (
          <div className="kds-alert-icon">
            <i className="material-symbols-outlined">{resolvedIcon}</i>
          </div>
        )}
        <div className="kds-alert-content">
          {title && <p className="kds-alert-title">{title}</p>}
          <p className="kds-alert-description">{children}</p>
        </div>
        {onClose && (
          <button
            type="button"
            className="kds-alert-close"
            onClick={onClose}
            aria-label="Cerrar"
          >
            <i className="material-symbols-outlined">close</i>
          </button>
        )}
      </div>
    );
  },
);

KdsAlert.displayName = 'KdsAlert';
