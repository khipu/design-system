import type { Preview } from '@storybook/react';
import React from 'react';
import { create } from 'storybook/theming';
import { useDarkMode } from '@vueless/storybook-dark-mode';
import { colorsByMode, fontFamilies } from '../src/tokens';
import '../src/tokens/css-variables.css';

// BeerCSS base + Khipu customizations (source imports for Vite HMR)
import 'beercss/dist/cdn/beer.min.css';
import '../src/beercss/customizations/khipu-tokens.css';
import '../src/beercss/customizations/khipu-components.css';

const light = colorsByMode.light;
const dark = colorsByMode.dark;

const khipuLightTheme = create({
  base: 'light',
  brandTitle: 'Khipu Design System',
  brandUrl: 'https://design.khipu.com',
  brandImage: '/khipu-200x75-color.svg',
  brandTarget: '_self',

  colorPrimary: light.primary.main,
  colorSecondary: light.primary.main,

  appBg: light.background.default,
  appContentBg: light.background.default,
  appBorderColor: light.gray[200],
  appBorderRadius: 8,

  textColor: light.text.primary,
  textInverseColor: light.primary.contrastText,

  barTextColor: light.text.footer,
  barSelectedColor: light.primary.main,
  barBg: light.background.default,

  fontBase: fontFamilies.primary,
  fontCode: fontFamilies.mono,
});

const khipuDarkTheme = create({
  base: 'dark',
  brandTitle: 'Khipu Design System',
  brandUrl: 'https://design.khipu.com',
  brandImage: '/khipu-200x75-color.svg',
  brandTarget: '_self',

  colorPrimary: dark.primary.main,
  colorSecondary: dark.primary.main,

  appBg: dark.background.default,
  appContentBg: dark.background.paper,
  appBorderColor: dark.divider,
  appBorderRadius: 8,

  textColor: dark.text.primary,
  textInverseColor: dark.background.default,

  barTextColor: dark.text.secondary,
  barSelectedColor: dark.primary.main,
  barBg: dark.background.default,

  fontBase: fontFamilies.primary,
  fontCode: fontFamilies.mono,
});

function StoryDecorator({ Story }: { Story: React.ComponentType }) {
  const isDark = useDarkMode();
  const mode = isDark ? 'dark' : 'light';

  // Drive the [data-theme] contract on the document root + body so BeerCSS body
  // styles and component CSS re-theme, not just the wrapper. The `dark` class is
  // kept transitionally for any CSS still keyed on body.dark (removed once the
  // bridge migration is complete).
  React.useEffect(() => {
    const targets = [document.documentElement, document.body];
    targets.forEach((el) => {
      el.setAttribute('data-theme', mode);
      el.classList.toggle('dark', isDark);
      el.classList.toggle('light', !isDark);
    });
    return () => {
      targets.forEach((el) => {
        el.removeAttribute('data-theme');
        el.classList.remove('dark', 'light');
      });
    };
  }, [mode, isDark]);

  return (
    <div
      data-theme={mode}
      className={`kds-theme-root ${isDark ? 'dark' : 'light'}`}
      style={{ backgroundColor: 'var(--kds-color-background-default)', minHeight: '100%' }}
    >
      <Story />
    </div>
  );
}

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: { disable: true },
    options: {
      storySort: {
        order: [
          'Design System',
          ['Conventions', 'Foundations', 'Tokens', 'Assets'],
          'Brand',
          ['Integración', 'Uso de marca', 'Uso de colores', 'Uso tipográfico', 'Voz y tono'],
          'Components',
          ['Actions', 'Form Inputs', 'Feedback', 'Containers', 'Navigation', 'Data Display', 'Overlays'],
          'Domain',
          ['Payment Identity', 'Amount', 'Banking', 'Selection', 'Recap & Trust'],
          'Patterns',
          'Hooks',
          'Examples',
        ],
      },
    },
    docs: {
      theme: khipuLightTheme,
    },
    darkMode: {
      dark: khipuDarkTheme,
      light: khipuLightTheme,
      current: 'light',
    },
  },
  decorators: [
    (Story) => <StoryDecorator Story={Story} />,
  ],
};

export default preview;
