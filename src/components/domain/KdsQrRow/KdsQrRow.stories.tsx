import type { Meta, StoryObj } from '@storybook/react';
import { KdsQrRow } from './KdsQrRow';

/**
 * KdsQrRow — fila destacada para pago por QR / billetera digital con gradient bg.
 *
 * Layout & sizing (spec):
 * - `padding: 14px` (`var(--kds-spacing-1-75)`)
 * - `gap: 14px` entre avatar, texto, badge y chevron
 * - Avatar `40 x 40` (`var(--kds-status-icon-size-sm)`) — circular con gradient primary
 * - Background gradient: `var(--kds-qr-bg-gradient)` (purple soft → white)
 * - Border: `1px solid var(--kds-qr-border)` con hover `var(--kds-qr-border-hover)`
 * - Shadow: `var(--kds-qr-shadow)` (subtle primary) — hover `var(--kds-qr-shadow-hover)`
 *
 * Tipografía:
 * - Title: `font-size: var(--kds-font-size-sm)`, `font-weight: 600`, `letter-spacing: -0.15px`
 * - Sub: `font-size: var(--kds-font-size-caption)`, `color: text-secondary`
 *
 * Badge:
 * - `padding: 3px 7px`, `font-size: 10px`, `font-weight: 600`, `text-transform: uppercase`
 * - `letter-spacing: 0.4px`, `background: var(--kds-qr-badge-bg)` (primary-main), `color: white`
 * - Border-radius: pill
 *
 * Responsive:
 * - Mobile (`max-width: 480px`): padding y gap se reducen a `12px`
 *
 * @gsp `nave` / `ligopay` paths en `_choosePaymentMethodFormMaterial.gsp` (cuando el método es QR externo)
 * @css .kds-qr-row, .kds-qr-avatar, .kds-qr-text, .kds-qr-badge
 */
const meta: Meta<typeof KdsQrRow> = {
  title: 'Domain/KdsQrRow',
  component: KdsQrRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Fila destacada para QR/billetera. Padding 14px, gap 14px, avatar 40×40 con gradient primary, title sm/600/-0.15px tracking, sub caption text-secondary. Badge pill 10px uppercase. Hover eleva shadow. Mobile (<480px) reduce padding/gap a 12px.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Title principal (ej: "Pagar escaneando QR").' },
    description: { control: 'text', description: 'Sublabel opcional bajo el title.' },
    badge: { control: 'text', description: 'Texto del badge pill (ej: "Rápido"). Mayúsculas vía CSS.' },
    icon: {
      control: 'select',
      options: ['qr_code_2', 'account_balance_wallet', 'smartphone', 'contactless'],
      description: 'Material Symbol del avatar. Default: `qr_code_2`.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsQrRow>;

/** Caso mínimo: solo title + avatar QR default. */
export const Default: Story = {
  args: { name: 'Pagar escaneando QR' },
};

/** Con sublabel descriptivo. */
export const WithDescription: Story = {
  args: {
    name: 'Pagar escaneando QR',
    description: 'Escanea con la app de tu banco',
  },
};

/** Con badge pill (típicamente "Rápido" o "Nuevo"). */
export const WithBadge: Story = {
  args: {
    name: 'Pagar escaneando QR',
    description: 'Escanea con la app de tu banco',
    badge: 'Rápido',
  },
};

/** Icon personalizado del avatar (ej: billetera digital). */
export const CustomIcon: Story = {
  args: {
    name: 'Pagar con billetera digital',
    icon: 'account_balance_wallet',
  },
};

/**
 * Variante en contenedor angosto — verifica que el row aguanta containers chicos
 * (mobile viewport o decorator con maxWidth ≤ 360px) sin wrap del subtitle.
 *
 * @spec El subtitle (`.kds-qr-subtitle`) trunca con ellipsis cuando no cabe, manteniendo la
 * altura del row a una sola línea. Avatar, badge y chevron tienen `flex-shrink: 0`.
 */
export const Mobile: Story = {
  args: {
    name: 'Pagar escaneando QR',
    description: 'Escanea con la app de tu banco',
    badge: 'Rápido',
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    docs: {
      description: {
        story:
          'En contenedores angostos, el subtitle trunca con ellipsis (en vez de wrap a 2 líneas) para mantener el row compacto. Avatar/badge/chevron mantienen su tamaño con `flex-shrink: 0`.',
      },
    },
  },
  decorators: [(Story) => <div style={{ maxWidth: 360 }}><Story /></div>],
};

/** Galería de variantes para verificación visual. */
export const AllVariants: Story = {
  render: function AllQrRows() {
    return (
      <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <KdsQrRow name="Pagar escaneando QR" />
        <KdsQrRow
          name="Pagar escaneando QR"
          description="Escanea con la app de tu banco"
        />
        <KdsQrRow
          name="Pagar escaneando QR"
          description="Escanea con la app de tu banco"
          badge="Rápido"
        />
        <KdsQrRow
          name="Pagar con billetera digital"
          icon="account_balance_wallet"
        />
      </div>
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML:
 * ```html
 * <button type="button" class="kds-qr-row">
 *   <span class="kds-qr-avatar" aria-hidden="true">
 *     <i class="material-symbols-outlined">qr_code_2</i>
 *   </span>
 *   <span class="kds-qr-text">
 *     <span class="kds-qr-title">Pagar escaneando QR</span>
 *     <span class="kds-qr-subtitle">Apunta tu app bancaria al código</span>
 *   </span>
 *   <span class="kds-qr-badge">Rápido</span>
 *   <i class="material-symbols-outlined">chevron_right</i>
 * </button>
 * ```
 *
 * Ver `Patterns/CSS-only → QrRow` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<button type="button" class="kds-qr-row">
  <span class="kds-qr-avatar" aria-hidden="true">
    <i class="material-symbols-outlined">qr_code_2</i>
  </span>
  <span class="kds-qr-text">
    <span class="kds-qr-title">Pagar escaneando QR</span>
    <span class="kds-qr-subtitle">Apunta tu app bancaria al código</span>
  </span>
  <span class="kds-qr-badge">Rápido</span>
  <i class="material-symbols-outlined">chevron_right</i>
</button>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <button type="button" className="kds-qr-row">
        <span className="kds-qr-avatar" aria-hidden="true">
          <i className="material-symbols-outlined">qr_code_2</i>
        </span>
        <span className="kds-qr-text">
          <span className="kds-qr-title">Pagar escaneando QR</span>
          <span className="kds-qr-subtitle">Apunta tu app bancaria al código</span>
        </span>
        <span className="kds-qr-badge">Rápido</span>
        <i className="material-symbols-outlined">chevron_right</i>
      </button>
    </div>
  ),
};
