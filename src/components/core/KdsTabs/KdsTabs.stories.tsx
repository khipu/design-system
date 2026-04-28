import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsTabs, KdsTab, KdsTabPanel } from './KdsTabs';
import Box from '@mui/material/Box';
import { borders } from '../../../tokens';

const meta: Meta<typeof KdsTabs> = {
  title: 'Core/KdsTabs',
  component: KdsTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'info'],
      description: 'The color of the active tab indicator',
    },
    variant: {
      control: 'select',
      options: ['standard', 'fullWidth', 'scrollable'],
      description: 'The layout variant of the tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsTabs>;

/**
 * Default KdsTabs with full width layout (matching Figma design).
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('personas');
    return (
      <Box sx={{ width: 350 }}>
        <KdsTabs
          value={value}
          onChange={(_, v) => setValue(v as string)}
          variant="fullWidth"
          color="info"
        >
          <KdsTab label="PERSONAS" value="personas" />
          <KdsTab label="EMPRESAS" value="empresas" />
        </KdsTabs>
      </Box>
    );
  },
};

/**
 * KdsTabs with TabPanels showing content switching.
 */
export const WithPanels: Story = {
  render: () => {
    const [value, setValue] = useState('personas');
    return (
      <Box sx={{ width: 350 }}>
        <KdsTabs
          value={value}
          onChange={(_, v) => setValue(v as string)}
          variant="fullWidth"
          color="info"
        >
          <KdsTab label="PERSONAS" value="personas" />
          <KdsTab label="EMPRESAS" value="empresas" />
        </KdsTabs>
        <Box sx={{ mt: 2, p: 2, border: borders.divider, borderRadius: 1 }}>
          <KdsTabPanel value="personas" selectedValue={value}>
            <Box>Contenido para personas - bancos personales</Box>
          </KdsTabPanel>
          <KdsTabPanel value="empresas" selectedValue={value}>
            <Box>Contenido para empresas - bancos corporativos</Box>
          </KdsTabPanel>
        </Box>
      </Box>
    );
  },
};

/**
 * Primary color tabs.
 */
export const PrimaryColor: Story = {
  render: () => {
    const [value, setValue] = useState('tab1');
    return (
      <Box sx={{ width: 350 }}>
        <KdsTabs
          value={value}
          onChange={(_, v) => setValue(v as string)}
          variant="fullWidth"
          color="primary"
        >
          <KdsTab label="TAB 1" value="tab1" />
          <KdsTab label="TAB 2" value="tab2" />
        </KdsTabs>
      </Box>
    );
  },
};

/**
 * Three tabs example.
 */
export const ThreeTabs: Story = {
  render: () => {
    const [value, setValue] = useState('first');
    return (
      <Box sx={{ width: 450 }}>
        <KdsTabs
          value={value}
          onChange={(_, v) => setValue(v as string)}
          variant="fullWidth"
          color="info"
        >
          <KdsTab label="PRIMERO" value="first" />
          <KdsTab label="SEGUNDO" value="second" />
          <KdsTab label="TERCERO" value="third" />
        </KdsTabs>
      </Box>
    );
  },
};

/**
 * Standard variant (not full width).
 */
export const StandardVariant: Story = {
  render: () => {
    const [value, setValue] = useState('personas');
    return (
      <Box sx={{ width: 350 }}>
        <KdsTabs
          value={value}
          onChange={(_, v) => setValue(v as string)}
          variant="standard"
          color="info"
        >
          <KdsTab label="PERSONAS" value="personas" />
          <KdsTab label="EMPRESAS" value="empresas" />
        </KdsTabs>
      </Box>
    );
  },
};

/**
 * With disabled tab.
 */
export const WithDisabledTab: Story = {
  render: () => {
    const [value, setValue] = useState('active');
    return (
      <Box sx={{ width: 350 }}>
        <KdsTabs
          value={value}
          onChange={(_, v) => setValue(v as string)}
          variant="fullWidth"
          color="info"
        >
          <KdsTab label="ACTIVE" value="active" />
          <KdsTab label="DISABLED" value="disabled" disabled />
        </KdsTabs>
      </Box>
    );
  },
};
