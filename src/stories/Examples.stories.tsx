import type { Meta, StoryObj } from '@storybook/react';
import { KdsTypography } from '../components/core/KdsTypography';
import { colors, fontSizes, borders } from '../tokens';

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
 * matching the Figma design: "Pagos Automaticos - MUI v610"
 *
 * Note: Full-page example components (BankSelection, MandateForm, SubscriptionDetails,
 * SecureForm) were removed during the MUI-to-BeerCSS migration. See the BeerCSS demo
 * pages in src/beercss/demo/ for interactive examples.
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
    <div style={{ maxWidth: '600px' }}>
      <KdsTypography variant="heading2" style={{ marginBottom: '24px' }}>
        Bank Images from Figma
      </KdsTypography>
      <KdsTypography variant="body" color="muted" style={{ marginBottom: '32px' }}>
        These images were extracted from the Figma design and saved locally in{' '}
        <code>src/assets/images/</code>
      </KdsTypography>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '24px',
        }}
      >
        {bankImages.map((bank) => (
          <div
            key={bank.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              padding: '16px',
              border: borders.divider,
              borderRadius: '8px',
            }}
          >
            <div
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.background.elevated,
                borderRadius: '4px',
              }}
            >
              <img
                src={bank.src}
                alt={bank.name}
                style={{
                  maxWidth: '50px',
                  maxHeight: '50px',
                  objectFit: 'contain',
                }}
              />
            </div>
            <span
              style={{
                fontSize: fontSizes.xs,
                color: colors.text.muted,
                textAlign: 'center',
              }}
            >
              {bank.name}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '32px', padding: '16px', backgroundColor: colors.background.elevated, borderRadius: '8px' }}>
        <KdsTypography variant="heading3" style={{ margin: '0 0 12px 0' }}>
          Usage Example
        </KdsTypography>
        <pre
          style={{
            margin: 0,
            padding: '12px',
            backgroundColor: colors.text.strong,
            color: colors.primary.contrastText,
            borderRadius: '4px',
            fontSize: fontSizes.xs,
            overflow: 'auto',
          }}
        >
{`import bancoEstadoLogo from '../assets/images/banco-estado.png';

<img src={bancoEstadoLogo} alt="Banco Estado" />`}
        </pre>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Gallery of all bank logos and icons extracted from the Figma design. Import these from `src/assets/images/` to use in your components.',
      },
    },
  },
};
