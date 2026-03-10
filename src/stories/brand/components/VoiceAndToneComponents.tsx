import { KdsTypography as Typography } from '../../../components/core';

export function BrandVoiceCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
      <div style={{ padding: '24px', background: '#F8F5FA', borderRadius: '12px', borderLeft: '4px solid #8347AD' }}>
        <Typography variant="heading3" sx={{ marginBottom: '12px', color: '#8347AD' }}>
          🤝 Cercana
        </Typography>
        <Typography variant="body">
          Hablamos como un aliado confiable, no como una institución distante
        </Typography>
      </div>

      <div style={{ padding: '24px', background: '#F8F5FA', borderRadius: '12px', borderLeft: '4px solid #8347AD' }}>
        <Typography variant="heading3" sx={{ marginBottom: '12px', color: '#8347AD' }}>
          💎 Clara
        </Typography>
        <Typography variant="body">
          Eliminamos la jerga financiera innecesaria. Explicamos conceptos complejos de forma simple
        </Typography>
      </div>

      <div style={{ padding: '24px', background: '#F8F5FA', borderRadius: '12px', borderLeft: '4px solid #8347AD' }}>
        <Typography variant="heading3" sx={{ marginBottom: '12px', color: '#8347AD' }}>
          🔒 Confiable
        </Typography>
        <Typography variant="body">
          Transmitimos seguridad y profesionalismo sin ser intimidantes
        </Typography>
      </div>

      <div style={{ padding: '24px', background: '#F8F5FA', borderRadius: '12px', borderLeft: '4px solid #8347AD' }}>
        <Typography variant="heading3" sx={{ marginBottom: '12px', color: '#8347AD' }}>
          ⚡ Directa
        </Typography>
        <Typography variant="body">
          Vamos al grano. Respetamos el tiempo del usuario
        </Typography>
      </div>
    </div>
  );
}

export function WritingPrincipleCallout() {
  return (
    <div style={{
      padding: '20px 24px',
      background: 'linear-gradient(135deg, #F0E6F6 0%, #E8F5E9 100%)',
      borderRadius: '12px',
      borderLeft: '4px solid #8347AD',
      marginBottom: '32px'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <span style={{ fontSize: '24px', lineHeight: '1' }}>💡</span>
        <div>
          <Typography variant="body" sx={{ fontWeight: 600, marginBottom: '8px', display: 'block' }}>
            Principio clave: Comunicación digital efectiva
          </Typography>
          <Typography variant="body" sx={{ lineHeight: '1.6' }}>
            La comunicación digital apela a la <strong>concisión</strong>, al <strong>lenguaje concreto</strong> y <strong>cercano</strong>. Los usuarios escanean contenido en lugar de leerlo palabra por palabra, por lo que cada palabra debe aportar valor.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export function PunctuationContextCallout() {
  return (
    <div style={{
      padding: '20px 24px',
      background: '#FFF9E6',
      borderRadius: '12px',
      borderLeft: '4px solid #FF9800',
      marginBottom: '24px'
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <span style={{ fontSize: '24px', lineHeight: '1' }}>⚠️</span>
        <div>
          <Typography variant="body" sx={{ fontWeight: 600, marginBottom: '8px', display: 'block' }}>
            Contexto de aplicación
          </Typography>
          <Typography variant="body" sx={{ lineHeight: '1.6' }}>
            Estas reglas de puntuación son <strong>preferentemente usadas en lenguaje digital en el uso de interfaces de pago</strong> para facilitar la concisión. Las <strong>excepciones son permitidas</strong> en las redacciones de otro tipo de contenidos (documentación extensa, artículos, comunicados oficiales, etc.).
          </Typography>
        </div>
      </div>
    </div>
  );
}

export function WritingGuidelinesTable() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #E0E0E0' }}>
          <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', width: '50%' }}>✅ Recomendado</th>
          <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', width: '50%' }}>❌ Evitar</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Tú / Tu (tutear al usuario)</td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Usted (demasiado formal)</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Verbos activos y directos</td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Voz pasiva</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Frases cortas y concisas</td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Párrafos largos</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Lenguaje inclusivo</td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Lenguaje excluyente</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Números en lugar de palabras</td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Jerga técnica innecesaria</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Bullet points para listas</td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>Bloques de texto denso</td>
        </tr>
        <tr>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>
            Mayúscula inicial: Es la norma ortográfica estándar. La primera letra de cada oración siempre debe ir en mayúscula.<br/>
            <span style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
              (CamelCase solo en código/nombres propios)
            </span>
          </td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>
            CamelCase en contexto de usuarios<br/>
            <span style={{ fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
              (ej: "Ver Factura", "Mi Cuenta")
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function SpecificExamplesTable() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #E0E0E0' }}>
          <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', width: '50%' }}>✅ Recomendado</th>
          <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', width: '50%' }}>❌ Evitar</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px' }}>"Ingresa tu RUT y contraseña"</td>
          <td style={{ padding: '12px', fontSize: '14px' }}>"El usuario debe ingresar sus credenciales"</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px' }}>"Completa estos datos"</td>
          <td style={{ padding: '12px', fontSize: '14px' }}>"Favor de completar el formulario"</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px' }}>"Tu pago fue procesado"</td>
          <td style={{ padding: '12px', fontSize: '14px' }}>"Su transacción ha sido procesada exitosamente"</td>
        </tr>
        <tr>
          <td style={{ padding: '12px', fontSize: '14px' }}>"Continuar" (en el botón)</td>
          <td style={{ padding: '12px', fontSize: '14px' }}>"Click aquí para continuar"</td>
        </tr>
      </tbody>
    </table>
  );
}

export function MicrocopyTable() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #E0E0E0' }}>
          <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', width: '33.33%' }}>Elemento</th>
          <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', width: '33.33%' }}>✅ Recomendado</th>
          <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', width: '33.34%' }}>❌ Evitar</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600', verticalAlign: 'top' }}>Botones</td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>
            • Pagar ahora<br/>
            • Confirmar pago<br/>
            • Agregar cuenta
          </td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>
            • OK / Aceptar (como CTA)<br/>
            • Submit<br/>
            • Click aquí
          </td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600', verticalAlign: 'top' }}>Labels de formularios</td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>
            • Correo electrónico<br/>
            • Monto a pagar<br/>
            • Contraseña
          </td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>
            • Por favor ingrese su email<br/>
            • Ingrese el monto de la transacción<br/>
            • Ingrese su password
          </td>
        </tr>
        <tr>
          <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600', verticalAlign: 'top' }}>Mensajes de error</td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>
            • Ingresa un email válido<br/>
            • El RUT debe tener 8-9 dígitos<br/>
            • La contraseña debe tener al menos 8 caracteres
          </td>
          <td style={{ padding: '12px', fontSize: '14px', verticalAlign: 'top' }}>
            • Error en el campo<br/>
            • Formato inválido<br/>
            • Error de validación
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function PunctuationRulesTable() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #E0E0E0' }}>
          <th style={{ padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '14px', width: '60%' }}>Contexto</th>
          <th style={{ padding: '12px', textAlign: 'center', fontWeight: '600', fontSize: '14px', width: '40%' }}>Usa punto final</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px' }}><strong>Mensajes completos</strong> (alertas, confirmación, error, info, etc.)</td>
          <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>✅ Sí</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px' }}><strong>Oraciones descriptivas</strong></td>
          <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>✅ Sí</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px' }}><strong>Botones/CTAs</strong></td>
          <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>❌ No</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px' }}><strong>Labels de formularios</strong></td>
          <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>❌ No</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px' }}><strong>Títulos</strong></td>
          <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>❌ No</td>
        </tr>
        <tr style={{ borderBottom: '1px solid #F0F0F0' }}>
          <td style={{ padding: '12px', fontSize: '14px' }}><strong>Frases cortas de UI</strong></td>
          <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>❌ No</td>
        </tr>
        <tr>
          <td style={{ padding: '12px', fontSize: '14px' }}><strong>Listas</strong> (tabuladas/bullet points)</td>
          <td style={{ padding: '12px', fontSize: '14px', textAlign: 'center' }}>❌ No</td>
        </tr>
      </tbody>
    </table>
  );
}
