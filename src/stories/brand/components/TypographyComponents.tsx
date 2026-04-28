import { colors, fontFamilies, fontWeights, fontSizes, spacing, borderRadius } from '../../../tokens';

export function PublicSansReasons() {
  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <strong>Legibilidad y accesibilidad</strong>
        <p>
          Diseñada específicamente para máxima legibilidad en pantalla y cumple con todos los estándares de accesibilidad web. Funciona perfectamente desde títulos grandes hasta texto pequeño, formularios y elementos de UI.
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <strong>Personalidad de marca</strong>
        <p>
          Su estética geométrica transmite innovación y modernidad sin ser trendy. Es contemporánea pero atemporal, reforzando nuestra identidad: moderna, confiable y accesible.
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <strong>Versatilidad universal</strong>
        <p>
          Al usar una sola familia tipográfica para todo (títulos, contenido, formularios, botones, tablas), creamos una experiencia visual coherente y reducimos complejidad técnica.
        </p>
      </div>

      <div style={{ marginBottom: '24px' }}>
        <strong>Código abierto</strong>
        <p>
          Disponible gratuitamente, garantiza consistencia en cualquier proyecto sin costos de licenciamiento.
        </p>
      </div>
    </>
  );
}

export function FontWeightSamples() {
  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ fontFamily: fontFamilies.primary, fontSize: fontSizes['2xl'], fontWeight: fontWeights.regular, marginBottom: '12px', padding: spacing[1.5], background: colors.background.elevated, borderRadius: borderRadius.md }}>
        <strong>Regular (400)</strong> — Contenido general y lectura
      </div>

      <div style={{ fontFamily: fontFamilies.primary, fontSize: fontSizes['2xl'], fontWeight: fontWeights.medium, marginBottom: '12px', padding: spacing[1.5], background: colors.background.elevated, borderRadius: borderRadius.md }}>
        <strong>Medium (500)</strong> — Labels, botones y énfasis sutil
      </div>

      <div style={{ fontFamily: fontFamilies.primary, fontSize: fontSizes['2xl'], fontWeight: fontWeights.semiBold, marginBottom: '12px', padding: spacing[1.5], background: colors.background.elevated, borderRadius: borderRadius.md }}>
        <strong>SemiBold (600)</strong> — Encabezados y títulos importantes
      </div>

      <div style={{ fontFamily: fontFamilies.primary, fontSize: fontSizes['2xl'], fontWeight: fontWeights.bold, padding: spacing[1.5], background: colors.background.elevated, borderRadius: borderRadius.md }}>
        <strong>Bold (700)</strong> — Máximo impacto y títulos display
      </div>
    </div>
  );
}
