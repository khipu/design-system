import type { Meta, StoryObj } from '@storybook/react';
import { KdsQrRow } from './KdsQrRow';

const meta: Meta<typeof KdsQrRow> = {
  title: 'Domain/KdsQrRow',
  component: KdsQrRow,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsQrRow>;

export const Default: Story = {
  args: { name: 'Pagar escaneando QR' },
};

export const WithDescription: Story = {
  args: {
    name: 'Pagar escaneando QR',
    description: 'Escanea con la app de tu banco',
  },
};

export const WithBadge: Story = {
  args: {
    name: 'Pagar escaneando QR',
    description: 'Escanea con la app de tu banco',
    badge: 'Rapido',
  },
};

export const CustomIcon: Story = {
  args: {
    name: 'Pagar con billetera digital',
    icon: 'account_balance_wallet',
  },
};

export const AllVariants: Story = {
  render: function AllQrRows() {
    return (
      <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column' }}>
        <KdsQrRow name="Pagar escaneando QR" />
        <KdsQrRow
          name="Pagar escaneando QR"
          description="Escanea con la app de tu banco"
        />
        <KdsQrRow
          name="Pagar escaneando QR"
          description="Escanea con la app de tu banco"
          badge="Rapido"
        />
        <KdsQrRow
          name="Pagar con billetera digital"
          icon="account_balance_wallet"
        />
      </div>
    );
  },
};
