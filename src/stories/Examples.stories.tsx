import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { BankSelectionExample } from '../examples/BankSelectionExample';
import { MandateFormExample } from '../examples/MandateFormExample';
import { SubscriptionDetailsExample } from '../examples/SubscriptionDetailsExample';
import { SecureFormExample } from '../examples/SecureFormExample';

// Import bank images for the image gallery story
import bancoEstadoLogo from '../assets/images/banco-estado.png';
import bancoFalabellaLogo from '../assets/images/banco-falabella.png';
import bancoSantanderLogo from '../assets/images/banco-santander.png';
import bancoChileLogo from '../assets/images/banco-chile.png';
import bancoBciLogo from '../assets/images/banco-bci.png';
import machBankLogo from '../assets/images/mach-bank.png';
import coopeuchLogo from '../assets/images/coopeuch.png';
import shoppingBagIcon from '../assets/images/shopping-bag.png';

/**
 * Example Screens - Full page examples from Figma design
 *
 * These examples demonstrate complete screens built using the Khipu Design System,
 * matching the Figma design: "Pagos Automáticos - MUI v610"
 */

const meta: Meta = {
  title: 'Examples',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj;

// =============================================================================
// BANK SELECTION EXAMPLE
// =============================================================================

/**
 * Bank Selection screen (Figma node-id=17023-7688)
 *
 * Features:
 * - Merchant header with shopping bag icon from Figma
 * - Search field for filtering banks
 * - Bank cards with actual logos extracted from Figma
 * - Selectable cards with visual feedback
 */
export const BankSelection: Story = {
  render: () => <BankSelectionExample />,
  parameters: {
    docs: {
      description: {
        story: 'Bank selection screen with real bank logos extracted from the Figma design. Users can search and select their bank.',
      },
    },
  },
};

// =============================================================================
// MANDATE FORM EXAMPLE
// =============================================================================

/**
 * Mandate Form screen
 *
 * Form for setting up automatic payment mandates.
 */
export const MandateForm: Story = {
  render: () => <MandateFormExample />,
  parameters: {
    docs: {
      description: {
        story: 'Form screen for configuring automatic payment mandates.',
      },
    },
  },
};

// =============================================================================
// SUBSCRIPTION DETAILS EXAMPLE
// =============================================================================

/**
 * Subscription Details screen
 *
 * Shows subscription information and payment details.
 */
export const SubscriptionDetails: Story = {
  render: () => <SubscriptionDetailsExample />,
  parameters: {
    docs: {
      description: {
        story: 'Subscription details screen showing payment information.',
      },
    },
  },
};

// =============================================================================
// SECURE FORM EXAMPLE (EMAIL ENTRY)
// =============================================================================

/**
 * Secure Form screen (Figma node-id=17401-1136)
 *
 * Email entry form for payment confirmation.
 * Features:
 * - Header with Khipu logo and close button
 * - Merchant info with payment amount
 * - Email input with validation
 * - Terms acceptance checkbox
 * - Security message with lock icon
 */
export const SecureForm: Story = {
  render: () => <SecureFormExample />,
  parameters: {
    docs: {
      description: {
        story:
          'Email entry form matching the "Ingresar email" screen from Figma. Users enter their email to receive payment confirmation.',
      },
    },
  },
};

// =============================================================================
// BANK IMAGES GALLERY
// =============================================================================

const bankImages = [
  { name: 'Banco Estado', src: bancoEstadoLogo },
  { name: 'Banco Falabella', src: bancoFalabellaLogo },
  { name: 'Banco Santander', src: bancoSantanderLogo },
  { name: 'Banco de Chile', src: bancoChileLogo },
  { name: 'Banco BCI', src: bancoBciLogo },
  { name: 'Mach Bank', src: machBankLogo },
  { name: 'Coopeuch', src: coopeuchLogo },
  { name: 'Shopping Bag', src: shoppingBagIcon },
];

/**
 * Bank Images Gallery
 *
 * All bank logos and icons extracted from the Figma design.
 * These images are stored locally in `src/assets/images/`.
 */
export const BankImages: Story = {
  render: () => (
    <Box sx={{ maxWidth: 600 }}>
      <h2 style={{ fontFamily: 'Public Sans, sans-serif', marginBottom: 24 }}>
        Bank Images from Figma
      </h2>
      <p style={{ color: '#666', marginBottom: 32 }}>
        These images were extracted from the Figma design and saved locally in{' '}
        <code>src/assets/images/</code>
      </p>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
        }}
      >
        {bankImages.map((bank) => (
          <Box
            key={bank.name}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              p: 2,
              border: '1px solid #eee',
              borderRadius: 2,
            }}
          >
            <Box
              sx={{
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f5f5f5',
                borderRadius: 1,
              }}
            >
              <img
                src={bank.src}
                alt={bank.name}
                style={{
                  maxWidth: 50,
                  maxHeight: 50,
                  objectFit: 'contain',
                }}
              />
            </Box>
            <span
              style={{
                fontSize: 12,
                color: '#666',
                textAlign: 'center',
              }}
            >
              {bank.name}
            </span>
          </Box>
        ))}
      </Box>

      <Box sx={{ mt: 4, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
        <h4 style={{ margin: '0 0 12px 0', fontFamily: 'Public Sans, sans-serif' }}>
          Usage Example
        </h4>
        <pre
          style={{
            margin: 0,
            padding: 12,
            backgroundColor: '#272930',
            color: '#fff',
            borderRadius: 4,
            fontSize: 13,
            overflow: 'auto',
          }}
        >
{`import bancoEstadoLogo from '../assets/images/banco-estado.png';

<img src={bancoEstadoLogo} alt="Banco Estado" />`}
        </pre>
      </Box>
    </Box>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gallery of all bank logos and icons extracted from the Figma design. Import these from `src/assets/images/` to use in your components.',
      },
    },
  },
};
