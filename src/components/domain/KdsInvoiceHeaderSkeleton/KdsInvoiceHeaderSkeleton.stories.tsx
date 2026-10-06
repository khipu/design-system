import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsInvoiceHeaderSkeleton } from './KdsInvoiceHeaderSkeleton';
import { KdsInvoiceSticky } from '../KdsInvoiceSticky';
import { KdsSecureLoader } from '../../core/KdsSecureLoader';

/**
 * KdsInvoiceHeaderSkeleton — placeholder del header de la factura mientras carga (KTUF-388).
 *
 * Mismo markup que `KdsInvoiceSticky` con bloques `.kds-skeleton` dentro de los elementos
 * reales, así mide igual que el header y el reemplazo no desplaza el body card.
 *
 * ```html
 * <div class="kds-invoice-sticky-wrap">
 *   <article class="kds-card-elevated kds-invoice-sticky kds-invoice-skeleton" aria-hidden="true">
 *     <header class="kds-invoice-header">
 *       <div>
 *         <p class="kds-invoice-amount"><span class="kds-skeleton kds-skeleton--text"></span></p>
 *         <p class="kds-invoice-code"><span class="kds-skeleton kds-skeleton--text"></span></p>
 *       </div>
 *       <div class="kds-invoice-merchant kds-skeleton"></div>
 *     </header>
 *     ...
 *   </article>
 * </div>
 * ```
 */
const meta: Meta<typeof KdsInvoiceHeaderSkeleton> = {
  title: 'Domain/Payment Identity/KdsInvoiceHeaderSkeleton',
  component: KdsInvoiceHeaderSkeleton,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof KdsInvoiceHeaderSkeleton>;

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="kds-payment-stage">
    <div className="kds-payment-flow">
      <section className="kds-screen active">{children}</section>
    </div>
  </div>
);

const RealHeader = () => (
  <KdsInvoiceSticky>
    <header className="kds-invoice-header">
      <div>
        <p className="kds-invoice-amount">$3.300</p>
        <p className="kds-invoice-code">
          Código <span className="kds-invoice-code-value kds-invoice-code-value--lowercase">fdap-sr2x-q3pf</span>
        </p>
      </div>
      <div className="kds-invoice-merchant">
        <i className="material-symbols-outlined">storefront</i>
      </div>
    </header>
    <div className="kds-invoice-collapsible">
      <div className="kds-invoice-summary">
        <dl className="kds-kv">
          <dt>Pago a</dt>
          <dd>Comercio de prueba SpA</dd>
          <dt>Asunto</dt>
          <dd>Orden #20260512-001</dd>
        </dl>
      </div>
    </div>
  </KdsInvoiceSticky>
);

/** Carga inicial del flujo: skeleton del header + loader en el body card. */
export const Loading: Story = {
  render: () => (
    <Shell>
      <div className="kds-invoice-sticky-wrap">
        <KdsInvoiceHeaderSkeleton />
      </div>
      <article className="kds-card-elevated kds-justify-center kds-items-center">
        <KdsSecureLoader />
      </article>
    </Shell>
  ),
};

/** Skeleton y header real uno junto al otro: deben medir lo mismo. */
export const ComparedWithHeader: Story = {
  render: () => (
    <div className="kds-payment-stage" style={{ gap: 24 }}>
      <div className="kds-payment-flow">
        <section className="kds-screen active">
          <div className="kds-invoice-sticky-wrap">
            <KdsInvoiceHeaderSkeleton data-testid="skeleton-header" />
          </div>
        </section>
      </div>
      <div className="kds-payment-flow">
        <section className="kds-screen active">
          <div className="kds-invoice-sticky-wrap">
            <RealHeader />
          </div>
        </section>
      </div>
    </div>
  ),
};

/** Body card con acción (`.kds-card-elevated--action`): alto mínimo y submit anclado al fondo. */
export const WithActionCard: Story = {
  render: () => (
    <Shell>
      <div className="kds-invoice-sticky-wrap">
        <RealHeader />
      </div>
      <article className="kds-card-elevated kds-card-elevated--action">
        <form className="kds-flex kds-flex-col kds-gap-2">
          <h1 className="kds-card-title">Ingresa tu RUT</h1>
          <div className="kds-flex kds-flex-col kds-items-center kds-mt-auto">
            <button type="button" className="kds-btn kds-btn-primary kds-btn-block">
              Continuar
            </button>
          </div>
        </form>
      </article>
    </Shell>
  ),
};
