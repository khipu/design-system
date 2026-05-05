/**
 * Mock data for the Payment Flow React story.
 *
 * Matches the data used in src/beercss/demo/payment-flow.html.
 */

import bancoEstadoLogo from '../../assets/images/banco-estado.png';
import bancoFalabellaLogo from '../../assets/images/banco-falabella.png';
import bancoSantanderLogo from '../../assets/images/banco-santander.png';
import bancoChileLogo from '../../assets/images/banco-chile.png';
import bancoBciLogo from '../../assets/images/banco-bci.png';
import machBankLogo from '../../assets/images/mach-bank.png';

// =============================================================================
// TYPES
// =============================================================================

export interface BankData {
  id: string;
  name: string;
  logoUrl?: string;
}

export interface InvoiceData {
  amount: string;
  code: string;
  merchant: string;
  subject: string;
  details?: { label: string; value: string }[];
}

export interface CopyableRow {
  label: string;
  value: string;
}

// =============================================================================
// CONSTANTS
// =============================================================================

export const TOTAL_SCREENS = 9;

export const SCREEN_LABELS: string[] = [
  '01 \u00b7 Datos para pago',
  '02 \u00b7 Selecci\u00f3n de banco',
  '03 \u00b7 Transferencia manual',
  '04 \u00b7 Datos del destinatario',
  '05 \u00b7 Confirmar transferencia',
  '06 \u00b7 Pago en verificaci\u00f3n',
  '07 \u00b7 Pago verificado',
  '08 \u00b7 Pago verificado (detalle)',
  '09 \u00b7 Pago verificado (drawer)',
];

// =============================================================================
// BANK DATA
// =============================================================================

export const banksPersonas: BankData[] = [
  { id: 'banco-estado', name: 'Banco Estado', logoUrl: bancoEstadoLogo },
  { id: 'banco-falabella', name: 'Banco Falabella', logoUrl: bancoFalabellaLogo },
  { id: 'banco-santander', name: 'Banco Santander', logoUrl: bancoSantanderLogo },
  { id: 'banco-chile', name: 'Banco de Chile', logoUrl: bancoChileLogo },
  { id: 'banco-bci', name: 'Banco BCI', logoUrl: bancoBciLogo },
];

export const banksEmpresas: BankData[] = [
  { id: 'banco-chile-emp', name: 'Banco de Chile Empresas', logoUrl: bancoChileLogo },
  { id: 'bci-emp', name: 'BCI Empresas', logoUrl: bancoBciLogo },
  { id: 'santander-emp', name: 'Santander Empresas', logoUrl: bancoSantanderLogo },
  { id: 'banco-estado-emp', name: 'Banco Estado Empresas', logoUrl: bancoEstadoLogo },
];

export const allBanks: BankData[] = [
  { id: 'banco-estado', name: 'Banco Estado', logoUrl: bancoEstadoLogo },
  { id: 'banco-falabella', name: 'Banco Falabella', logoUrl: bancoFalabellaLogo },
  { id: 'banco-santander', name: 'Banco Santander', logoUrl: bancoSantanderLogo },
  { id: 'banco-chile', name: 'Banco de Chile', logoUrl: bancoChileLogo },
  { id: 'banco-bci', name: 'Banco BCI', logoUrl: bancoBciLogo },
  { id: 'banco-security', name: 'Banco Security' },
  { id: 'banco-bice', name: 'Banco BICE' },
  { id: 'scotiabank', name: 'Scotiabank' },
  { id: 'banco-itau', name: 'Banco Ita\u00fa' },
  { id: 'banco-ripley', name: 'Banco Ripley' },
  { id: 'banco-consorcio', name: 'Banco Consorcio' },
  { id: 'banco-internacional', name: 'Banco Internacional' },
  { id: 'tenpo', name: 'Tenpo' },
  { id: 'mercado-pago', name: 'Mercado Pago' },
  { id: 'vita', name: 'Vita' },
  { id: 'mach', name: 'MACH', logoUrl: machBankLogo },
  { id: 'fpay', name: 'Fpay' },
  { id: 'copec-pay', name: 'Copec Pay' },
  { id: 'tapp', name: 'Tapp' },
  { id: 'global66', name: 'Global66' },
  { id: 'dale', name: 'Dale' },
  { id: 'prepago-heroes', name: 'Prepago Los H\u00e9roes' },
];

// =============================================================================
// INVOICE DATA
// =============================================================================

export const defaultInvoice: InvoiceData = {
  amount: '$3.300',
  code: 'fdap-sr2x-q3pf',
  merchant: 'Bel\u00e9n Fuentes Mej\u00edas',
  subject: 'Cuenta Enero 2026',
  details: [
    { label: 'Emisor cobro', value: 'Khipu' },
    {
      label: 'Descripci\u00f3n',
      value:
        'Estado de cuenta correspondiente a enero de 2026, emitido para un cliente particular. Incluye saldo inicial, dep\u00f3sitos, compras con tarjeta, pagos de servicios y comisiones bancarias del per\u00edodo.',
    },
  ],
};

export const merchantInvoice: InvoiceData = {
  amount: '$119.258',
  code: 'es8j-h9uv-hcf0',
  merchant: 'TELEFONICA CHILE SA',
  subject: 'Pagos_MOVISTAR',
};

// =============================================================================
// RECIPIENT TRANSFER DATA
// =============================================================================

export const recipientRows: CopyableRow[] = [
  { label: 'Banco', value: 'Banco Security' },
  { label: 'RUT', value: '76.187.287-7' },
  { label: 'N\u00b0 cuenta', value: '98765432' },
  { label: 'Tipo', value: 'Corriente' },
  { label: 'Titular', value: 'Khipu CLBS' },
  { label: 'Email', value: 'transferencias@khipu.com' },
  { label: 'Monto', value: '$3.300' },
];
