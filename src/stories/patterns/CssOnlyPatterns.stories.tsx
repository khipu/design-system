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

// =============================================================================
// ALERT (.kds-alert)
// =============================================================================

/**
 * `.kds-alert` — banner inline con icon + título + descripción + close opcional.
 *
 * Layout (spec):
 * - `display: flex; align-items: center`
 * - `gap: var(--kds-spacing-1)` (8px)
 * - `padding: var(--kds-spacing-2)` (16px)
 * - `border-radius: var(--kds-radius-md)`, `border: 1px solid`
 *
 * Tipografía:
 * - `.kds-alert-title`: `font-size: var(--kds-font-size-sm)`, `font-weight: var(--kds-font-weight-semibold)`, `line-height: var(--kds-line-height-normal)`, `margin-bottom: var(--kds-spacing-0-5)`
 * - `.kds-alert-description`: `font-size: var(--kds-font-size-sm)`, `font-weight: var(--kds-font-weight-regular)`, `line-height: var(--kds-line-height-relaxed)`
 *
 * Variantes (severities — combinables con `.kds-alert`):
 * - `.kds-info`: bg `--kds-alert-info-bg`, border `--kds-color-info-main`, color `--kds-color-info-dark`
 * - `.kds-success`: bg `--kds-alert-success-bg`, border/color success tokens
 * - `.kds-warning`: bg/border/color warning tokens
 * - `.kds-error`: bg/border/color error tokens
 *
 * Variante de tamaño:
 * - `.kds-alert-inline`: sin border, padding `var(--kds-spacing-1) var(--kds-spacing-1-5)`, `margin-bottom: var(--kds-spacing-1-5)`
 *
 * Icon: `.kds-alert-icon` envuelve un `<i class="material-symbols-outlined">` (24px).
 * Close: `.kds-alert-close` icon-button discreto 28×28 (NO usa `.kds-btn`).
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-alert kds-info" role="alert">
 *   <div class="kds-alert-icon">
 *     <i class="material-symbols-outlined">info</i>
 *   </div>
 *   <div class="kds-alert-content">
 *     <p class="kds-alert-title">Verifica el monto antes de pagar</p>
 *     <p class="kds-alert-description">Una vez confirmado, no podrás revertir la transferencia.</p>
 *   </div>
 *   <button type="button" class="kds-alert-close" aria-label="Cerrar">
 *     <i class="material-symbols-outlined">close</i>
 *   </button>
 * </div>
 * ```
 *
 * En React: `<KdsAlert severity="info" title="…" onClose={…}>…</KdsAlert>`.
 *
 * @css .kds-alert, .kds-alert-icon, .kds-alert-content, .kds-alert-title, .kds-alert-description, .kds-alert-close, .kds-alert-inline, .kds-info, .kds-success, .kds-warning, .kds-error
 */
export const Alert: Story = {
  name: 'Alert (.kds-alert)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-alert kds-info" role="alert">
        <div className="kds-alert-icon">
          <i className="material-symbols-outlined">info</i>
        </div>
        <div className="kds-alert-content">
          <p className="kds-alert-title">Verifica el monto antes de pagar</p>
          <p className="kds-alert-description">
            Una vez confirmado, no podrás revertir la transferencia.
          </p>
        </div>
        <button type="button" className="kds-alert-close" aria-label="Cerrar">
          <i className="material-symbols-outlined">close</i>
        </button>
      </div>
    </div>
  ),
};

// =============================================================================
// CARD ELEVATED (.kds-card-elevated + .kds-card-title)
// =============================================================================

/**
 * `.kds-card-elevated` — contenedor principal con sombra para agrupar contenido.
 *
 * Layout (spec):
 * - `background: var(--kds-color-background-paper)`
 * - `border-radius: var(--kds-radius-md)`
 * - `padding: var(--kds-spacing-2)` desktop / `var(--kds-spacing-3)` (mobile ≤768px) / `var(--kds-spacing-2)` (≤480px)
 * - `box-shadow: var(--kds-shadow-card)` (hover → `var(--kds-shadow-6)`)
 *
 * Tipografía (`.kds-card-title`):
 * - `font-size: var(--kds-font-size-base)`, `font-weight: var(--kds-font-weight-semibold)`
 * - `line-height: 1.5`, `letter-spacing: -0.31px`
 * - `margin-bottom: var(--kds-spacing-2)`
 *
 * Variantes de tamaño del título (opt-in, additive):
 * - `.kds-card-title--lg`: `font-size: var(--kds-font-size-xl)` (20px), weight 700
 * - `.kds-card-title--xl`: `font-size: var(--kds-font-size-2xl)` (24px), weight 700
 *
 * Otras clases relacionadas:
 * - `.kds-card-outlined`: variante con border en vez de shadow
 * - `.kds-card-dimmed`: `opacity: 0.45; pointer-events: none` (para overlays)
 *
 * Contrato HTML:
 * ```html
 * <article class="kds-card-elevated">
 *   <h3 class="kds-card-title">Datos del pago</h3>
 *   <p>Contenido de la card.</p>
 * </article>
 * ```
 *
 * En React: `<KdsCard variant="elevated">…</KdsCard>` y `<KdsCardHeader>` / `<KdsCardBody>` / `<KdsCardFooter>`.
 *
 * @css .kds-card-elevated, .kds-card-outlined, .kds-card-dimmed, .kds-card-title, .kds-card-title--lg, .kds-card-title--xl
 */
export const CardElevated: Story = {
  name: 'CardElevated (.kds-card-elevated)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <article className="kds-card-elevated">
        <h3 className="kds-card-title">Datos del pago</h3>
        <p>Contenido de la card con texto descriptivo.</p>
      </article>
    </div>
  ),
};

// =============================================================================
// TEXT FIELD (.field.label.border)
// =============================================================================

/**
 * `.field.label.border` — text field con label flotante (mat:textField). Clases de BeerCSS
 * extendidas con tokens Khipu. El truco floating-label depende de `placeholder=" "` (un espacio).
 *
 * Reglas críticas:
 * - `placeholder=" "` (un espacio) es OBLIGATORIO — BeerCSS lo usa con `:placeholder-shown ~ label`.
 *   Un placeholder real haría que la label se quede arriba siempre, superpuesta al input.
 * - `.prefix` en el wrapper cuando hay `<i>` antes del `<input>` (alinea el label al icon).
 * - `.suffix` en el wrapper cuando hay `<i>` después del `<input>`.
 *
 * Modificadores de estado (uno solo a la vez, combinados con `.field.label.border`):
 * - `.invalid`: border + label en `--kds-color-error-main`
 * - `.valid`, `.info`, `.warning`: análogo para los otros tokens semánticos
 * - `.locked`: input readonly + lock icon como suffix
 *
 * Helper text: `<span class="helper">…</span>` debajo del input (color/tamaño tokens).
 *
 * Contrato HTML (caso simple):
 * ```html
 * <div class="field label border">
 *   <input type="email" id="email" name="email" placeholder=" "/>
 *   <label for="email">Email</label>
 *   <span class="helper">Te enviaremos la confirmación aquí</span>
 * </div>
 * ```
 *
 * Variante con prefix + invalid:
 * ```html
 * <div class="field label border prefix invalid">
 *   <i class="material-symbols-outlined">badge</i>
 *   <input type="text" id="rut" placeholder=" "/>
 *   <label for="rut">RUT del titular</label>
 *   <span class="helper">RUT inválido</span>
 * </div>
 * ```
 *
 * En React: `<KdsTextField label="…" startIcon="…" error helperText="…" />`.
 *
 * @gsp `mat:textField`, `mat:emailField`, `mat:passwordField`, `mat:numberField` (taglib `matFieldImpl`)
 * @css .field, .field.label, .field.label.border, .field.prefix, .field.suffix, .field.invalid, .field.locked, .field .helper
 */
export const TextField: Story = {
  name: 'TextField (.field.label.border)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="field label border">
        <input type="email" id="email-css-only" name="email" placeholder=" " />
        <label htmlFor="email-css-only">Email</label>
        <span className="helper">Te enviaremos la confirmación aquí</span>
      </div>
    </div>
  ),
};

// =============================================================================
// CHECKBOX (.checkbox)
// =============================================================================

/**
 * `.checkbox` — checkbox nativo de BeerCSS con sprite Material Symbols.
 *
 * Layout (BeerCSS):
 * - `<label class="checkbox">` envuelve `<input type="checkbox">` + `<span>` con el texto.
 * - El `<input>` se oculta vía `opacity: 0` y se renderiza un sprite vía `::before`
 *   con `content: "check_box_outline_blank"` (Material Symbols Outlined).
 * - Al estar `:checked`, el sprite cambia a `content: "check_box"` en color primary.
 *
 * Detalle de implementación:
 * - NO usar `htmlFor` en el label — el `<input>` está anidado, la asociación es implícita
 *   y `for` puede causar doble-click event.
 *
 * Contrato HTML:
 * ```html
 * <label class="checkbox">
 *   <input type="checkbox" id="acepto" name="acepto" value="1" />
 *   <span>Acepto los términos y condiciones</span>
 * </label>
 * ```
 *
 * En React: `<KdsCheckbox label="…" />`.
 *
 * @gsp `mat:checkBox` taglib
 * @css .checkbox, .checkbox > input, .checkbox > span
 */
export const Checkbox: Story = {
  name: 'Checkbox (.checkbox)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <label className="checkbox">
        <input type="checkbox" name="acepto" value="1" defaultChecked />
        <span>Acepto los términos y condiciones</span>
      </label>
    </div>
  ),
};

// =============================================================================
// RADIO GROUP (.kds-radio-group + .radio)
// =============================================================================

/**
 * `.radio` — radio nativo de BeerCSS, agrupados dentro de `<fieldset class="kds-radio-group">`.
 *
 * Layout (BeerCSS):
 * - `<label class="radio">` envuelve `<input type="radio">` + `<span>`.
 * - Input oculto (`opacity: 0`); sprite circular generado por `:is(.checkbox, .radio) > span::before`.
 * - Tamaño default 18×18. Modificadores: `.small` (14px), `.large` (22px).
 *
 * Wrapper opcional `.kds-radio-group`: `<fieldset>` con `<legend>` para el label del grupo.
 *
 * Contrato HTML:
 * ```html
 * <fieldset class="kds-radio-group">
 *   <legend>Elige tu banco</legend>
 *   <label class="radio">
 *     <input type="radio" name="banco" value="security" checked />
 *     <span>Banco Security</span>
 *   </label>
 *   <label class="radio">
 *     <input type="radio" name="banco" value="estado" />
 *     <span>BancoEstado</span>
 *   </label>
 * </fieldset>
 * ```
 *
 * Tamaño grande: agregar `large` a la `<label class="radio large">`.
 *
 * En React: `<KdsRadioGroup name="banco" options={[…]} value={…} onChange={…} size="large" />`.
 *
 * @css .kds-radio-group, .radio, .radio > input, .radio > span
 */
export const RadioGroup: Story = {
  name: 'RadioGroup (.kds-radio-group + .radio)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <fieldset className="kds-radio-group">
        <legend>Elige tu banco</legend>
        <label className="radio">
          <input type="radio" name="banco-css" value="security" defaultChecked />
          <span>Banco Security</span>
        </label>
        <label className="radio">
          <input type="radio" name="banco-css" value="estado" />
          <span>BancoEstado</span>
        </label>
        <label className="radio">
          <input type="radio" name="banco-css" value="bci" />
          <span>BCI</span>
        </label>
      </fieldset>
    </div>
  ),
};

// =============================================================================
// SECTION NOTE (.kds-section-note)
// =============================================================================

/**
 * `.kds-section-note` — nota inline contextual (más ligera que `.kds-alert`).
 *
 * Layout (spec):
 * - `display: flex; align-items: center`
 * - `font-size: var(--kds-font-size-caption)`
 * - `margin: -2px 0 var(--kds-spacing-1-5)`
 * - `letter-spacing: -0.05px`
 * - Icon (`> i`): `font-size: var(--kds-font-size-base)`, `flex: 0 0 auto`, `margin-top: 1px`
 *
 * Variantes de tono (combinables con `.kds-section-note`):
 * - Default: warning (color `--kds-color-warning-dark`)
 * - `.kds-info`: color `--kds-color-info-dark`
 * - `.kds-success`: color `--kds-color-success-dark`
 * - `.kds-error`: color `--kds-color-error-dark`
 *
 * Contrato HTML:
 * ```html
 * <p class="kds-section-note kds-info">
 *   <i class="material-symbols-outlined">info</i>
 *   <span>El pago puede tardar hasta 24 horas en verse reflejado.</span>
 * </p>
 * ```
 *
 * En React: `<KdsSectionNote icon="info">…</KdsSectionNote>` (className adicional para el tono).
 *
 * @css .kds-section-note, .kds-section-note.kds-info, .kds-section-note.kds-success, .kds-section-note.kds-error
 */
export const SectionNote: Story = {
  name: 'SectionNote (.kds-section-note)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <p className="kds-section-note kds-info">
        <i className="material-symbols-outlined">info</i>
        <span>El pago puede tardar hasta 24 horas en verse reflejado.</span>
      </p>
    </div>
  ),
};

// =============================================================================
// DIVIDER (.kds-hr / .kds-hr-dashed)
// =============================================================================

/**
 * `.kds-hr` — separador horizontal estándar. `.kds-hr-dashed` es la variante punteada.
 *
 * Layout (spec):
 * - `.kds-hr`: `height: 1px; background: var(--kds-color-divider); margin: var(--kds-spacing-2) 0; border: 0`
 * - `.kds-hr-dashed`: `height: 0; border: 0; border-top: 1px dashed var(--kds-color-divider); margin: var(--kds-spacing-2) 0`
 *
 * Contrato HTML:
 * ```html
 * <hr class="kds-hr" />
 * <hr class="kds-hr-dashed" />
 * ```
 *
 * En React: `<KdsDivider />` (sólido) · `<KdsDivider dashed />` (punteado).
 *
 * @css .kds-hr, .kds-hr-dashed
 */
export const Divider: Story = {
  name: 'Divider (.kds-hr / .kds-hr-dashed)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <p>Sección superior</p>
      <hr className="kds-hr" />
      <p>Sección con divider sólido arriba</p>
      <hr className="kds-hr-dashed" />
      <p>Sección con divider punteado arriba</p>
    </div>
  ),
};

// =============================================================================
// LINEAR PROGRESS (.kds-progress)
// =============================================================================

/**
 * `.kds-progress` — barra de progreso lineal, usa el elemento nativo `<progress>`.
 *
 * Layout (BeerCSS + tokens):
 * - Elemento nativo `<progress value="x" max="100">` con clase `.kds-progress`.
 * - BeerCSS aplica el track + fill con tokens primary del DS.
 *
 * Contrato HTML:
 * ```html
 * <progress class="kds-progress" value="60" max="100"></progress>
 * ```
 *
 * Variante indeterminada: omitir `value` (`<progress class="kds-progress" max="100"></progress>`).
 *
 * En React: `<KdsLinearProgress value={60} />`.
 *
 * @css .kds-progress
 */
export const LinearProgress: Story = {
  name: 'LinearProgress (.kds-progress)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <progress className="kds-progress" value={60} max={100}></progress>
    </div>
  ),
};

// =============================================================================
// STATUS BLOCK (.kds-status-block)
// =============================================================================

/**
 * `.kds-status-block` — bloque de resultado (success/error/pending/warn/info) con icon
 * circular + título + descripción. Para pantallas de confirmación.
 *
 * Layout (spec):
 * - `text-align: center`, `padding: var(--kds-spacing-6) 0`
 * - `.kds-status-block-icon`: `var(--kds-status-icon-size)` cuadrado, `border-radius: var(--kds-radius-full)`,
 *   `display: grid; place-items: center`, `margin: 0 auto var(--kds-spacing-3)`
 * - `.kds-status-block-icon i`: `font-size: var(--kds-font-size-4xl)`, `font-weight: var(--kds-font-weight-bold)`
 *
 * Tipografía:
 * - `.kds-status-block-title`: `font-size: var(--kds-font-size-xl)`, `font-weight: bold`, `color: text-primary`, `margin: 0 0 var(--kds-spacing-1)`
 * - `.kds-status-block-description`: `font-size: var(--kds-font-size-sm)`, `color: text-secondary`, `margin: 0`
 *
 * Variantes vía `data-status` (controlan el color del icon circular):
 * - `data-status="success"`: bg `--kds-color-success-soft`, border + color `--kds-color-success-main`
 * - `data-status="pending"`: spinner animado (`kds-spin` 1s linear), border-top en `--kds-color-info-main`
 * - `data-status="warn"`: warning tokens
 * - `data-status="error"`: bg `--kds-color-danger-soft`, border/color error
 * - `data-status="info"`: bg `--kds-color-info-soft`, border/color info (usar SIEMPRE con icon `info_i` — el icon `info` tiene círculo built-in y causa doble círculo)
 *
 * Variante `.inline`:
 * - `display: flex; align-items: center; gap: var(--kds-spacing-2)`, `text-align: left`
 * - Icon size reducido a `var(--kds-status-icon-size-sm)`, `margin: 0`
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-status-block" data-status="success">
 *   <div class="kds-status-block-icon">
 *     <i class="material-symbols-outlined">check</i>
 *   </div>
 *   <div>
 *     <h2 class="kds-status-block-title">Pago confirmado</h2>
 *     <p class="kds-status-block-description">Recibirás el comprobante en tu correo.</p>
 *   </div>
 * </div>
 * ```
 *
 * En React: `<KdsStatusBlock status="success" icon="check" title="…" description="…" />`.
 *
 * @css .kds-status-block, .kds-status-block-icon, .kds-status-block-title, .kds-status-block-description, .kds-status-block.inline, .kds-status-block[data-status]
 */
export const StatusBlock: Story = {
  name: 'StatusBlock (.kds-status-block)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-status-block" data-status="success">
        <div className="kds-status-block-icon">
          <i className="material-symbols-outlined">check</i>
        </div>
        <div>
          <h2 className="kds-status-block-title">Pago confirmado</h2>
          <p className="kds-status-block-description">
            Recibirás el comprobante en tu correo.
          </p>
        </div>
      </div>
    </div>
  ),
};

// =============================================================================
// RECAP LIST (.kds-recap-list)
// =============================================================================

/**
 * `.kds-recap-list` — lista vertical de pares `clave / valor` para resúmenes de pago.
 *
 * Layout (spec):
 * - `<ul>` con `list-style: none`, `padding: 0`, `margin: var(--kds-spacing-1-25) 0 0`
 * - `display: flex; flex-direction: column; gap: var(--kds-spacing-0-75)` (6px)
 * - Cada `<li>`: `display: flex; justify-content: space-between; align-items: center`,
 *   `font-size: var(--kds-font-size-sm)`
 *
 * Tipografía:
 * - `.k`: `color: var(--kds-color-text-secondary)`
 * - `.v`: `color: var(--kds-color-text-primary)`, `font-weight: 500`
 * - `.v.placeholder`: `color: var(--kds-color-text-hint)` (cuando el valor no está disponible)
 *
 * Header opcional asociado: `.kds-recap-header` (no parte del componente React pero relacionado).
 *
 * Contrato HTML:
 * ```html
 * <ul class="kds-recap-list">
 *   <li>
 *     <span class="k">Monto</span>
 *     <span class="v">$3.300</span>
 *   </li>
 *   <li>
 *     <span class="k">Comisión</span>
 *     <span class="v placeholder">Sin comisión</span>
 *   </li>
 * </ul>
 * ```
 *
 * En React: `<KdsRecapList items={[{label, value, placeholder}, …]} />`.
 *
 * @css .kds-recap-list, .kds-recap-list li, .kds-recap-list .k, .kds-recap-list .v, .kds-recap-list .v.placeholder
 */
export const RecapList: Story = {
  name: 'RecapList (.kds-recap-list)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <ul className="kds-recap-list">
        <li>
          <span className="k">Monto</span>
          <span className="v">$3.300</span>
        </li>
        <li>
          <span className="k">Comisión</span>
          <span className="v placeholder">Sin comisión</span>
        </li>
        <li>
          <span className="k">Total</span>
          <span className="v">$3.300</span>
        </li>
      </ul>
    </div>
  ),
};

// =============================================================================
// QR ROW (.kds-qr-row)
// =============================================================================

/**
 * `.kds-qr-row` — botón destacado con gradient + avatar de icon + título + sub + badge
 * "Rápido" + chevron. Para opciones de pago rápido tipo QR.
 *
 * Layout (spec):
 * - `display: flex; align-items: center`
 * - `gap: var(--kds-spacing-1-75)` (14px)
 * - `padding: var(--kds-spacing-1-75)`
 * - `background: var(--kds-qr-bg-gradient)`, `border: 1px solid var(--kds-qr-border)`
 * - `border-radius: var(--kds-radius-card)`, `box-shadow: var(--kds-qr-shadow)`
 *
 * Sub-elementos:
 * - `.kds-qr-avatar`: cuadrado de `var(--kds-status-icon-size-sm)`, `display: grid; place-items: center`,
 *   `border-radius: var(--kds-qr-avatar-radius)`, `background: var(--kds-qr-avatar-bg)`,
 *   `color: var(--kds-color-primary-main)`. Icon 24px.
 * - `.kds-qr-text`: `flex: 1; display: flex; flex-direction: column; gap: 2px`
 * - `.kds-qr-text .title`: `font-weight: 600`, `font-size: var(--kds-font-size-sm)`, `letter-spacing: -0.15px`
 * - `.kds-qr-text .sub`: `font-size: var(--kds-font-size-caption)`, `color: text-secondary`, ellipsis
 * - `.kds-qr-badge`: pill con `padding: 3px 7px`, `border-radius: 9999px`, `font-size: 10px`, uppercase
 * - Chevron final: `<i class="material-symbols-outlined">chevron_right</i>` (último hijo, 20px primary)
 *
 * Contrato HTML:
 * ```html
 * <button type="button" class="kds-qr-row">
 *   <span class="kds-qr-avatar" aria-hidden="true">
 *     <i class="material-symbols-outlined">qr_code_2</i>
 *   </span>
 *   <span class="kds-qr-text">
 *     <span class="title">Pagar escaneando QR</span>
 *     <span class="sub">Apunta tu app bancaria al código</span>
 *   </span>
 *   <span class="kds-qr-badge">Rápido</span>
 *   <i class="material-symbols-outlined">chevron_right</i>
 * </button>
 * ```
 *
 * En React: `<KdsQrRow name="…" description="…" badge="Rápido" icon="qr_code_2" />`.
 *
 * @css .kds-qr-row, .kds-qr-avatar, .kds-qr-text, .kds-qr-text .title, .kds-qr-text .sub, .kds-qr-badge
 */
export const QrRow: Story = {
  name: 'QrRow (.kds-qr-row)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <button type="button" className="kds-qr-row">
        <span className="kds-qr-avatar" aria-hidden="true">
          <i className="material-symbols-outlined">qr_code_2</i>
        </span>
        <span className="kds-qr-text">
          <span className="title">Pagar escaneando QR</span>
          <span className="sub">Apunta tu app bancaria al código</span>
        </span>
        <span className="kds-qr-badge">Rápido</span>
        <i className="material-symbols-outlined">chevron_right</i>
      </button>
    </div>
  ),
};

// =============================================================================
// BILL ATTACHMENT (.kds-bill-attachment + .kds-bill-attachments)
// =============================================================================

/**
 * `.kds-bill-attachment` — link de descarga de un adjunto de factura.
 * `.kds-bill-attachments` — contenedor vertical de varios.
 *
 * Layout (spec):
 * - `.kds-bill-attachment`: `display: inline-flex; align-items: center; justify-content: flex-start`,
 *   `width: fit-content`, `text-decoration: none` (hover: underline solo en el span)
 * - Icon `<i>`: `font-size: var(--kds-font-size-lg)` (16px)
 * - `.kds-bill-attachments`: `display: flex; flex-direction: column; gap: var(--kds-spacing-0-75)` (6px)
 *
 * Tipografía:
 * - `color: var(--kds-color-info-main)`, `font-size: var(--kds-font-size-sm)`, `font-weight: var(--kds-font-weight-medium)`
 *
 * Contrato HTML (un adjunto):
 * ```html
 * <a class="kds-bill-attachment" href="/files/factura-enero.pdf" target="_blank" rel="noopener noreferrer">
 *   <i class="material-symbols-outlined">attach_file</i>
 *   <span>Factura Enero 2026.pdf</span>
 * </a>
 * ```
 *
 * Múltiples adjuntos:
 * ```html
 * <div class="kds-bill-attachments">
 *   <a class="kds-bill-attachment" href="…">…</a>
 *   <a class="kds-bill-attachment" href="…">…</a>
 * </div>
 * ```
 *
 * En React: `<KdsBillAttachments><KdsBillAttachment filename="…" href="…" /></KdsBillAttachments>`.
 *
 * @gsp `mat:billAttachments` taglib
 * @css .kds-bill-attachment, .kds-bill-attachments
 */
export const BillAttachment: Story = {
  name: 'BillAttachment (.kds-bill-attachment)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-bill-attachments">
        <a
          className="kds-bill-attachment"
          href="#factura-enero"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="material-symbols-outlined">attach_file</i>
          <span>Factura Enero 2026.pdf</span>
        </a>
        <a
          className="kds-bill-attachment"
          href="#orden-compra"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="material-symbols-outlined">attach_file</i>
          <span>Orden de compra OC-001.pdf</span>
        </a>
      </div>
    </div>
  ),
};

// =============================================================================
// BANK ROW (.kds-bank-row)
// =============================================================================

/**
 * `.kds-bank-row` — fila clickeable para seleccionar un banco (logo + nombre + chevron).
 *
 * Layout (spec):
 * - `display: flex; align-items: center`
 * - `gap: var(--kds-spacing-1-5)`, `padding: var(--kds-spacing-1-5)`
 * - `border: 1px solid var(--kds-color-border-subtle)`, `border-radius: var(--kds-radius-card)`
 * - `background: var(--kds-color-surface)`, `cursor: pointer`
 *
 * Sub-elementos:
 * - `.kds-bank-row-logo`: 40×40, `border-radius: var(--kds-radius-md)`, `display: grid; place-items: center`, `flex-shrink: 0`
 *   - `img`: `width/height: 100%`, `object-fit: contain`
 *   - Variantes del logo: `.initials` (fallback con primera letra), `.neutral` (icon genérico)
 * - `.kds-bank-row-name`: `flex: 1`, `font-weight: 500`, `font-size: var(--kds-font-size-sm)`
 * - `> i` final: chevron — color `var(--kds-color-border-default)`
 *
 * Variantes (modificadores combinables con `.kds-bank-row`):
 * - `.selected`: border + chevron en `--kds-color-primary-main`, bg `--kds-color-primary-faint`. Cambia el icon final a `check_circle`.
 * - `:disabled` / `.disabled`: `opacity: 0.5; pointer-events: none`
 *
 * Contrato HTML (con logo image):
 * ```html
 * <button type="button" class="kds-bank-row">
 *   <span class="kds-bank-row-logo">
 *     <img src="/logos/banco-security.svg" alt="Banco Security" />
 *   </span>
 *   <span class="kds-bank-row-name">Banco Security</span>
 *   <i class="material-symbols-outlined">chevron_right</i>
 * </button>
 * ```
 *
 * Variante seleccionada (sin logo, con initials):
 * ```html
 * <button type="button" class="kds-bank-row selected">
 *   <span class="kds-bank-row-logo"><span class="initials">B</span></span>
 *   <span class="kds-bank-row-name">BancoEstado</span>
 *   <i class="material-symbols-outlined">check_circle</i>
 * </button>
 * ```
 *
 * En React: `<KdsBankRow name="…" logoUrl="…" selected />`.
 *
 * @css .kds-bank-row, .kds-bank-row-logo, .kds-bank-row-logo img, .kds-bank-row-logo.initials, .kds-bank-row-logo.neutral, .kds-bank-row-name, .kds-bank-row.selected, .kds-bank-row.disabled
 */
export const BankRow: Story = {
  name: 'BankRow (.kds-bank-row)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <button type="button" className="kds-bank-row">
        <span className="kds-bank-row-logo">
          <span className="initials">B</span>
        </span>
        <span className="kds-bank-row-name">Banco Security</span>
        <i className="material-symbols-outlined">chevron_right</i>
      </button>
    </div>
  ),
};

// =============================================================================
// BANK LIST (.kds-bank-list)
// =============================================================================

/**
 * `.kds-bank-list` — contenedor vertical de varios `.kds-bank-row`.
 *
 * Layout (spec):
 * - `display: flex; flex-direction: column`
 * - `gap: var(--kds-spacing-1)` (8px)
 * - `margin-bottom: var(--kds-spacing-1)` (`:last-child { margin-bottom: 0 }`)
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-bank-list" role="list">
 *   <button type="button" class="kds-bank-row">…</button>
 *   <button type="button" class="kds-bank-row selected">…</button>
 *   <button type="button" class="kds-bank-row">…</button>
 * </div>
 * ```
 *
 * En React: `<KdsBankList>{banks.map(b => <KdsBankRow key={b.id} … />)}</KdsBankList>`.
 *
 * @css .kds-bank-list
 */
export const BankList: Story = {
  name: 'BankList (.kds-bank-list)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-bank-list" role="list">
        <button type="button" className="kds-bank-row">
          <span className="kds-bank-row-logo">
            <span className="initials">B</span>
          </span>
          <span className="kds-bank-row-name">Banco Security</span>
          <i className="material-symbols-outlined">chevron_right</i>
        </button>
        <button type="button" className="kds-bank-row selected">
          <span className="kds-bank-row-logo">
            <span className="initials">B</span>
          </span>
          <span className="kds-bank-row-name">BancoEstado</span>
          <i className="material-symbols-outlined">check_circle</i>
        </button>
        <button type="button" className="kds-bank-row">
          <span className="kds-bank-row-logo">
            <span className="initials">B</span>
          </span>
          <span className="kds-bank-row-name">BCI</span>
          <i className="material-symbols-outlined">chevron_right</i>
        </button>
      </div>
    </div>
  ),
};

// =============================================================================
// CARD PLAN (.kds-card-plan)
// =============================================================================

/**
 * `.kds-card-plan` — card de precio/plan con título + price + features + action.
 *
 * Layout (spec):
 * - `display: flex; flex-direction: column`
 * - `gap: var(--kds-spacing-2)` (16px) entre secciones internas
 * - `padding: var(--kds-spacing-2)`
 * - `border-radius: var(--kds-radius-lg)`, `border: 2px solid var(--kds-border-medium)`
 * - `min-width: 260px`, `max-width: 400px`, `height: 100%`
 * - `background: var(--kds-surface-base)`, `cursor: pointer`
 *
 * Sub-elementos:
 * - `.kds-card-plan-badge` (opcional, primer hijo): `align-self: flex-start`, `padding: 4px 12px`,
 *   `background: var(--primary)`, `color: white`, `font-size: var(--kds-font-size-xs)`, `border-radius: var(--kds-radius-full)`
 * - `.kds-card-plan-header > h3`: `font-size: var(--kds-font-size-2xl)`, `font-weight: bold`
 * - `.kds-card-plan-price`: `display: flex; align-items: baseline; gap: var(--kds-spacing-2)`,
 *   `border-bottom: 1px solid var(--kds-border-light)`
 *   - `.kds-price`: `font-size: var(--kds-font-size-4xl)`, `font-weight: bold`, `color: var(--primary)`
 *   - `.kds-price-period`: `font-size: var(--kds-font-size-base)`, `color: text-secondary`
 * - `.kds-card-plan-features`: `<ul>` con `display: flex; flex-direction: column; flex: 1`
 *
 * Variante `.recommended`: border en primary + gradient sutil + shadow elevación.
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-card-plan recommended">
 *   <span class="kds-card-plan-badge">Recomendado</span>
 *   <div class="kds-card-plan-header">
 *     <h3>Plan Pro</h3>
 *   </div>
 *   <div class="kds-card-plan-price">
 *     <span class="kds-price">$29.990</span>
 *     <span class="kds-price-period">/mes</span>
 *   </div>
 *   <ul class="kds-card-plan-features">
 *     <li>Hasta 1000 transacciones/mes</li>
 *     <li>Soporte prioritario</li>
 *   </ul>
 * </div>
 * ```
 *
 * En React: `<KdsCardPlan title="…" price="…" period="mes" features={[…]} recommended badgeText="Recomendado" action={…} />`.
 *
 * @css .kds-card-plan, .kds-card-plan.recommended, .kds-card-plan-badge, .kds-card-plan-header, .kds-card-plan-price, .kds-price, .kds-price-period, .kds-card-plan-features
 */
export const CardPlan: Story = {
  name: 'CardPlan (.kds-card-plan)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-card-plan recommended">
        <span className="kds-card-plan-badge">Recomendado</span>
        <div className="kds-card-plan-header">
          <h3>Plan Pro</h3>
        </div>
        <div className="kds-card-plan-price">
          <span className="kds-price">$29.990</span>
          <span className="kds-price-period">/mes</span>
        </div>
        <ul className="kds-card-plan-features">
          <li>Hasta 1000 transacciones/mes</li>
          <li>Soporte prioritario</li>
          <li>Reportes avanzados</li>
        </ul>
      </div>
    </div>
  ),
};

// =============================================================================
// CARD SELECTOR (.kds-card-selector)
// =============================================================================

/**
 * `.kds-card-selector` — botón-card seleccionable con icon + título + descripción.
 *
 * Layout (spec — resetea estilos default de `<button>` de BeerCSS):
 * - `display: flex; flex-direction: column; align-items: stretch; justify-content: flex-start`
 * - `inline-size: 100%`, `text-align: left`
 * - `padding: var(--kds-spacing-3)`, `gap: var(--kds-spacing-1-5)`
 * - `border-radius: var(--kds-radius-md)`, `border: var(--kds-border-width-md) solid var(--kds-border-light)`
 * - `background: var(--kds-color-background-paper)`, `cursor: pointer`
 *
 * Sub-elementos (spacing manejado por el `gap` del padre, NO con margin):
 * - `.kds-card-selector-icon`: `var(--kds-spacing-6)` cuadrado, `background: var(--kds-color-primary-focus)`,
 *   `border-radius: var(--kds-radius-sm)`, `display: flex; align-items/justify-content: center`
 *   - Icon interno: 24px (`var(--kds-spacing-3)`), `color: var(--kds-color-primary-main)`
 * - `.kds-card-selector-title`: `font-weight: var(--kds-font-weight-semibold)`, `font-size: var(--kds-font-size-lg)`
 * - `.kds-card-selector-description`: `font-size: var(--kds-font-size-sm)`, `color: text-secondary`, `line-height: normal`
 *
 * Estados:
 * - `:hover:not(.selected)`: border `--kds-color-primary-light`, bg `--kds-color-primary-hover`
 * - `.selected`: border `--kds-color-primary-main`, bg `--kds-color-primary-faint`, `box-shadow: var(--kds-shadow-md)`
 *
 * Contrato HTML:
 * ```html
 * <button type="button" class="kds-card-selector selected">
 *   <span class="kds-card-selector-icon">
 *     <i class="material-symbols-outlined">credit_card</i>
 *   </span>
 *   <span class="kds-card-selector-title">Tarjeta de crédito</span>
 *   <span class="kds-card-selector-description">Pago instantáneo, sin necesidad de cuenta bancaria.</span>
 * </button>
 * ```
 *
 * En React: `<KdsCardSelector icon="credit_card" title="…" description="…" selected />`.
 *
 * @css .kds-card-selector, .kds-card-selector.selected, .kds-card-selector-icon, .kds-card-selector-title, .kds-card-selector-description
 */
export const CardSelector: Story = {
  name: 'CardSelector (.kds-card-selector)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <button type="button" className="kds-card-selector selected">
        <span className="kds-card-selector-icon">
          <i className="material-symbols-outlined">credit_card</i>
        </span>
        <span className="kds-card-selector-title">Tarjeta de crédito</span>
        <span className="kds-card-selector-description">
          Pago instantáneo, sin necesidad de cuenta bancaria.
        </span>
      </button>
    </div>
  ),
};

// =============================================================================
// COPY ROW (.kds-copy-row)
// =============================================================================

/**
 * `.kds-copy-row` — fila clickeable que copia un valor al portapapeles. Estado `.copied`
 * cambia bg/border a success y muestra el toast.
 *
 * Layout (spec):
 * - `display: flex; align-items: center; justify-content: flex-start`
 * - `gap: var(--kds-spacing-1-25)` (10px)
 * - `padding: var(--kds-spacing-1-5) var(--kds-spacing-1-75)`
 * - `border: var(--kds-border-width-sm) solid var(--kds-color-border-subtle)`
 * - `border-radius: var(--kds-radius-row)`, `background: var(--kds-color-surface)`
 * - `font-size: var(--kds-font-size-sm)`, `cursor: pointer`, `text-align: left`
 *
 * Sub-elementos:
 * - `> i` (icon de copy a la izquierda): `color: var(--kds-color-text-secondary)`, `font-size: var(--kds-font-size-lg)`
 * - `.kds-copy-row-label`: `font-size: var(--kds-font-size-caption)`, `color: text-secondary`, uppercase,
 *   `letter-spacing: 0.03em`, `margin-bottom: var(--kds-spacing-0-25)`
 * - `.kds-copy-row-value`: `font-weight: var(--kds-font-weight-medium)`
 * - `.kds-copy-toast` (visible solo con `.copied`): `position: absolute; right: var(--kds-spacing-1-5)`,
 *   color success, fade `opacity 0 → 1`
 *
 * Estados:
 * - `:hover`: bg `--kds-color-hover-bg`, border `--kds-color-border-default`
 * - `.copied`: bg `--kds-color-success-soft`, border `--kds-color-success-main`, toast visible
 *
 * Contrato HTML:
 * ```html
 * <button type="button" class="kds-copy-row" data-copy="Banco Security">
 *   <i class="material-symbols-outlined" aria-hidden="true">content_copy</i>
 *   <div>
 *     <span class="kds-copy-row-label">Banco</span>
 *     <span class="kds-copy-row-value">Banco Security</span>
 *   </div>
 *   <span class="kds-copy-toast" aria-hidden="true">
 *     <i class="material-symbols-outlined">check_circle</i> Copiado
 *   </span>
 * </button>
 * ```
 *
 * En React: `<KdsCopyRow label="Banco" value="Banco Security" />`.
 *
 * @css .kds-copy-row, .kds-copy-row-label, .kds-copy-row-value, .kds-copy-row.copied, .kds-copy-toast
 */
export const CopyRow: Story = {
  name: 'CopyRow (.kds-copy-row)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <button
        type="button"
        className="kds-copy-row"
        data-copy="Banco Security"
        aria-label="Copiar Banco: Banco Security"
      >
        <i className="material-symbols-outlined" aria-hidden="true">
          content_copy
        </i>
        <div>
          <span className="kds-copy-row-label">Banco</span>
          <span className="kds-copy-row-value">Banco Security</span>
        </div>
        <span className="kds-copy-toast" aria-hidden="true">
          <i className="material-symbols-outlined">check_circle</i> Copiado
        </span>
      </button>
    </div>
  ),
};

// =============================================================================
// COPYABLE TABLE (.kds-copyable-table + .kds-copy-all-btn)
// =============================================================================

/**
 * `.kds-copyable-table` — tabla compacta con filas tap-to-copy, más botón "Copiar todo".
 *
 * Layout (spec):
 * - `.kds-copyable-table`: `border: 1px solid var(--kds-color-divider)`, `border-radius: var(--kds-radius-md)`,
 *   `background: var(--kds-color-background-paper)`, `padding: var(--kds-spacing-0-5) var(--kds-spacing-0-75)`
 * - `.kds-copyable-table-row`: `display: flex; align-items: center; justify-content: space-between`,
 *   `gap: var(--kds-spacing-1-5)`, `padding: var(--kds-spacing-1-25) var(--kds-spacing-1)`,
 *   `border-top: 1px solid var(--kds-color-divider)` (excepto el primer hijo), `font-size: var(--kds-font-size-sm)`, `cursor: pointer`
 *
 * Sub-elementos por row:
 * - `.k`: `font-size: var(--kds-font-size-caption)`, uppercase, `letter-spacing: 0.3px`, weight medium, `color: text-secondary`
 * - `.v`: monospace (`JetBrains Mono`), `text-align: right`, weight medium, `font-size: var(--kds-font-size-sm)`,
 *   `flex: 1 1 auto`. Tiene `::after` con icon `content_copy` (opacity 0, aparece en hover)
 *
 * Estados de row:
 * - `:hover`: bg `--kds-color-primary-faint`, icon `::after` visible (opacity 0.7)
 * - `.copied`: bg `--kds-color-success-soft`, `.v` color `--kds-color-success-dark`, `::after` → `check`
 * - `.settling`: estado intermedio post-copied (fade out del check sin re-activar hover)
 *
 * Botón asociado `.kds-copy-all-btn` (modifier de `.kds-btn.kds-btn-outlined.kds-btn-block`):
 * - `background: var(--kds-color-primary-faint)`, `border-color: var(--kds-color-primary-outlined-border-light)`
 * - `margin-top: var(--kds-spacing-1-25)`, `text-transform: none`
 * - `.copied`: bg success-soft, color success-dark
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-copyable-table">
 *   <div class="kds-copyable-table-row" role="button" tabindex="0">
 *     <span class="k">Banco</span>
 *     <span class="v">Banco Security</span>
 *   </div>
 *   <div class="kds-copyable-table-row" role="button" tabindex="0">
 *     <span class="k">Cuenta</span>
 *     <span class="v">12345678</span>
 *   </div>
 * </div>
 * <button type="button" class="kds-btn kds-btn-outlined kds-btn-block kds-copy-all-btn">
 *   <span class="kds-icon"><i class="material-symbols-outlined">content_copy</i></span>
 *   <span>Copiar todos los datos</span>
 * </button>
 * ```
 *
 * En React: `<KdsCopyableTable rows={[{label, value}, …]} copyAllLabel="…" />`.
 *
 * @css .kds-copyable-table, .kds-copyable-table-row, .kds-copyable-table-row .k, .kds-copyable-table-row .v, .kds-copyable-table-row.copied, .kds-copyable-table-row.settling, .kds-copy-all-btn
 */
export const CopyableTable: Story = {
  name: 'CopyableTable (.kds-copyable-table)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-copyable-table">
        <div className="kds-copyable-table-row" role="button" tabIndex={0}>
          <span className="k">Banco</span>
          <span className="v">Banco Security</span>
        </div>
        <div className="kds-copyable-table-row" role="button" tabIndex={0}>
          <span className="k">Cuenta</span>
          <span className="v">12345678</span>
        </div>
        <div className="kds-copyable-table-row" role="button" tabIndex={0}>
          <span className="k">RUT</span>
          <span className="v">76.123.456-7</span>
        </div>
      </div>
      <button
        type="button"
        className="kds-btn kds-btn-outlined kds-btn-block kds-copy-all-btn"
      >
        <span className="kds-icon">
          <i className="material-symbols-outlined">content_copy</i>
        </span>
        <span>Copiar todos los datos</span>
      </button>
    </div>
  ),
};

// =============================================================================
// EXPAND PANEL (.kds-expand-toggle + .kds-expand-panel)
// =============================================================================

/**
 * `.kds-expand-toggle` + `.kds-expand-panel` — sección colapsable con toggle button.
 *
 * Layout (spec):
 * - `.kds-expand-toggle`: `background: none; border: 0; padding: 0`, `color: var(--kds-color-primary-main)`,
 *   `font-weight: var(--kds-font-weight-medium)`, `font-size: var(--kds-font-size-sm)`,
 *   `display: inline-flex; align-items: center; gap: 0`, `cursor: pointer`
 *   - `hover/focus span`: `text-decoration: underline`
 *   - Icon (`> i`): `font-size: var(--kds-font-size-base)`, rota 180° con `[aria-expanded="true"]`
 * - `.kds-expand-panel`: `overflow: hidden`, `max-height: 0`, transición de 0.28s
 *   - `.open`: `max-height: 800px`, `margin-top: 0`
 *
 * Contrato HTML:
 * ```html
 * <div>
 *   <button class="kds-expand-toggle" aria-expanded="false">
 *     <span>Ver detalles</span>
 *     <i class="material-symbols-outlined">expand_more</i>
 *   </button>
 *   <div class="kds-expand-panel" hidden>
 *     <p>Contenido oculto que se muestra al expandir.</p>
 *   </div>
 * </div>
 * ```
 *
 * Estado expandido:
 * ```html
 * <button class="kds-expand-toggle" aria-expanded="true">
 *   <span>Ver detalles</span>
 *   <i class="material-symbols-outlined">expand_less</i>
 * </button>
 * <div class="kds-expand-panel open">…</div>
 * ```
 *
 * En React: `<KdsExpandPanel label="Ver detalles" defaultExpanded>…</KdsExpandPanel>`.
 *
 * @css .kds-expand-toggle, .kds-expand-toggle[aria-expanded="true"], .kds-expand-panel, .kds-expand-panel.open
 */
export const ExpandPanel: Story = {
  name: 'ExpandPanel (.kds-expand-toggle + .kds-expand-panel)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <button className="kds-expand-toggle" aria-expanded="true">
        <span>Ver detalles</span>
        <i className="material-symbols-outlined">expand_less</i>
      </button>
      <div className="kds-expand-panel open">
        <p>Contenido extendido del panel cuando está abierto.</p>
      </div>
    </div>
  ),
};

// =============================================================================
// ACCORDION (.kds-accordion / .kds-accordion-summary / .kds-accordion-details)
// =============================================================================

/**
 * `.kds-accordion` — accordion nativo basado en `<details>` + `<summary>` con clases del DS.
 *
 * Estructura (nativa HTML5):
 * - `<details class="kds-accordion">` envuelve el accordion (estado open/closed por el navegador)
 * - `<summary class="kds-accordion-summary">` es el header clickeable
 * - `<div class="kds-accordion-details">` es el cuerpo del accordion
 *
 * El componente React añade automáticamente un `<i class="material-symbols-outlined">expand_more</i>`
 * dentro del summary para la flecha.
 *
 * Variante relacionada: `.kds-contract-accordion` envuelve múltiples `<details>` con border común
 * (para "términos y condiciones expandibles").
 *
 * Contrato HTML:
 * ```html
 * <details class="kds-accordion">
 *   <summary class="kds-accordion-summary">
 *     ¿Cómo funciona el pago?
 *     <i class="material-symbols-outlined">expand_more</i>
 *   </summary>
 *   <div class="kds-accordion-details">
 *     <p>El pago se procesa directamente con tu banco.</p>
 *   </div>
 * </details>
 * ```
 *
 * En React: `<KdsAccordion><KdsAccordionSummary>…</KdsAccordionSummary><KdsAccordionDetails>…</KdsAccordionDetails></KdsAccordion>`.
 *
 * @css .kds-accordion, .kds-accordion-summary, .kds-accordion-details, .kds-contract-accordion
 */
export const Accordion: Story = {
  name: 'Accordion (.kds-accordion)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <details className="kds-accordion" open>
        <summary className="kds-accordion-summary">
          ¿Cómo funciona el pago?
          <i className="material-symbols-outlined">expand_more</i>
        </summary>
        <div className="kds-accordion-details">
          <p>El pago se procesa directamente con tu banco.</p>
        </div>
      </details>
    </div>
  ),
};

// =============================================================================
// CHIP / BADGE (.kds-badge)
// =============================================================================

/**
 * `.kds-badge` — chip inline pequeño para etiquetas y status (también usado como "badge").
 *
 * Layout (spec):
 * - `display: inline-flex; align-items: center`
 * - `gap: 4px`, `padding: 2px 8px`
 * - `border-radius: var(--kds-radius-sm)`
 * - `font-size: var(--kds-font-size-xs)`, `font-weight: var(--kds-font-weight-medium)`, `line-height: 1.5`
 *
 * Icon prefix opcional (`> i.material-symbols-outlined`): 14px, `line-height: 1`.
 *
 * Close button `.kds-badge-close` (deletable chips — NO usa `.kds-btn`, sería demasiado grande):
 * - `display: inline-flex; align-items/justify-content: center`
 * - `width: 16px; height: 16px`, `margin-right: -2px`, `border-radius: 50%`
 * - `opacity: 0.7` (hover: 1, bg `rgba(0,0,0,0.1)`)
 * - Icon interno: 14px
 *
 * Variantes de color (modificadores combinables con `.kds-badge`):
 * - `.primary`: bg `--kds-color-primary-container`, color `--kds-color-primary-dark`
 * - `.success`: bg + color tokens success
 * - `.error`: tokens error
 * - `.warning`: tokens warning
 * - `.info`: tokens info
 *
 * Contrato HTML (chip simple):
 * ```html
 * <span class="kds-badge success">
 *   <i class="material-symbols-outlined">check_circle</i>
 *   <span>Pagado</span>
 * </span>
 * ```
 *
 * Chip deletable:
 * ```html
 * <span class="kds-badge primary">
 *   <span>Filtro</span>
 *   <button type="button" class="kds-badge-close" aria-label="Eliminar">
 *     <i class="material-symbols-outlined">close</i>
 *   </button>
 * </span>
 * ```
 *
 * En React: `<KdsChip color="success" icon="check_circle" onDelete={…}>…</KdsChip>`.
 *
 * @css .kds-badge, .kds-badge.primary, .kds-badge.success, .kds-badge.error, .kds-badge.warning, .kds-badge.info, .kds-badge-close
 */
export const Chip: Story = {
  name: 'Chip (.kds-badge)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <span className="kds-badge success">
        <i className="material-symbols-outlined">check_circle</i>
        <span>Pagado</span>
      </span>
    </div>
  ),
};

// =============================================================================
// STEPPER (.kds-stepper)
// =============================================================================

/**
 * `.kds-stepper` — indicador horizontal de progreso multi-paso (Material 3).
 *
 * Layout (spec):
 * - `display: flex; justify-content: space-between; align-items: flex-start; gap: 0`
 * - `position: relative` (para la línea conectora `::before`)
 * - `padding: var(--kds-spacing-3) 0`, `background: var(--kds-color-background-paper)`
 *
 * Línea conectora — `.kds-stepper::before`:
 * - `position: absolute; left: 10%; right: 10%; top: 44px`
 * - `height: 2px; background: var(--kds-color-background-elevated)`
 *
 * Sub-elementos:
 * - `.kds-step`: `flex: 1 1 0`, `display: flex; flex-direction: column; align-items: center`, `text-align: center`
 * - `.kds-step-indicator`: círculo de 40×40 (tablet 44, mobile 36), `border-radius: 50%`,
 *   `background: var(--kds-color-background-elevated)` (pending — gris claro),
 *   `font-size: 0` (oculta el número — el DS no usa números)
 * - `.kds-step-label`: `margin-top: 12px`, `font-size: 14px`, `color: text-secondary`
 *
 * Estados (modificadores en `.kds-step`):
 * - `.current`: indicator bg `--kds-color-info-main`, label color text-primary + weight 500
 * - `.completed`: indicator bg `--kds-color-success-main`, label color text-primary;
 *   `::after` con `content: "check"` (Material Symbols Outlined, 24px, color white)
 *
 * El indicator se renderiza como un `<div>` vacío — el check/número viene del CSS.
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-stepper">
 *   <div class="kds-step completed">
 *     <div class="kds-step-indicator"></div>
 *     <div class="kds-step-label">Datos</div>
 *   </div>
 *   <div class="kds-step current">
 *     <div class="kds-step-indicator"></div>
 *     <div class="kds-step-label">Banco</div>
 *   </div>
 *   <div class="kds-step">
 *     <div class="kds-step-indicator"></div>
 *     <div class="kds-step-label">Confirmar</div>
 *   </div>
 * </div>
 * ```
 *
 * En React: `<KdsStepper steps={['Datos', 'Banco', 'Confirmar']} current={1} />`.
 *
 * @gsp `mat:stepper` taglib (MaterialTagLib.groovy:817)
 * @css .kds-stepper, .kds-stepper::before, .kds-step, .kds-step-indicator, .kds-step-label, .kds-step.current, .kds-step.completed
 */
export const Stepper: Story = {
  name: 'Stepper (.kds-stepper)',
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <div className="kds-stepper">
        <div className="kds-step completed">
          <div className="kds-step-indicator" />
          <div className="kds-step-label">Datos</div>
        </div>
        <div className="kds-step current">
          <div className="kds-step-indicator" />
          <div className="kds-step-label">Banco</div>
        </div>
        <div className="kds-step">
          <div className="kds-step-indicator" />
          <div className="kds-step-label">Confirmar</div>
        </div>
      </div>
    </div>
  ),
};
