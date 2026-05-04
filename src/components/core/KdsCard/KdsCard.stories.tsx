import type { Meta, StoryObj } from '@storybook/react';
import { KdsCard, KdsCardHeader, KdsCardContent, KdsCardActions } from './KdsCard';
import { KdsButton } from '../KdsButton';
import { colors, fontFamilies, fontWeights, fontSizes, borderRadius, spacing } from '../../../tokens';

const meta: Meta<typeof KdsCard> = {
  title: 'Core/KdsCard',
  component: KdsCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevation', 'outlined'],
    },
    elevation: {
      control: 'select',
      options: [0, 1, 2, 4, 8, 12, 16, 24],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
    clickable: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsCard>;

export const Default: Story = {
  args: {
    children: (
      <KdsCardContent>
        <p style={{ margin: 0 }}>Este es el contenido de una tarjeta básica.</p>
      </KdsCardContent>
    ),
  },
};

export const WithHeader: Story = {
  render: () => (
    <KdsCard style={{ maxWidth: '400px' }}>
      <KdsCardHeader
        title="Resumen de pago"
        subheader="Transferencia bancaria"
      />
      <KdsCardContent>
        <p style={{ margin: 0 }}>Total a pagar: $150.000</p>
      </KdsCardContent>
    </KdsCard>
  ),
};

export const WithActions: Story = {
  render: () => (
    <KdsCard style={{ maxWidth: '400px' }}>
      <KdsCardHeader title="Confirmar transacción" />
      <KdsCardContent>
        <p style={{ margin: 0 }}>
          Estás a punto de transferir $150.000 a Juan Pérez.
        </p>
      </KdsCardContent>
      <KdsCardActions>
        <KdsButton variant="text">Cancelar</KdsButton>
        <KdsButton>Confirmar</KdsButton>
      </KdsCardActions>
    </KdsCard>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[3] }}>
      <KdsCard variant="elevation" elevation={2} style={{ width: '250px' }}>
        <KdsCardContent>
          <h4 style={{ margin: `0 0 ${spacing[1]} 0` }}>Elevation</h4>
          <p style={{ margin: 0, color: colors.text.secondary }}>
            Tarjeta con sombra
          </p>
        </KdsCardContent>
      </KdsCard>
      <KdsCard variant="outlined" style={{ width: '250px' }}>
        <KdsCardContent>
          <h4 style={{ margin: `0 0 ${spacing[1]} 0` }}>Outlined</h4>
          <p style={{ margin: 0, color: colors.text.secondary }}>
            Tarjeta con borde
          </p>
        </KdsCardContent>
      </KdsCard>
    </div>
  ),
};

export const Elevations: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}>
      {([0, 1, 2, 4, 8, 12, 16, 24] as const).map((elevation) => (
        <KdsCard key={elevation} elevation={elevation} style={{ width: '120px', padding: spacing[2] }}>
          <p style={{ margin: 0, textAlign: 'center' }}>
            elevation={elevation}
          </p>
        </KdsCard>
      ))}
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <KdsCard
      clickable
      onClick={() => alert('KdsCard clicked!')}
      style={{ maxWidth: '300px' }}
    >
      <KdsCardContent>
        <h4 style={{ margin: `0 0 ${spacing[1]} 0` }}>Tarjeta clickeable</h4>
        <p style={{ margin: 0, color: colors.text.secondary }}>
          Haz clic en esta tarjeta para ver el efecto.
        </p>
      </KdsCardContent>
    </KdsCard>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <KdsCard style={{ maxWidth: '400px' }}>
      <KdsCardHeader
        avatar={
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
            }}
          >
            JP
          </div>
        }
        title="Juan Pérez"
        subheader="hace 2 horas"
        action={
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
        }
      />
      <KdsCardContent>
        <p style={{ margin: 0 }}>
          Contenido de la publicación o mensaje del usuario.
        </p>
      </KdsCardContent>
    </KdsCard>
  ),
};

export const PaymentCard: Story = {
  render: () => (
    <KdsCard elevation={2} style={{ maxWidth: '400px' }}>
      <KdsCardHeader
        title="Pago recibido"
        subheader="12 de diciembre, 2024"
        avatar={
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: borderRadius.lg,
              backgroundColor: colors.success.container,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill={colors.success.main}>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
            </svg>
          </div>
        }
      />
      <KdsCardContent>
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
      </KdsCardContent>
      <KdsCardActions>
        <KdsButton variant="text" size="sm">Ver detalle</KdsButton>
        <KdsButton variant="text" size="sm">Descargar</KdsButton>
      </KdsCardActions>
    </KdsCard>
  ),
};

export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: spacing[2], maxWidth: '800px' }}>
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <KdsCard key={i} clickable elevation={1}>
          <KdsCardContent>
            <h4 style={{ margin: `0 0 ${spacing[1]} 0` }}>Tarjeta {i}</h4>
            <p style={{ margin: 0, color: colors.text.secondary, fontSize: fontSizes.sm }}>
              Descripción breve del contenido de esta tarjeta.
            </p>
          </KdsCardContent>
        </KdsCard>
      ))}
    </div>
  ),
};

export const PaddingVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
      <p style={{ margin: 0, color: colors.text.footer, fontSize: fontSizes.sm }}>
        Padding values from Figma design (vertical horizontal):
      </p>
      <div style={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap', alignItems: 'flex-start' }}>
        <div style={{ textAlign: 'center' }}>
          <KdsCard padding="none" variant="outlined" style={{ width: '150px', marginBottom: spacing[1] }}>
            <p style={{ margin: 0 }}>none</p>
          </KdsCard>
          <span style={{ fontSize: fontSizes.xs, color: colors.text.footer }}>0px</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <KdsCard padding="sm" variant="outlined" style={{ width: '150px', marginBottom: spacing[1] }}>
            <p style={{ margin: 0 }}>sm</p>
          </KdsCard>
          <span style={{ fontSize: fontSizes.xs, color: colors.text.footer }}>8px 16px</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <KdsCard padding="md" variant="outlined" style={{ width: '150px', marginBottom: spacing[1] }}>
            <p style={{ margin: 0 }}>md (Figma)</p>
          </KdsCard>
          <span style={{ fontSize: fontSizes.xs, color: colors.text.footer }}>10px 20px</span>
        </div>
        <div style={{ textAlign: 'center' }}>
          <KdsCard padding="lg" variant="outlined" style={{ width: '150px', marginBottom: spacing[1] }}>
            <p style={{ margin: 0 }}>lg</p>
          </KdsCard>
          <span style={{ fontSize: fontSizes.xs, color: colors.text.footer }}>16px 20px</span>
        </div>
      </div>
    </div>
  ),
};
