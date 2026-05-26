import type { Meta, StoryObj } from '@storybook/react';
import { KdsRecapList } from './KdsRecapList';

/**
 * KdsRecapList — lista compacta de pares key-value para recap de datos del pago.
 *
 * Layout & sizing (spec):
 * - `display: flex; flex-direction: column`
 * - `gap: 6px` (`var(--kds-spacing-0-75)`)
 * - `margin-top: 10px` (`var(--kds-spacing-1-25)`)
 * - Cada `<li>`: `display: flex; justify-content: space-between`
 * - `font-size: var(--kds-font-size-sm)`
 *
 * Tipografía:
 * - `.k` (key): `color: var(--kds-color-text-secondary)`, peso regular
 * - `.v` (value): `font-weight: 500`, color text-primary
 * - `.v.placeholder`: `color: var(--kds-color-text-hint)` (cuando no hay value)
 *
 * API:
 * ```ts
 * interface KdsRecapItem {
 *   label: string;        // visible como .k
 *   value?: string;       // visible como .v (peso 500)
 *   placeholder?: string; // visible como .v.placeholder (peso normal, color hint)
 * }
 * ```
 *
 * @gsp `_manualVerifyChileMaterial.gsp`, `_manualVerifyDefaultMaterial.gsp` — recap del pagador antes del monto a transferir
 * @css .kds-recap-list, .kds-recap-list li, .kds-recap-list .k, .kds-recap-list .v, .kds-recap-list .v.placeholder
 */
const meta: Meta<typeof KdsRecapList> = {
  title: 'Domain/KdsRecapList',
  component: KdsRecapList,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Recap compacto de datos del pagador. Flex column gap 6px, li flex space-between, font sm. Key color text-secondary, value font-weight 500. Placeholder (cuando value es undefined) usa color text-hint. Margin-top 10px para separar de divider/header anterior.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsRecapList>;

/** Recap básico con todos los valores presentes. */
export const Default: Story = {
  args: {
    items: [
      { label: 'RUT / DNI Titular', value: '12.345.678-9' },
      { label: 'Nombre', value: 'Juan Pérez González' },
      { label: 'Email', value: 'juan.perez@email.cl' },
    ],
  },
};

/**
 * Con placeholders — cuando el dato aún no se capturó.
 *
 * @spec El placeholder `—` (em-dash) o `--` aparece con `color: var(--kds-color-text-hint)`.
 */
export const WithPlaceholders: Story = {
  args: {
    items: [
      { label: 'RUT / DNI Titular', placeholder: '—' },
      { label: 'Nombre', placeholder: '—' },
      { label: 'Email', value: 'test@khipu.com' },
    ],
  },
};

/** Caso típico de Screen 4 — recap del destinatario con 7 campos. */
export const PaymentRecap: Story = {
  args: {
    items: [
      { label: 'Banco', value: 'Banco de Chile' },
      { label: 'RUT', value: '18.765.432-1' },
      { label: 'N° cuenta', value: '00-123-45678-90' },
      { label: 'Tipo', value: 'Cuenta corriente' },
      { label: 'Titular', value: 'María Catalina Rojas Soto' },
      { label: 'Email', value: 'maria.rojas@gmail.com' },
      { label: 'Monto', value: '$3.300' },
    ],
  },
};

/** Valor muy largo — verifica que no haya overflow. */
export const LongValue: Story = {
  args: {
    items: [
      { label: 'Titular', value: 'María José Catalina Antonieta Rojas Soto-Aguirre' },
      { label: 'Email', value: 'maria.jose.antonieta.rojas.soto.aguirre@empresacomercial.cl' },
    ],
  },
  decorators: [(Story) => <div style={{ maxWidth: 320 }}><Story /></div>],
  parameters: {
    docs: {
      description: {
        story:
          'Cuando el value excede el espacio disponible, el `<li>` no fuerza wrap por default. Si necesitas wrap, agrega `flex-wrap: wrap` o usa `kds-kv` (que tiene ellipsis nativo).',
      },
    },
  },
};

/** Todos los items en estado placeholder — estado inicial antes de capturar datos. */
export const Empty: Story = {
  args: {
    items: [
      { label: 'RUT', placeholder: '—' },
      { label: 'Nombre', placeholder: '—' },
      { label: 'Email', placeholder: '—' },
    ],
  },
};
