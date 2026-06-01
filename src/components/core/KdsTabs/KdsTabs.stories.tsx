import type React from 'react';
import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsTabs, KdsTab, KdsTabPanel } from './KdsTabs';

/**
 * KdsTabs — Tabs segmented (única variante existente del Khipu DS).
 *
 * Matchea el markup de producción payment (`_choosePaymentMethodFormMaterial.gsp`):
 *   `<div class="kds-segmented-tabs" role="tablist"><button class="active" role="tab">...`
 *
 * Si necesitas un wrapper semántico explícito, usa `KdsSegmentedTabs` (alias).
 */
const meta: Meta<typeof KdsTabs> = {
  title: 'Components/Navigation/KdsTabs',
  component: KdsTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Tabs segmented (única variante del Khipu DS). Renderiza `.kds-segmented-tabs` con botones `.active` para el tab seleccionado.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsTabs>;

/** Caso típico — dos tabs (Personas / Empresas) del flow payment. */
export const Default: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 350 }}>
        <KdsTabs activeIndex={activeIndex} onChange={setActiveIndex}>
          <KdsTab>Personas</KdsTab>
          <KdsTab>Empresas</KdsTab>
        </KdsTabs>
      </div>
    );
  },
};

/** Con paneles de contenido — patrón completo de tabs con switching. */
export const WithPanels: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 350 }}>
        <KdsTabs activeIndex={activeIndex} onChange={setActiveIndex}>
          <KdsTab>Personas</KdsTab>
          <KdsTab>Empresas</KdsTab>
        </KdsTabs>
        <div
          style={{
            marginTop: 16,
            padding: 16,
            border: '1px solid #e0e0e0',
            borderRadius: 8,
          }}
        >
          <KdsTabPanel active={activeIndex === 0}>
            <div>Contenido para personas — bancos personales</div>
          </KdsTabPanel>
          <KdsTabPanel active={activeIndex === 1}>
            <div>Contenido para empresas — bancos corporativos</div>
          </KdsTabPanel>
        </div>
      </div>
    );
  },
};

/** Tres tabs — el componente reparte equitativamente. */
export const ThreeTabs: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 450 }}>
        <KdsTabs activeIndex={activeIndex} onChange={setActiveIndex}>
          <KdsTab>Primero</KdsTab>
          <KdsTab>Segundo</KdsTab>
          <KdsTab>Tercero</KdsTab>
        </KdsTabs>
      </div>
    );
  },
};

/** Con un tab disabled. */
export const WithDisabledTab: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 350 }}>
        <KdsTabs activeIndex={activeIndex} onChange={setActiveIndex}>
          <KdsTab>Activo</KdsTab>
          <KdsTab disabled>Disabled</KdsTab>
        </KdsTabs>
      </div>
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — `.kds-segmented-tabs` con `role="tablist"` y
 * `<button>` hijos. El pill animado del active lo dibuja `::before` usando las
 * CSS custom props `--_tab-count` y `--_active-idx` (definidas en el style del
 * wrapper). El switching del active requiere JS (toggle de la clase `.active`
 * + `aria-selected="true"` + recálculo de `--_active-idx`); el markup estático
 * abajo es un snapshot del estado "primer tab activo".
 *
 * Ver `Patterns/CSS-only → Tabs` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div
  class="kds-segmented-tabs"
  role="tablist"
  style="--_tab-count: 2; --_active-idx: 0"
>
  <button type="button" class="active" role="tab" aria-selected="true" tabindex="0">
    Personas
  </button>
  <button type="button" role="tab" aria-selected="false" tabindex="-1">
    Empresas
  </button>
</div>

<!-- Paneles asociados (uno por tab; el JS togglea hidden) -->
<div role="tabpanel">Contenido del tab activo</div>
<div role="tabpanel" hidden>Contenido del tab inactivo</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div
        className="kds-segmented-tabs"
        role="tablist"
        style={{ '--_tab-count': 2, '--_active-idx': 0 } as React.CSSProperties}
      >
        <button type="button" className="active" role="tab" aria-selected={true} tabIndex={0}>
          Personas
        </button>
        <button type="button" role="tab" aria-selected={false} tabIndex={-1}>
          Empresas
        </button>
      </div>
    </div>
  ),
};
