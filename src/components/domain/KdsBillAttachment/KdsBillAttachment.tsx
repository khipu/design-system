import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';

export interface KdsBillAttachmentProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'children'> {
  /** Nombre del archivo a descargar. */
  filename: string;
  /** URL absoluta o relativa del archivo. */
  href: string;
  /** Icon Material Symbols. Default: `attach_file`. */
  icon?: string;
}

/**
 * KdsBillAttachment — link de descarga para adjuntos de la factura/bill.
 *
 * Layout (spec):
 * - `display: inline-flex; align-items: center; justify-content: flex-start`
 * - `width: fit-content`
 * - `color: var(--kds-color-info-main)`, `font-size: sm` (14px), `font-weight: 500`
 * - `text-decoration: none` → hover `underline` solo en el span
 * - Icon: `font-size: lg` (16px)
 *
 * @gsp `mat:billAttachments` taglib (introducida en commit 1a8e228c9)
 * @css .kds-bill-attachment, .kds-bill-attachments
 */
export const KdsBillAttachment = forwardRef<HTMLAnchorElement, KdsBillAttachmentProps>(
  ({ filename, href, icon = 'attach_file', className, ...props }, ref) => (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={clsx('kds-bill-attachment', className)}
      {...props}
    >
      <i className="material-symbols-outlined">{icon}</i>
      <span>{filename}</span>
    </a>
  ),
);
KdsBillAttachment.displayName = 'KdsBillAttachment';

export interface KdsBillAttachmentsProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * KdsBillAttachments — contenedor vertical de varios `KdsBillAttachment`.
 *
 * Layout (spec):
 * - `display: flex; flex-direction: column`
 * - `gap: var(--kds-spacing-0-75)` (6px)
 */
export const KdsBillAttachments = forwardRef<HTMLDivElement, KdsBillAttachmentsProps>(
  ({ children, className, ...props }, ref) => (
    <div ref={ref} className={clsx('kds-bill-attachments', className)} {...props}>
      {children}
    </div>
  ),
);
KdsBillAttachments.displayName = 'KdsBillAttachments';
