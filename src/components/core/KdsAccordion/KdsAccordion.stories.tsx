import type { Meta, StoryObj } from '@storybook/react';
import { KdsAccordion, KdsAccordionSummary, KdsAccordionDetails } from './KdsAccordion';
import { spacing } from '../../../tokens';

const meta: Meta<typeof KdsAccordion> = {
  title: 'Core/KdsAccordion',
  component: KdsAccordion,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsAccordion>;

export const Default: Story = {
  render: function DefaultAccordion() {
    return (
      <KdsAccordion>
        <KdsAccordionSummary>¿Cómo funciona el pago?</KdsAccordionSummary>
        <KdsAccordionDetails>
          Selecciona tu banco, autoriza la transferencia y recibe tu comprobante al instante.
        </KdsAccordionDetails>
      </KdsAccordion>
    );
  },
};

export const DefaultOpen: Story = {
  render: function DefaultOpenAccordion() {
    return (
      <KdsAccordion open>
        <KdsAccordionSummary>¿Cómo funciona el pago?</KdsAccordionSummary>
        <KdsAccordionDetails>
          Selecciona tu banco, autoriza la transferencia y recibe tu comprobante al instante.
        </KdsAccordionDetails>
      </KdsAccordion>
    );
  },
};

export const Multiple: Story = {
  render: function MultipleAccordions() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[1] }}>
        <KdsAccordion>
          <KdsAccordionSummary>¿Cómo funciona el pago?</KdsAccordionSummary>
          <KdsAccordionDetails>
            Selecciona tu banco, autoriza la transferencia y recibe tu comprobante al instante.
          </KdsAccordionDetails>
        </KdsAccordion>
        <KdsAccordion>
          <KdsAccordionSummary>¿Es seguro pagar con Khipu?</KdsAccordionSummary>
          <KdsAccordionDetails>
            Sí. Khipu utiliza conexiones cifradas y nunca almacena tus credenciales bancarias.
          </KdsAccordionDetails>
        </KdsAccordion>
        <KdsAccordion>
          <KdsAccordionSummary>¿Cuánto tarda en confirmarse el pago?</KdsAccordionSummary>
          <KdsAccordionDetails>
            La mayoría de los pagos se confirman en segundos. En algunos casos puede tomar hasta unos minutos dependiendo de tu banco.
          </KdsAccordionDetails>
        </KdsAccordion>
      </div>
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML:
 * ```html
 * <details class="kds-accordion" open>
 *   <summary class="kds-accordion-summary">
 *     ¿Cómo funciona el pago?
 *     <i class="material-symbols-outlined">expand_more</i>
 *   </summary>
 *   <div class="kds-accordion-details">
 *     <p>El pago se procesa directamente con tu banco.</p>
 *   </div>
 * </details>
 * ```
 *
 * Ver `Patterns/CSS-only → Accordion` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <details className="kds-accordion" open>
        <summary className="kds-accordion-summary">
          ¿Cómo funciona el pago?
          <i className="material-symbols-outlined">expand_more</i>
        </summary>
        <div className="kds-accordion-details">
          <p>El pago se procesa directamente con tu banco.</p>
        </div>
      </details>
    </div>
  ),
};
