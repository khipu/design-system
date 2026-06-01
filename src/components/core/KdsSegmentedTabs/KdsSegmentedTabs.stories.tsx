import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsSegmentedTabs } from './KdsSegmentedTabs';
import { KdsTab, KdsTabPanel } from '../KdsTabs';

const meta: Meta<typeof KdsSegmentedTabs> = {
  title: 'Components/Navigation/KdsSegmentedTabs',
  component: KdsSegmentedTabs,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof KdsSegmentedTabs>;

/**
 * Tabs segmentados con dos opciones.
 */
export const Default: Story = {
  render: function DefaultSegmentedTabs() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 350 }}>
        <KdsSegmentedTabs activeIndex={activeIndex} onChange={setActiveIndex}>
          <KdsTab>PERSONAS</KdsTab>
          <KdsTab>EMPRESAS</KdsTab>
        </KdsSegmentedTabs>
        <KdsTabPanel active={activeIndex === 0}>
          <div style={{ padding: '16px' }}>Contenido para personas</div>
        </KdsTabPanel>
        <KdsTabPanel active={activeIndex === 1}>
          <div style={{ padding: '16px' }}>Contenido para empresas</div>
        </KdsTabPanel>
      </div>
    );
  },
};

/**
 * Tabs segmentados con tres opciones de metodo de pago.
 */
export const ThreeTabs: Story = {
  render: function ThreeSegmentedTabs() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 450 }}>
        <KdsSegmentedTabs activeIndex={activeIndex} onChange={setActiveIndex}>
          <KdsTab>TRANSFERENCIA</KdsTab>
          <KdsTab>QR</KdsTab>
          <KdsTab>TARJETA</KdsTab>
        </KdsSegmentedTabs>
        <KdsTabPanel active={activeIndex === 0}>
          <div style={{ padding: '16px' }}>Paga con transferencia bancaria</div>
        </KdsTabPanel>
        <KdsTabPanel active={activeIndex === 1}>
          <div style={{ padding: '16px' }}>Escanea el codigo QR para pagar</div>
        </KdsTabPanel>
        <KdsTabPanel active={activeIndex === 2}>
          <div style={{ padding: '16px' }}>Ingresa los datos de tu tarjeta</div>
        </KdsTabPanel>
      </div>
    );
  },
};

/**
 * Ejemplo completo con paneles de contenido extendido.
 */
export const WithPanels: Story = {
  render: function SegmentedTabsWithPanels() {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div style={{ width: 450 }}>
        <KdsSegmentedTabs activeIndex={activeIndex} onChange={setActiveIndex}>
          <KdsTab>PERSONAS</KdsTab>
          <KdsTab>EMPRESAS</KdsTab>
        </KdsSegmentedTabs>
        <div style={{ marginTop: '16px', padding: '16px', border: '1px solid #e0e0e0', borderRadius: '8px' }}>
          <KdsTabPanel active={activeIndex === 0}>
            <p style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Banca personas</p>
            <p style={{ margin: 0, color: '#666' }}>
              Selecciona tu banco personal para realizar la transferencia.
              El proceso es rapido y seguro.
            </p>
          </KdsTabPanel>
          <KdsTabPanel active={activeIndex === 1}>
            <p style={{ margin: '0 0 8px 0', fontWeight: 600 }}>Banca empresas</p>
            <p style={{ margin: 0, color: '#666' }}>
              Accede a tu banca empresarial para transferencias corporativas.
              Compatible con los principales bancos del pais.
            </p>
          </KdsTabPanel>
        </div>
      </div>
    );
  },
};
