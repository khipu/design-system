import type React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

/**
 * Utility classes — single-purpose helpers that map directly to design tokens.
 *
 * These are the **opt-in** companions to the component-level classes. They exist so
 * consumers (payment, LigoPay, Grails legacy) can compose layouts without writing
 * custom CSS — every utility is `var(--kds-*)`.
 *
 * Convention: prefix `kds-` + scope (`text`, `fw`, `bg`, `text-transform`) + value.
 */
const meta: Meta = {
  title: 'Patterns/Utilities',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Utility classes del DS: `kds-text-{sm,base,lg,xl,2xl}`, `kds-fw-{regular,medium,semibold,bold}`, `kds-text-transform-none`, `kds-bg-{warning,info}-soft`, `kds-grid` + `kds-col-{sm,md,lg}-{1..12}`. Cada clase mapea a un token de diseño — no hay valores hardcoded.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const rowStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '160px 1fr',
  alignItems: 'baseline',
  gap: 'var(--kds-spacing-2)',
  marginBottom: 'var(--kds-spacing-1)',
};

const labelStyle: React.CSSProperties = {
  fontSize: 'var(--kds-font-size-xs)',
  color: 'var(--kds-color-text-secondary)',
  fontFamily: 'var(--kds-font-family-mono)',
};

/**
 * Font-size scale — `kds-text-{sm, base, lg, xl, 2xl}`.
 *
 * Each utility maps to `var(--kds-font-size-*)`. The `sm` utility is the
 * legacy entry; `base`/`lg`/`xl`/`2xl` are the new additions for LigoPay.
 *
 * @css .kds-text-sm, .kds-text-base, .kds-text-lg, .kds-text-xl, .kds-text-2xl
 */
export const TextSizes: Story = {
  name: 'Text sizes (.kds-text-*)',
  render: () => (
    <div>
      <div style={rowStyle}>
        <span style={labelStyle}>.kds-text-sm (14)</span>
        <span className="kds-text-sm">Monto a pagar — S/ 323.32</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>.kds-text-base (16)</span>
        <span className="kds-text-base">Monto a pagar — S/ 323.32</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>.kds-text-lg (18)</span>
        <span className="kds-text-lg">Monto a pagar — S/ 323.32</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>.kds-text-xl (20)</span>
        <span className="kds-text-xl">Monto a pagar — S/ 323.32</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>.kds-text-2xl (24)</span>
        <span className="kds-text-2xl">Monto a pagar — S/ 323.32</span>
      </div>
    </div>
  ),
};

/**
 * Font-weight utilities — `kds-fw-{regular, medium, semibold, bold}`.
 *
 * Mapea directo a `var(--kds-font-weight-*)`. Útil para overrides puntuales
 * sin tener que escribir CSS custom en el consumidor.
 *
 * @css .kds-fw-regular, .kds-fw-medium, .kds-fw-semibold, .kds-fw-bold
 */
export const FontWeights: Story = {
  name: 'Font weights (.kds-fw-*)',
  render: () => (
    <div>
      <div style={rowStyle}>
        <span style={labelStyle}>.kds-fw-regular (400)</span>
        <span className="kds-text-lg kds-fw-regular">Khipu paga simple</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>.kds-fw-medium (500)</span>
        <span className="kds-text-lg kds-fw-medium">Khipu paga simple</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>.kds-fw-semibold (600)</span>
        <span className="kds-text-lg kds-fw-semibold">Khipu paga simple</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>.kds-fw-bold (700)</span>
        <span className="kds-text-lg kds-fw-bold">Khipu paga simple</span>
      </div>
    </div>
  ),
};

/**
 * Text-transform utility — `kds-text-transform-none`.
 *
 * Cancela `text-transform: uppercase` heredado (e.g. dentro de `.kds-amount-label`
 * cuando el contexto pide texto en mayúsculas/minúsculas naturales).
 *
 * @css .kds-text-transform-none
 */
export const TextTransformNone: Story = {
  name: 'Text-transform none (.kds-text-transform-none)',
  render: () => (
    <div>
      <div style={rowStyle}>
        <span style={labelStyle}>.kds-amount-label</span>
        <span className="kds-amount-label">Monto a pagar</span>
      </div>
      <div style={rowStyle}>
        <span style={labelStyle}>+ .kds-text-transform-none</span>
        <span className="kds-amount-label kds-text-transform-none">Monto a pagar</span>
      </div>
    </div>
  ),
};

/**
 * Soft background utilities — `kds-bg-{warning, info}-soft`.
 *
 * Background sutil para callouts inline que no requieren la presencia visual de un
 * `.kds-alert` completo. Mapean a `var(--kds-color-{warning,info}-soft)`.
 *
 * @css .kds-bg-warning-soft, .kds-bg-info-soft
 */
export const SoftBackgrounds: Story = {
  name: 'Soft backgrounds (.kds-bg-*-soft)',
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--kds-spacing-2)' }}>
      <div
        className="kds-bg-warning-soft"
        style={{ padding: 'var(--kds-spacing-2) var(--kds-spacing-3)' }}
      >
        <span className="kds-text-sm">Background: warning-soft (#FFFBEB)</span>
      </div>
      <div
        className="kds-bg-info-soft"
        style={{ padding: 'var(--kds-spacing-2) var(--kds-spacing-3)' }}
      >
        <span className="kds-text-sm">Background: info-soft (#EFF6FF)</span>
      </div>
    </div>
  ),
};

/**
 * Responsive grid utilities — `kds-grid` + `kds-col-{sm,md,lg}-{1..12}`.
 *
 * Alias semánticos del grid de 12 columnas de BeerCSS (`.grid`, `.s12`, `.m4`, `.l2`…).
 * Pensado para reemplazar nombres cortos crípticos por algo legible en GSPs / HTML.
 *
 * - `kds-grid` → CSS grid de 12 cols con gap 1rem (`+ kds-grid-no-space|medium-space|large-space`).
 * - `kds-col-sm-{1..12}` → siempre aplica (mobile-first).
 * - `kds-col-md-{1..12}` → ≥601px.
 * - `kds-col-lg-{1..12}` → ≥993px.
 *
 * Las clases cortas de BeerCSS (`.s12`, `.m4`, etc.) siguen funcionando sin cambios —
 * estas utilidades se agregan en paralelo para que nuevo markup use nombres descriptivos.
 *
 * @css .kds-grid, .kds-col-sm-{1..12}, .kds-col-md-{1..12}, .kds-col-lg-{1..12}
 */
export const ResponsiveGrid: Story = {
  name: 'Responsive grid (.kds-grid / .kds-col-*)',
  render: () => {
    const cellStyle: React.CSSProperties = {
      background: 'var(--kds-color-primary-faint)',
      padding: 'var(--kds-spacing-1) var(--kds-spacing-1-5)',
      borderRadius: 'var(--kds-radius-sm)',
      fontFamily: 'var(--kds-font-family-mono)',
      fontSize: 'var(--kds-font-size-xs)',
      color: 'var(--kds-color-text-primary)',
    };
    return (
      <div style={{ display: 'grid', gap: 'var(--kds-spacing-3)' }}>
        <div>
          <p style={{ ...labelStyle, marginBottom: 'var(--kds-spacing-1)' }}>
            kds-col-sm-12 kds-col-md-4 + kds-col-sm-12 kds-col-md-8
          </p>
          <div className="kds-grid">
            <div className="kds-col-sm-12 kds-col-md-4" style={cellStyle}>md-4</div>
            <div className="kds-col-sm-12 kds-col-md-8" style={cellStyle}>md-8</div>
          </div>
        </div>
        <div>
          <p style={{ ...labelStyle, marginBottom: 'var(--kds-spacing-1)' }}>
            kds-col-sm-12 kds-col-md-6 kds-col-lg-2 (6 cells)
          </p>
          <div className="kds-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="kds-col-sm-12 kds-col-md-6 kds-col-lg-2" style={cellStyle}>
                md-6 / lg-2
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};
