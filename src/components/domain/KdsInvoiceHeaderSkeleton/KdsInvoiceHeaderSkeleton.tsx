/**
 * Khipu Design System - InvoiceHeaderSkeleton Component
 *
 * Placeholder del header de la factura (KdsInvoiceSticky) mientras sus datos no llegan:
 * monto, código, tile del comercio, el resumen "pago a / asunto" y "Detalle del cobro".
 * Replica el markup del header real y pone en cada slot un texto de relleno transparente
 * (`.kds-skeleton--text`): toma la fuente y el alto de línea del slot, así cada bloque mide
 * como el contenido real y el reemplazo por el header no desplaza el layout.
 *
 * Va dentro de `.kds-invoice-sticky-wrap`, igual que el header real. Es decorativo
 * (`aria-hidden`): el estado de carga lo anuncia el loader del body card.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';
import { KdsInvoiceSticky } from '../KdsInvoiceSticky';

export interface KdsInvoiceHeaderSkeletonProps extends React.HTMLAttributes<HTMLElement> {}

/** Filler text: never visible, it only sizes the block like a typical value of the slot. */
const Text = ({ children }: { children: string }) => (
  <span className="kds-skeleton kds-skeleton--text">{children}</span>
);

export const KdsInvoiceHeaderSkeleton = forwardRef<HTMLElement, KdsInvoiceHeaderSkeletonProps>(
  ({ className, ...props }, ref) => (
    <KdsInvoiceSticky ref={ref} className={clsx('kds-invoice-skeleton', className)} aria-hidden="true" {...props}>
      <header className="kds-invoice-header">
        <div>
          <p className="kds-invoice-amount">
            <Text>$00.000</Text>
          </p>
          <p className="kds-invoice-code">
            {/* Wrapped so the filler stays inline (a bare flex item would be a full-height block). */}
            <span>
              <Text>Código</Text>
            </span>
            <span className="kds-invoice-code-value kds-invoice-code-value--lowercase">
              <Text>xxxx-xxxx-xxxx</Text>
            </span>
          </p>
        </div>
        <div className="kds-invoice-merchant kds-skeleton" />
      </header>
      <div className="kds-invoice-collapsible">
        <div className="kds-invoice-summary">
          <dl className="kds-kv">
            <dt>
              <Text>Pago a</Text>
            </dt>
            <dd>
              <Text>Comercio de ejemplo SpA</Text>
            </dd>
            <dt>
              <Text>Asunto</Text>
            </dt>
            <dd>
              <Text>Orden de compra</Text>
            </dd>
          </dl>
        </div>
        <div className="kds-expand-toggle">
          <span>
            <Text>Detalle del cobro</Text>
          </span>
        </div>
      </div>
    </KdsInvoiceSticky>
  ),
);
KdsInvoiceHeaderSkeleton.displayName = 'KdsInvoiceHeaderSkeleton';
