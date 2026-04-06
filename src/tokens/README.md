# Khipu Design System - Design Tokens

Este directorio contiene todos los tokens de diseño del Khipu Design System, extraídos desde Figma y preparados para soporte de modo claro y oscuro.

## 📁 Arquitectura de Archivos

### **Fuente de Verdad:**
```
src/tokens/index.ts
```
**Único archivo que debes editar manualmente.** Define todos los tokens en TypeScript.

### **Archivos Autogenerados:**
```
src/tokens/
├── index.ts              ← FUENTE DE VERDAD (editar aquí)
├── tokens.json           ← Autogenerado (DO NOT EDIT)
└── css-variables.css     ← Autogenerado (DO NOT EDIT)
```

### **Uso en BeerCSS:**
```
src/beercss/customizations/
└── khipu-tokens.css      ← Importa css-variables.css + mapea a BeerCSS
```

### **Copia para Grails (opcional):**
```
grails/src/main/resources/css/
└── kds-tokens.css        ← Copia de css-variables.css vía Gradle
```

---

## 🔄 Flujo de Generación

```mermaid
graph TD
    A[src/tokens/index.ts] -->|npm run tokens:export| B[src/tokens/tokens.json]
    B -->|node scripts/generate-css-variables.js| C[src/tokens/css-variables.css]
    C -->|@import| D[src/beercss/customizations/khipu-tokens.css]
    C -->|./gradlew copyTokensCSS| E[grails/src/main/resources/css/kds-tokens.css]
    D -->|npm run beercss:build| F[dist/beercss/khipu-beercss.min.css]
```

### **Paso a Paso:**

1. **Editar tokens** en `src/tokens/index.ts`
2. **Exportar a JSON**: `npm run tokens:export`
   - Genera `tokens.json`
3. **Generar CSS Variables**: `node scripts/generate-css-variables.js`
   - Genera `css-variables.css`
4. **Build BeerCSS**: `npm run beercss:build`
   - Bundlea `khipu-tokens.css` → `dist/beercss/khipu-beercss.min.css`
5. **[Opcional] Sincronizar Grails**: `cd grails && ../android/gradlew copyTokensCSS`
   - Copia `css-variables.css` → `grails/.../kds-tokens.css`

### **Comandos Disponibles:**

```bash
# Regenerar TODOS los tokens (TypeScript, CSS, Kotlin, Swift)
npm run tokens:generate

# Solo regenerar CSS (más rápido)
npm run tokens:export && node scripts/generate-css-variables.js

# Verificar sincronización de archivos
npm run tokens:verify

# Build completo del design system
npm run build
```

**💡 Tip:** Ejecuta `npm run tokens:verify` antes de hacer commit para asegurar que todos los archivos estén sincronizados.

---

## ⚠️ Reglas Importantes

### ✅ **DO:**
- Editar solo `src/tokens/index.ts`
- Correr `npm run tokens:generate` después de cambios
- Verificar cambios en `css-variables.css` antes de commit
- Usar comandos npm para regenerar

### ❌ **DON'T:**
- **NUNCA** editar `tokens.json` manualmente
- **NUNCA** editar `css-variables.css` manualmente
- **NUNCA** editar valores en `khipu-tokens.css` (solo mapeos)
- No hacer commits con archivos autogenerados desincronizados

---

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

## 🔍 Troubleshooting

### ❓ **Los cambios en `index.ts` no se reflejan**

1. Verifica que ejecutaste `npm run tokens:export`:
   ```bash
   npm run tokens:export
   ```

2. Verifica timestamp en `tokens.json` (debe ser reciente):
   ```bash
   ls -la src/tokens/tokens.json
   ```

3. Regenera CSS variables:
   ```bash
   node scripts/generate-css-variables.js
   ```

4. Rebuild BeerCSS:
   ```bash
   npm run beercss:build
   ```

### ❓ **Archivos autogenerados desincronizados**

Verifica timestamps:
```bash
ls -la src/tokens/*.{ts,json,css}
```

Si `css-variables.css` está desactualizado:
```bash
npm run tokens:generate
```

### ❓ **Grails tiene tokens antiguos**

El archivo `grails/src/main/resources/css/kds-tokens.css` se sincroniza solo cuando ejecutas Gradle:

```bash
cd grails
../android/gradlew copyTokensCSS

# O build completo
../android/gradlew build
```

### ❓ **¿Necesito sincronizar Grails?**

**Solo si** estás usando el TagLib de Grails que referencia `kds-tokens.css`.

**Si usas BeerCSS** (vía CDN o bundler), el archivo en Grails NO se usa y puede ignorarse.

---

## 📊 Verificación de Sincronización

```bash
# Ver timestamps de todos los archivos de tokens
find src/tokens grails/src/main/resources/css -name "*.css" -o -name "*.json" -o -name "index.ts" | xargs ls -la

# Comparar contenido (deben ser casi idénticos excepto header)
diff src/tokens/css-variables.css grails/src/main/resources/css/kds-tokens.css
```

---

## Referencias

- [Material-UI Dark Mode](https://mui.com/material-ui/customization/dark-mode/)
- [Figma Variables Documentation](https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma)
- Archivo Figma: **Pagos Automáticos - MUI v610**
- [BeerCSS Framework](https://www.beercss.com/)
