# Tareas de Unificación del Sistema de Diseño Khipu
## Desglose Detallado para Jira

**Basado en:** [UNIFICATION_PLAN.md](./UNIFICATION_PLAN.md)
**Total Actualizado:** 27 tareas, 147 puntos de historia
**Duración Optimizada:** 10-12 semanas con quick wins (2 devs)

---

## 🚀 Epic 0: Quick Wins (Semana 1)
**Total:** 5 tareas, 12 puntos
**Objetivo:** Demostrar valor inmediato y validar viabilidad técnica

### QW-01: Sincronizar Color Primario Android
**Puntos:** 1
**Prioridad:** Alta (Quick Win)
**Epic:** Quick Wins

**Descripción:**
Cambio mínimo de 2 líneas para sincronizar el color primario de Android con khenshin-web y design-system.

**Criterios de aceptación:**
- [ ] Actualizar `Color.kt`:
  ```kotlin
  val md_theme_light_primary = Color(0xFF8347AD)  // Era: 0xFF7E42A8
  val seed = Color(0xFF8347AD)                     // Era: 0xFF8347B7
  ```
- [ ] Ejecutar `npm run tokens:generate`
- [ ] Build exitoso: `npm run android:build`
- [ ] Test: `npm run android:test`
- [ ] Publicar: `design-system v0.1.1` (patch)
- [ ] Screenshot comparativo Web vs Android (idéntico)
- [ ] Actualizar CHANGELOG.md

**Archivos a modificar:**
- `android/designsystem/src/main/java/com/khipu/client/ui/theme/Color.kt`

**Dependencias:** Ninguna

**Impacto visible:** Botones, headers, links consistentes entre plataformas

---

### QW-02a: Análisis de Temas Web + Android
**Puntos:** 2
**Prioridad:** Crítica (Bloqueante para QW-02b y QW-02c)
**Epic:** Quick Wins

**Descripción:**
Análisis colaborativo de los sistemas de temas en khenshin-web y khipu-client-android para identificar oportunidades de unificación y código a eliminar.

**Objetivo:**
Documentar estrategia de abstracción antes de implementar cambios en ambas plataformas.

**Criterios de aceptación:**

**1. Análisis Web (Dev Web, 4 horas):**
- [ ] Inventario completo de `ThemeCreator.ts` (895 líneas):
  - Funciones que deben moverse al DS
  - Funciones específicas de khenshin-web (mantener)
  - Código duplicado/obsoleto (eliminar)
- [ ] Analizar `ThemeContext.tsx`:
  - Estado dinámico: ¿necesario en DS?
  - Props de customización: ¿cuáles exponer?
- [ ] Analizar `spacing.ts`:
  - ¿Ya está en tokens del DS? → Eliminar
  - ¿Valores únicos de khenshin-web? → Documentar

**2. Análisis Android (Dev Android, 4 horas):**
- [ ] Inventario completo de `KhipuTheme` (SDK):
  - Funciones `applyColorsToLightScheme`, etc.
  - Customización dinámica (`KhipuColors?` param)
  - Diferencia con `KdsTheme` del DS
- [ ] Analizar `Color.kt`:
  - ¿Qué colores eliminar? (usar KdsColors)
  - ¿Qué colores mantener temporalmente?
- [ ] Analizar `Dimens.kt`:
  - 30+ valores arbitrarios → Migrar a KdsSpacing
  - Identificar valores únicos del SDK

**3. Identificar Unificación (Ambos devs, 2 horas):**
- [ ] Crear tabla comparativa:

| Aspecto | Web (ThemeCreator) | Android (KhipuTheme) | DS Actual | Acción |
|---------|-------------------|---------------------|-----------|--------|
| Color primario | Dynamic prop | Dynamic param | Fixed | Añadir dynamic al DS |
| Espaciado | spacing.ts | Dimens.kt | KdsSpacing | Eliminar locales |
| Typography | Hardcoded | khipuTypography | KdsTypography | Usar DS |
| Dark mode | Manual | Automático | Automático | Standarizar |

- [ ] Listar código a **eliminar**:
  ```
  Web:
  - src/themes/ThemeCreator.ts (795 de 895 líneas)
  - src/themes/spacing.ts (completo, usar DS)

  Android:
  - khipuClient/.../Color.kt (completo, usar KdsColors)
  - khipuClient/.../Dimens.kt (26 de 30 valores, usar KdsSpacing)
  ```

- [ ] Listar código a **mover al DS**:
  ```
  Web → DS:
  - Lógica de augmentColor (dynamic primaryColor)
  - Theme variants calculation

  Android → DS:
  - Customización dinámica (KhipuColors override)
  ```

**4. Documentar Estrategia:**
- [ ] Crear documento: `docs/project/THEME_UNIFICATION_STRATEGY.md`
  - Resumen ejecutivo
  - Código a eliminar (con justificación)
  - Código a mover al DS
  - Estrategia de migración (feature flags, rollback)
  - Estimación de impacto (líneas eliminadas, riesgo)

**Deliverables:**
- Documento: `docs/project/THEME_UNIFICATION_STRATEGY.md`
- Tabla comparativa
- Lista de código a eliminar/mover

**Dependencias:** QW-01 (color sincronizado)

**Duración:** 1 día (8 horas)

**Owners:** Dev Web + Dev Android (colaborativo)

**Impacto:** Base sólida para QW-02b y QW-02c, evita retrabajo

---

### QW-02b: Implementar ThemeProvider Web
**Puntos:** 3
**Prioridad:** Crítica
**Epic:** Quick Wins

**Descripción:**
Implementar `KhipuThemeProvider` en el design-system y migrar khenshin-web para usarlo, basándose en la estrategia de QW-02a.

**Criterios de aceptación:**

**1. Crear en design-system:**
- [ ] `src/theme/KhipuThemeProvider.tsx`:
  ```typescript
  export interface KhipuThemeProps {
    primaryColor?: string  // Dynamic color (de QW-02a)
    theme?: 'light' | 'dark'
    children: React.ReactNode
  }

  export function KhipuThemeProvider({
    primaryColor = '#8347AD',
    theme = 'light',
    children
  }: KhipuThemeProps) {
    const muiTheme = createKhipuTheme({ primaryColor, mode: theme })
    return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
  }
  ```
- [ ] `src/theme/createKhipuTheme.ts`:
  - Migrar lógica de `augmentColor` de ThemeCreator
  - Usar tokens del DS (no hardcoded)
  - Calcular variants (light/dark) automáticamente
- [ ] Tests: `src/theme/KhipuThemeProvider.test.tsx`
- [ ] Storybook: `src/stories/theme/ThemeProvider.stories.tsx`

**2. Migrar khenshin-web:**
- [ ] Instalar `@khipu/design-system@0.2.0`
- [ ] Implementar feature flag en `src/App.tsx`:
  ```typescript
  import { KhipuThemeProvider } from '@khipu/design-system'

  const USE_DS_THEME = process.env.REACT_APP_USE_DS_THEME === 'true'

  function App() {
    return USE_DS_THEME ? (
      <KhipuThemeProvider primaryColor="#8347AD" theme="light">
        {/* content */}
      </KhipuThemeProvider>
    ) : (
      <CustomThemeProvider>{/* actual */}</CustomThemeProvider>
    )
  }
  ```
- [ ] `.env.development`: `REACT_APP_USE_DS_THEME=false` (default)
- [ ] `.env.staging`: `REACT_APP_USE_DS_THEME=true` (testing)

**3. Deprecar (no eliminar aún):**
- [ ] Añadir warning en `ThemeCreator.ts`:
  ```typescript
  /** @deprecated Usar KhipuThemeProvider del design-system */
  export default function createCustomTheme() {
    console.warn('ThemeCreator deprecated, usar @khipu/design-system')
    // ... código existente
  }
  ```
- [ ] Añadir comentario en `spacing.ts`:
  ```typescript
  /** @deprecated Migrado a design-system/tokens */
  ```

**4. Testing:**
- [ ] Tests pass: `npm run test`
- [ ] Build exitoso: `npm run build`
- [ ] Deploy a staging con flag `true`
- [ ] No regresiones visuales (comparar con flag `false`)
- [ ] Documentar diferencias encontradas

**Archivos a crear (design-system):**
- `src/theme/KhipuThemeProvider.tsx`
- `src/theme/createKhipuTheme.ts`
- `src/theme/index.ts`
- `src/theme/KhipuThemeProvider.test.tsx`
- `src/stories/theme/ThemeProvider.stories.tsx`

**Archivos a modificar (khenshin-web):**
- `src/App.tsx`
- `.env.development`
- `.env.staging`
- `src/themes/ThemeCreator.ts` (deprecation warning)

**Dependencias:** QW-02a (análisis completo)

**Duración:** 3 días

**Owner:** Dev Web

**Impacto:** khenshin-web puede usar componentes DS sin conflictos

---

### QW-02c: Migrar Android SDK a KdsTheme
**Puntos:** 3
**Prioridad:** Crítica
**Epic:** Quick Wins

**Descripción:**
Migrar khipu-client-android SDK para usar `KdsTheme` del design-system en lugar de su propio `KhipuTheme`, basándose en la estrategia de QW-02a.

**Criterios de aceptación:**

**1. Analizar KdsTheme actual del DS:**
- [ ] Revisar `design-system/android/.../theme/Theme.kt`
- [ ] Verificar si soporta customización dinámica (necesaria para SDK)
- [ ] Si no, extender `KdsTheme` para aceptar parámetros dinámicos:
  ```kotlin
  @Composable
  fun KdsTheme(
      themeMode: KdsThemeMode = KdsThemeMode.SYSTEM,
      colorOverrides: KdsColorOverrides? = null,  // Nuevo
      content: @Composable () -> Unit
  )
  ```

**2. Migrar SDK a usar KdsTheme:**
- [ ] Actualizar `khipuClient/build.gradle`:
  ```gradle
  dependencies {
      implementation("com.khipu:design-system:0.1.1")
  }
  ```
- [ ] Reemplazar en vistas del SDK:
  ```kotlin
  // ANTES
  KhipuTheme(theme = options.theme, colors = colors) {
      // content
  }

  // DESPUÉS
  KdsTheme(
      themeMode = options.theme.toKdsThemeMode(),
      colorOverrides = colors?.toKdsColorOverrides()
  ) {
      // content
  }
  ```
- [ ] Crear funciones de conversión si es necesario:
  ```kotlin
  fun KhipuOptions.Theme.toKdsThemeMode(): KdsThemeMode
  fun KhipuColors.toKdsColorOverrides(): KdsColorOverrides
  ```

**3. Eliminar código obsoleto:**
- [ ] **Eliminar completamente** (según QW-02a):
  - `khipuClient/.../theme/Color.kt` → Usar `KdsColors`
  - `khipuClient/.../theme/Dimens.kt` (26/30 valores) → Usar `KdsSpacing`
- [ ] **Deprecar** (mantener temporalmente):
  - `khipuClient/.../theme/Theme.kt` (KhipuTheme):
    ```kotlin
    /** @deprecated Usar KdsTheme del design-system */
    @Deprecated("Usar KdsTheme", ReplaceWith("KdsTheme"))
    @Composable
    fun KhipuTheme(...) {
        // Wrapper temporal que llama a KdsTheme
        KdsTheme(...) { content() }
    }
    ```

**4. Testing:**
- [ ] Tests pass: `./gradlew test`
- [ ] Build exitoso: `./gradlew assembleRelease`
- [ ] Probar en demo app
- [ ] Comparación visual con versión anterior:
  - Screenshots antes/después
  - Verificar que se ve idéntico

**Archivos a modificar (khipuClient):**
- `build.gradle` (añadir dependencia DS)
- Todas las vistas que usan `KhipuTheme` (~10-15 archivos)

**Archivos a eliminar (khipuClient):**
- `src/main/java/com/khipu/client/ui/theme/Color.kt`
- Parcialmente: `src/main/java/com/khipu/client/ui/theme/Dimens.kt`

**Archivos a deprecar:**
- `src/main/java/com/khipu/client/ui/theme/Theme.kt`

**Dependencias:** QW-02a (análisis completo)

**Duración:** 2 días

**Owner:** Dev Android

**Impacto:** SDK usa tema unificado, código más limpio (-200 líneas)

---

### QW-03: Validar KdsButton en Producción
**Puntos:** 3
**Prioridad:** Alta
**Epic:** Quick Wins

**Descripción:**
Probar que componentes del DS funcionan en producción real con KdsButton en archivos críticos de khenshin-web.

**Estrategia:** Migración parcial (no todo el proyecto), solo 10-15 botones.

**Criterios de aceptación:**
- [ ] Instalar `@khipu/design-system@latest` en khenshin-web
- [ ] Activar feature flag: `REACT_APP_USE_DS_THEME=true`
- [ ] Reemplazar `<Button>` con `<KdsButton>` en archivos:
  - `src/views/PaymentView.tsx` (~5 botones)
  - `src/components/BankList.tsx` (~3 botones)
  - `src/views/LoginView.tsx` (~2 botones)
- [ ] Tests pass: `npm run test`
- [ ] Build exitoso: `npm run build`
- [ ] Deploy a staging
- [ ] QA manual: Probar flujo completo
- [ ] No regresiones visuales
- [ ] Documentar feedback en `docs/project/QW03_FEEDBACK.md`:
  - ¿API de KdsButton es intuitiva?
  - ¿Hay props faltantes?
  - ¿Performance ok?

**Archivos khenshin-web a modificar:**
- `src/views/PaymentView.tsx`
- `src/components/BankList.tsx`
- `src/views/LoginView.tsx`

**Dependencias:** QW-02b (ThemeProvider Web implementado)

**Impacto visible:** PM ve botones mejorados en staging, validación técnica completa

---

**📊 Resultados de Epic 0:**
- **Duración:** 1 semana (5-6 días de trabajo)
- **Puntos:** 12
- **Tareas:** 5 (QW-01, QW-02a/b/c, QW-03)
- **Releases:**
  - `v0.1.1` (color primario sincronizado)
  - `v0.2.0` (ThemeProvider Web + Android)
- **Código eliminado:** ~300-400 líneas (Color.kt, Dimens.kt parcial, spacing.ts)
- **Validación:**
  - ✅ Componentes DS funcionan en producción
  - ✅ Temas unificados Web + Android
  - ✅ Análisis técnico completo
- **Decisión:** Go/No-go para plan completo

---

**Timeline Epic 0 (Semana 1):**
```
Día 1: QW-01 (Color Android) + QW-02a (Análisis ambos temas)
Día 2-4: QW-02b (Web) en paralelo con QW-02c (Android)
Día 5-6: QW-03 (Validar KdsButton)
```

---

## 📦 Epic 1: Sincronización de Tokens
**Total:** 4 tareas, 16 puntos

### UNIF-01: Auditoría de tokens khenshin-web
**Puntos:** 3
**Prioridad:** Alta
**Epic:** Sincronización de Tokens

**Descripción:**
Realizar una auditoría completa de los tokens de diseño en khenshin-web para documentar la fuente de verdad que se migrará al design-system.

**Criterios de aceptación:**
- [ ] Extraer todos los valores de color de `ThemeCreator.ts`
- [ ] Documentar valores de tipografía (fontFamily, weights, sizes)
- [ ] Extraer valores de espaciado de `spacing.ts`
- [ ] Documentar borderRadius y shapes
- [ ] Extraer definiciones de sombras/elevations
- [ ] Crear tabla comparativa: khenshin-web vs design-system actual
- [ ] Identificar gaps y discrepancias (ej: #3CB4E5 vs #8347AD)
- [ ] Documento en `docs/project/TOKEN_AUDIT.md`

**Archivos clave:**
- `/Users/fortunatoherrerakhipu/Code/khenshin-web/src/themes/ThemeCreator.ts`
- `/Users/fortunatoherrerakhipu/Code/khenshin-web/src/themes/spacing.ts`
- `design-system/src/tokens/index.ts` (para comparación)

**Dependencias:** Ninguna

---

### UNIF-02: Actualizar tokens del design-system
**Puntos:** 5
**Prioridad:** Alta
**Epic:** Sincronización de Tokens

**Descripción:**
Migrar los tokens de khenshin-web al design-system como fuente de verdad centralizada. Regenerar archivos derivados para todas las plataformas.

**Criterios de aceptación:**
- [ ] Actualizar `src/tokens/index.ts` con valores de khenshin-web:
  - Colores: `#3CB4E5` (primario), `#BC25D5` (secundario)
  - Tipografía: Public Sans con valores exactos
  - Espaciado: 11 valores (0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96)
  - Border radius por componente
  - Sombras: 25 niveles (0-24)
- [ ] Ejecutar `npm run tokens:generate`
- [ ] Verificar generación correcta:
  - `tokens.json` (React)
  - `css-variables.css` (Web)
  - `KdsTokens.kt` (Android)
- [ ] Actualizar documentación en Storybook (`src/stories/tokens/`)
- [ ] Deprecar referencias a `#8347AD` en código
- [ ] Tests pass: `npm run test`

**Archivos a modificar:**
- `src/tokens/index.ts`
- `src/stories/tokens/*.stories.tsx`

**Dependencias:** UNIF-01

---

### UNIF-03: Validación cross-platform de tokens
**Puntos:** 3
**Prioridad:** Alta
**Epic:** Sincronización de Tokens

**Descripción:**
Crear herramientas de validación visual para asegurar que los tokens se renderizan idénticamente en Web y Android.

**Criterios de aceptación:**
- [ ] Crear página Storybook "Tokens/Comparison"
  - Mostrar todos los colores lado a lado
  - Mostrar escala tipográfica completa
  - Mostrar escala de espaciado
  - Mostrar border radius en componentes de ejemplo
  - Mostrar elevations/sombras
- [ ] Actualizar demo app Android para mostrar tokens
- [ ] Inspeccionar visualmente:
  - Chrome DevTools (Web)
  - Android Emulator
- [ ] Documentar discrepancias encontradas
- [ ] Ajustar tokens si es necesario hasta lograr paridad visual 100%
- [ ] Screenshots de comparación en `docs/project/tokens-comparison/`

**Archivos a crear:**
- `src/stories/tokens/Comparison.stories.tsx`
- `android/demo/src/main/java/com/khipu/designsystem/demo/TokensScreen.kt`

**Dependencias:** UNIF-02

---

### UNIF-04: Actualizar tema Android con nuevos tokens
**Puntos:** 5
**Prioridad:** Alta
**Epic:** Sincronización de Tokens

**Descripción:**
Sincronizar el tema Android (Material 3) con los tokens actualizados del design-system.

**Criterios de aceptación:**
- [ ] Actualizar `KdsTokens.kt` con nuevos valores (auto-generado)
- [ ] Modificar `Theme.kt`:
  - ColorScheme light/dark con `#3CB4E5` y `#BC25D5`
  - Typography con Public Sans
  - Shapes con border radius sincronizados
- [ ] Probar en demo app Android:
  - KdsButton usa nuevos colores
  - Tipografía se ve idéntica a Web
  - Espaciado consistente
- [ ] Ejecutar tests: `npm run android:test`
- [ ] Build exitoso: `npm run android:build`
- [ ] Screenshots antes/después en PR

**Archivos a modificar:**
- `android/designsystem/src/main/java/com/khipu/designsystem/tokens/KdsTokens.kt` (auto-generado)
- `android/designsystem/src/main/java/com/khipu/designsystem/theme/Theme.kt`

**Dependencias:** UNIF-03

---

## 📦 Epic 2: Componentes Core - Migración khenshin-web
**Total:** 4 tareas, 28 puntos

### UNIF-05: Inventario de componentes core en khenshin-web
**Puntos:** 2
**Prioridad:** Alta
**Epic:** Componentes Core - khenshin-web

**Descripción:**
Identificar todos los usos de componentes core (Button, TextField, Checkbox, Select, etc.) en khenshin-web para planificar la migración.

**Criterios de aceptación:**
- [ ] Buscar usos de componentes MUI en khenshin-web:
  - `<Button>` → contar variantes, props usadas
  - `<TextField>` → inputs, variantes
  - `<Checkbox>`, `<Radio>`, `<Switch>`
  - `<Select>`, `<Autocomplete>`
  - `<Card>`, `<Alert>`, `<Link>`, `<Typography>`
- [ ] Documentar props/variantes únicas:
  - ¿Usa `size="large"` en Button?
  - ¿Usa `variant="filled"` en TextField?
  - ¿Customizaciones específicas?
- [ ] Comparar con API de componentes Kds* actuales
- [ ] Identificar gaps (props faltantes en Kds*)
- [ ] Crear tabla de mapeo: `MUI Component → Kds* Component`
- [ ] Documento en `docs/project/COMPONENT_INVENTORY.md`

**Herramientas:**
- `grep -r "<Button" src/` en khenshin-web
- `grep -r "<TextField" src/`
- Storybook del DS para ver API actual

**Dependencias:** UNIF-04

---

### UNIF-06: Extender componentes Kds* según necesidades
**Puntos:** 8
**Prioridad:** Alta
**Epic:** Componentes Core - khenshin-web

**Descripción:**
Añadir props y variantes faltantes a los componentes Kds* del design-system para asegurar compatibilidad 100% con el uso actual en khenshin-web.

**Criterios de aceptación:**
- [ ] KdsButton:
  - Añadir `size="large"` si no existe
  - Añadir cualquier variante faltante
  - Asegurar `startIcon`, `endIcon` funcionan
- [ ] KdsTextField:
  - Soporte para `variant="filled"`, `variant="standard"`
  - Props de validación (error, helperText)
  - Multiline support
- [ ] KdsSelect:
  - Soporte para opciones complejas
  - Multiple select
- [ ] KdsCheckbox, KdsLink, KdsCard, KdsAlert:
  - Añadir props según inventario
- [ ] Tests para nuevas props: `npm run test`
- [ ] Storybook stories actualizadas
- [ ] Types/interfaces actualizadas

**Archivos a modificar:**
- `src/components/core/KdsButton.tsx`
- `src/components/core/KdsTextField.tsx`
- `src/components/core/KdsSelect.tsx`
- (Otros según inventario)

**Dependencias:** UNIF-05

---

### UNIF-07: Migrar componentes core en khenshin-web (Fase A-D)
**Puntos:** 13
**Prioridad:** Alta
**Epic:** Componentes Core - khenshin-web

**Descripción:**
Reemplazar gradualmente los componentes MUI en khenshin-web con componentes Kds* del design-system.

**Sub-tareas:**
- **Fase A: Buttons (3 pts)**
  - Reemplazar `<Button>` con `<KdsButton>`
  - ~20-30 archivos estimados
- **Fase B: TextFields (3 pts)**
  - Reemplazar `<TextField>` con `<KdsTextField>`
  - ~15-25 archivos estimados
- **Fase C: Selects, Checkboxes (3 pts)**
  - Reemplazar `<Select>` → `<KdsSelect>`
  - Reemplazar `<Checkbox>` → `<KdsCheckbox>`
- **Fase D: Cards, Alerts, Links (4 pts)**
  - Reemplazar componentes restantes

**Criterios de aceptación (por fase):**
- [ ] Instalar `@khipu/design-system` en khenshin-web
- [ ] Importar componentes: `import { KdsButton } from '@khipu/design-system'`
- [ ] Reemplazar componente en archivos identificados
- [ ] Verificar visualmente cada página:
  - Layout intacto
  - Estilos idénticos
  - Interacciones funcionan
- [ ] Tests pass en khenshin-web
- [ ] No regresiones visuales (Chromatic/Percy)
- [ ] PR por fase con screenshots antes/después

**Estrategia:**
- Usar buscar/reemplazar con cuidado
- Probar página por página
- Rollout gradual (feature flags si es necesario)

**Dependencias:** UNIF-06

---

### UNIF-08: Testing y ajustes visuales post-migración
**Puntos:** 5
**Prioridad:** Media
**Epic:** Componentes Core - khenshin-web

**Descripción:**
Validación exhaustiva de la migración de componentes core en khenshin-web, asegurando cero regresiones visuales o funcionales.

**Criterios de aceptación:**
- [ ] Probar todas las páginas de khenshin-web manualmente:
  - Flujo de pago completo
  - Formularios de registro/login
  - Pantallas de resultado
- [ ] Cross-browser testing:
  - Chrome, Firefox, Safari
  - Mobile browsers (iOS Safari, Chrome Android)
- [ ] Ajustar discrepancias de estilos si existen:
  - Padding/margin diferencias
  - Colores ligeramente off
  - Font rendering issues
- [ ] Performance testing:
  - No impacto negativo en LCP, FID, CLS
- [ ] Accesibilidad:
  - Lighthouse score >= 90
  - Screen reader testing
- [ ] Documentar issues encontrados y resolverlos
- [ ] Sign-off de QA y Product

**Herramientas:**
- Lighthouse CI
- Chromatic/Percy (visual regression)
- BrowserStack (cross-browser)

**Dependencias:** UNIF-07

---

## 📦 Epic 3: Componentes de Dominio
**Total:** 6 tareas, 52 puntos

### UNIF-09: Diseñar API de componentes de dominio
**Puntos:** 5
**Prioridad:** Alta
**Epic:** Componentes de Dominio

**Descripción:**
Definir la API pública (props, eventos, estados) de los componentes específicos del dominio de pagos Khipu antes de implementarlos.

**Criterios de aceptación:**
- [ ] Especificar props para cada componente:
  - **BankSelect**: banks[], onSelect, selected, loading, error, etc.
  - **OtpComponent**: length, onComplete, onResend, error, etc.
  - **RutComponent**: value, onChange, error, helperText, etc.
  - **CoordinatesField**: gridSize, values, onComplete, etc.
  - **HeaderComponent**: title, showBack, onBack, actions, etc.
  - **ProgressBar**: currentStep, totalSteps, labels, etc.
- [ ] Crear specs en Figma (colaborar con Design)
- [ ] Documentar comportamiento esperado:
  - Estados: loading, error, success, disabled
  - Validaciones
  - Accesibilidad (ARIA labels, keyboard navigation)
- [ ] Crear ADR (Architecture Decision Record) en `docs/architecture/`
- [ ] Revisar y aprobar con equipo de UX y Engineering

**Deliverables:**
- `docs/architecture/ADR-003-domain-components-api.md`
- Props interface documentadas en cada componente

**Dependencias:** UNIF-04 (tokens sincronizados)

---

### UNIF-10: Implementar componentes de dominio Web (React)
**Puntos:** 13
**Prioridad:** Alta
**Epic:** Componentes de Dominio

**Descripción:**
Implementar los 6 componentes de dominio en React/TypeScript para el design-system, consumiendo componentes Kds* core.

**Sub-tareas:**
- **BankSelect (3 pts)**
  - Lista de bancos con logos
  - Búsqueda/filtrado
  - Estados: loading, error, vacío
- **OtpComponent (3 pts)**
  - N inputs para código OTP
  - Auto-focus, auto-submit
  - Resend button con timer
- **RutComponent (2 pts)**
  - Input con máscara RUT
  - Validación dígito verificador
  - Formato automático
- **CoordinatesField (3 pts)**
  - Grilla de inputs para coordenadas
  - Validación de valores
  - Teclado numérico
- **HeaderComponent (1 pt)**
  - Logo, título, botón back
  - Acciones (close, help)
- **ProgressBar (1 pt)**
  - Stepper con labels
  - Paso actual destacado

**Criterios de aceptación (por componente):**
- [ ] Implementado en `src/components/domain/[Component].tsx`
- [ ] Usa componentes Kds* internamente
- [ ] Props según UNIF-09
- [ ] Tests unitarios: `npm run test`
- [ ] Accesibilidad: ARIA labels, keyboard nav
- [ ] Exportado en `src/components/domain/index.ts`

**Dependencias:** UNIF-09

---

### UNIF-11: Implementar componentes de dominio Android (Compose)
**Puntos:** 13
**Prioridad:** Alta
**Epic:** Componentes de Dominio

**Descripción:**
Implementar los 6 componentes de dominio en Kotlin/Jetpack Compose para el design-system Android, manteniendo paridad con React.

**Sub-tareas:** (Mismas que UNIF-10)
- BankSelect (3 pts)
- OtpComponent (3 pts)
- RutComponent (2 pts)
- CoordinatesField (3 pts)
- HeaderComponent (1 pt)
- ProgressBar (1 pt)

**Criterios de aceptación (por componente):**
- [ ] Implementado en `android/designsystem/src/main/java/com/khipu/designsystem/components/domain/[Component].kt`
- [ ] Usa `@Composable` functions
- [ ] Props equivalentes a versión React
- [ ] Estados manejados con `remember`, `MutableState`
- [ ] `@Preview` annotations para cada estado
- [ ] KDoc documentation
- [ ] Tests: `npm run android:test`

**Ejemplo estructura:**
```kotlin
@Composable
fun BankSelect(
    banks: List<Bank>,
    selectedBank: Bank?,
    onBankSelected: (Bank) -> Unit,
    isLoading: Boolean = false,
    error: String? = null,
    modifier: Modifier = Modifier
) { /* ... */ }
```

**Dependencias:** UNIF-09, UNIF-10 (para mantener paridad)

---

### UNIF-12: Crear stories y documentación de componentes de dominio
**Puntos:** 5
**Prioridad:** Media
**Epic:** Componentes de Dominio

**Descripción:**
Documentar los componentes de dominio en Storybook con ejemplos interactivos y screenshots de Android.

**Criterios de aceptación:**
- [ ] Stories en Storybook para cada componente:
  - `src/stories/components/domain/BankSelect.stories.tsx`
  - States: default, loading, error, success
  - Variantes: con/sin búsqueda, diferentes tamaños de lista
- [ ] Documentación en MDX:
  - Cuándo usar el componente
  - Props API completa
  - Ejemplos de código
  - Consideraciones de accesibilidad
- [ ] Screenshots de Android:
  - Generar desde Previews
  - Incluir en `docs/components/domain/screenshots/`
- [ ] Comparación lado a lado Web ↔ Android
- [ ] Guía de migración: cómo reemplazar componente existente

**Deliverables:**
- Stories en Storybook
- `docs/components/domain/README.md`
- Screenshots en `docs/components/domain/screenshots/`

**Dependencias:** UNIF-10, UNIF-11

---

### UNIF-13: Migrar khenshin-web a componentes de dominio
**Puntos:** 8
**Prioridad:** Alta
**Epic:** Componentes de Dominio

**Descripción:**
Reemplazar las implementaciones locales de componentes de dominio en khenshin-web con las versiones del design-system.

**Criterios de aceptación:**
- [ ] Actualizar `@khipu/design-system` a versión con componentes de dominio
- [ ] Importar componentes:
  ```typescript
  import {
    BankSelect,
    OtpComponent,
    RutComponent,
    CoordinatesField,
    HeaderComponent,
    ProgressBar
  } from '@khipu/design-system/components/domain';
  ```
- [ ] Reemplazar implementaciones locales:
  - Eliminar archivos de componentes duplicados
  - Actualizar imports en páginas/vistas
  - Adaptar props si la API cambió ligeramente
- [ ] Probar flujo de pago end-to-end:
  - Selección de banco funciona
  - OTP se valida correctamente
  - Coordenadas se capturan
  - Header y progress bar se actualizan
- [ ] Tests de integración pass
- [ ] No regresiones visuales (Chromatic)
- [ ] Performance: sin degradación de métricas

**Archivos a eliminar (ejemplos):**
- `src/components/BankSelect.tsx` (si existe)
- `src/components/OtpInput.tsx`
- etc.

**Dependencias:** UNIF-12

---

### UNIF-14: Migrar Android SDK a componentes de dominio
**Puntos:** 8
**Prioridad:** Alta
**Epic:** Componentes de Dominio

**Descripción:**
Reemplazar las implementaciones locales en khipu-client-android (khipuClient module) con componentes del design-system.

**Criterios de aceptación:**
- [ ] Actualizar dependencia `com.khipu:design-system` en `build.gradle`
- [ ] Importar componentes:
  ```kotlin
  import com.khipu.designsystem.components.domain.BankSelect
  import com.khipu.designsystem.components.domain.OtpComponent
  // etc.
  ```
- [ ] Reemplazar componentes en views:
  - `MainButtonComponent` (si aplica)
  - `ListComponent` → `BankSelect`
  - `OtpComponent` (reemplazar implementación local)
  - `RutComponent`, `CoordinatesField`
- [ ] Actualizar ViewModels si la API cambió
- [ ] Probar en demo app:
  - Flujo de pago completo
  - Todos los componentes funcionan
- [ ] Probar en apps integradas (si es posible)
- [ ] Tests: `npm run android:test`
- [ ] Build: `npm run android:build`

**Archivos a modificar:**
- `khipuClient/src/main/java/com/khipu/client/ui/views/*`
- `khipuClient/build.gradle` (dependencias)

**Dependencias:** UNIF-12, UNIF-13 (para validar paridad)

---

## 📦 Epic 4: Pantallas de Resultado
**Total:** 4 tareas, 18 puntos

### UNIF-15: Diseñar pantallas de resultado unificadas
**Puntos:** 3
**Prioridad:** Media
**Epic:** Pantallas de Resultado

**Descripción:**
Crear diseños unificados para las pantallas de resultado (Success, Failure, Warning, Timeout) que se usarán en ambas plataformas.

**Criterios de aceptación:**
- [ ] Definir layout para cada pantalla:
  - Icon (checkmark, error, warning, timeout)
  - Heading (título del resultado)
  - Body text (mensaje descriptivo)
  - Primary action button
  - Secondary action button (opcional)
- [ ] Crear mockups en Figma (colaborar con Design)
- [ ] Definir mensajes de texto (colaborar con Content/UX)
  - Usar guía de voz y tono de `BRAND_GUIDE_FOR_AI.md`
  - Mensajes cercanos, claros, directos
- [ ] Especificar props:
  ```typescript
  interface ResultScreenProps {
    type: 'success' | 'failure' | 'warning' | 'timeout';
    title: string;
    message: string;
    primaryAction: { label: string; onClick: () => void };
    secondaryAction?: { label: string; onClick: () => void };
  }
  ```
- [ ] Revisar con equipo de UX
- [ ] Documento en `docs/components/domain/result-screens-spec.md`

**Dependencias:** UNIF-04 (tokens sincronizados)

---

### UNIF-16: Implementar pantallas de resultado en Web
**Puntos:** 5
**Prioridad:** Media
**Epic:** Pantallas de Resultado

**Descripción:**
Implementar los 4 componentes de pantallas de resultado en React para el design-system.

**Criterios de aceptación:**
- [ ] Crear componentes:
  - `SuccessScreen.tsx`
  - `FailureScreen.tsx`
  - `WarningScreen.tsx`
  - `TimeoutScreen.tsx`
- [ ] O un componente genérico `ResultScreen` con prop `type`
- [ ] Usar componentes Kds* internamente:
  - `<KdsTypography>` para títulos y texto
  - `<KdsButton>` para acciones
  - Iconos de `@mui/icons-material`
- [ ] Layout responsivo (mobile-first)
- [ ] Accesibilidad:
  - ARIA roles (`role="alert"` para errores)
  - Focus management en primary action
- [ ] Stories en Storybook con casos de uso reales
- [ ] Tests: `npm run test`
- [ ] Exportar en `src/components/domain/index.ts`

**Archivos a crear:**
- `src/components/domain/ResultScreen.tsx` (o 4 archivos separados)
- `src/stories/components/domain/ResultScreen.stories.tsx`

**Dependencias:** UNIF-15

---

### UNIF-17: Implementar pantallas de resultado en Android
**Puntos:** 5
**Prioridad:** Media
**Epic:** Pantallas de Resultado

**Descripción:**
Implementar los 4 componentes de pantallas de resultado en Kotlin/Compose, manteniendo paridad con React.

**Criterios de aceptación:**
- [ ] Crear composables:
  - `SuccessScreen.kt`
  - `FailureScreen.kt`
  - `WarningScreen.kt`
  - `TimeoutScreen.kt`
- [ ] O un composable genérico `ResultScreen` con parámetro `type`
- [ ] Usar componentes del DS:
  - `KdsText` (o Material 3 Text con tema DS)
  - `KdsButton`
  - Icons de Material
- [ ] Layout responsivo (adaptable a tablets)
- [ ] Accesibilidad:
  - `contentDescription` en iconos
  - Semantic properties
- [ ] `@Preview` annotations
- [ ] Tests: `npm run android:test`

**Ejemplo:**
```kotlin
@Composable
fun ResultScreen(
    type: ResultType,
    title: String,
    message: String,
    primaryAction: ActionButton,
    secondaryAction: ActionButton? = null,
    modifier: Modifier = Modifier
) { /* ... */ }
```

**Dependencias:** UNIF-15, UNIF-16 (paridad)

---

### UNIF-18: Integrar pantallas de resultado en ambas apps
**Puntos:** 5
**Prioridad:** Media
**Epic:** Pantallas de Resultado

**Descripción:**
Reemplazar las implementaciones actuales de pantallas de resultado en khenshin-web y Android con las versiones unificadas del design-system.

**Criterios de aceptación:**

**khenshin-web:**
- [ ] Actualizar `@khipu/design-system`
- [ ] Importar componentes:
  ```typescript
  import { ResultScreen } from '@khipu/design-system/components/domain';
  ```
- [ ] Reemplazar pantallas existentes:
  - Success page → `<ResultScreen type="success" />`
  - Error page → `<ResultScreen type="failure" />`
  - etc.
- [ ] Probar todos los flujos que terminan en resultado
- [ ] Ajustar routing si es necesario

**Android:**
- [ ] Actualizar `com.khipu:design-system`
- [ ] Importar composables:
  ```kotlin
  import com.khipu.designsystem.components.domain.ResultScreen
  ```
- [ ] Reemplazar screens en navigation graph
- [ ] Probar navegación a pantallas de resultado
- [ ] Ajustar ViewModel/StateFlow si es necesario

**Validación:**
- [ ] Mismo look & feel en ambas plataformas
- [ ] Mensajes idénticos
- [ ] Acciones funcionan correctamente
- [ ] Screenshots de comparación en PR

**Dependencias:** UNIF-16, UNIF-17

---

## 📦 Epic 5: Gobernanza y Mantenimiento Continuo
**Total:** 4 tareas, 16 puntos

### UNIF-19: Crear guía de contribución al design-system
**Puntos:** 3
**Prioridad:** Media
**Epic:** Gobernanza

**Descripción:**
Documentar el proceso completo para que el equipo contribuya al design-system, desde diseño hasta implementación cross-platform.

**Criterios de aceptación:**
- [ ] Crear `CONTRIBUTING.md` en raíz del repo
- [ ] Documentar flujo:
  1. Diseño en Figma (equipo de Design)
  2. Actualizar khenshin-web (implementación de referencia)
  3. Extraer a design-system (tokens + componentes)
  4. Implementar en Android (paridad)
  5. Testing y validación
  6. Release coordinado
- [ ] Definir responsabilidades por rol:
  - **Design**: Mantener Figma como fuente de verdad
  - **Frontend (Web)**: Implementar en khenshin-web primero
  - **Design System Team**: Abstraer a DS, implementar Android/iOS
  - **QA**: Validar paridad visual y funcional
- [ ] Templates de PR:
  - Nuevo componente
  - Actualización de tokens
  - Breaking change
- [ ] Checklist de PR:
  - [ ] Implementado en Web y Android
  - [ ] Tests pass en ambas plataformas
  - [ ] Storybook stories creadas
  - [ ] Documentación actualizada
  - [ ] Visual regression tests pass
  - [ ] Changelog actualizado
- [ ] Code review guidelines
- [ ] Release process (ver UNIF-22)

**Deliverables:**
- `CONTRIBUTING.md`
- `.github/PULL_REQUEST_TEMPLATE/new-component.md`
- `.github/PULL_REQUEST_TEMPLATE/token-update.md`

**Dependencias:** Ninguna (puede hacerse en paralelo)

---

### UNIF-20: Configurar visual regression testing
**Puntos:** 5
**Prioridad:** Alta
**Epic:** Gobernanza

**Descripción:**
Implementar testing automatizado de regresiones visuales para detectar divergencias entre plataformas y cambios no intencionales.

**Criterios de aceptación:**

**Web (Chromatic o Percy):**
- [ ] Integrar Chromatic en design-system repo
- [ ] Configurar build de Storybook en CI
- [ ] Capturar snapshots de todos los componentes
- [ ] Configurar baseline en main branch
- [ ] PR checks: alertar si hay cambios visuales
- [ ] Configurar thresholds (ej: diferencia >2% requiere review)

**Android (Paparazzi o Shot):**
- [ ] Integrar Paparazzi para screenshot testing
- [ ] Capturar snapshots de `@Preview` en CI
- [ ] Guardar snapshots en repo o artifact storage
- [ ] Comparar con baseline en PRs
- [ ] Alertar si hay diferencias

**Comparación Cross-Platform:**
- [ ] Script para comparar screenshots Web vs Android
- [ ] Dashboard visual (página Storybook o herramienta externa)
- [ ] Alertar en PR si divergencia >threshold

**CI Integration:**
- [ ] `.github/workflows/visual-regression.yml`
- [ ] Ejecutar en cada PR
- [ ] Bloquear merge si hay regresiones no aprobadas

**Dependencias:** UNIF-10, UNIF-11 (componentes implementados)

---

### UNIF-21: Dashboard de sincronización de tokens
**Puntos:** 5
**Prioridad:** Baja
**Epic:** Gobernanza

**Descripción:**
Crear un dashboard visual en Storybook que muestre el estado de sincronización de tokens y componentes entre plataformas.

**Criterios de aceptación:**
- [ ] Crear página Storybook: "Status/Sync Dashboard"
- [ ] Sección: **Token Sync Status**
  - Tabla: Token | khenshin-web | design-system | Android | Status
  - Status: ✅ Sincronizado | ⚠️ Divergente | ❌ Faltante
  - Colores, tipografía, espaciado, shadows
- [ ] Sección: **Component Coverage**
  - Tabla: Component | Web (DS) | Android (DS) | khenshin-web usage | Android usage
  - Indicadores: ✅ Implementado | 🚧 En progreso | ❌ Faltante
- [ ] Sección: **Recent Changes**
  - Últimos 10 commits que afectaron tokens o componentes
  - Links a PRs
- [ ] Auto-generado desde:
  - Parsing de `src/tokens/index.ts`
  - Parsing de archivos de componentes
  - Git log
- [ ] Script: `npm run generate:sync-dashboard`
- [ ] Ejecutar en CI y deployar con Storybook

**Deliverables:**
- `src/stories/status/SyncDashboard.stories.tsx`
- `scripts/generate-sync-dashboard.js`

**Dependencias:** UNIF-03 (tokens validados)

---

### UNIF-22: Proceso de release coordinado
**Puntos:** 3
**Prioridad:** Media
**Epic:** Gobernanza

**Descripción:**
Definir y documentar el proceso de release coordinado del design-system para asegurar que todas las plataformas se actualicen en lockstep.

**Criterios de aceptación:**
- [ ] Documentar en `docs/RELEASE_PROCESS.md`:
  1. **Preparación:**
     - Verificar que todos los tests pasan (Web, Android, iOS)
     - Verificar visual regression tests
     - Actualizar `CHANGELOG.md` con cambios
     - Revisar que tokens estén sincronizados
  2. **Versionado:**
     - Usar semver: MAJOR.MINOR.PATCH
     - Breaking changes → MAJOR
     - Nuevos componentes → MINOR
     - Bug fixes → PATCH
     - Sincronizar versión en todas las plataformas:
       - `package.json` (Web)
       - `android/designsystem/build.gradle` (Android)
       - `KhipuDesignSystem.podspec` (iOS)
       - `grails/gradle.properties` (Grails)
  3. **Release:**
     - Crear tag: `git tag v0.2.0`
     - Push tag: `git push origin v0.2.0`
     - CI publica automáticamente:
       - npm (Web)
       - Nexus (Android + Grails)
       - CocoaPods (iOS)
  4. **Post-Release:**
     - Actualizar dependencias en apps consumidoras:
       - khenshin-web: `npm update @khipu/design-system`
       - Android: actualizar versión en `build.gradle`
     - Probar en staging
     - Deploy a producción
     - Anunciar en Slack/email
- [ ] Crear script: `./scripts/sync-version.sh 0.2.0`
  - Actualiza versión en todos los archivos
  - Crea commit + tag
- [ ] Automatizar con GitHub Actions (ya existe `publish.yml`)
- [ ] Definir calendario de releases (ej: bi-weekly, mensual)
- [ ] Template de release notes en GitHub

**Deliverables:**
- `docs/RELEASE_PROCESS.md`
- `scripts/sync-version.sh` (actualizar existente)
- `.github/workflows/publish.yml` (revisar/mejorar)

**Dependencias:** UNIF-19 (guía de contribución)

---

## 📊 Resumen por Epic (Actualizado)

| Epic | # Tareas | IDs | Puntos Totales | Duración Estimada |
|------|----------|-----|----------------|-------------------|
| **Epic 0: Quick Wins** ⭐ | 5 | QW-01, QW-02a/b/c, QW-03 | 12 pts | 1 semana |
| **Epic 1: Sincronización de Tokens** | 4 | UNIF-01 a UNIF-04 | 16 pts | 1-2 semanas |
| **Epic 2: Componentes Core - khenshin-web** | 4 | UNIF-05 a UNIF-08 | 28 pts | 2-3 semanas |
| **Epic 3: Componentes de Dominio** | 6 | UNIF-09 a UNIF-14 | 52 pts | 4-5 semanas |
| **Epic 4: Pantallas de Resultado** | 4 | UNIF-15 a UNIF-18 | 18 pts | 2 semanas |
| **Epic 5: Gobernanza** | 4 | UNIF-19 a UNIF-22 | 16 pts | Ongoing |
| **TOTAL** | **27 tareas** | | **142 pts** | **10-12 semanas (2 devs)** |

**Mejoras vs Plan Original:**
- ✅ +5 tareas de quick wins (valor temprano + análisis profundo)
- ✅ +12 puntos (inversión en validación y análisis)
- ✅ -2 semanas timeline (paralelización optimizada)
- ✅ Releases incrementales (v0.1.1, v0.2.0, ... v1.0.0)
- ✅ Análisis técnico antes de implementar (reduce retrabajo)

---

## 🎯 Orden de Ejecución Optimizado (2 Devs)

### Semana 1: Quick Wins ⚡ (Valor Inmediato)
**Objetivo:** Demostrar viabilidad, generar momentum, análisis técnico

| Tarea | Owner | Duración | Impacto |
|-------|-------|----------|---------|
| QW-01: Color primario Android | Dev 2 | 1 día | Visual inmediato |
| QW-02a: Análisis temas | Dev 1 + Dev 2 | 1 día | Base para implementación |
| QW-02b: Implementar Web | Dev 1 | 3 días (paralelo) | ThemeProvider unificado |
| QW-02c: Implementar Android | Dev 2 | 2 días (paralelo) | Migrar a KdsTheme |
| QW-03: Validar KdsButton | Dev 1 | 2 días | Validación técnica |

**Entregable:**
- `v0.1.1` (color)
- `v0.2.0` (ThemeProvider Web + Android)
- Documento de análisis técnico
- ~300-400 líneas de código eliminadas

**Decisión:** Go/No-go para plan completo

---

### Semana 2-3: Fundación - Tokens Completos
**Objetivo:** Base sólida de tokens sincronizados

| Tarea | Owner | Duración |
|-------|-------|----------|
| UNIF-01: Auditoría tokens | Dev 1 | 3 días |
| UNIF-02: Actualizar tokens DS | Dev 1 | 5 días |
| UNIF-03: Validación cross-platform | Dev 1 + Dev 2 | 3 días |
| UNIF-04: Tema Android | Dev 2 | 5 días (paralelo) |
| UNIF-19: Guía contribución | Dev 2 | 3 días (paralelo) |

**Entregable:** `v0.3.0` (tokens completos)

---

### Semana 4-6: Componentes Core - khenshin-web

### Sprint 3-4: Componentes Core (Web)
6. UNIF-05: Inventario componentes ✅
7. UNIF-06: Extender Kds* ✅
8. UNIF-07: Migrar khenshin-web Fase A-B ✅
9. UNIF-20: Visual regression (paralelo)

### Sprint 5: Componentes Core (Web) - Finalización
10. UNIF-07: Migrar khenshin-web Fase C-D ✅
11. UNIF-08: Testing y ajustes ✅

### Sprint 6-7: Componentes de Dominio - Diseño e Implementación Web
12. UNIF-09: Diseñar API dominio ✅
13. UNIF-10: Implementar dominio Web ✅
14. UNIF-12: Stories y docs (paralelo) ⚠️

### Sprint 8-9: Componentes de Dominio - Android
15. UNIF-11: Implementar dominio Android ✅
16. UNIF-12: Stories y docs (continuar) ✅

### Sprint 10: Migración a Producción
17. UNIF-13: Migrar khenshin-web a dominio ✅
18. UNIF-14: Migrar Android SDK a dominio ✅

### Sprint 11: Pantallas de Resultado
19. UNIF-15: Diseñar result screens ✅
20. UNIF-16: Implementar result screens Web ✅
21. UNIF-17: Implementar result screens Android ✅
22. UNIF-18: Integrar result screens ✅

### Ongoing: Gobernanza
- UNIF-19: Guía de contribución (Sprint 1)
- UNIF-20: Visual regression (Sprint 3-4)
- UNIF-21: Sync dashboard (Sprint 11+)
- UNIF-22: Release process (Sprint 1-2)

---

## 📝 Notas para Creación de Tickets en Jira

**Labels sugeridos:**
- `design-system`
- `unification`
- `tokens`, `components`, `domain`, `governance`
- `web`, `android`, `cross-platform`

**Componentes de Jira:**
- Design System (Web)
- Design System (Android)
- khenshin-web
- khipu-client-android

**Prioridades:**
- Alta: UNIF-01 a UNIF-14 (path crítico)
- Media: UNIF-15 a UNIF-22 (importante pero no bloqueante)

**Estimaciones:**
- 1 pt = ~1 día
- 3 pts = ~3 días (1 semana con overhead)
- 5 pts = ~1 semana (1.5 semanas con overhead)
- 8 pts = ~1.5 semanas (2 semanas con overhead)
- 13 pts = ~2-3 semanas (dividir en sub-tareas si es posible)

**Asignaciones sugeridas:**
- Quick Wins: Dev Web Lead + Dev Android
- Tokens: Design System Team Lead
- Componentes Web: Frontend Engineers
- Componentes Android: Android Engineers
- Gobernanza: Tech Lead / Engineering Manager

---

## 🚀 Pasos a Seguir (Decisión + Ejecución)

### ✅ Paso 1: Revisar y Aprobar Quick Wins (Hoy)

**Decisión necesaria:**
- [ ] ¿Aprobar Epic 0 (Quick Wins) con 3 tareas?
- [ ] ¿Asignar 2 devs (Web + Android)?
- [ ] ¿Budget aprobado (~$3k para Semana 1)?

**Documentos a revisar:**
- Este documento: `UNIFICATION_TASKS.md`
- Plan general: `UNIFICATION_PLAN.md`
- Análisis técnico: `THEME_COMPARISON.md`

---

### ✅ Paso 2: Crear Epic 0 en Jira (1 hora)

**Opción A: Manual**
1. Ir a https://khipucom.atlassian.net/jira/software/projects/KTUF/boards/934
2. Crear Epic: "Quick Wins - Design System Unification"
3. Crear 5 tareas:
   - QW-01: Sincronizar Color Primario Android (1 pt)
   - QW-02a: Análisis de Temas Web + Android (2 pts)
   - QW-02b: Implementar ThemeProvider Web (3 pts)
   - QW-02c: Migrar Android SDK a KdsTheme (3 pts)
   - QW-03: Validar KdsButton en Producción (3 pts)
4. Asignar:
   - Dev Android: QW-01, QW-02a (colabora), QW-02c
   - Dev Web: QW-02a (colabora), QW-02b, QW-03

**Opción B: Automatizado con Claude** 🤖
- Puedo crear los tickets usando el MCP de Jira
- Solo dime: "Crear Epic 0 en Jira"

---

### ✅ Paso 3: Kickoff Meeting (30 min)

**Agenda:**
1. Presentar objetivo de Quick Wins (5 min)
2. Explicar QW-02a/b/c (Análisis + Temas) - crítico (10 min)
   - Por qué análisis primero
   - Código a eliminar (~300-400 líneas)
   - Trabajo en paralelo Web/Android
3. Asignar tareas y aclarar dudas (10 min)
4. Definir daily standup (5 min)

**Participantes:**
- Dev Web Lead
- Dev Android
- Tech Lead / PM (opcional)

**Entregables:**
- Todos entienden el "por qué" del proyecto
- Tareas asignadas claramente
- Horario de daily standup definido

---

### ✅ Paso 4: Ejecución Semana 1 (5-6 días)

**Lunes (Día 1):**
- **Mañana:**
  - Dev Android: QW-01 (sincronizar color) → 4 horas
  - Dev Web: Preparación
- **Tarde (ambos):**
  - QW-02a (análisis temas) → 4 horas colaborativas
  - Entregan: `THEME_UNIFICATION_STRATEGY.md`

**Martes-Jueves (Día 2-4) - EN PARALELO:**
- **Dev Web:** QW-02b (ThemeProvider Web) → 3 días
  - Crear KhipuThemeProvider
  - Feature flag en khenshin-web
  - Testing
- **Dev Android:** QW-02c (migrar a KdsTheme) → 2 días
  - Eliminar Color.kt, Dimens.kt
  - Migrar vistas a KdsTheme
  - Testing

**Jueves-Viernes (Día 5-6):**
- Dev Web: QW-03 (validar KdsButton en staging) → 2 días
- Dev Android: Preparación para UNIF-04 o ayuda con QW-03

**Viernes tarde:**
- Demo de quick wins al equipo
- Mostrar código eliminado (~300-400 líneas)
- Retrospectiva: ¿Funcionó? ¿Qué ajustar?

---

### ✅ Paso 5: Decisión Go/No-Go (Viernes Semana 1)

**Evaluar resultados:**
- [ ] ¿Color sincronizado funciona bien?
- [ ] ¿ThemeProvider resolvió el problema de conflictos?
- [ ] ¿KdsButton se integró sin problemas?
- [ ] ¿El equipo está alineado y motivado?

**Decisión:**
- ✅ **Go:** Continuar con Epic 1-5 (plan completo)
  → Crear 22 tareas restantes en Jira
  → Planning de Semana 2-12

- ⚠️ **Ajustar:** Modificar approach según aprendizajes
  → Documentar cambios necesarios
  → Re-estimar Epic 1-5

- ❌ **No-Go:** Pausar proyecto
  → Documentar razones
  → Proponer alternativas

---

### ✅ Paso 6 (Si Go): Crear Plan Completo en Jira

**Opción A: Manual**
- Crear Epic 1-5
- Crear 22 tareas restantes (UNIF-01 a UNIF-22)
- Usar este documento como referencia

**Opción B: Automatizado con Claude** 🤖
- Puedo crear todas las tareas usando MCP de Jira
- Solo dime: "Crear plan completo en Jira"

---

### ✅ Paso 7 (Si Go): Planning Semanas 2-12

**Definir:**
- Sprint planning cada 2 semanas
- Daily standups (15 min)
- Weekly sync técnico (1 hora)
- Demo + Retrospectiva al final de cada sprint

**Herramientas:**
- Jira (tracking)
- Slack #design-system (comunicación)
- GitHub (PRs, code reviews)
- Storybook (documentación)

---

## 📞 Siguiente Acción Inmediata

**Para empezar HOY:**

1. **Aprobar Quick Wins** → Responde "aprobado" o ajustes necesarios

2. **Asignar devs** → Confirma disponibilidad:
   - Dev Web: ¿Quién? ¿Disponible full-time Semana 1? (5-6 días)
   - Dev Android: ¿Quién? ¿Disponible 4-5 días Semana 1?

3. **Crear tickets** → Elige:
   - [ ] Manual en Jira (5 tareas)
   - [ ] Automatizado (Claude crea con MCP)

**¿Qué acción quieres tomar primero?**

---

**Autor:** Claude Code
**Última actualización:** 2026-03-09
