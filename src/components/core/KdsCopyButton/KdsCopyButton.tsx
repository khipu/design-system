/**
 * Khipu Design System - CopyButton Component
 *
 * Botón-chip compacto que muestra un valor y lo copia al portapapeles al click.
 * Acción de copia inline (distinto de KdsCopyRow, que es una fila label+valor para
 * mostrar datos del destinatario/recap). Porta el look del copy button de khenshin:
 * fondo info suave, texto info-dark, icono copy info-main, esquinas redondeadas.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';

export interface KdsCopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value' | 'children' | 'onClick'> {
  /** Valor mostrado y copiado al portapapeles. */
  value: string;
  /** Texto que reemplaza brevemente al valor cuando se copia. Default "Copiado". */
  copiedText?: string;
}

export const KdsCopyButton = forwardRef<HTMLButtonElement, KdsCopyButtonProps>(
  ({ value, copiedText = 'Copiado', className, ...props }, ref) => {
    const { copied, copy } = useCopyToClipboard();
    return (
      <button
        ref={ref}
        type="button"
        className={clsx('kds-copy-button', copied && 'copied', className)}
        onClick={() => copy(value)}
        aria-label={`Copiar: ${value}`}
        {...props}
      >
        <span className="kds-copy-button-value">{copied ? copiedText : value}</span>
        <i className="material-symbols-outlined" aria-hidden="true">
          {copied ? 'check' : 'content_copy'}
        </i>
      </button>
    );
  },
);
KdsCopyButton.displayName = 'KdsCopyButton';
