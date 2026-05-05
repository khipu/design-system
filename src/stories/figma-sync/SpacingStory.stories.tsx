import type { Meta, StoryObj } from '@storybook/react';
import { spacing } from '../../tokens';

/**
 * Espaciado del Design System
 *
 * Sistema de espaciado del Khipu Design System basado en una unidad base de 4px.
 * Proporciona una escala consistente para margenes, padding y gaps entre elementos.
 *
 * **Base Unit:** 4px
 * **Escala:** 0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96
 *
 * **Fuente:** `src/tokens/index.ts`
 * **Referencia en Figma:** K-Tokens for Figma - Material UI
 */
const meta = {
  title: 'Design System/Tokens/Spacing',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Sistema de espaciado con escala basada en 4px.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Escala Completa
 *
 * Visualizacion de todos los valores de espaciado disponibles.
 */
export const FullScale: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '30px' }}>
        Sistema de Espaciado
      </h2>
      <p style={{ color: '#666', fontSize: '16px', margin: '0 0 32px 0' }}>
        El sistema utiliza una unidad base de <strong>4px</strong> para crear una escala de
        espaciado consistente y predecible.
      </p>

      {/* Visual Scale */}
      <div style={{ padding: '24px', marginTop: '32px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>
          Escala Visual
        </h3>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px 0' }}>
          Cada barra representa un valor de espaciado. Usa estos valores para margenes,
          padding y gaps.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px' }}>
          {Object.entries(spacing).map(([key, value]) => (
            <div key={key}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                <span
                  style={{
                    fontFamily: 'monospace',
                    minWidth: 60,
                    fontWeight: 600,
                    fontSize: '12px',
                  }}
                >
                  {key}
                </span>
                <span
                  style={{ minWidth: 50, color: '#666', fontSize: '12px' }}
                >
                  {value}
                </span>
                <div
                  style={{
                    width: value,
                    height: 32,
                    backgroundColor: 'var(--kds-color-primary, #8347AD)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {value}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Specifications Table */}
      <div style={{ padding: '24px', marginTop: '32px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>
          Especificaciones
        </h3>
        <div style={{ marginTop: '16px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Token</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Valor</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Pixeles</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Uso Recomendado</th>
              </tr>
            </thead>
            <tbody>
              {[
                { token: '0', val: spacing[0], px: '0px', use: 'Sin espacio, elementos adyacentes' },
                { token: '1', val: spacing[1], px: '4px', use: 'Espaciado minimo, separadores sutiles' },
                { token: '2', val: spacing[2], px: '8px', use: 'Espaciado pequeno, elementos relacionados' },
                { token: '3', val: spacing[3], px: '12px', use: 'Espaciado compacto, grupos de elementos' },
                { token: '4', val: spacing[4], px: '16px', use: 'Espaciado estandar, padding de componentes' },
                { token: '6', val: spacing[6], px: '24px', use: 'Espaciado medio, entre secciones relacionadas' },
                { token: '8', val: spacing[8], px: '32px', use: 'Espaciado generoso, padding de tarjetas' },
                { token: '10', val: spacing[10], px: '40px', use: 'Separacion grande, entre componentes' },
                { token: '12', val: spacing[12], px: '96px', use: 'Espaciado maximo, separacion de secciones' },
              ].map((row) => (
                <tr key={row.token} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>{row.token}</td>
                  <td style={{ padding: '12px 16px' }}>{row.val}</td>
                  <td style={{ padding: '12px 16px' }}>{row.px}</td>
                  <td style={{ padding: '12px 16px' }}>{row.use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Usage Examples */}
      <div style={{ padding: '24px', marginTop: '32px', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
          Uso en Codigo
        </h3>
        <pre style={{
          fontFamily: 'monospace',
          backgroundColor: '#fff',
          padding: '16px',
          borderRadius: '4px',
          overflow: 'auto',
          fontSize: '13px',
          margin: 0,
        }}>
{`// Importar espaciado
import { spacing } from '@khipu/design-system';

// Usar en style prop
<div style={{
  padding: spacing[4],          // 16px
  margin: spacing[6],           // 24px
  gap: spacing[2],              // 8px
}} />

// Usar variables CSS
<div style={{
  padding: 'var(--kds-spacing-4)',
  margin: 'var(--kds-spacing-6)'
}} />`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * Ejemplos de Uso
 *
 * Casos practicos de aplicacion del espaciado en componentes.
 */
export const UsageExamples: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>
        Ejemplos de Uso de Espaciado
      </h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px', marginTop: '16px' }}>
        {/* Card Padding Example */}
        <div>
          <div style={{ padding: 0, border: '2px dashed #8347AD', borderRadius: '8px' }}>
            <div style={{ padding: '16px', backgroundColor: '#b39ddb', color: 'white' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                Card con padding[4]
              </h3>
              <p style={{ margin: 0, fontSize: '14px' }}>
                El padding de 16px (spacing[4]) es ideal para tarjetas y contenedores pequenos.
              </p>
            </div>
          </div>
          <span style={{ fontSize: '12px', color: '#666', marginTop: '8px', display: 'block' }}>
            padding: spacing[4] (16px)
          </span>
        </div>

        {/* Large Card Example */}
        <div>
          <div style={{ padding: 0, border: '2px dashed #009688', borderRadius: '8px' }}>
            <div style={{ padding: '64px', backgroundColor: '#80cbc4', color: 'white' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
                Card con padding[8]
              </h3>
              <p style={{ margin: 0, fontSize: '14px' }}>
                El padding de 64px (spacing[8]) es mejor para tarjetas destacadas o contenido importante.
              </p>
            </div>
          </div>
          <span style={{ fontSize: '12px', color: '#666', marginTop: '8px', display: 'block' }}>
            padding: spacing[8] (64px)
          </span>
        </div>

        {/* Stack Spacing Example */}
        <div style={{ gridColumn: '1 / -1' }}>
          <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
              Stack con gap de 16px
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
              <div style={{ padding: '16px', backgroundColor: '#a5d6a7', borderRadius: '4px' }}>
                <span style={{ fontSize: '14px' }}>Elemento 1</span>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#a5d6a7', borderRadius: '4px' }}>
                <span style={{ fontSize: '14px' }}>Elemento 2</span>
              </div>
              <div style={{ padding: '16px', backgroundColor: '#a5d6a7', borderRadius: '4px' }}>
                <span style={{ fontSize: '14px' }}>Elemento 3</span>
              </div>
            </div>
            <span style={{ fontSize: '12px', color: '#666', marginTop: '16px', display: 'block' }}>
              Gap de 16px (spacing[4]) entre elementos relacionados
            </span>
          </div>
        </div>
      </div>
    </div>
  ),
};

/**
 * Comparacion de Escalas
 *
 * Visualizacion lado a lado de diferentes valores de espaciado.
 */
export const ScaleComparison: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
        Comparacion de Escalas
      </h2>
      <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px 0' }}>
        Comparacion visual de los valores de espaciado mas comunmente usados.
      </p>

      <div style={{ padding: '32px', marginTop: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
          {[2, 4, 6, 8].map((scale) => (
            <div key={scale}>
              <span style={{ fontSize: '12px', color: '#666', marginBottom: '8px', display: 'block' }}>
                spacing[{scale}] = {spacing[scale as keyof typeof spacing]}
              </span>
              <div
                style={{
                  padding: `${(scale as number) * 8}px`,
                  backgroundColor: '#bbdefb',
                  border: '2px solid #1976d2',
                  borderRadius: '4px',
                }}
              >
                <div style={{ padding: '16px', backgroundColor: 'white', borderRadius: '4px' }}>
                  <span style={{ fontSize: '14px' }}>
                    Contenido con padding[{scale}]
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
