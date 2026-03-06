import type { Preview } from '@storybook/react';
import React from 'react';
import { KhipuThemeProvider } from '../src/theme/ThemeProvider';
import '../src/tokens/css-variables.css';

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
