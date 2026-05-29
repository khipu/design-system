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

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-status-block" data-status="success">
 *   <div class="kds-status-block-icon">
 *     <i class="material-symbols-outlined">check</i>
 *   </div>
 *   <div>
 *     <h2 class="kds-status-block-title">Pago confirmado</h2>
 *     <p class="kds-status-block-description">Recibirás el comprobante en tu correo.</p>
 *   </div>
 * </div>
 * ```
 *
 * Ver `Patterns/CSS-only → StatusBlock` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-status-block" data-status="success">
  <div class="kds-status-block-icon">
    <i class="material-symbols-outlined">check</i>
  </div>
  <div>
    <h2 class="kds-status-block-title">Pago confirmado</h2>
    <p class="kds-status-block-description">
      Recibirás el comprobante en tu correo.
    </p>
  </div>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-status-block" data-status="success">
        <div className="kds-status-block-icon">
          <i className="material-symbols-outlined">check</i>
        </div>
        <div>
          <h2 className="kds-status-block-title">Pago confirmado</h2>
          <p className="kds-status-block-description">
            Recibirás el comprobante en tu correo.
          </p>
        </div>
      </div>
    </div>
  ),
};
