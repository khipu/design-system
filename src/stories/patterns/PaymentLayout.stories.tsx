import type { Meta, StoryObj } from '@storybook/react';
import { KdsCard } from '../../components/core';
import { KdsInvoiceSticky, KdsSecureFooter } from '../../components/domain';
import SHELL_GSP from './PaymentLayout.example.gsp?raw';

/**
 * Payment Layout — shell agnóstico de tecnología que comparten TODAS las pantallas de pago:
 * `.kds-payment-stage > .kds-payment-flow > .kds-screen > (invoice sticky? + card + footer?)`.
 *
 * Esta story documenta el CONTRATO de layout (jerarquía, espaciado, color, breakpoints,
 * estados) — no el contenido de cada caja, que tiene su propia story/spec
 * (`KdsInvoiceSticky`, `KdsSecureFooter`, botones, forms, etc.).
 *
 * Spec completa, con tabla de combinaciones y reglas duras:
 * `docs/superpowers/specs/2026-11-19-payment-layout-shell-design.md`.
 *
 * Los controles alternan los dos hijos opcionales de `.kds-screen` (invoice sticky, secure
 * footer) y el modificador `--action` de la card — las mismas 4 combinaciones que el CSS
 * detecta con `:has()` para calibrar el alto mínimo en pantallas bajas (KTUF-476).
 */
const meta: Meta<typeof PaymentLayoutShell> = {
  title: 'Patterns/Payment Layout',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Shell del payment layout: `.kds-payment-stage > .kds-payment-flow > .kds-screen`, con sus hijos opcionales (invoice sticky, secure footer) y la card de cuerpo. Es el contrato que cualquier tecnología (GSP, React, o cualquier otro framework web) debe reproducir — ver la spec completa para jerarquía, espaciado, color, estados y reglas duras.',
      },
    },
  },
  argTypes: {
    showInvoiceSticky: {
      control: 'boolean',
      description: 'Agrega `.kds-invoice-sticky-wrap` como hijo directo de `.kds-screen`, antes de la card de cuerpo.',
    },
    showSecureFooter: {
      control: 'boolean',
      description: 'Agrega `.kds-secure-footer` como hijo directo de `.kds-screen`, después de la card de cuerpo.',
    },
    action: {
      control: 'boolean',
      description: 'Agrega el modificador `.kds-card-elevated--action` a la card de cuerpo (alto mínimo + CTA anclada al fondo).',
    },
  },
  args: {
    showInvoiceSticky: true,
    showSecureFooter: true,
    action: false,
  },
};

export default meta;
type Story = StoryObj<typeof PaymentLayoutShell>;

interface ShellArgs {
  showInvoiceSticky: boolean;
  showSecureFooter: boolean;
  action: boolean;
}

function PaymentLayoutShell({ showInvoiceSticky, showSecureFooter, action }: ShellArgs) {
  return (
    <div className="kds-payment-stage">
      <div className="kds-payment-flow">
        <div className="kds-screen active">

          {showInvoiceSticky && (
            <div className="kds-invoice-sticky-wrap">
              {/* Contenido de KdsInvoiceSticky — fuera de alcance de esta spec; estructura
                  real tomada de PaymentFlowReact.stories.tsx (InvoiceContent) para que el
                  espaciado del ejemplo sea el correcto, no uno inventado. */}
              <KdsInvoiceSticky>
                <header className="kds-invoice-header">
                  <div>
                    <p className="kds-invoice-amount">$3.300</p>
                    <p className="kds-invoice-code">
                      Código <span className="kds-invoice-code-value kds-invoice-code-value--lowercase">ab12cd</span>
                    </p>
                  </div>
                  <div className="kds-invoice-merchant" aria-hidden="true">
                    <i className="material-symbols-outlined">storefront</i>
                  </div>
                </header>
                <div className="kds-invoice-collapsible">
                  <div className="kds-invoice-summary">
                    <dl className="kds-kv">
                      <dt>Pago a</dt>
                      <dd>Belén Fuentes Mejías</dd>
                      <dt>Asunto</dt>
                      <dd>Cuenta Enero 2026</dd>
                    </dl>
                  </div>
                </div>
              </KdsInvoiceSticky>
            </div>
          )}

          <KdsCard className={action ? 'kds-card-elevated--action' : undefined}>
            <h1 className="kds-m-0">Confirmar pago</h1>
            <p>Contenido de la pantalla — fuera de alcance de esta spec.</p>
          </KdsCard>

          {showSecureFooter && <KdsSecureFooter />}

        </div>
      </div>
    </div>
  );
}

export const Shell: Story = {
  render: (args) => <PaymentLayoutShell {...(args as ShellArgs)} />,
};

/**
 * Mismo shell, mismas clases — equivalente en GSP. El panel de código de esta story
 * muestra el markup GSP (`PaymentLayout.example.gsp`) en vez del JSX: es la otra mitad
 * del contrato, pensada para payment/Grails.
 */
export const GspEquivalent: Story = {
  args: { showInvoiceSticky: true, showSecureFooter: true, action: false },
  render: (args) => <PaymentLayoutShell {...(args as ShellArgs)} />,
  parameters: {
    docs: {
      source: {
        language: 'html',
        type: 'code',
        code: SHELL_GSP,
      },
    },
  },
};
