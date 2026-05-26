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
      options: ['success', 'pending', 'warn', 'error', 'info'],
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
    icon: 'close',
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

/**
 * Status info — versión inline (alineada a la izquierda).
 *
 * Usado en pantallas NotPaying, ReportPaid, ReportAbuse de payment.
 *
 * @spec icono `info_i` solo (sin círculo / sin border / sin background), color info-main.
 * @gsp notPayingMaterial.gsp, reportPaidMaterial.gsp, reportAbuseMaterial.gsp
 */
export const Info: Story = {
  args: {
    status: 'info',
    icon: 'info_i',
    title: '¿Ya realizaste el pago?',
    description: 'Cuéntanos para investigar lo ocurrido.',
    inline: true,
  },
};

/**
 * Status info — versión centrada (sin `inline`).
 *
 * @spec icono `info_i` centrado horizontalmente sobre el título, sin círculo de fondo, color info-main.
 */
export const InfoCentered: Story = {
  args: {
    status: 'info',
    icon: 'info_i',
    title: '¿Ya realizaste el pago?',
    description: 'Cuéntanos para investigar lo ocurrido.',
  },
};

export const AllStatuses: Story = {
  render: function AllStatusesBlock() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
        <KdsStatusBlock status="success" icon="check" title="Pago verificado" description="La transferencia fue recibida correctamente." />
        <KdsStatusBlock status="pending" title="Pago en verificación" description="Estamos confirmando la recepción de tu transferencia." />
        <KdsStatusBlock status="warn" icon="warning" title="Pago pendiente" description="La transferencia aún no ha sido confirmada." />
        <KdsStatusBlock status="error" icon="close" title="Pago rechazado" description="No se pudo verificar la transferencia." />
      </div>
    );
  },
};
