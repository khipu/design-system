import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsTabs, KdsTab, KdsTabPanel } from './KdsTabs';

const meta: Meta<typeof KdsTabs> = {
  title: 'Core/KdsTabs',
  component: KdsTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['standard', 'segmented'],
      description: 'The layout variant of the tabs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsTabs>;

/**
 * Default KdsTabs with standard variant layout.
 */
export const Default: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 350 }}>
        <KdsTabs
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          variant="standard"
        >
          <KdsTab>PERSONAS</KdsTab>
          <KdsTab>EMPRESAS</KdsTab>
        </KdsTabs>
      </div>
    );
  },
};

/**
 * KdsTabs with TabPanels showing content switching.
 */
export const WithPanels: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 350 }}>
        <KdsTabs
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          variant="standard"
        >
          <KdsTab>PERSONAS</KdsTab>
          <KdsTab>EMPRESAS</KdsTab>
        </KdsTabs>
        <div style={{ marginTop: '16px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '4px' }}>
          <KdsTabPanel active={activeIndex === 0}>
            <div>Contenido para personas - bancos personales</div>
          </KdsTabPanel>
          <KdsTabPanel active={activeIndex === 1}>
            <div>Contenido para empresas - bancos corporativos</div>
          </KdsTabPanel>
        </div>
      </div>
    );
  },
};

/**
 * Three tabs example.
 */
export const ThreeTabs: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 450 }}>
        <KdsTabs
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          variant="standard"
        >
          <KdsTab>PRIMERO</KdsTab>
          <KdsTab>SEGUNDO</KdsTab>
          <KdsTab>TERCERO</KdsTab>
        </KdsTabs>
      </div>
    );
  },
};

/**
 * Segmented variant tabs.
 */
export const SegmentedVariant: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 350 }}>
        <KdsTabs
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          variant="segmented"
        >
          <KdsTab>PERSONAS</KdsTab>
          <KdsTab>EMPRESAS</KdsTab>
        </KdsTabs>
      </div>
    );
  },
};

/**
 * With disabled tab.
 */
export const WithDisabledTab: Story = {
  render: () => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 350 }}>
        <KdsTabs
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          variant="standard"
        >
          <KdsTab>ACTIVE</KdsTab>
          <KdsTab disabled>DISABLED</KdsTab>
        </KdsTabs>
      </div>
    );
  },
};
