/**
 * Khipu Design System - Snackbar Component
 *
 * Matchea exactamente el markup que genera `Khipu.showSnackbar()` y
 * `initFlashMessages()` (`src/beercss/customizations/khipu-init.js`):
 *
 *   <div class="snackbar active [info|success|error]"
 *        data-auto-dismiss="true"
 *        style="--kds-snackbar-duration: 5000ms">
 *     <i class="material-symbols-outlined">[icon]</i>
 *     <span class="max">message</span>
 *     <button class="kds-snackbar-close" aria-label="Cerrar">
 *       <i class="material-symbols-outlined">close</i>
 *     </button>
 *   </div>
 *
 * Features:
 * - Icon prefix automático según `type` (info / check_circle / error).
 * - Progress bar lineal en la parte inferior animado durante `duration` ms (CSS `::after`).
 * - Close button con estilo `.kds-snackbar-close` (icon-only, blanco semi-transparente).
 *
 * @gsp `_paymentFlashSnackbars.gsp` (markup base) + `khipu-init.js → initFlashMessages()` (close + dismiss timer)
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';
import { useAutoHide } from '../hooks/useAutoHide';

export type KdsSnackbarType = 'success' | 'error' | 'info';

/** Iconos default por type (matchea `Khipu.showSnackbar`). */
const DEFAULT_ICONS: Record<KdsSnackbarType, string> = {
  info: 'info',
  success: 'check_circle',
  error: 'error',
};

export interface KdsSnackbarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'role'> {
  /** Mensaje del snackbar. */
  message: string;
  /** Variante semántica. Default `info`. */
  type?: KdsSnackbarType;
  /**
   * Duración en ms antes de auto-dismiss. Default `5000`.
   * También controla la duración del progress bar (CSS var `--kds-snackbar-duration`).
   * Pasa `0` para deshabilitar auto-dismiss (no progress bar).
   */
  duration?: number;
  /** Callback al cerrar (click en X o tras auto-dismiss). */
  onClose?: () => void;
  /** Controla visibilidad. Default `true`. */
  open?: boolean;
  /**
   * Material Symbol icon name. Si se omite, usa el default por `type`.
   * Pasa `false` para ocultar el icon prefix.
   */
  icon?: string | false;
}

export const KdsSnackbar = forwardRef<HTMLDivElement, KdsSnackbarProps>(
  (
    {
      message,
      type = 'info',
      duration = 5000,
      onClose,
      open = true,
      icon,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const autoDismiss = duration > 0;
    const { visible } = useAutoHide(autoDismiss ? duration : 0, onClose);
    if (!open || !visible) return null;

    const resolvedIcon = icon === false ? null : icon ?? DEFAULT_ICONS[type];

    // Inline CSS custom property para sincronizar el progress bar con `duration`
    const mergedStyle: React.CSSProperties = autoDismiss
      ? { ...style, ['--kds-snackbar-duration' as string]: `${duration}ms` }
      : (style ?? {});

    return (
      <div
        ref={ref}
        role="status"
        className={clsx('snackbar', 'active', type, className)}
        data-auto-dismiss={autoDismiss ? 'true' : undefined}
        style={mergedStyle}
        {...props}
      >
        {resolvedIcon && <i className="material-symbols-outlined">{resolvedIcon}</i>}
        <span className="max">{message}</span>
        {onClose && (
          <button
            type="button"
            className="kds-snackbar-close"
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
KdsSnackbar.displayName = 'KdsSnackbar';
