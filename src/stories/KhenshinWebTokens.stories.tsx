import type { Meta, StoryObj } from '@storybook/react';
import { tokensByMode, borders, fontFamilies, fontWeights, spacing, borderRadius, semanticSpacing } from '../tokens';

const kds = tokensByMode.light;

const meta = {
  title: 'Examples/Khenshin Web Tokens',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// PAYMENT FORM - Shows text tokens, background tokens, borders, alerts
// =============================================================================

export const PaymentForm: Story = {
  name: 'Formulario de Pago',
  render: () => (
    <div
      style={{
        width: 450,
        fontFamily: fontFamilies.primary,
        backgroundColor: kds.colors.background.muted,
        borderRadius: borderRadius.lg,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          padding: `${spacing[2]} ${spacing[2.5]}`,
          gap: 16,
          backgroundColor: kds.colors.background.muted,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 6,
            border: '1px solid white',
            backgroundColor: kds.colors.background.paper,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
          }}
        >
          🛒
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span
            style={{
              fontSize: 16,
              fontWeight: fontWeights.semiBold,
              lineHeight: '24px',
              color: kds.colors.text.primary,
            }}
          >
            Pago en línea
          </span>
          <span
            style={{
              fontSize: 14,
              fontWeight: fontWeights.semiBold,
              lineHeight: '20px',
              color: kds.colors.text.muted,
            }}
          >
            Comercio Demo
          </span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
          <span style={{ fontWeight: fontWeights.bold, fontSize: '1.25rem', color: kds.colors.text.primary }}>
            $15.000
          </span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          backgroundColor: kds.colors.background.paper,
          borderRadius: `${borderRadius.modal} ${borderRadius.modal} 0 0`,
          padding: spacing[2.5],
        }}
      >
        {/* Form icon */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: borderRadius.iconContainer,
              backgroundColor: kds.colors.background.brandSubtle,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
            }}
          >
            ✉️
          </div>
          <span
            style={{
              marginTop: 8,
              fontSize: 20,
              fontWeight: fontWeights.semiBold,
              lineHeight: '26px',
              color: kds.colors.text.primary,
              textAlign: 'center',
            }}
          >
            Ingresa tu email
          </span>
          <span
            style={{
              fontSize: 12,
              fontWeight: fontWeights.regular,
              lineHeight: '15px',
              letterSpacing: '1px',
              textTransform: 'uppercase' as const,
              color: kds.colors.text.secondary,
              textAlign: 'center',
              marginTop: 4,
            }}
          >
            Te enviaremos el comprobante
          </span>
        </div>

        {/* BeerCSS Input */}
        <div className="field label border" style={{ marginBottom: 16 }}>
          <input type="text" id="email" name="email" defaultValue="" placeholder=" " required />
          <label htmlFor="email">Correo electrónico *</label>
        </div>

        {/* Radio options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Banco Estado', 'Banco de Chile'].map((bank) => (
            <div
              key={bank}
              style={{
                display: 'flex',
                minHeight: 65,
                padding: `${spacing[1.5]} ${spacing[2.5]}`,
                alignItems: 'center',
                gap: 16,
                borderRadius: 6,
                border: `1px solid ${borders.light}`,
                background: kds.colors.background.paper,
                boxShadow: '0 1px 2px 0 rgba(187, 187, 187, 0.12)',
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: `2px solid ${kds.colors.primary.main}`,
                }}
              />
              <span
                style={{
                  flex: 1,
                  color: kds.colors.text.strong,
                  fontSize: 14,
                  fontWeight: fontWeights.semiBold,
                  lineHeight: '20px',
                  letterSpacing: '0.15px',
                }}
              >
                {bank}
              </span>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p
          style={{
            color: kds.colors.text.hint,
            fontSize: 12,
            fontWeight: fontWeights.regular,
            lineHeight: '166%',
            letterSpacing: '0.4px',
            textAlign: 'center',
            marginTop: 16,
          }}
        >
          Al continuar aceptas los términos y condiciones del servicio
        </p>

        {/* Button */}
        <button
          style={{
            width: '100%',
            padding: semanticSpacing.button.padding,
            minHeight: 50,
            backgroundColor: kds.colors.primary.main,
            color: kds.colors.primary.contrastText,
            border: 'none',
            borderRadius: borderRadius.button,
            fontSize: '0.9375rem',
            fontWeight: fontWeights.medium,
            textTransform: 'uppercase' as const,
            letterSpacing: '0.46px',
            cursor: 'pointer',
            fontFamily: fontFamilies.primary,
            boxShadow: '0 1px 5px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.20)',
          }}
        >
          Continuar
        </button>
      </div>

      {/* Footer */}
      <div
        style={{
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: kds.colors.background.paper,
          borderTop: `1px solid ${kds.colors.background.muted}`,
        }}
      >
        <span
          style={{
            color: kds.colors.text.footer,
            fontSize: 11,
            fontWeight: fontWeights.regular,
            lineHeight: '166%',
            letterSpacing: '0.4px',
          }}
        >
          Pago seguro con Khipu
        </span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Formulario de pago de khenshin-web mostrando el uso de tokens: text.muted, text.strong, text.hint, text.footer, background.muted, background.brandSubtle, borders.light.',
      },
    },
  },
};

// =============================================================================
// ALERTS - Shows alert text/border tokens
// =============================================================================

export const OutlinedAlerts: Story = {
  name: 'Alertas Outlined',
  render: () => (
    <div style={{ width: 450, display: 'flex', flexDirection: 'column', gap: 12, fontFamily: fontFamilies.primary }}>
      {[
        { type: 'success' as const, icon: '✓', message: 'Pago realizado exitosamente' },
        { type: 'warning' as const, icon: '⚠', message: 'Tu sesión expirará en 5 minutos' },
        { type: 'error' as const, icon: '✕', message: 'No se pudo procesar el pago' },
        { type: 'info' as const, icon: 'ℹ', message: 'Serás redirigido a tu banco' },
      ].map(({ type, icon, message }) => (
        <div
          key={type}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            border: '1px solid',
            borderRadius: borderRadius.sm,
            padding: `${spacing[1.5]} ${spacing[2.5]}`,
            fontSize: 14,
            textAlign: 'left',
            color: kds.colors.components.alert[`${type}Text`],
            borderColor: kds.colors.components.alert[`${type}Border`],
          }}
        >
          <span style={{ fontSize: 18 }}>{icon}</span>
          <span>{message}</span>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alertas outlined de khenshin-web usando tokens: components.alert.successText/Border, warningText/Border, errorText/Border, infoText/Border.',
      },
    },
  },
};

// =============================================================================
// MERCHANT INFO - Shows text.strong, text.tertiary, text.accent
// =============================================================================

export const MerchantInfo: Story = {
  name: 'Información del Comercio',
  render: () => (
    <div
      style={{
        width: 450,
        fontFamily: fontFamilies.primary,
        backgroundColor: kds.colors.background.paper,
        borderRadius: borderRadius.lg,
        padding: 20,
      }}
    >
      {/* Back header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
        <span style={{ color: kds.colors.text.tertiary, fontSize: 24, cursor: 'pointer' }}>←</span>
        <span style={{ color: kds.colors.text.strong, fontSize: 16, fontWeight: fontWeights.semiBold }}>
          Detalle del pago
        </span>
      </div>

      {/* Merchant details */}
      {[
        { label: 'COMERCIO', value: 'Tienda Demo SpA' },
        { label: 'RUT', value: '76.123.456-7' },
        { label: 'MONTO', value: '$15.000' },
        { label: 'ASUNTO', value: 'Orden #12345' },
        { label: 'EMAIL', value: 'cliente@email.com' },
      ].map(({ label, value }) => (
        <div key={label} style={{ marginBottom: 16 }}>
          <div
            style={{
              color: kds.colors.text.secondary,
              fontSize: 12,
              fontWeight: fontWeights.regular,
              lineHeight: '15px',
              letterSpacing: '1px',
              textTransform: 'uppercase' as const,
              marginBottom: 4,
            }}
          >
            {label}
          </div>
          <div
            style={{
              color: kds.colors.text.accent,
              fontSize: '0.875rem',
              lineHeight: 1.43,
              letterSpacing: '0.01071em',
            }}
          >
            {value}
          </div>
        </div>
      ))}

      {/* BeerCSS Input */}
      <div className="field label border" style={{ marginTop: 8 }}>
        <input type="text" id="addressLine1" name="addressLine1" defaultValue="" placeholder=" " required />
        <label htmlFor="addressLine1">Dirección *</label>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Vista de información del comercio mostrando tokens: text.strong (título), text.tertiary (ícono back), text.accent (valores).',
      },
    },
  },
};
