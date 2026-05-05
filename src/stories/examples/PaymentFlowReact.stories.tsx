import React, { useReducer, useEffect, useCallback, useRef, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

// Core components
import {
  KdsButton,
  KdsTextField,
  KdsCard,
  KdsAlert,
  KdsLinearProgress,
  KdsStatusBlock,
  KdsSegmentedTabs,
  KdsTab,
  KdsTabPanel,
  KdsDivider,
  KdsSectionNote,
  KdsCopyableTable,
} from '../../components/core';

// Domain components
import {
  KdsBankRow,
  KdsBankList,
  KdsBankModal,
  KdsQrRow,
  KdsBottomSheet,
  KdsInvoiceSticky,
  KdsSecureFooter,
  KdsRecapList,
} from '../../components/domain';

// Assets
import khipuLogo from '../../assets/images/khipu-logo.svg';

// Mock data
import {
  TOTAL_SCREENS,
  SCREEN_LABELS,
  banksPersonas,
  banksEmpresas,
  allBanks,
  defaultInvoice,
  merchantInvoice,
  recipientRows,
  type InvoiceData,
} from './paymentFlowData';

// =============================================================================
// CONSTANTS
// =============================================================================

/** Khipu brand logo — imported asset from src/assets/images/ */
const KhipuBrandImg = () => (
  <img src={khipuLogo} alt="khipu" />
);

/** Scroll-linked collapse constants — matches khipu-init.js */
const COLLAPSE_START = 0;
const COLLAPSE_END = 150;
const MOBILE_BREAKPOINT = 768;

// =============================================================================
// STATE MANAGEMENT
// =============================================================================

interface FlowState {
  currentScreen: number;
  bankTabIndex: number;
  bankModalOpen: boolean;
  transferSheetOpen: boolean;
  successSheetOpen: boolean;
  formData: { rut: string; email: string };
  bankSearchQuery: string;
}

type FlowAction =
  | { type: 'GO_TO_SCREEN'; screen: number }
  | { type: 'SET_BANK_TAB'; index: number }
  | { type: 'OPEN_BANK_MODAL' }
  | { type: 'CLOSE_BANK_MODAL' }
  | { type: 'SET_BANK_SEARCH'; query: string }
  | { type: 'CLOSE_TRANSFER_SHEET' }
  | { type: 'CONFIRM_TRANSFER' }
  | { type: 'UPDATE_FORM'; field: 'rut' | 'email'; value: string }
  | { type: 'SAVE_PAYER_AND_CONTINUE' };

const initialState: FlowState = {
  currentScreen: 1,
  bankTabIndex: 0,
  bankModalOpen: false,
  transferSheetOpen: false,
  successSheetOpen: false,
  formData: { rut: '', email: '' },
  bankSearchQuery: '',
};

function reducer(state: FlowState, action: FlowAction): FlowState {
  switch (action.type) {
    case 'GO_TO_SCREEN': {
      const screen = Math.max(1, Math.min(TOTAL_SCREENS, action.screen));
      return {
        ...state,
        currentScreen: screen,
        transferSheetOpen: screen === 5,
        successSheetOpen: screen === 9,
      };
    }
    case 'SET_BANK_TAB':
      return { ...state, bankTabIndex: action.index };
    case 'OPEN_BANK_MODAL':
      return { ...state, bankModalOpen: true, bankSearchQuery: '' };
    case 'CLOSE_BANK_MODAL':
      return { ...state, bankModalOpen: false };
    case 'SET_BANK_SEARCH':
      return { ...state, bankSearchQuery: action.query };
    case 'CLOSE_TRANSFER_SHEET':
      return { ...state, transferSheetOpen: false };
    case 'CONFIRM_TRANSFER':
      return { ...state, transferSheetOpen: false, currentScreen: 6 };
    case 'UPDATE_FORM':
      return { ...state, formData: { ...state.formData, [action.field]: action.value } };
    case 'SAVE_PAYER_AND_CONTINUE':
      return { ...state, currentScreen: 4 };
    default:
      return state;
  }
}

// =============================================================================
// STORYBOOK META
// =============================================================================

const meta: Meta = {
  title: 'Examples/Payment flow React',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Interactive 9-screen payment flow built entirely with React components from the design system. ' +
          'Navigate with arrow buttons or keyboard (ArrowLeft / ArrowRight). ' +
          'Equivalent to the vanilla JS demo in src/beercss/demo/payment-flow.html.',
      },
    },
  },
};

export default meta;

// =============================================================================
// HELPER: INVOICE CONTENT
// =============================================================================

interface InvoiceContentProps {
  invoice: InvoiceData;
  amountSuccess?: boolean;
  showDetails?: boolean;
}

/**
 * Invoice card internals — matches the HTML structure in payment-flow.html exactly.
 *
 * Structure:
 *   .kds-brand-inner          (mobile-only logo, injected by JS in vanilla demo)
 *   .kds-invoice-header       (flex: amount left, merchant icon right)
 *   .kds-invoice-collapsible
 *     .kds-invoice-summary    (flex: kv left, toggle right)
 *     .kds-expand-panel       (detail rows — sibling of summary, NOT nested)
 */
const InvoiceContent: React.FC<InvoiceContentProps> = ({
  invoice,
  amountSuccess,
  showDetails,
}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <>
      {/* Brand inner — visible on mobile only (CSS hides on desktop) */}
      <div className="kds-brand-inner">
        <KhipuBrandImg />
      </div>
      <header className="kds-invoice-header">
        <div>
          <p className={`kds-invoice-amount${amountSuccess ? ' success' : ''}`}>
            {invoice.amount}
          </p>
          <p className="kds-invoice-code">Código {invoice.code}</p>
        </div>
        <div className="kds-invoice-merchant" aria-hidden="true">
          <i className="material-symbols-outlined">storefront</i>
        </div>
      </header>
      <div className="kds-invoice-collapsible">
        <div className="kds-invoice-summary">
          <dl className="kds-kv">
            <dt>Pago a</dt>
            <dd>{invoice.merchant}</dd>
            <dt>Asunto</dt>
            <dd>{invoice.subject}</dd>
          </dl>
          {showDetails && invoice.details && (
            <button
              className="kds-expand-toggle"
              onClick={() => setDetailsOpen((v) => !v)}
              aria-expanded={detailsOpen}
            >
              <span>Detalles</span>
              <i className="material-symbols-outlined">expand_more</i>
            </button>
          )}
        </div>
        {showDetails && invoice.details && (
          <div
            className={`kds-expand-panel${detailsOpen ? ' open' : ''}`}
            hidden={!detailsOpen}
          >
            <dl className="kds-detail-list">
              {invoice.details.map((d) => (
                <div className="kds-detail-group" key={d.label}>
                  <dt>{d.label}</dt>
                  <dd>{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </>
  );
};

// =============================================================================
// MAIN STORY
// =============================================================================

export const Default: StoryObj = {
  name: 'Payment flow React',
  render: function PaymentFlowStory() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { currentScreen } = state;
    const screenRef = useRef<HTMLElement>(null);
    const portalRef = useRef<HTMLDivElement>(null);

    const goTo = useCallback(
      (screen: number) => dispatch({ type: 'GO_TO_SCREEN', screen }),
      [],
    );

    // Keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.target as HTMLElement).matches('input,select,textarea')) return;
        if (e.key === 'ArrowRight') goTo(currentScreen + 1);
        if (e.key === 'ArrowLeft') goTo(currentScreen - 1);
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }, [currentScreen, goTo]);

    // Scroll to top on screen change
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }, [currentScreen]);

    // Scroll-linked collapse animation (mobile only) — mirrors initStickyInvoice from khipu-init.js
    useEffect(() => {
      let ticking = false;
      let collapsibleH: string | null = null;

      function onScroll() {
        if (window.innerWidth >= MOBILE_BREAKPOINT) {
          // Desktop: clean up
          const el = screenRef.current;
          if (el) {
            el.style.removeProperty('--collapse-progress');
            el.style.removeProperty('--collapse-collapsible-h');
          }
          return;
        }

        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
          ticking = false;
          const el = screenRef.current;
          if (!el) return;

          const scrollY = window.scrollY || window.pageYOffset;
          const progress = Math.min(
            Math.max((scrollY - COLLAPSE_START) / (COLLAPSE_END - COLLAPSE_START), 0),
            1,
          );

          // Cache collapsible height once per screen
          if (!collapsibleH) {
            const collapsible = el.querySelector('.kds-invoice-collapsible');
            if (collapsible) {
              collapsibleH = (collapsible as HTMLElement).offsetHeight + 'px';
              el.style.setProperty('--collapse-collapsible-h', collapsibleH);
            }
          }

          el.style.setProperty('--collapse-progress', String(progress));
        });
      }

      function onResize() {
        if (window.innerWidth >= MOBILE_BREAKPOINT) {
          const el = screenRef.current;
          if (el) {
            el.style.removeProperty('--collapse-progress');
            el.style.removeProperty('--collapse-collapsible-h');
          }
        }
        // Reset cached height on resize
        collapsibleH = null;
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onResize);
      onScroll();

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    }, [currentScreen]);

    // Filtered banks for modal search
    const filteredBanks = allBanks.filter((b) =>
      b.name.toLowerCase().includes(state.bankSearchQuery.toLowerCase()),
    );

    return (
      <div className="kds-payment-stage" ref={portalRef}>
        <div className="kds-payment-flow">
          {/* ============================================================= */}
          {/* SCREEN 1 — Datos para pago                                    */}
          {/* ============================================================= */}
          {currentScreen === 1 && (
            <section className="kds-screen active" ref={screenRef}>
              <div className="kds-brand-row">
                <KhipuBrandImg />
              </div>

              <div className="kds-invoice-sticky-wrap">
                <KdsInvoiceSticky>
                  <InvoiceContent invoice={defaultInvoice} showDetails />
                </KdsInvoiceSticky>
              </div>

              <KdsCard>
                <h2 className="kds-card-title">Datos para pago</h2>
                <KdsTextField label="Monto unitario" value="$1.650" readOnly />
                <KdsTextField
                  label="Cantidad"
                  defaultValue="2"
                  inputMode="numeric"
                />
                <div className="kds-btn-stack">
                  <KdsButton fullWidth onClick={() => goTo(2)}>
                    Continuar
                  </KdsButton>
                </div>
                <KdsSecureFooter variant="inside">
                  Pago seguro procesado por Khipu
                </KdsSecureFooter>
              </KdsCard>
            </section>
          )}

          {/* ============================================================= */}
          {/* SCREEN 2 — Selección de banco                                 */}
          {/* ============================================================= */}
          {currentScreen === 2 && (
            <section className="kds-screen active" ref={screenRef}>
              <div className="kds-brand-row">
                <KhipuBrandImg />
              </div>

              <div className="kds-invoice-sticky-wrap">
                <KdsInvoiceSticky>
                  <InvoiceContent invoice={defaultInvoice} showDetails />
                </KdsInvoiceSticky>
              </div>

              <KdsCard>
                <h2 className="kds-card-title">
                  ¿Cómo quieres pagar?
                </h2>

                <KdsSegmentedTabs
                  activeIndex={state.bankTabIndex}
                  onChange={(i) =>
                    dispatch({ type: 'SET_BANK_TAB', index: i })
                  }
                >
                  <KdsTab>Personas</KdsTab>
                  <KdsTab>Empresas</KdsTab>
                </KdsSegmentedTabs>

                {/* Personas tab */}
                <KdsTabPanel active={state.bankTabIndex === 0}>
                  <KdsBankList>
                    <KdsQrRow
                      name="Pagar escaneando QR"
                      description="Escanea con la app de tu banco"
                      badge="Rápido"
                      onClick={() => goTo(4)}
                    />
                    {banksPersonas.map((bank) => (
                      <KdsBankRow
                        key={bank.id}
                        name={bank.name}
                        logoUrl={bank.logoUrl}
                        onClick={() => goTo(4)}
                      />
                    ))}
                    {/* All banks row — opens modal */}
                    <button
                      type="button"
                      className="kds-bank-row"
                      onClick={() =>
                        dispatch({ type: 'OPEN_BANK_MODAL' })
                      }
                    >
                      <span className="kds-bank-row-logo neutral">
                        <i className="material-symbols-outlined">
                          credit_card
                        </i>
                      </span>
                      <span className="kds-bank-row-name">
                        Todos los bancos y billeteras
                      </span>
                      <span className="kds-badge primary">+17</span>
                      <i className="material-symbols-outlined">
                        chevron_right
                      </i>
                    </button>
                    {/* Manual transfer row */}
                    <button
                      type="button"
                      className="kds-bank-row"
                      onClick={() => goTo(3)}
                    >
                      <span className="kds-bank-row-logo neutral">
                        <i className="material-symbols-outlined">
                          account_balance
                        </i>
                      </span>
                      <span className="kds-bank-row-name">
                        Transferencia manual
                      </span>
                      <i className="material-symbols-outlined">
                        chevron_right
                      </i>
                    </button>
                  </KdsBankList>
                </KdsTabPanel>

                {/* Empresas tab */}
                <KdsTabPanel active={state.bankTabIndex === 1}>
                  <KdsBankList>
                    {banksEmpresas.map((bank) => (
                      <KdsBankRow
                        key={bank.id}
                        name={bank.name}
                        logoUrl={bank.logoUrl}
                        onClick={() => goTo(4)}
                      />
                    ))}
                  </KdsBankList>
                </KdsTabPanel>
                <KdsSecureFooter variant="inside">
                  Pago seguro procesado por Khipu
                </KdsSecureFooter>
              </KdsCard>
            </section>
          )}

          {/* ============================================================= */}
          {/* SCREEN 3 — Transferencia manual (form)                        */}
          {/* ============================================================= */}
          {currentScreen === 3 && (
            <section className="kds-screen active" ref={screenRef}>
              <div className="kds-brand-row">
                <KhipuBrandImg />
              </div>

              <div className="kds-invoice-sticky-wrap">
                <KdsInvoiceSticky>
                  <InvoiceContent invoice={defaultInvoice} />
                </KdsInvoiceSticky>
              </div>

              <KdsCard>
                <h2 className="kds-card-title">
                  Datos para transferencia manual
                </h2>
                <KdsDivider dashed />

                <div className="kds-recap-header">
                  Datos del pagador
                  <i className="material-symbols-outlined">arrow_upward</i>
                </div>

                <KdsTextField
                  label="RUT / DNI del titular"
                  inputMode="numeric"
                  autoComplete="off"
                  value={state.formData.rut}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_FORM',
                      field: 'rut',
                      value: e.target.value,
                    })
                  }
                />

                <KdsTextField
                  label="Email"
                  type="email"
                  autoComplete="email"
                  value={state.formData.email}
                  onChange={(e) =>
                    dispatch({
                      type: 'UPDATE_FORM',
                      field: 'email',
                      value: e.target.value,
                    })
                  }
                />

                <div className="kds-btn-stack">
                  <KdsButton
                    fullWidth
                    onClick={() =>
                      dispatch({ type: 'SAVE_PAYER_AND_CONTINUE' })
                    }
                  >
                    Guardar y continuar
                  </KdsButton>
                  <KdsButton
                    variant="outlined"
                    fullWidth
                    onClick={() => goTo(2)}
                  >
                    Cancelar
                  </KdsButton>
                </div>
                <KdsSecureFooter variant="inside">
                  Pago seguro procesado por Khipu
                </KdsSecureFooter>
              </KdsCard>
            </section>
          )}

          {/* ============================================================= */}
          {/* SCREEN 4 — Datos del destinatario                             */}
          {/* ============================================================= */}
          {currentScreen === 4 && (
            <section className="kds-screen active" ref={screenRef}>
              <div className="kds-brand-row">
                <KhipuBrandImg />
              </div>

              <div className="kds-invoice-sticky-wrap">
                <KdsInvoiceSticky>
                  <InvoiceContent invoice={defaultInvoice} />
                </KdsInvoiceSticky>
              </div>

              <KdsCard>
                <h2 className="kds-card-title">
                  Datos para transferencia manual
                </h2>
                <KdsDivider dashed />

                <KdsSectionNote>
                  Los depósitos por caja no serán procesados.
                </KdsSectionNote>

                <KdsCopyableTable rows={recipientRows} />

                <KdsDivider dashed />

                <div className="kds-recap-header">
                  Datos del pagador
                  <i className="material-symbols-outlined">arrow_upward</i>
                </div>

                <KdsRecapList
                  items={[
                    {
                      label: 'RUT / DNI Titular',
                      value: state.formData.rut || undefined,
                      placeholder: '\u2014',
                    },
                  ]}
                />

                <div className="kds-monto-row">
                  <div>
                    <div className="kds-monto-row-title">
                      Monto a transferir
                    </div>
                    <div className="kds-monto-row-deadline">
                      Fecha límite para transferencia
                      <br />
                      01-04-2026 a las 16:33
                    </div>
                  </div>
                  <div className="kds-monto-row-value">
                    {defaultInvoice.amount}
                  </div>
                </div>

                <div className="kds-btn-stack">
                  <KdsButton variant="text" fullWidth onClick={() => goTo(5)}>
                    ¿Ya transferiste?
                  </KdsButton>
                </div>
                <KdsSecureFooter variant="inside">
                  Pago seguro procesado por Khipu
                </KdsSecureFooter>
              </KdsCard>
            </section>
          )}

          {/* ============================================================= */}
          {/* SCREEN 5 — Confirmar transferencia (dimmed + sheet overlay)    */}
          {/* ============================================================= */}
          {currentScreen === 5 && (
            <section className="kds-screen active" ref={screenRef}>
              <div className="kds-brand-row">
                <KhipuBrandImg />
              </div>

              <div className="kds-invoice-sticky-wrap">
                <KdsInvoiceSticky className="kds-card-dimmed">
                  <InvoiceContent invoice={defaultInvoice} />
                </KdsInvoiceSticky>
              </div>

              <KdsCard dimmed>
                <h2 className="kds-card-title">
                  Datos de transferencia manual
                </h2>
                <p className="kds-text-secondary">
                  Confirma si ya realizaste la transferencia desde tu banco.
                </p>
                <KdsSecureFooter variant="inside">
                  Pago seguro procesado por Khipu
                </KdsSecureFooter>
              </KdsCard>
            </section>
          )}

          {/* ============================================================= */}
          {/* SCREEN 6 — Pago en verificación                               */}
          {/* ============================================================= */}
          {currentScreen === 6 && (
            <section className="kds-screen active" ref={screenRef}>
              <div className="kds-brand-row">
                <KhipuBrandImg />
              </div>

              <div className="kds-invoice-sticky-wrap">
                <KdsInvoiceSticky>
                  <InvoiceContent invoice={defaultInvoice} showDetails />
                </KdsInvoiceSticky>
              </div>

              <KdsCard>
                <KdsStatusBlock
                  status="pending"
                  title="Pago en verificación"
                  inline
                />
                <KdsDivider dashed />
                <KdsAlert severity="warning" inline>
                  La transferencia ya fue realizada. Ahora estamos verificando
                  la recepción del pago. Esto demora apenas unos segundos.
                </KdsAlert>
                <KdsLinearProgress />
                <div className="kds-btn-stack">
                  <KdsButton fullWidth onClick={() => goTo(7)}>
                    Finalizar
                  </KdsButton>
                </div>
                <KdsSecureFooter variant="inside">
                  Pago seguro procesado por Khipu
                </KdsSecureFooter>
              </KdsCard>
            </section>
          )}

          {/* ============================================================= */}
          {/* SCREEN 7 — Pago verificado                                    */}
          {/* ============================================================= */}
          {currentScreen === 7 && (
            <section className="kds-screen active" ref={screenRef}>
              <div className="kds-brand-row">
                <KhipuBrandImg />
              </div>

              <div className="kds-invoice-sticky-wrap">
                <KdsInvoiceSticky>
                  <InvoiceContent invoice={defaultInvoice} amountSuccess />
                </KdsInvoiceSticky>
              </div>

              <KdsCard>
                <KdsStatusBlock
                  status="success"
                  icon="check"
                  title="Pago verificado"
                  inline
                />
                <KdsDivider dashed />
                <KdsAlert severity="success" inline>
                  El pago a <b>&ldquo;tu banco&rdquo;</b> por{' '}
                  <b>{defaultInvoice.amount}</b> está verificado.
                </KdsAlert>
                <div className="kds-btn-stack">
                  <KdsButton fullWidth onClick={() => goTo(1)}>
                    Finalizar
                  </KdsButton>
                </div>
                <KdsSecureFooter variant="inside">
                  Pago seguro procesado por Khipu
                </KdsSecureFooter>
              </KdsCard>
            </section>
          )}

          {/* ============================================================= */}
          {/* SCREEN 8 — Pago verificado (merchant detail)                  */}
          {/* ============================================================= */}
          {currentScreen === 8 && (
            <section className="kds-screen active" ref={screenRef}>
              <div className="kds-brand-row">
                <KhipuBrandImg />
              </div>

              <div className="kds-invoice-sticky-wrap">
                <KdsInvoiceSticky>
                  <InvoiceContent invoice={merchantInvoice} amountSuccess />
                </KdsInvoiceSticky>
              </div>

              <KdsCard>
                <KdsStatusBlock
                  status="success"
                  icon="check"
                  title="Pago verificado"
                />
                <KdsDivider dashed />
                <div className="kds-btn-stack">
                  <KdsButton
                    variant="outlined"
                    fullWidth
                    startIcon="download"
                  >
                    Descargar comprobante de pago
                  </KdsButton>
                  <KdsButton fullWidth onClick={() => goTo(1)}>
                    Volver al dashboard de pagos
                  </KdsButton>
                </div>
                <KdsSecureFooter variant="inside">
                  Pago seguro procesado por Khipu
                </KdsSecureFooter>
              </KdsCard>
            </section>
          )}

          {/* ============================================================= */}
          {/* SCREEN 9 — Pago verificado (drawer)                           */}
          {/* ============================================================= */}
          {currentScreen === 9 && (
            <section className="kds-screen active" ref={screenRef}>
              <div className="kds-brand-row">
                <KhipuBrandImg />
              </div>

              <div className="kds-invoice-sticky-wrap">
                <KdsInvoiceSticky className="kds-card-dimmed">
                  <InvoiceContent invoice={merchantInvoice} amountSuccess />
                </KdsInvoiceSticky>
              </div>

              <KdsCard dimmed>
                <h2 className="kds-card-title">Pago verificado</h2>
                <p className="kds-text-secondary">
                  Tu pago ha sido procesado exitosamente.
                </p>
                <KdsSecureFooter variant="inside">
                  Pago seguro procesado por Khipu
                </KdsSecureFooter>
              </KdsCard>
            </section>
          )}
        </div>

        {/* =============================================================== */}
        {/* BOTTOM SHEET: ¿Ya transferiste?                                 */}
        {/* =============================================================== */}
        <KdsBottomSheet
          open={state.transferSheetOpen}
          onClose={() => dispatch({ type: 'CLOSE_TRANSFER_SHEET' })}
          title="¿Ya transferiste?"
          container={portalRef.current}
          actions={
            <>
              <KdsButton
                variant="success"
                fullWidth
                onClick={() => dispatch({ type: 'CONFIRM_TRANSFER' })}
              >
                Finalizar
              </KdsButton>
              <KdsButton
                variant="text"
                fullWidth
                onClick={() => dispatch({ type: 'CLOSE_TRANSFER_SHEET' })}
              >
                Volver
              </KdsButton>
            </>
          }
        >
          <div className="kds-bottom-sheet-illustration">
            <svg width="64" height="78" viewBox="0 0 64 78" fill="none">
              <path
                d="M40 2H6a4 4 0 0 0-4 4v66a4 4 0 0 0 4 4h52a4 4 0 0 0 4-4V24L40 2Z"
                stroke="var(--kds-color-text-primary)"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <path
                d="M40 2v18a4 4 0 0 0 4 4h18"
                stroke="var(--kds-color-text-primary)"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              <circle
                cx="32"
                cy="50"
                r="11"
                stroke="var(--kds-color-text-primary)"
                strokeWidth="3"
              />
              <path
                d="m27 50 4 4 6-8"
                stroke="var(--kds-color-text-primary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="kds-bottom-sheet-description">
            Si ya transferiste, recibirás un comprobante de pago en tu
            email.
          </p>
          <p className="kds-bottom-sheet-description-subtle">
            Esto tarda menos de un minuto.
          </p>
          <p className="kds-bottom-sheet-description-subtle">
            Si no lo has recibido, revisa los movimientos de egreso de tu cuenta
            bancaria.
          </p>
        </KdsBottomSheet>

        {/* =============================================================== */}
        {/* BOTTOM SHEET: Pago verificado (success drawer)                  */}
        {/* =============================================================== */}
        <KdsBottomSheet
          open={state.successSheetOpen}
          onClose={() => goTo(8)}
          title="Pago verificado"
          container={portalRef.current}
          actions={
            <>
              <KdsButton variant="outlined" fullWidth startIcon="download">
                Descargar comprobante de pago
              </KdsButton>
              <KdsButton fullWidth onClick={() => goTo(1)}>
                Volver al dashboard de pagos
              </KdsButton>
            </>
          }
        >
          <div className="kds-bottom-sheet-illustration">
            <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
              <circle
                cx="36"
                cy="36"
                r="34"
                stroke="var(--kds-color-success-main)"
                strokeWidth="3"
                fill="var(--kds-color-success-soft)"
              />
              <path
                d="m24 36 8 8 16-16"
                stroke="var(--kds-color-success-main)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <p className="kds-bottom-sheet-description">
            El pago a <b>TELEFONICA CHILE SA</b> por <b>$119.258</b> ha sido
            verificado exitosamente.
          </p>
          <p className="kds-bottom-sheet-description-subtle">
            Código es8j-h9uv-hcf0
          </p>
        </KdsBottomSheet>

        {/* =============================================================== */}
        {/* BANK MODAL                                                      */}
        {/* =============================================================== */}
        <KdsBankModal
          open={state.bankModalOpen}
          onClose={() => dispatch({ type: 'CLOSE_BANK_MODAL' })}
          onSearch={(q) => dispatch({ type: 'SET_BANK_SEARCH', query: q })}
          container={portalRef.current}
        >
          <KdsBankList>
            {filteredBanks.map((bank) => (
              <KdsBankRow
                key={bank.id}
                name={bank.name}
                logoUrl={bank.logoUrl}
                onClick={() => {
                  dispatch({ type: 'CLOSE_BANK_MODAL' });
                  goTo(4);
                }}
              />
            ))}
            {filteredBanks.length === 0 && (
              <p className="kds-bank-modal-empty visible">
                No se encontraron resultados
              </p>
            )}
          </KdsBankList>
        </KdsBankModal>

        {/* =============================================================== */}
        {/* NAVIGATION BAR                                                  */}
        {/* =============================================================== */}
        <nav className="kds-proto-nav">
          <button
            className="kds-proto-nav-arrow"
            aria-label="Anterior"
            onClick={() => goTo(currentScreen - 1)}
          >
            <i className="material-symbols-outlined">chevron_left</i>
          </button>
          <span className="kds-proto-nav-label">
            {SCREEN_LABELS[currentScreen - 1]}
          </span>
          <button
            className="kds-proto-nav-arrow"
            aria-label="Siguiente"
            onClick={() => goTo(currentScreen + 1)}
          >
            <i className="material-symbols-outlined">chevron_right</i>
          </button>
        </nav>
      </div>
    );
  },
};
