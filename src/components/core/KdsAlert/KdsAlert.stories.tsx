import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsAlert } from './KdsAlert';
import { spacing } from '../../../tokens';

/**
 * KdsAlert — banner inline para mensajes informativos con icon opcional + close discreto.
 *
 * Layout (spec):
 * - `display: flex; align-items: center; gap: 8px`
 * - `padding: 16px` (default) / reducido en `.kds-alert-inline`
 * - `border-radius: var(--kds-radius-md)`, `border: 1px solid`
 * - Icon `24x24` flex-shrink 0; content `flex: 1, min-width: 0`
 * - Close button: 28×28 circular discreto (no usa kds-btn — evita romper el flex)
 *
 * Variantes (severity):
 * - `info` (default icon: `info`)
 * - `success` (default icon: `check_circle`)
 * - `warning` (default icon: `warning`)
 * - `error` (default icon: `error`)
 *
 * Cada severity tiene su par bg/border/color/icon-color en tokens (`--kds-alert-*-bg`, `--kds-color-*-dark`).
 *
 * Override de icon:
 * - `icon={false}` → oculta el icon
 * - `icon="custom_name"` → usa otro Material Symbol
 * - `icon` omitido → usa el default por severity
 */
const meta: Meta<typeof KdsAlert> = {
  title: 'Core/KdsAlert',
  component: KdsAlert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Alert inline con icon + content + close button discreto. Flex layout gap 8px, padding 16px, border-radius md. Icon default por severity (info/check_circle/warning/error). Close button es icon-only 28×28 circular — NO usa kds-btn (eso rompía el flex layout y mostraba el texto letra-por-letra).',
      },
    },
  },
  argTypes: {
    severity: {
      control: 'select',
      options: ['success', 'info', 'warning', 'error'],
      description: 'Determina colores + icon default.',
    },
    title: {
      control: 'text',
      description: 'Título en negrita arriba del description.',
    },
    icon: {
      control: 'text',
      description: 'Material Symbol name. Omitir para usar el default por severity. Pasar `false` para ocultar.',
    },
    inline: {
      control: 'boolean',
      description: 'Compact variant — padding reducido.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsAlert>;

/** Info con icon default (`info`). */
export const Default: Story = {
  args: {
    severity: 'info',
    children: 'El tope mensual corresponde al monto máximo posible a cobrar.',
  },
};

/**
 * Info con icon custom — útil cuando el icon default no transmite el contexto.
 *
 * @spec Override del icon default vía prop `icon="..."`.
 */
export const InfoWithCustomIcon: Story = {
  args: {
    severity: 'info',
    icon: 'lightbulb',
    children: 'Sugerencia: configura un alias de pago para próximas transferencias.',
  },
};

/** Sin icon (`icon={false}`) — versión minimal solo texto. */
export const NoIcon: Story = {
  args: {
    severity: 'info',
    icon: false,
    children: 'Mensaje informativo simple sin icon guía.',
  },
};

export const Success: Story = {
  args: {
    severity: 'success',
    children: 'El pago ha sido verificado exitosamente.',
  },
};

export const Warning: Story = {
  args: {
    severity: 'warning',
    children: 'La transferencia está pendiente de verificación.',
  },
};

export const Error: Story = {
  args: {
    severity: 'error',
    children: 'Ha ocurrido un error al procesar tu pago.',
  },
};

export const WithTitle: Story = {
  args: {
    severity: 'success',
    title: '¡Todo listo!',
    children: 'Espera la confirmación por parte de tu banco.',
  },
};

export const Inline: Story = {
  args: {
    severity: 'warning',
    inline: true,
    children:
      'La transferencia ya fue realizada. Ahora estamos verificando la recepción del pago.',
  },
};

/**
 * Closable — agrega close button discreto a la derecha.
 *
 * @spec El close NO es un `kds-btn` (eso rompía el flex layout). Es un button icon-only 28×28 circular.
 */
export const Closable: Story = {
  render: function ClosableAlert() {
    const [visible, setVisible] = useState(true);

    if (!visible) {
      return (
        <button
          className="kds-btn kds-btn-outlined kds-btn-sm"
          onClick={() => setVisible(true)}
        >
          Mostrar alerta
        </button>
      );
    }

    return (
      <KdsAlert severity="info" onClose={() => setVisible(false)}>
        Tu sesión expirará en 5 minutos. Guarda tus cambios antes de continuar.
      </KdsAlert>
    );
  },
};

/** Closable con title + description larga — verifica layout en casos complejos. */
export const ClosableWithTitle: Story = {
  render: function ClosableTitledAlert() {
    const [visible, setVisible] = useState(true);
    if (!visible) {
      return (
        <button className="kds-btn kds-btn-outlined kds-btn-sm" onClick={() => setVisible(true)}>
          Mostrar
        </button>
      );
    }
    return (
      <KdsAlert
        severity="warning"
        title="Acción requerida"
        onClose={() => setVisible(false)}
      >
        Tu suscripción vencerá el próximo mes. Renuévala antes del 15 de junio para evitar
        interrupciones en tus pagos automáticos programados.
      </KdsAlert>
    );
  },
};

export const AllSeverities: Story = {
  render: function AllSeveritiesAlert() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
        <KdsAlert severity="info">
          El tope mensual corresponde al monto máximo posible a cobrar.
        </KdsAlert>
        <KdsAlert severity="success">
          El pago ha sido verificado exitosamente.
        </KdsAlert>
        <KdsAlert severity="warning">
          La transferencia está pendiente de verificación.
        </KdsAlert>
        <KdsAlert severity="error">
          Ha ocurrido un error al procesar tu pago.
        </KdsAlert>
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
 * <div class="kds-alert kds-info" role="alert">
 *   <div class="kds-alert-icon">
 *     <i class="material-symbols-outlined">info</i>
 *   </div>
 *   <div class="kds-alert-content">
 *     <p class="kds-alert-title">Verifica el monto antes de pagar</p>
 *     <p class="kds-alert-description">Una vez confirmado, no podrás revertir la transferencia.</p>
 *   </div>
 *   <button type="button" class="kds-alert-close" aria-label="Cerrar">
 *     <i class="material-symbols-outlined">close</i>
 *   </button>
 * </div>
 * ```
 *
 * Ver `Patterns/CSS-only → Alert` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-alert kds-info" role="alert">
  <div class="kds-alert-icon">
    <i class="material-symbols-outlined">info</i>
  </div>
  <div class="kds-alert-content">
    <p class="kds-alert-title">Verifica el monto antes de pagar</p>
    <p class="kds-alert-description">
      Una vez confirmado, no podrás revertir la transferencia.
    </p>
  </div>
  <button type="button" class="kds-alert-close" aria-label="Cerrar">
    <i class="material-symbols-outlined">close</i>
  </button>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-alert kds-info" role="alert">
        <div className="kds-alert-icon">
          <i className="material-symbols-outlined">info</i>
        </div>
        <div className="kds-alert-content">
          <p className="kds-alert-title">Verifica el monto antes de pagar</p>
          <p className="kds-alert-description">
            Una vez confirmado, no podrás revertir la transferencia.
          </p>
        </div>
        <button type="button" className="kds-alert-close" aria-label="Cerrar">
          <i className="material-symbols-outlined">close</i>
        </button>
      </div>
    </div>
  ),
};
