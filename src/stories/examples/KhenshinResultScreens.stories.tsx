import type { Meta, StoryObj } from '@storybook/react';
import {
  KdsAlert,
  KdsButton,
  KdsCopyButton,
  KdsStatusBlock,
  KdsTypography,
} from '../../components/core';
import { KdsInvoiceMerchant, KdsInvoiceSticky, KdsSecureFooter } from '../../components/domain';

/**
 * Khenshin result screens — end-of-flow screens of khenshin-web, composed exactly as the app
 * renders them (KTUF-380/381): invoice card on top, body card, version label and secure footer.
 *
 * The body follows payment's result views (`_paymentStatusDisplay.gsp`, `end.gsp`) and the
 * `Examples/Terminal Screens` stories: inline status block, description paragraph, compact
 * alert and the `kds-btn-stack`. Amount, merchant and code are never repeated in the body:
 * the invoice card already shows them.
 *
 * Spacing rules worth knowing when composing these screens:
 * - The status block must be the card's first child; any wrapper keeps its top padding.
 * - The DS zeroes the description's margins, so an alert that follows a description carries
 *   `kds-mt-2` (16px).
 */
const meta: Meta = {
  title: 'Examples/Khenshin Result Screens',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Pantallas de resultado de khenshin-web, idénticas a la app: éxito, cobro ya pagado, verificación, firmantes pendientes, fallas, timeout, banco sin automatización, error de geolocalización y falla sin datos del cobro.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// SHARED HELPERS — same structure as khenshin-web's WindowDecorations + Header
// =============================================================================

const MERCHANT_LOGO =
  'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/shopping_cart.png';

const InvoiceCard = ({ payTo = 'Khipu' }: { payTo?: string }) => (
  <div className="kds-invoice-sticky-wrap">
    <KdsInvoiceSticky>
      <header className="kds-invoice-header">
        <div>
          <p className="kds-invoice-amount">$1.000</p>
          <p className="kds-invoice-code">
            Código <span className="kds-invoice-code-value kds-invoice-code-value--lowercase">aaaa-bbbb-cccc</span>
          </p>
        </div>
        <KdsInvoiceMerchant logoUrl={MERCHANT_LOGO} />
      </header>
      <div className="kds-invoice-collapsible">
        <div className="kds-invoice-summary">
          <dl className="kds-kv">
            <dt>Pago a</dt>
            <dd>{payTo}</dd>
            <dt>Asunto</dt>
            <dd>Story</dd>
          </dl>
        </div>
      </div>
    </KdsInvoiceSticky>
  </div>
);

/** Payment flow shell: invoice card (optional), body card with version + inner footer, outer footer. */
const ResultShell = ({
  children,
  withInvoice = true,
  payTo,
}: {
  children: React.ReactNode;
  withInvoice?: boolean;
  payTo?: string;
}) => (
  <div className="kds-payment-stage">
    <div className="kds-payment-flow">
      <section className="kds-screen active">
        {withInvoice && <InvoiceCard payTo={payTo} />}
        <article className={`kds-card-elevated${withInvoice ? '' : ' kds-card-elevated--flush-top'}`}>
          {children}
          <div className="kds-card-version">
            <KdsTypography variant="caption">V1.0.0</KdsTypography>
          </div>
          <KdsSecureFooter variant="inside" />
        </article>
        <KdsSecureFooter />
      </section>
    </div>
  </div>
);

/** Status row + optional description as its own paragraph (khenshin's TransactionResultHead). */
const ResultHead = ({
  status,
  icon,
  title,
  description,
}: {
  status: 'success' | 'pending' | 'warn' | 'error' | 'info';
  icon?: string;
  title: string;
  description?: string;
}) => (
  <>
    <KdsStatusBlock status={status} icon={icon} title={title} inline />
    {description && <p className="kds-status-block-description">{description}</p>}
  </>
);

// =============================================================================
// SUCCESS
// =============================================================================

/**
 * Pago realizado (OperationSuccess).
 *
 * @component khenshin-web `SuccessMessage`
 * @spec success/check inline + description + info alert with the redirect countdown (payment's
 *       end.gsp redirect notice) + primary CTA.
 */
export const Success: Story = {
  name: 'Éxito — transferencia realizada',
  render: () => (
    <ResultShell payTo="Comercio">
      <ResultHead
        status="success"
        icon="check"
        title="¡Listo, transferiste!"
        description="Tu pago ya está en proceso. Al confirmarse, enviaremos el comprobante a tu email"
      />
      <KdsAlert severity="info" inline className="kds-mt-2">
        Te redireccionaremos en 25 segundos
      </KdsAlert>
      <div className="kds-btn-stack">
        <KdsButton fullWidth>Volver al sitio de origen</KdsButton>
      </div>
    </ResultShell>
  ),
};

/**
 * Cobro ya pagado: browser2app resolves title/body to `page.operationComplete.already.*`.
 *
 * @component khenshin-web `SuccessMessage`
 */
export const SuccessAlreadyPaid: Story = {
  name: 'Éxito — cobro ya pagado',
  render: () => (
    <ResultShell payTo="Comercio">
      <ResultHead
        status="success"
        icon="check"
        title="Este cobro ya fue pagado"
        description="Tu pago ya está en proceso. Revisa tu email, ya deberías tener un comprobante de pago asociado"
      />
      <KdsAlert severity="info" inline className="kds-mt-2">
        Te redireccionaremos en 25 segundos
      </KdsAlert>
      <div className="kds-btn-stack">
        <KdsButton fullWidth>Volver al sitio de origen</KdsButton>
      </div>
    </ResultShell>
  ),
};

// =============================================================================
// WARNING / VERIFYING
// =============================================================================

/**
 * Pago en verificación (OperationWarning, or a failure while pre-authorized).
 *
 * @component khenshin-web `WarningMessage`
 * @spec pending inline (spinner, no icon) + compact info alert + primary CTA, like payment's
 *       CONCILIATING/PRE_AUTHORIZATION branch.
 */
export const Verifying: Story = {
  name: 'Pago en verificación',
  render: () => (
    <ResultShell>
      <ResultHead status="pending" title="Pago en verificación" />
      <KdsAlert severity="info" inline icon={false}>
        Información adicional
      </KdsAlert>
      <div className="kds-btn-stack">
        <KdsButton fullWidth>Volver al comercio</KdsButton>
      </div>
    </ResultShell>
  ),
};

// =============================================================================
// MUST CONTINUE (pending signers)
// =============================================================================

/**
 * Firmantes pendientes (OperationMustContinue).
 *
 * @component khenshin-web `MustContinueMessage`
 * @spec warn/priority_high inline + `kds-share-card` with the link to share + primary CTA.
 *       In the app the three round buttons are react-share's WhatsApp/Email/Telegram icons;
 *       here they are drawn with the same size and brand colors.
 */
export const MustContinue: Story = {
  name: 'Firmantes pendientes',
  render: () => (
    <ResultShell>
      <ResultHead status="warn" icon="priority_high" title="El pago debe continuar" />
      <section className="kds-share-card">
        <p className="kds-share-copy">Compartir el enlace para continuar</p>
        <KdsCopyButton value="https://khipu.com/info/aaaabbbbcccc" />
        <div className="kds-flex kds-gap-1 kds-mt-2">
          {[
            { label: 'WhatsApp', color: '#25D366', icon: 'chat' },
            { label: 'Email', color: '#7F7F7F', icon: 'mail' },
            { label: 'Telegram', color: '#37AEE2', icon: 'send' },
          ].map((share) => (
            <span
              key={share.label}
              aria-label={share.label}
              className="kds-flex kds-items-center kds-justify-center"
              style={{ width: 32, height: 32, borderRadius: '50%', background: share.color, color: '#fff' }}
            >
              <i className="material-symbols-outlined" style={{ fontSize: 18 }}>
                {share.icon}
              </i>
            </span>
          ))}
        </div>
      </section>
      <div className="kds-btn-stack">
        <KdsButton fullWidth>Volver al comercio</KdsButton>
      </div>
    </ResultShell>
  ),
};

// =============================================================================
// FAILURES
// =============================================================================

/**
 * Pago no realizado (OperationFailure, reason TaskFinished): retry + other bank.
 *
 * @component khenshin-web `FailureMessage` → `TransactionResult`
 */
export const FailureRetry: Story = {
  name: 'Falla — pago no realizado',
  render: () => (
    <ResultShell>
      <ResultHead
        status="warn"
        icon="priority_high"
        title="Pago no realizado"
        description="No se pudo completar la transferencia"
      />
      <div className="kds-btn-stack">
        <KdsButton fullWidth>Reintentar pago</KdsButton>
        <KdsButton variant="outlined" fullWidth>
          Pagar con otro banco
        </KdsButton>
      </div>
    </ResultShell>
  ),
};

/**
 * Falla con transferencia manual disponible (e.g. TaskExecutionError + acceptManualTransfer).
 *
 * @component khenshin-web `FailureMessage` → `TransactionResult`
 */
export const FailureManualTransfer: Story = {
  name: 'Falla — con transferencia manual',
  render: () => (
    <ResultShell>
      <ResultHead
        status="warn"
        icon="priority_high"
        title="Servicio no disponible"
        description="No se pudo completar la transferencia"
      />
      <div className="kds-btn-stack">
        <KdsButton fullWidth startIcon="content_copy">
          Pagar con transferencia manual
        </KdsButton>
        <KdsButton variant="outlined" fullWidth>
          Pagar con otro banco
        </KdsButton>
      </div>
    </ResultShell>
  ),
};

/**
 * Falla del servicio (e.g. AcquirePageError, TaskDumped, NoBackendAvailable): exit + other bank.
 * Any other reason without a specific action keeps only the exit button.
 *
 * @component khenshin-web `FailureMessage` → `TransactionResult`
 */
export const FailureGeneric: Story = {
  name: 'Falla — servicio no disponible',
  render: () => (
    <ResultShell>
      <ResultHead status="warn" icon="priority_high" title="Servicio no disponible" />
      <div className="kds-btn-stack">
        <KdsButton fullWidth>Volver al comercio</KdsButton>
        <KdsButton variant="outlined" fullWidth>
          Pagar con otro banco
        </KdsButton>
      </div>
    </ResultShell>
  ),
};

/**
 * Falla antes de recibir los datos del cobro (e.g. InvalidOperationID): no invoice card, so the
 * body card goes alone with a flat top (`kds-card-elevated--flush-top`).
 *
 * @component khenshin-web `FailureMessage` without billInfo
 */
export const FailureWithoutInvoice: Story = {
  name: 'Falla — sin datos del cobro',
  render: () => (
    <ResultShell withInvoice={false}>
      <ResultHead status="warn" icon="priority_high" title="Servicio no disponible" />
      <div className="kds-btn-stack">
        <KdsButton fullWidth>Volver al comercio</KdsButton>
      </div>
    </ResultShell>
  ),
};

/**
 * Sesión cerrada por tiempo (OperationFailure, reason FormTimeout).
 *
 * @component khenshin-web `TimeoutResult`
 */
export const Timeout: Story = {
  name: 'Timeout — sesión cerrada',
  render: () => (
    <ResultShell>
      <ResultHead status="warn" icon="hourglass_top" title="Cerramos tu sesión" />
      <KdsAlert severity="warning" inline icon={false}>
        El tiempo para completar la operación se acabó
      </KdsAlert>
      <div className="kds-btn-stack">
        <KdsButton fullWidth>Reintentar pago</KdsButton>
      </div>
    </ResultShell>
  ),
};

/**
 * Banco sin automatización (OperationFailure, reason BankWithoutAutomaton).
 *
 * @component khenshin-web `RedirectToManual`
 */
export const RedirectToManual: Story = {
  name: 'Banco sin automatización',
  render: () => (
    <ResultShell>
      <ResultHead
        status="info"
        icon="info_i"
        title="Redireccionando pago"
        description="El banco seleccionado sólo acepta pagos con transferencia manual"
      />
      <KdsAlert severity="warning" inline icon={false} className="kds-mt-2">
        <strong>Pagar con transferencia manual,</strong>&nbsp;o intenta pagar con otro banco
      </KdsAlert>
      <div className="kds-btn-stack">
        <KdsButton fullWidth>Pagar con transferencia manual</KdsButton>
        <KdsButton variant="outlined" fullWidth>
          Pagar con otro banco
        </KdsButton>
      </div>
    </ResultShell>
  ),
};

/**
 * Ubicación obligatoria denegada.
 *
 * @component khenshin-web `GeolocationConsentError`
 */
export const GeolocationError: Story = {
  name: 'Error de geolocalización',
  render: () => (
    <ResultShell>
      <ResultHead
        status="warn"
        icon="location_off"
        title="No pudimos obtener tu ubicación"
        description="Cómo activar la ubicación"
      />
      <img
        className="kds-self-center"
        src="https://khenshin-web.s3.us-east-1.amazonaws.com/img/acceptGeolocation.png"
        alt=""
        width={185}
        height={185}
      />
      <KdsTypography variant="link" className="kds-text-center kds-mt-2">
        Activa la ubicación en tu navegador
      </KdsTypography>
      <div className="kds-btn-stack">
        <KdsButton fullWidth>Reiniciar pago</KdsButton>
      </div>
    </ResultShell>
  ),
};
