import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsCardSelector } from './KdsCardSelector';

/**
 * KdsCardSelector — card grande clickeable con icon + título + descripción para selección de método.
 *
 * Layout & sizing (spec):
 * - `padding: 24px` (`var(--kds-spacing-3)`)
 * - `border: 2px solid var(--kds-border-light)`
 * - `border-radius: var(--kds-radius-md)`
 * - `text-align: left`, `cursor: pointer`
 * - `display: flex; flex-direction: column`
 *
 * Icon container (`.kds-card-selector-icon`):
 * - `48 x 48`, `border-radius: 8px`, `margin-bottom: 16px`
 * - `background: var(--kds-color-primary-focus)` (rgba primary 12%)
 * - Icon i: `24 x 24`, `color: var(--kds-color-primary-main)`
 *
 * Title (`.kds-card-selector-title`):
 * - `font-size: 16px`, `font-weight: 600`, `margin-bottom: 8px`
 * - `color: var(--kds-color-text-primary)`
 *
 * Description (`.kds-card-selector-description`):
 * - `font-size: 14px`, `line-height: 1.5`
 * - `color: var(--kds-color-text-secondary)`
 *
 * Estados:
 * - Hover: `border-color: #D1D5DB` (gray-300)
 * - **Selected** (fix Fase 1): `border-color: var(--kds-color-primary-main)` + `background: var(--kds-color-primary-faint)` + `box-shadow: var(--kds-shadow-md)`
 *
 * @css .kds-card-selector, .kds-card-selector-icon, .kds-card-selector-title, .kds-card-selector-description, .kds-card-selector.selected
 */
const meta: Meta<typeof KdsCardSelector> = {
  title: 'Domain/KdsCardSelector',
  component: KdsCardSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Card grande clickeable para selección de método (típicamente pagos). Padding 24px, border 2px, radius md. Icon container 48×48 con bg primary-focus (12% purple). Title 16px/600, description 14px text-secondary. Estado `selected` aplica border + bg primary-main/primary-faint (corregido en Fase 1: antes usaba azul Material).',
      },
    },
  },
  argTypes: {
    selected: { control: 'boolean', description: 'Aplica border + background primary y shadow-md.' },
    title: { control: 'text', description: 'Título principal (16px semibold).' },
    description: { control: 'text', description: 'Descripción opcional (14px text-secondary).' },
    icon: { control: 'text', description: 'Material Symbol del icon container.' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsCardSelector>;

/**
 * Tarjeta de seleccion para un metodo de pago.
 */
export const Default: Story = {
  args: {
    title: 'Transferencia bancaria',
    description: 'Paga directamente desde tu banco',
    icon: 'account_balance',
  },
};

/**
 * Tarjeta en estado seleccionado.
 */
export const Selected: Story = {
  args: {
    title: 'Transferencia bancaria',
    description: 'Paga directamente desde tu banco',
    icon: 'account_balance',
    selected: true,
  },
};

/**
 * Selector de metodo de pago interactivo con tres opciones.
 */
export const PaymentMethodSelector: Story = {
  render: function PaymentMethodSelectorExample() {
    const [selected, setSelected] = useState<string | null>(null);

    const methods = [
      {
        id: 'transfer',
        title: 'Transferencia bancaria',
        description: 'Paga directamente desde tu banco',
        icon: 'account_balance',
      },
      {
        id: 'qr',
        title: 'Codigo QR',
        description: 'Escanea y paga desde tu app',
        icon: 'qr_code_2',
      },
      {
        id: 'card',
        title: 'Tarjeta de credito',
        description: 'Visa, Mastercard o American Express',
        icon: 'credit_card',
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: 320 }}>
        {methods.map((method) => (
          <KdsCardSelector
            key={method.id}
            title={method.title}
            description={method.description}
            icon={method.icon}
            selected={selected === method.id}
            onClick={() => setSelected(method.id)}
          />
        ))}
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
 * <button type="button" class="kds-card-selector selected">
 *   <span class="kds-card-selector-icon">
 *     <i class="material-symbols-outlined">credit_card</i>
 *   </span>
 *   <span class="kds-card-selector-title">Tarjeta de crédito</span>
 *   <span class="kds-card-selector-description">Pago instantáneo, sin necesidad de cuenta bancaria.</span>
 * </button>
 * ```
 *
 * Ver `Patterns/CSS-only → CardSelector` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  render: () => (
    <div style={{ maxWidth: 400 }}>
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
