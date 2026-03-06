import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { typography } from '../../tokens';

/**
 * Tipografía del Design System
 *
 * Sistema completo de tipografía del Khipu Design System.
 * Incluye todas las variantes de texto con sus propiedades de fuente, tamaño, peso y altura de línea.
 *
 * **Fuentes:**
 * - Primary: Public Sans (títulos, encabezados, UI)
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
        component: 'Sistema de tipografía con variantes predefinidas basadas en MUI.',
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Todas las Variantes
 *
 * Muestra todas las variantes de tipografía del sistema con ejemplos en vivo.
 */
export const AllVariants: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Sistema de Tipografía
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        El Khipu Design System utiliza dos familias tipográficas: <strong>Public Sans</strong> para
        títulos y elementos de UI, y <strong>Roboto</strong> para cuerpo de texto.
      </Typography>

      {/* Heading Variants */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Heading Variants
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Encabezados jerárquicos para estructura de contenido.
        </Typography>

        <Box sx={{ mt: 3 }}>
          {(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const).map((variant) => (
            <Box key={variant} sx={{ mb: 3 }}>
              <Typography variant={variant} gutterBottom>
                {variant.toUpperCase()} - The quick brown fox
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {typography[variant].fontFamily} • {typography[variant].fontSize} • Weight: {typography[variant].fontWeight}
              </Typography>
            </Box>
          ))}
        </Box>
      </Paper>

      {/* Body Variants */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Body Variants
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Textos de cuerpo para contenido principal.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" gutterBottom>
            Body 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
            {typography.body1.fontFamily} • {typography.body1.fontSize} • Weight: {typography.body1.fontWeight}
          </Typography>

          <Typography variant="body2" gutterBottom>
            Body 2 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {typography.body2.fontFamily} • {typography.body2.fontSize} • Weight: {typography.body2.fontWeight}
          </Typography>
        </Box>
      </Paper>

      {/* UI Variants */}
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          UI Variants
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Textos para elementos de interfaz como botones, labels y subtítulos.
        </Typography>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Subtitle 1 - Secondary descriptive text
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
            {typography.subtitle1.fontFamily} • {typography.subtitle1.fontSize} • Weight: {typography.subtitle1.fontWeight}
          </Typography>

          <Typography variant="subtitle2" gutterBottom>
            Subtitle 2 - Smaller secondary text
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
            {typography.subtitle2.fontFamily} • {typography.subtitle2.fontSize} • Weight: {typography.subtitle2.fontWeight}
          </Typography>

          <Typography variant="button" display="block" gutterBottom>
            BUTTON TEXT
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mb: 3 }}>
            {typography.button.fontFamily} • {typography.button.fontSize} • Weight: {typography.button.fontWeight}
          </Typography>

          <Typography variant="caption" gutterBottom display="block">
            Caption - Small helper or metadata text
          </Typography>
          <Typography variant="caption" color="text.secondary" display="block">
            {typography.caption.fontFamily} • {typography.caption.fontSize} • Weight: {typography.caption.fontWeight}
          </Typography>
        </Box>
      </Paper>

      {/* Specifications Table */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          Especificaciones Completas
        </Typography>
        <TableContainer sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell><strong>Variante</strong></TableCell>
                <TableCell><strong>Familia</strong></TableCell>
                <TableCell><strong>Tamaño</strong></TableCell>
                <TableCell><strong>Peso</strong></TableCell>
                <TableCell><strong>Altura de Línea</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(typography).map(([variant, specs]) => (
                <TableRow key={variant}>
                  <TableCell sx={{ fontFamily: 'monospace' }}>{variant}</TableCell>
                  <TableCell>{specs.fontFamily}</TableCell>
                  <TableCell>{specs.fontSize}</TableCell>
                  <TableCell>{specs.fontWeight}</TableCell>
                  <TableCell>{specs.lineHeight}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Usage Examples */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Uso en Código
        </Typography>
        <Typography variant="body2" component="pre" sx={{
          fontFamily: 'monospace',
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: 1,
          overflow: 'auto'
        }}>
{`// Importar tokens de tipografía
import { typography } from '@khipu/design-system';

// Usar en componente Typography
<Typography variant="h1">
  Título Principal
</Typography>

// Usar en sx prop
<Box sx={{ ...typography.body1 }}>
  Texto con estilos de body1
</Box>

// Aplicar propiedades individuales
<Box sx={{
  fontFamily: typography.h1.fontFamily,
  fontSize: typography.h1.fontSize,
  fontWeight: typography.h1.fontWeight,
}} />`}
        </Typography>
      </Paper>
    </Box>
  ),
};

/**
 * Jerarquía de Encabezados
 *
 * Ejemplo de uso correcto de la jerarquía tipográfica en una página.
 */
export const HeadingHierarchy: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" gutterBottom>
        H1: Título Hero de Página
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Texto introductorio usando Body 1 para destacar el contenido principal.
      </Typography>

      <Typography variant="h2" gutterBottom sx={{ mt: 4 }}>
        H2: Sección Principal
      </Typography>
      <Typography variant="body1" paragraph>
        Contenido regular usando Body 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </Typography>

      <Typography variant="h3" gutterBottom sx={{ mt: 3 }}>
        H3: Subsección
      </Typography>
      <Typography variant="body1" paragraph>
        Más contenido de body text para explicar conceptos y proporcionar información.
      </Typography>

      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        H4: Sub-subsección
      </Typography>
      <Typography variant="body2" paragraph>
        Body 2 para texto secundario o notas adicionales.
      </Typography>

      <Typography variant="h5" gutterBottom sx={{ mt: 2 }}>
        H5: Detalles Menores
      </Typography>
      <Typography variant="caption" color="text.secondary">
        Caption para metadata, timestamps, o información auxiliar.
      </Typography>
    </Box>
  ),
};

/**
 * Escala de Tamaños
 *
 * Comparación visual de todos los tamaños de fuente.
 */
export const FontSizeScale: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Escala de Tamaños de Fuente
      </Typography>
      <Paper sx={{ p: 3, mt: 3 }}>
        {Object.entries(typography)
          .sort((a, b) => {
            const sizeA = parseFloat(a[1].fontSize);
            const sizeB = parseFloat(b[1].fontSize);
            return sizeB - sizeA;
          })
          .map(([variant, specs]) => (
            <Box key={variant} sx={{ mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, mb: 1 }}>
                <Typography variant="caption" color="text.secondary" sx={{ minWidth: 100, fontFamily: 'monospace' }}>
                  {variant}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ minWidth: 60 }}>
                  {specs.fontSize}
                </Typography>
                <Typography sx={{ ...specs }}>
                  The quick brown fox jumps over the lazy dog
                </Typography>
              </Box>
            </Box>
          ))}
      </Paper>
    </Box>
  ),
};
