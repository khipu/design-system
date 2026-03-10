import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Brand/Cómo funciona',
  parameters: {
    layout: 'fullscreen',
    docs: {
      page: null,
    },
  },
};

export default meta;

export const Page: StoryObj = {
  render: () => (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
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
          <h3 style={{ fontSize: '18px', marginTop: 0, color: '#6B2E98' }}>Opción 2: Claude Code/Cursor/Windsurf con MCP</h3>
          <p style={{ fontSize: '12px', fontWeight: 600, color: '#6B2E98', marginTop: '-8px', marginBottom: '12px' }}>
            Ideal para componentes e implementación
          </p>

          <p style={{ fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>
            Conecta tu agente de IA (Claude Code, Cursor, Windsurf, etc.) directamente a <strong>Storybook</strong> mediante <strong>Model Context Protocol (MCP)</strong>.
            El agente tendrá acceso automático a toda la documentación del Design System: componentes, tokens, páginas de marca y ejemplos de código.
          </p>

          <p style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>Cómo funciona:</p>
          <ol style={{ fontSize: '14px', lineHeight: '1.6', paddingLeft: '20px', marginBottom: '16px' }}>
            <li>Descarga el archivo <code>.mcp.json</code> y cópialo en la raíz de tu proyecto</li>
            <li>Abre el proyecto con tu agente de IA (Claude Code, Cursor, etc.)</li>
            <li>El agente detecta automáticamente la conexión a <strong>design.khipu.com</strong></li>
            <li>Todo el Design System de Khipu está disponible como contexto en tus conversaciones</li>
          </ol>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
            <button
              onClick={() => window.open('https://github.com/khipu/design-system/blob/main/.mcp.json', '_blank')}
              style={{
                padding: '12px 16px',
                background: '#F0E6F6',
                color: '#6B2E98',
                border: '2px solid #6B2E98',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Ver .mcp.json en GitHub
            </button>

            <a
              href="/mcp.json"
              download="mcp.json"
              style={{
                padding: '12px 16px',
                background: '#F0E6F6',
                color: '#6B2E98',
                border: '2px solid #6B2E98',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Descargar .mcp.json
            </a>
          </div>

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
