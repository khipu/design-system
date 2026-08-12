# Tokens de Diseño - Guía Completa

Guía completa del sistema de tokens de diseño del Sistema de Diseño Khipu, incluyendo flujo de actualización y generación multi-plataforma.

---

## 🎯 Resumen Rápido

| ¿Qué se edita manualmente? | ¿Qué se auto-genera? |
|---------------------------|---------------------|
| **Solo 1 archivo:** `src/tokens/index.ts` | ✅ `tokens.json` |
| | ✅ `css-variables.css` |
| | ✅ `android/.../KdsTokens.kt` |

**Comando único:** `npm run tokens:generate` (regenera todo después de editar tokens)

---

## Fuente de Verdad: `src/tokens/index.ts`

Los tokens de diseño se mantienen **manualmente** en el código TypeScript. El archivo `src/tokens/index.ts` es la **única fuente de verdad**.

**Razón:** La API de Figma Variables requiere el scope `file_variables:read` que no está disponible en Personal Access Tokens. Los scripts de sincronización automática fueron removidos porque no podían extraer los datos correctamente.

**Importante:** A partir de `src/tokens/index.ts`, todo lo demás se **auto-genera**:
- ✅ `tokens.json` (exportado desde TypeScript)
- ✅ `css-variables.css` (CSS custom properties)
- ✅ `android/.../KdsTokens.kt` (tokens Android internos)

---

## Flujo de Actualización de Tokens

```
Diseñador actualiza Figma
    ↓
Comunica cambios al equipo de desarrollo
    ↓
Desarrollador actualiza src/tokens/index.ts manualmente
    ↓
npm run tokens:generate  ← Auto-genera todo (JSON, CSS, Android)
    ↓
npm run storybook (verificar visualmente)
```

**Comando completo de generación:**
```bash
npm run tokens:generate
# Ejecuta internamente:
# 1. npm run build (compila TypeScript)
# 2. npm run tokens:export (genera tokens.json)
# 3. node scripts/generate-css-variables.js (genera CSS)
# 4. node scripts/generate-tokens.js (genera KdsTokens.kt interno)
```

---

## Token Generation (Multi-Platform)

**Estado actual de generación de tokens:**

| Plataforma | Archivo Fuente | Archivo Generado | Auto-generado? | Comando |
|------------|----------------|------------------|----------------|---------|
| **Web (React)** | `src/tokens/index.ts` | N/A (usado directamente) | ➖ No aplica | Importación directa |
| **Web (JSON)** | `src/tokens/index.ts` | `src/tokens/tokens.json` | ✅ Sí | `npm run tokens:generate` |
| **Web (CSS)** | `src/tokens/tokens.json` | `src/tokens/css-variables.css` | ✅ Sí | `npm run tokens:generate` |
| **Android (Interno)** | `src/tokens/tokens.json` | `android/.../KdsTokens.kt` | ✅ Sí | `npm run tokens:generate` |
| **Android (Externo)** | `src/tokens/tokens.json` | App externa `/.../.kt` | 🔧 Manual | Ver abajo |

### Pipeline Completo de Generación

```
src/tokens/index.ts (✍️ MANUAL - única fuente de verdad)
        ↓
   npm run build (compila TS → JS)
        ↓
src/tokens/tokens.json (✅ AUTO - exportado desde dist/)
        ↓
        ├→ css-variables.css (✅ AUTO - CSS custom properties)
        └→ android/.../KdsTokens.kt (✅ AUTO - tokens Android internos)
```

**Comando único para regenerar todo:**
```bash
npm run tokens:generate
```

---

## Generar Tokens para Android Externo

Para proyectos Android externos (como `khipu-client-android`), se debe ejecutar el script manualmente:

```bash
# Especificar ruta de salida externa
node scripts/generate-tokens.js --kotlin-output=../khipu-client-android/khipuClient/src/main/java/com/khipu/client/ui/theme/DesignTokens.kt
```

**Salida generada:**
```kotlin
// KdsColors, KdsColorsDark, KdsSpacing, KdsTypography, KdsBorderRadius, KdsTransitions
object KdsColors {
    val primaryMain = Color(0xFF4CAF50)
    val primaryLight = Color(0xFF81C784)
    val textPrimary = Color(0xDE000000)  // rgba → ARGB conversion
    // ... 34 propiedades totales
}

object KdsSpacing {
    val space4 = 16.dp  // px → dp conversion
    val cardPaddingX = 20.dp  // Semantic spacing
    // ... 28 propiedades totales
}
```

---

## ✅ Lo Que Se Auto-Genera

Cuando ejecutas `npm run tokens:generate`, se generan automáticamente:

1. **`src/tokens/tokens.json`** - Exportación JSON desde TypeScript
   - Fuente: `dist/index.js` (compilado desde `src/tokens/index.ts`)
   - Script: `scripts/export-tokens-json.js`

2. **`src/tokens/css-variables.css`** - Variables CSS para web
   - Fuente: `src/tokens/tokens.json`
   - Script: `scripts/generate-css-variables.js`
   - Genera 120+ variables CSS: `--kds-color-primary-main`, `--kds-spacing-4`, etc.

3. **`android/designsystem/.../KdsTokens.kt`** - Tokens Android internos
   - Fuente: `src/tokens/tokens.json`
   - Script: `scripts/generate-tokens.js --kotlin-output=android/...`
   - Genera 7 objetos Kotlin: `KdsColors`, `KdsColorsDark`, `KdsSpacing`, `KdsTypography`, `KdsBorderRadius`, `KdsTransitions`, `KdsBreakpoints`

---

## 🌙 Dark mode — contrato de tema

El dark mode es **opt-in explícito** vía el atributo `data-theme`; nunca se activa solo con la preferencia del sistema operativo (el CSS fija `color-scheme: light` por defecto).

### El contrato

```html
<!-- En <html>, <body>, o cualquier wrapper: todo el subtree se re-tematiza -->
<body data-theme="dark">...</body>
```

- Los valores light viven en `:root {}` y los dark en un bloque `[data-theme="dark"] {}` de `css-variables.css` (auto-generado desde `darkModeColors` en `src/tokens/index.ts`). Solo se overridean **colores**; spacing/tipografía/radii se heredan.
- `color-scheme` pasa a `dark` bajo el atributo (los form controls y scrollbars nativos se oscurecen).
- Los overrides de tokens extendidos (payment-flow) y de componentes en los CSS de BeerCSS usan el selector `body.dark, [data-theme="dark"]`.

### Cómo activarlo

**React** — `KdsThemeProvider` emite el contrato:

```tsx
<KdsThemeProvider mode="dark">
  <App />
</KdsThemeProvider>
```

**HTML plano (BeerCSS/Grails)** — setear el atributo directamente:

```js
document.documentElement.setAttribute('data-theme', 'dark');  // o 'light'
```

**Storybook** — el toggle sol/luna de la toolbar (addon `@vueless/storybook-dark-mode`); el decorator y el `DocsContainer` de `.storybook/preview.tsx` propagan `data-theme` a html/body.

### Reglas al escribir CSS de componentes

1. **Siempre `var(--kds-*)`** — un color hardcodeado no se re-tematiza. Las familias que rompen dark: tonos semánticos `*-dark` como texto (usar `--kds-alert-{tipo}-text`), `--kds-color-primary-contrast` asumido blanco (se invierte en dark; para fondos semánticos sólidos usar `--kds-color-{tipo}-contrast`), y grises absolutos (`gray-800/900`) como texto principal (usar `--kds-color-text-primary`).
2. **Overrides dark aditivos** — nunca cambiar el valor light; agregar el override bajo `[data-theme="dark"]` (o `body.dark, [data-theme="dark"]` si compite con el grupo de mapeos BeerCSS, que matchea `body.dark` con especificidad 0,1,1).
3. **Hovers que oscurecen** — en dark deben **aclarar** (`primary-dark` sobre superficie oscura es ilegible; usar `primary-light`).
4. Valores dark nuevos se agregan en `darkModeColors` (`src/tokens/index.ts`) y se regenera con `npm run tokens:generate`.

---

## 📝 Conversiones Automáticas

El script realiza conversiones de formato automáticas:

| Token Type | Input (JSON) | Output (Kotlin) | Ejemplo |
|------------|--------------|-----------------|---------|
| **Color hex** | `"#4CAF50"` | `Color(0xFF4CAF50)` | Hex → ARGB |
| **Color rgba** | `"rgba(0,0,0,0.87)"` | `Color(0xDE000000)` | RGBA → ARGB |
| **Spacing** | `"16px"` | `16.dp` | px → dp |
| **Typography** | `"1rem"` | `16.sp` | rem × 16 → sp |
| **Font weight** | `500` | `const val = 500` | Número → const |

---

## Scripts de Generación Individuales

Si necesitas ejecutar scripts específicos (en lugar del comando completo):

```bash
# 1. Exportar tokens TypeScript a JSON
npm run tokens:export
# Script: scripts/export-tokens-json.js
# Input: dist/index.js (requiere npm run build primero)
# Output: src/tokens/tokens.json

# 2. Generar CSS variables
node scripts/generate-css-variables.js
# Input: src/tokens/tokens.json
# Output: src/tokens/css-variables.css
# Genera: 120+ variables CSS (--kds-*)

# 3. Generar tokens Android (interno)
node scripts/generate-tokens.js --kotlin-output=android/designsystem/src/main/java/com/khipu/designsystem/tokens/KdsTokens.kt
# Input: src/tokens/tokens.json
# Output: android/.../KdsTokens.kt
# Genera: 7 objetos Kotlin (KdsColors, KdsSpacing, etc.)

# 4. Generar tokens Android (externo)
node scripts/generate-tokens.js --kotlin-output=../otro-proyecto/path/DesignTokens.kt
# Para apps Android externas que consumen la librería
```

**Nota:** El comando `npm run tokens:generate` ejecuta todos estos scripts en secuencia automáticamente.

---

## Archivos de Figma de Referencia

| Archivo | File Key | Uso |
|---------|----------|-----|
| **K-Tokens** | `pYoSx3qiEHJqsX8hVKlNkz` | Variables y estilos de diseño |
| **MUI for Figma 7.2.0** | `p8ixWrZXxjCCdYFTFModRL` | Componentes base de MUI |
| **Pagos Instantáneos** | `2ULMAL31GpLbpGEc9SgBD9` | Diseños de implementación |

---

## Integración con Figma (MCP)

El proyecto tiene configurado el servidor MCP de Figma para:
- Tomar screenshots de diseños
- Obtener contexto de diseño para componentes
- Comparar implementación vs diseño

**Limitación:** El MCP tampoco puede acceder a Figma Variables (misma restricción de API).

**Uso recomendado:**
```
"Toma un screenshot del componente Button en Figma"
"Obtén el contexto de diseño para el nodo 123:456"
```

---

## Sincronización de Tokens

### ⚠️ NUNCA edites manualmente:
- `src/tokens/tokens.json`
- `src/tokens/css-variables.css`
- `android/.../KdsTokens.kt`

Estos archivos se sobrescribirán la próxima vez que ejecutes `npm run tokens:generate`.

### Flujo de actualización correcto:

```bash
# 1. SOLO edita el archivo fuente
vim src/tokens/index.ts

# 2. Regenera automáticamente los derivados
npm run tokens:generate

# 3. Verifica que todo compiló correctamente
npm run typecheck
npm run build

# 4. Commit TODOS los archivos generados juntos
git add src/tokens/
git add android/designsystem/src/main/java/com/khipu/designsystem/tokens/KdsTokens.kt
git commit -m "feat(tokens): update color values from Figma

- Update primary purple from #8347AD to #XXXXXX
- Auto-generate JSON, CSS, and Kotlin files
- Verified with typecheck and build"
```

---

## Referencias

- **Generación de tokens:** Ver `scripts/generate-tokens.js`
- **Exportación JSON:** Ver `scripts/export-tokens-json.js`
- **Variables CSS:** Ver `scripts/generate-css-variables.js`
- **Build completo:** Ver [`BUILD_PUBLISHING.md`](BUILD_PUBLISHING.md)
