import type { Meta, StoryObj } from '@storybook/react';
import { KdsTooltip } from './KdsTooltip';
import { KdsButton } from '../KdsButton';

const meta: Meta<typeof KdsTooltip> = {
  title: 'Components/Overlays/KdsTooltip',
  component: KdsTooltip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof KdsTooltip>;

/**
 * Tooltip basico que aparece al pasar el cursor sobre un boton.
 */
export const Default: Story = {
  render: function DefaultTooltip() {
    return (
      <KdsTooltip content="Informacion adicional">
        <KdsButton variant="outlined">Hover aqui</KdsButton>
      </KdsTooltip>
    );
  },
};

/**
 * Ejemplo de tooltip en las cuatro posiciones posibles.
 */
export const Placements: Story = {
  render: function TooltipPlacements() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, auto)',
          gap: '16px',
          alignItems: 'center',
          justifyItems: 'center',
          padding: '48px',
        }}
      >
        <div />
        <KdsTooltip content="Arriba" placement="top">
          <KdsButton variant="outlined">Top</KdsButton>
        </KdsTooltip>
        <div />

        <KdsTooltip content="Izquierda" placement="left">
          <KdsButton variant="outlined">Left</KdsButton>
        </KdsTooltip>
        <div />
        <KdsTooltip content="Derecha" placement="right">
          <KdsButton variant="outlined">Right</KdsButton>
        </KdsTooltip>

        <div />
        <KdsTooltip content="Abajo" placement="bottom">
          <KdsButton variant="outlined">Bottom</KdsButton>
        </KdsTooltip>
        <div />
      </div>
    );
  },
};

/**
 * Tooltip con contenido largo — verifica `max-width: 280px` con word wrap.
 */
export const LongContent: Story = {
  render: function LongTooltip() {
    return (
      <KdsTooltip content="Este tooltip tiene contenido largo que debería ajustarse a varias líneas respetando el ancho máximo de 280px establecido en el design system.">
        <KdsButton variant="outlined">Hover para texto largo</KdsButton>
      </KdsTooltip>
    );
  },
};

/**
 * Tooltip que aparece instantáneamente (sin delay).
 */
export const InstantOpen: Story = {
  render: function InstantTooltip() {
    return (
      <KdsTooltip content="Aparece de inmediato" delayDuration={0}>
        <KdsButton variant="outlined">Sin delay</KdsButton>
      </KdsTooltip>
    );
  },
};

/**
 * Tooltip sobre un boton de icono — usa el patrón canónico de icon-button del DS.
 */
export const WithIcon: Story = {
  render: function TooltipWithIcon() {
    return (
      <KdsTooltip content="Copiar al portapapeles">
        <button
          type="button"
          aria-label="Copiar"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            padding: 0,
            background: 'transparent',
            border: '1px solid var(--kds-color-border-default)',
            borderRadius: 'var(--kds-radius-full)',
            color: 'var(--kds-color-text-primary)',
            cursor: 'pointer',
            fontFamily: 'inherit',
          }}
        >
          <i
            className="material-symbols-outlined"
            style={{ fontSize: 20, lineHeight: 1 }}
          >
            content_copy
          </i>
        </button>
      </KdsTooltip>
    );
  },
};

/**
 * Tooltip sobre un KdsButton — patrón en uso real.
 */
export const OnButton: Story = {
  render: function TooltipOnButton() {
    return (
      <KdsTooltip content="Descargar comprobante en PDF">
        <KdsButton variant="outlined" startIcon="download">
          Descargar
        </KdsButton>
      </KdsTooltip>
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — `.kds-tooltip` es el popover (renderizado en
 * un portal por Radix); `.kds-tooltip-arrow` es el SVG de la flecha. El
 * show/hide + el posicionamiento + el `data-side`/`data-state` son JS-driven
 * (Radix Tooltip Provider/Root/Trigger/Content). En contextos sin Radix,
 * estas clases sirven para estilar cualquier popover con el look del DS:
 * basta con renderizar el `.kds-tooltip` cerca del trigger y togglearlo con
 * JS propio (las animaciones direccionales se activan vía `data-side` +
 * `data-state="delayed-open"`).
 *
 * Ver `Patterns/CSS-only → Tooltip` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<!-- Trigger (cualquier elemento focuseable) -->
<button type="button">Hover aquí</button>

<!-- Popover renderizado por Radix Portal (o por tu propio JS) -->
<div
  class="kds-tooltip"
  role="tooltip"
  data-side="top"
  data-state="delayed-open"
>
  Información adicional
  <svg class="kds-tooltip-arrow" width="10" height="5"><!-- arrow path --></svg>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div
        className="kds-tooltip"
        role="tooltip"
        data-side="top"
        data-state="delayed-open"
      >
        Información adicional
      </div>
    </div>
  ),
};
