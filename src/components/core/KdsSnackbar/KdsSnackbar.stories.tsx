import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsSnackbar } from './KdsSnackbar';
import { KdsButton } from '../KdsButton';

const meta: Meta<typeof KdsSnackbar> = {
  title: 'Core/KdsSnackbar',
  component: KdsSnackbar,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof KdsSnackbar>;

/**
 * Snackbar de exito.
 */
export const Success: Story = {
  args: {
    message: 'Datos copiados al portapapeles',
    type: 'success',
    duration: 99999,
  },
};

/**
 * Snackbar de error.
 */
export const Error: Story = {
  args: {
    message: 'Error al procesar el pago',
    type: 'error',
    duration: 99999,
  },
};

/**
 * Snackbar informativo.
 */
export const Info: Story = {
  args: {
    message: 'Verificando transferencia...',
    type: 'info',
    duration: 99999,
  },
};

/**
 * Snackbar activado con un boton, se cierra automaticamente o con el boton de cerrar.
 */
export const WithTrigger: Story = {
  render: function SnackbarWithTrigger() {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <KdsButton onClick={() => setOpen(true)}>Mostrar notificacion</KdsButton>
        {open && (
          <KdsSnackbar
            message="Pago realizado con exito"
            type="success"
            duration={3000}
            open={open}
            onClose={() => setOpen(false)}
          />
        )}
      </div>
    );
  },
};
