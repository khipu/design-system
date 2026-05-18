import type { Meta, StoryObj } from '@storybook/react';
import { KdsCard, KdsCardBody } from '../../components/core/KdsCard';
import { KdsButton } from '../../components/core/KdsButton';
import { KdsTextField } from '../../components/core/KdsTextField';
import { KdsLogoHeader, KdsLogoHeaderLogo, KdsLogoHeaderSeparator, KdsLogoHeaderCode } from '../../components/core/KdsLogoHeader';
import { KdsInvoiceSticky } from '../../components/domain/KdsInvoiceSticky';
import { KdsSecureFooter } from '../../components/domain/KdsSecureFooter';
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
 * Formulario vertical dentro de KdsCard.
 * Usa `semanticSpacing.formGap` (20px) entre campos y boton de accion al final.
 */
export const FormStack: Story = {
  render: function FormStackPattern() {
    return (
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
        <KdsCard>
          <KdsCardBody>
            <form
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: semanticSpacing.formGap,
              }}
              onSubmit={(e) => e.preventDefault()}
            >
              <KdsTextField label="Nombre completo" fullWidth />
              <KdsTextField label="RUT" placeholder="12.345.678-9" fullWidth />
              <KdsTextField label="Correo electronico" type="email" fullWidth />
              <KdsTextField label="Monto" placeholder="$0" fullWidth />
              <KdsButton variant="primary" fullWidth>
                Confirmar pago
              </KdsButton>
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
              <KdsTypography variant="body" style={{ color: 'var(--kds-text-secondary)' }}>
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
 * LogoHeader (brand-row) > InvoiceSticky > Card con contenido > ButtonStack > SecureFooter.
 *
 * Usa `semanticSpacing.sectionGap` (32px) entre secciones principales
 * y `semanticSpacing.stackGap` (16px) entre elementos internos.
 */
export const PaymentScreenLayout: Story = {
  render: function PaymentScreenLayoutPattern() {
    return (
      <div
        style={{
          maxWidth: '440px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: semanticSpacing.stackGap,
          minHeight: '100vh',
        }}
      >
        {/* Brand row */}
        <KdsLogoHeader>
          <KdsLogoHeaderLogo />
          <KdsLogoHeaderSeparator />
          <KdsLogoHeaderCode>fdap-sr2x-q3pf</KdsLogoHeaderCode>
        </KdsLogoHeader>

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
            <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <KdsTypography variant="body" style={{ color: 'var(--kds-text-secondary)' }}>
                  Banco
                </KdsTypography>
                <KdsTypography variant="body">Banco Security</KdsTypography>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <KdsTypography variant="body" style={{ color: 'var(--kds-text-secondary)' }}>
                  RUT
                </KdsTypography>
                <KdsTypography variant="body">76.187.287-7</KdsTypography>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <KdsTypography variant="body" style={{ color: 'var(--kds-text-secondary)' }}>
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
      <div style={{ maxWidth: '440px', margin: '0 auto' }}>
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
 * Secciones verticales separadas por `semanticSpacing.sectionGap` (32px).
 * Cada seccion es una KdsCard independiente. Util para formularios largos
 * o pantallas con multiples bloques de contenido.
 */
export const SectionStack: Story = {
  render: function SectionStackPattern() {
    return (
      <div
        style={{
          maxWidth: '440px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: semanticSpacing.sectionGap,
        }}
      >
        <KdsCard>
          <KdsCardBody>
            <KdsTypography variant="heading3" style={{ marginBottom: spacing[1.5] }}>
              Seccion 1: Datos personales
            </KdsTypography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: semanticSpacing.formGap }}>
              <KdsTextField label="Nombre" fullWidth />
              <KdsTextField label="Email" type="email" fullWidth />
            </div>
          </KdsCardBody>
        </KdsCard>

        <KdsCard>
          <KdsCardBody>
            <KdsTypography variant="heading3" style={{ marginBottom: spacing[1.5] }}>
              Seccion 2: Datos de pago
            </KdsTypography>
            <div style={{ display: 'flex', flexDirection: 'column', gap: semanticSpacing.formGap }}>
              <KdsTextField label="Numero de tarjeta" fullWidth />
              <div style={{ display: 'flex', gap: spacing[2] }}>
                <KdsTextField label="Vencimiento" placeholder="MM/AA" fullWidth />
                <KdsTextField label="CVV" fullWidth />
              </div>
            </div>
          </KdsCardBody>
        </KdsCard>

        <KdsCard>
          <KdsCardBody>
            <KdsTypography variant="heading3" style={{ marginBottom: spacing[1.5] }}>
              Seccion 3: Resumen
            </KdsTypography>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[2] }}>
              <KdsTypography variant="body-large">Total</KdsTypography>
              <KdsTypography variant="heading2">$3.300</KdsTypography>
            </div>
            <KdsButton variant="primary" fullWidth>
              Pagar ahora
            </KdsButton>
          </KdsCardBody>
        </KdsCard>
      </div>
    );
  },
};
