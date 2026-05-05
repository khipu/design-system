import type { Meta, StoryObj } from '@storybook/react';
import { typography } from '../../tokens';

/**
 * Tipografia del Design System
 *
 * Sistema completo de tipografia del Khipu Design System.
 * Incluye todas las variantes de texto con sus propiedades de fuente, tamano, peso y altura de linea.
 *
 * **Fuentes:**
 * - Primary: Public Sans (titulos, encabezados, UI)
 * - Secondary: Roboto (cuerpo de texto, labels)
 *
 * **Fuente:** `src/tokens/index.ts`
 */
const meta = {
  title: 'Design System/Tokens/Typography',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Sistema de tipografia con variantes predefinidas.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Todas las Variantes
 *
 * Muestra todas las variantes de tipografia del sistema con ejemplos en vivo.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '30px' }}>
        Sistema de Tipografia
      </h2>
      <p style={{ color: '#666', fontSize: '16px', margin: '0 0 32px 0' }}>
        El Khipu Design System utiliza dos familias tipograficas: <strong>Public Sans</strong> para
        titulos y elementos de UI, y <strong>Roboto</strong> para cuerpo de texto.
      </p>

      {/* Heading Variants */}
      <div style={{ padding: '24px', marginTop: '32px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>
          Heading Variants
        </h3>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px 0' }}>
          Encabezados jerarquicos para estructura de contenido.
        </p>

        <div style={{ marginTop: '24px' }}>
          {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((variant) => (
            <div key={variant} style={{ marginBottom: '24px' }}>
              <div style={{ ...(typography[variant] as React.CSSProperties), marginBottom: '4px' }}>
                {variant.toUpperCase()} - The quick brown fox
              </div>
              <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>
                {typography[variant].fontFamily} &bull; {typography[variant].fontSize} &bull; Weight: {typography[variant].fontWeight}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Body Variants */}
      <div style={{ padding: '24px', marginTop: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>
          Body Variants
        </h3>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px 0' }}>
          Textos de cuerpo para contenido principal.
        </p>

        <div style={{ marginTop: '24px' }}>
          <p style={{ ...(typography.body1 as React.CSSProperties), marginBottom: '4px' }}>
            Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '24px' }}>
            {typography.body1.fontFamily} &bull; {typography.body1.fontSize} &bull; Weight: {typography.body1.fontWeight}
          </span>

          <p style={{ ...(typography.body2 as React.CSSProperties), marginBottom: '4px' }}>
            Body 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>
            {typography.body2.fontFamily} &bull; {typography.body2.fontSize} &bull; Weight: {typography.body2.fontWeight}
          </span>
        </div>
      </div>

      {/* UI Variants */}
      <div style={{ padding: '24px', marginTop: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>
          UI Variants
        </h3>
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 24px 0' }}>
          Textos para elementos de interfaz como botones, labels y subtitulos.
        </p>

        <div style={{ marginTop: '24px' }}>
          <div style={{ ...(typography.subtitle1 as React.CSSProperties), marginBottom: '4px' }}>
            Subtitle 1 - Secondary descriptive text
          </div>
          <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '24px' }}>
            {typography.subtitle1.fontFamily} &bull; {typography.subtitle1.fontSize} &bull; Weight: {typography.subtitle1.fontWeight}
          </span>

          <div style={{ ...(typography.subtitle2 as React.CSSProperties), marginBottom: '4px' }}>
            Subtitle 2 - Smaller secondary text
          </div>
          <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '24px' }}>
            {typography.subtitle2.fontFamily} &bull; {typography.subtitle2.fontSize} &bull; Weight: {typography.subtitle2.fontWeight}
          </span>

          <div style={{ ...(typography.button as React.CSSProperties), display: 'block', marginBottom: '4px' }}>
            BUTTON TEXT
          </div>
          <span style={{ fontSize: '12px', color: '#666', display: 'block', marginBottom: '24px' }}>
            {typography.button.fontFamily} &bull; {typography.button.fontSize} &bull; Weight: {typography.button.fontWeight}
          </span>

          <div style={{ ...(typography.caption as React.CSSProperties), display: 'block', marginBottom: '4px' }}>
            Caption - Small helper or metadata text
          </div>
          <span style={{ fontSize: '12px', color: '#666', display: 'block' }}>
            {typography.caption.fontFamily} &bull; {typography.caption.fontSize} &bull; Weight: {typography.caption.fontWeight}
          </span>
        </div>
      </div>

      {/* Specifications Table */}
      <div style={{ padding: '24px', marginTop: '32px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>
          Especificaciones Completas
        </h3>
        <div style={{ marginTop: '16px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e0e0e0' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Variante</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Familia</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Tamano</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Peso</th>
                <th style={{ textAlign: 'left', padding: '12px 16px' }}>Altura de Linea</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(typography).map(([variant, specs]) => (
                <tr key={variant} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'monospace' }}>{variant}</td>
                  <td style={{ padding: '12px 16px' }}>{specs.fontFamily}</td>
                  <td style={{ padding: '12px 16px' }}>{specs.fontSize}</td>
                  <td style={{ padding: '12px 16px' }}>{specs.fontWeight}</td>
                  <td style={{ padding: '12px 16px' }}>{specs.lineHeight}</td>
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
{`// Importar tokens de tipografia
import { typography } from '@khipu/design-system';

// Usar en componente KdsTypography
<KdsTypography variant="heading1">
  Titulo Principal
</KdsTypography>

// Usar en style prop
<div style={{ ...typography.body1 }}>
  Texto con estilos de body1
</div>

// Aplicar propiedades individuales
<div style={{
  fontFamily: typography.h1.fontFamily,
  fontSize: typography.h1.fontSize,
  fontWeight: typography.h1.fontWeight,
}} />`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * Jerarquia de Encabezados
 *
 * Ejemplo de uso correcto de la jerarquia tipografica en una pagina.
 */
export const HeadingHierarchy: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h1 style={{ ...(typography.h1 as React.CSSProperties), marginBottom: '8px' }}>
        H1: Titulo Hero de Pagina
      </h1>
      <p style={{ ...(typography.body1 as React.CSSProperties), color: '#666', marginBottom: '32px' }}>
        Texto introductorio usando Body 1 para destacar el contenido principal.
      </p>

      <h2 style={{ ...(typography.h2 as React.CSSProperties), marginTop: '32px', marginBottom: '8px' }}>
        H2: Seccion Principal
      </h2>
      <p style={{ ...(typography.body1 as React.CSSProperties), marginBottom: '24px' }}>
        Contenido regular usando Body 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <h3 style={{ ...(typography.h3 as React.CSSProperties), marginTop: '24px', marginBottom: '8px' }}>
        H3: Subseccion
      </h3>
      <p style={{ ...(typography.body1 as React.CSSProperties), marginBottom: '24px' }}>
        Mas contenido de body text para explicar conceptos y proporcionar informacion.
      </p>

      <h4 style={{ ...(typography.h4 as React.CSSProperties), marginTop: '24px', marginBottom: '8px' }}>
        H4: Sub-subseccion
      </h4>
      <p style={{ ...(typography.body2 as React.CSSProperties), marginBottom: '16px' }}>
        Body 2 para texto secundario o notas adicionales.
      </p>

      <h5 style={{ ...(typography.h5 as React.CSSProperties), marginTop: '16px', marginBottom: '4px' }}>
        H5: Detalles Menores
      </h5>
      <span style={{ ...(typography.caption as React.CSSProperties), color: '#666' }}>
        Caption para metadata, timestamps, o informacion auxiliar.
      </span>
    </div>
  ),
};

/**
 * Escala de Tamanos
 *
 * Comparacion visual de todos los tamanos de fuente.
 */
export const FontSizeScale: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>
        Escala de Tamanos de Fuente
      </h2>
      <div style={{ padding: '24px', marginTop: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0' }}>
        {Object.entries(typography)
          .sort((a, b) => {
            const sizeA = parseFloat(a[1].fontSize);
            const sizeB = parseFloat(b[1].fontSize);
            return sizeB - sizeA;
          })
          .map(([variant, specs]) => (
            <div key={variant} style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #e0e0e0' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '8px' }}>
                <span style={{ minWidth: 100, fontFamily: 'monospace', fontSize: '12px', color: '#666' }}>
                  {variant}
                </span>
                <span style={{ minWidth: 60, fontSize: '12px', color: '#666' }}>
                  {specs.fontSize}
                </span>
                <span style={{ ...(specs as React.CSSProperties) }}>
                  The quick brown fox jumps over the lazy dog
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  ),
};
