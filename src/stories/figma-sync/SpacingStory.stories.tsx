import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { spacing } from '../../tokens';

/**
 * Espaciado del Design System
 *
 * Sistema de espaciado del Khipu Design System basado en una unidad base de 4px.
 * Proporciona una escala consistente para márgenes, padding y gaps entre elementos.
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
 * Visualización de todos los valores de espaciado disponibles.
 */
export const FullScale: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Sistema de Espaciado
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        El sistema utiliza una unidad base de <strong>4px</strong> para crear una escala de
        espaciado consistente y predecible.
      </Typography>

      {/* Visual Scale */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          📏 Escala Visual
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Cada barra representa un valor de espaciado. Usa estos valores para márgenes,
          padding y gaps.
        </Typography>

        <Stack spacing={3} sx={{ mt: 3 }}>
          {Object.entries(spacing).map(([key, value]) => (
            <Box key={key}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    fontFamily: 'monospace',
                    minWidth: 60,
                    fontWeight: 600,
                  }}
                >
                  {key}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ minWidth: 50 }}
                >
                  {value}
                </Typography>
                <Box
                  sx={{
                    width: value,
                    height: 32,
                    bgcolor: 'primary.main',
                    borderRadius: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  {value}
                </Box>
              </Box>
            </Box>
          ))}
        </Stack>
      </Paper>

      {/* Specifications Table */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h5" gutterBottom>
          📊 Especificaciones
        </Typography>
        <TableContainer sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Token</strong></TableCell>
                <TableCell><strong>Valor</strong></TableCell>
                <TableCell><strong>Píxeles</strong></TableCell>
                <TableCell><strong>Uso Recomendado</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>0</TableCell>
                <TableCell>{spacing[0]}</TableCell>
                <TableCell>0px</TableCell>
                <TableCell>Sin espacio, elementos adyacentes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>1</TableCell>
                <TableCell>{spacing[1]}</TableCell>
                <TableCell>4px</TableCell>
                <TableCell>Espaciado mínimo, separadores sutiles</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>2</TableCell>
                <TableCell>{spacing[2]}</TableCell>
                <TableCell>8px</TableCell>
                <TableCell>Espaciado pequeño, elementos relacionados</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>3</TableCell>
                <TableCell>{spacing[3]}</TableCell>
                <TableCell>12px</TableCell>
                <TableCell>Espaciado compacto, grupos de elementos</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>4</TableCell>
                <TableCell>{spacing[4]}</TableCell>
                <TableCell>16px</TableCell>
                <TableCell>Espaciado estándar, padding de componentes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>6</TableCell>
                <TableCell>{spacing[6]}</TableCell>
                <TableCell>24px</TableCell>
                <TableCell>Espaciado medio, entre secciones relacionadas</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>8</TableCell>
                <TableCell>{spacing[8]}</TableCell>
                <TableCell>32px</TableCell>
                <TableCell>Espaciado generoso, padding de tarjetas</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>10</TableCell>
                <TableCell>{spacing[10]}</TableCell>
                <TableCell>40px</TableCell>
                <TableCell>Separación grande, entre componentes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>7</TableCell>
                <TableCell>{spacing[7]}</TableCell>
                <TableCell>56px</TableCell>
                <TableCell>Espaciado grande, grupos de elementos</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>8</TableCell>
                <TableCell>{spacing[8]}</TableCell>
                <TableCell>64px</TableCell>
                <TableCell>Separación de bloques importantes</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>9</TableCell>
                <TableCell>{spacing[9]}</TableCell>
                <TableCell>72px</TableCell>
                <TableCell>Espaciado extra grande</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>10</TableCell>
                <TableCell>{spacing[10]}</TableCell>
                <TableCell>80px</TableCell>
                <TableCell>Márgenes de layout, espaciado hero</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>11</TableCell>
                <TableCell>{spacing[11]}</TableCell>
                <TableCell>88px</TableCell>
                <TableCell>Espaciado muy grande, secciones principales</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontFamily: 'monospace' }}>12</TableCell>
                <TableCell>{spacing[12]}</TableCell>
                <TableCell>96px</TableCell>
                <TableCell>Espaciado máximo, separación de secciones</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

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
{`// Importar espaciado
import { spacing } from '@khipu/design-system';

// Usar en sx prop
<Box sx={{
  padding: spacing[4],        // 32px
  margin: spacing[6],          // 48px
  gap: spacing[2],            // 16px
}} />

// Combinar valores
<Box sx={{
  paddingX: spacing[4],       // 32px horizontal
  paddingY: spacing[2],       // 16px vertical
}} />

// Usar en Stack spacing
<Stack spacing={4}>          {/* 32px gap */}
  <Component1 />
  <Component2 />
</Stack>

// Usar en Grid spacing
<Grid container spacing={3}>  {/* 24px gap */}
  <Grid item xs={6}>...</Grid>
</Grid>

// Usar variables CSS
<div style={{
  padding: 'var(--kds-spacing-4)',
  margin: 'var(--kds-spacing-6)'
}} />`}
        </Typography>
      </Paper>
    </Box>
  ),
};

/**
 * Ejemplos de Uso
 *
 * Casos prácticos de aplicación del espaciado en componentes.
 */
export const UsageExamples: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Ejemplos de Uso de Espaciado
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {/* Card Padding Example */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 0, border: '2px dashed', borderColor: 'primary.main' }}>
            <Box sx={{ p: 4, bgcolor: 'primary.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                Card con padding[4]
              </Typography>
              <Typography variant="body2">
                El padding de 16px (spacing[4]) es ideal para tarjetas y contenedores pequeños.
              </Typography>
            </Box>
          </Paper>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            padding: spacing[4] (16px)
          </Typography>
        </Grid>

        {/* Large Card Example */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 0, border: '2px dashed', borderColor: 'secondary.main' }}>
            <Box sx={{ p: 8, bgcolor: 'secondary.light', color: 'white' }}>
              <Typography variant="h6" gutterBottom>
                Card con padding[8]
              </Typography>
              <Typography variant="body2">
                El padding de 64px (spacing[8]) es mejor para tarjetas destacadas o contenido importante.
              </Typography>
            </Box>
          </Paper>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            padding: spacing[8] (64px)
          </Typography>
        </Grid>

        {/* Stack Spacing Example */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Stack con spacing[2]
            </Typography>
            <Stack spacing={2} sx={{ mt: 2 }}>
              <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
                <Typography variant="body2">Elemento 1</Typography>
              </Paper>
              <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
                <Typography variant="body2">Elemento 2</Typography>
              </Paper>
              <Paper sx={{ p: 2, bgcolor: 'success.light' }}>
                <Typography variant="body2">Elemento 3</Typography>
              </Paper>
            </Stack>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              Gap de 16px (spacing[2]) entre elementos relacionados
            </Typography>
          </Paper>
        </Grid>

        {/* Section Spacing Example */}
        <Grid size={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6">
              Sección 1
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Contenido de la primera sección
            </Typography>

            <Box sx={{ mt: 12 }}>
              <Typography variant="h6">
                Sección 2
              </Typography>
              <Typography variant="body2" sx={{ mt: 2 }}>
                Contenido de la segunda sección separada por spacing[12] (96px)
              </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary" sx={{ mt: 4, display: 'block' }}>
              marginTop: spacing[12] (96px) para separar secciones principales
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  ),
};

/**
 * Comparación de Escalas
 *
 * Visualización lado a lado de diferentes valores de espaciado.
 */
export const ScaleComparison: Story = {
  render: () => (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Comparación de Escalas
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Comparación visual de los valores de espaciado más comúnmente usados.
      </Typography>

      <Paper sx={{ p: 4, mt: 3 }}>
        <Grid container spacing={4}>
          {[2, 4, 6, 8].map((scale) => (
            <Grid size={{ xs: 12, md: 6 }} key={scale}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                  spacing[{scale}] = {spacing[scale as keyof typeof spacing]}
                </Typography>
                <Box
                  sx={{
                    p: scale as any,
                    bgcolor: 'info.light',
                    border: '2px solid',
                    borderColor: 'info.main',
                    borderRadius: 1,
                  }}
                >
                  <Paper sx={{ p: 2, bgcolor: 'white' }}>
                    <Typography variant="body2">
                      Contenido con padding[{scale}]
                    </Typography>
                  </Paper>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Nested Spacing Example */}
      <Paper sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Espaciado Anidado
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          Ejemplo de cómo combinar diferentes niveles de espaciado.
        </Typography>

        <Box
          sx={{
            p: 8,
            bgcolor: 'primary.light',
            borderRadius: 2,
            mt: 2,
          }}
        >
          <Typography variant="caption" color="white" sx={{ mb: 2, display: 'block' }}>
            Contenedor: padding[8] (32px)
          </Typography>
          <Box
            sx={{
              p: 4,
              bgcolor: 'secondary.light',
              borderRadius: 1,
            }}
          >
            <Typography variant="caption" color="white" sx={{ mb: 2, display: 'block' }}>
              Tarjeta interior: padding[4] (16px)
            </Typography>
            <Box
              sx={{
                p: 2,
                bgcolor: 'success.light',
                borderRadius: 1,
              }}
            >
              <Typography variant="body2" color="white">
                Contenido: padding[2] (8px)
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Box>
  ),
};
