import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsCardSelector } from './KdsCardSelector';

const meta: Meta<typeof KdsCardSelector> = {
  title: 'Domain/KdsCardSelector',
  component: KdsCardSelector,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selected: { control: 'boolean' },
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
