import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { KdsStepper } from './KdsStepper';
import { KdsButton } from '../KdsButton';

const meta: Meta<typeof KdsStepper> = {
  title: 'Core/KdsStepper',
  component: KdsStepper,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    steps: {
      control: { type: 'number', min: 2, max: 8 },
    },
    current: {
      control: { type: 'number', min: 0, max: 7 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof KdsStepper>;

/**
 * Stepper en el segundo paso de cuatro.
 */
export const Default: Story = {
  args: {
    steps: 4,
    current: 1,
  },
};

/**
 * Stepper en el primer paso.
 */
export const FirstStep: Story = {
  args: {
    steps: 4,
    current: 0,
  },
};

/**
 * Stepper en el ultimo paso.
 */
export const LastStep: Story = {
  args: {
    steps: 4,
    current: 3,
  },
};

/**
 * Stepper interactivo con botones para avanzar y retroceder.
 */
export const Interactive: Story = {
  render: function InteractiveStepper() {
    const totalSteps = 4;
    const [current, setCurrent] = useState(0);
    const stepLabels = ['Seleccionar banco', 'Autorizar pago', 'Confirmar', 'Comprobante'];

    return (
      <div style={{ width: 400 }}>
        <KdsStepper steps={totalSteps} current={current} />
        <p style={{ textAlign: 'center', margin: '16px 0', fontWeight: 600 }}>
          Paso {current + 1} de {totalSteps}: {stepLabels[current]}
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <KdsButton
            variant="outlined"
            onClick={() => setCurrent((prev) => Math.max(0, prev - 1))}
            disabled={current === 0}
          >
            Anterior
          </KdsButton>
          <KdsButton
            onClick={() => setCurrent((prev) => Math.min(totalSteps - 1, prev + 1))}
            disabled={current === totalSteps - 1}
          >
            Siguiente
          </KdsButton>
        </div>
      </div>
    );
  },
};
