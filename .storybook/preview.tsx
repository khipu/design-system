import type { Preview } from '@storybook/react';
import React from 'react';
import { create } from 'storybook/theming';
import { KhipuThemeProvider } from '../src/theme/ThemeProvider';
import '../src/tokens/css-variables.css';

const khipuTheme = create({
  base: 'light',
  brandTitle: 'Khipu Design System',
  brandUrl: 'https://design.khipu.com',
  brandImage: '/khipu-200x75-color.svg',
  brandTarget: '_self',

  colorPrimary: '#8347AD',
  colorSecondary: '#8347AD',

  appBg: '#FFFFFF',
  appContentBg: '#FFFFFF',
  appBorderColor: '#E0E0E0',
  appBorderRadius: 8,

  textColor: '#333333',
  textInverseColor: '#FFFFFF',

  barTextColor: '#666666',
  barSelectedColor: '#8347AD',
  barBg: '#FFFFFF',

  fontBase: '"Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontCode: 'monospace',
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#FFFFFF' },
        { name: 'gray', value: '#FAFAFA' },
        { name: 'dark', value: '#1a1a1a' },
      ],
    },
    options: {
      storySort: {
        order: ['Brand', 'Core', 'Domain', 'Examples'],
      },
    },
    docs: {
      theme: khipuTheme,
    },
  },
  decorators: [
    (Story) => (
      <KhipuThemeProvider>
        <Story />
      </KhipuThemeProvider>
    ),
  ],
};

export default preview;
