import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsSnackbar } from './KdsSnackbar';
import { KdsButton } from '../KdsButton';

/**
 * KdsSnackbar — notificación flotante semántica con icon + progress bar + close.
 *
 * Layout (spec):
 * - `position: fixed`, `min-width: 344px`, `max-width: var(--kds-snackbar-max-width)`
 * - `box-shadow: var(--kds-shadow-8)`, `border-radius: md`
 * - `padding: 12px 16px`, `gap: 8px`
 * - Variantes `info|success|error` con bg semántico solid
 * - **Progress bar** (`::after`): barra blanca semi-transparente abajo, anima width 100% → 0% en `duration` ms
 * - **Close button** (`.kds-snackbar-close`): icon-only blanco semi-transparente
 *
 * **Stories preview note:** Por default `.snackbar` es `position: fixed` (esquina inferior del viewport).
 * En estas stories aplicamos un override inline `position: relative` para que sea visible dentro del
 * preview area de Storybook — el comportamiento real en producción es fixed.
 *
 * @gsp `_paymentFlashSnackbars.gsp` + `khipu-init.js → initFlashMessages()` (close button + auto-dismiss)
 */
const meta: Meta<typeof KdsSnackbar> = {
  title: 'Components/Feedback/KdsSnackbar',
  component: KdsSnackbar,
  tags: ['autodocs'],
  // Override position:fixed para que se vea dentro del preview area de Storybook.
  // En producción el snackbar es fixed bottom; aquí lo mostramos inline.
  decorators: [
    (Story) => (
      <div style={{ minHeight: 80, paddingTop: 8 }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'Snackbar fixed (`position: fixed`) con icon prefix, mensaje, close button (`.kds-snackbar-close`) y progress bar lineal (`::after` animado con `--kds-snackbar-duration`). Stories usan override `position: relative` para que sea visible en el preview area.',
      },
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'success', 'error'],
      description: 'Variante semántica. Determina bg + icon default.',
    },
    icon: {
      control: 'text',
      description: 'Override del icon prefix. Pasar `false` para ocultar.',
    },
    duration: {
      control: 'number',
      description:
        'Duración en ms hasta auto-dismiss + tiempo del progress bar. `0` = sin auto-dismiss ni progress bar.',
    },
    message: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsSnackbar>;

/**
 * Override de los estilos `position: fixed`, `inset: auto auto 6rem 50%` y
 * `transform: translate(-50%, ...)` que BeerCSS aplica al `.snackbar` y a `.snackbar.active`.
 * Sin esto, el snackbar escapa del preview area (queda centrado en el viewport).
 */
const inlineStyle: React.CSSProperties = {
  position: 'relative',
  inset: 'auto',
  transform: 'none',
  inlineSize: 'auto',
  margin: 0,
};

/** Info — icon default `info`. */
export const Info: Story = {
  args: {
    message: 'Verificando transferencia...',
    type: 'info',
    duration: 99999,
    style: inlineStyle,
  },
};

/** Success — icon default `check_circle`. */
export const Success: Story = {
  args: {
    message: 'Datos copiados al portapapeles',
    type: 'success',
    duration: 99999,
    style: inlineStyle,
  },
};

/** Error — icon default `error`. */
export const Error: Story = {
  args: {
    message: 'Error al procesar el pago',
    type: 'error',
    duration: 99999,
    style: inlineStyle,
  },
};

/**
 * Con icon custom — override del default por type.
 */
export const CustomIcon: Story = {
  args: {
    message: 'Recuerda guardar tus cambios antes de continuar',
    type: 'info',
    icon: 'lightbulb',
    duration: 99999,
    style: inlineStyle,
  },
};

/**
 * Sin icon — `icon={false}`.
 */
export const NoIcon: Story = {
  args: {
    message: 'Sin icon prefix',
    type: 'info',
    icon: false,
    duration: 99999,
    style: inlineStyle,
  },
};

/**
 * Con close button — agrega el botón `.kds-snackbar-close` (icon-only X) a la derecha.
 *
 * @spec El close button NO usa `kds-btn`. Es un `<button class="kds-snackbar-close">` con
 * estilos propios: bg transparent, icon white 18px, padding 4px, circle hover.
 */
export const WithClose: Story = {
  render: function SnackbarWithClose() {
    const [open, setOpen] = useState(true);
    if (!open) {
      return (
        <KdsButton variant="outlined" size="sm" onClick={() => setOpen(true)}>
          Reabrir
        </KdsButton>
      );
    }
    return (
      <KdsSnackbar
        message="Pago realizado con éxito"
        type="success"
        duration={99999}
        open={open}
        onClose={() => setOpen(false)}
        style={inlineStyle}
      />
    );
  },
};

/**
 * Con progress bar visible — duración corta (8s) para que el progress bar sea observable.
 *
 * @spec El `::after` se anima desde `width: 100%` hasta `width: 0` durante `--kds-snackbar-duration`,
 * sincronizado con `setTimeout(dismiss, duration)` en JS.
 */
export const WithProgressBar: Story = {
  render: function SnackbarWithProgress() {
    const [key, setKey] = useState(0);
    const [open, setOpen] = useState(true);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <KdsButton
          variant="outlined"
          size="sm"
          onClick={() => {
            setKey((k) => k + 1);
            setOpen(true);
          }}
        >
          Reiniciar (8s)
        </KdsButton>
        {open && (
          <KdsSnackbar
            key={key}
            message="Auto-dismiss en 8 segundos — observa la barra inferior"
            type="info"
            duration={8000}
            open={open}
            onClose={() => setOpen(false)}
            style={inlineStyle}
          />
        )}
      </div>
    );
  },
};

/**
 * Disparado por un botón — patrón típico de flash message.
 */
export const Triggered: Story = {
  render: function SnackbarTriggered() {
    const [snack, setSnack] = useState<{ type: 'info' | 'success' | 'error'; msg: string } | null>(
      null,
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <KdsButton size="sm" onClick={() => setSnack({ type: 'success', msg: '¡Listo!' })}>
            Success
          </KdsButton>
          <KdsButton
            variant="outlined"
            size="sm"
            onClick={() => setSnack({ type: 'info', msg: 'Procesando...' })}
          >
            Info
          </KdsButton>
          <KdsButton
            variant="outlined"
            size="sm"
            onClick={() => setSnack({ type: 'error', msg: 'Algo salió mal' })}
          >
            Error
          </KdsButton>
        </div>
        {snack && (
          <KdsSnackbar
            key={snack.msg + snack.type}
            message={snack.msg}
            type={snack.type}
            duration={5000}
            onClose={() => setSnack(null)}
            style={inlineStyle}
          />
        )}
      </div>
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — el container `snackbar active [severity]` es
 * BeerCSS nativo; Khipu agrega `.kds-snackbar-close` para el botón de cerrar y
 * la CSS var `--kds-snackbar-duration` que controla el progress bar inferior.
 * La clase `active` la agrega el JS al disparar la notificación. El `style`
 * con CSS var es la única forma de parametrizar la duración per-instance.
 *
 * Ver `Patterns/CSS-only → Snackbar` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="snackbar active kds-info" style="--kds-snackbar-duration: 5000ms">
  <i class="material-symbols-outlined">info</i>
  <span class="max">Operación completada</span>
  <button class="kds-snackbar-close" aria-label="Cerrar">
    <i class="material-symbols-outlined">close</i>
  </button>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div
        className="snackbar active kds-info"
        style={{ '--kds-snackbar-duration': '5000ms' } as Record<string, string>}
      >
        <i className="material-symbols-outlined">info</i>
        <span className="max">Operación completada</span>
        <button className="kds-snackbar-close" aria-label="Cerrar">
          <i className="material-symbols-outlined">close</i>
        </button>
      </div>
    </div>
  ),
};
