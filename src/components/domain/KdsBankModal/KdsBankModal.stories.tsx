import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { KdsBankModal } from './KdsBankModal';
import { KdsButton } from '../../core/KdsButton';
import { KdsBankList } from '../KdsBankList';
import { KdsBankRow } from '../KdsBankRow';

/**
 * KdsBankModal — modal de selección de banco con buscador y lista scrolleable.
 *
 * Layout & sizing (spec):
 * - Content: `max-width: 448px`, `height: 85vh`, `border-radius: var(--kds-radius-card)`
 * - Scrim padding: `var(--kds-spacing-2)` (16px) — el modal centra el contenido
 * - Header padding: `8px 16px 8px` (top/x/bottom) — título + close button
 * - Search wrapper padding: `10px 12px`
 * - Body padding: `0 8px 8px` — espacio para `KdsBankList` que vive dentro
 *
 * Animación:
 * - `animation: kds-rise 0.28s ease-out` al abrir
 *
 * Comportamiento:
 * - Usa Radix Dialog con `Portal` (opcionalmente custom via prop `container`)
 * - `Dialog.Close` cierra al click en X o ESC
 * - El buscador delega via `onSearch(query)` — el filtrado es responsabilidad del consumidor
 * - El body es scroll-area (`overflow-y: auto` heredado)
 *
 * @gsp _bankModalMaterial.gsp
 * @css .kds-bank-modal, .kds-bank-modal-scrim, .kds-bank-modal-header, .kds-bank-modal-search, .kds-bank-modal-body, .kds-bank-modal-empty
 */
const meta: Meta<typeof KdsBankModal> = {
  title: 'Domain/Banking/KdsBankModal',
  component: KdsBankModal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Modal de selección de banco basado en Radix Dialog. Content `max-width: 448px / height: 85vh`, header padding `8px 16px`, search `10px 12px`, body con scroll vertical. Anima entrada con `kds-rise 0.28s`. El filtrado de búsqueda lo hace el consumidor vía `onSearch`.',
      },
    },
  },
  argTypes: {
    open: { control: 'boolean', description: 'Controla la visibilidad del modal.' },
    title: { control: 'text', description: 'Título mostrado en el header. Default: "Selecciona tu banco".' },
    searchPlaceholder: { control: 'text', description: 'Placeholder del input de búsqueda. Default: "Buscar banco...".' },
  },
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

/** Modal básico con lista de bancos sin filtrado. */
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

/** Con búsqueda — el consumidor filtra. */
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
  parameters: {
    docs: {
      description: {
        story:
          'El callback `onSearch(query: string)` se ejecuta en cada keystroke. El filtrado real lo hace el consumidor. Útil para listas dinámicas o queries a backend.',
      },
    },
  },
};

/** Título custom — cuando el flow no es "seleccionar banco" sino "elegir institución". */
export const CustomTitle: Story = {
  render: function BankModalCustomTitle() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Elegir institución</KdsButton>
        <KdsBankModal
          open={open}
          onClose={() => setOpen(false)}
          title="Selecciona tu institución financiera"
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

/**
 * Estado vacío — cuando el filtro no encuentra coincidencias.
 *
 * @spec La clase `.kds-bank-modal-empty.visible` muestra el mensaje. Padding 32px 16px, color text-hint, centrado.
 */
export const EmptyState: Story = {
  render: function BankModalEmpty() {
    const [open, setOpen] = useState(true);
    return (
      <>
        <KdsButton onClick={() => setOpen(true)}>Abrir modal vacío</KdsButton>
        <KdsBankModal
          open={open}
          onClose={() => setOpen(false)}
          searchPlaceholder="Buscar banco..."
          onSearch={() => undefined}
        >
          <KdsBankList>
            <p className="kds-bank-modal-empty visible">
              No se encontraron resultados
            </p>
          </KdsBankList>
        </KdsBankModal>
      </>
    );
  },
};

/**
 * Markup HTML plano (BeerCSS) — scrim + modal + header + search + body con
 * lista de bancos. Show/hide es JS-driven (Radix Dialog maneja portal/focus-
 * trap/ESC); en contextos sin Radix, togglear `.open` en `.kds-bank-modal-scrim`
 * la muestra/oculta. La búsqueda es markup puro (`<input>`); el filtrado real
 * es responsabilidad del JS del consumidor. El estado vacío usa
 * `.kds-bank-modal-empty.visible` cuando no hay matches.
 *
 * Ver `Patterns/CSS-only → BankModal` para spec completa.
 */
export const HtmlMarkup: Story = {
  name: 'HTML markup',
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: `<div class="kds-bank-modal-scrim open">
  <div class="kds-bank-modal" role="dialog" aria-modal="true">
    <div class="kds-bank-modal-header">
      <h3>Selecciona tu banco</h3>
      <button type="button" class="kds-bank-modal-close" aria-label="Cerrar">
        <i class="material-symbols-outlined">close</i>
      </button>
    </div>
    <div class="kds-bank-modal-search">
      <input type="text" placeholder="Buscar banco..." />
    </div>
    <div class="kds-bank-modal-body">
      <div class="kds-bank-list" role="list">
        <button type="button" class="kds-bank-row">
          <span class="kds-bank-row-logo"><span class="initials">B</span></span>
          <span class="kds-bank-row-name">Banco Estado</span>
          <i class="material-symbols-outlined">chevron_right</i>
        </button>
        <button type="button" class="kds-bank-row">
          <span class="kds-bank-row-logo"><span class="initials">B</span></span>
          <span class="kds-bank-row-name">Banco BCI</span>
          <i class="material-symbols-outlined">chevron_right</i>
        </button>
      </div>
      <!-- Estado vacío (visible cuando no hay matches) -->
      <p class="kds-bank-modal-empty">No se encontraron resultados</p>
    </div>
  </div>
</div>`,
      },
    },
  },
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <div className="kds-bank-modal" role="dialog" aria-modal="true">
        <div className="kds-bank-modal-header">
          <h3>Selecciona tu banco</h3>
          <button type="button" className="kds-bank-modal-close" aria-label="Cerrar">
            <i className="material-symbols-outlined">close</i>
          </button>
        </div>
        <div className="kds-bank-modal-search">
          <input type="text" placeholder="Buscar banco..." />
        </div>
        <div className="kds-bank-modal-body">
          <div className="kds-bank-list" role="list">
            <button type="button" className="kds-bank-row">
              <span className="kds-bank-row-logo">
                <span className="initials">B</span>
              </span>
              <span className="kds-bank-row-name">Banco Estado</span>
              <i className="material-symbols-outlined">chevron_right</i>
            </button>
            <button type="button" className="kds-bank-row">
              <span className="kds-bank-row-logo">
                <span className="initials">B</span>
              </span>
              <span className="kds-bank-row-name">Banco BCI</span>
              <i className="material-symbols-outlined">chevron_right</i>
            </button>
          </div>
        </div>
      </div>
    </div>
  ),
};
