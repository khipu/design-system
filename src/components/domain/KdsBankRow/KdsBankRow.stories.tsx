import type { Meta, StoryObj } from '@storybook/react';
import { KdsBankRow } from './KdsBankRow';

const meta: Meta<typeof KdsBankRow> = {
  title: 'Domain/KdsBankRow',
  component: KdsBankRow,
  tags: ['autodocs'],
  argTypes: {
    selected: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof KdsBankRow>;

export const Default: Story = {
  args: { name: 'Banco Estado' },
};

export const WithLogo: Story = {
  args: {
    name: 'Banco Falabella',
    logoUrl: 'https://placehold.co/40x40/8347AD/white?text=BF',
  },
};

export const Selected: Story = {
  args: { name: 'Banco Santander', selected: true },
};

export const AllVariants: Story = {
  render: function AllBankRows() {
    return (
      <div style={{ maxWidth: 400 }}>
        <KdsBankRow name="Banco Estado" />
        <KdsBankRow
          name="Banco Falabella"
          logoUrl="https://placehold.co/40x40/8347AD/white?text=BF"
        />
        <KdsBankRow name="Banco Santander" selected />
        <KdsBankRow
          name="Banco BCI"
          logoUrl="https://placehold.co/40x40/1A3B6E/white?text=BCI"
        />
        <KdsBankRow name="Banco de Chile" />
      </div>
    );
  },
};
