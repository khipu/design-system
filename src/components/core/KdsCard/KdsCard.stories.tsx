import type { Meta, StoryObj } from '@storybook/react';
import { KdsCard, KdsCardHeader, KdsCardBody, KdsCardFooter } from './KdsCard';
import { KdsButton } from '../KdsButton';
import { colors, fontFamilies, fontWeights, fontSizes, borderRadius, spacing } from '../../../tokens';

const meta: Meta<typeof KdsCard> = {
  title: 'Core/KdsCard',
  component: KdsCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined'],
    },
    dimmed: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsCard>;

export const Default: Story = {
  args: {
    children: (
      <KdsCardBody>
        <p style={{ margin: 0 }}>Este es el contenido de una tarjeta básica.</p>
      </KdsCardBody>
    ),
  },
};

export const WithHeader: Story = {
  render: () => (
    <KdsCard style={{ maxWidth: '400px' }}>
      <KdsCardHeader>
        <h3 style={{ margin: 0 }}>Resumen de pago</h3>
        <p style={{ margin: '4px 0 0 0', fontSize: fontSizes.sm, color: colors.text.secondary }}>
          Transferencia bancaria
        </p>
      </KdsCardHeader>
      <KdsCardBody>
        <p style={{ margin: 0 }}>Total a pagar: $150.000</p>
      </KdsCardBody>
    </KdsCard>
  ),
};

export const WithActions: Story = {
  render: () => (
    <KdsCard style={{ maxWidth: '400px' }}>
      <KdsCardHeader>
        <h3 style={{ margin: 0 }}>Confirmar transacción</h3>
      </KdsCardHeader>
      <KdsCardBody>
        <p style={{ margin: 0 }}>
          Estás a punto de transferir $150.000 a Juan Pérez.
        </p>
      </KdsCardBody>
      <KdsCardFooter style={{ display: 'flex', gap: spacing[2], justifyContent: 'flex-end' }}>
        <KdsButton variant="text">Cancelar</KdsButton>
        <KdsButton>Confirmar</KdsButton>
      </KdsCardFooter>
    </KdsCard>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[3] }}>
      <KdsCard variant="elevated" style={{ width: '250px' }}>
        <KdsCardBody>
          <h4 style={{ margin: `0 0 ${spacing[1]} 0` }}>Elevated</h4>
          <p style={{ margin: 0, color: colors.text.secondary }}>
            Tarjeta con sombra
          </p>
        </KdsCardBody>
      </KdsCard>
      <KdsCard variant="outlined" style={{ width: '250px' }}>
        <KdsCardBody>
          <h4 style={{ margin: `0 0 ${spacing[1]} 0` }}>Outlined</h4>
          <p style={{ margin: 0, color: colors.text.secondary }}>
            Tarjeta con borde
          </p>
        </KdsCardBody>
      </KdsCard>
    </div>
  ),
};

export const Variants2: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
      <KdsCard variant="elevated" style={{ width: '120px', padding: spacing[2] }}>
        <p style={{ margin: 0, textAlign: 'center' }}>
          Elevated
        </p>
      </KdsCard>
      <KdsCard variant="outlined" style={{ width: '120px', padding: spacing[2] }}>
        <p style={{ margin: 0, textAlign: 'center' }}>
          Outlined
        </p>
      </KdsCard>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <KdsCard
      onClick={() => alert('KdsCard clicked!')}
      style={{ maxWidth: '300px', cursor: 'pointer' }}
    >
      <KdsCardBody>
        <h4 style={{ margin: `0 0 ${spacing[1]} 0` }}>Tarjeta clickeable</h4>
        <p style={{ margin: 0, color: colors.text.secondary }}>
          Haz clic en esta tarjeta para ver el efecto.
        </p>
      </KdsCardBody>
    </KdsCard>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <KdsCard style={{ maxWidth: '400px' }}>
      <KdsCardHeader
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: borderRadius.full,
              backgroundColor: colors.primary.main,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: colors.primary.contrastText,
              fontWeight: fontWeights.medium,
              flexShrink: 0,
            }}
          >
            JP
          </div>
          <div>
            <p style={{ margin: 0, fontWeight: fontWeights.medium }}>Juan Pérez</p>
            <p style={{ margin: '4px 0 0 0', fontSize: fontSizes.sm, color: colors.text.secondary }}>
              hace 2 horas
            </p>
          </div>
        </div>
        <button
          style={{
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            padding: spacing[1],
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.action.active}>
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
          </svg>
        </button>
      </KdsCardHeader>
      <KdsCardBody>
        <p style={{ margin: 0 }}>
          Contenido de la publicación o mensaje del usuario.
        </p>
      </KdsCardBody>
    </KdsCard>
  ),
};

export const PaymentCard: Story = {
  render: () => (
    <KdsCard variant="elevated" style={{ maxWidth: '400px' }}>
      <KdsCardHeader
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing[2],
        }}
      >
        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: borderRadius.lg,
            backgroundColor: colors.success.container,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.success.main}>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        </div>
        <div>
          <p style={{ margin: 0, fontWeight: fontWeights.medium }}>Pago recibido</p>
          <p style={{ margin: '4px 0 0 0', fontSize: fontSizes.sm, color: colors.text.secondary }}>
            12 de diciembre, 2024
          </p>
        </div>
      </KdsCardHeader>
      <KdsCardBody>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[1] }}>
          <span style={{ color: colors.text.secondary }}>Monto</span>
          <span style={{ fontWeight: fontWeights.medium }}>$150.000</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: spacing[1] }}>
          <span style={{ color: colors.text.secondary }}>Origen</span>
          <span>Banco Estado</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: colors.text.secondary }}>Referencia</span>
          <span style={{ fontFamily: fontFamilies.mono }}>KHP-2024-001234</span>
        </div>
      </KdsCardBody>
      <KdsCardFooter style={{ display: 'flex', gap: spacing[2], justifyContent: 'flex-end' }}>
        <KdsButton variant="text" size="sm">Ver detalle</KdsButton>
        <KdsButton variant="text" size="sm">Descargar</KdsButton>
      </KdsCardFooter>
    </KdsCard>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[2], maxWidth: '800px' }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <KdsCard key={i} variant="elevated">
          <KdsCardBody>
            <h4 style={{ margin: `0 0 ${spacing[1]} 0` }}>Tarjeta {i}</h4>
            <p style={{ margin: 0, color: colors.text.secondary, fontSize: fontSizes.sm }}>
              Descripción breve del contenido de esta tarjeta.
            </p>
          </KdsCardBody>
        </KdsCard>
      ))}
    </div>
  ),
};

export const Dimmed: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
      <p style={{ margin: 0, color: colors.text.footer, fontSize: fontSizes.sm }}>
        Dimmed variant example:
      </p>
      <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ textAlign: 'center' }}>
          <KdsCard variant="outlined" style={{ width: '150px', marginBottom: spacing[1] }}>
            <KdsCardBody>
              <p style={{ margin: 0 }}>Normal</p>
            </KdsCardBody>
          </KdsCard>
          <span style={{ fontSize: fontSizes.xs, color: colors.text.footer }}>Normal</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <KdsCard variant="outlined" dimmed style={{ width: '150px', marginBottom: spacing[1] }}>
            <KdsCardBody>
              <p style={{ margin: 0 }}>Dimmed</p>
            </KdsCardBody>
          </KdsCard>
          <span style={{ fontSize: fontSizes.xs, color: colors.text.footer }}>Dimmed</span>
        </div>
      </div>
    </div>
  ),
};
