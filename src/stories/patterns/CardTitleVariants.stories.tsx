import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Card title size variants — modificadores BEM `--lg` y `--xl` opt-in.
 *
 * El default de `.kds-card-title` (16/600) se mantiene intacto para no romper
 * pantallas existentes en `payment`. LigoPay pidió tamaños mayores para action-cards
 * (handoff): `--lg` (20/700) y `--xl` (24/700).
 */
const meta: Meta = {
  title: 'Patterns/CardTitleVariants',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Modificadores opt-in de tamaño para `.kds-card-title`. El default es 16/600. Para títulos de action-cards más prominentes usa `--lg` (20/700) o `--xl` (24/700).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const wrapStyle: React.CSSProperties = {
  display: 'grid',
  gap: 'var(--kds-spacing-3)',
  maxWidth: 480,
};

/** Default — 16px / 600 (sin modificador). */
export const Default: Story = {
  render: () => (
    <div style={wrapStyle}>
      <h2 className="kds-card-title">Espera un momento — default (16/600)</h2>
    </div>
  ),
};

/** Large — `kds-card-title--lg` → 20px / 700. */
export const Large: Story = {
  render: () => (
    <div style={wrapStyle}>
      <h2 className="kds-card-title kds-card-title--lg">Ingresa tu email — large (20/700)</h2>
    </div>
  ),
};

/** Extra-large — `kds-card-title--xl` → 24px / 700. */
export const XLarge: Story = {
  render: () => (
    <div style={wrapStyle}>
      <h2 className="kds-card-title kds-card-title--xl">Escanea el QR — xl (24/700)</h2>
    </div>
  ),
};

/** Las tres lado a lado para comparar la jerarquía. */
export const Comparison: Story = {
  render: () => (
    <div style={wrapStyle}>
      <h2 className="kds-card-title">Default (16/600)</h2>
      <h2 className="kds-card-title kds-card-title--lg">Large (20/700)</h2>
      <h2 className="kds-card-title kds-card-title--xl">XL (24/700)</h2>
    </div>
  ),
};
