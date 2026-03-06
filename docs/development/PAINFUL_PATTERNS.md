# Painful Patterns Identified & Solutions

This document identifies the most common problematic patterns found across the Khipu codebase and provides migration paths to the design system.

---

## 1. Duplicated Form Components

### Problem
Forms are copy-pasted across different views with slight variations:
- Bank login forms duplicated in multiple places
- Validation logic repeated inline
- Inconsistent error handling
- No standardized form state management

```tsx
// ❌ BEFORE: Duplicated form pattern
const BankLoginForm = () => {
  const [rut, setRut] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Inline validation - duplicated everywhere
  const validateRut = (value: string) => {
    if (!value) return 'RUT requerido';
    if (!/^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/.test(value)) {
      return 'RUT inválido';
    }
    return '';
  };

  // Same validation logic copied to 5+ files...
};
```

### Solution
Use the design system components with a shared validation hook:

```tsx
// ✅ AFTER: Using design system
import { TextField, Button, Checkbox } from '@khipu/design-system';
import { useFormValidation } from '@khipu/design-system/hooks';

const BankLoginForm = () => {
  const { values, errors, handleChange, handleSubmit } = useFormValidation({
    rut: { required: true, validator: validators.rut },
    password: { required: true, minLength: 6 },
  });

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="RUT"
        value={values.rut}
        onChange={handleChange('rut')}
        error={!!errors.rut}
        helperText={errors.rut}
      />
      <TextField
        label="Clave"
        type="password"
        value={values.password}
        onChange={handleChange('password')}
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button type="submit" fullWidth>
        Ingresar
      </Button>
    </form>
  );
};
```

---

## 2. Copy-Paste Validation Logic

### Problem
Validation functions scattered across the codebase:
- RUT validation implemented 8+ different ways
- Currency formatting inconsistent
- Phone number validation varies by file
- No centralized validation utilities

```tsx
// ❌ BEFORE: Validation scattered everywhere
// File A
const isValidRut = (rut) => { /* implementation 1 */ };

// File B
function validateRut(value) { /* slightly different implementation */ }

// File C
const rutValidator = (input) => { /* yet another version */ };
```

### Solution
Create centralized validators in the design system:

```tsx
// ✅ AFTER: Centralized validators
// src/utils/validators.ts
export const validators = {
  rut: {
    validate: (value: string): boolean => {
      // Single source of truth for RUT validation
      const cleanRut = value.replace(/[.-]/g, '');
      if (cleanRut.length < 8) return false;
      // ... complete validation
      return true;
    },
    format: (value: string): string => {
      // Consistent formatting
      const clean = value.replace(/[^0-9kK]/g, '');
      // ... formatting logic
      return formatted;
    },
    message: 'Ingresa un RUT válido (ej: 12.345.678-9)',
  },

  email: {
    validate: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Ingresa un email válido',
  },

  currency: {
    format: (value: number, currency = 'CLP') =>
      new Intl.NumberFormat('es-CL', { style: 'currency', currency }).format(value),
    parse: (value: string) => parseInt(value.replace(/[^0-9]/g, ''), 10),
  },
};
```

---

## 3. Untyped API Calls

### Problem
API calls without proper typing or error handling:
- Response types are `any`
- No standardized error handling
- Loading states managed inconsistently
- No retry logic or caching

```tsx
// ❌ BEFORE: Untyped API calls
const fetchBanks = async () => {
  const response = await fetch('/api/banks');
  const data = await response.json(); // data is 'any'
  setBanks(data); // No type safety
};
```

### Solution
Create typed API client with proper error handling:

```tsx
// ✅ AFTER: Typed API layer
// src/api/types.ts
export interface Bank {
  id: string;
  name: string;
  code: string;
  logoUrl: string;
  available: boolean;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: {
    code: string;
    message: string;
  };
}

// src/api/banks.ts
export const banksApi = {
  list: async (): Promise<ApiResponse<Bank[]>> => {
    try {
      const response = await apiClient.get<Bank[]>('/banks');
      return { data: response.data, success: true };
    } catch (error) {
      return {
        data: [],
        success: false,
        error: { code: 'FETCH_ERROR', message: 'Failed to fetch banks' },
      };
    }
  },
};

// Usage with design system hook
const { data: banks, loading, error, refetch } = useApi(banksApi.list);

return (
  <BankSelector
    banks={banks}
    loading={loading}
    error={error}
    onRetry={refetch}
  />
);
```

---

## 4. Repeated Layout Code

### Problem
Layout patterns duplicated across pages:
- Page containers with same padding/margins
- Card layouts copy-pasted
- Responsive breakpoints inconsistent
- Spacing varies between components

```tsx
// ❌ BEFORE: Layout code everywhere
const PaymentPage = () => (
  <div style={{
    padding: '32px 24px',
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '20px',
  }}>
    {/* Content */}
  </div>
);

// Same pattern in 20+ files with slight variations
```

### Solution
Create layout templates in the design system:

```tsx
// ✅ AFTER: Reusable layouts
// src/templates/PaymentLayout.tsx
export const PaymentLayout: React.FC<PaymentLayoutProps> = ({
  children,
  title,
  stepper,
  footer,
}) => (
  <div className="payment-layout">
    <header className="payment-layout__header">
      {stepper && <PaymentStepper {...stepper} />}
      {title && <h1>{title}</h1>}
    </header>
    <main className="payment-layout__content">
      {children}
    </main>
    {footer && (
      <footer className="payment-layout__footer">
        {footer}
      </footer>
    )}
  </div>
);

// Usage
const BankSelectionPage = () => (
  <PaymentLayout
    title="Selecciona tu banco"
    stepper={{ steps: paymentSteps, activeStep: 0 }}
    footer={<SecurityBadge />}
  >
    <BankSelector banks={banks} onSelect={handleSelect} />
  </PaymentLayout>
);
```

---

## 5. Inconsistent Styling Approaches

### Problem
Multiple styling approaches in the same codebase:
- Inline styles
- CSS modules
- Styled-components
- Raw CSS classes
- Tailwind classes (partial adoption)

```tsx
// ❌ BEFORE: Mixed styling approaches in same file
const Component = () => (
  <div
    style={{ padding: '16px' }}  // Inline
    className={styles.container}  // CSS Module
  >
    <StyledButton>Click</StyledButton>  // Styled-components
    <span className="text-primary">Text</span>  // CSS class
  </div>
);
```

### Solution
Standardize on design tokens with CSS variables:

```tsx
// ✅ AFTER: Consistent token-based styling
import { tokens, spacing, colors } from '@khipu/design-system';

// Option A: CSS Variables (recommended for most cases)
const Component = () => (
  <div style={{
    padding: spacing[4],  // Uses token
    backgroundColor: colors.background.paper,
  }}>
    <Button color="primary">Click</Button>
  </div>
);

// Option B: CSS with variables
.container {
  padding: var(--kds-spacing-4);
  background-color: var(--kds-color-background-paper);
}
```

---

## Migration Checklist

### Phase 1: Token Adoption
- [ ] Import CSS variables file globally
- [ ] Replace hardcoded colors with tokens
- [ ] Replace hardcoded spacing with tokens
- [ ] Replace hardcoded typography with tokens

### Phase 2: Core Components
- [ ] Replace custom buttons with `Button`
- [ ] Replace custom inputs with `TextField`
- [ ] Replace custom selects with `Select`
- [ ] Replace custom modals with `Modal`
- [ ] Replace custom checkboxes with `Checkbox`

### Phase 3: Domain Components
- [ ] Replace bank selection UI with `BankSelector`
- [ ] Replace payment steppers with `PaymentStepper`
- [ ] Replace status badges with `MandateStatusBadge`
- [ ] Replace summary cards with `PayoutSummaryCard`
- [ ] Replace empty states with `EmptyState`

### Phase 4: Patterns
- [ ] Centralize validation logic
- [ ] Type all API calls
- [ ] Create shared hooks for common patterns
- [ ] Implement layout templates

---

## Quick Wins

1. **Start with tokens**: Import `css-variables.css` globally and start using CSS variables immediately.

2. **Replace buttons first**: Buttons are used everywhere and have the biggest visual impact.

3. **Standardize forms**: Use `TextField` for all inputs to get consistent validation and styling.

4. **Domain components**: `BankSelector` and `PaymentStepper` encode complex UI logic that's been duplicated many times.

5. **Type your API**: Even without the full API layer, adding TypeScript interfaces to existing calls improves developer experience significantly.
