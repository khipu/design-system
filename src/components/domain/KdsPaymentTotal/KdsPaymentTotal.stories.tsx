import type { Meta, StoryObj } from '@storybook/react';
import { KdsPaymentTotal } from './KdsPaymentTotal';

/**
 * KdsPaymentTotal — bloque de "monto a pagar" usado en pantallas QR y emails de cobro.
 *
 * Portado desde el taglib `<kh:paymentTotal>` de paylink-ligopay
 * (`KhipuTagLib.groovy:131-177`).
 *
 * **Variantes:**
 * - `default`: amount grande en color primario Khipu (QR view).
 * - `email`: amount compacto en color de texto primario (templates email).
 *
 * **Responsive (default):**
 * - Desktop: padding-left, title visible, alineación izquierda.
 * - Mobile (≤ 1024px): centrado, sólo titleMobile visible.
 *
 * **Decimal:** la parte tras el `.` se renderiza como `<sup>` con 0.5em.
 */
const meta: Meta<typeof KdsPaymentTotal> = {
  title: 'Domain/KdsPaymentTotal',
  component: KdsPaymentTotal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Bloque de "monto a pagar" para QR view y email. Variantes `default` (purple, 3rem) y `email` (text-primary, 1.5rem). Mobile (≤ 1024px) centra y oculta el title desktop. Decimales como `<sup>` (0.5em).',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'inline-radio',
      options: ['default', 'email'],
      description: 'Variante visual.',
    },
    amount: {
      control: 'text',
      description: 'Monto. String (e.g. `"1500.50"`) o number.',
    },
    currency: { control: 'text', description: 'Símbolo moneda. Default `"S/"`.' },
    decimals: {
      control: { type: 'number', min: 0, max: 4, step: 1 },
      description: 'Decimales (0 oculta el sup).',
    },
    locale: { control: 'text', description: 'BCP-47 locale para Intl.NumberFormat.' },
    label: { control: 'text', description: 'Etiqueta sobre el monto.' },
    title: { control: 'text', description: 'Título desktop (sólo variant default).' },
    titleMobile: { control: 'text', description: 'Título mobile (sólo variant default).' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsPaymentTotal>;

/** Variante QR con decimales (caso de uso principal). */
export const Default: Story = {
  args: {
    amount: '1500.50',
  },
};

/** Variante QR sin decimales — monto entero. */
export const DefaultNoDecimals: Story = {
  args: {
    amount: '250',
    decimals: 0,
  },
};

/** Variante email — amount compacto, color texto primario, sin títulos. */
export const Email: Story = {
  args: {
    variant: 'email',
    amount: '1500.50',
  },
};

/** Email sin decimales. */
export const EmailNoDecimals: Story = {
  args: {
    variant: 'email',
    amount: '250',
    decimals: 0,
  },
};

/** Amount grande — verifica overflow/wrap con miles. */
export const LongAmount: Story = {
  args: {
    amount: 1234567.89,
    locale: 'es-PE',
  },
};

/**
 * Layout mobile (≤ 1024px). El título desktop desaparece y aparece `titleMobile`,
 * todo centrado. Verifica visualmente que el CSS responsive funciona.
 */
export const MobileLayout: Story = {
  parameters: { viewport: { defaultViewport: 'mobile1' } },
  args: {
    amount: '1500.50',
  },
};

/** Símbolo de moneda custom (e.g. dólar). */
export const WithCustomCurrency: Story = {
  args: {
    amount: 1500.5,
    currency: '$',
    locale: 'en-US',
  },
};

/** Acepta number — el componente formatea con `Intl.NumberFormat`. */
export const NumericAmount: Story = {
  args: {
    amount: 1500.5,
    locale: 'es-PE',
  },
};

/**
 * Lado a lado: muestra ambas variantes con el mismo monto para comparar tamaños y color.
 */
export const VariantsComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 32, padding: 24 }}>
      <div>
        <p style={{ margin: '0 0 8px', color: 'var(--kds-color-text-secondary)' }}>
          variant="default"
        </p>
        <KdsPaymentTotal amount="1500.50" />
      </div>
      <div>
        <p style={{ margin: '0 0 8px', color: 'var(--kds-color-text-secondary)' }}>
          variant="email"
        </p>
        <KdsPaymentTotal variant="email" amount="1500.50" />
      </div>
    </div>
  ),
};
