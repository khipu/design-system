import type { Meta, StoryObj } from '@storybook/react';
import { KdsTooltip } from './KdsTooltip';
import { KdsButton } from '../KdsButton';

const meta: Meta<typeof KdsTooltip> = {
  title: 'Core/KdsTooltip',
  component: KdsTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof KdsTooltip>;

/**
 * Tooltip basico que aparece al pasar el cursor sobre un boton.
 */
export const Default: Story = {
  render: function DefaultTooltip() {
    return (
      <KdsTooltip content="Informacion adicional">
        <KdsButton variant="outlined">Hover aqui</KdsButton>
      </KdsTooltip>
    );
  },
};

/**
 * Ejemplo de tooltip en las cuatro posiciones posibles.
 */
export const Placements: Story = {
  render: function TooltipPlacements() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, auto)',
          gap: '16px',
          alignItems: 'center',
          justifyItems: 'center',
          padding: '48px',
        }}
      >
        <div />
        <KdsTooltip content="Arriba" placement="top">
          <KdsButton variant="outlined">Top</KdsButton>
        </KdsTooltip>
        <div />

        <KdsTooltip content="Izquierda" placement="left">
          <KdsButton variant="outlined">Left</KdsButton>
        </KdsTooltip>
        <div />
        <KdsTooltip content="Derecha" placement="right">
          <KdsButton variant="outlined">Right</KdsButton>
        </KdsTooltip>

        <div />
        <KdsTooltip content="Abajo" placement="bottom">
          <KdsButton variant="outlined">Bottom</KdsButton>
        </KdsTooltip>
        <div />
      </div>
    );
  },
};

/**
 * Tooltip sobre un boton de icono.
 */
export const WithIcon: Story = {
  render: function TooltipWithIcon() {
    return (
      <KdsTooltip content="Copiar al portapapeles">
        <button
          style={{
            background: 'none',
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i className="material-symbols-outlined">content_copy</i>
        </button>
      </KdsTooltip>
    );
  },
};
