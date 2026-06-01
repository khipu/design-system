import type { Meta, StoryObj } from '@storybook/react';
import { KdsSecureFooter } from './KdsSecureFooter';
import { KdsCard, KdsCardBody } from '../../core/KdsCard';

/**
 * KdsSecureFooter — footer "Pago seguro con Khipu" con icon lock.
 *
 * Layout & sizing (spec):
 * - `display: flex; align-items: center; justify-content: center`
 * - `gap: 4px` (`var(--kds-spacing-0-5)`)
 * - `padding: 8px 0` (vertical only)
 * - `font-size: var(--kds-font-size-xs)`
 * - `color: var(--kds-color-gray-400)`
 * - `letter-spacing: var(--kds-letter-spacing-wide)`
 *
 * Iconos:
 * - Lock: Material Symbols `lock`, `12px`
 * - Khipu mark: SVG inline opcional (en CSS `.kds-secure-footer-lock`), `11px`
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
          'Footer "Pago seguro con Khipu". `font xs, color gray-400, gap 4px, padding 8px 0, letter-spacing wide`. Variante `default` visible solo en desktop (≥768px); variante `inside` visible solo en mobile (dentro de cards). Combinar ambas en el mismo flow garantiza visibilidad en cualquier viewport. Compose: poné `<KdsSecureFooter variant="inside"/>` como último hijo de la `KdsCard` y `<KdsSecureFooter/>` fuera de la card. Ver `Patterns/CSS-only → SecureFooter`.',
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
    children: 'Pago seguro procesado por Khipu',
  },
};

/** Inside — variante para usar dentro de `KdsCard`, visible en mobile <768px. */
export const InsideVariant: Story = {
  args: {
    variant: 'inside',
    children: 'Pago seguro procesado por Khipu',
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
    children: 'Transacción protegida por Khipu',
  },
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
            Pago seguro procesado por Khipu
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
          <KdsSecureFooter>Pago seguro procesado por Khipu</KdsSecureFooter>
        </div>
        <div>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.875rem', color: '#666' }}>
            Variante <code>inside</code> (visible en mobile, oculto en desktop)
          </p>
          <KdsSecureFooter variant="inside">
            Pago seguro procesado por Khipu
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
 * Contrato HTML — par responsive (renderizar ambas instancias en la página):
 * ```html
 * <!-- Dentro de la card (visible en mobile <768px) -->
 * <p class="kds-secure-footer inside">
 *   <i class="material-symbols-outlined">lock</i> Pago seguro procesado por Khipu
 * </p>
 *
 * <!-- Fuera de la card (visible en desktop ≥768px) -->
 * <p class="kds-secure-footer">
 *   <i class="material-symbols-outlined">lock</i> Pago seguro procesado por Khipu
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
  <i class="material-symbols-outlined">lock</i> Pago seguro procesado por Khipu
</p>

<!-- Fuera de la card (visible en desktop ≥768px) -->
<p class="kds-secure-footer">
  <i class="material-symbols-outlined">lock</i> Pago seguro procesado por Khipu
</p>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <p className="kds-secure-footer inside">
        <i className="material-symbols-outlined">lock</i> Pago seguro procesado por Khipu
      </p>
      <p className="kds-secure-footer">
        <i className="material-symbols-outlined">lock</i> Pago seguro procesado por Khipu
      </p>
    </div>
  ),
};
