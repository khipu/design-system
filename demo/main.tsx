import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { KhipuThemeProvider } from '../src/theme/ThemeProvider';
import { MandateFormExample } from '../src/examples/MandateFormExample';
import { BankSelectionExample } from '../src/examples/BankSelectionExample';
import { SubscriptionDetailsExample } from '../src/examples/SubscriptionDetailsExample';

// Home page with navigation
const Home: React.FC = () => (
  <KhipuThemeProvider>
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 4,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Public Sans", sans-serif',
          fontWeight: 600,
          color: '#272930',
          mb: 4,
        }}
      >
        Khipu Design System - Examples
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          width: 300,
        }}
      >
        <Link
          to="/mandate-form"
          style={{
            display: 'block',
            padding: '16px 24px',
            backgroundColor: '#8347AD',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            textAlign: 'center',
            fontFamily: '"Public Sans", sans-serif',
            fontWeight: 500,
          }}
        >
          Mandate Form
        </Link>
        <Link
          to="/bank-selection"
          style={{
            display: 'block',
            padding: '16px 24px',
            backgroundColor: '#8347AD',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            textAlign: 'center',
            fontFamily: '"Public Sans", sans-serif',
            fontWeight: 500,
          }}
        >
          Bank Selection
        </Link>
        <Link
          to="/subscription-details"
          style={{
            display: 'block',
            padding: '16px 24px',
            backgroundColor: '#8347AD',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            textAlign: 'center',
            fontFamily: '"Public Sans", sans-serif',
            fontWeight: 500,
          }}
        >
          Subscription Details
        </Link>
      </Box>
    </Box>
  </KhipuThemeProvider>
);

// App with routes
const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/mandate-form" element={<MandateFormExample />} />
      <Route path="/bank-selection" element={<BankSelectionExample />} />
      <Route path="/subscription-details" element={<SubscriptionDetailsExample />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
