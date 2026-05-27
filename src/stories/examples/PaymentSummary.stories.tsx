import type { Meta, StoryObj } from '@storybook/react';
import {
  KdsCard,
  KdsButton,
  KdsDivider,
  KdsSectionNote,
} from '../../components/core';
import {
  KdsMerchantTile,
  KdsMontoRow,
  KdsRecapList,
  KdsSecureFooter,
} from '../../components/domain';
import khipuLogo from '../../assets/images/khipu-logo.svg';

/**
 * Resumen / confirmación de pago — pantalla mobile-first del flujo Khipu.
 *
 * Compone componentes del DS descubiertos vía Storybook MCP:
 * - `KdsMerchantTile` (comercio) + `KdsRecapList` (datos de la operación)
 * - `KdsMontoRow` (monto destacado con borde dashed)
 * - `KdsSectionNote` (aviso informativo) + `KdsButton` (CTA "Pagar")
 * - `KdsSecureFooter` (footer "Pago seguro con Khipu")
 *
 * El shell `.kds-payment-stage > .kds-payment-flow > .kds-screen` reproduce el
 * marco mobile (~390px) de producción.
 */
const meta: Meta = {
  title: 'Examples/Payment Summary',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Pantalla de resumen/confirmación de pago: comercio + datos de la operación + monto + CTA "Pagar". Mobile-first, compuesta solo con componentes del Khipu DS.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const KhipuBrand = () => (
  <div className="kds-brand-row">
    <img src={khipuLogo} alt="khipu" />
  </div>
);

const Shell = ({ children }: { children: React.ReactNode }) => (
  <div className="kds-payment-stage">
    <div className="kds-payment-flow">
      <section className="kds-screen active">
        <KhipuBrand />
        {children}
        <KdsSecureFooter>Pago seguro procesado por Khipu</KdsSecureFooter>
      </section>
    </div>
  </div>
);

const MerchantHeader = () => (
  <div className="kds-merchant">
    <KdsMerchantTile name="Comercial Santiago SpA" initials="CS" />
    <div className="kds-merchant-meta">
      <span className="kds-merchant-label">Estás pagando a</span>
      <strong>Comercial Santiago SpA</strong>
    </div>
  </div>
);

/**
 * Resumen de pago listo para confirmar.
 *
 * @components KdsMerchantTile + KdsRecapList + KdsMontoRow + KdsSectionNote + KdsButton + KdsSecureFooter
 */
export const ReadyToPay: Story = {
  name: 'Resumen — listo para pagar',
  render: () => (
    <Shell>
      <KdsCard>
        <MerchantHeader />

        <KdsDivider />

        <KdsRecapList
          items={[
            { label: 'Orden', value: '#A-10293' },
            { label: 'Asunto', value: 'Cuenta Enero 2026' },
            { label: 'Medio de pago', value: 'Transferencia bancaria' },
            { label: 'Fecha', value: '27-05-2026' },
          ]}
        />

        <KdsMontoRow
          title="Total a pagar"
          value="$3.300"
          deadline={
            <>
              Vence hoy
              <br />
              27-05-2026 a las 23:59
            </>
          }
        />

        <KdsSectionNote icon="info" className="kds-info">
          Verifica los datos antes de continuar. Serás redirigido a tu banco
          para autorizar la transferencia.
        </KdsSectionNote>

        <div className="kds-btn-stack">
          <KdsButton fullWidth>Pagar $3.300</KdsButton>
          <KdsButton variant="outlined" fullWidth>
            Cancelar
          </KdsButton>
        </div>

        <KdsSecureFooter variant="inside">
          Pago seguro procesado por Khipu
        </KdsSecureFooter>
      </KdsCard>
    </Shell>
  ),
};
