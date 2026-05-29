import type { Meta, StoryObj } from '@storybook/react';
import { KdsExpandPanel } from './KdsExpandPanel';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsExpandPanel> = {
  title: 'Core/KdsExpandPanel',
  component: KdsExpandPanel,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsExpandPanel>;

export const Default: Story = {
  render: function DefaultExpandPanel() {
    return (
      <KdsExpandPanel label="Detalles">
        <p style={{ margin: 0 }}>
          Información adicional sobre el pago, incluyendo emisor y descripción completa.
        </p>
      </KdsExpandPanel>
    );
  },
};

export const DefaultExpanded: Story = {
  render: function DefaultExpandedPanel() {
    return (
      <KdsExpandPanel label="Detalles" defaultExpanded>
        <p style={{ margin: 0 }}>
          Información adicional sobre el pago, incluyendo emisor y descripción completa.
        </p>
      </KdsExpandPanel>
    );
  },
};

export const InContext: Story = {
  render: function InContextExpandPanel() {
    return (
      <div
        style={{
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          padding: spacing[2],
          maxWidth: '400px',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Monto</span>
            <strong>$25.000</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Comercio</span>
            <span>Tienda ejemplo</span>
          </div>
        </div>
        <KdsExpandPanel label="Ver más detalles" defaultExpanded={false}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[0.5] }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Descripción</span>
              <span>Compra en línea</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Código operación</span>
              <span>OP-20250512-001</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Emisor</span>
              <span>pagos@tienda.cl</span>
            </div>
          </div>
        </KdsExpandPanel>
      </div>
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML (estado expandido):
 * ```html
 * <div>
 *   <button class="kds-expand-toggle" aria-expanded="true">
 *     <span>Ver detalles</span>
 *     <i class="material-symbols-outlined">expand_less</i>
 *   </button>
 *   <div class="kds-expand-panel open">
 *     <p>Contenido extendido del panel cuando está abierto.</p>
 *   </div>
 * </div>
 * ```
 *
 * Ver `Patterns/CSS-only → ExpandPanel` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<button class="kds-expand-toggle" aria-expanded="true">
  <span>Ver detalles</span>
  <i class="material-symbols-outlined">expand_less</i>
</button>
<div class="kds-expand-panel open">
  <p>Contenido extendido del panel cuando está abierto.</p>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <button className="kds-expand-toggle" aria-expanded="true">
        <span>Ver detalles</span>
        <i className="material-symbols-outlined">expand_less</i>
      </button>
      <div className="kds-expand-panel open">
        <p>Contenido extendido del panel cuando está abierto.</p>
      </div>
    </div>
  ),
};
