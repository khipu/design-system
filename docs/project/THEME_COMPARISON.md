# Análisis Comparativo de Temas: khenshin-web vs Android

**Fecha:** 2026-03-09
**Objetivo:** Comparar los sistemas de temas entre khenshin-web y khipu-client-android para identificar discrepancias y planificar la unificación.

---

## 🎨 Colores Primarios - Comparación

### Valores Actuales

| Plataforma | Color Primario | Hex | RGB | Diferencia |
|------------|----------------|-----|-----|------------|
| **khenshin-web** | Púrpura Khipu | `#8347AD` | 131, 71, 173 | ✅ Referencia |
| **design-system** | Púrpura Khipu | `#8347AD` | 131, 71, 173 | ✅ Coincide |
| **Android (primary)** | Púrpura | `#7E42A8` | 126, 66, 168 | ⚠️ Ligeramente diferente |
| **Android (seed)** | Púrpura seed | `#8347B7` | 131, 71, 183 | ⚠️ Muy cercano (+10 en azul) |

### Análisis Visual

La diferencia entre `#8347AD` (Web) y `#7E42A8` (Android) es sutil pero perceptible:
- **Hue (Matiz):** Casi idéntico (~280°)
- **Saturation:** Android ligeramente más saturado
- **Lightness:** Android ligeramente más oscuro (-5 puntos en R, -5 en G, -5 en B)

**Recomendación:** Unificar a `#8347AD` para consistencia de marca exacta.

---

## 📂 Archivos de Configuración de Tema

### khenshin-web

**Ubicación:** `/Users/fortunatoherrerakhipu/Code/khenshin-web/src/themes/`

#### 1. `ThemeContext.tsx` - Configuración Activa

```typescript
const [themeOptions, setThemeOptions] = useState({
    primaryColor: '#8347AD',  // ✅ Púrpura Khipu
    theme: 'light',
})
```

- **Función:** Provider de tema React con estado dinámico
- **Color primario:** `#8347AD` (aplicado en producción)
- **Modo:** Light (con soporte para dark)

#### 2. `ThemeCreator.ts` - Factory de Temas MUI

```typescript
const defaultTheme = {
    primaryColor: '#7548a8',              // Valor por defecto (no usado)
    primaryColorVariant: '#6fb2e2',       // Azul variante
    textColor: '#333333',
    backgroundColor: '#F5F5F5',           // Light mode
    pageBackgroundColor: '#FFFFFF',
    buttonFontColor: '#ffffff',
    disabledFontColor: '#9E9E9E',
    disabledBackgroundColor: '#E0E0E0',
    fontFamily: 'Public Sans',
    theme: 'light',
    headerColor: 'none',
}
```

**Características:**
- Genera tema Material UI completo
- Usa `augmentColor` para derivar light/dark variants automáticamente
- Colores semánticos:
  - Success: `#2CA24D`
  - Warning: `#FF9800`
- Los defaults son sobreescritos por `ThemeContext`

#### 3. `spacing.ts` - Sistema de Espaciado

```typescript
export const SPACING_BASE = 8

export const spacing = {
    '0': 0,
    '0125': 1,    // 0.125x - borders
    '05': 4,      // 0.5x
    '1': 8,       // 1x
    '125': 10,    // 1.25x
    '15': 12,     // 1.5x
    '2': 16,      // 2x
    '25': 20,     // 2.5x
    '3': 24,      // 3x
    '4': 32,      // 4x
    '5': 40,      // 5x
    '6': 48,      // 6x
    '8': 64,      // 8x
}
```

**Características:**
- **13 valores** (0, 1, 4, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64)
- Grid base 8px
- CSS variables: `--spacing-0`, `--spacing-1`, etc.
- Layout tokens:
  - `--layout-padding-y`: 32px
  - `--layout-padding-x`: 20px
  - `--layout-gap`: 20px

---

### Android (khipu-client-android)

**Ubicación:** `/Users/fortunatoherrerakhipu/Code/khipu-client-android/khipuClient/src/main/java/com/khipu/client/ui/theme/`

#### 1. `Theme.kt` - Configuración Material 3

```kotlin
@Composable
fun KhipuTheme(
    theme: KhipuOptions.Theme,
    colors: KhipuColors? = null,  // Permite override dinámico
    content: @Composable () -> Unit
) {
    val useDarkTheme: Boolean = when {
        theme == KhipuOptions.Theme.DARK -> true
        theme == KhipuOptions.Theme.SYSTEM && isSystemInDarkTheme() -> true
        else -> false
    }

    val colorScheme = if (!useDarkTheme) {
        applyColorsToLightScheme(LightColors, colors)
    } else {
        applyColorsToDarkScheme(DarkColors, colors)
    }

    MaterialTheme(
        colorScheme = colorScheme,
        typography = khipuTypography,
        shapes = shapes,
        content = content
    )
}
```

**Características:**
- Material 3 theming con `ColorScheme`
- Soporte para override dinámico via `KhipuColors`
- Dark mode automático (sistema o manual)
- Custom typography y shapes

#### 2. `Color.kt` - Paleta Material 3

```kotlin
// Light Mode
val md_theme_light_primary = Color(0xFF7E42A8)           // ⚠️ #7E42A8
val md_theme_light_onPrimary = Color(0xFFFFFFFF)
val md_theme_light_primaryContainer = Color(0xFFF3DAFF)
val md_theme_light_onPrimaryContainer = Color(0xFF2F004C)
val md_theme_light_secondary = Color(0xFF005EB5)        // Azul
val md_theme_light_tertiary = Color(0xFFEAC54F)         // Amarillo
val md_theme_light_error = Color(0xFFBA1A1A)
val md_theme_light_background = Color(0xFFFFFFFF)

// Dark Mode
val md_theme_dark_primary = Color(0xFFE3B5FF)
val md_theme_dark_inversePrimary = Color(0xFF7E42A8)

// Seed color
val seed = Color(0xFF8347B7)                             // ⚠️ #8347B7 (muy cercano)
```

**Características:**
- **Material 3 color system:** 27 roles de color en light + 27 en dark
- Sistema de containers (primary, secondary, tertiary)
- Colores derivados automáticamente del seed
- Soporte completo para dark mode
- Inverse colors para mejor contraste

---

## 📊 Comparación: Sistema de Colores

### khenshin-web (Material UI)

| Rol | Valor | Notas |
|-----|-------|-------|
| **primary.main** | `#8347AD` | ✅ Color de marca |
| **primary.light** | Auto-generado | MUI augmentColor |
| **primary.dark** | Auto-generado | MUI augmentColor |
| **primary.contrastText** | Auto | Blanco/Negro según contraste |
| **secondary.main** | Derivado de primaryColorVariant | Cálculo HSL |
| **success.main** | `#2CA24D` | Verde |
| **warning.main** | `#FF9800` | Naranja |
| **error.main** | Auto (MUI) | Rojo estándar MUI |
| **background.default** | `#F5F5F5` | Light gray |
| **background.paper** | `#FFFFFF` | Blanco |
| **text.primary** | `#333333` | Gris oscuro |

**Total:** ~15-20 colores derivados

### Android (Material 3)

| Rol | Light | Dark | Notas |
|-----|-------|------|-------|
| **primary** | `#7E42A8` ⚠️ | `#E3B5FF` | Color de marca |
| **onPrimary** | `#FFFFFF` | `#4C0676` | Contraste sobre primary |
| **primaryContainer** | `#F3DAFF` | `#65288E` | Contenedores con primary |
| **onPrimaryContainer** | `#2F004C` | `#F3DAFF` | Texto en containers |
| **secondary** | `#005EB5` | `#ADC6FF` | Azul |
| **tertiary** | `#EAC54F` | `#EAC54F` | Amarillo |
| **error** | `#BA1A1A` | `#FFB4AB` | Rojo |
| **background** | `#FFFFFF` | `#1D1B1E` | Fondo principal |
| **surface** | `#FFFFFF` | `#1D1B1E` | Superficies elevadas |
| **surfaceVariant** | `#EADFEA` | `#CDC3CE` | Variante de superficie |
| **outline** | `#DDDDEE0` | `#DDDDEE0` | Bordes/divisores |

**Total:** **54 colores** (27 light + 27 dark) - Sistema completo M3

---

## 🔄 Discrepancias Identificadas

### 1. Color Primario (Crítico)

| Plataforma | Valor | Status |
|------------|-------|--------|
| khenshin-web | `#8347AD` | ✅ Fuente de verdad |
| Android | `#7E42A8` | ❌ Desincronizado (-5 RGB) |
| design-system | `#8347AD` | ✅ Sincronizado con Web |

**Impacto:** Diferencia visual sutil pero perceptible en botones, headers, links.

**Solución:** Actualizar Android `Color.kt`:
```kotlin
val md_theme_light_primary = Color(0xFF8347AD)  // Era: 0xFF7E42A8
val seed = Color(0xFF8347AD)                     // Era: 0xFF8347B7
```

### 2. Sistema de Colores (Arquitectural)

| Aspecto | khenshin-web | Android | Brecha |
|---------|--------------|---------|--------|
| **Roles de color** | ~15-20 | 54 (27x2) | Material 3 más completo |
| **Dark mode** | Básico | Completo | Android tiene paleta dark dedicada |
| **Containers** | ❌ No | ✅ Sí | M3 usa containers para superficies |
| **Surface variants** | ❌ No | ✅ Sí | M3 tiene múltiples niveles de superficie |

**Impacto:** Android puede tener UX más rica (containers, surfaces, variants) que Web no tiene.

**Solución:** Evolucionar design-system para incluir roles M3:
- Añadir `primaryContainer`, `onPrimary`, `onPrimaryContainer`
- Mapear a MUI equivalentes o crear extensiones

### 3. Espaciado

| Plataforma | Sistema | Valores |
|------------|---------|---------|
| khenshin-web | 8px grid, 13 valores | 0, 1, 4, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64 |
| Android | Probablemente 4dp/8dp | No documentado en archivos de tema |

**Estado:** Necesita investigación más profunda en Android.

**Acción:** Revisar archivos `Dimens.kt` o equivalente.

---

## 🛠️ Plan de Acción para Sincronización

### Paso 1: Actualizar Android con Color de Web

**Archivo:** `khipu-client-android/.../theme/Color.kt`

```kotlin
// ANTES
val md_theme_light_primary = Color(0xFF7E42A8)
val seed = Color(0xFF8347B7)

// DESPUÉS
val md_theme_light_primary = Color(0xFF8347AD)  // ✅ Sincronizado con Web
val seed = Color(0xFF8347AD)                     // ✅ Sincronizado con Web
```

**Nota:** Esto regenerará automáticamente todos los colores derivados (containers, variants) basándose en el nuevo seed.

### Paso 2: Auditar Colores Secundarios/Terciarios

Web usa:
- Success: `#2CA24D` (verde)
- Warning: `#FF9800` (naranja)

Android usa:
- Secondary: `#005EB5` (azul)
- Tertiary: `#EAC54F` (amarillo)
- Error: `#BA1A1A` (rojo)

**Pregunta:** ¿Son intencionales estas diferencias o deberían ser idénticos?

**Recomendación:** Definir en design-system:
```typescript
export const tokens = {
  colors: {
    primary: '#8347AD',
    secondary: '#005EB5',    // ¿O usar verde #2CA24D?
    tertiary: '#EAC54F',
    success: '#2CA24D',
    warning: '#FF9800',
    error: '#BA1A1A',
  }
}
```

### Paso 3: Mapear Material 3 a MUI

Material 3 tiene roles que MUI no tiene nativamente:
- `primaryContainer` → ¿Crear en MUI?
- `onPrimary` → ¿Equivalente a `primary.contrastText`?
- `surfaceVariant` → ¿Nuevo en DS?

**Acción:** Crear tabla de mapeo en `docs/project/M3_TO_MUI_MAPPING.md`

### Paso 4: Sincronizar Espaciado

1. Auditar `Dimens.kt` en Android
2. Comparar con `spacing.ts` en Web
3. Unificar en `design-system/src/tokens/index.ts`

---

## 📋 Resumen Ejecutivo

### ✅ Bien Sincronizado

- Tipografía: Ambos usan **Public Sans**
- Base de espaciado: Ambos usan grid **8px** (o 4dp en Android)
- Modo claro/oscuro: Ambos lo soportan

### ⚠️ Requiere Sincronización

- **Color primario:** `#8347AD` (Web) vs `#7E42A8` (Android)
- **Seed color:** `#8347AD` (Web) vs `#8347B7` (Android)
- **Colores semánticos:** Definiciones inconsistentes (success, secondary, etc.)

### 🆕 Brechas Arquitecturales

- **Material 3 roles:** Android tiene 54 roles, Web solo ~15-20
- **Containers:** M3 usa containers extensivamente, MUI no
- **Dark mode:** Android tiene paleta dark completa, Web solo invierte colores

---

## 🎯 Próximos Pasos

1. ✅ **Actualizar tarea UNIF-02** en `UNIFICATION_TASKS.md`:
   - Añadir actualización de Android Color.kt con `#8347AD`
   - Regenerar colores derivados

2. ✅ **Crear tarea nueva:** "Auditar y sincronizar colores secundarios/terciarios"
   - Decidir si secondary debe ser azul (`#005EB5`) o verde (`#2CA24D`)
   - Definir tertiary (amarillo `#EAC54F` vs sin definir)

3. ⏳ **Investigar espaciado Android:**
   - Buscar `Dimens.kt` o equivalente
   - Comparar con Web spacing

4. ⏳ **Crear guía de mapeo M3 ↔ MUI:**
   - Documentar equivalencias
   - Identificar roles sin equivalente
   - Proponer extensiones del DS

---

**Autor:** Claude Code
**Última actualización:** 2026-03-09
