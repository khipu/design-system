import type { Meta, StoryObj } from '@storybook/react';
import { colors } from '../../tokens';

/**
 * Colores del Design System
 *
 * Paleta completa de colores del Khipu Design System extraida de Figma.
 * Incluye colores primarios, secundarios, semanticos, de texto y de fondo.
 *
 * **Fuente:** `src/tokens/index.ts`
 * **Referencia en Figma:** K-Tokens for Figma - Material UI
 */
const meta = {
  title: 'Design System/Tokens/Colors',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Sistema de colores completo con todas las paletas semanticas.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

interface ColorSwatchProps {
  name: string;
  value: string;
  description?: string;
}

const ColorSwatch = ({ name, value, description }: ColorSwatchProps) => (
  <div>
    <div
      style={{
        width: '100%',
        height: 80,
        backgroundColor: value,
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        marginBottom: '8px',
      }}
    />
    <div style={{ fontWeight: 600, fontSize: '14px' }}>
      {name}
    </div>
    <div style={{ fontSize: '12px', color: '#666', fontFamily: 'monospace' }}>
      {value}
    </div>
    {description && (
      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
        {description}
      </div>
    )}
  </div>
);

interface ColorPaletteProps {
  title: string;
  palette: Record<string, any>;
  description?: string;
}

// Helper function to flatten nested color palettes
const flattenColorPalette = (palette: Record<string, any>): Record<string, string> => {
  const flattened: Record<string, string> = {};

  Object.entries(palette).forEach(([key, value]) => {
    if (typeof value === 'string') {
      flattened[key] = value;
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([nestedKey, nestedValue]) => {
        if (typeof nestedValue === 'string') {
          flattened[`${key}.${nestedKey}`] = nestedValue;
        }
      });
    }
  });

  return flattened;
};

const ColorPalette = ({ title, palette, description }: ColorPaletteProps) => {
  const flatPalette = flattenColorPalette(palette);

  return (
    <div style={{ padding: '24px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e0e0e0', height: '100%' }}>
      <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>
        {title}
      </h3>
      {description && (
        <p style={{ color: '#666', fontSize: '14px', margin: '0 0 16px 0' }}>
          {description}
        </p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '16px' }}>
        {Object.entries(flatPalette).map(([key, value]) => (
          <ColorSwatch key={key} name={key} value={value} />
        ))}
      </div>
    </div>
  );
};

/**
 * Todos los Colores
 *
 * Vista completa de todas las paletas de colores disponibles en el sistema.
 */
export const AllColors: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 8px 0', fontSize: '30px' }}>
        Sistema de Colores
      </h2>
      <p style={{ color: '#666', fontSize: '16px', margin: '0 0 32px 0' }}>
        Todas las paletas de colores del Khipu Design System, organizadas por categoria semantica.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginTop: '32px' }}>
        <ColorPalette
          title="Primary - Purpura Khipu"
          palette={colors.primary}
          description="Color principal de la marca Khipu. Usado en elementos principales de UI como botones primarios y enlaces."
        />

        <ColorPalette
          title="Secondary - Teal"
          palette={colors.secondary}
          description="Color secundario complementario. Usado en elementos de soporte y acciones secundarias."
        />

        <ColorPalette
          title="Success - Verde"
          palette={colors.success}
          description="Indica operaciones exitosas, estados aprobados y mensajes de confirmacion."
        />

        <ColorPalette
          title="Error - Rojo"
          palette={colors.error}
          description="Indica errores, validaciones fallidas y estados criticos que requieren atencion."
        />

        <ColorPalette
          title="Warning - Amarillo"
          palette={colors.warning}
          description="Indica advertencias, precauciones y estados que requieren revision."
        />

        <ColorPalette
          title="Info - Azul"
          palette={colors.info}
          description="Mensajes informativos, tooltips y elementos de ayuda contextual."
        />

        <ColorPalette
          title="Text - Colores de Texto"
          palette={colors.text}
          description="Jerarquia de colores para contenido textual, desde primario hasta deshabilitado."
        />

        <ColorPalette
          title="Background - Fondos"
          palette={colors.background}
          description="Colores de fondo para diferentes superficies y niveles de elevacion."
        />

        <ColorPalette
          title="Action - Estados de Interaccion"
          palette={colors.action}
          description="Estados visuales para elementos interactivos: hover, active, disabled, focus."
        />
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
{`// Importar colores
import { colors } from '@khipu/design-system';

// Usar en style prop
<button style={{
  backgroundColor: colors.primary.main,
}} />

// Usar variables CSS
<div style={{ color: 'var(--kds-color-primary-main)' }} />`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * Paleta Principal
 *
 * Colores primarios y secundarios de la marca.
 */
export const BrandColors: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>
        Colores de Marca
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '16px' }}>
        <ColorPalette
          title="Primary - Purpura Khipu"
          palette={colors.primary}
          description="Color principal de la identidad de marca"
        />
        <ColorPalette
          title="Secondary - Teal"
          palette={colors.secondary}
          description="Color secundario complementario"
        />
      </div>
    </div>
  ),
};

/**
 * Colores Semanticos
 *
 * Colores para estados y mensajes (success, error, warning, info).
 */
export const SemanticColors: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>
        Colores Semanticos
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', marginTop: '16px' }}>
        <ColorPalette title="Success" palette={colors.success} />
        <ColorPalette title="Error" palette={colors.error} />
        <ColorPalette title="Warning" palette={colors.warning} />
        <ColorPalette title="Info" palette={colors.info} />
      </div>
    </div>
  ),
};

/**
 * Colores de Sistema
 *
 * Colores para texto, fondos y estados de interaccion.
 */
export const SystemColors: Story = {
  render: () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ margin: '0 0 16px 0', fontSize: '24px' }}>
        Colores de Sistema
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '16px' }}>
        <ColorPalette title="Text" palette={colors.text} />
        <ColorPalette title="Background" palette={colors.background} />
        <ColorPalette title="Action" palette={colors.action} />
      </div>
    </div>
  ),
};
