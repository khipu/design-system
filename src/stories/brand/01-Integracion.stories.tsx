import type { Meta, StoryObj } from '@storybook/react';
import { colors, spacing, fontFamilies, fontSizes, fontWeights, borderRadius, borders } from '../../tokens';

const meta: Meta = {
  title: 'Brand',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
  tags: ['!autodocs'],
};

export default meta;

export const Integración: StoryObj = {
  name: 'Integración',
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: `${spacing[5]} ${spacing[2.5]}` }}>
      <h1>Integración</h1>

      <p>Aprende a integrar el Design System de Khipu con agentes de IA para generar contenido consistente con la marca.</p>

      <h2>📚 Navegación de la guía</h2>

      <p>Esta guía está organizada en las siguientes secciones:</p>

      <ol>
        <li><strong>Integración</strong>: Opciones para integrar con agentes de IA</li>
        <li><strong>Uso de marca</strong>: Uso correcto del logotipo y variantes</li>
        <li><strong>Uso de colores</strong>: Paleta de colores y aplicación</li>
        <li><strong>Uso tipográfico</strong>: Fundamentos de la familia tipográfica</li>
        <li><strong>Voz y tono</strong>: Guías de comunicación y redacción</li>
      </ol>

      <blockquote style={{
        borderLeft: `${borders.widthLg} solid ${colors.primary.main}`,
        paddingLeft: spacing[2],
        margin: `${spacing[3]} 0`,
        background: colors.background.brandSubtle,
        padding: spacing[2],
        borderRadius: borderRadius.md
      }}>
        <strong>Qué opción elegir:</strong>
        <ul style={{ marginBottom: 0, marginTop: spacing[1] }}>
          <li><strong>Opción 1 (BRAND_GUIDE_FOR_AI.md)</strong>: Ideal para <strong>voz, tono y copy</strong></li>
          <li><strong>Opción 2 (storybook-mcp)</strong>: Ideal para <strong>componentes e implementación</strong></li>
        </ul>
        <p style={{ marginTop: spacing[1.5], marginBottom: 0, fontStyle: 'italic' }}>
          <em>Tip: Usa ambas opciones juntas para máxima cobertura (guías de marca + componentes UI)</em>
        </p>
      </blockquote>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing[3], marginBottom: spacing[4] }}>
        {/* Opción 1: URL pública */}
        <div style={{ padding: spacing[3], background: colors.background.brandSubtle, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.primary.main}` }}>
          <h3 style={{ fontSize: fontSizes.lg, marginTop: 0, color: colors.primary.main }}>Opción 1: URL pública</h3>
          <p style={{ fontSize: fontSizes.xs, fontWeight: fontWeights.semiBold, color: colors.primary.main, marginTop: '-8px', marginBottom: spacing[1.5] }}>
            Ideal para voz, tono y copy
          </p>

          <p style={{ fontSize: fontSizes.sm, lineHeight: '1.6', marginBottom: spacing[2] }}>
            Usa esta URL para acceder a la guía completa de marca de Khipu:
          </p>

          <div style={{ marginBottom: spacing[2], padding: spacing[2], background: colors.background.paper, borderRadius: borderRadius.md, border: `${borders.widthMd} solid ${colors.primary.main}` }}>
            <p style={{ fontSize: fontSizes.xs, fontWeight: fontWeights.semiBold, marginBottom: spacing[1], marginTop: 0, color: colors.primary.main }}>URL PÚBLICA</p>
            <code style={{
              display: 'block',
              fontSize: '13px',
              background: colors.background.elevated,
              padding: spacing[1.5],
              borderRadius: '6px',
              wordBreak: 'break-all',
              fontFamily: fontFamilies.mono
            }}>
              https://design.khipu.com/BRAND_GUIDE_FOR_AI.md
            </code>
          </div>

          <p style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>Cómo usar esta URL:</p>
          <ol style={{ fontSize: fontSizes.sm, lineHeight: '1.8', paddingLeft: spacing[2.5] }}>
            <li>Copia la URL de arriba</li>
            <li>
              <div>En tu conversación con el modelo de IA, escribe:</div>
              <code style={{ fontSize: '13px', background: colors.background.elevated, padding: `${spacing[0.5]} ${spacing[1]}`, borderRadius: borderRadius.sm, display: 'block', marginTop: spacing[0.5] }}>
                "Lee el contenido de esta URL: [pega la URL aquí]"
              </code>
            </li>
            <li>Luego agrega tu solicitud específica (ej: "Revisa este texto siguiendo las guías de marca")</li>
          </ol>

          <p style={{ fontSize: '13px', lineHeight: '1.6', marginTop: spacing[1.5], color: colors.text.footer, fontStyle: 'italic' }}>
            <strong>Nota importante:</strong> Para que ChatGPT pueda acceder a la URL, debes tener habilitada la función de búsqueda web (disponible en planes Plus, Pro, Teams). Claude con Projects puede acceder directamente a URLs. Si tu modelo no puede acceder a URLs, <a href="/BRAND_GUIDE_FOR_AI.md" download style={{ color: colors.primary.main, textDecoration: 'underline', fontWeight: fontWeights.semiBold }}>descarga el archivo aquí</a> y súbelo manualmente a la conversación.
          </p>
        </div>

        {/* Opción 2: MCP */}
        <div style={{ padding: spacing[3], background: colors.primary.container, borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid ${colors.primary.dark}` }}>
          <h3 style={{ fontSize: fontSizes.lg, marginTop: 0, color: colors.primary.dark }}>Opción 2: Conectar el Design System Khipu a tu agente de IA</h3>
          <p style={{ fontSize: fontSizes.xs, fontWeight: fontWeights.semiBold, color: colors.primary.dark, marginTop: '-8px', marginBottom: spacing[1.5] }}>
            Ideal para componentes e implementación
          </p>

          <p style={{ fontSize: fontSizes.sm, lineHeight: '1.6', marginBottom: spacing[2] }}>
            Este MCP permite que tu agente (Claude Code, Cursor, etc.) acceda directamente a los componentes y definiciones del Design System de Khipu mientras desarrollas.
          </p>

          <h4 style={{ fontSize: fontSizes.base, marginTop: spacing[2.5], marginBottom: spacing[1.5], color: colors.primary.dark }}>Requisitos previos</h4>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], marginBottom: spacing[2] }}>
            <li>Node.js instalado → <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" style={{ color: colors.primary.dark, textDecoration: 'underline' }}>descargar aquí</a></li>
            <li>Claude Code instalado → <code style={{ fontSize: '13px', background: colors.background.paper, padding: `${spacing[0.25]} ${spacing[0.75]}`, borderRadius: borderRadius.sm }}>npm install -g @anthropic-ai/claude-code</code></li>
          </ul>

          <h4 style={{ fontSize: fontSizes.base, marginTop: spacing[2.5], marginBottom: spacing[1.5], color: colors.primary.dark }}>Instalación</h4>
          <p style={{ fontSize: fontSizes.sm, marginBottom: spacing[1] }}>Ejecuta este comando en tu terminal:</p>
          <div style={{ marginBottom: spacing[2], padding: spacing[1.5], background: colors.background.paper, borderRadius: borderRadius.md, border: `${borders.widthMd} solid ${colors.primary.dark}` }}>
            <code style={{
              display: 'block',
              fontSize: fontSizes.xs,
              fontFamily: fontFamilies.mono,
              wordBreak: 'break-all',
              lineHeight: '1.5'
            }}>
              claude mcp add storybook-mcp -e STORYBOOK_URL=https://design.khipu.com/index.json --scope user -- npx -y storybook-mcp@latest
            </code>
          </div>

          <h4 style={{ fontSize: fontSizes.base, marginTop: spacing[2.5], marginBottom: spacing[1.5], color: colors.primary.dark }}>Verificar la conexión</h4>
          <div style={{ marginBottom: spacing[1], padding: spacing[1.5], background: colors.background.paper, borderRadius: borderRadius.md, border: `${borders.widthMd} solid ${colors.primary.dark}` }}>
            <code style={{ display: 'block', fontSize: fontSizes.xs, fontFamily: fontFamilies.mono }}>
              claude mcp list
            </code>
          </div>
          <p style={{ fontSize: fontSizes.sm, marginBottom: spacing[2] }}>Deberías ver:</p>
          <div style={{ marginBottom: spacing[2], padding: spacing[1.5], background: colors.background.elevated, borderRadius: borderRadius.md }}>
            <code style={{ display: 'block', fontSize: fontSizes.xs, fontFamily: fontFamilies.mono, color: colors.success.main }}>
              storybook-mcp: npx ... ✓ Connected
            </code>
          </div>

          <h4 style={{ fontSize: fontSizes.base, marginTop: spacing[2.5], marginBottom: spacing[1.5], color: colors.primary.dark }}>Cómo usarlo</h4>
          <p style={{ fontSize: fontSizes.sm, marginBottom: spacing[1] }}>Abre Claude Code en tu terminal:</p>
          <div style={{ marginBottom: spacing[2], padding: spacing[1.5], background: colors.background.paper, borderRadius: borderRadius.md, border: `${borders.widthMd} solid ${colors.primary.dark}` }}>
            <code style={{ display: 'block', fontSize: fontSizes.xs, fontFamily: fontFamilies.mono }}>
              claude
            </code>
          </div>

          <p style={{ fontSize: fontSizes.sm, marginBottom: spacing[1] }}>Y pregunta directamente sobre el design system, por ejemplo:</p>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], marginBottom: spacing[2] }}>
            <li><em>¿Qué componentes están disponibles?</em></li>
            <li><em>¿Qué definiciones de marca tiene el design system?</em></li>
            <li><em>¿Cómo se usa el componente Button?</em></li>
          </ul>
          <p style={{ fontSize: fontSizes.sm, lineHeight: '1.6', marginBottom: spacing[2] }}>
            El agente consultará el design system en tiempo real y usará los componentes correctos al generar código.
          </p>

          <h4 style={{ fontSize: fontSizes.base, marginTop: spacing[2.5], marginBottom: spacing[1.5], color: colors.primary.dark }}>Notas</h4>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], marginBottom: spacing[2] }}>
            <li>La configuración es <strong>global</strong>: aplica a todos tus proyectos automáticamente</li>
            <li>Solo necesitas instalarlo <strong>una vez</strong> por máquina</li>
            <li>Si cambias de computador, repite el paso de instalación</li>
          </ul>

          <p style={{ fontSize: '13px', lineHeight: '1.6', color: colors.text.footer, marginTop: spacing[1.5] }}>
            Más información: <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" style={{ color: colors.primary.dark, textDecoration: 'underline' }}>modelcontextprotocol.io</a>
          </p>
        </div>
      </div>

      <h2>Ejemplos de uso</h2>

      <p><strong>Revisar un texto:</strong></p>
      <pre style={{ background: colors.background.elevated, padding: spacing[2], borderRadius: borderRadius.md, overflow: 'auto' }}>
{`Revisa este texto siguiendo las guías de marca de Khipu:
[tu texto aquí]`}
      </pre>

      <p><strong>Generar microcopy:</strong></p>
      <pre style={{ background: colors.background.elevated, padding: spacing[2], borderRadius: borderRadius.md, overflow: 'auto' }}>
{`Genera 3 opciones de texto para un botón de confirmación de pago,
siguiendo las guías de voz y tono de Khipu.`}
      </pre>

      <p><strong>Mejorar redacción:</strong></p>
      <pre style={{ background: colors.background.elevated, padding: spacing[2], borderRadius: borderRadius.md, overflow: 'auto' }}>
{`Reescribe este mensaje de error para que sea más claro y cercano,
según las guías de comunicación de Khipu.`}
      </pre>
    </div>
  ),
};
