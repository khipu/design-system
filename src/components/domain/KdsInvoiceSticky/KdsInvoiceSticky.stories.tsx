import type { Meta, StoryObj } from '@storybook/react';
import { KdsInvoiceSticky } from './KdsInvoiceSticky';

const meta: Meta<typeof KdsInvoiceSticky> = {
  title: 'Domain/KdsInvoiceSticky',
  component: KdsInvoiceSticky,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KdsInvoiceSticky>;

export const Default: Story = {
  render: () => (
    <KdsInvoiceSticky>
      <header className="kds-invoice-header">
        <div>
          <p className="kds-invoice-amount">$3.300</p>
          <p className="kds-invoice-code">Código fdap-sr2x-q3pf</p>
        </div>
        <div className="kds-invoice-merchant" aria-hidden="true">
          <i className="material-symbols-outlined">storefront</i>
        </div>
      </header>
      <div className="kds-invoice-collapsible">
        <div className="kds-invoice-summary">
          <dl className="kds-kv">
            <dt>Pago a</dt>
            <dd>Belén Fuentes Mejías</dd>
            <dt>Asunto</dt>
            <dd>Cuenta Enero 2026</dd>
          </dl>
        </div>
      </div>
    </KdsInvoiceSticky>
  ),
};

export const WithDetails: Story = {
  render: () => (
    <KdsInvoiceSticky>
      <header className="kds-invoice-header">
        <div>
          <p className="kds-invoice-amount">$45.990</p>
          <p className="kds-invoice-code">Código hjk2-mn4p-8rqt</p>
        </div>
        <div className="kds-invoice-merchant" aria-hidden="true">
          <i className="material-symbols-outlined">storefront</i>
        </div>
      </header>
      <div className="kds-invoice-collapsible">
        <div className="kds-invoice-summary">
          <dl className="kds-kv">
            <dt>Pago a</dt>
            <dd>Comercial Santiago SpA</dd>
            <dt>Asunto</dt>
            <dd>Orden #20260512-001</dd>
            <dt>Vencimiento</dt>
            <dd>15 de mayo de 2026</dd>
            <dt>Notificar a</dt>
            <dd>pagos@comercialsantiago.cl</dd>
          </dl>
        </div>
      </div>
    </KdsInvoiceSticky>
  ),
};
