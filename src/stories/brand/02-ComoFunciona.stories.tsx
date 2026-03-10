import type { Meta, StoryObj } from '@storybook/react';

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

export const Cómo_funciona: StoryObj = {
  name: 'Cómo funciona',
  render: () => (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Cómo funciona</h1>

      <p>Aprende a integrar el Design System de Khipu con agentes de IA para generar contenido consistente con la marca.</p>

      <blockquote style={{
        borderLeft: '4px solid #8347AD',
        paddingLeft: '16px',
        margin: '24px 0',
        background: '#F8F5FA',
        padding: '16px',
        borderRadius: '8px'
      }}>
        <strong>Qué opción elegir:</strong>
        <ul style={{ marginBottom: 0, marginTop: '8px' }}>
          <li><strong>Opción 1 (BRAND_GUIDE_FOR_AI.md)</strong>: Ideal para <strong>voz, tono y copy</strong></li>
          <li><strong>Opción 2 (storybook-mcp)</strong>: Ideal para <strong>componentes e implementación</strong></li>
        </ul>
        <p style={{ marginTop: '12px', marginBottom: 0, fontStyle: 'italic' }}>
          <em>Tip: Usa ambas opciones juntas para máxima cobertura (guías de marca + componentes UI)</em>
        </p>
      </blockquote>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
        {/* Opción 1: URL pública */}
        <div style={{ padding: '24px', background: '#F8F5FA', borderRadius: '12px', borderLeft: '4px solid #8347AD' }}>
          <h3 style={{ fontSize: '18px', marginTop: 0, color: '#8347AD' }}>Opción 1: URL pública</h3>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#8347AD', marginTop: '-8px', marginBottom: '12px' }}>
            Ideal para voz, tono y copy
          </p>

          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
            Usa esta URL para acceder a la guía completa de marca de Khipu:
          </p>

          <div style={{ marginBottom: '16px', padding: '16px', background: '#FFF', borderRadius: '8px', border: '2px solid #8347AD' }}>
            <p style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', marginTop: 0, color: '#8347AD' }}>URL PÚBLICA</p>
            <code style={{
              display: 'block',
              fontSize: '13px',
              background: '#F5F5F5',
              padding: '12px',
              borderRadius: '6px',
              wordBreak: 'break-all',
              fontFamily: 'monospace'
            }}>
              https://design.khipu.com/BRAND_GUIDE_FOR_AI.md
            </code>
          </div>

          <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Cómo usar esta URL:</p>
          <ol style={{ fontSize: '14px', lineHeight: '1.8', paddingLeft: '20px' }}>
            <li>Copia la URL de arriba</li>
            <li>
              <div>En tu conversación con el modelo de IA, escribe:</div>
              <code style={{ fontSize: '13px', background: '#F5F5F5', padding: '4px 8px', borderRadius: '4px', display: 'block', marginTop: '4px' }}>
                "Lee el contenido de esta URL: [pega la URL aquí]"
              </code>
            </li>
            <li>Luego agrega tu solicitud específica (ej: "Revisa este texto siguiendo las guías de marca")</li>
          </ol>

          <p style={{ fontSize: '13px', lineHeight: '1.6', marginTop: '12px', color: '#666', fontStyle: 'italic' }}>
            <strong>Nota importante:</strong> Para que ChatGPT pueda acceder a la URL, debes tener habilitada la función de búsqueda web (disponible en planes Plus, Pro, Teams). Claude con Projects puede acceder directamente a URLs. Si tu modelo no puede acceder a URLs, <a href="/BRAND_GUIDE_FOR_AI.md" download style={{ color: '#8347AD', textDecoration: 'underline', fontWeight: 600 }}>descarga el archivo aquí</a> y súbelo manualmente a la conversación.
          </p>
        </div>

        {/* Opción 2: MCP */}
        <div style={{ padding: '24px', background: '#F0E6F6', borderRadius: '12px', borderLeft: '4px solid #6B2E98' }}>
          <h3 style={{ fontSize: '18px', marginTop: 0, color: '#6B2E98' }}>Opción 2: Conectar el Design System Khipu a tu agente de IA</h3>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#6B2E98', marginTop: '-8px', marginBottom: '12px' }}>
            Ideal para componentes e implementación
          </p>

          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
            Este MCP permite que tu agente (Claude Code, Cursor, etc.) acceda directamente a los componentes y definiciones del Design System de Khipu mientras desarrollas.
          </p>

          <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '12px', color: '#6B2E98' }}>Requisitos previos</h4>
          <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px', marginBottom: '16px' }}>
            <li>Node.js instalado → <a href="https://nodejs.org" target="_blank" rel="noopener noreferrer" style={{ color: '#6B2E98', textDecoration: 'underline' }}>descargar aquí</a></li>
            <li>Claude Code instalado → <code style={{ fontSize: '13px', background: '#FFF', padding: '2px 6px', borderRadius: '4px' }}>npm install -g @anthropic-ai/claude-code</code></li>
          </ul>

          <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '12px', color: '#6B2E98' }}>Instalación</h4>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>Ejecuta este comando en tu terminal:</p>
          <div style={{ marginBottom: '16px', padding: '12px', background: '#FFF', borderRadius: '8px', border: '2px solid #6B2E98' }}>
            <code style={{
              display: 'block',
              fontSize: '12px',
              fontFamily: 'monospace',
              wordBreak: 'break-all',
              lineHeight: '1.5'
            }}>
              claude mcp add storybook-mcp -e STORYBOOK_URL=https://design.khipu.com/index.json --scope user -- npx -y storybook-mcp@latest
            </code>
          </div>

          <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '12px', color: '#6B2E98' }}>Verificar la conexión</h4>
          <div style={{ marginBottom: '8px', padding: '12px', background: '#FFF', borderRadius: '8px', border: '2px solid #6B2E98' }}>
            <code style={{ display: 'block', fontSize: '12px', fontFamily: 'monospace' }}>
              claude mcp list
            </code>
          </div>
          <p style={{ fontSize: '14px', marginBottom: '16px' }}>Deberías ver:</p>
          <div style={{ marginBottom: '16px', padding: '12px', background: '#F5F5F5', borderRadius: '8px' }}>
            <code style={{ display: 'block', fontSize: '12px', fontFamily: 'monospace', color: '#22863a' }}>
              storybook-mcp: npx ... ✓ Connected
            </code>
          </div>

          <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '12px', color: '#6B2E98' }}>Cómo usarlo</h4>
          <p style={{ fontSize: '14px', marginBottom: '8px' }}>Abre Claude Code en tu terminal:</p>
          <div style={{ marginBottom: '16px', padding: '12px', background: '#FFF', borderRadius: '8px', border: '2px solid #6B2E98' }}>
            <code style={{ display: 'block', fontSize: '12px', fontFamily: 'monospace' }}>
              claude
            </code>
          </div>

          <p style={{ fontSize: '14px', marginBottom: '8px' }}>Y pregunta directamente sobre el design system, por ejemplo:</p>
          <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px', marginBottom: '16px' }}>
            <li><em>¿Qué componentes están disponibles?</em></li>
            <li><em>¿Qué definiciones de marca tiene el design system?</em></li>
            <li><em>¿Cómo se usa el componente Button?</em></li>
          </ul>
          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
            El agente consultará el design system en tiempo real y usará los componentes correctos al generar código.
          </p>

          <h4 style={{ fontSize: '16px', marginTop: '20px', marginBottom: '12px', color: '#6B2E98' }}>Notas</h4>
          <ul style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px', marginBottom: '16px' }}>
            <li>La configuración es <strong>global</strong>: aplica a todos tus proyectos automáticamente</li>
            <li>Solo necesitas instalarlo <strong>una vez</strong> por máquina</li>
            <li>Si cambias de computador, repite el paso de instalación</li>
          </ul>

          <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#666', marginTop: '12px' }}>
            Más información: <a href="https://modelcontextprotocol.io" target="_blank" rel="noopener noreferrer" style={{ color: '#6B2E98', textDecoration: 'underline' }}>modelcontextprotocol.io</a>
          </p>
        </div>
      </div>

      <h2>Ejemplos de uso</h2>

      <p><strong>Revisar un texto:</strong></p>
      <pre style={{ background: '#F5F5F5', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
{`Revisa este texto siguiendo las guías de marca de Khipu:
[tu texto aquí]`}
      </pre>

      <p><strong>Generar microcopy:</strong></p>
      <pre style={{ background: '#F5F5F5', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
{`Genera 3 opciones de texto para un botón de confirmación de pago,
siguiendo las guías de voz y tono de Khipu.`}
      </pre>

      <p><strong>Mejorar redacción:</strong></p>
      <pre style={{ background: '#F5F5F5', padding: '16px', borderRadius: '8px', overflow: 'auto' }}>
{`Reescribe este mensaje de error para que sea más claro y cercano,
según las guías de comunicación de Khipu.`}
      </pre>
    </div>
  ),
};
