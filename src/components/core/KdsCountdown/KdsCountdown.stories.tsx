import type { Meta, StoryObj } from '@storybook/react';
import { KdsCountdown } from './KdsCountdown';

const meta: Meta<typeof KdsCountdown> = {
  title: 'Components/Feedback/KdsCountdown',
  component: KdsCountdown,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsCountdown>;

export const Default: Story = {
  render: function DefaultCountdown() {
    return <KdsCountdown deadline={new Date(Date.now() + 3600000).toISOString()} />;
  },
};

export const WithLabel: Story = {
  render: function WithLabelCountdown() {
    return (
      <KdsCountdown
        deadline={new Date(Date.now() + 1800000).toISOString()}
        label="Tiempo restante"
      />
    );
  },
};

export const Urgent: Story = {
  render: function UrgentCountdown() {
    return (
      <KdsCountdown
        deadline={new Date(Date.now() + 120000).toISOString()}
        label="¡Apúrate!"
      />
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — wrapper estático `.kds-countdown` con label
 * uppercase + valor `HH:MM:SS` (tabular-nums). El conteo regresivo en sí
 * requiere JS (el componente React usa `useCountdown` para tick cada segundo
 * + cambio a `.urgent` cuando quedan < 5min). El markup puro abajo sirve
 * para SSR/GSP donde el JS hidrata después; el valor es un placeholder.
 *
 * Ver `Patterns/CSS-only → Countdown` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<!-- Default -->
<div class="kds-countdown">
  <span class="kds-countdown-label">Tiempo restante</span>
  <span class="kds-countdown-value">00:05:00</span>
</div>

<!-- Urgente (< 5min) — agrega clase .urgent al wrapper para color error -->
<div class="kds-countdown urgent">
  <span class="kds-countdown-label">¡Apúrate!</span>
  <span class="kds-countdown-value">00:00:42</span>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-countdown">
        <span className="kds-countdown-label">Tiempo restante</span>
        <span className="kds-countdown-value">00:05:00</span>
      </div>
    </div>
  ),
};
