import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KdsBottomSheet } from './KdsBottomSheet';
import { KdsButton } from '../../core/KdsButton';

/**
 * KdsBottomSheet — único componente de modales del DS (KdsModal fue unificado aquí).
 *
 * Bottom-sheet basado en Radix Dialog. En mobile sube desde abajo, en desktop se
 * centra. Soporta: title, description, body, actions (footer), grabber (handle),
 * close button (X), y prevención de cierre al click adentro.
 */
const meta: Meta<typeof KdsBottomSheet> = {
  title: 'Domain/KdsBottomSheet',
  component: KdsBottomSheet,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Único componente de modales del DS. Reemplaza a `KdsModal`. Slots: title, description, body, actions. Flags: showGrabber, showCloseButton.',
      },
    },
  },
  argTypes: {
    showGrabber: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
    title: { control: 'text' },
    description: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsBottomSheet>;

export const Default: Story = {
  render: function DefaultBottomSheet() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Abrir bottom sheet</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Información"
        >
          <p style={{ margin: 0 }}>Contenido del bottom sheet.</p>
        </KdsBottomSheet>
      </>
    );
  },
};

export const WithActions: Story = {
  render: function BottomSheetWithActions() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Abrir bottom sheet</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmar acción"
          actions={
            <>
              <KdsButton variant="success" onClick={() => setOpen(false)}>
                Confirmar
              </KdsButton>
              <KdsButton variant="text" onClick={() => setOpen(false)}>
                Cancelar
              </KdsButton>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            ¿Deseas confirmar esta acción? Esta operación no se puede deshacer.
          </p>
        </KdsBottomSheet>
      </>
    );
  },
};

export const TransferConfirmation: Story = {
  render: function TransferBottomSheet() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Confirmar transferencia</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="¿Ya transferiste?"
          actions={
            <>
              <KdsButton variant="success" onClick={() => setOpen(false)}>
                Finalizar
              </KdsButton>
              <KdsButton variant="text" onClick={() => setOpen(false)}>
                Volver
              </KdsButton>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            Si ya realizaste la transferencia desde tu banco, presiona
            &quot;Finalizar&quot; para completar el pago. Khipu verificará la
            transacción en los próximos minutos.
          </p>
        </KdsBottomSheet>
      </>
    );
  },
};

/** Con description bajo el título. */
export const WithDescription: Story = {
  render: function BottomSheetWithDescription() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Confirmar pago</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Confirmar pago"
          description="Revisa los datos antes de proceder."
          actions={
            <>
              <KdsButton variant="success" onClick={() => setOpen(false)}>
                Confirmar
              </KdsButton>
              <KdsButton variant="text" onClick={() => setOpen(false)}>
                Cancelar
              </KdsButton>
            </>
          }
        >
          <p style={{ margin: 0 }}>
            ¿Estás seguro de que deseas realizar este pago por <strong>$150.000</strong>?
          </p>
        </KdsBottomSheet>
      </>
    );
  },
};

/** Con X de cierre en el top-right (`showCloseButton`). */
export const WithCloseButton: Story = {
  render: function BottomSheetWithClose() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Abrir con X</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Con botón de cerrar"
          showCloseButton
        >
          <p style={{ margin: 0 }}>El usuario puede cerrar con la X del top-right, ESC, o click fuera.</p>
        </KdsBottomSheet>
      </>
    );
  },
};

/** Sin grabber visual (`showGrabber={false}`). */
export const NoGrabber: Story = {
  render: function BottomSheetNoGrabber() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Sin grabber</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Sin handle visual"
          showGrabber={false}
        >
          <p style={{ margin: 0 }}>Sin el handle visual del top.</p>
        </KdsBottomSheet>
      </>
    );
  },
};

export const LongContent: Story = {
  render: function LongContentBottomSheet() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Ver términos</KdsButton>
        <KdsBottomSheet
          open={open}
          onClose={() => setOpen(false)}
          title="Términos y condiciones"
          actions={
            <KdsButton variant="success" onClick={() => setOpen(false)}>
              Aceptar
            </KdsButton>
          }
        >
          <div>
            <p style={{ margin: '0 0 16px 0' }}>
              Al utilizar los servicios de pago de Khipu, aceptas los siguientes
              términos y condiciones. Te recomendamos leerlos detenidamente antes
              de continuar.
            </p>
            <p style={{ margin: '0 0 16px 0' }}>
              Khipu actúa como intermediario entre el pagador y el cobrador,
              facilitando transferencias electrónicas de forma segura. La
              plataforma no almacena credenciales bancarias y opera bajo los
              estándares de seguridad exigidos por la normativa chilena.
            </p>
            <p style={{ margin: '0 0 16px 0' }}>
              El usuario es responsable de verificar los datos del cobro antes de
              confirmar el pago. Una vez realizada la transferencia, Khipu
              notificará al comercio y al pagador sobre el estado de la
              transacción.
            </p>
            <p style={{ margin: '0 0 16px 0' }}>
              En caso de reclamos o disputas, el usuario puede contactar al
              equipo de soporte de Khipu a través de los canales oficiales. Los
              plazos de resolución dependerán de la entidad bancaria involucrada.
            </p>
            <p style={{ margin: 0 }}>
              Khipu se reserva el derecho de modificar estos términos previo
              aviso a los usuarios registrados. El uso continuado del servicio
              implica la aceptación de las condiciones actualizadas.
            </p>
          </div>
        </KdsBottomSheet>
      </>
    );
  },
};
