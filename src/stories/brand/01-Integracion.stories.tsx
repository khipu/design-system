import type { Meta, StoryObj } from '@storybook/react';
import { spacing, fontSizes, fontWeights, borderRadius, borders } from '../../tokens';

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

      <p>Aprende a integrar la marca Khipu con agentes de IA para generar contenido consistente con nuestra identidad, voz y tono.</p>

      <h2>Skills de diseño</h2>

      <p>Descarga el skill de marca para integrarlo con tu agente de IA (Claude, ChatGPT, Cursor, etc.) y generar contenido consistente con nuestra identidad.</p>

      <div style={{ padding: spacing[3], background: 'var(--kds-color-primary-faint)', borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid var(--kds-color-primary-main)`, marginBottom: spacing[4] }}>
        <h3 style={{ fontSize: fontSizes.lg, marginTop: 0, color: 'var(--kds-color-primary-main)' }}>📘 Comunicación &amp; presentaciones</h3>

        <p style={{ fontSize: fontSizes.sm, lineHeight: '1.6', marginBottom: spacing[2.5] }}>
          Todas las definiciones de marca de Khipu en un solo archivo: cómo hablamos, cómo nos vemos y cómo lo aplicamos.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: spacing[2.5], marginBottom: spacing[2.5] }}>
          <div>
            <p style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, marginTop: 0, marginBottom: spacing[1] }}>Cómo hablamos</p>
            <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.7', paddingLeft: spacing[2.5], margin: 0 }}>
              <li>Valores, personalidad y voz</li>
              <li>Guías de redacción y microcopy</li>
              <li>Uso de verbos y puntuación</li>
            </ul>
          </div>
          <div>
            <p style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, marginTop: 0, marginBottom: spacing[1] }}>Cómo nos vemos</p>
            <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.7', paddingLeft: spacing[2.5], margin: 0 }}>
              <li>Color, con criterios de contraste</li>
              <li>Tipografía y sus pesos</li>
              <li>Uso del logotipo</li>
            </ul>
          </div>
          <div>
            <p style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, marginTop: 0, marginBottom: spacing[1] }}>Cómo lo aplicamos</p>
            <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.7', paddingLeft: spacing[2.5], margin: 0 }}>
              <li>Once plantillas de slide</li>
              <li>Anti-patrones de agentes IA</li>
              <li>Checklists de validación</li>
            </ul>
          </div>
        </div>

        <a
          href="/skills/comunicacion-y-presentaciones.md"
          download="khipu-comunicacion-y-presentaciones.md"
          style={{
            display: 'inline-block',
            padding: `${spacing[0.5]} 0`,
            fontSize: fontSizes.sm,
            fontWeight: fontWeights.medium,
            color: 'var(--kds-color-primary-main)',
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
            cursor: 'pointer',
            opacity: 0.9,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.textDecoration = 'underline';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.opacity = '0.9';
            e.currentTarget.style.textDecoration = 'none';
          }}
        >
          ↓ Descargar skill
        </a>
      </div>

      <h3 style={{ fontSize: fontSizes.base, marginBottom: spacing[1] }}>Cómo usar el skill</h3>
      <ol style={{ fontSize: fontSizes.sm, lineHeight: '1.8', paddingLeft: spacing[2.5], marginBottom: spacing[4] }}>
        <li>Descarga el skill usando el botón de arriba</li>
        <li>Sube el archivo a tu agente de IA:
          <ul style={{ marginTop: spacing[0.5] }}>
            <li><strong>Claude (Projects):</strong> Agrega en "Project knowledge"</li>
            <li><strong>ChatGPT:</strong> Sube al inicio de la conversación</li>
            <li><strong>Cursor/VSCode:</strong> Añade como contexto en <code>.cursorrules</code></li>
          </ul>
        </li>
        <li>Haz tu solicitud directamente. El agente usará las guías de marca automáticamente</li>
      </ol>
    </div>
  ),
};
