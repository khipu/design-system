# Khipu Design System - Design Tokens

Este directorio contiene todos los tokens de diseño del Khipu Design System, extraídos desde Figma y preparados para soporte de modo claro y oscuro.

## Estructura de Tokens

### Soporte de Modo Claro/Oscuro

Los tokens de color están organizados en dos modos:

```typescript
import { colorsByMode, tokensByMode } from '@khipu/design-system/tokens';

// Acceder a colores por modo
const lightColors = colorsByMode.light;
const darkColors = colorsByMode.dark;

// Acceder a todos los tokens por modo
const lightTokens = tokensByMode.light;
const darkTokens = tokensByMode.dark;
```

### Retrocompatibilidad

Para mantener compatibilidad con código existente, los exports por defecto usan modo claro:

```typescript
import { colors, tokens } from '@khipu/design-system/tokens';

// Estos exports usan modo claro por defecto
console.log(colors.primary.main); // '#8347AD'
```

## Uso Recomendado

### Para código nuevo

```typescript
import { colorsByMode, ThemeMode } from '@khipu/design-system/tokens';

function MyComponent({ theme = 'light' }: { theme?: ThemeMode }) {
  const colors = colorsByMode[theme];

  return (
    <div style={{
      backgroundColor: colors.background.default,
      color: colors.text.primary
    }}>
      Contenido
    </div>
  );
}
```

### Con MUI Theme

```typescript
import { createTheme } from '@mui/material/styles';
import { getTokensForMode } from '@khipu/design-system/tokens';

const theme = createTheme({
  palette: {
    mode: 'light', // o 'dark'
    ...getTokensForMode('light').colors,
  },
});
```

## Categorías de Tokens

### Colores

#### Mode-Specific (cambian según el modo)
- **Primary**: Púrpura de marca Khipu
- **Secondary**: Cian/Turquesa
- **Text**: Colores de texto (negro en claro, blanco en oscuro)
- **Background**: Fondos (blanco en claro, grises oscuros en dark)
- **Action**: Estados interactivos
- **Components**: Colores específicos de componentes

#### Semantic (iguales en ambos modos)
- **Success**: Verde (#2E7D32)
- **Warning**: Naranja (#ED6C02)
- **Error**: Rojo (#D32F2F)
- **Info**: Azul (#0288D1)

### Tipografía
- Font Families (Primary: Public Sans, Secondary: Public Sans, Mono: Roboto Mono)
- Font Weights (light, regular, medium, semiBold, bold)
- Font Sizes (xs, sm, base, lg, xl, 2xl, 3xl, 4xl)
- Line Heights (tight, snug, normal, relaxed, loose)
- Letter Spacings (tighter, tight, normal, wide, wider, widest)

### Espaciado
- **Spacing Scale**: 0-12 (0px a 96px, escala de 8px)
- **Semantic Spacing**: Espaciados específicos por componente

### Border Radius
- **Generic**: none, sm, md, lg, xl, 2xl, 3xl, full
- **Component-specific**: button, input, card, modal, chip, avatar, iconContainer

### Sombras
- button, card, modal, dropdown

### Bordes
- card, input, button, divider

## Estado Actual de Implementación

### ✅ Completamente Implementado
- Modo claro (extraído de Figma)
- Retrocompatibilidad total con código existente
- Tipos TypeScript completos

### 🚧 Preparado para Implementación
- Modo oscuro (colores ajustados según Material Design Dark Theme)
- Utilities para cambiar entre modos
- Estructura preparada en theme

### 📋 Pendiente
- Extraer colores de modo oscuro desde Figma (cuando estén disponibles)
- Implementar toggle de modo en ThemeProvider
- Actualizar CSS variables con soporte de modos

## Funciones Utilitarias

### `getTokensForMode(mode)`
Obtiene el set completo de tokens para un modo específico.

```typescript
const lightTokens = getTokensForMode('light');
const darkTokens = getTokensForMode('dark');
```

### `getColorsForMode(mode)`
Obtiene solo los colores para un modo específico.

```typescript
const lightColors = getColorsForMode('light');
const darkColors = getColorsForMode('dark');
```

## Migración Futura

Cuando el equipo esté listo para implementar dark mode completamente:

1. **Actualizar ThemeProvider** para soportar prop `mode`
2. **Crear toggle de modo** en la aplicación
3. **Actualizar CSS variables** para reaccionar al modo
4. **Sincronizar con Figma** los valores finales de dark mode

## Referencias

- [Material-UI Dark Mode](https://mui.com/material-ui/customization/dark-mode/)
- [Figma Variables Documentation](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- Archivo Figma: **Pagos Automáticos - MUI v610**
