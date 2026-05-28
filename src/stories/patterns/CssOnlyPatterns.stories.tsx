import type { Meta, StoryObj } from '@storybook/react';

/**
 * CSS-only patterns — clases del Design System Khipu (BeerCSS) que se usan
 * directamente sin wrapper React.
 *
 * Estas stories existen para que el Storybook MCP pueda generar UIs precisas
 * que usen estas clases. Cada story documenta el contrato HTML + specs
 * cuantitativos (padding, gap, font, color) en su JSDoc.
 *
 * Fuente única de verdad: `src/beercss/customizations/khipu-components.css`.
 */
const meta: Meta = {
  title: 'Patterns/CSS-only',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Clases CSS-only del DS (BeerCSS) usadas en producción payment. Cada story trae el CONTRATO HTML + specs cuantitativos. Sirven para DOS targets: (1) markup HTML plano directo en GSP/Grails/legacy, y (2) la base CSS que envuelven los wrappers React `Kds*`. Para generar una pantalla de pago en HTML plano, componer estos contratos (ej. MerchantHeader + KeyValue + MontoRow + ButtonStack + SecureFooter dentro del shell PaymentStage).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// KEY-VALUE (.kds-kv)
// =============================================================================

/**
 * `.kds-kv` — grid auto/1fr para pares dt/dd ("Pago a / Belén Fuentes").
 *
 * Layout (spec):
 * - `display: grid; grid-template-columns: auto 1fr`
 * - `column-gap: var(--kds-spacing-1)` (8px)
 * - `align-items: baseline`
 *
 * Tipografía:
 * - `dt`: `font-size: xs` (12px), `line-height: relaxed`, `color: text-secondary`, `text-transform: uppercase`, `letter-spacing: normal`
 * - `dd`: `font-size: sm` (14px), `font-weight: semibold` (600), `color: gray-800`, `line-height: relaxed`, `ellipsis` por overflow
 *
 * Uso típico:
 * - Datos del invoice dentro de `KdsInvoiceSticky` (Pago a / Asunto / Vencimiento / Notificar a)
 *
 * Contrato HTML:
 * ```html
 * <dl class="kds-kv">
 *   <dt>Pago a</dt>
 *   <dd>Belén Fuentes Mejías</dd>
 *   <dt>Asunto</dt>
 *   <dd>Cuenta Enero 2026</dd>
 * </dl>
 * ```
 *
 * @gsp Usado en `_payInvoiceCard.gsp` y todas las pantallas con invoice sticky
 * @css .kds-kv, .kds-kv dt, .kds-kv dd
 */
export const KeyValue: Story = {
  name: 'KeyValue (.kds-kv)',
  render: () => (
    <dl className="kds-kv" style={{ maxWidth: 400 }}>
      <dt>Pago a</dt>
      <dd>Belén Fuentes Mejías</dd>
      <dt>Asunto</dt>
      <dd>Cuenta Enero 2026</dd>
      <dt>Vencimiento</dt>
      <dd>15 de mayo de 2026</dd>
    </dl>
  ),
};

/**
 * Con valores muy largos — verifica el `ellipsis` automático del `dd`.
 *
 * @spec `dd { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis }`
 */
export const KeyValueLongValues: Story = {
  name: 'KeyValue — valores largos (ellipsis)',
  render: () => (
    <dl className="kds-kv" style={{ maxWidth: 280 }}>
      <dt>Pago a</dt>
      <dd>María Catalina Antonieta Rojas Soto-Aguirre</dd>
      <dt>Notificar a</dt>
      <dd>maria.catalina.antonieta@empresacomercial-larguisimo-nombre.cl</dd>
    </dl>
  ),
};

// =============================================================================
// DETAIL GROUP (.kds-detail-group)
// =============================================================================

/**
 * `.kds-detail-group` — grupo dt/dd para detalles expandidos del invoice.
 *
 * Layout (spec):
 * - `margin-bottom: 12px` (12px entre grupos)
 * - `:last-child { margin-bottom: 0 }`
 *
 * Tipografía:
 * - `dt`: `font-size: xs`, `text-transform: uppercase`, `color: text-hint`
 * - `dd`: `font-size: sm`, `color: text-primary`
 *
 * Diferencia con `.kds-kv`: este es vertical (label arriba, value abajo) y permite text wrap.
 * `.kds-kv` es grid horizontal con ellipsis.
 *
 * Contrato HTML:
 * ```html
 * <dl class="kds-detail-list">
 *   <div class="kds-detail-group">
 *     <dt>Vencimiento</dt>
 *     <dd>15 de mayo de 2026</dd>
 *   </div>
 *   <div class="kds-detail-group">
 *     <dt>Notificar a</dt>
 *     <dd>pagos@comercialsantiago.cl</dd>
 *   </div>
 * </dl>
 * ```
 *
 * @gsp Usado en `_payInvoiceCard.gsp` dentro de `.kds-expand-panel`, también en bill-attachments
 * @css .kds-detail-group, .kds-detail-group dt, .kds-detail-group dd
 */
export const DetailGroup: Story = {
  name: 'DetailGroup (.kds-detail-group)',
  render: () => (
    <dl className="kds-detail-list" style={{ maxWidth: 400 }}>
      <div className="kds-detail-group">
        <dt>Vencimiento</dt>
        <dd>15 de mayo de 2026</dd>
      </div>
      <div className="kds-detail-group">
        <dt>Notificar a</dt>
        <dd>pagos@comercialsantiago.cl</dd>
      </div>
      <div className="kds-detail-group">
        <dt>Orden de compra</dt>
        <dd>OC-20260512-001</dd>
      </div>
    </dl>
  ),
};

// =============================================================================
// PAYMENT STAGE + SCREEN (.kds-payment-stage / .kds-screen)
// =============================================================================

/**
 * `.kds-payment-stage` + `.kds-screen` — wrappers fundacionales del flow payment.
 *
 * `.kds-payment-stage`:
 * - `min-height: 100vh`
 * - `display: flex; justify-content: center`
 * - `padding: 20px 16px 64px` desktop
 * - Mobile: `padding: 16px 12px 80px` (≤ 768px)
 *
 * `.kds-payment-flow`:
 * - Hijo directo del stage. `max-width: 440px; width: 100%`
 * - `display: flex; flex-direction: column; gap: 16px`
 *
 * `.kds-screen`:
 * - `display: none` por default
 * - `.kds-screen.active`: `display: flex; flex-direction: column; gap: 24px`
 * - Anim: `kds-fadein 0.22s ease-out`
 *
 * Jerarquía canónica:
 * ```html
 * <div class="kds-payment-stage">
 *   <div class="kds-payment-flow">
 *     <section class="kds-screen active">
 *       <div class="kds-brand-row">...</div>          <!-- logo Khipu -->
 *       <div class="kds-invoice-sticky-wrap">...</div>
 *       <article class="kds-card-elevated">...</article>
 *     </section>
 *   </div>
 * </div>
 * ```
 *
 * @gsp `paymentMaterial.gsp` layout principal
 * @css .kds-payment-stage, .kds-payment-flow, .kds-screen, .kds-screen.active
 */
export const PaymentStage: Story = {
  name: 'PaymentStage (.kds-payment-stage + .kds-screen)',
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="kds-payment-stage" style={{ background: '#f5f5f5' }}>
      <div className="kds-payment-flow">
        <section className="kds-screen active">
          <div style={{ padding: 16, background: 'white', borderRadius: 8, border: '1px dashed #aaa' }}>
            <strong>kds-brand-row</strong>
            <p style={{ margin: 0, fontSize: 12, color: '#666' }}>logo Khipu (visible solo en desktop)</p>
          </div>
          <div style={{ padding: 16, background: 'white', borderRadius: 8, border: '1px dashed #aaa' }}>
            <strong>kds-invoice-sticky-wrap</strong>
            <p style={{ margin: 0, fontSize: 12, color: '#666' }}>position: sticky; top: 0</p>
          </div>
          <div style={{ padding: 16, background: 'white', borderRadius: 8, border: '1px dashed #aaa' }}>
            <strong>kds-card-elevated</strong>
            <p style={{ margin: 0, fontSize: 12, color: '#666' }}>contenido principal de la pantalla</p>
          </div>
        </section>
      </div>
    </div>
  ),
};

// =============================================================================
// FIELD GROUP (.kds-field-group)
// =============================================================================

/**
 * `.kds-field-group` — clase de spacing entre fields de formulario.
 *
 * Layout (spec):
 * - `margin-top: 14px` (`var(--kds-spacing-1-75)`)
 *
 * Uso: aplicada en cada `.field.label.border` (excepto el primero) para separar
 * uniformemente. Equivalente a `gap: 14px` pero sin necesidad de wrapper flex.
 *
 * Contrato HTML (producción Grails — manualForm):
 * ```html
 * <div class="field label border kds-field-group">
 *   <input type="email" id="email" name="email" placeholder=" "/>
 *   <label for="email">Email</label>
 * </div>
 *
 * <div class="field label border textarea kds-field-group">
 *   <textarea id="comment" name="comment" placeholder=" ">...</textarea>
 *   <label for="comment">Comentario</label>
 * </div>
 * ```
 *
 * Variante `textarea`: agregar clase `textarea` al wrapper para el padding-block adicional del textarea.
 *
 * @gsp `_manualFormChileMaterial.gsp`, `_manualVerifyChileMaterial.gsp`, `reportPaidMaterial.gsp`
 * @css .kds-field-group, .field.label.border, .field > textarea, .field.label > textarea
 */
export const FieldGroup: Story = {
  name: 'FieldGroup (.kds-field-group)',
  render: () => (
    <form style={{ maxWidth: 400 }} onSubmit={(e) => e.preventDefault()}>
      <div className="field label border">
        <input type="text" id="rut" placeholder=" " defaultValue="" />
        <label htmlFor="rut">RUT del titular</label>
      </div>
      <div className="field label border kds-field-group">
        <input type="email" id="email" placeholder=" " defaultValue="" />
        <label htmlFor="email">Email</label>
      </div>
      <div className="field label border textarea kds-field-group">
        <textarea id="comment" placeholder=" " rows={3} defaultValue=""></textarea>
        <label htmlFor="comment">Comentario</label>
      </div>
    </form>
  ),
};

// =============================================================================
// DIVIDER TEXT (.kds-divider-text)
// =============================================================================

/**
 * `.kds-divider-text` — divider con texto centrado (e.g. "o continúa con").
 *
 * Layout (spec):
 * - `text-align: center`
 * - `position: relative` con `::before` pseudo-element línea horizontal
 * - El `<span>` interno tiene `background: paper` para "cortar" la línea
 *
 * Tipografía:
 * - `font-size: sm`, `color: text-secondary`
 *
 * Variantes según contexto:
 * - Dentro de `.kds-card-elevated`: span tiene `background: paper` (white)
 * - Fuera de card: span tiene `background: default` (page bg)
 *
 * @css .kds-divider-text, .kds-divider-text span, .kds-divider-text::before
 */
export const DividerText: Story = {
  name: 'DividerText (.kds-divider-text)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 24, background: 'white', borderRadius: 8 }}>
      <p>Inicia sesión con tu cuenta</p>
      <div className="kds-divider-text">
        <span>o continúa con</span>
      </div>
      <p>Otras opciones de login</p>
    </div>
  ),
};

// =============================================================================
// MONTO ROW (.kds-monto-row)
// =============================================================================

/**
 * `.kds-monto-row` — bloque destacado de "Monto a transferir" con título + deadline + valor.
 *
 * **Pre-componente**: actualmente CSS-only, F5 del epic KTUF-87 propone un componente
 * `KdsMontoRow` que reemplace este markup ad-hoc.
 *
 * Layout (spec):
 * - `display: flex; justify-content: space-between`
 * - `padding: 14px 0 8px`
 * - `border-top: 1px dashed var(--kds-border-medium)`
 *
 * Tipografía:
 * - `.kds-monto-row-title`: `font-size: sm`, `font-weight: 500`, `color: text-primary`
 * - `.kds-monto-row-deadline`: `font-size: xs`, `color: text-secondary`, `line-height: relaxed`
 * - `.kds-monto-row-value`: `font-size: 24px`, `font-weight: 700`, `color: text-primary`, `letter-spacing: tight`
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-monto-row">
 *   <div>
 *     <div class="kds-monto-row-title">Monto a transferir</div>
 *     <div class="kds-monto-row-deadline">
 *       Fecha límite para transferencia<br>
 *       01-04-2026 a las 16:33
 *     </div>
 *   </div>
 *   <div class="kds-monto-row-value">$3.300</div>
 * </div>
 * ```
 *
 * Variante sin deadline: omitir el `.kds-monto-row-deadline`.
 *
 * @gsp `_manualVerifyChileMaterial.gsp` y demás manualVerify (Screen 4 del flow)
 * @css .kds-monto-row, .kds-monto-row-title, .kds-monto-row-deadline, .kds-monto-row-value
 */
export const MontoRow: Story = {
  name: 'MontoRow (.kds-monto-row)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-monto-row">
        <div>
          <div className="kds-monto-row-title">Monto a transferir</div>
          <div className="kds-monto-row-deadline">
            Fecha límite para transferencia
            <br />
            01-04-2026 a las 16:33
          </div>
        </div>
        <div className="kds-monto-row-value">$3.300</div>
      </div>
    </div>
  ),
};

/** Variante sin deadline (más simple). */
export const MontoRowSimple: Story = {
  name: 'MontoRow — sin deadline',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-monto-row">
        <div>
          <div className="kds-monto-row-title">Monto a transferir</div>
        </div>
        <div className="kds-monto-row-value">$3.300</div>
      </div>
    </div>
  ),
};

// =============================================================================
// MERCHANT HEADER (.kds-merchant)
// =============================================================================

/**
 * `.kds-merchant` — header de comercio en confirmación de pago: tile + "estás
 * pagando a" + nombre. Patrón de COMPOSICIÓN (envuelve `KdsMerchantTile`).
 *
 * Layout (spec):
 * - `.kds-merchant`: `display: flex; align-items: center; gap: var(--kds-spacing-1-75)` (14px)
 * - `.kds-merchant-tile`: 56×56, `border-radius: var(--kds-radius-card)`, `background: var(--kds-color-primary-deep)`
 * - `.kds-merchant-meta`: `display: flex; flex-direction: column` (SIN gap; el espaciado va por margin del label)
 * - `.kds-merchant-label`: `font-size: xs`, `text-transform: uppercase`, `letter-spacing: 0.04em`, `color: text-secondary`, `margin-bottom: var(--kds-spacing-0-25)` (2px)
 * - `.kds-merchant-meta strong`: `font-size: 15px; font-weight: 600; color: text-primary`
 * - Variante `.kds-merchant.compact`: tile 40×40, label oculto
 *
 * Contrato HTML (usar tal cual en GSP/BeerCSS):
 * ```html
 * <div class="kds-merchant">
 *   <div class="kds-merchant-tile">CS</div>
 *   <div class="kds-merchant-meta">
 *     <span class="kds-merchant-label">Estás pagando a</span>
 *     <strong>Comercial Santiago SpA</strong>
 *   </div>
 * </div>
 * ```
 *
 * En React: `<KdsMerchantTile name="…" />` SOLO renderiza `.kds-merchant-tile`;
 * el header completo se compone con este markup alrededor.
 *
 * @gsp `_payInvoiceCard.gsp` y pantallas de confirmación
 * @css .kds-merchant, .kds-merchant-tile, .kds-merchant-meta, .kds-merchant-label
 */
export const MerchantHeader: Story = {
  name: 'MerchantHeader (.kds-merchant)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-merchant">
        <div className="kds-merchant-tile">CS</div>
        <div className="kds-merchant-meta">
          <span className="kds-merchant-label">Estás pagando a</span>
          <strong>Comercial Santiago SpA</strong>
        </div>
      </div>
    </div>
  ),
};

// =============================================================================
// BUTTON STACK (.kds-btn-stack)
// =============================================================================

/**
 * `.kds-btn-stack` — apilado vertical canónico de CTAs al pie de una card.
 *
 * Layout (spec):
 * - `display: flex; flex-direction: column`
 * - `gap: var(--kds-spacing-1-25)` (10px) entre botones
 * - `margin-top: var(--kds-spacing-2)` (16px) — separa del contenido anterior
 *
 * Regla: el espaciado de los CTAs viene de esta clase, NO de estilos inline
 * en los botones. Primario arriba, secundario/outlined debajo.
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-btn-stack">
 *   <button class="kds-btn kds-btn-primary kds-btn-block">Pagar $3.300</button>
 *   <button class="kds-btn kds-btn-outlined kds-btn-block">Cancelar</button>
 * </div>
 * ```
 * (`kds-btn-block` = full width, equivalente a `fullWidth` en React.)
 *
 * En React: `<div className="kds-btn-stack"><KdsButton fullWidth/>…</div>`.
 *
 * @css .kds-btn-stack, .kds-btn, .kds-btn-block
 */
export const ButtonStack: Story = {
  name: 'ButtonStack (.kds-btn-stack)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-btn-stack">
        <button className="kds-btn kds-btn-primary kds-btn-block">
          Pagar $3.300
        </button>
        <button className="kds-btn kds-btn-outlined kds-btn-block">
          Cancelar
        </button>
      </div>
    </div>
  ),
};

// =============================================================================
// SECURE FOOTER (.kds-secure-footer — par responsive)
// =============================================================================

/**
 * `.kds-secure-footer` — "Pago seguro procesado por Khipu" con icon lock.
 *
 * Layout (spec):
 * - `display: flex; align-items: center; justify-content: center`
 * - `gap: var(--kds-spacing-0-5)`, `padding: var(--kds-spacing-1) 0`
 * - `font-size: xs`, `color: gray-400`, `letter-spacing: wide`
 *
 * Patrón responsive (clave): se usan DOS instancias y el CSS muestra una según viewport:
 * - **default** (fuera de la card): visible en desktop ≥768px, oculto en mobile
 * - **`.inside`** (dentro de `KdsCard`): visible en mobile <768px, oculto en desktop
 *
 * Contrato HTML:
 * ```html
 * <!-- dentro de la card (mobile) -->
 * <p class="kds-secure-footer inside"><i class="material-symbols-outlined">lock</i> Pago seguro procesado por Khipu</p>
 * <!-- fuera de la card (desktop) -->
 * <p class="kds-secure-footer"><i class="material-symbols-outlined">lock</i> Pago seguro procesado por Khipu</p>
 * ```
 *
 * En React: `<KdsSecureFooter variant="inside"/>` dentro de la card +
 * `<KdsSecureFooter/>` fuera.
 *
 * @css .kds-secure-footer, .kds-secure-footer.inside
 */
export const SecureFooterPair: Story = {
  name: 'SecureFooter (par responsive)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <p className="kds-secure-footer">
        <i className="material-symbols-outlined">lock</i> Pago seguro procesado
        por Khipu
      </p>
    </div>
  ),
};

// =============================================================================
// PAYMENT TOTAL (.kds-payment-total)
// =============================================================================

/**
 * `.kds-payment-total` — bloque "monto a pagar" para QR view y emails de cobro.
 * Portado del taglib `<kh:paymentTotal>` de paylink-ligopay
 * (`KhipuTagLib.groovy:131-177` + `materialize-config.css → .payment-total`).
 *
 * Layout (default — desktop):
 * - `text-align: left` (sin paddings; el espaciado vertical lo aporta el contenedor padre o los `margin-bottom` internos de `title`/`amount`).
 * - Mobile (≤ 1024px): `text-align: center`; `titleMobile` reemplaza `title`.
 *
 * Tipografía:
 * - `.kds-payment-total-title` / `-title-mobile`: `font-size: 2xl`, `weight: semibold`
 * - `.kds-payment-label`: `font-size: xl`, `weight: semibold`, `color: text-primary`
 * - `.kds-payment-amount`: `font-size: 3rem` (48px), `weight: medium`, `color: primary-main`
 * - `.kds-payment-total-decimal-sup`: `font-size: var(--kds-font-size-decimal-sup)` (0.5em), `weight: semibold`
 *
 * Variantes (modificadores BEM, combinables):
 * - `.kds-payment-total--email`: amount compacto (`2xl`), color texto primario, sin títulos.
 * - `.kds-payment-total--tone-info`: amount en khipu-blue (#5A5FE0) para LigoPay QR/transfer.
 * - `.kds-payment-total--centered`: remueve el `padding-left` asimétrico y centra todo el texto.
 *
 * Contrato HTML (variante default con decimal):
 * ```html
 * <div class="kds-payment-total">
 *   <h5 class="kds-payment-total-title">Escanea el QR</h5>
 *   <h5 class="kds-payment-total-title-mobile">Descarga el QR</h5>
 *   <h6 class="kds-payment-label">Monto a pagar</h6>
 *   <h5 class="kds-payment-amount">
 *     S/ 1,500<sup class="kds-payment-total-decimal-sup">50</sup>
 *   </h5>
 * </div>
 * ```
 *
 * En React: `<KdsPaymentTotal amount="1500.50" />` · props `variant`, `tone`, `centered`.
 *
 * @gsp Origen: `paylink-ligopay/.../KhipuTagLib.groovy:131-177` (`<kh:paymentTotal>`)
 * @css .kds-payment-total, .kds-payment-total--email, .kds-payment-total--tone-info, .kds-payment-total--centered, .kds-payment-total-title, .kds-payment-total-title-mobile, .kds-payment-label, .kds-payment-amount, .kds-payment-total-decimal-sup
 */
export const PaymentTotal: Story = {
  name: 'PaymentTotal (.kds-payment-total)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-payment-total">
        <h5 className="kds-payment-total-title">Escanea el QR</h5>
        <h5 className="kds-payment-total-title-mobile">Descarga el QR</h5>
        <h6 className="kds-payment-label">Monto a pagar</h6>
        <h5 className="kds-payment-amount">
          S/ 1,500
          <sup className="kds-payment-total-decimal-sup">50</sup>
        </h5>
      </div>
    </div>
  ),
};

/**
 * Variante `--centered`: sin padding-left asimétrico, texto centrado en todos los breakpoints.
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-payment-total kds-payment-total--centered">
 *   <h6 class="kds-payment-label">Monto a pagar</h6>
 *   <h5 class="kds-payment-amount">S/ 1,500<sup class="kds-payment-total-decimal-sup">50</sup></h5>
 * </div>
 * ```
 */
export const PaymentTotalCentered: Story = {
  name: 'PaymentTotal — centered (.kds-payment-total--centered)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-payment-total kds-payment-total--centered">
        <h6 className="kds-payment-label">Monto a pagar</h6>
        <h5 className="kds-payment-amount">
          S/ 1,500
          <sup className="kds-payment-total-decimal-sup">50</sup>
        </h5>
      </div>
    </div>
  ),
};
