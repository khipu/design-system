# Skill: Componentes y tokens Khipu

## Propósito
Este skill te ayuda a generar código usando correctamente los componentes y tokens del Design System Khipu, evitando valores hardcodeados y manteniendo consistencia.

## Contexto técnico

**Design System Khipu** es una biblioteca multi-plataforma de componentes y tokens de diseño.

**Plataformas soportadas:**
- **Web (React):** React 18+ / TypeScript / Material UI v7
- **Web (BeerCSS):** Material Design 3 / Vanilla JS
- **Android:** Kotlin / Jetpack Compose / Material 3
- **iOS:** Swift / SwiftUI

## Instalación

### React/Web

```bash
npm install @khipu/design-system
```

**Importar componentes:**
```tsx
import { KdsButton, KdsTextField, KdsCard } from '@khipu/design-system';
import { colors, spacing, borderRadius } from '@khipu/design-system/tokens';
```

**Configurar tema:**
```tsx
import { KhipuThemeProvider } from '@khipu/design-system';

function App() {
  return (
    <KhipuThemeProvider>
      {/* Tu aplicación */}
    </KhipuThemeProvider>
  );
}
```

### Android

Agregar a `build.gradle`:
```gradle
dependencies {
    implementation 'com.khipu:design-system:0.1.0-alpha.56'
}
```

Agregar repositorio Nexus en `settings.gradle`.

### iOS

Agregar a `Podfile`:
```ruby
pod 'KhipuDesignSystem', '~> 0.1.0'
```

## Principios clave

### 1. Token-first
**Siempre usar tokens, nunca valores hardcodeados**

❌ **Incorrecto:**
```tsx
<button style={{ color: '#8347AD', padding: '16px', borderRadius: '8px' }}>
  Pagar
</button>
```

✅ **Correcto:**
```tsx
import { colors, spacing, borderRadius } from '@khipu/design-system/tokens';

<button style={{
  color: colors.primary.main,
  padding: spacing[2],
  borderRadius: borderRadius.md
}}>
  Pagar
</button>
```

### 2. Usar componentes del Design System
No crear componentes custom desde cero. El sistema ya provee componentes probados, accesibles y documentados.

❌ **Incorrecto:**
```tsx
<div className="custom-card">
  <h3>Título</h3>
  <p>Contenido</p>
</div>
```

✅ **Correcto:**
```tsx
import { KdsCard, KdsTypography } from '@khipu/design-system';

<KdsCard>
  <KdsTypography variant="h3">Título</KdsTypography>
  <KdsTypography variant="body1">Contenido</KdsTypography>
</KdsCard>
```

### 3. Componentes disponibles

El sistema incluye 17 componentes core (prefijo `Kds`):

| Componente | Uso |
|------------|-----|
| **KdsButton** | Botones con variantes contained/outlined/text |
| **KdsTextField** | Inputs de texto, email, password |
| **KdsCard** | Contenedores de contenido |
| **KdsCheckbox** | Casillas de verificación |
| **KdsModal** | Ventanas modales |
| **KdsSpinner** | Indicadores de carga |
| **KdsTabs** | Navegación por pestañas |
| **KdsTypography** | Textos con variantes (h1-h6, body1-body2, etc.) |
| **KdsAlert** | Mensajes de alerta/info/success/error |
| **KdsLinearProgress** | Barras de progreso |
| **KdsLogoHeader** | Header con logo Khipu |
| **KdsRadioGroup** | Grupos de radio buttons |
| **KdsSelect** | Selectores/dropdowns |
| **KdsChip** | Etiquetas y badges |
| **KdsSnackbar** | Notificaciones toast |
| **KdsTooltip** | Tooltips informativos |
| **KdsAccordion** | Paneles expandibles |

## Tokens disponibles

### Colores
```tsx
import { colors } from '@khipu/design-system/tokens';

colors.primary.main        // #8347AD - Púrpura Khipu
colors.primary.dark        // #6B3A8F
colors.primary.light       // #9B69BD
colors.primary.container   // #F5F0FA

colors.success.main        // #4CAF50
colors.error.main          // #F44336
colors.warning.main        // #FF9800
colors.info.main           // #2196F3

colors.text.primary        // Texto principal
colors.text.secondary      // Texto secundario
colors.background.paper    // Fondo de cards
```

### Espaciado
```tsx
import { spacing } from '@khipu/design-system/tokens';

spacing[0.5]  // 4px
spacing[1]    // 8px
spacing[1.5]  // 12px
spacing[2]    // 16px
spacing[2.5]  // 20px
spacing[3]    // 24px
spacing[4]    // 32px
spacing[5]    // 40px
spacing[6]    // 48px
```

### Tipografía
```tsx
import { fontFamilies, fontSizes, fontWeights } from '@khipu/design-system/tokens';

fontFamilies.sans   // 'Public Sans', sans-serif
fontFamilies.mono   // 'Roboto Mono', monospace

fontSizes.xs        // 12px
fontSizes.sm        // 14px
fontSizes.base      // 16px
fontSizes.lg        // 18px
fontSizes.xl        // 20px

fontWeights.regular    // 400
fontWeights.medium     // 500
fontWeights.semiBold   // 600
fontWeights.bold       // 700
```

### Border Radius
```tsx
import { borderRadius } from '@khipu/design-system/tokens';

borderRadius.sm   // 4px
borderRadius.md   // 8px
borderRadius.lg   // 12px
borderRadius.xl   // 16px
```

## Ejemplos de uso

### Ejemplo 1: Formulario de pago

❌ **Incorrecto:**
```tsx
<div style={{ padding: '24px', background: '#fff', borderRadius: '8px' }}>
  <input
    type="email"
    placeholder="Email"
    style={{ border: '1px solid #ccc', padding: '12px' }}
  />
  <button
    style={{ background: '#8347AD', color: '#fff', padding: '12px 24px' }}
  >
    Confirmar
  </button>
</div>
```

✅ **Correcto:**
```tsx
import { KdsCard, KdsTextField, KdsButton } from '@khipu/design-system';
import { spacing } from '@khipu/design-system/tokens';

<KdsCard style={{ padding: spacing[3] }}>
  <KdsTextField
    type="email"
    label="Correo electrónico"
    fullWidth
    style={{ marginBottom: spacing[2] }}
  />
  <KdsButton variant="contained" fullWidth>
    Confirmar pago
  </KdsButton>
</KdsCard>
```

### Ejemplo 2: Mensaje de error

❌ **Incorrecto:**
```tsx
<div style={{
  padding: '16px',
  background: '#ffebee',
  color: '#c62828',
  border: '1px solid #f44336'
}}>
  Error en el pago
</div>
```

✅ **Correcto:**
```tsx
import { KdsAlert } from '@khipu/design-system';

<KdsAlert severity="error">
  No pudimos procesar tu pago. Verifica los datos e intenta de nuevo.
</KdsAlert>
```

## Errores comunes a evitar

### 🚫 En código React

| ❌ Error | ✅ Correcto | Por qué |
|----------|-------------|---------|
| `color: '#8347AD'` | `color: colors.primary.main` | Mantiene consistencia |
| `<button>Click aquí</button>` | `<KdsButton>Pagar ahora</KdsButton>` | Usa componentes + copy directo |
| `padding: '16px'` | `padding: spacing[2]` | Facilita cambios globales |
| Crear componentes custom | Usar componentes Kds | Ya probados y accesibles |

### 🚫 En código Android (Kotlin)

| ❌ Error | ✅ Correcto | Por qué |
|----------|-------------|---------|
| `Color(0xFF8347AD)` | `KdsTokens.Colors.Primary.main` | Usa tokens centralizados |
| `8.dp` | `KdsTokens.Spacing.md` | Consistencia de espaciado |
| Componente custom | `KdsButton(...)` | Componentes del sistema |

## Cómo usar este skill

### Paso 1: Integra este archivo en tu agente de IA
- **Claude (Projects):** Sube este archivo en "Project knowledge"
- **Cursor/Claude Code:** Añade como contexto en tu workspace
- **ChatGPT:** Sube al inicio de la conversación

### Paso 2: Haz tu solicitud
Ejemplos de prompts:

**Para generar un componente:**
```
Crea un formulario de pago con email, monto y botón de confirmación.
Usa los componentes y tokens del Design System Khipu.
```

**Para revisar código:**
```
Revisa este código y reemplaza valores hardcodeados por tokens de Khipu:
[tu código aquí]
```

**Para migrar código legacy:**
```
Migra este componente custom para usar KdsCard y KdsButton del Design System:
[código a migrar]
```

## Checklist de validación de código

Antes de entregar código, verifica:

- [ ] ¿Usé tokens en lugar de valores hardcodeados?
- [ ] ¿Utilicé componentes `Kds*` en lugar de HTML/custom?
- [ ] ¿Los textos siguen las guías de voz y tono?
- [ ] ¿Incluí props de accesibilidad (aria-label, etc.)?
- [ ] ¿El código sigue el patrón del Design System?
- [ ] ¿Importé correctamente desde `@khipu/design-system`?

## ⚠️ Anti-patrones comunes de agentes IA

Cuando generes código para Khipu, **evita estos errores típicos de LLMs**:

### 🚫 En código

| ❌ Error típico de IA | ✅ Correcto Khipu | Por qué |
|----------|-------------|---------|
| Crear componentes custom desde cero | Usar componentes `Kds*` existentes | Ya probados y accesibles |
| Usar valores hardcodeados `color: '#8347AD'` | Usar `colors.primary.main` | Mantiene consistencia |
| Ignorar accesibilidad | Incluir `aria-label`, `role`, etc. | Todos los componentes deben ser accesibles |
| Usar `<button>Click aquí</button>` | `<KdsButton>Pagar ahora</KdsButton>` | Componentes + copy Khipu |
| Proponer múltiples enfoques de implementación | Usar el patrón del Design System | Consistencia en la base de código |

### Tendencias a corregir:

- **Los LLMs crean componentes custom innecesariamente** → Revisa primero si existe en el DS
- **Los LLMs no importan el ThemeProvider** → Siempre usa `<KhipuThemeProvider>`
- **Los LLMs mezclan librerías** → Usa solo componentes Khipu, no MUI directamente
- **Los LLMs ignoran tokens** → Token-first siempre

## Recursos adicionales

Para documentación completa:
- **Storybook:** https://design.khipu.com
- **Guía técnica:** Consulta CLAUDE.md en el repositorio
- **Tokens:** Design Tokens en Storybook
- **Componentes:** Core section en Storybook

---

**Versión:** 1.0.0
**Última actualización:** 2026-05-05
**Más información:** https://design.khipu.com
