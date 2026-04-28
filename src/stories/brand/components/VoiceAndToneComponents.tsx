import { KdsTypography as Typography } from '../../../components/core';
import { colors, spacing, fontSizes, fontWeights, borderRadius, borders } from '../../../tokens';

export function BrandVoiceCards() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
      <div style={{ padding: '24px', background: colors.background.brandSubtle, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.primary.main}` }}>
        <Typography variant="heading3" sx={{ marginBottom: '12px', color: colors.primary.main }}>
          🤝 Cercana
        </Typography>
        <Typography variant="body">
          Hablamos como un aliado confiable, no como una institución distante
        </Typography>
      </div>

      <div style={{ padding: '24px', background: colors.background.brandSubtle, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.primary.main}` }}>
        <Typography variant="heading3" sx={{ marginBottom: '12px', color: colors.primary.main }}>
          💎 Clara
        </Typography>
        <Typography variant="body">
          Eliminamos la jerga financiera innecesaria. Explicamos conceptos complejos de forma simple
        </Typography>
      </div>

      <div style={{ padding: '24px', background: colors.background.brandSubtle, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.primary.main}` }}>
        <Typography variant="heading3" sx={{ marginBottom: '12px', color: colors.primary.main }}>
          🔒 Confiable
        </Typography>
        <Typography variant="body">
          Transmitimos seguridad y profesionalismo sin ser intimidantes
        </Typography>
      </div>

      <div style={{ padding: '24px', background: colors.background.brandSubtle, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.primary.main}` }}>
        <Typography variant="heading3" sx={{ marginBottom: '12px', color: colors.primary.main }}>
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
      background: `linear-gradient(135deg, ${colors.primary.container} 0%, #E8F5E9 100%)`,
      borderRadius: borderRadius.lg,
      borderLeft: `${borders.widthLg} solid ${colors.primary.main}`,
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
      background: colors.warning.container,
      borderRadius: borderRadius.lg,
      borderLeft: `${borders.widthLg} solid ${colors.warning.light}`,
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
        <tr style={{ borderBottom: borders.tableHeader }}>
          <th style={{ padding: spacing[1.5], textAlign: 'left', fontWeight: fontWeights.semiBold, fontSize: fontSizes.sm, width: '50%' }}>✅ Recomendado</th>
          <th style={{ padding: spacing[1.5], textAlign: 'left', fontWeight: fontWeights.semiBold, fontSize: fontSizes.sm, width: '50%' }}>❌ Evitar</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Tú / Tu (tutear al usuario)</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Usted (demasiado formal)</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Verbos activos y directos</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Voz pasiva</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Frases cortas y concisas</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Párrafos largos</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Lenguaje inclusivo</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Lenguaje excluyente</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Números en lugar de palabras</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Jerga técnica innecesaria</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Bullet points para listas</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>Bloques de texto denso</td>
        </tr>
        <tr>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>
            Mayúscula inicial: Es la norma ortográfica estándar. La primera letra de cada oración siempre debe ir en mayúscula.<br/>
            <span style={{ fontSize: fontSizes.xs, color: colors.text.footer, fontStyle: 'italic' }}>
              (CamelCase solo en código/nombres propios)
            </span>
          </td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>
            CamelCase en contexto de usuarios<br/>
            <span style={{ fontSize: fontSizes.xs, color: colors.text.footer, fontStyle: 'italic' }}>
              (ej: &quot;Ver Factura&quot;, &quot;Mi Cuenta&quot;)
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
        <tr style={{ borderBottom: borders.tableHeader }}>
          <th style={{ padding: spacing[1.5], textAlign: 'left', fontWeight: fontWeights.semiBold, fontSize: fontSizes.sm, width: '50%' }}>✅ Recomendado</th>
          <th style={{ padding: spacing[1.5], textAlign: 'left', fontWeight: fontWeights.semiBold, fontSize: fontSizes.sm, width: '50%' }}>❌ Evitar</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}>&quot;Ingresa tu RUT y contraseña&quot;</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}>&quot;El usuario debe ingresar sus credenciales&quot;</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}>&quot;Completa estos datos&quot;</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}>&quot;Favor de completar el formulario&quot;</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}>&quot;Tu pago fue procesado&quot;</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}>&quot;Su transacción ha sido procesada exitosamente&quot;</td>
        </tr>
        <tr>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}>&quot;Continuar&quot; (en el botón)</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}>&quot;Click aquí para continuar&quot;</td>
        </tr>
      </tbody>
    </table>
  );
}

export function MicrocopyTable() {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '32px' }}>
      <thead>
        <tr style={{ borderBottom: borders.tableHeader }}>
          <th style={{ padding: spacing[1.5], textAlign: 'left', fontWeight: fontWeights.semiBold, fontSize: fontSizes.sm, width: '33.33%' }}>Elemento</th>
          <th style={{ padding: spacing[1.5], textAlign: 'left', fontWeight: fontWeights.semiBold, fontSize: fontSizes.sm, width: '33.33%' }}>✅ Recomendado</th>
          <th style={{ padding: spacing[1.5], textAlign: 'left', fontWeight: fontWeights.semiBold, fontSize: fontSizes.sm, width: '33.34%' }}>❌ Evitar</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, verticalAlign: 'top' }}>Botones</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>
            • Pagar ahora<br/>
            • Confirmar pago<br/>
            • Agregar cuenta
          </td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>
            • OK / Aceptar (como CTA)<br/>
            • Submit<br/>
            • Click aquí
          </td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, verticalAlign: 'top' }}>Labels de formularios</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>
            • Correo electrónico<br/>
            • Monto a pagar<br/>
            • Contraseña
          </td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>
            • Por favor ingrese su email<br/>
            • Ingrese el monto de la transacción<br/>
            • Ingrese su password
          </td>
        </tr>
        <tr>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, verticalAlign: 'top' }}>Mensajes de error</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>
            • Ingresa un email válido<br/>
            • El RUT debe tener 8-9 dígitos<br/>
            • La contraseña debe tener al menos 8 caracteres
          </td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, verticalAlign: 'top' }}>
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
        <tr style={{ borderBottom: borders.tableHeader }}>
          <th style={{ padding: spacing[1.5], textAlign: 'left', fontWeight: fontWeights.semiBold, fontSize: fontSizes.sm, width: '60%' }}>Contexto</th>
          <th style={{ padding: spacing[1.5], textAlign: 'center', fontWeight: fontWeights.semiBold, fontSize: fontSizes.sm, width: '40%' }}>Usa punto final</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}><strong>Mensajes completos</strong> (alertas, confirmación, error, info, etc.)</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, textAlign: 'center' }}>✅ Sí</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}><strong>Oraciones descriptivas</strong></td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, textAlign: 'center' }}>✅ Sí</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}><strong>Botones/CTAs</strong></td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, textAlign: 'center' }}>❌ No</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}><strong>Labels de formularios</strong></td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, textAlign: 'center' }}>❌ No</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}><strong>Títulos</strong></td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, textAlign: 'center' }}>❌ No</td>
        </tr>
        <tr style={{ borderBottom: borders.tableRow }}>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}><strong>Frases cortas de UI</strong></td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, textAlign: 'center' }}>❌ No</td>
        </tr>
        <tr>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm }}><strong>Listas</strong> (tabuladas/bullet points)</td>
          <td style={{ padding: spacing[1.5], fontSize: fontSizes.sm, textAlign: 'center' }}>❌ No</td>
        </tr>
      </tbody>
    </table>
  );
}
