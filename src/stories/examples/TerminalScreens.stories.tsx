import type { Meta, StoryObj } from '@storybook/react';
import {
  KdsCard,
  KdsButton,
  KdsAlert,
  KdsStatusBlock,
  KdsTextField,
} from '../../components/core';
import { KdsSecureFooter, KdsInvoiceSticky } from '../../components/domain';
import khipuLogo from '../../assets/images/khipu-logo.svg';

/**
 * Terminal screens — pantallas no-happy-path del payment flow Khipu.
 *
 * Estas stories mapean 1-a-1 a GSPs reales del proyecto `payment` (Grails) que
 * antes no tenían equivalente React/Storybook. Cada story documenta su `@gsp`
 * origen para que el MCP pueda reproducir el markup exacto.
 *
 * Estructura común:
 * - `.kds-payment-stage > .kds-payment-flow > .kds-screen.active`
 * - `.kds-brand-row` (logo Khipu, oculto en mobile)
 * - Invoice sticky (placeholder en estas stories)
 * - `KdsCard` con el contenido específico
 * - `KdsSecureFooter` interno + externo
 */
const meta: Meta = {
  title: 'Examples/Terminal Screens',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Pantallas terminales del payment flow no cubiertas en `PaymentFlowReact`: Cancel, End (completed/pending), NotPaying, ReportPaid, Info (8 variantes según status), ReportAbuse. Cada story mapea a un GSP real vía `@gsp`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// SHARED HELPERS
// =============================================================================

const KhipuBrand = () => (
  <div className="kds-brand-row">
    <img src={khipuLogo} alt="khipu" />
  </div>
);

const SimpleInvoice = () => (
  <div className="kds-invoice-sticky-wrap">
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
  </div>
);

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="kds-payment-stage">
    <div className="kds-payment-flow">
      <section className="kds-screen active">
        <KhipuBrand />
        <SimpleInvoice />
        {children}
        <KdsSecureFooter>Pago seguro procesado por Khipu</KdsSecureFooter>
      </section>
    </div>
  </div>
);

// =============================================================================
// CANCEL (cancelMaterial.gsp)
// =============================================================================

/**
 * Pago cancelado por el usuario.
 *
 * @gsp cancelMaterial.gsp
 * @components KdsStatusBlock status="error" icon="close" (no-inline), KdsButton primary + outlined dentro de `kds-btn-stack`
 * @spec status-block padding 16px, icon 24px en círculo error-light. CTA primary "Reintentar pago", outlined "Volver a Khipu".
 */
export const Cancel: Story = {
  name: 'Cancel — pago cancelado',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="error"
          icon="close"
          title="Tu pago fue cancelado"
          description="El pago de $3.300 a Belén Fuentes Mejías no se realizó."
        />
        <div className="kds-btn-stack">
          <KdsButton fullWidth>Reintentar con transferencia</KdsButton>
          <KdsButton variant="outlined" fullWidth>Volver a Khipu</KdsButton>
        </div>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

// =============================================================================
// END — COMPLETED (endMaterial.gsp completed branch)
// =============================================================================

/**
 * Pago finalizado (conciliado).
 *
 * @gsp endMaterial.gsp (isCompleted branch)
 * @components KdsStatusBlock status="success" inline + KdsAlert severity="success" inline + CTA primary
 * @spec status-block inline: icon a la izq con bg success-light, title sm/600 inline. Alert inline padding reducido.
 */
export const EndCompleted: Story = {
  name: 'End — pago verificado',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="success"
          icon="check"
          title="Pago verificado"
          inline
        />
        <KdsAlert severity="success" inline icon={false}>
          Recibirás un comprobante de pago en tu email.
        </KdsAlert>
        <div className="kds-btn-stack">
          <KdsButton fullWidth>Volver al dashboard</KdsButton>
        </div>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

/**
 * Pago en verificación (estado intermedio del flow terminal).
 *
 * @gsp endMaterial.gsp (isCompleted=false branch)
 * @components KdsStatusBlock status="pending" inline (sin icon — círculo pulsante via CSS) + KdsAlert severity="info" inline
 * @spec pending muestra `.kds-status-block-icon` vacío con animación de pulso CSS-driven.
 */
export const EndPending: Story = {
  name: 'End — verificación pendiente',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="pending"
          title="Verificando tu pago"
          inline
        />
        <KdsAlert severity="info" inline icon={false}>
          Estamos confirmando la recepción de tu transferencia. Esto puede demorar
          algunos segundos.
        </KdsAlert>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

// =============================================================================
// NOT PAYING (notPayingMaterial.gsp)
// =============================================================================

/**
 * Usuario indica que no va a pagar — formulario para registrar motivo.
 *
 * @gsp notPayingMaterial.gsp
 * @components KdsStatusBlock status="info" inline (info_i icon (sin círculo)) + KdsAlert info inline + form email + textarea
 * @spec form: 2 fields con `kds-field-group` (margin-top 14px). Textarea con clase `field label border textarea`.
 *       Botón primary fullWidth dentro de `kds-btn-stack`.
 */
export const NotPaying: Story = {
  name: 'NotPaying — no voy a pagar',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="info"
          icon="info_i"
          title="¿No vas a pagar?"
          inline
        />
        <KdsAlert severity="info" inline icon={false}>
          Cuéntanos por qué no realizarás este pago. Tu respuesta nos ayuda a mejorar.
        </KdsAlert>
        <form onSubmit={(e) => e.preventDefault()}>
          <KdsTextField label="Tu email" type="email" required />
          <div className="field label border textarea kds-field-group">
            <textarea id="not-paying-text" required placeholder=" " rows={4} defaultValue="" />
            <label htmlFor="not-paying-text">Motivo</label>
          </div>
          <div className="kds-btn-stack">
            <KdsButton fullWidth type="submit">Enviar</KdsButton>
          </div>
        </form>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

// =============================================================================
// REPORT PAID (reportPaidMaterial.gsp)
// =============================================================================

/**
 * Usuario reporta que ya pagó — formulario para registrar la situación.
 *
 * @gsp reportPaidMaterial.gsp
 * @components Estructura idéntica a NotPaying: status-block info + alert + form email + textarea
 * @spec Mismo layout que NotPaying — solo cambian título y i18n del alert.
 */
export const ReportPaid: Story = {
  name: 'ReportPaid — ya pagué',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="info"
          icon="info_i"
          title="¿Ya realizaste el pago?"
          inline
        />
        <KdsAlert severity="info" inline icon={false}>
          Si ya transferiste pero el pago no se ha verificado, cuéntanos para
          investigar lo ocurrido.
        </KdsAlert>
        <form onSubmit={(e) => e.preventDefault()}>
          <KdsTextField label="Tu email" type="email" required />
          <div className="field label border textarea kds-field-group">
            <textarea id="report-paid-text" required placeholder=" " rows={4} defaultValue="" />
            <label htmlFor="report-paid-text">Cuéntanos qué pasó</label>
          </div>
          <div className="kds-btn-stack">
            <KdsButton fullWidth type="submit">Enviar</KdsButton>
          </div>
        </form>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

// =============================================================================
// REPORT ABUSE (reportAbuseMaterial.gsp)
// =============================================================================

/**
 * Usuario reporta abuso/fraude sobre la solicitud de pago.
 *
 * @gsp reportAbuseMaterial.gsp
 * @components Estructura idéntica a NotPaying/ReportPaid — status info + alert + form
 * @spec Solo cambian título, i18n del alert y label del textarea.
 */
export const ReportAbuse: Story = {
  name: 'ReportAbuse — reportar abuso',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="info"
          icon="info_i"
          title="Reportar abuso"
          inline
        />
        <KdsAlert severity="info" inline icon={false}>
          Si crees que esta solicitud de pago es fraudulenta o un intento de abuso,
          repórtalo aquí.
        </KdsAlert>
        <form onSubmit={(e) => e.preventDefault()}>
          <KdsTextField label="Tu email" type="email" required />
          <div className="field label border textarea kds-field-group">
            <textarea id="report-abuse-text" required placeholder=" " rows={4} defaultValue="" />
            <label htmlFor="report-abuse-text">Describe el motivo del reporte</label>
          </div>
          <div className="kds-btn-stack">
            <KdsButton fullWidth type="submit">Enviar reporte</KdsButton>
          </div>
        </form>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

// =============================================================================
// INFO — multiple variants per payment status (infoMaterial.gsp)
// =============================================================================

/**
 * Estado: Pago verificado normal (CONCILIATED + NORMAL).
 *
 * @gsp infoMaterial.gsp — branch `PaymentStatus.CONCILIATED && NORMAL`
 * @components status="success" inline + descripción/alert + CTA download + back
 */
export const InfoVerified: Story = {
  name: 'Info — pago verificado (NORMAL)',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="success"
          icon="check"
          title="Pago verificado"
          inline
        />
        <p className="kds-status-block-description kds-mb-2">
          Tu comprobante está disponible para descargar.
        </p>
        <div className="kds-btn-stack">
          <KdsButton variant="outlined" startIcon="download" fullWidth>
            Descargar comprobante
          </KdsButton>
          <KdsButton fullWidth>Volver al dashboard</KdsButton>
        </div>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

/**
 * Estado: Pago reversado instantáneamente (CONCILIATED + REVERSED_INSTANT).
 *
 * @gsp infoMaterial.gsp — branch `REVERSED_INSTANT`
 * @components status="warn" icon="priority_high" + alert warning
 */
export const InfoReversed: Story = {
  name: 'Info — pago reversado',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="warn"
          icon="priority_high"
          title="Pago reversado"
          inline
        />
        <KdsAlert severity="warning" inline icon={false}>
          Este pago fue reversado por el banco emisor. Si necesitas más información,
          contacta a tu banco.
        </KdsAlert>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

/**
 * Estado: Pago en verificación (CONCILIATING / PRE_AUTHORIZATION).
 *
 * @gsp infoMaterial.gsp — branch `CONCILIATING/PRE_AUTHORIZATION`
 * @components status="pending" + alert info — sin CTA porque WebSocket recarga al conciliar
 */
export const InfoVerifying: Story = {
  name: 'Info — verificando',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="pending"
          title="Verificando tu pago"
          inline
        />
        <KdsAlert severity="info" inline icon={false}>
          Estamos confirmando la recepción de tu pago. La página se actualizará
          automáticamente cuando esté verificado.
        </KdsAlert>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

/**
 * Estado: Pago eliminado (DELETED).
 *
 * @gsp infoMaterial.gsp — branch `DELETED`
 * @components status="warn" + alert warning + CTA back
 */
export const InfoDeleted: Story = {
  name: 'Info — pago eliminado',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="warn"
          icon="priority_high"
          title="Pago eliminado"
          inline
        />
        <KdsAlert severity="warning" inline icon={false}>
          Esta solicitud de pago fue eliminada por el comercio.
        </KdsAlert>
        <div className="kds-btn-stack">
          <KdsButton variant="outlined" fullWidth>Volver a Khipu</KdsButton>
        </div>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

/**
 * Estado: Pago rechazado por el cliente (REJECTED_BY_CUSTOMER).
 *
 * @gsp infoMaterial.gsp — branch `REJECTED_BY_CUSTOMER`
 */
export const InfoRejected: Story = {
  name: 'Info — pago rechazado',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="warn"
          icon="priority_high"
          title="Pago rechazado"
          inline
        />
        <KdsAlert severity="warning" inline icon={false}>
          Tu banco rechazó la transferencia. Revisa los datos e inténtalo nuevamente,
          o usa otro método de pago.
        </KdsAlert>
        <div className="kds-btn-stack">
          <KdsButton fullWidth>Reintentar pago</KdsButton>
          <KdsButton variant="outlined" fullWidth>Volver a Khipu</KdsButton>
        </div>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

/**
 * Estado: Pago marcado como abuso (MARKED_AS_ABUSE).
 *
 * @gsp infoMaterial.gsp — branch `MARKED_AS_ABUSE`
 */
export const InfoMarkedAbuse: Story = {
  name: 'Info — marcado como abuso',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="warn"
          icon="priority_high"
          title="Solicitud marcada como abuso"
          inline
        />
        <KdsAlert severity="warning" inline icon={false}>
          Esta solicitud fue reportada como abuso y está bajo revisión.
        </KdsAlert>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

/**
 * Estado: Pago marcado como pagado por el merchant (MARKED_PAID_BY_MERCHANT).
 *
 * @gsp infoMaterial.gsp — branch `MARKED_PAID_BY_MERCHANT`
 */
export const InfoMarkedPaidByMerchant: Story = {
  name: 'Info — marcado pagado por merchant',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="success"
          icon="check"
          title="Pago confirmado por el comercio"
          inline
        />
        <KdsAlert severity="success" inline icon={false}>
          El comercio confirmó la recepción del pago manualmente.
        </KdsAlert>
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};

/**
 * Estado: Pago deshabilitado (else branch).
 *
 * @gsp infoMaterial.gsp — branch `g:else` (estado terminal genérico)
 * @components status="warn" icon="block" — sin alert, solo título
 */
export const InfoDisabled: Story = {
  name: 'Info — pago deshabilitado',
  render: () => (
    <Shell>
      <KdsCard>
        <KdsStatusBlock
          status="warn"
          icon="block"
          title="Solicitud no disponible"
          inline
        />
        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};
