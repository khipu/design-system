import { colors } from '../../../tokens';

export function BrandColorCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginTop: '32px', marginBottom: '48px' }}>
      {/* Color Primario */}
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Color primario: Púrpura Khipu</h3>

        <div style={{
          background: colors.primary.main,
          height: '140px',
          borderRadius: '12px',
          marginBottom: '12px'
        }} />
        <div style={{
          fontFamily: 'monospace',
          fontSize: '14px',
          color: '#666',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          #8347AD
        </div>

        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Propósito</h4>
        <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
          El púrpura es nuestro color de marca distintivo y representa:
        </p>
        <ul style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px', paddingLeft: '20px' }}>
          <li><strong>Innovación:</strong> Asociado con la creatividad y la tecnología de vanguardia</li>
          <li><strong>Confianza:</strong> Transmite profesionalismo y seguridad en el mundo financiero</li>
          <li><strong>Diferenciación:</strong> Nos distingue en un mercado donde predominan azules y verdes</li>
        </ul>

        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Cuándo usarlo</h4>
        <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px' }}>
          <li>Botones de acción primaria</li>
          <li>Elementos de navegación activos</li>
          <li>Elementos de marca</li>
          <li>Enlaces importantes</li>
        </ul>
      </div>

      {/* Color Secundario */}
      <div>
        <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>Color secundario: Cian/Turquesa</h3>

        <div style={{
          background: colors.secondary.main,
          height: '140px',
          borderRadius: '12px',
          marginBottom: '12px'
        }} />
        <div style={{
          fontFamily: 'monospace',
          fontSize: '14px',
          color: '#666',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          #3CB4E5
        </div>

        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Propósito</h4>
        <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
          El cian complementa al púrpura y aporta:
        </p>
        <ul style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px', paddingLeft: '20px' }}>
          <li><strong>Energía:</strong> Transmite dinamismo y modernidad</li>
          <li><strong>Accesibilidad:</strong> Proporciona contraste y balance visual</li>
          <li><strong>Complementariedad:</strong> Funciona en armonía sin competir con el primario</li>
        </ul>

        <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>Cuándo usarlo</h4>
        <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px' }}>
          <li>Acciones secundarias</li>
          <li>Elementos de soporte (íconos, badges)</li>
          <li>Acentos visuales</li>
          <li>Elementos decorativos</li>
        </ul>
      </div>
    </div>
  );
}

export function SemanticColorCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginTop: '32px', marginBottom: '48px' }}>
      {/* Info */}
      <div>
        <div style={{ background: colors.info.main, height: '120px', borderRadius: '12px', marginBottom: '8px' }} />
        <div style={{
          fontFamily: 'monospace',
          fontSize: '13px',
          color: '#666',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          #0288D1
        </div>
        <div style={{ fontWeight: '700', fontSize: '18px', marginBottom: '12px' }}>Info</div>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px', lineHeight: '1.5' }}>
          Información neutral, ayuda contextual, tooltips
        </div>
        <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
          <strong>Cuándo:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Mensajes informativos</li>
            <li>Tooltips y ayuda</li>
            <li>Notificaciones generales</li>
          </ul>
          <strong>Ejemplos:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>"Tu pago será procesado en 24-48 horas"</li>
          </ul>
        </div>
      </div>

      {/* Success */}
      <div>
        <div style={{ background: colors.success.main, height: '120px', borderRadius: '12px', marginBottom: '8px' }} />
        <div style={{
          fontFamily: 'monospace',
          fontSize: '13px',
          color: '#666',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          #2E7D32
        </div>
        <div style={{ fontWeight: '700', fontSize: '18px', marginBottom: '12px' }}>Success</div>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px', lineHeight: '1.5' }}>
          Operación exitosa, confirmación positiva
        </div>
        <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
          <strong>Cuándo:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Pagos exitosos</li>
            <li>Operaciones completadas</li>
            <li>Estados verificados</li>
          </ul>
          <strong>Ejemplos:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>"¡Pago realizado exitosamente!"</li>
          </ul>
        </div>
      </div>

      {/* Warning */}
      <div>
        <div style={{ background: colors.warning.main, height: '120px', borderRadius: '12px', marginBottom: '8px' }} />
        <div style={{
          fontFamily: 'monospace',
          fontSize: '13px',
          color: '#666',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          #ED6C02
        </div>
        <div style={{ fontWeight: '700', fontSize: '18px', marginBottom: '12px' }}>Warning</div>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px', lineHeight: '1.5' }}>
          Advertencia, precaución, acción requerida
        </div>
        <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
          <strong>Cuándo:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Atención no crítica</li>
            <li>Límites próximos</li>
            <li>Acciones con consecuencias</li>
          </ul>
          <strong>Ejemplos:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>"Esta acción no se puede deshacer"</li>
          </ul>
        </div>
      </div>

      {/* Error */}
      <div>
        <div style={{ background: colors.error.main, height: '120px', borderRadius: '12px', marginBottom: '8px' }} />
        <div style={{
          fontFamily: 'monospace',
          fontSize: '13px',
          color: '#666',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          #D32F2F
        </div>
        <div style={{ fontWeight: '700', fontSize: '18px', marginBottom: '12px' }}>Error</div>
        <div style={{ fontSize: '14px', color: '#666', marginBottom: '12px', lineHeight: '1.5' }}>
          Error, fallo, acción destructiva
        </div>
        <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
          <strong>Cuándo:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>Errores en formularios</li>
            <li>Operaciones fallidas</li>
            <li>Acciones destructivas</li>
          </ul>
          <strong>Ejemplos:</strong>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>"El pago no pudo ser procesado"</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
