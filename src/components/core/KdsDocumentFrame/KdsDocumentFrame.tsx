/**
 * Khipu Design System - DocumentFrame Component
 *
 * Documento embebido (iframe) que llena su contenedor: pensado para el body de un
 * `KdsBottomSheet size="full"` (términos y condiciones, mandatos, documentos legales).
 *
 * `scale` achica documentos de terceros pensados para un viewport de escritorio que no se
 * pueden reestilar (cross-origin): el iframe se arma más ancho y se escala, así letra,
 * títulos y márgenes bajan juntos.
 *
 * Contrato HTML (matchea CSS `.kds-document-frame` de khipu-components.css):
 *
 *   <div class="kds-document-frame" style="--kds-document-frame-scale: 0.6">
 *     <iframe src="..." title="..."></iframe>
 *   </div>
 */

import React, { forwardRef } from 'react';
import { clsx } from '../utils';

export interface KdsDocumentFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** URL del documento. */
  src: string;
  /** Nombre accesible del iframe (lo lee el lector de pantalla). */
  title: string;
  /** Escala del documento (0–1). Default: 1. Usar < 1 para documentos de ancho escritorio. */
  scale?: number;
}

export const KdsDocumentFrame = forwardRef<HTMLDivElement, KdsDocumentFrameProps>(
  ({ src, title, scale = 1, className, style, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('kds-document-frame', className)}
      style={{ '--kds-document-frame-scale': scale, ...style } as React.CSSProperties}
      {...props}
    >
      <iframe src={src} title={title} />
    </div>
  ),
);
KdsDocumentFrame.displayName = 'KdsDocumentFrame';
