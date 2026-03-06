import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import { colors, spacing, typography, borderRadius, shadows } from '../../tokens';

/**
 * Design Tokens Overview
 *
 * Esta página muestra todos los tokens de diseño del Khipu Design System.
 * Estos tokens son la fuente de verdad para colores, tipografía, espaciado, y más.
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
        component: 'Vista general de todos los tokens de diseño del sistema.',
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
    <Box sx={{ p: 3 }}>
      <Typography variant="h3" gutterBottom>
        Design Tokens - Resumen
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        El Khipu Design System está construido sobre un conjunto completo de tokens de diseño
        extraídos de Figma y mantenidos en código.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {/* Colors */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              🎨 Colores
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Paletas de colores semánticos
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 24, height: 24, bgcolor: colors.primary.main, borderRadius: 1 }} />
                <Typography variant="body2">Primary</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 24, height: 24, bgcolor: colors.secondary.main, borderRadius: 1 }} />
                <Typography variant="body2">Secondary</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 24, height: 24, bgcolor: colors.success.main, borderRadius: 1 }} />
                <Typography variant="body2">Success</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 24, height: 24, bgcolor: colors.error.main, borderRadius: 1 }} />
                <Typography variant="body2">Error</Typography>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              + warning, info, text, background, action
            </Typography>
          </Paper>
        </Grid>

        {/* Typography */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              📝 Tipografía
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              13 variantes de texto
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {Object.keys(typography).slice(0, 6).map((variant) => (
                <Typography key={variant} variant="body2">
                  {variant}
                </Typography>
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              + {Object.keys(typography).length - 6} más variantes
            </Typography>
          </Paper>
        </Grid>

        {/* Spacing */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              📏 Espaciado
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Escala de espaciado consistente
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {Object.entries(spacing).slice(0, 6).map(([key, value]) => (
                <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: value,
                      height: 16,
                      bgcolor: 'primary.main',
                      borderRadius: 0.5,
                    }}
                  />
                  <Typography variant="body2">
                    {key}: {value}
                  </Typography>
                </Box>
              ))}
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 2, display: 'block' }}>
              Base unit: 4px
            </Typography>
          </Paper>
        </Grid>

        {/* Border Radius */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              ⬜ Border Radius
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Radios de borde por componente
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {Object.entries(borderRadius).slice(0, 6).map(([key, value]) => (
                <Box key={key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: 'primary.main',
                      borderRadius: value,
                    }}
                  />
                  <Typography variant="body2">
                    {key}: {value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Shadows */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              ✨ Sombras
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Sistema de elevación
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {Object.entries(shadows).slice(0, 4).map(([key, value]) => (
                <Box key={key}>
                  <Typography variant="caption" color="text.secondary">
                    {key}
                  </Typography>
                  <Box
                    sx={{
                      mt: 0.5,
                      width: '100%',
                      height: 40,
                      bgcolor: 'background.paper',
                      boxShadow: value === 'none' ? 'none' : value,
                      borderRadius: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="caption">Sample</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Stats */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Paper sx={{ p: 3, height: '100%', bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h6" gutterBottom>
              📊 Estadísticas
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <Box>
                <Typography variant="h3">{Object.keys(colors).length}</Typography>
                <Typography variant="body2">Paletas de colores</Typography>
              </Box>
              <Box>
                <Typography variant="h3">{Object.keys(typography).length}</Typography>
                <Typography variant="body2">Variantes de tipografía</Typography>
              </Box>
              <Box>
                <Typography variant="h3">{Object.keys(spacing).length}</Typography>
                <Typography variant="body2">Niveles de espaciado</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Footer info */}
      <Paper sx={{ p: 3, mt: 4, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          🔄 Sincronización con Figma
        </Typography>
        <Typography variant="body2" paragraph>
          Estos tokens se mantienen sincronizados con el archivo{' '}
          <strong>K-Tokens for Figma - Material UI</strong> en Figma.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Última actualización:</strong> Tokens mantenidos en <code>src/tokens/index.ts</code>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Para sincronizar:</strong> <code>npm run sync:figma:tokens</code>
        </Typography>
      </Paper>
    </Box>
  ),
};
