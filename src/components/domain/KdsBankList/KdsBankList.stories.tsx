import type { Meta, StoryObj } from '@storybook/react';
import { KdsBankList } from './KdsBankList';
import { KdsBankRow } from '../KdsBankRow';
import { KdsQrRow } from '../KdsQrRow';

const meta: Meta<typeof KdsBankList> = {
  title: 'Domain/KdsBankList',
  component: KdsBankList,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsBankList>;

export const Default: Story = {
  render: function DefaultBankList() {
    return (
      <KdsBankList>
        <KdsBankRow name="Banco Estado" />
        <KdsBankRow
          name="Banco Falabella"
          logoUrl="https://placehold.co/40x40/8347AD/white?text=BF"
        />
        <KdsBankRow name="Banco BCI" />
      </KdsBankList>
    );
  },
};

export const WithQrRow: Story = {
  render: function BankListWithQr() {
    return (
      <KdsBankList>
        <KdsQrRow
          name="Pagar escaneando QR"
          description="Escanea con la app de tu banco"
          badge="Rapido"
        />
        <KdsBankRow name="Banco Estado" />
        <KdsBankRow
          name="Banco de Chile"
          logoUrl="https://placehold.co/40x40/003DA5/white?text=BC"
        />
      </KdsBankList>
    );
  },
};

export const WithSelectedBank: Story = {
  render: function BankListWithSelected() {
    return (
      <KdsBankList>
        <KdsBankRow name="Banco Estado" />
        <KdsBankRow name="Banco Santander" selected />
        <KdsBankRow
          name="Banco Falabella"
          logoUrl="https://placehold.co/40x40/8347AD/white?text=BF"
        />
      </KdsBankList>
    );
  },
};
