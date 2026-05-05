import type { Meta, StoryObj } from '@storybook/react';
import { colors, spacing, typography, borderRadius, shadows } from '../../tokens';

/**
 * Design Tokens Overview
 *
 * Esta pagina muestra todos los tokens de diseno del Khipu Design System.
 * Estos tokens son la fuente de verdad para colores, tipografia, espaciado, y mas.
 *
 * **Fuente:** `src/tokens/index.ts`
 * **Referencia en Figma:** K-Tokens for Figma - Material UI
 *
 * Para sincronizar con Figma, ejecuta: `npm run sync:figma:tokens`
 */
const meta = {
  title: 'Design System/Tokens/Overview',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Vista general de todos los tokens de diseno del sistema.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Resumen de Tokens
 *
 * Muestra un resumen de todos los tokens disponibles en el sistema.
 */
export const Summary: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '30px' }}>
        Design Tokens - Resumen
      </h2>
      <p style={{ color: '#666', fontSize: '16px', margin: '0 0 32px 0' }}>
        El Khipu Design System esta construido sobre un conjunto completo de tokens de diseno
        extraidos de Figma y mantenidos en codigo.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginTop: '16px' }}>
        {/* Colors */}
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
            Colores
          </h3>
          <p style={{ color: '#666', fontSize: '14px', margin: '0 0 16px 0' }}>
            Paletas de colores semanticos
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 24, height: 24, backgroundColor: colors.primary.main, borderRadius: '4px' }} />
              <span style={{ fontSize: '14px' }}>Primary</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 24, height: 24, backgroundColor: colors.secondary.main, borderRadius: '4px' }} />
              <span style={{ fontSize: '14px' }}>Secondary</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 24, height: 24, backgroundColor: colors.success.main, borderRadius: '4px' }} />
              <span style={{ fontSize: '14px' }}>Success</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 24, height: 24, backgroundColor: colors.error.main, borderRadius: '4px' }} />
              <span style={{ fontSize: '14px' }}>Error</span>
            </div>
          </div>
          <span style={{ fontSize: '12px', color: '#666', marginTop: '16px', display: 'block' }}>
            + warning, info, text, background, action
          </span>
        </div>

        {/* Typography */}
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
            Tipografia
          </h3>
          <p style={{ color: '#666', fontSize: '14px', margin: '0 0 16px 0' }}>
            13 variantes de texto
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.keys(typography).slice(0, 6).map((variant) => (
              <span key={variant} style={{ fontSize: '14px' }}>
                {variant}
              </span>
            ))}
          </div>
          <span style={{ fontSize: '12px', color: '#666', marginTop: '16px', display: 'block' }}>
            + {Object.keys(typography).length - 6} mas variantes
          </span>
        </div>

        {/* Spacing */}
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
            Espaciado
          </h3>
          <p style={{ color: '#666', fontSize: '14px', margin: '0 0 16px 0' }}>
            Escala de espaciado consistente
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(spacing).slice(0, 6).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: value,
                    height: 16,
                    backgroundColor: colors.primary.main,
                    borderRadius: '2px',
                  }}
                />
                <span style={{ fontSize: '14px' }}>
                  {key}: {value}
                </span>
              </div>
            ))}
          </div>
          <span style={{ fontSize: '12px', color: '#666', marginTop: '16px', display: 'block' }}>
            Base unit: 4px
          </span>
        </div>

        {/* Border Radius */}
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
            Border Radius
          </h3>
          <p style={{ color: '#666', fontSize: '14px', margin: '0 0 16px 0' }}>
            Radios de borde por componente
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {Object.entries(borderRadius).slice(0, 6).map(([key, value]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    backgroundColor: colors.primary.main,
                    borderRadius: value,
                  }}
                />
                <span style={{ fontSize: '14px' }}>
                  {key}: {value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Shadows */}
        <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
            Sombras
          </h3>
          <p style={{ color: '#666', fontSize: '14px', margin: '0 0 16px 0' }}>
            Sistema de elevacion
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {Object.entries(shadows).slice(0, 4).map(([key, value]) => (
              <div key={key}>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {key}
                </span>
                <div
                  style={{
                    marginTop: '4px',
                    width: '100%',
                    height: 40,
                    backgroundColor: '#fff',
                    boxShadow: value === 'none' ? 'none' : value,
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: '12px' }}>Sample</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ padding: '24px', backgroundColor: colors.primary.main, borderRadius: '8px', color: 'white' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
            Estadisticas
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <div>
              <div style={{ fontSize: '30px', fontWeight: 700 }}>{Object.keys(colors).length}</div>
              <span style={{ fontSize: '14px' }}>Paletas de colores</span>
            </div>
            <div>
              <div style={{ fontSize: '30px', fontWeight: 700 }}>{Object.keys(typography).length}</div>
              <span style={{ fontSize: '14px' }}>Variantes de tipografia</span>
            </div>
            <div>
              <div style={{ fontSize: '30px', fontWeight: 700 }}>{Object.keys(spacing).length}</div>
              <span style={{ fontSize: '14px' }}>Niveles de espaciado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer info */}
      <div style={{ padding: '24px', marginTop: '32px', backgroundColor: '#fafafa', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '18px' }}>
          Sincronizacion con Figma
        </h3>
        <p style={{ fontSize: '14px', margin: '0 0 8px 0' }}>
          Estos tokens se mantienen sincronizados con el archivo{' '}
          <strong>K-Tokens for Figma - Material UI</strong> en Figma.
        </p>
        <p style={{ fontSize: '14px', color: '#666', margin: '0 0 4px 0' }}>
          <strong>Ultima actualizacion:</strong> Tokens mantenidos en <code>src/tokens/index.ts</code>
        </p>
        <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>
          <strong>Para sincronizar:</strong> <code>npm run sync:figma:tokens</code>
        </p>
      </div>
    </div>
  ),
};
