/**
 * Khipu Design System - Bank Selection Example
 *
 * This example demonstrates the "Selección (alt)" screen from Figma design
 * (node-id=16793-1570) - Bank selector with tabs for PERSONAS/EMPRESAS.
 *
 * Figma URL: https://www.figma.com/design/2ULMAL31GpLbpGEc9SgBD9/Pagos-Instantaneos----MUI-v720?node-id=16793-1570
 */

import React, { useState } from 'react';

import {
  // Theme
  KhipuThemeProvider,
  // Components
  KdsTextField,
  KdsCard,
  KdsCardContent,
  KdsTypography,
  KdsTabs,
  KdsTab,
  KdsLogoHeader,
  KdsLogoHeaderLogo,
  KdsLogoHeaderSeparator,
  KdsLogoHeaderCode,
  KdsLogoHeaderCloseButton,
  // MUI Re-exports
  Box,
  InputAdornment,
  // Icons
  SearchIcon,
  ChevronRightIcon,
} from '../index';
import { colors, fontWeights, fontSizes, borderRadius, spacing } from '../tokens';

// Import bank logos
import bancoEstadoLogo from '../assets/images/banco-estado.png';
import bancoFalabellaLogo from '../assets/images/banco-falabella.png';
import bancoSantanderLogo from '../assets/images/banco-santander.png';
import bancoChileLogo from '../assets/images/banco-chile.png';
import bancoBciLogo from '../assets/images/banco-bci.png';
import coopeuchLogo from '../assets/images/coopeuch.png';

// Bank data type
interface Bank {
  id: string;
  name: string;
  logoUrl: string;
  type: 'personas' | 'empresas';
}

// Bank data - 8 banks as per Figma design
const banks: Bank[] = [
  { id: 'estado', name: 'Banco Estado', logoUrl: bancoEstadoLogo, type: 'personas' },
  { id: 'falabella', name: 'Banco Falabella', logoUrl: bancoFalabellaLogo, type: 'personas' },
  { id: 'santander', name: 'Banco Santander', logoUrl: bancoSantanderLogo, type: 'personas' },
  { id: 'chile', name: 'Banco de Chile', logoUrl: bancoChileLogo, type: 'personas' },
  { id: 'bci', name: 'Banco BCI', logoUrl: bancoBciLogo, type: 'empresas' },
  { id: 'scotiabank', name: 'Scotiabank', logoUrl: bancoChileLogo, type: 'empresas' },
  { id: 'itau', name: 'Banco Itaú', logoUrl: bancoSantanderLogo, type: 'empresas' },
  { id: 'coopeuch', name: 'Coopeuch', logoUrl: coopeuchLogo, type: 'personas' },
];

// Merchant Header component (matching Storybook layout)
interface MerchantHeaderProps {
  logoUrl?: string;
  title: string;
  merchant: string;
  amount: string;
  onDetailsClick?: () => void;
}

const MerchantHeader: React.FC<MerchantHeaderProps> = ({
  logoUrl = 'https://i5.walmartimages.com/seo/Restored-Dell-Desktop-Computer-SFF-Intel-Core-i56th-Gen-Processor-8GB-RAM-1TB-HD-WiFi-Adapter-DVD-and-19-LCD-Windows-10-PC-Refurbished_1cebd6ab-d134-48b4-8718-3270ff3a26d5.1bfb90d5de855397285bb4fc77c4e956.jpeg',
  title,
  merchant,
  amount,
  onDetailsClick,
}) => (
  <Box
    sx={{
      display: 'flex',
      gap: 2,
      alignItems: 'center',
      justifyContent: 'space-between',
      p: '16px 20px',
      backgroundColor: '#f5f5f5',
    }}
  >
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box
        component="img"
        src={logoUrl}
        alt={`Imagen del comercio ${merchant}`}
        sx={{
          width: 56,
          height: 56,
          borderRadius: borderRadius.button,
          objectFit: 'cover',
          backgroundColor: '#e0e0e0',
        }}
      />
      <Box>
        <KdsTypography variant="cardTitle" sx={{ fontWeight: fontWeights.semiBold }}>{merchant}</KdsTypography>
        <KdsTypography variant="cardSubtitle" color="tertiary" component="div">
          {title}
        </KdsTypography>
      </Box>
    </Box>
    <Box sx={{ textAlign: 'right' }}>
      <KdsTypography variant="heading3" sx={{ fontWeight: fontWeights.bold }}>
        {amount}
      </KdsTypography>
      <KdsTypography
        component="button"
        onClick={onDetailsClick}
        sx={{
          color: colors.primary.main,
          fontWeight: fontWeights.semiBold,
          fontSize: fontSizes.xs,
          textTransform: 'uppercase',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          '&:hover': {
            textDecoration: 'underline',
          },
        }}
      >
        DETALLES
      </KdsTypography>
    </Box>
  </Box>
);

// Footer component (version display)
interface FooterProps {
  version?: string;
}

const Footer: React.FC<FooterProps> = ({ version = 'V0.0.0' }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 40,
      backgroundColor: '#ffffff',
    }}
  >
    <KdsTypography variant="labelSmall" color="disabled">
      {version}
    </KdsTypography>
  </Box>
);

/**
 * BankSelectionExample - Bank Selection Screen
 *
 * Features:
 * - KdsLogoHeader with transaction code
 * - Progress indicator
 * - Payment summary: CMR Falabella, $741.780
 * - KdsTabs: PERSONAS / EMPRESAS
 * - Search field
 * - Bank list with selection
 */
export const BankSelectionExample: React.FC = () => {
  const [tab, setTab] = useState<string | number>('persona');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  // Map tab value to bank type
  const activeTab = tab === 'persona' ? 'personas' : 'empresas';

  const filteredBanks = banks.filter(
    (bank) =>
      bank.type === activeTab &&
      bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBankSelect = (bankId: string) => {
    setSelectedBank(bankId);
    console.log('Selected bank:', bankId);
  };

  const handleTabChange = (_: React.SyntheticEvent, newValue: string | number) => {
    setTab(newValue);
    setSelectedBank(null);
  };

  return (
    <KhipuThemeProvider>
      <Box
        sx={{
          width: 390,
          minHeight: '100vh',
          backgroundColor: '#f5f5f5',
          border: '1px solid rgba(58, 53, 65, 0.3)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* KdsLogoHeader */}
        <KdsLogoHeader sx={{ height: 40 }}>
          <KdsLogoHeaderLogo />
          <KdsLogoHeaderSeparator />
          <KdsLogoHeaderCode>aaaa-bbbb-cccc</KdsLogoHeaderCode>
          <KdsLogoHeaderCloseButton onClose={() => console.log('Close clicked')} />
        </KdsLogoHeader>

        {/* Merchant Header */}
        <MerchantHeader
          merchant="Merchant de prueba"
          title="asunto del pago"
          amount="$1.000"
          onDetailsClick={() => console.log('Details clicked')}
        />

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[3],
            alignItems: 'center',
            px: '20px',
            py: '24px',
            backgroundColor: '#ffffff',
            borderRadius: borderRadius.card,
            mx: '8px',
            mb: '8px',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          {/* Title */}
          <KdsTypography variant="heading3" sx={{ textAlign: 'center' }}>
            Selecciona tu banco o cuenta
          </KdsTypography>

          {/* KdsTabs: PERSONA / EMPRESA */}
          <KdsTabs
            value={tab}
            onChange={handleTabChange}
            color="primary"
            sx={{
              maxWidth: 350,
              '& .MuiTabs-indicator': {
                backgroundColor: colors.primary.main,
              },
              '& .MuiTab-root.Mui-selected': {
                color: colors.primary.main,
              },
            }}
          >
            <KdsTab label="PERSONA" value="persona" />
            <KdsTab label="EMPRESA" value="empresa" />
          </KdsTabs>

          {/* Search Field */}
          <KdsTextField
            placeholder="Buscar por nombre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
            sx={{
              maxWidth: 350,
              '& .MuiOutlinedInput-root': {
                borderRadius: borderRadius.md,
              },
            }}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Bank List */}
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 0,
            }}
          >
            {filteredBanks.map((bank) => (
              <KdsCard
                key={bank.id}
                clickable
                onCardClick={() => handleBankSelect(bank.id)}
                sx={{
                  width: '100%',
                  border: 'none',
                  boxShadow: 'none',
                  borderRadius: 0,
                  backgroundColor: selectedBank === bank.id
                    ? 'rgba(131, 71, 173, 0.08)'
                    : 'transparent',
                  '&:hover': {
                    backgroundColor: selectedBank === bank.id
                      ? 'rgba(131, 71, 173, 0.12)'
                      : 'rgba(0, 0, 0, 0.04)',
                  },
                  transition: 'background-color 0.2s ease',
                }}
              >
                <KdsCardContent
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    py: '12px !important',
                    px: '20px !important',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                    <Box
                      component="img"
                      src={bank.logoUrl}
                      alt={bank.name}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: borderRadius.button,
                        objectFit: 'contain',
                      }}
                    />
                    <KdsTypography variant="body" sx={{ fontWeight: fontWeights.medium }}>
                      {bank.name}
                    </KdsTypography>
                  </Box>
                  <ChevronRightIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
                </KdsCardContent>
              </KdsCard>
            ))}

            {filteredBanks.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <KdsTypography variant="body" color="tertiary">
                  No se encontraron bancos
                </KdsTypography>
              </Box>
            )}
          </Box>
        </Box>

        {/* Footer */}
        <Footer version="V0.0.0" />
      </Box>
    </KhipuThemeProvider>
  );
};

export default BankSelectionExample;
