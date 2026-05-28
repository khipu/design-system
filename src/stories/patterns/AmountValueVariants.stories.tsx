import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Amount-value color variants — modificador BEM `--info` opt-in.
 *
 * El default de `.kds-amount-value` queda igual (color: text primary). Para flujos
 * de transferencia/QR en LigoPay, el monto se renderiza en khipu-blue (#5A5FE0)
 * vía el modificador `kds-amount-value--info`.
 */
const meta: Meta = {
  title: 'Patterns/AmountValueVariants',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Modificador opt-in de color para `.kds-amount-value`. Default usa `--kds-color-text-primary`; `--info` lo cambia a `--kds-color-info-blue` (#5A5FE0) para pantallas QR/transfer LigoPay.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const wrapStyle: React.CSSProperties = {
  display: 'grid',
  gap: 'var(--kds-spacing-4)',
};

/** Default — color texto primario. */
export const Default: Story = {
  render: () => (
    <div className="kds-amount" style={wrapStyle}>
      <span className="kds-amount-label">Monto a pagar</span>
      <span className="kds-amount-value">S/ 323.32</span>
    </div>
  ),
};

/** Info — khipu-blue (#5A5FE0) para flujos LigoPay. */
export const Info: Story = {
  render: () => (
    <div className="kds-amount" style={wrapStyle}>
      <span className="kds-amount-label">Monto a pagar</span>
      <span className="kds-amount-value kds-amount-value--info">S/ 323.32</span>
    </div>
  ),
};

/** Lado a lado para comparar default vs info. */
export const Comparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--kds-spacing-5)', maxWidth: 320 }}>
      <div className="kds-amount">
        <span className="kds-amount-label">Default</span>
        <span className="kds-amount-value">S/ 323.32</span>
      </div>
      <div className="kds-amount">
        <span className="kds-amount-label">Info (khipu-blue)</span>
        <span className="kds-amount-value kds-amount-value--info">S/ 323.32</span>
      </div>
    </div>
  ),
};
