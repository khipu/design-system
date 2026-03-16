import { addons } from 'storybook/manager-api';
import { create } from 'storybook/theming';

const khipuTheme = create({
  base: 'light',
  brandTitle: 'Khipu Design System',
  brandUrl: 'https://design.khipu.com',
  brandImage: '/khipu-ds-logo.svg',
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

addons.setConfig({
  theme: khipuTheme,
});
