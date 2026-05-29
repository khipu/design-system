import type { Meta, StoryObj } from '@storybook/react';
import { KdsButton } from './KdsButton';

const meta: Meta<typeof KdsButton> = {
  title: 'Core/KdsButton',
  component: KdsButton,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '300px' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outlined', 'outlined-white', 'text', 'success'],
    },
    size: { control: 'select', options: [undefined, 'sm', 'md'] },
  },
};

export default meta;
type Story = StoryObj<typeof KdsButton>;

export const Primary: Story = {
  args: { variant: 'primary', children: 'Continuar' },
};

export const Secondary: Story = {
  args: { variant: 'secondary', children: 'Secundario' },
};

export const Outlined: Story = {
  args: { variant: 'outlined', children: 'Cancelar' },
};

export const Text: Story = {
  args: { variant: 'text', children: 'Ver más' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Finalizar' },
};

export const WithStartIcon: Story = {
  args: { variant: 'outlined', startIcon: 'download', children: 'Descargar comprobante' },
};

/**
 * Con icon DESPUÉS del texto (`endIcon`).
 *
 * @spec El icon se renderiza dentro de `<span class="kds-icon">` después del label.
 * Tamaño del icon controlado por `var(--kds-spacing-button-icon-size)`.
 */
export const WithEndIcon: Story = {
  args: { variant: 'primary', endIcon: 'arrow_forward', children: 'Continuar' },
};

/** Con startIcon Y endIcon — botón con flujo direccional. */
export const WithBothIcons: Story = {
  args: {
    variant: 'outlined',
    startIcon: 'arrow_back',
    endIcon: 'arrow_forward',
    children: 'Siguiente paso',
  },
};

export const FullWidth: Story = {
  args: { variant: 'primary', fullWidth: true, children: 'Continuar' },
  decorators: [
    (Story) => (
      <div style={{ width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export const Loading: Story = {
  args: { variant: 'primary', loading: true, children: 'Procesando' },
};

export const Small: Story = {
  args: { variant: 'primary', size: 'sm', children: 'Pequeño' },
};

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true, children: 'Deshabilitado' },
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML — botón standalone:
 * ```html
 * <button class="kds-btn kds-btn-primary"><span>Pagar $3.300</span></button>
 * ```
 *
 * Variantes: `kds-btn-secondary`, `kds-btn-outlined`, `kds-btn-outlined-white`,
 * `kds-btn-text`, `kds-btn-success`. Modificadores: `kds-btn-sm` (size),
 * `kds-btn-block` (full width).
 *
 * **Apilado vertical (CTA stack)** — patrón canónico para pie de card:
 * ```html
 * <div class="kds-btn-stack">
 *   <button class="kds-btn kds-btn-primary kds-btn-block"><span>Pagar $3.300</span></button>
 *   <button class="kds-btn kds-btn-outlined kds-btn-block"><span>Cancelar</span></button>
 * </div>
 * ```
 *
 * Ver `Patterns/CSS-only → ButtonStack` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  decorators: [(Story) => <div style={{ width: '100%' }}><Story /></div>],
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<!-- Botón standalone -->
<button class="kds-btn kds-btn-primary"><span>Pagar $3.300</span></button>

<!-- Apilado vertical (CTA stack) -->
<div class="kds-btn-stack">
  <button class="kds-btn kds-btn-primary kds-btn-block"><span>Pagar $3.300</span></button>
  <button class="kds-btn kds-btn-outlined kds-btn-block"><span>Cancelar</span></button>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400, padding: 16, background: 'white' }}>
      <button className="kds-btn kds-btn-primary" style={{ marginBottom: 16 }}>
        <span>Pagar $3.300</span>
      </button>
      <div className="kds-btn-stack">
        <button className="kds-btn kds-btn-primary kds-btn-block">
          <span>Pagar $3.300</span>
        </button>
        <button className="kds-btn kds-btn-outlined kds-btn-block">
          <span>Cancelar</span>
        </button>
      </div>
    </div>
  ),
};
