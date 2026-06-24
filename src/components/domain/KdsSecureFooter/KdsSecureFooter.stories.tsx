import type { Meta, StoryObj } from '@storybook/react';
import { KdsSecureFooter } from './KdsSecureFooter';
import { KdsCard, KdsCardBody } from '../../core/KdsCard';
import khipuLogo from '../../../assets/images/khipu-logo.svg';

/**
 * KdsSecureFooter — footer "Pago seguro procesado por" + logo Khipu (a color) con candado.
 *
 * Layout & sizing (spec):
 * - `display: flex; align-items: center; justify-content: center`
 * - `gap: 4px` (`var(--kds-spacing-0-5)`)
 * - `padding: 8px 0` (vertical only)
 * - `font-size: var(--kds-font-size-xs)`
 * - `color: var(--kds-color-gray-400)`
 * - `letter-spacing: var(--kds-letter-spacing-wide)`
 *
 * Contenido (incluido por defecto, igual que `mat:secureFooter`):
 * - Candado: SVG inline `.kds-secure-footer-lock`, `12px` (stroke `currentColor`)
 * - Label: "Pago seguro procesado por" (override con `children`; NO incluye "Khipu" — la marca la aporta el logo)
 * - Logo Khipu: SVG inline `.khipu-mark` a color (morado + cyan), `11px`. Ocultable con `showLogo={false}`.
 * - PSP (opcional): logo del proveedor de pagos vía prop `psp`, a la derecha con divisor ("Khipu | klap").
 *
 * Variantes:
 * - **`default`** (out-of-card): visible en desktop (`min-width: 768px`), oculto en mobile
 * - **`inside`** (in-card): visible en mobile, oculto en desktop — usado dentro de `KdsCard` como footer interno
 *
 * Comportamiento responsive (clave para entender el patrón):
 * ```css
 * .kds-secure-footer:not(.inside) { display: flex; }          // desktop default
 * .kds-secure-footer.inside { display: none; }                // desktop inside oculto
 * @media (max-width: 768px) {
 *   .kds-secure-footer:not(.inside) { display: none; }        // mobile default oculto
 *   .kds-secure-footer.inside { display: flex; }              // mobile inside visible
 * }
 * ```
 *
 * @gsp `mat:secureFooter` taglib en `paymentMaterial.gsp` y card internos
 * @css .kds-secure-footer, .kds-secure-footer.inside, .kds-secure-footer-lock
 */
const meta: Meta<typeof KdsSecureFooter> = {
  title: 'Domain/Recap & Trust/KdsSecureFooter',
  component: KdsSecureFooter,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Footer "Pago seguro procesado por" + logo Khipu a color. `font xs, color gray-400, gap 4px, padding 8px 0, letter-spacing wide`. Variante `default` visible solo en desktop (≥768px); variante `inside` visible solo en mobile (dentro de cards). Combinar ambas en el mismo flow garantiza visibilidad en cualquier viewport. Compose: poné `<KdsSecureFooter variant="inside"/>` como último hijo de la `KdsCard` y `<KdsSecureFooter/>` fuera de la card. Ver `Patterns/CSS-only → SecureFooter`.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'inside'],
      description:
        '`default` = footer externo visible en desktop; `inside` = footer interno (dentro de KdsCard) visible en mobile.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsSecureFooter>;

/** Default — footer externo, visible en desktop ≥768px. */
export const Default: Story = {
  args: {
    children: 'Pago seguro procesado por',
  },
};

/** Inside — variante para usar dentro de `KdsCard`, visible en mobile <768px. */
export const InsideVariant: Story = {
  args: {
    variant: 'inside',
    children: 'Pago seguro procesado por',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Variante `inside` se renderiza dentro de la card de contenido. En mobile (<768px) sustituye al footer externo que se oculta.',
      },
    },
  },
};

/** Texto custom (raro — el texto default suele ser canónico). */
export const CustomText: Story = {
  args: {
    children: 'Transacción protegida por',
  },
};

/**
 * Con PSP — un segundo logo (proveedor de pagos que contrató a Khipu) a la derecha del
 * logo Khipu, separado por un divisor ("Khipu | klap"). El consumidor pasa el logo del
 * PSP vía la prop `psp` (el DS no empaqueta logos de terceros). Acá se ilustra con un
 * wordmark de texto; en producción sería un `<img className="kds-psp-mark" src=… />`.
 */
export const WithPsp: Story = {
  name: 'Con PSP',
  render: () => (
    <KdsSecureFooter psp={<strong style={{ color: '#16a34a' }}>klap</strong>}>
      Pago seguro procesado por
    </KdsSecureFooter>
  ),
};

/**
 * Inside dentro de `KdsCard` — patrón canónico de producción.
 *
 * @pattern Cada `KdsCard` del flow payment debe terminar con `<KdsSecureFooter variant="inside">`.
 * El footer externo `default` se renderiza una vez al final del `kds-payment-flow`.
 */
export const InsideCard: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <KdsCard>
        <KdsCardBody>
          <h2 className="kds-card-title">Contenido de la card</h2>
          <p>El footer inside aparece al final.</p>
          <KdsSecureFooter variant="inside">
            Pago seguro procesado por
          </KdsSecureFooter>
        </KdsCardBody>
      </KdsCard>
    </div>
  ),
};

/** Comparativa visual de ambas variantes. */
export const AllVariants: Story = {
  render: function AllFooterVariants() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: '#666' }}>
            Variante <code>default</code> (visible en desktop, oculto en mobile)
          </p>
          <KdsSecureFooter>Pago seguro procesado por</KdsSecureFooter>
        </div>
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: '#666' }}>
            Variante <code>inside</code> (visible en mobile, oculto en desktop)
          </p>
          <KdsSecureFooter variant="inside">
            Pago seguro procesado por
          </KdsSecureFooter>
        </div>
      </div>
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML — par responsive (renderizar ambas instancias en la página).
 * Candado SVG + label + logo Khipu a color (`khipu-logo.svg`), igual que `mat:secureFooter`:
 * ```html
 * <!-- Dentro de la card (visible en mobile <768px) -->
 * <p class="kds-secure-footer inside">
 *   <svg class="kds-secure-footer-lock" viewBox="0 0 24 24" aria-hidden="true">
 *     <rect x="4.5" y="10.5" width="15" height="10" rx="2.25"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>
 *   </svg>
 *   Pago seguro procesado por
 *   <img class="khipu-mark" src="khipu-logo.svg" alt="Khipu"/>
 * </p>
 *
 * <!-- Fuera de la card (visible en desktop ≥768px) -->
 * <p class="kds-secure-footer">
 *   <svg class="kds-secure-footer-lock" viewBox="0 0 24 24" aria-hidden="true">
 *     <rect x="4.5" y="10.5" width="15" height="10" rx="2.25"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>
 *   </svg>
 *   Pago seguro procesado por
 *   <img class="khipu-mark" src="khipu-logo.svg" alt="Khipu"/>
 * </p>
 * ```
 *
 * En React: `<KdsSecureFooter variant="inside"/>` dentro de la card +
 * `<KdsSecureFooter/>` fuera. El componente React renderiza `<footer>` en vez
 * de `<p>`, pero las clases `kds-secure-footer` / `kds-secure-footer.inside`
 * son la fuente de verdad y funcionan sobre cualquier element.
 *
 * Ver `Patterns/CSS-only → SecureFooter` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<!-- Dentro de la card (visible en mobile <768px) -->
<p class="kds-secure-footer inside">
  <svg class="kds-secure-footer-lock" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.25"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>
  </svg>
  Pago seguro procesado por
  <img class="khipu-mark" src="khipu-logo.svg" alt="Khipu"/>
</p>

<!-- Fuera de la card (visible en desktop ≥768px) -->
<p class="kds-secure-footer">
  <svg class="kds-secure-footer-lock" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="4.5" y="10.5" width="15" height="10" rx="2.25"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/>
  </svg>
  Pago seguro procesado por
  <img class="khipu-mark" src="khipu-logo.svg" alt="Khipu"/>
</p>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <p className="kds-secure-footer inside">
        <svg className="kds-secure-footer-lock" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4.5" y="10.5" width="15" height="10" rx="2.25" />
          <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
        </svg>
        Pago seguro procesado por
        <img className="khipu-mark" src={khipuLogo} alt="Khipu" />
      </p>
      <p className="kds-secure-footer">
        <svg className="kds-secure-footer-lock" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4.5" y="10.5" width="15" height="10" rx="2.25" />
          <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
        </svg>
        Pago seguro procesado por
        <img className="khipu-mark" src={khipuLogo} alt="Khipu" />
      </p>
    </div>
  ),
};
