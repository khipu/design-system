import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsAlert } from './KdsAlert';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsAlert> = {
  title: 'Core/KdsAlert',
  component: KdsAlert,
  tags: ['autodocs'],
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
    },
    inline: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsAlert>;

export const Default: Story = {
  args: {
    severity: 'info',
    children: 'El tope mensual corresponde al monto máximo posible a cobrar.',
  },
};

export const Success: Story = {
  args: {
    severity: 'success',
    children: 'El pago ha sido verificado exitosamente.',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    children: 'La transferencia está pendiente de verificación.',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    children: 'Ha ocurrido un error al procesar tu pago.',
  },
};

export const WithTitle: Story = {
  args: {
    severity: 'success',
    title: '¡Todo listo!',
    children: 'Espera la confirmación por parte de tu banco.',
  },
};

export const Inline: Story = {
  args: {
    severity: 'warning',
    inline: true,
    children:
      'La transferencia ya fue realizada. Ahora estamos verificando la recepción del pago.',
  },
};

export const Closable: Story = {
  render: function ClosableAlert() {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button
          className="kds-btn kds-btn-outlined kds-btn-sm"
          onClick={() => setVisible(true)}
        >
          Mostrar alerta
        </button>
      );
    }

    return (
      <KdsAlert severity="info" onClose={() => setVisible(false)}>
        Tu sesión expirará en 5 minutos. Guarda tus cambios antes de continuar.
      </KdsAlert>
    );
  },
};

export const AllSeverities: Story = {
  render: function AllSeveritiesAlert() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
        <KdsAlert severity="info">
          El tope mensual corresponde al monto máximo posible a cobrar.
        </KdsAlert>
        <KdsAlert severity="success">
          El pago ha sido verificado exitosamente.
        </KdsAlert>
        <KdsAlert severity="warning">
          La transferencia está pendiente de verificación.
        </KdsAlert>
        <KdsAlert severity="error">
          Ha ocurrido un error al procesar tu pago.
        </KdsAlert>
      </div>
    );
  },
};
