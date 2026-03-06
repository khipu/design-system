import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KdsModal } from './KdsModal';
import { KdsButton } from '../KdsButton';
import { borderRadius, spacing } from '../../../tokens';

const meta: Meta<typeof KdsModal> = {
  title: 'Core/KdsModal',
  component: KdsModal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    showCloseButton: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsModal>;

export const Default: Story = {
  render: function DefaultModal() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Abrir KdsModal</KdsButton>
        <KdsModal
          open={open}
          onClose={() => setOpen(false)}
          title="Título del KdsModal"
        >
          <p style={{ margin: 0 }}>
            Este es el contenido del modal. Puedes agregar cualquier elemento aquí.
          </p>
        </KdsModal>
      </>
    );
  },
};

export const WithFooter: Story = {
  render: function ModalWithFooter() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Confirmar Pago</KdsButton>
        <KdsModal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmar pago"
          footer={
            <>
              <KdsButton variant="text" onClick={() => setOpen(false)}>
                Cancelar
              </KdsButton>
              <KdsButton onClick={() => setOpen(false)}>
                Confirmar
              </KdsButton>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            ¿Estás seguro de que deseas realizar este pago por <strong>$150.000</strong>?
          </p>
        </KdsModal>
      </>
    );
  },
};

export const Sizes: Story = {
  render: function ModalSizes() {
    const [openSize, setOpenSize] = useState<string | null>(null);
    const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

    return (
      <div style={{ display: 'flex', gap: spacing[1], flexWrap: 'wrap' }}>
        {sizes.map((size) => (
          <div key={size}>
            <KdsButton variant="outlined" onClick={() => setOpenSize(size)}>
              {size.toUpperCase()}
            </KdsButton>
            <KdsModal
              open={openSize === size}
              onClose={() => setOpenSize(null)}
              title={`KdsModal ${size.toUpperCase()}`}
              size={size}
            >
              <p style={{ margin: 0 }}>
                Este modal tiene un ancho máximo de {size.toUpperCase()}.
              </p>
            </KdsModal>
          </div>
        ))}
      </div>
    );
  },
};

export const NoCloseButton: Story = {
  render: function ModalNoClose() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>KdsModal sin botón cerrar</KdsButton>
        <KdsModal
          open={open}
          onClose={() => setOpen(false)}
          title="Sin botón cerrar"
          showCloseButton={false}
          footer={
            <KdsButton onClick={() => setOpen(false)}>
              Entendido
            </KdsButton>
          }
        >
          <p style={{ margin: 0 }}>
            Este modal no tiene botón de cerrar en el header.
            Debes usar el botón del footer o hacer clic fuera.
          </p>
        </KdsModal>
      </>
    );
  },
};

export const PreventClose: Story = {
  render: function ModalPreventClose() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>KdsModal bloqueado</KdsButton>
        <KdsModal
          open={open}
          onClose={() => setOpen(false)}
          title="Acción requerida"
          showCloseButton={false}
          footer={
            <KdsButton onClick={() => setOpen(false)}>
              Aceptar
            </KdsButton>
          }
        >
          <p style={{ margin: 0 }}>
            Este modal se cierra solo con el botón de Aceptar.
          </p>
        </KdsModal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: function ModalLongContent() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>KdsModal con contenido largo</KdsButton>
        <KdsModal
          open={open}
          onClose={() => setOpen(false)}
          title="Términos y Condiciones"
          footer={
            <>
              <KdsButton variant="text" onClick={() => setOpen(false)}>
                Rechazar
              </KdsButton>
              <KdsButton onClick={() => setOpen(false)}>
                Aceptar
              </KdsButton>
            </>
          }
        >
          <div>
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i} style={{ margin: '0 0 16px 0' }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            ))}
          </div>
        </KdsModal>
      </>
    );
  },
};

export const FormModal: Story = {
  render: function ModalWithForm() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Agregar destinatario</KdsButton>
        <KdsModal
          open={open}
          onClose={() => setOpen(false)}
          title="Nuevo destinatario"
          size="sm"
          footer={
            <>
              <KdsButton variant="text" onClick={() => setOpen(false)}>
                Cancelar
              </KdsButton>
              <KdsButton onClick={() => setOpen(false)}>
                Guardar
              </KdsButton>
            </>
          }
        >
          <form style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                Nombre completo
              </label>
              <input
                type="text"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: borderRadius.button,
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                RUT
              </label>
              <input
                type="text"
                placeholder="12.345.678-9"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: borderRadius.button,
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px' }}>
                Email
              </label>
              <input
                type="email"
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: borderRadius.button,
                  fontSize: '16px',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </form>
        </KdsModal>
      </>
    );
  },
};

export const DeleteConfirmation: Story = {
  render: function DeleteModal() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton color="error" onClick={() => setOpen(true)}>Eliminar</KdsButton>
        <KdsModal
          open={open}
          onClose={() => setOpen(false)}
          title="Eliminar registro"
          size="xs"
          footer={
            <>
              <KdsButton variant="text" onClick={() => setOpen(false)}>
                Cancelar
              </KdsButton>
              <KdsButton color="error" onClick={() => setOpen(false)}>
                Eliminar
              </KdsButton>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            ¿Estás seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.
          </p>
        </KdsModal>
      </>
    );
  },
};
