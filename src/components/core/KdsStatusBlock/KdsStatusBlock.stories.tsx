import type { Meta, StoryObj } from '@storybook/react';
import { KdsStatusBlock } from './KdsStatusBlock';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsStatusBlock> = {
  title: 'Core/KdsStatusBlock',
  component: KdsStatusBlock,
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'pending', 'warn', 'error'],
    },
    inline: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsStatusBlock>;

export const Default: Story = {
  args: {
    status: 'success',
    icon: 'check',
    title: 'Pago verificado',
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
    title: 'Pago en verificación',
    inline: true,
  },
};

export const Warning: Story = {
  args: {
    status: 'warn',
    icon: 'warning',
    title: 'Pago pendiente',
    description: 'La transferencia aún no ha sido confirmada.',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    icon: 'error',
    title: 'Pago rechazado',
    description: 'No se pudo verificar la transferencia.',
  },
};

export const Inline: Story = {
  args: {
    status: 'success',
    icon: 'check',
    title: 'Pago verificado',
    inline: true,
  },
};

export const AllStatuses: Story = {
  render: function AllStatusesBlock() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
        <KdsStatusBlock status="success" icon="check" title="Pago verificado" description="La transferencia fue recibida correctamente." />
        <KdsStatusBlock status="pending" icon="schedule" title="Pago en verificación" description="Estamos confirmando la recepción de tu transferencia." />
        <KdsStatusBlock status="warn" icon="warning" title="Pago pendiente" description="La transferencia aún no ha sido confirmada." />
        <KdsStatusBlock status="error" icon="error" title="Pago rechazado" description="No se pudo verificar la transferencia." />
      </div>
    );
  },
};
