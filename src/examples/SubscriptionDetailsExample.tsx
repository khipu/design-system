/**
 * Khipu Design System - Subscription Details Example
 *
 * This example demonstrates the "Ingresa banco" screen from Figma design
 * (node-id=17024-8420) - Subscription details with action buttons.
 */

import React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import {
  KhipuThemeProvider,
  KdsButton,
  KdsAlert,
  KdsLinearProgress,
  KdsTypography,
  KdsLogoHeader,
  KdsLogoHeaderLogo,
  KdsLogoHeaderSeparator,
  KdsLogoHeaderCode,
  KdsLogoHeaderCloseButton,
} from '../index';
import { borderRadius, spacing } from '../tokens';

// Header component with merchant info
interface MerchantHeaderProps {
  logoUrl?: string;
  title: string;
  merchant: string;
  product: string;
}

const MerchantHeader: React.FC<MerchantHeaderProps> = ({
  logoUrl = 'https://via.placeholder.com/70',
  title,
  merchant,
  product,
}) => (
  <Box
    sx={{
      display: 'flex',
      gap: 2,
      alignItems: 'flex-start',
      justifyContent: 'center',
      p: '20px',
      backgroundColor: '#f5f5f5',
      borderRadius: borderRadius.sm,
    }}
  >
    <Box
      component="img"
      src={logoUrl}
      alt="Logo comercio"
      sx={{
        width: 70,
        height: 70,
        borderRadius: borderRadius.button,
        objectFit: 'cover',
      }}
    />
    <Box sx={{ width: 264 }}>
      <KdsTypography variant="cardTitle">{title}</KdsTypography>
      <KdsTypography variant="cardSubtitle" color="tertiary" component="div">
        {merchant}
      </KdsTypography>
      <KdsTypography variant="cardSubtitle" component="div">
        {product}
      </KdsTypography>
    </Box>
  </Box>
);

// Footer component
interface FooterProps {
  code: string;
}

const Footer: React.FC<FooterProps> = ({ code }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 45,
      borderTop: '1px solid #e0e0e0',
      backgroundColor: '#ffffff',
    }}
  >
    <KdsTypography variant="labelSmall" color="disabled">
      CÓDIGO • {code}
    </KdsTypography>
  </Box>
);

// Detail item component
interface DetailItemProps {
  label: string;
  value: string;
  showCheck?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value, showCheck = true }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <KdsTypography variant="label" color="secondary">
      {label}
    </KdsTypography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {showCheck && <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: 24 }} />}
      <KdsTypography variant="body">{value}</KdsTypography>
    </Box>
  </Box>
);

/**
 * SubscriptionDetailsExample - Subscription Details Screen
 *
 * Demonstrates the subscription details review screen from Figma design.
 */
export const SubscriptionDetailsExample: React.FC = () => {
  const handleAuthorize = () => {
    console.log('Authorizing subscription...');
  };

  const handleReject = () => {
    console.log('Rejecting subscription...');
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
        {/* KdsLogoHeader at top */}
        <KdsLogoHeader sx={{ height: 40 }}>
          <KdsLogoHeaderLogo />
          <KdsLogoHeaderSeparator />
          <KdsLogoHeaderCode>HUSK-P7ZZ-XGYG</KdsLogoHeaderCode>
          <KdsLogoHeaderCloseButton onClose={() => console.log('Close clicked')} />
        </KdsLogoHeader>

        {/* Progress bar */}
        <KdsLinearProgress color="info" variant="determinate" value={60} />

        {/* Merchant Header */}
        <MerchantHeader
          title="Suscripción de pago automático"
          merchant="Comercializadora Nacional"
          product="Pack Mensual Premium"
        />

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: spacing[4],
            px: '20px',
            py: '32px',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          }}
        >
          {/* Title */}
          <KdsTypography variant="heading3" sx={{ px: '10px' }}>
            Detalle de suscripción
          </KdsTypography>

          {/* Details Section */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              px: '20px',
            }}
          >
            <DetailItem label="TIPO DE PAGO" value="Monto variable" />
            <Divider sx={{ borderColor: '#DDDEE0' }} />
            <DetailItem label="TOPE POR CARGO" value="$50.000" />
            <Divider sx={{ borderColor: '#DDDEE0' }} />
            <DetailItem label="TOPE MENSUAL" value="$150.000" />
          </Box>

          {/* Info KdsAlert */}
          <KdsAlert severity="info">
            El tope mensual corresponde al monto máximo posible a cobrar mensualmente.
          </KdsAlert>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: 350 }}>
            <KdsButton
              variant="primary"
              fullWidth
              onClick={handleAuthorize}
            >
              AUTORIZAR
            </KdsButton>
            <KdsButton
              variant="outlined"
              fullWidth
              onClick={handleReject}
            >
              RECHAZAR
            </KdsButton>
          </Box>
        </Box>

        {/* Footer */}
        <Footer code="HUSK-P7ZZ-XGYG" />
      </Box>
    </KhipuThemeProvider>
  );
};

export default SubscriptionDetailsExample;
