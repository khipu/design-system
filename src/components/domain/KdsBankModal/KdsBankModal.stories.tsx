import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KdsBankModal } from './KdsBankModal';
import { KdsButton } from '../../core/KdsButton';
import { KdsBankList } from '../KdsBankList';
import { KdsBankRow } from '../KdsBankRow';

const meta: Meta<typeof KdsBankModal> = {
  title: 'Domain/KdsBankModal',
  component: KdsBankModal,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KdsBankModal>;

const banks = [
  { name: 'Banco Estado' },
  { name: 'Banco Falabella', logoUrl: 'https://placehold.co/40x40/8347AD/white?text=BF' },
  { name: 'Banco BCI', logoUrl: 'https://placehold.co/40x40/1A3B6E/white?text=BCI' },
  { name: 'Banco Santander', logoUrl: 'https://placehold.co/40x40/EC0000/white?text=BS' },
  { name: 'Banco de Chile', logoUrl: 'https://placehold.co/40x40/003DA5/white?text=BC' },
];

export const Default: Story = {
  render: function DefaultBankModal() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Seleccionar banco</KdsButton>
        <KdsBankModal open={open} onClose={() => setOpen(false)}>
          <KdsBankList>
            {banks.map((bank) => (
              <KdsBankRow
                key={bank.name}
                name={bank.name}
                logoUrl={bank.logoUrl}
                onClick={() => setOpen(false)}
              />
            ))}
          </KdsBankList>
        </KdsBankModal>
      </>
    );
  },
};

export const WithSearch: Story = {
  render: function BankModalWithSearch() {
    const [open, setOpen] = useState(false);
    const [filtered, setFiltered] = useState(banks);

    const handleSearch = (query: string) => {
      const q = query.toLowerCase();
      setFiltered(banks.filter((b) => b.name.toLowerCase().includes(q)));
    };

    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Buscar banco</KdsButton>
        <KdsBankModal
          open={open}
          onClose={() => {
            setOpen(false);
            setFiltered(banks);
          }}
          searchPlaceholder="Buscar banco..."
          onSearch={handleSearch}
        >
          <KdsBankList>
            {filtered.map((bank) => (
              <KdsBankRow
                key={bank.name}
                name={bank.name}
                logoUrl={bank.logoUrl}
                onClick={() => setOpen(false)}
              />
            ))}
          </KdsBankList>
        </KdsBankModal>
      </>
    );
  },
};

export const CustomTitle: Story = {
  render: function BankModalCustomTitle() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Elegir institucion</KdsButton>
        <KdsBankModal
          open={open}
          onClose={() => setOpen(false)}
          title="Selecciona tu institucion financiera"
        >
          <KdsBankList>
            {banks.map((bank) => (
              <KdsBankRow
                key={bank.name}
                name={bank.name}
                logoUrl={bank.logoUrl}
                onClick={() => setOpen(false)}
              />
            ))}
          </KdsBankList>
        </KdsBankModal>
      </>
    );
  },
};
