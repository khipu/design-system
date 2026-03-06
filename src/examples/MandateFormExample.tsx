/**
 * Khipu Design System - Mandate Form Example
 *
 * This example demonstrates the Selección screen from the Figma design
 * (node-id=17023-7447) using all the implemented components.
 */

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';

import {
  KhipuThemeProvider,
  KdsButton,
  KdsTextField,
  KdsCheckbox,
  KdsLinearProgress,
  KdsTypography,
  KdsLogoHeader,
  KdsLogoHeaderLogo,
  KdsLogoHeaderSeparator,
  KdsLogoHeaderCode,
  KdsLogoHeaderCloseButton,
} from '../index';
import { colors, borderRadius, spacing } from '../tokens';

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

/**
 * MandateFormExample - Mandate Payment Form
 *
 * Demonstrates the "Selección" screen from Figma design.
 * This is the initial form where users enter their RUT and accept terms.
 */
export const MandateFormExample: React.FC = () => {
  const [rut, setRut] = useState('15.068.910-1');
  const [termsAccepted, setTermsAccepted] = useState(true);

  const handleSubmit = () => {
    console.log('Submitting mandate form:', { rut, termsAccepted });
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
        <KdsLinearProgress color="info" variant="determinate" value={20} />

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
            alignItems: 'center',
            px: '20px',
            py: '32px',
            backgroundColor: '#ffffff',
            borderTopLeftRadius: '20px',
            borderTopRightRadius: '20px',
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              backgroundColor: colors.primary.states.selected,
              borderRadius: borderRadius.lg,
            }}
          >
            <Box
              component="svg"
              width={32}
              height={32}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              sx={{ color: colors.primary.main }}
            >
              <path
                d="M9.5 4C10.5 4 11.5 4.2 12.4 4.7L8 9.1V4.4C8.5 4.1 9 4 9.5 4ZM9.5 2C4.8 2 1 5.8 1 10.5S4.8 19 9.5 19 18 15.2 18 10.5 14.2 2 9.5 2ZM4 10.5C4 7.5 6.5 5 9.5 5V16C6.5 16 4 13.5 4 10.5ZM20 10.5C20 11.3 19.9 12.1 19.7 12.8L21.2 14.3C21.7 13.1 22 11.8 22 10.5 22 6 18.9 2.2 14.7 1.2L14.1 3.1C17.4 4 20 7 20 10.5ZM12.9 20.9L14.3 22.3C18 21 20.9 17.7 21.8 13.8L19.9 13.2C19.1 16.3 16.4 18.8 12.9 20.9Z"
                fill="currentColor"
              />
            </Box>
          </Box>

          {/* Title Section */}
          <Box sx={{ textAlign: 'center' }}>
            <KdsTypography variant="heading3" sx={{ mb: 1 }}>
              Mandato de pago
            </KdsTypography>
            <KdsTypography variant="label" color="secondary">
              COMENZAR SOLICITUD
            </KdsTypography>
          </Box>

          {/* Form */}
          <Box sx={{ width: 350 }}>
            <KdsTextField
              label="RUT Suscriptor"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
              endAdornment={<PersonIcon sx={{ color: 'action.active' }} />}
              fullWidth
            />
          </Box>

          {/* Terms and Submit */}
          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <KdsCheckbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              label={
                <>
                  Acepto los{' '}
                  <Link
                    href="#"
                    sx={{
                      color: '#0288d1',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    términos y condiciones de uso
                  </Link>
                </>
              }
            />

            <KdsButton
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={!termsAccepted}
            >
              INGRESAR
            </KdsButton>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
              }}
            >
              <LockIcon sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.38)' }} />
              <KdsTypography variant="bodySmall" color="disabled">
                Datos protegidos por encriptación
              </KdsTypography>
            </Box>
          </Box>
        </Box>

        {/* Footer */}
        <Footer code="HUSK-P7ZZ-XGYG" />
      </Box>
    </KhipuThemeProvider>
  );
};

export default MandateFormExample;
