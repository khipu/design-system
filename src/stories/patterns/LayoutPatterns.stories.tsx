import type { Meta, StoryObj } from '@storybook/react';
import { KdsCard, KdsCardBody } from '../../components/core/KdsCard';
import { KdsButton } from '../../components/core/KdsButton';
import { KdsTextField } from '../../components/core/KdsTextField';
import { KdsInvoiceSticky } from '../../components/domain/KdsInvoiceSticky';
import { KdsSecureFooter } from '../../components/domain/KdsSecureFooter';
import { KdsMontoRow } from '../../components/domain/KdsMontoRow';
import { KdsTypography } from '../../components/core/KdsTypography';
import { semanticSpacing, spacing } from '../../tokens';

const meta: Meta = {
  title: 'Patterns/Layout',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Patrones de layout reutilizables del Design System Khipu. Estos patterns muestran como componer componentes core y domain usando los tokens de spacing correctos.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Formulario vertical dentro de KdsCard — patrón de producción (`manualMaterial.gsp`).
 *
 * Spacing canónico:
 * - Cada field usa `kds-field-group` → `margin-top: var(--kds-spacing-1-75)` (14px) entre campos.
 * - El bloque de botones usa `kds-btn-stack` → `margin-top: var(--kds-spacing-2)` (16px) + gap 10px.
 *
 * NO se usa flex/gap en el `<form>`; el spacing viene de las clases de cada elemento.
 */
export const FormStack: Story = {
  render: function FormStackPattern() {
    return (
      <div style={{ maxWidth: 'var(--kds-stage-narrow-max-width, 448px)', margin: '0 auto' }}>
        <KdsCard>
          <KdsCardBody>
            <h2 className="kds-card-title">Datos para pago</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <KdsTextField label="Nombre completo" fullWidth className="kds-field-group" />
              <KdsTextField label="RUT" fullWidth className="kds-field-group" />
              <KdsTextField label="Correo electronico" type="email" fullWidth className="kds-field-group" />
              <KdsTextField label="Monto" fullWidth className="kds-field-group" />
              <div className="kds-btn-stack">
                <KdsButton variant="primary" fullWidth>
                  Confirmar pago
                </KdsButton>
              </div>
            </form>
          </KdsCardBody>
        </KdsCard>
      </div>
    );
  },
};

/**
 * Grid responsive de KdsCards.
 * Usa la clase `kds-grid-2col` de BeerCSS o un grid CSS
 * con `semanticSpacing.card.listGap` (12px) entre tarjetas.
 */
export const CardGrid: Story = {
  render: function CardGridPattern() {
    const cards = [
      { title: 'Transferencia', desc: 'Paga directamente desde tu banco' },
      { title: 'Tarjeta de credito', desc: 'Visa, Mastercard, Amex' },
      { title: 'Debito', desc: 'Pago instantaneo con tu tarjeta' },
      { title: 'Billetera digital', desc: 'MACH, Tenpo, Mercado Pago' },
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: semanticSpacing.card.listGap,
          maxWidth: '800px',
        }}
      >
        {cards.map((card) => (
          <KdsCard key={card.title} variant="outlined">
            <KdsCardBody>
              <KdsTypography variant="heading3" style={{ marginBottom: spacing[1] }}>
                {card.title}
              </KdsTypography>
              <KdsTypography variant="body" color="secondary">
                {card.desc}
              </KdsTypography>
            </KdsCardBody>
          </KdsCard>
        ))}
      </div>
    );
  },
};

/**
 * Estructura completa de una pantalla de pago Khipu:
 * brand-row > InvoiceSticky > Card con contenido > ButtonStack > SecureFooter.
 *
 * Usa utility classes del DS: `kds-flex kds-flex-col`.
 */
export const PaymentScreenLayout: Story = {
  render: function PaymentScreenLayoutPattern() {
    return (
      <div
        className="kds-flex kds-flex-col"
        style={{
          maxWidth: 'var(--kds-stage-narrow-max-width, 448px)',
          margin: '0 auto',
          minHeight: '100vh',
        }}
      >
        {/* Brand row — usa la clase CSS-only kds-brand-row del DS */}
        <div className="kds-brand-row">
          <strong style={{ color: 'var(--kds-color-primary-main)' }}>khipu</strong>
        </div>

        {/* Invoice sticky */}
        <KdsInvoiceSticky>
          <div className="kds-invoice-header">
            <p className="kds-invoice-amount">$3.300</p>
            <p className="kds-invoice-code">fdap-sr2x-q3pf</p>
          </div>
        </KdsInvoiceSticky>

        {/* Main content card */}
        <KdsCard>
          <KdsCardBody>
            <KdsTypography variant="heading3" style={{ marginBottom: spacing[2] }}>
              Datos del destinatario
            </KdsTypography>
            <div className="kds-flex kds-flex-col">
              <div className="kds-flex" style={{ justifyContent: 'space-between' }}>
                <KdsTypography variant="body" color="secondary">
                  Banco
                </KdsTypography>
                <KdsTypography variant="body">Banco Security</KdsTypography>
              </div>
              <div className="kds-flex" style={{ justifyContent: 'space-between' }}>
                <KdsTypography variant="body" color="secondary">
                  RUT
                </KdsTypography>
                <KdsTypography variant="body">76.187.287-7</KdsTypography>
              </div>
              <div className="kds-flex" style={{ justifyContent: 'space-between' }}>
                <KdsTypography variant="body" color="secondary">
                  Titular
                </KdsTypography>
                <KdsTypography variant="body">Khipu CLBS</KdsTypography>
              </div>
            </div>
          </KdsCardBody>
        </KdsCard>

        {/* Button stack */}
        <div className="kds-btn-stack">
          <KdsButton variant="primary" fullWidth>
            Ya hice la transferencia
          </KdsButton>
          <KdsButton variant="text" fullWidth>
            Cancelar pago
          </KdsButton>
        </div>

        {/* Secure footer */}
        <KdsSecureFooter />
      </div>
    );
  },
};

/**
 * Patron `kds-btn-stack`: botones apilados verticalmente a ancho completo.
 * Usado en pantallas de pago mobile donde los botones ocupan todo el ancho.
 *
 * La clase CSS `kds-btn-stack` aplica `display: flex; flex-direction: column;`
 * con gap apropiado entre botones.
 */
export const ButtonStack: Story = {
  render: function ButtonStackPattern() {
    return (
      <div style={{ maxWidth: 'var(--kds-stage-narrow-max-width, 448px)', margin: '0 auto' }}>
        <div className="kds-btn-stack">
          <KdsButton variant="primary" fullWidth>
            Confirmar transferencia
          </KdsButton>
          <KdsButton variant="outlined" fullWidth>
            Cambiar banco
          </KdsButton>
          <KdsButton variant="text" fullWidth>
            Cancelar pago
          </KdsButton>
        </div>
      </div>
    );
  },
};

/**
 * Múltiples secciones dentro de UNA sola KdsCard, separadas por `kds-hr-dashed`
 * (el divisor que usa producción dentro de cards: `margin: var(--kds-spacing-2) 0`).
 *
 * - Fields usan `kds-field-group` (margin-top 14px entre campos).
 * - 2 inputs en fila: `kds-flex kds-gap-2`.
 * - Botón final en `kds-btn-stack`.
 */
export const SectionStack: Story = {
  render: function SectionStackPattern() {
    return (
      <div style={{ maxWidth: 'var(--kds-stage-narrow-max-width, 448px)', margin: '0 auto' }}>
        <KdsCard>
          <KdsCardBody>
            {/* Sección 1 */}
            <KdsTypography variant="heading3">Datos personales</KdsTypography>
            <KdsTextField label="Nombre" fullWidth className="kds-field-group" />
            <KdsTextField label="Email" type="email" fullWidth className="kds-field-group" />

            <hr className="kds-hr-dashed" />

            {/* Sección 2 */}
            <KdsTypography variant="heading3">Datos de pago</KdsTypography>
            <KdsTextField label="Numero de tarjeta" fullWidth className="kds-field-group" />
            {/* 2 inputs en una fila: flex row con gap horizontal + kds-field-group. */}
            <div className="kds-flex kds-gap-2 kds-field-group">
              <div style={{ flex: 1, minWidth: 0 }}>
                <KdsTextField label="Vencimiento" fullWidth />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <KdsTextField label="CVV" fullWidth />
              </div>
            </div>

            {/* Sección 3 — total: usa KdsMontoRow (patrón `kds-monto-row` de producción).
                Title izquierda, value grande a la derecha, con border-top dashed propio
                (no necesita hr-dashed separado). */}
            <KdsMontoRow title="Total a pagar" value="$3.300" />
            <div className="kds-btn-stack">
              <KdsButton variant="primary" fullWidth>
                Pagar ahora
              </KdsButton>
            </div>
          </KdsCardBody>
        </KdsCard>
      </div>
    );
  },
};
