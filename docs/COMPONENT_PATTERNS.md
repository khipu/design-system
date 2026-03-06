# Patrones de Desarrollo de Componentes

Guía completa de patrones y convenciones para desarrollar componentes del Sistema de Diseño Khipu.

---

## Agregar un Nuevo Componente Core

### 1. Crear estructura de directorios

```
src/components/core/NuevoComponente/
├── NuevoComponente.tsx       # Implementación
├── NuevoComponente.stories.tsx # Stories de Storybook
└── index.ts                  # Export barrel
```

### 2. Plantilla de componente

```typescript
import { forwardRef } from 'react';
import MuiComponent from '@mui/material/Component';

export type NuevoComponenteVariant = 'default' | 'custom';

export interface NuevoComponenteProps extends Omit<MuiComponentProps, 'variant'> {
  variant?: NuevoComponenteVariant;
  propPersonalizada?: string;
}

/**
 * NuevoComponente - Descripción aquí
 * @example
 * <NuevoComponente variant="custom">Contenido</NuevoComponente>
 */
export const NuevoComponente = forwardRef<HTMLDivElement, NuevoComponenteProps>(
  ({ variant = 'default', ...props }, ref) => {
    return <MuiComponent ref={ref} {...props} />;
  }
);

NuevoComponente.displayName = 'NuevoComponente';
```

### 3. Agregar exports

```typescript
// src/components/core/index.ts
export { NuevoComponente, type NuevoComponenteProps } from './NuevoComponente';

// src/index.ts
export { NuevoComponente, type NuevoComponenteProps } from './components/core';
```

---

## Trabajando con Tokens de Diseño

```typescript
import { tokens, colors, spacing, typography } from '@khipu/design-system';

// En estilos de componente
sx={{
  color: colors.primary.main,      // #8347AD
  padding: spacing[4],             // 16px
  ...typography.body1,             // Estilos de tipografía completos
  borderRadius: tokens.borderRadius.card, // 20px
}}

// Usando variables CSS
<div style={{ padding: 'var(--kds-spacing-4)' }} />
```

---

## Uso de Tipografía

El componente Typography usa **variantes semánticas** que mapean a elementos HTML:

```typescript
// Display y Encabezados
<Typography variant="display1">Texto Hero</Typography>  // h1
<Typography variant="heading3">Sección</Typography>     // h6

// Texto de Body
<Typography variant="bodyLarge">Párrafo introductorio</Typography>
<Typography variant="body">Contenido regular</Typography>

// Labels de UI
<Typography variant="label">LABEL DE CAMPO</Typography>
<Typography variant="cardTitle">Título de Tarjeta</Typography>
```

---

## Arquitectura del Sistema de Componentes

El sistema utiliza una **arquitectura de componentes de tres capas**:

```
┌─────────────────────────────────────┐
│    Componentes de Dominio (Futuro)   │ ← Componentes de lógica de negocio
│   (BankSelector, PaymentStepper)     │   Componen componentes core
├─────────────────────────────────────┤
│        Componentes Core              │ ← Primitivos envueltos de MUI
│  (Button, TextField, Card, etc.)     │   Aplican tokens de diseño Khipu
├─────────────────────────────────────┤
│    Componentes Material UI           │ ← Componentes base
│        (MuiButton, etc.)             │   Extendidos via tema
└─────────────────────────────────────┘
```

**Patrón Clave:** Cada componente core:
1. Envuelve un componente MUI
2. Aplica tokens de diseño via overrides del tema
3. Extiende con props personalizadas (tipos más estrictos)
4. Usa `forwardRef` para reenvío de refs
5. Exporta componente + todos los tipos desde index.ts

---

## Sistema de Tokens de Diseño

**Flujo de Tokens:**
```
Especificación de Diseño en Figma
    ↓
tokens/index.ts (constantes JS)
    ↓
    ├→ theme/index.ts (tema MUI)
    │     ↓
    │  Overrides de componentes
    │
    └→ tokens/css-variables.css
          ↓
       Variables CSS en runtime (--kds-*)
```

**Categorías de Tokens:**
- **Colores**: Púrpura primario (#8347AD), colores semánticos, texto, fondo
- **Tipografía**: Public Sans (primaria), Roboto (secundaria), 8 tamaños, 4 pesos
- **Espaciado**: Escala 0-96px + espaciado semántico (cardPaddingX, etc.)
- **Sombras**: Basadas en elevación (elevation/2 para botones)
- **Border Radius**: Específico por componente (button: 4px, card: 20px)

---

## Sistema de Tema

El tema MUI (`src/theme/index.ts`) proporciona **overrides a nivel de componente** para más de 15 componentes MUI:

```typescript
// Ejemplo: Overrides de Button
MuiButton: {
  defaultProps: { disableElevation: false },
  styleOverrides: {
    root: ({ theme, ownerState }) => ({
      textTransform: 'none',
      fontWeight: 500,
      borderRadius: tokens.borderRadius.button,
      // Padding específico por tamaño
      ...(ownerState.size === 'large' && {
        padding: '12px 24px',
        fontSize: '1rem',
      }),
    }),
  },
}
```

---

## Estrategia de Exportación

Los **exports del paquete** están organizados por área:

```javascript
// Entry principal - todo
import { Button, TextField } from '@khipu/design-system';

// Solo tokens
import { colors, spacing } from '@khipu/design-system/tokens';

// Variables CSS
import '@khipu/design-system/css';

// Grupos de componentes específicos (futuro)
import { BankSelector } from '@khipu/design-system/components/domain';
```

---

## Sistema de Tipos

**Patrones estrictos de TypeScript:**

```typescript
// Enums personalizados para tipos más estrictos
export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonColor = 'primary' | 'secondary' | 'error';

// Extender tipos MUI con Omit para overrides
interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'color'> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  loading?: boolean; // Prop personalizada
}

// Exportar todo desde barrel
export { Button, type ButtonProps, type ButtonVariant, type ButtonColor };
```

---

## Patrones Específicos del Proyecto

### Gestión de Estado de Componentes
Los componentes son **sin estado** por defecto. La gestión de estado ocurre a nivel de página/contenedor o via hooks.

### Patrón de Manejo de Errores
Todos los componentes aceptan estados de error via props:
```typescript
<TextField error={!!errors.email} helperText={errors.email} />
<Card error={hasError}>Contenido</Card>
```

### Estados de Carga
Componentes con comportamiento asíncrono aceptan prop `loading`:
```typescript
<Button loading={isSubmitting}>Enviar</Button>
<Card loading={isFetching}>Contenido</Card>
```

### Accesibilidad
Todos los componentes:
- Reenvían refs para acceso al DOM
- Incluyen atributos ARIA apropiados via MUI
- Soportan navegación por teclado
- Tienen estados de focus apropiados

---

## Referencia de Estructura de Archivos

```
src/
├── index.ts                 # Exports principales (tema, tokens, componentes)
├── components/
│   ├── core/               # 9 componentes envueltos de MUI
│   │   └── [Componente]/
│   │       ├── [Componente].tsx
│   │       ├── [Componente].stories.tsx
│   │       └── index.ts
│   └── domain/             # Futuro: componentes compuestos
├── tokens/
│   ├── index.ts           # Constantes de tokens de diseño
│   └── css-variables.css  # Propiedades personalizadas CSS
├── theme/
│   ├── index.ts           # Configuración del tema MUI
│   └── ThemeProvider.tsx  # Provider de React
├── examples/              # Ejemplos de páginas completas
│   ├── BankSelectionExample.tsx
│   ├── MandateFormExample.tsx
│   └── SubscriptionDetailsExample.tsx
├── stories/               # Documentación adicional de Storybook
└── assets/               # Imágenes (logos de bancos, etc.)
```

---

## Tips de Debugging

### Componente no se estiliza correctamente
1. Asegurar que esté envuelto con `<KhipuThemeProvider>`
2. Verificar especificidad de override del tema MUI
3. Verificar path de importación de token
4. Usar DevTools del navegador para inspeccionar variables CSS

### Errores de TypeScript
1. Importar tipos explícitamente: `import type { ButtonProps }`
2. Verificar props del componente base MUI
3. Ejecutar `npm run typecheck` para errores detallados

### Fallas de build
```bash
# Limpiar y reconstruir
rm -rf dist
npm run build

# Verificar errores de tipos primero
npm run typecheck
```

### Problemas con Storybook
```bash
# Limpiar caché de Storybook
rm -rf node_modules/.cache/storybook
npm run storybook
```

---

## Migración desde Código Existente

El archivo `docs/development/PAINFUL_PATTERNS.md` documenta anti-patrones comunes y rutas de migración:

### Puntos Clave de Migración:
1. **Reemplazar validación inline** → Usar validadores centralizados
2. **Reemplazar componentes de formulario custom** → Usar TextField con hooks de validación
3. **Reemplazar colores/espaciado hardcodeados** → Usar tokens de diseño
4. **Tipificar llamadas API** → Crear capa API tipificada
5. **Estandarizar layouts** → Crear templates de layout

### Victorias Rápidas:
1. Importar `css-variables.css` globalmente
2. Reemplazar todos los botones custom con `<Button>`
3. Usar `<TextField>` para todos los inputs
4. Aplicar tokens a componentes existentes

---

## Notas Importantes

- **Sin componentes de dominio aún** - El directorio `domain/` está vacío, esperando componentes de lógica de negocio
- **Enfoque token-first** - Siempre usar tokens en lugar de valores hardcodeados
- **MUI como fundación** - No es una biblioteca headless; aprovecha los patrones de MUI
- **Figma es la fuente de verdad** - Todos los valores de diseño vienen de la especificación de Figma
- **Variables CSS disponibles** - Usar variables `--kds-*` para tematización en runtime

---

## Referencias

- **Tokens:** Ver [`TOKENS_GUIDE.md`](TOKENS_GUIDE.md)
- **Build & Publishing:** Ver [`BUILD_PUBLISHING.md`](BUILD_PUBLISHING.md)
- **Anti-patrones:** Ver [`development/PAINFUL_PATTERNS.md`](development/PAINFUL_PATTERNS.md)