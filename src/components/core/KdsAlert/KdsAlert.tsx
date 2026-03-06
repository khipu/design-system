/**
 * Khipu Design System - Alert Component
 *
 * An alert component built on MUI Alert with Khipu design system styling.
 * Matches the Figma design: Pagos Automáticos - MUI v610
 */

import React from 'react';
import MuiAlert, { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// =============================================================================
// TYPES
// =============================================================================

export type KdsAlertSeverity = 'success' | 'info' | 'warning' | 'error';
export type KdsAlertVariant = 'standard' | 'filled' | 'outlined';

export interface KdsAlertProps extends Omit<MuiAlertProps, 'severity' | 'variant' | 'title'> {
  /** Alert severity/type */
  severity?: KdsAlertSeverity;
  /** Visual variant */
  variant?: KdsAlertVariant;
  /** Alert title */
  title?: React.ReactNode;
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
 * Built on MUI Alert with Khipu design system styling.
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
export const KdsAlert: React.FC<KdsAlertProps> = ({
  severity = 'info',
  variant = 'standard',
  title,
  children,
  onClose,
  sx,
  ...props
}) => {
  return (
    <MuiAlert
      severity={severity}
      variant={variant}
      onClose={onClose}
      sx={{
        borderRadius: '4px',
        fontFamily: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        fontFeatureSettings: "'liga' off, 'clig' off",
        fontSize: '0.875rem',
        lineHeight: 1.43,
        letterSpacing: '0.17px',
        ...sx,
      }}
      {...props}
    >
      {title && <AlertTitle>{title}</AlertTitle>}
      {children}
    </MuiAlert>
  );
};

KdsAlert.displayName = 'KdsAlert';

export default KdsAlert;
