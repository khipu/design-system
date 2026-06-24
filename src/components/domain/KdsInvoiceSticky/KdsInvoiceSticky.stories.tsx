import { useEffect, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsInvoiceSticky } from './KdsInvoiceSticky';

/**
 * KdsInvoiceSticky — header sticky con monto + código + merchant tile + datos colapsables.
 *
 * Markup canónico (matchea `_payInvoiceCard.gsp` de producción payment):
 *
 * ```html
 * <div class="kds-invoice-sticky-wrap">                              <!-- sticky positioning -->
 *   <article class="kds-card-elevated kds-invoice-sticky">
 *     <header class="kds-invoice-header">
 *       <div>
 *         <p class="kds-invoice-amount">$3.300</p>
 *         <p class="kds-invoice-code">
 *           Código <span class="kds-invoice-code-value kds-invoice-code-value--lowercase">fdap-sr2x-q3pf</span>
 *         </p>
 *       </div>
 *       <div class="kds-invoice-merchant"><i>storefront</i></div>
 *     </header>
 *     <div class="kds-invoice-collapsible">
 *       <div class="kds-invoice-summary"><dl class="kds-kv">...</dl></div>
 *     </div>
 *   </article>
 * </div>
 * ```
 *
 * **Animación sticky-collapse (MOBILE only, <768px)**:
 * - El JS de `khipu-init.js → initStickyInvoice()` escucha scroll y setea `--collapse-progress: 0..1`
 *   en el `.kds-screen.active`. CSS interpola: amount, opacity del collapsible, padding, etc.
 * - Para verlo en Storybook: viewport mobile + scroll. Las stories `StickyAnimation*` incluyen
 *   un scroll listener inline.
 *
 * @gsp `_payInvoiceCard.gsp` + `paymentMaterial.gsp` layout
 */
const meta: Meta<typeof KdsInvoiceSticky> = {
  title: 'Domain/Payment Identity/KdsInvoiceSticky',
  component: KdsInvoiceSticky,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Header sticky con monto + código + merchant + collapsible. Sticky-collapse animation es **mobile-only** (<768px) y requiere `.kds-invoice-sticky-wrap` + `.kds-screen.active` + JS de scroll que setee `--collapse-progress`. Bg de la página = `var(--kds-color-background-muted)` para que los cards paper contrasten.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsInvoiceSticky>;

// =============================================================================
// HELPERS
// =============================================================================

/** Item de KV (label/value) — opcional para variar el contenido del collapsible. */
type KvItem = { label: string; value: string };

const DEFAULT_KV: KvItem[] = [
  { label: 'Pago a', value: 'Belén Fuentes Mejías' },
  { label: 'Asunto', value: 'Cuenta Enero 2026' },
];

/** Contenido interno del invoice — matchea `mat:paymentAmount` + `mat:merchantTile`. */
const InvoiceContent = ({
  amount = '$3.300',
  code = 'fdap-sr2x-q3pf',
  amountClass,
  kv = DEFAULT_KV,
}: {
  amount?: string;
  code?: string;
  amountClass?: string;
  kv?: KvItem[];
}) => (
  <>
    <header className="kds-invoice-header">
      <div>
        <p className={`kds-invoice-amount${amountClass ? ` ${amountClass}` : ''}`}>{amount}</p>
        <p className="kds-invoice-code">
          Código <span className="kds-invoice-code-value kds-invoice-code-value--lowercase">{code}</span>
        </p>
      </div>
      <div className="kds-invoice-merchant" aria-hidden="true">
        <i className="material-symbols-outlined">storefront</i>
      </div>
    </header>
    <div className="kds-invoice-collapsible">
      <div className="kds-invoice-summary">
        <dl className="kds-kv">
          {kv.map((item, i) => (
            <span key={`${item.label}-${i}`} style={{ display: 'contents' }}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </span>
          ))}
        </dl>
      </div>
    </div>
  </>
);

/** Shell con bg muted + payment-flow + screen.active. Igual estructura que producción. */
const MobileShell = ({
  children,
  scrollable,
  scrollRef,
  screenRef,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  scrollRef?: React.Ref<HTMLDivElement>;
  screenRef?: React.Ref<HTMLElement>;
}) => (
  <div
    ref={scrollRef}
    style={{
      height: scrollable ? 600 : 'auto',
      maxWidth: 400,
      margin: '0 auto',
      overflowY: scrollable ? 'auto' : 'visible',
      border: '1px solid var(--kds-color-divider)',
      background: 'var(--kds-color-background-muted)',
      position: 'relative',
    }}
  >
    <div className="kds-payment-flow">
      <section ref={screenRef} className="kds-screen active">
        {children}
      </section>
    </div>
  </div>
);

// =============================================================================
// STATIC STORIES (sin scroll animation — solo muestran el markup correcto)
// =============================================================================

/** Invoice sticky estático con KV mínimo (2 items). */
export const Default: Story = {
  render: () => (
    <MobileShell>
      <div className="kds-invoice-sticky-wrap">
        <KdsInvoiceSticky>
          <InvoiceContent />
        </KdsInvoiceSticky>
      </div>
    </MobileShell>
  ),
};

/** Con KV extendido (4 items). */
export const WithDetails: Story = {
  render: () => (
    <MobileShell>
      <div className="kds-invoice-sticky-wrap">
        <KdsInvoiceSticky>
          <InvoiceContent
            amount="$45.990"
            code="hjk2-mn4p-8rqt"
            kv={[
              { label: 'Pago a', value: 'Comercial Santiago SpA' },
              { label: 'Asunto', value: 'Orden #20260512-001' },
              { label: 'Vencimiento', value: '15 de mayo de 2026' },
              { label: 'Notificar a', value: 'pagos@comercialsantiago.cl' },
            ]}
          />
        </KdsInvoiceSticky>
      </div>
    </MobileShell>
  ),
};

/** Amount success (verde) — pantallas terminales OK. */
export const SuccessState: Story = {
  render: () => (
    <MobileShell>
      <div className="kds-invoice-sticky-wrap">
        <KdsInvoiceSticky>
          <InvoiceContent amountClass="success" />
        </KdsInvoiceSticky>
      </div>
    </MobileShell>
  ),
};

/** Con expand panel (acordeón "Detalles del cobro"). */
export const WithExpandPanel: Story = {
  render: function WithExpand() {
    const [open, setOpen] = useState(false);
    return (
      <MobileShell>
        <div className="kds-invoice-sticky-wrap">
          <KdsInvoiceSticky>
            <InvoiceContent
              amount="$45.990"
              code="hjk2-mn4p-8rqt"
              kv={[
                { label: 'Pago a', value: 'Comercial Santiago SpA' },
                { label: 'Asunto', value: 'Orden #20260512-001' },
              ]}
            />
            <div className="kds-invoice-collapsible">
              <button
                type="button"
                className="kds-expand-toggle"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span>Detalles del cobro</span>
                <i className="material-symbols-outlined">expand_more</i>
              </button>
              <div className={`kds-expand-panel${open ? ' open' : ''}`} hidden={!open}>
                <dl className="kds-detail-list">
                  <div className="kds-detail-group">
                    <dt>Vencimiento</dt>
                    <dd>15 de mayo de 2026</dd>
                  </div>
                  <div className="kds-detail-group">
                    <dt>Notificar a</dt>
                    <dd>pagos@comercialsantiago.cl</dd>
                  </div>
                </dl>
              </div>
            </div>
          </KdsInvoiceSticky>
        </div>
      </MobileShell>
    );
  },
};

// =============================================================================
// STICKY ANIMATION STORIES (con scroll + JS para activar la collapse)
// =============================================================================

/** Helper hook: scroll listener que setea --collapse-progress (mirror de initStickyInvoice). */
function useCollapseProgress() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const screenRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const COLLAPSE_END = 150;
    const container = scrollRef.current;
    if (!container) return;

    const onScroll = () => {
      const scrollY = container.scrollTop;
      const p = Math.min(Math.max(scrollY / COLLAPSE_END, 0), 1);
      setProgress(p);
      const screen = screenRef.current;
      if (!screen) return;
      screen.style.setProperty('--collapse-progress', String(p));
      if (!screen.style.getPropertyValue('--collapse-collapsible-h')) {
        const collapsible = screen.querySelector<HTMLElement>('.kds-invoice-collapsible');
        if (collapsible) {
          screen.style.setProperty('--collapse-collapsible-h', `${collapsible.offsetHeight}px`);
        }
      }
    };

    container.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => container.removeEventListener('scroll', onScroll);
  }, []);

  return { scrollRef, screenRef, progress };
}

/** Body card con N items + indicator de progress. */
const BodyCard = ({ progress, itemCount = 10 }: { progress: number; itemCount?: number }) => (
  <>
    <article className="kds-card-elevated">
      <h2 className="kds-card-title">Datos para pago</h2>
      <p style={{ margin: 0, color: 'var(--kds-color-text-secondary)' }}>
        Progress: {progress.toFixed(2)} — scroll para ver la animación.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 12 }}>
        {Array.from({ length: itemCount }).map((_, i) => (
          <div
            key={i}
            style={{
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--kds-color-divider)',
            }}
          >
            <strong>Item {i + 1}</strong>
            <p
              style={{
                margin: '4px 0 0',
                fontSize: 14,
                color: 'var(--kds-color-text-secondary)',
              }}
            >
              Contenido de ejemplo para generar scroll.
            </p>
          </div>
        ))}
      </div>
    </article>
    {/* Buffer para que el último card no toque el borde inferior */}
    <div style={{ height: 32 }} aria-hidden="true" />
  </>
);

/**
 * Sticky con KV mínimo (2 items) — animación con header compacto.
 * Verifica que el spacing inferior queda bien con poco contenido.
 */
export const StickyAnimationMinimal: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: function Story() {
    const { scrollRef, screenRef, progress } = useCollapseProgress();
    return (
      <MobileShell scrollable scrollRef={scrollRef} screenRef={screenRef}>
        <div className="kds-invoice-sticky-wrap">
          <KdsInvoiceSticky>
            <InvoiceContent />
          </KdsInvoiceSticky>
        </div>
        <BodyCard progress={progress} itemCount={8} />
      </MobileShell>
    );
  },
};

/**
 * Sticky con KV medio (4 items) — caso típico de producción payment.
 */
export const StickyAnimation: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: function Story() {
    const { scrollRef, screenRef, progress } = useCollapseProgress();
    return (
      <MobileShell scrollable scrollRef={scrollRef} screenRef={screenRef}>
        <div className="kds-invoice-sticky-wrap">
          <KdsInvoiceSticky>
            <InvoiceContent
              kv={[
                { label: 'Pago a', value: 'Belén Fuentes Mejías' },
                { label: 'Asunto', value: 'Cuenta Enero 2026' },
                { label: 'Vencimiento', value: '15 de mayo de 2026' },
                { label: 'Notificar a', value: 'pagos@comercialsantiago.cl' },
              ]}
            />
          </KdsInvoiceSticky>
        </div>
        <BodyCard progress={progress} itemCount={10} />
      </MobileShell>
    );
  },
};

/**
 * Sticky con KV extendido (6 items) — verifica que el spacing escala bien
 * con mucho contenido en el collapsible.
 */
export const StickyAnimationExtended: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  render: function Story() {
    const { scrollRef, screenRef, progress } = useCollapseProgress();
    return (
      <MobileShell scrollable scrollRef={scrollRef} screenRef={screenRef}>
        <div className="kds-invoice-sticky-wrap">
          <KdsInvoiceSticky>
            <InvoiceContent
              amount="$1.250.000"
              code="hjk2-mn4p-8rqt"
              kv={[
                { label: 'Pago a', value: 'Comercial Santiago SpA' },
                { label: 'Asunto', value: 'Orden #20260512-001' },
                { label: 'Vencimiento', value: '15 de mayo de 2026' },
                { label: 'Notificar a', value: 'pagos@comercialsantiago.cl' },
                { label: 'Emisor', value: 'Khipu Pagos' },
                { label: 'Referencia', value: 'INV-2026-05-12-001' },
              ]}
            />
          </KdsInvoiceSticky>
        </div>
        <BodyCard progress={progress} itemCount={12} />
      </MobileShell>
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML (matchea `_payInvoiceCard.gsp` de producción payment):
 * ```html
 * <div class="kds-invoice-sticky-wrap">
 *   <article class="kds-card-elevated kds-invoice-sticky">
 *     <header class="kds-invoice-header">
 *       <div>
 *         <p class="kds-invoice-amount">$3.300</p>
 *         <p class="kds-invoice-code">
 *           Código <span class="kds-invoice-code-value kds-invoice-code-value--lowercase">fdap-sr2x-q3pf</span>
 *         </p>
 *       </div>
 *       <div class="kds-invoice-merchant" aria-hidden="true">
 *         <i class="material-symbols-outlined">storefront</i>
 *       </div>
 *     </header>
 *     <div class="kds-invoice-collapsible">
 *       <div class="kds-invoice-summary">
 *         <dl class="kds-kv">
 *           <dt>Pago a</dt><dd>Belén Fuentes Mejías</dd>
 *           <dt>Asunto</dt><dd>Cuenta Enero 2026</dd>
 *         </dl>
 *       </div>
 *     </div>
 *   </article>
 * </div>
 * ```
 *
 * El `kds-invoice-sticky-wrap` es el contenedor sticky positioning (lo provee el
 * consumidor — el componente React solo renderiza `kds-card-elevated kds-invoice-sticky`).
 * Animación sticky-collapse mobile (<768px): requiere JS que setee
 * `--collapse-progress: 0..1` en el `.kds-screen.active`. Ver `khipu-init.js → initStickyInvoice()`.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    layout: 'padded',
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-invoice-sticky-wrap">
  <article class="kds-card-elevated kds-invoice-sticky">
    <header class="kds-invoice-header">
      <div>
        <p class="kds-invoice-amount">$3.300</p>
        <p class="kds-invoice-code">
          Código <span class="kds-invoice-code-value kds-invoice-code-value--lowercase">fdap-sr2x-q3pf</span>
        </p>
      </div>
      <div class="kds-invoice-merchant" aria-hidden="true">
        <i class="material-symbols-outlined">storefront</i>
      </div>
    </header>
    <div class="kds-invoice-collapsible">
      <div class="kds-invoice-summary">
        <dl class="kds-kv">
          <dt>Pago a</dt><dd>Belén Fuentes Mejías</dd>
          <dt>Asunto</dt><dd>Cuenta Enero 2026</dd>
        </dl>
      </div>
    </div>
  </article>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400, margin: '0 auto', background: 'var(--kds-color-background-muted)' }}>
      <div className="kds-invoice-sticky-wrap">
        <article className="kds-card-elevated kds-invoice-sticky">
          <header className="kds-invoice-header">
            <div>
              <p className="kds-invoice-amount">$3.300</p>
              <p className="kds-invoice-code">
                Código <span className="kds-invoice-code-value kds-invoice-code-value--lowercase">fdap-sr2x-q3pf</span>
              </p>
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
        </article>
      </div>
    </div>
  ),
};
