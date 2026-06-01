import type { Meta, StoryObj } from '@storybook/react';
import { KdsMontoRow } from './KdsMontoRow';

/**
 * KdsMontoRow — bloque destacado de "Monto a transferir" usado en pantallas manualVerify.
 *
 * Layout & sizing (spec):
 * - `display: flex; justify-content: space-between`
 * - `padding: 14px 0 8px`
 * - `border-top: 1px dashed var(--kds-border-medium)`
 *
 * Tipografía:
 * - Title: `font-size: sm` (14px), `font-weight: 500`, `color: text-primary`
 * - Deadline: `font-size: xs` (12px), `color: text-secondary`, `line-height: relaxed`
 * - Value: `font-size: 24px`, `font-weight: 700`, `letter-spacing: tight`
 *
 * @gsp `_manualVerifyChileMaterial.gsp`, `_manualVerifyDefaultMaterial.gsp` — Screen 4 del flow
 */
const meta: Meta<typeof KdsMontoRow> = {
  title: 'Domain/Amount/KdsMontoRow',
  component: KdsMontoRow,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Bloque destacado de "Monto a transferir" — flex space-between, padding 14px 0 8px, border-top 1px dashed. Title sm/500, deadline xs/text-secondary, value 24px/700 con letter-spacing tight. Pre-componente para consolidar el patrón `kds-monto-row` ad-hoc usado en producción.',
      },
    },
  },
  argTypes: {
    title: { control: 'text', description: 'Título principal (e.g. "Monto a transferir").' },
    value: { control: 'text', description: 'Valor destacado (e.g. "$3.300"). Renderiza 24px bold.' },
    deadline: { control: 'text', description: 'Texto secundario opcional bajo el título.' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsMontoRow>;

/** Variante completa con deadline. */
export const Default: Story = {
  args: {
    title: 'Monto a transferir',
    value: '$3.300',
    deadline: (
      <>
        Fecha límite para transferencia
        <br />
        01-04-2026 a las 16:33
      </>
    ),
  },
};

/** Sin deadline — caso más simple. */
export const Simple: Story = {
  args: {
    title: 'Monto a transferir',
    value: '$3.300',
  },
};

/** Monto grande — verifica letter-spacing tight. */
export const LargeAmount: Story = {
  args: {
    title: 'Total a pagar',
    value: '$1.250.000',
  },
};

/** Dentro de una card del flow payment — contexto realista. */
export const InsideCard: Story = {
  render: () => (
    <div style={{ maxWidth: 400, padding: 24, background: 'white', borderRadius: 14, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
      <h3 style={{ marginTop: 0 }}>Datos para transferencia manual</h3>
      <p>Lorem ipsum dolor sit amet datos previos</p>
      <KdsMontoRow
        title="Monto a transferir"
        value="$3.300"
        deadline={
          <>
            Fecha límite para transferencia
            <br />
            01-04-2026 a las 16:33
          </>
        }
      />
    </div>
  ),
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Contrato HTML:
 * ```html
 * <div class="kds-monto-row">
 *   <div>
 *     <div class="kds-monto-row-title">Monto a transferir</div>
 *     <div class="kds-monto-row-deadline">
 *       Fecha límite para transferencia<br/>01-04-2026 a las 16:33
 *     </div>
 *   </div>
 *   <div class="kds-monto-row-value">$3.300</div>
 * </div>
 * ```
 *
 * Variante sin deadline: omitir el `.kds-monto-row-deadline`.
 *
 * Ver `Patterns/CSS-only → MontoRow` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-monto-row">
  <div>
    <div class="kds-monto-row-title">Monto a transferir</div>
    <div class="kds-monto-row-deadline">
      Fecha límite para transferencia<br/>01-04-2026 a las 16:33
    </div>
  </div>
  <div class="kds-monto-row-value">$3.300</div>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-monto-row">
        <div>
          <div className="kds-monto-row-title">Monto a transferir</div>
          <div className="kds-monto-row-deadline">
            Fecha límite para transferencia<br />01-04-2026 a las 16:33
          </div>
        </div>
        <div className="kds-monto-row-value">$3.300</div>
      </div>
    </div>
  ),
};
