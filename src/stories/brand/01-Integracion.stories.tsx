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

      <p>Descarga archivos especializados para integrar con tu agente de IA (Claude, ChatGPT, Cursor, etc.) según el tipo de contenido de marca que necesites generar.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: spacing[3], marginBottom: spacing[4] }}>
        {/* Skill 1: Identidad Visual */}
        <div style={{ padding: spacing[3], background: 'var(--kds-color-primary-faint)', borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid var(--kds-color-primary-main)` }}>
          <h3 style={{ fontSize: fontSizes.lg, marginTop: 0, color: 'var(--kds-color-primary-main)' }}>🎨 Identidad visual</h3>

          <p style={{ fontSize: fontSizes.sm, lineHeight: '1.6', marginBottom: spacing[2] }}>
            Aplicar correctamente los colores y elementos visuales de la marca Khipu en diseños y comunicaciones.
          </p>

          <p style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>Incluye:</p>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], marginBottom: spacing[2] }}>
            <li>Paleta de colores completa</li>
            <li>Uso de púrpura Khipu (#8347AD)</li>
            <li>Tipografía Public Sans</li>
            <li>Errores comunes a evitar</li>
          </ul>

          <a
            href="/skills/brand-colors.md"
            download="khipu-skill-identidad-visual.md"
            style={{
              display: 'inline-block',
              marginTop: spacing[1],
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

        {/* Skill 2: Copy & Redacción */}
        <div style={{ padding: spacing[3], background: 'var(--kds-color-primary-faint)', borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid var(--kds-color-primary-main)` }}>
          <h3 style={{ fontSize: fontSizes.lg, marginTop: 0, color: 'var(--kds-color-primary-main)' }}>📝 Copy & Redacción</h3>

          <p style={{ fontSize: fontSizes.sm, lineHeight: '1.6', marginBottom: spacing[2] }}>
            Escribir y revisar textos de UI siguiendo la voz de marca Khipu: cercana, clara, confiable y directa.
          </p>

          <p style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>Incluye:</p>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], marginBottom: spacing[2] }}>
            <li>Guías de voz y tono</li>
            <li>Microcopy (botones, labels, mensajes)</li>
            <li>Reglas de puntuación</li>
            <li>Checklist de validación</li>
          </ul>

          <a
            href="/skills/copy-voice-tone.md"
            download="khipu-skill-copy-voice-tone.md"
            style={{
              display: 'inline-block',
              marginTop: spacing[1],
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

        {/* Skill 3: Presentaciones */}
        <div style={{ padding: spacing[3], background: 'var(--kds-color-primary-faint)', borderRadius: borderRadius.lg, borderLeft: `${borders.widthLg} solid var(--kds-color-primary-main)` }}>
          <h3 style={{ fontSize: fontSizes.lg, marginTop: 0, color: 'var(--kds-color-primary-main)' }}>📊 Presentaciones</h3>

          <p style={{ fontSize: fontSizes.sm, lineHeight: '1.6', marginBottom: spacing[2] }}>
            Crear presentaciones corporativas (Keynote, PowerPoint, Google Slides) con la identidad visual y tono de Khipu.
          </p>

          <p style={{ fontSize: fontSizes.sm, fontWeight: fontWeights.semiBold, marginBottom: spacing[1] }}>Incluye:</p>
          <ul style={{ fontSize: fontSizes.sm, lineHeight: '1.6', paddingLeft: spacing[2.5], marginBottom: spacing[2] }}>
            <li>Paleta de colores para slides</li>
            <li>Jerarquía tipográfica</li>
            <li>Layouts recomendados</li>
            <li>Guías de redacción para slides</li>
          </ul>

          <a
            href="/skills/presentations.md"
            download="khipu-skill-presentaciones.md"
            style={{
              display: 'inline-block',
              marginTop: spacing[1],
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
      </div>

      <h3 style={{ fontSize: fontSizes.base, marginBottom: spacing[1] }}>Cómo usar los skills</h3>
      <ol style={{ fontSize: fontSizes.sm, lineHeight: '1.8', paddingLeft: spacing[2.5], marginBottom: spacing[4] }}>
        <li>Descarga el skill que necesites usando los botones de arriba</li>
        <li>Sube el archivo a tu agente de IA:
          <ul style={{ marginTop: spacing[0.5] }}>
            <li><strong>Claude (Projects):</strong> Agrega en "Project knowledge"</li>
            <li><strong>ChatGPT:</strong> Sube al inicio de la conversación</li>
            <li><strong>Cursor/VSCode:</strong> Añade como contexto en <code>.cursorrules</code></li>
          </ul>
        </li>
        <li>Haz tu solicitud directamente. El agente usará las guías del skill automáticamente</li>
      </ol>
    </div>
  ),
};
