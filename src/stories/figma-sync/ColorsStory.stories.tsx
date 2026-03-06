import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid, Stack } from '@mui/material';
import { colors } from '../../tokens';

/**
 * Colores del Design System
 *
 * Paleta completa de colores del Khipu Design System extraída de Figma.
 * Incluye colores primarios, secundarios, semánticos, de texto y de fondo.
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
        component: 'Sistema de colores completo con todas las paletas semánticas.',
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
  <Box>
    <Box
      sx={{
        width: '100%',
        height: 80,
        bgcolor: value,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        mb: 1,
      }}
    />
    <Typography variant="body2" fontWeight={600}>
      {name}
    </Typography>
    <Typography variant="caption" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
      {value}
    </Typography>
    {description && (
      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
        {description}
      </Typography>
    )}
  </Box>
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
      // Skip nested objects like 'states'
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
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {description && (
        <Typography variant="body2" color="text.secondary" paragraph>
          {description}
        </Typography>
      )}
      <Grid container spacing={2}>
        {Object.entries(flatPalette).map(([key, value]) => (
          <Grid size={{ xs: 6, sm: 4, md: 3 }} key={key}>
            <ColorSwatch name={key} value={value} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

/**
 * Todos los Colores
 *
 * Vista completa de todas las paletas de colores disponibles en el sistema.
 */
export const AllColors: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Sistema de Colores
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Todas las paletas de colores del Khipu Design System, organizadas por categoría semántica.
      </Typography>

      <Stack spacing={4} sx={{ mt: 4 }}>
        {/* Primary */}
        <ColorPalette
          title="🎨 Primary - Púrpura Khipu"
          palette={colors.primary}
          description="Color principal de la marca Khipu. Usado en elementos principales de UI como botones primarios y enlaces."
        />

        {/* Secondary */}
        <ColorPalette
          title="🔷 Secondary - Teal"
          palette={colors.secondary}
          description="Color secundario complementario. Usado en elementos de soporte y acciones secundarias."
        />

        {/* Success */}
        <ColorPalette
          title="✅ Success - Verde"
          palette={colors.success}
          description="Indica operaciones exitosas, estados aprobados y mensajes de confirmación."
        />

        {/* Error */}
        <ColorPalette
          title="❌ Error - Rojo"
          palette={colors.error}
          description="Indica errores, validaciones fallidas y estados críticos que requieren atención."
        />

        {/* Warning */}
        <ColorPalette
          title="⚠️ Warning - Amarillo"
          palette={colors.warning}
          description="Indica advertencias, precauciones y estados que requieren revisión."
        />

        {/* Info */}
        <ColorPalette
          title="ℹ️ Info - Azul"
          palette={colors.info}
          description="Mensajes informativos, tooltips y elementos de ayuda contextual."
        />

        {/* Text */}
        <ColorPalette
          title="📝 Text - Colores de Texto"
          palette={colors.text}
          description="Jerarquía de colores para contenido textual, desde primario hasta deshabilitado."
        />

        {/* Background */}
        <ColorPalette
          title="🎭 Background - Fondos"
          palette={colors.background}
          description="Colores de fondo para diferentes superficies y niveles de elevación."
        />

        {/* Action */}
        <ColorPalette
          title="🔘 Action - Estados de Interacción"
          palette={colors.action}
          description="Estados visuales para elementos interactivos: hover, active, disabled, focus."
        />
      </Stack>

      {/* Usage Examples */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          📚 Uso en Código
        </Typography>
        <Typography variant="body2" component="pre" sx={{
          fontFamily: 'monospace',
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 1,
          overflow: 'auto'
        }}>
{`// Importar colores
import { colors } from '@khipu/design-system';

// Usar en sx prop
<Button sx={{
  bgcolor: colors.primary.main,
  '&:hover': { bgcolor: colors.primary.dark }
}} />

// Usar en styled components
const StyledBox = styled(Box)({
  backgroundColor: colors.background.paper,
  color: colors.text.primary,
});

// Usar variables CSS
<div style={{ color: 'var(--kds-color-primary-main)' }} />`}
        </Typography>
      </Paper>
    </Box>
  ),
};

/**
 * Paleta Principal
 *
 * Colores primarios y secundarios de la marca.
 */
export const BrandColors: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Colores de Marca
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ColorPalette
            title="Primary - Púrpura Khipu"
            palette={colors.primary}
            description="Color principal de la identidad de marca"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ColorPalette
            title="Secondary - Teal"
            palette={colors.secondary}
            description="Color secundario complementario"
          />
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Colores Semánticos
 *
 * Colores para estados y mensajes (success, error, warning, info).
 */
export const SemanticColors: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Colores Semánticos
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ColorPalette title="Success" palette={colors.success} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ColorPalette title="Error" palette={colors.error} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ColorPalette title="Warning" palette={colors.warning} />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ColorPalette title="Info" palette={colors.info} />
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Colores de Sistema
 *
 * Colores para texto, fondos y estados de interacción.
 */
export const SystemColors: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Colores de Sistema
      </Typography>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          <ColorPalette title="Text" palette={colors.text} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ColorPalette title="Background" palette={colors.background} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <ColorPalette title="Action" palette={colors.action} />
        </Grid>
      </Grid>
    </Box>
  ),
};
