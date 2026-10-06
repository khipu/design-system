/**
 * Khipu Design System - InvoiceHeaderSkeleton Component
 *
 * Placeholder del header de la factura (KdsInvoiceSticky) mientras sus datos no llegan:
 * monto, código, tile del comercio y el resumen "pago a / asunto". Replica el markup del
 * header real con bloques `.kds-skeleton` dentro de los mismos elementos, así cada caja
 * mide lo mismo y el reemplazo por el header real no desplaza el layout.
 *
 * Va dentro de `.kds-invoice-sticky-wrap`, igual que el header real. Es decorativo
 * (`aria-hidden`): el estado de carga lo anuncia el loader del body card.
 */

import React, { forwardRef } from 'react';
import { clsx } from '../../core/utils';
import { KdsInvoiceSticky } from '../KdsInvoiceSticky';

export interface KdsInvoiceHeaderSkeletonProps extends React.HTMLAttributes<HTMLElement> {}

const Line = () => <span className="kds-skeleton kds-skeleton--text" />;

export const KdsInvoiceHeaderSkeleton = forwardRef<HTMLElement, KdsInvoiceHeaderSkeletonProps>(
  ({ className, ...props }, ref) => (
    <KdsInvoiceSticky ref={ref} className={clsx('kds-invoice-skeleton', className)} aria-hidden="true" {...props}>
      <header className="kds-invoice-header">
        <div>
          <p className="kds-invoice-amount">
            <Line />
          </p>
          <p className="kds-invoice-code">
            <Line />
          </p>
        </div>
        <div className="kds-invoice-merchant kds-skeleton" />
      </header>
      <div className="kds-invoice-collapsible">
        <div className="kds-invoice-summary">
          <dl className="kds-kv">
            <dt>
              <Line />
            </dt>
            <dd>
              <Line />
            </dd>
            <dt>
              <Line />
            </dt>
            <dd>
              <Line />
            </dd>
          </dl>
        </div>
      </div>
    </KdsInvoiceSticky>
  ),
);
KdsInvoiceHeaderSkeleton.displayName = 'KdsInvoiceHeaderSkeleton';
