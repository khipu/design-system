/**
 * Khipu Design System - Secure Form Example (Email Entry)
 *
 * This example demonstrates the "Ingresar email" screen from the Figma design
 * (node-id=17401-1136) using all the implemented components.
 *
 * Figma: https://www.figma.com/design/2ULMAL31GpLbpGEc9SgBD9/Pagos-Instantaneos?node-id=17401-1136
 */

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {
  KhipuThemeProvider,
  KdsButton,
  KdsTextField,
  KdsCheckbox,
  KdsTypography,
} from '../index';
import { colors, fontWeights, fontSizes, borderRadius, spacing } from '../tokens';

// Khipu Logo SVG Component
const KhipuLogo: React.FC<{ width?: number; height?: number }> = ({
  width = 44.5,
  height = 15,
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 89 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M15.5 0L0 15L15.5 30L31 15L15.5 0Z"
      fill="#743CEB"
    />
    <path
      d="M15.5 6L6 15L15.5 24L25 15L15.5 6Z"
      fill={colors.secondary.main}
    />
    <text
      x="36"
      y="21"
      fontFamily="Public Sans, sans-serif"
      fontSize="16"
      fontWeight="600"
      fill="#743CEB"
    >
      Khipu
    </text>
  </svg>
);

// Envelope Icon Component (for the main icon)
const EnvelopeIcon: React.FC = () => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28 6H4C2.9 6 2 6.9 2 8V24C2 25.1 2.9 26 4 26H28C29.1 26 30 25.1 30 24V8C30 6.9 29.1 6 28 6ZM28 10L16 17L4 10V8L16 15L28 8V10Z"
      fill={colors.primary.main}
    />
  </svg>
);

// Header component matching Figma design
interface HeaderProps {
  code?: string;
  onClose?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  code = 'husk-p77zz-Xgyg',
  onClose,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: 40,
      px: '20px',
      py: '10px',
      backgroundColor: '#ffffff',
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'center', gap: spacing[1] }}>
      <KhipuLogo />
      <KdsTypography
        sx={{
          color: '#9797A5',
          fontSize: fontSizes.xs, // '10px' no está en tokens, usando xs (12px)
          fontFamily: '"Public Sans", sans-serif',
          fontWeight: fontWeights.medium,
        }}
      >
        |
      </KdsTypography>
      <KdsTypography
        sx={{
          color: '#9797A5',
          fontSize: fontSizes.xs,
          fontFamily: '"Inter", sans-serif',
          fontWeight: fontWeights.regular,
        }}
      >
        {code}
      </KdsTypography>
    </Box>
    <IconButton
      size="small"
      onClick={onClose}
      sx={{
        color: 'rgba(76, 78, 100, 0.54)',
        padding: 0,
      }}
    >
      <CloseIcon sx={{ fontSize: 24 }} />
    </IconButton>
  </Box>
);

// Resume component showing merchant and payment info
interface ResumeProps {
  logoUrl?: string;
  merchant: string;
  product: string;
  amount: string;
  onViewDetails?: () => void;
}

const Resume: React.FC<ResumeProps> = ({
  logoUrl,
  merchant,
  product,
  amount,
  onViewDetails,
}) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: spacing[2],
      height: 100,
      px: '20px',
      py: '12px',
      backgroundColor: '#f5f5f5',
    }}
  >
    {/* Merchant Logo */}
    <Box
      sx={{
        width: 70,
        height: 70,
        borderRadius: borderRadius.sm,
        overflow: 'hidden',
        border: '1px solid white',
        flexShrink: 0,
      }}
    >
      {logoUrl ? (
        <Box
          component="img"
          src={logoUrl}
          alt={merchant}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      ) : (
        <Box
          sx={{
            width: '100%',
            height: '100%',
            backgroundColor: '#C3D500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: '"Public Sans", sans-serif',
            fontWeight: fontWeights.bold,
            fontSize: fontSizes.xs,
            color: '#173A79',
          }}
        >
          CMR
          <br />
          Falabella
        </Box>
      )}
    </Box>

    {/* Merchant Info */}
    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <KdsTypography
          sx={{
            fontFamily: '"Public Sans", sans-serif',
            fontWeight: fontWeights.semiBold,
            fontSize: fontSizes.sm,
            lineHeight: '20px',
            letterSpacing: '0.15px',
            color: 'rgba(0, 0, 0, 0.6)',
          }}
        >
          {merchant}
        </KdsTypography>
        <KdsTypography
          sx={{
            fontFamily: '"Public Sans", sans-serif',
            fontWeight: fontWeights.semiBold,
            fontSize: fontSizes.sm,
            lineHeight: '20px',
            letterSpacing: '0.15px',
            color: 'rgba(0, 0, 0, 0.87)',
          }}
        >
          {product}
        </KdsTypography>
      </Box>

      <Box sx={{ textAlign: 'right' }}>
        <KdsTypography
          sx={{
            fontFamily: '"Public Sans", sans-serif',
            fontWeight: fontWeights.semiBold,
            fontSize: fontSizes.xl,
            lineHeight: '32px',
            letterSpacing: '0.15px',
            color: 'rgba(0, 0, 0, 0.87)',
          }}
        >
          {amount}
        </KdsTypography>
        <Link
          component="button"
          onClick={onViewDetails}
          sx={{
            fontFamily: '"Public Sans", sans-serif',
            fontWeight: 500,
            fontSize: '13px',
            lineHeight: '22px',
            letterSpacing: '0.46px',
            color: '#4C4E64',
            textTransform: 'uppercase',
            textDecoration: 'none',
            cursor: 'pointer',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
        >
          Ver detalle
        </Link>
      </Box>
    </Box>
  </Box>
);

// Footer component
interface FooterProps {
  version?: string;
}

const Footer: React.FC<FooterProps> = ({ version = 'V2 0.0' }) => (
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
    <KdsTypography
      sx={{
        fontFamily: '"Public Sans", sans-serif',
        fontWeight: 500,
        fontSize: '10px',
        lineHeight: '14px',
        color: 'rgba(0, 0, 0, 0.38)',
      }}
    >
      {version}
    </KdsTypography>
  </Box>
);

/**
 * SecureFormExample - Email Entry Form
 *
 * Demonstrates the "Ingresar email" screen from Figma design.
 * This is the form where users enter their email to receive payment confirmation.
 */
export const SecureFormExample: React.FC = () => {
  const [email, setEmail] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = () => {
    console.log('Submitting email form:', { email, termsAccepted });
  };

  const handleClose = () => {
    console.log('Close clicked');
  };

  const handleViewDetails = () => {
    console.log('View details clicked');
  };

  const isFormValid = email.includes('@') && termsAccepted;

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
        {/* Header */}
        <Header onClose={handleClose} />

        {/* Resume Section */}
        <Resume
          merchant="CMR Falabella"
          product="Pago tarjeta crédito"
          amount="$741.780"
          onViewDetails={handleViewDetails}
        />

        {/* Main Content Box */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
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
              backgroundColor: 'rgba(131, 71, 173, 0.08)',
              borderRadius: borderRadius.lg,
            }}
          >
            <EnvelopeIcon />
          </Box>

          {/* Title Section */}
          <Box sx={{ textAlign: 'center' }}>
            <KdsTypography
              sx={{
                fontFamily: '"Public Sans", sans-serif',
                fontWeight: 600,
                fontSize: '20px',
                lineHeight: '26px',
                letterSpacing: '0.15px',
                color: 'rgba(0, 0, 0, 0.87)',
                mb: 1,
              }}
            >
              Recibe tu comprobante
              <br />
              al finalizar el pago
            </KdsTypography>
            <KdsTypography
              sx={{
                fontFamily: '"Public Sans", sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '15px',
                letterSpacing: '1px',
                color: 'rgba(0, 0, 0, 0.6)',
                textTransform: 'uppercase',
              }}
            >
              Ingresa tu email
            </KdsTypography>
          </Box>

          {/* Email KdsTextField */}
          <Box sx={{ width: '100%' }}>
            <KdsTextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nombre@email.com"
              endAdornment={
                <MailOutlineIcon sx={{ color: 'rgba(0, 0, 0, 0.54)' }} />
              }
              fullWidth
            />
          </Box>

          {/* Terms KdsCheckbox */}
          <Box sx={{ width: '100%' }}>
            <KdsCheckbox
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              label={
                <>
                  Acepto los{' '}
                  <Link
                    href="#"
                    sx={{
                      color: colors.primary.main,
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    términos y condiciones de uso
                  </Link>
                </>
              }
            />
          </Box>

          {/* Security Message */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              width: '100%',
            }}
          >
            <LockOutlinedIcon
              sx={{ fontSize: 24, color: 'rgba(0, 0, 0, 0.38)' }}
            />
            <KdsTypography
              sx={{
                fontFamily: '"Public Sans", sans-serif',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '1.66',
                letterSpacing: '0.4px',
                color: 'rgba(0, 0, 0, 0.38)',
              }}
            >
              Datos protegidos por encriptación
            </KdsTypography>
          </Box>

          {/* Submit KdsButton */}
          <Box sx={{ width: '100%' }}>
            <KdsButton
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleSubmit}
              disabled={!isFormValid}
            >
              CONTINUAR
            </KdsButton>
          </Box>
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </KhipuThemeProvider>
  );
};

export default SecureFormExample;
