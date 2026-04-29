import type { Preview } from '@storybook/react';
import React from 'react';
import { create } from 'storybook/theming';
import { useDarkMode } from '@vueless/storybook-dark-mode';
import { KhipuThemeProvider } from '../src/theme/ThemeProvider';
import { colorsByMode, fontFamilies } from '../src/tokens';
import '../src/tokens/css-variables.css';

// Storybook UI themes — create() requires literal values, so we reference tokens as source
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

const darkPaletteOverrides = {
  palette: {
    mode: 'dark' as const,
    primary: dark.primary,
    secondary: dark.secondary,
    text: dark.text,
    background: dark.background,
    action: dark.action,
    divider: dark.divider,
  },
};

function StoryDecorator({ Story }: { Story: React.ComponentType }) {
  const isDark = useDarkMode();
  const mode = isDark ? 'dark' : 'light';
  const modeColors = colorsByMode[mode];

  return (
    <KhipuThemeProvider
      mode={mode}
      themeOverrides={isDark ? darkPaletteOverrides : undefined}
    >
      <div style={{ backgroundColor: modeColors.background.default, minHeight: '100%' }}>
        <Story />
      </div>
    </KhipuThemeProvider>
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
        order: ['Brand', 'Core', 'Domain', 'Examples'],
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
