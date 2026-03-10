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
      <div style={{ fontFamily: 'Public Sans', fontSize: '24px', fontWeight: '400', marginBottom: '12px', padding: '12px', background: '#F5F5F5', borderRadius: '8px' }}>
        <strong>Regular (400)</strong> — Contenido general y lectura
      </div>

      <div style={{ fontFamily: 'Public Sans', fontSize: '24px', fontWeight: '500', marginBottom: '12px', padding: '12px', background: '#F5F5F5', borderRadius: '8px' }}>
        <strong>Medium (500)</strong> — Labels, botones y énfasis sutil
      </div>

      <div style={{ fontFamily: 'Public Sans', fontSize: '24px', fontWeight: '600', marginBottom: '12px', padding: '12px', background: '#F5F5F5', borderRadius: '8px' }}>
        <strong>SemiBold (600)</strong> — Encabezados y títulos importantes
      </div>

      <div style={{ fontFamily: 'Public Sans', fontSize: '24px', fontWeight: '700', padding: '12px', background: '#F5F5F5', borderRadius: '8px' }}>
        <strong>Bold (700)</strong> — Máximo impacto y títulos display
      </div>
    </div>
  );
}
