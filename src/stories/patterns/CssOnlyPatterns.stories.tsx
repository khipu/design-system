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
          'Clases CSS-only del DS usadas en producción payment sin wrapper React. Documentan contrato HTML + specs cuantitativos para que MCP pueda generar markup preciso.',
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
