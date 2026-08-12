import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { KdsThemeProvider } from '../theme/KdsThemeProvider';
import { KdsButton } from '../components/core/KdsButton';
import { KdsAlert } from '../components/core/KdsAlert';

/**
 * Contrato de dark mode del Khipu DS.
 *
 * Los agentes IA y consumidores deben leer esta página antes de tematizar una
 * pantalla o escribir CSS con colores.
 */
const meta: Meta = {
  title: 'Design System/Dark mode',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: [
          'El dark mode del DS es **opt-in explícito** vía el atributo `data-theme` — nunca se activa solo con la preferencia del sistema operativo.',
          '',
          '## El contrato',
          '```html',
          '<!-- En <html>, <body> o cualquier wrapper: todo el subtree se re-tematiza -->',
          '<body data-theme="dark">...</body>',
          '```',
          '- Valores light en `:root {}`; valores dark en el bloque `[data-theme="dark"] {}` de `css-variables.css`, auto-generado desde `darkModeColors` (`src/tokens/index.ts`). Solo se overridean **colores**.',
          '- `color-scheme` pasa a `dark` bajo el atributo (form controls y scrollbars nativos se oscurecen).',
          '',
          '## Cómo activarlo',
          '- **React:** `<KdsThemeProvider mode="dark">` — emite `data-theme` en su wrapper (demo abajo).',
          "- **HTML plano (BeerCSS/Grails):** `document.documentElement.setAttribute('data-theme', 'dark')`.",
          '- **Storybook:** el toggle sol/luna de la toolbar.',
          '',
          '## Reglas al escribir CSS con color',
          '1. **Siempre `var(--kds-*)`** — un hex hardcodeado no se re-tematiza.',
          '2. **Texto sobre superficies semánticas suaves:** usar `--kds-alert-{tipo}-text` (claro en dark), nunca los tonos `*-dark`.',
          '3. **Texto sobre fondos semánticos sólidos:** usar `--kds-color-{tipo}-contrast` (blanco en ambos modos), no `--kds-color-primary-contrast` (se invierte en dark).',
          '4. **Texto principal:** `--kds-color-text-primary`, nunca grises absolutos (`gray-800/900`).',
          '5. **Hovers:** en dark deben **aclarar** (`primary-light`), no oscurecer (`primary-dark` es ilegible sobre superficie oscura).',
          '6. **Overrides dark aditivos** bajo `[data-theme="dark"]` (o `body.dark, [data-theme="dark"]` si compiten con el grupo de mapeos BeerCSS); el valor light nunca cambia.',
          '',
          'Guía completa: `docs/TOKENS_GUIDE.md` → sección "Dark mode".',
        ].join('\n'),
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const Sample = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--kds-spacing-2)',
      padding: 'var(--kds-spacing-3)',
      background: 'var(--kds-color-background-default)',
      borderRadius: 'var(--kds-radius-lg)',
      border: '1px solid var(--kds-color-divider)',
    }}
  >
    <span style={{ color: 'var(--kds-color-text-primary)', fontWeight: 'var(--kds-font-weight-semibold)' as React.CSSProperties['fontWeight'] }}>
      Confirmar transacción
    </span>
    <span style={{ color: 'var(--kds-color-text-secondary)', fontSize: 'var(--kds-font-size-sm)' }}>
      Estás a punto de transferir $150.000.
    </span>
    <KdsAlert severity="info">El tope mensual corresponde al monto máximo posible a cobrar.</KdsAlert>
    <KdsButton variant="primary">Continuar</KdsButton>
  </div>
);

/**
 * El MISMO markup bajo dos providers: cada subtree resuelve sus `--kds-*`
 * según el `data-theme` del wrapper. Nada del contenido conoce el modo.
 */
export const ProviderSideBySide: Story = {
  name: 'KdsThemeProvider — light y dark lado a lado',
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--kds-spacing-3)', maxWidth: 860 }}>
      <KdsThemeProvider mode="light">
        <Sample />
      </KdsThemeProvider>
      <KdsThemeProvider mode="dark">
        <Sample />
      </KdsThemeProvider>
    </div>
  ),
};
