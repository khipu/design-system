import type { Meta, StoryObj } from '@storybook/react';
import { colors, fontFamilies, fontWeights, borderRadius, borders } from '../tokens';

/**
 * Comparacion visual entre los valores de color primario de Figma (fuente de verdad)
 * y los valores que tenia khenshin-web, para documentar la discrepancia corregida.
 */

const meta = {
  title: 'Examples/Comparacion Primary Color',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Valores anteriores de khenshin-web (ya corregidos)
const khenshinWeb = {
  main: '#7548a8',
  light: '#6fb2e2',
  dark: '#6A3A8C',
};

// Valores correctos de Figma (fuente de verdad actual)
const figma = {
  main: colors.primary.main,   // #8347AD
  light: colors.primary.light, // #9B6BBD
  dark: colors.primary.dark,   // #5B3179
};

const fontFamily = fontFamilies.primary;

interface SwatchProps {
  label: string;
  hex: string;
  sublabel?: string;
}

const Swatch = ({ label, hex, sublabel }: SwatchProps) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
    <div
      style={{
        width: 80,
        height: 80,
        borderRadius: borderRadius.lg,
        backgroundColor: hex,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
      }}
    />
    <span style={{ fontSize: 13, fontWeight: 600, fontFamily, color: colors.text.primary }}>{label}</span>
    <code style={{ fontSize: 12, fontFamily: fontFamilies.mono, color: colors.text.footer, letterSpacing: '0.5px' }}>{hex}</code>
    {sublabel && (
      <span style={{ fontSize: 11, color: colors.text.muted, fontFamily }}>{sublabel}</span>
    )}
  </div>
);

// =============================================================================
// MAIN COMPARISON STORY
// =============================================================================

export const Comparison: Story = {
  name: 'Figma vs khenshin-web',
  render: () => (
    <div style={{ fontFamily, maxWidth: 700 }}>
      {/* Header */}
      <div style={{ marginBottom: 32, textAlign: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: colors.text.strong, margin: '0 0 8px' }}>
          Colores primarios: Figma vs khenshin-web
        </h2>
        <p style={{ fontSize: 14, color: colors.text.footer, margin: 0, lineHeight: 1.6 }}>
          La fuente de verdad es <strong>Figma</strong> (extraido con el plugin Khipu Token Extractor).
          <br />
          khenshin-web tenia valores diferentes que fueron corregidos.
        </p>
      </div>

      {/* Side by side */}
      <div style={{ display: 'flex', gap: 24 }}>
        {/* Figma - Correct */}
        <div
          style={{
            flex: 1,
            border: `2px solid ${colors.components.alert.successBorder}`,
            borderRadius: borderRadius.xl,
            padding: 24,
            backgroundColor: colors.success.container,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.components.alert.successBorder }}>
              Figma (correcto)
            </span>
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Swatch label="main" hex={figma.main} sublabel="primary/main" />
            <Swatch label="light" hex={figma.light} sublabel="primary/light" />
            <Swatch label="dark" hex={figma.dark} sublabel="primary/dark" />
          </div>
        </div>

        {/* khenshin-web - Old */}
        <div
          style={{
            flex: 1,
            border: `2px solid ${colors.error.main}`,
            borderRadius: borderRadius.xl,
            padding: 24,
            backgroundColor: colors.error.container,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: colors.error.main }}>
              khenshin-web (anterior)
            </span>
          </div>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <Swatch label="main" hex={khenshinWeb.main} sublabel="primaryColor" />
            <Swatch label="light" hex={khenshinWeb.light} sublabel="primaryColorVariant" />
            <Swatch label="dark" hex={khenshinWeb.dark} sublabel="dark variant" />
          </div>
        </div>
      </div>

      {/* Discrepancy table */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text.primary, marginBottom: 12 }}>
          Detalle de discrepancias
        </h3>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 13,
            fontFamily,
          }}
        >
          <thead>
            <tr style={{ borderBottom: borders.tableHeader }}>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: colors.text.footer }}>Token</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: colors.components.alert.successBorder }}>Figma</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: colors.error.main }}>khenshin-web</th>
              <th style={{ textAlign: 'left', padding: '8px 12px', color: colors.text.footer }}>Diferencia</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                token: 'primary.main',
                figma: '#8347AD',
                kweb: '#7548a8',
                diff: 'Tono mas brillante y saturado en Figma',
              },
              {
                token: 'primary.light',
                figma: '#9B6BBD',
                kweb: '#6fb2e2',
                diff: 'khenshin-web usaba un azul, no un purpura claro',
              },
              {
                token: 'primary.dark',
                figma: '#5B3179',
                kweb: '#6A3A8C',
                diff: 'Figma usa un purpura mas oscuro',
              },
            ].map(({ token, figma: f, kweb, diff }) => (
              <tr key={token} style={{ borderBottom: borders.tableRow }}>
                <td style={{ padding: '10px 12px' }}>
                  <code style={{ fontSize: 12, backgroundColor: colors.gray[100], padding: '2px 6px', borderRadius: 4 }}>
                    {token}
                  </code>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        backgroundColor: f,
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}
                    />
                    <code style={{ fontSize: 12 }}>{f}</code>
                  </span>
                </td>
                <td style={{ padding: '10px 12px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span
                      style={{
                        display: 'inline-block',
                        width: 16,
                        height: 16,
                        borderRadius: 4,
                        backgroundColor: kweb,
                        border: '1px solid rgba(0,0,0,0.1)',
                      }}
                    />
                    <code style={{ fontSize: 12 }}>{kweb}</code>
                  </span>
                </td>
                <td style={{ padding: '10px 12px', fontSize: 12, color: colors.text.footer }}>{diff}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Button comparison */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text.primary, marginBottom: 12 }}>
          Impacto visual en botones
        </h3>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <button
              style={{
                padding: '8px 22px',
                minHeight: 50,
                backgroundColor: figma.main,
                color: colors.primary.contrastText,
                border: 'none',
                borderRadius: borderRadius.button,
                fontSize: '0.9375rem',
                fontWeight: fontWeights.medium,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.46px',
                cursor: 'pointer',
                fontFamily,
                boxShadow: '0 1px 5px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.20)',
                minWidth: 180,
              }}
            >
              Continuar
            </button>
            <span style={{ fontSize: 12, color: colors.components.alert.successBorder, fontWeight: 600 }}>Figma {figma.main}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <button
              style={{
                padding: '8px 22px',
                minHeight: 50,
                backgroundColor: khenshinWeb.main,
                color: colors.primary.contrastText,
                border: 'none',
                borderRadius: borderRadius.button,
                fontSize: '0.9375rem',
                fontWeight: fontWeights.medium,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.46px',
                cursor: 'pointer',
                fontFamily,
                boxShadow: '0 1px 5px 0 rgba(0,0,0,0.12), 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.20)',
                minWidth: 180,
              }}
            >
              Continuar
            </button>
            <span style={{ fontSize: 12, color: colors.error.main, fontWeight: 600 }}>khenshin-web {khenshinWeb.main}</span>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div
        style={{
          marginTop: 32,
          padding: 16,
          backgroundColor: colors.info.container,
          borderRadius: borderRadius.md,
          border: `1px solid ${colors.components.alert.infoBorder}`,
          fontSize: 13,
          lineHeight: 1.6,
          color: colors.components.alert.infoText,
        }}
      >
        <strong>Nota:</strong> Los tokens se extraen de Figma usando el plugin{' '}
        <code style={{ backgroundColor: colors.components.alert.infoBg, padding: '1px 4px', borderRadius: 3 }}>
          figma-plugin-token-extractor
        </code>{' '}
        ubicado en este repositorio. El archivo{' '}
        <code style={{ backgroundColor: colors.components.alert.infoBg, padding: '1px 4px', borderRadius: 3 }}>
          figmaTokens.json
        </code>{' '}
        contiene la ultima extraccion. khenshin-web debe eventualmente sincronizarse con estos valores.
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparacion visual de los colores primarios entre Figma (fuente de verdad) y khenshin-web. ' +
          'Documenta la discrepancia que fue corregida: los tokens del DS ahora usan los valores de Figma.',
      },
    },
  },
};
