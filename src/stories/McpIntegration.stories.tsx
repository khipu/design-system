import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

/**
 * Cómo usar el servidor MCP nativo de Storybook en desarrollo local.
 *
 * Storybook 10 expone un endpoint MCP (Model Context Protocol) vía
 * `@storybook/addon-mcp` cuando el dev server está corriendo. Los agentes de
 * IA (Claude Code, Cursor, etc.) lo usan para leer la documentación de
 * componentes, obtener URLs de preview e instrucciones para escribir stories.
 */
const meta: Meta = {
  title: 'Design System/MCP',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'Servidor **MCP nativo de Storybook** para agentes de IA (Claude Code, Cursor, etc.), disponible en desarrollo local.',
          '',
          '## Qué es',
          'Desde Storybook 10, el addon `@storybook/addon-mcp` expone un endpoint MCP en el propio dev server. Un agente conectado puede consultar props/variants reales de los componentes, obtener URLs de preview y recibir las convenciones del proyecto — sin adivinar APIs.',
          '',
          '## Cómo levantarlo',
          '```bash',
          'npm run storybook   # dev server en http://localhost:6006',
          '                    # endpoint MCP en http://localhost:6006/mcp',
          '```',
          'No requiere configuración adicional: el addon ya está en `.storybook/main.ts`, junto con el flag `features.componentsManifest: true` que habilita las herramientas de documentación (requiere `addon-mcp` ≥ 0.6.0).',
          '',
          '## Conectar Claude Code',
          '```bash',
          'claude mcp add --transport http khipu-ds http://localhost:6006/mcp',
          '```',
          '',
          '## Conectar Cursor / otros clientes MCP',
          'Agregar a la config MCP del cliente (p. ej. `.cursor/mcp.json`):',
          '```json',
          '{',
          '  "mcpServers": {',
          '    "khipu-ds": { "transport": "http", "url": "http://localhost:6006/mcp" }',
          '  }',
          '}',
          '```',
          '',
          '## Herramientas disponibles',
          '- **list-all-documentation** — lista todos los componentes/páginas documentados con sus IDs.',
          '- **get-documentation** — docs completas de un componente: props, variantes, ejemplos, stories.',
          '- **get-documentation-for-story** — docs de una variante (story) específica.',
          '- **get-storybook-story-instructions** — convenciones del proyecto para escribir stories (imports, naming, play functions).',
          '- **preview-stories** — URLs de preview para verificación visual (acepta `props` y `globals`).',
          '',
          '## Flujo recomendado para agentes',
          '1. `list-all-documentation` una vez al inicio para descubrir IDs.',
          '2. `get-documentation` del componente antes de usarlo (nunca inventar props).',
          '3. Al crear/editar stories: `get-storybook-story-instructions` primero.',
          '4. Tras cambios de UI: `preview-stories` y compartir las URLs para verificación.',
          '',
          '## Verificar que responde',
          '```bash',
          "curl -X POST http://localhost:6006/mcp \\",
          "  -H 'Content-Type: application/json' \\",
          '  -d \'{"jsonrpc":"2.0","method":"tools/list","id":1}\'',
          '```',
          '',
          '> **Local vs producción:** el endpoint local (addon nativo) ofrece el set completo de herramientas pero requiere el dev server corriendo. Para consumo sin servidor local existe el paquete externo `storybook-mcp` apuntando a `https://design.khipu.com/index.json` (herramientas limitadas). Detalle completo en `docs/STORYBOOK_MCP.md`.',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const CodeBlock = ({ children }: { children: string }) => (
  <pre
    style={{
      background: 'var(--kds-color-background-elevated)',
      color: 'var(--kds-color-text-primary)',
      padding: 'var(--kds-spacing-2)',
      borderRadius: 'var(--kds-radius-md)',
      border: '1px solid var(--kds-color-divider)',
      fontSize: 'var(--kds-font-size-sm)',
      fontFamily: 'var(--kds-font-family-mono)',
      overflow: 'auto',
      margin: 0,
    }}
  >
    {children}
  </pre>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kds-spacing-1)', maxWidth: 820 }}>
    <span
      style={{
        fontSize: 'var(--kds-font-size-sm)',
        fontWeight: 'var(--kds-font-weight-semibold)' as React.CSSProperties['fontWeight'],
        color: 'var(--kds-color-text-secondary)',
      }}
    >
      {title}
    </span>
    {children}
  </div>
);

/** Comandos para levantar el server y conectar Claude Code. */
export const ConexionRapida: Story = {
  name: 'Conexión rápida',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kds-spacing-3)' }}>
      <Section title="1 — Levantar Storybook (endpoint MCP incluido)">
        <CodeBlock>{`npm run storybook
# MCP en http://localhost:6006/mcp`}</CodeBlock>
      </Section>
      <Section title="2 — Conectar Claude Code">
        <CodeBlock>{`claude mcp add --transport http khipu-ds http://localhost:6006/mcp`}</CodeBlock>
      </Section>
      <Section title="2 (alt) — Conectar Cursor u otro cliente MCP">
        <CodeBlock>{`{
  "mcpServers": {
    "khipu-ds": { "transport": "http", "url": "http://localhost:6006/mcp" }
  }
}`}</CodeBlock>
      </Section>
      <Section title="3 — Verificar">
        <CodeBlock>{`curl -X POST http://localhost:6006/mcp \\
  -H 'Content-Type: application/json' \\
  -d '{"jsonrpc":"2.0","method":"tools/list","id":1}'`}</CodeBlock>
      </Section>
    </div>
  ),
};

/** Qué herramienta usar en cada momento del flujo de trabajo con agentes. */
export const FlujoParaAgentes: Story = {
  name: 'Flujo para agentes',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--kds-spacing-2)', maxWidth: 820 }}>
      {[
        ['list-all-documentation', 'Al inicio de la tarea: descubrir componentes y IDs disponibles.'],
        ['get-documentation', 'Antes de usar un componente: props, variantes y ejemplos reales (no inventar APIs).'],
        ['get-storybook-story-instructions', 'Antes de crear o editar stories: convenciones del proyecto.'],
        ['preview-stories', 'Después de cambios de UI: URLs de preview para verificación visual.'],
      ].map(([tool, when]) => (
        <div
          key={tool}
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: 'var(--kds-spacing-2)',
            padding: 'var(--kds-spacing-1-5)',
            background: 'var(--kds-color-background-paper)',
            border: '1px solid var(--kds-color-divider)',
            borderRadius: 'var(--kds-radius-md)',
            alignItems: 'center',
          }}
        >
          <code style={{ fontSize: 'var(--kds-font-size-sm)', color: 'var(--kds-color-primary-main)' }}>{tool}</code>
          <span style={{ fontSize: 'var(--kds-font-size-sm)', color: 'var(--kds-color-text-secondary)' }}>{when}</span>
        </div>
      ))}
    </div>
  ),
};
