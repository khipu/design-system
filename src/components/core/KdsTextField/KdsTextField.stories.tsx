import type { Meta, StoryObj } from '@storybook/react';
import { KdsTextField } from './KdsTextField';
import { spacing, semanticSpacing } from '../../../tokens';

const meta: Meta<typeof KdsTextField> = {
  title: 'Components/Form Inputs/KdsTextField',
  component: KdsTextField,
  tags: ['autodocs'],
  argTypes: {
    fullWidth: { control: 'boolean' },
    narrow: { control: 'boolean' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsTextField>;

export const Default: Story = {
  args: {
    label: 'Email',
  },
};

export const WithValue: Story = {
  args: {
    label: 'RUT',
    defaultValue: '12.345.678-9',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    helperText: 'Mínimo 8 caracteres',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    defaultValue: 'invalid-email',
    error: true,
    helperText: 'Por favor ingrese un email válido',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Nombre',
    defaultValue: 'Juan Pérez',
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    label: 'Monto',
    value: '$1.000',
    readOnly: true,
  },
};

export const FullWidth: Story = {
  args: {
    label: 'Dirección',
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
      <KdsTextField
        label="Buscar"
       
        startIcon="search"
      />
      <KdsTextField
        label="Contraseña"
        type="password"
        endIcon="visibility_off"
      />
    </div>
  ),
};

/**
 * Campo de contraseña con toggle de mostrar/ocultar (`revealable`).
 *
 * El "ojo" es un `<a role="button">` accesible (focusable, operable con Enter/Space,
 * `aria-pressed` refleja el estado). Alterna el `type` del input entre `password` y
 * `text`. Pensado para logins de banco donde el usuario quiere verificar lo que escribió.
 */
export const PasswordReveal: Story = {
  args: {
    label: 'Contraseña',
    revealable: true,
    defaultValue: 'mi-clave-secreta',
    helperText: 'Toca el ojo para mostrar u ocultar lo que escribes',
  },
};

/**
 * Campo requerido SIN marca visual (`requiredMark={false}`).
 *
 * El input mantiene el atributo `required` (validación/accesibilidad), pero la
 * label no muestra ` *`. Útil cuando el requerimiento se comunica de otra forma.
 */
export const RequiredWithoutMark: Story = {
  args: {
    label: 'RUT',
    required: true,
    requiredMark: false,
    helperText: 'Requerido, pero sin asterisco',
  },
};

/**
 * Variante angosta (`narrow`): ancho reducido y texto centrado, para inputs de pocos
 * caracteres. Deja de ser fullWidth.
 */
export const Narrow: Story = {
  args: {
    label: 'A1',
    narrow: true,
    maxLength: 2,
  },
};

/**
 * Ejemplo de coordenadas: varios `narrow` en fila (segmentos de 2 caracteres con label
 * por posición). Cada segmento mantiene su ancho; el valor combinado se arma en el
 * consumidor (ej. unión con `|`).
 */
export const Coordinates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: spacing[2] }}>
      <KdsTextField label="A1" narrow maxLength={2} required requiredMark={false} />
      <KdsTextField label="B5" narrow maxLength={2} required requiredMark={false} />
      <KdsTextField label="F3" narrow maxLength={2} required requiredMark={false} />
    </div>
  ),
};

export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}>
      <KdsTextField label="Texto" type="text" />
      <KdsTextField label="Password" type="password" />
      <KdsTextField label="Email" type="email" />
      <KdsTextField label="Número" type="number" />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <form style={{ display: 'flex', flexDirection: 'column', gap: semanticSpacing.formGap, maxWidth: '400px' }}>
      <KdsTextField label="Nombre completo" required />
      <KdsTextField label="RUT" required />
      <KdsTextField label="Email" type="email" required />
      <KdsTextField label="Teléfono" type="tel" />
    </form>
  ),
};

/**
 * Markup HTML plano (BeerCSS) — para consumidores GSP/legacy que no usan React.
 * Las clases `kds-*` son la fuente de verdad; el componente React solo las envuelve.
 *
 * Recordar: `placeholder=" "` (un espacio) es obligatorio para el truco floating-label.
 *
 * Contrato HTML:
 * ```html
 * <div class="field label border">
 *   <input type="email" id="email" name="email" placeholder=" "/>
 *   <label for="email">Email</label>
 *   <span class="helper">Te enviaremos la confirmación aquí</span>
 * </div>
 * ```
 *
 * Ver `Patterns/CSS-only → TextField` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="field label border">
  <input type="email" id="email" name="email" placeholder=" "/>
  <label for="email">Email</label>
  <span class="helper">Te enviaremos la confirmación aquí</span>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="field label border">
        <input type="email" id="email-html-markup" name="email" placeholder=" " />
        <label htmlFor="email-html-markup">Email</label>
        <span className="helper">Te enviaremos la confirmación aquí</span>
      </div>
    </div>
  ),
};

/**
 * Variante destacada — el campo dentro de `.kds-field-highlight`, la caja que
 * señala un bloque opcional o condicional dentro de un formulario (ej. los datos
 * de devolución del flujo de transferencia manual de Argentina, que solo
 * aparecen para ciertos comercios).
 *
 * El campo **no se modifica**: el color vive en la banda del header, nunca
 * detrás del campo. BeerCSS flota la etiqueta *sobre* el borde (recorta el input
 * con `clip-path` y redibuja ese tramo en `label::after`), así que cualquier
 * superficie pintada detrás se asomaría por esa muesca, justo debajo de la
 * etiqueta. Dejando el campo sobre la superficie de la página, renderiza
 * idéntico a los demás del formulario.
 *
 * El header es opcional, y el badge dentro del header también. Envuelve uno o
 * varios campos.
 *
 * Accesibilidad: el eyebrow es informativo, no decorativo — enlazalo con
 * `aria-describedby` en el input. En HTML plano podés enlazar también el helper
 * (el markup de abajo lo muestra); el componente React todavía no expone un
 * `id` para el helper, así que ahí solo se enlaza el eyebrow.
 *
 * Ver `Patterns/CSS-only → FieldHighlight` para la spec completa.
 */
export const Highlighted: Story = {
  name: 'Destacado (.kds-field-highlight)',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-field-highlight">
  <div class="kds-field-highlight-header">
    <span class="kds-field-highlight-eyebrow" id="alias-eyebrow">Opcional — según cliente</span>
    <span class="kds-badge info">VA</span>
  </div>

  <div class="field label border">
    <input type="text" id="alias" name="alias" placeholder=" "
           aria-describedby="alias-eyebrow alias-helper"/>
    <label for="alias">Alias o CBU de la cuenta que transfiere</label>
    <span class="helper" id="alias-helper">Lo usamos solo para eventuales devoluciones.</span>
  </div>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-field-highlight">
        <div className="kds-field-highlight-header">
          <span className="kds-field-highlight-eyebrow" id="alias-eyebrow">
            Opcional — según cliente
          </span>
          <span className="kds-badge info">VA</span>
        </div>

        <KdsTextField
          id="alias"
          name="alias"
          label="Alias o CBU de la cuenta que transfiere"
          helperText="Lo usamos solo para eventuales devoluciones."
          aria-describedby="alias-eyebrow"
        />
      </div>
    </div>
  ),
};
