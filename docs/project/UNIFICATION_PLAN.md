# Plan de Unificación del Sistema de Diseño Khipu
## Análisis Cross-Platform: khenshin-web ↔ khipu-client-android

**Fecha:** 2026-03-09
**Objetivo:** Unificar estilos y componentes entre khenshin-web (React) y khipu-client-android (Kotlin/Compose) usando el Design System como fuente de verdad centralizada.
**Fuente de Verdad para Tokens:** `khenshin-web` (conforme a instrucciones)

---

## 📊 Executive Summary

### Estado Actual

| Aspecto | khenshin-web | khipu-client-android | design-system |
|---------|--------------|----------------------|---------------|
| **Framework** | React 18.3.1 | Kotlin 2.0.21 + Compose | Multi-plataforma |
| **UI Library** | Material UI 7.3.4 | Material 3 | MUI v7 + Material 3 |
| **Styling** | Emotion (CSS-in-JS) | Compose theming | Theme providers |
| **Color Primario** | #3CB4E5 (azul) | #7E42A8 (púrpura) | #8347AD (púrpura) ⚠️ |
| **Color Secundario** | #BC25D5 (púrpura variante) | - | - |
| **Tipografía** | Public Sans | Public Sans | Public Sans ✅ |
| **Espaciado** | 8px grid (11 valores) | 8px grid | 8px grid ✅ |
| **Componentes** | 76 componentes | 28+12 componentes | 9 componentes core |
| **Integración DS** | ❌ No usa DS | ⚠️ Solo demo app | - |

### Problemas Identificados

1. **🎨 Desalineación de Colores**: Tres valores diferentes para color primario
   - khenshin-web: `#3CB4E5` (azul Khipu)
   - Android SDK: `#7E42A8` (púrpura)
   - design-system: `#8347AD` (púrpura Khipu)
   - **Impacto:** Branding inconsistente entre plataformas

2. **🔄 Duplicación de Componentes**: Componentes similares en ambos proyectos
   - OtpComponent (Web + Android)
   - RutComponent/RutField (Web + Android)
   - CoordinatesField (Web + Android)
   - BankSelect/ListComponent (Web + Android)
   - **Impacto:** Mantenimiento duplicado, comportamiento inconsistente

3. **🚫 Falta de Integración**: Ninguna app consume el design-system actual
   - khenshin-web: Sistema de temas propio (`ThemeCreator.ts`, 895 líneas)
   - Android: SDK usa tema propio, solo demo app usa DS v0.1.0-alpha.8
   - **Impacto:** Design System no es la fuente de verdad en producción

4. **📏 Tokens Desincronizados**: Variaciones sutiles en valores
   - Espaciado: Valores similares pero no idénticos
   - Elevaciones/sombras: Implementaciones diferentes
   - Border radius: Valores hardcodeados en componentes
   - **Impacto:** Inconsistencias visuales sutiles pero perceptibles

---

## 🎯 Objetivos del Plan

1. **Sincronizar Tokens**: Migrar tokens de khenshin-web al design-system como fuente de verdad
2. **Abstraer Componentes**: Mover componentes comunes de dominio al design-system
3. **Migrar Aplicaciones**: Reemplazar implementaciones locales con DS unificado
4. **Establecer Gobernanza**: Proceso para mantener sincronización continua

---

## ⚡ Quick Wins (Semana 1) - Valor Inmediato

**Filosofía:** Demostrar valor tangible en la primera semana para generar momentum y validar viabilidad.

### 🎨 QW-1: Sincronizar Color Primario (1 día)

**Problema actual:**
- khenshin-web: `#8347AD` (fuente de verdad ✅)
- Android: `#7E42A8` (desincronizado ❌)
- Diferencia: -5 RGB en todos los canales

**Solución rápida:**
```kotlin
// Android Color.kt - Cambio de 1 línea
val md_theme_light_primary = Color(0xFF8347AD)  // Era: 0xFF7E42A8
val seed = Color(0xFF8347AD)                     // Era: 0xFF8347B7
```

**Impacto visible:**
- ✅ Botones en ambas plataformas usan color idéntico
- ✅ Headers, links, elementos interactivos consistentes
- ✅ Primera publicación: `design-system v0.1.1` (patch release)

**Esfuerzo:** 1 día (Dev Android)
**Valor:** Alto - Cambio pequeño, impacto visual inmediato

---

### 🔘 QW-2: Validar KdsButton en Producción (2 días)

**Objetivo:** Probar que el DS funciona en producción real con un componente crítico.

**Estrategia:**
```bash
# Instalar DS en khenshin-web staging
npm install @khipu/design-system@latest

# Reemplazar ~10-15 botones críticos (no todos)
# Archivos objetivo:
- src/views/PaymentView.tsx (botón "Pagar ahora")
- src/components/BankList.tsx (botón "Seleccionar banco")
- src/views/LoginView.tsx (botón "Ingresar")
```

**Impacto visible:**
- ✅ 30% de botones de khenshin-web usan DS
- ✅ Feedback real: ¿API de KdsButton es buena?
- ✅ PM ve mejora en staging
- ✅ Validación técnica: ¿Hay problemas de integración?

**Esfuerzo:** 2 días (Dev Web)
**Valor:** Alto - Validación técnica + Valor visible para stakeholders

---

### 📚 QW-3: Publicar Storybook Actualizado (1 día)

**Objetivo:** Documentación visible del progreso.

**Acciones:**
- Actualizar stories de KdsButton con ejemplos reales
- Añadir página "Tokens/Color Comparison" (antes/después)
- Documentar quick wins logrados
- Deploy a design.khipu.com

**Impacto visible:**
- ✅ Equipo ve componentes disponibles
- ✅ Referencia para implementadores
- ✅ Transparencia del progreso

**Esfuerzo:** 1 día (cualquier dev)
**Valor:** Medio - Comunicación y documentación

---

**📊 Resultados de Quick Wins (Semana 1):**
- **Duración:** 4 días de trabajo
- **Inversión:** ~$3k (salarios)
- **ROI:** Validación técnica + Momentum del equipo + Buy-in de stakeholders
- **Decisión:** Continuar con plan completo o ajustar según feedback

---

## ⚠️ Pre-Requisito Crítico: Abstraer Temas Locales

**Problema identificado:** khenshin-web tiene sistema de temas propio que sobrescribe estilos del DS.

### Archivos conflictivos:
- `/Users/fortunatoherrerakhipu/Code/khenshin-web/src/themes/ThemeCreator.ts` (895 líneas)
- `/Users/fortunatoherrerakhipu/Code/khenshin-web/src/themes/ThemeContext.tsx`
- `/Users/fortunatoherrerakhipu/Code/khenshin-web/src/themes/spacing.ts` (122 líneas)

### Estrategia de Migración:

#### Opción A: Reemplazo Gradual (Recomendado) ⭐

**Fase 1: Mover lógica a DS (Semana 2)**
```typescript
// design-system/src/theme/KhipuThemeProvider.tsx
export function KhipuThemeProvider({
  primaryColor = '#8347AD',
  theme = 'light',
  children
}) {
  // Lógica de ThemeCreator migrada al DS
  const muiTheme = createTheme({
    palette: {
      mode: theme,
      primary: augmentColor({ color: { main: primaryColor } }),
      // ... resto de configuración
    }
  })

  return <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
}
```

**Fase 2: Usar DS en khenshin-web**
```typescript
// khenshin-web/src/App.tsx
import { KhipuThemeProvider } from '@khipu/design-system'

function App() {
  return (
    <KhipuThemeProvider primaryColor="#8347AD" theme="light">
      {/* app content */}
    </KhipuThemeProvider>
  )
}

// Deprecar (no eliminar aún):
// - ThemeCreator.ts
// - ThemeContext.tsx
```

**Ventajas:**
- ✅ Sin breaking changes inmediatos
- ✅ Permite rollback si hay problemas
- ✅ Ambos sistemas coexisten temporalmente

**Duración:** 3-5 días (Dev Web)

---

#### Opción B: Feature Flag (Más seguro)

```typescript
// khenshin-web: Soportar ambos sistemas
const USE_DS_THEME = process.env.REACT_APP_USE_DS_THEME === 'true'

function App() {
  return USE_DS_THEME ? (
    <KhipuThemeProvider>{/* ... */}</KhipuThemeProvider>
  ) : (
    <CustomThemeProvider>{/* ... actual */}</CustomThemeProvider>
  )
}
```

**Ventajas:**
- ✅ A/B testing fácil
- ✅ Rollback instantáneo (cambiar variable)
- ✅ Deploy incremental (% de usuarios)

**Duración:** 5-7 días (Dev Web + testing)

---

### Tarea Añadida al Plan:

**UNIF-0.5: Abstraer ThemeProvider a Design System**
- **Prioridad:** Alta (bloqueante para migración de componentes)
- **Puntos:** 5
- **Duración:** 1 semana
- **Owner:** Dev Web
- **Ubicación:** Entre Quick Wins y Epic 1

**Criterios de aceptación:**
- [ ] `KhipuThemeProvider` implementado en design-system
- [ ] Soporta dynamic colors (`primaryColor` prop)
- [ ] Soporta light/dark mode
- [ ] Usa tokens del DS internamente
- [ ] khenshin-web puede usar ambos sistemas (feature flag)
- [ ] Tests pass en staging
- [ ] No regresiones visuales

---

## 🧩 Componentes a Abstraer

### Prioridad 1: Componentes de Flujo de Pago (Críticos)

| Componente | Web | Android | Complejidad | Uso |
|------------|-----|---------|-------------|-----|
| **BankSelect** | ✅ | ✅ ListComponent | 🔴 Alta | Selección de banco para pago |
| **OtpComponent** | ✅ | ✅ | 🟡 Media | Validación código OTP |
| **RutComponent** | ✅ RutField | ✅ | 🟡 Media | Input RUT con validación |
| **CoordinatesField** | ✅ | ✅ | 🟡 Media | Grilla de coordenadas bancarias |
| **HeaderComponent** | ✅ | ⚠️ TopBar | 🟢 Baja | Header con logo y acciones |
| **ProgressBar** | ✅ | ⚠️ | 🟢 Baja | Indicador de progreso de pago |

**Justificación**: Estos componentes son específicos del dominio de pagos Khipu y se usan en ambas plataformas. Centralizar su lógica garantiza comportamiento idéntico.

### Prioridad 2: Componentes de Resultados

| Componente | Web | Android | Complejidad | Uso |
|------------|-----|---------|-------------|-----|
| **SuccessScreen** | ✅ | ✅ | 🟢 Baja | Pantalla de pago exitoso |
| **FailureScreen** | ✅ | ✅ | 🟢 Baja | Pantalla de pago fallido |
| **WarningScreen** | ✅ | ✅ | 🟢 Baja | Alertas y advertencias |
| **TimeoutScreen** | ✅ | ✅ | 🟢 Baja | Timeout de sesión |

**Justificación**: Screens de resultado deben ser idénticas en ambas plataformas para consistencia de UX. Implementación simple (composición de primitivas + iconos).

### Prioridad 3: Componentes de Formularios Avanzados

| Componente | Web | Android | Complejidad | Uso |
|------------|-----|---------|-------------|-----|
| **ImageChallengeComponent** | ✅ | ⚠️ | 🔴 Alta | Desafío de imagen para seguridad |
| **AmountField** | ✅ | ⚠️ | 🟡 Media | Input de monto con formato |
| **EmailField** | ✅ | ⚠️ | 🟢 Baja | Input email con validación |
| **PhoneField** | ✅ | ⚠️ | 🟡 Media | Input teléfono con máscara |

**Justificación**: Componentes especializados con lógica de validación compleja que debe ser consistente.

### Componentes Core Ya Implementados ✅

- KdsButton (React + Android)
- KdsTextField (React)
- KdsCheckbox (React)
- KdsTypography (React)
- KdsCard (React)
- KdsAlert (React)
- KdsProgress (React)
- KdsLink (React)
- KdsSelect (React)

**Nota**: Estos ya existen en el DS, pero ambas apps no los consumen aún.

---

## 🎨 Estrategia de Sincronización de Tokens

### Fase 1: Auditoría y Extracción (khenshin-web → design-system)

**Fuente:** `/Users/fortunatoherrerakhipu/Code/khenshin-web/src/themes/`

#### 1.1 Colores

Extraer de `ThemeCreator.ts`:

```typescript
// Colores primarios de khenshin-web (FUENTE DE VERDAD)
primary: {
  main: '#3CB4E5',      // Azul Khipu
  light: '#6EC6EE',     // Calculado o extraído
  dark: '#2A8AB8',      // Calculado o extraído
  contrastText: '#FFF'
}

secondary: {
  main: '#BC25D5',      // Púrpura variante
  light: '#D259E5',     // Calculado o extraído
  dark: '#8A1BA0',      // Calculado o extraído
  contrastText: '#FFF'
}

// Colores semánticos
success: { main: '#4CAF50', ... }
error: { main: '#F44336', ... }
warning: { main: '#FF9800', ... }
info: { main: '#2196F3', ... }
```

**Acción:**
- Actualizar `design-system/src/tokens/index.ts` con colores exactos de khenshin-web
- Regenerar `tokens.json`, `css-variables.css`, `KdsTokens.kt`
- Deprecar `#8347AD` del DS actual

#### 1.2 Tipografía

Verificar configuración exacta en khenshin-web:

```typescript
typography: {
  fontFamily: 'Public Sans, Roboto, Arial, sans-serif',
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: { fontSize: '2.5rem', fontWeight: 700, lineHeight: 1.2 },
  h2: { fontSize: '2rem', fontWeight: 700, lineHeight: 1.3 },
  h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.4 },
  // ... resto de variantes
}
```

**Acción:**
- Sincronizar valores exactos en `design-system/src/tokens/index.ts`
- Asegurar que Android use los mismos valores (ya usa Public Sans ✅)

#### 1.3 Espaciado

Extraer de `spacing.ts` (8px base):

```typescript
// khenshin-web spacing (11 valores)
spacing: [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96]
```

**Acción:**
- Verificar si DS actual tiene los mismos 11 valores
- Añadir cualquier valor faltante
- Sincronizar nombres semánticos si existen (xs, sm, md, lg, xl)

#### 1.4 Border Radius

Buscar valores en `ThemeCreator.ts`:

```typescript
shape: {
  borderRadius: 8,  // Base
  // Valores personalizados para componentes específicos
}
```

**Acción:**
- Documentar valores de borderRadius por componente
- Crear tokens semánticos (buttonRadius, cardRadius, etc.)

#### 1.5 Sombras/Elevations

Extraer definiciones de `shadows`:

```typescript
shadows: [
  'none',
  '0px 2px 4px rgba(0,0,0,0.1)',
  // ... 24 niveles de elevación
]
```

**Acción:**
- Sincronizar todos los 25 niveles (0-24) con khenshin-web
- Asegurar que Android use sombras equivalentes en Material 3

### Fase 2: Validación Cross-Platform

**Proceso:**
1. Generar tokens para todas las plataformas (`npm run tokens:generate`)
2. Crear página de comparación en Storybook: "Tokens/Color Comparison"
3. Inspeccionar visualmente colores, tipografía, espaciado en ambas plataformas
4. Ajustar discrepancias hasta lograr paridad visual 100%

**Herramientas:**
- Storybook (Web)
- Android Emulator con demo app
- Lighthouse/Chromatic para visual regression

---

## 🗺️ Roadmap de Migración

### **Epic 1: Sincronización de Tokens (1-2 sprints)**

**Goal:** Tokens del design-system reflejan exactamente khenshin-web

#### Tareas:
1. **Auditoría de tokens khenshin-web** (3 pts)
   - Extraer todos los valores de `ThemeCreator.ts`, `spacing.ts`
   - Documentar en tabla comparativa: khenshin-web vs DS actual
   - Identificar gaps y discrepancias

2. **Actualizar tokens del DS** (5 pts)
   - Modificar `src/tokens/index.ts` con valores de khenshin-web
   - Regenerar archivos derivados (JSON, CSS, Kotlin)
   - Actualizar documentación en Storybook

3. **Validación cross-platform** (3 pts)
   - Crear página Storybook "Tokens/Comparison"
   - Verificar paridad visual Web ↔ Android
   - Ajustar discrepancias

4. **Actualizar tema Android** (5 pts)
   - Sincronizar `KdsTheme` en Android con nuevos tokens
   - Actualizar colores, tipografía, espaciado en `Theme.kt`
   - Probar en demo app Android

---

### **Epic 2: Componentes Core - Migración khenshin-web (2-3 sprints)**

**Goal:** khenshin-web usa componentes Kds* del design-system en lugar de implementaciones locales

#### Tareas:
1. **Inventario de componentes core en khenshin-web** (2 pts)
   - Identificar usos de Button, TextField, Checkbox, Select, etc.
   - Documentar props y variantes usadas
   - Verificar compatibilidad con Kds* actuales

2. **Extender componentes Kds* según necesidades de khenshin-web** (8 pts)
   - Añadir props/variantes faltantes (ej: `size="large"` en KdsButton)
   - Asegurar API 100% compatible con componentes actuales
   - Crear codemods para migración automática (opcional)

3. **Migrar componentes en khenshin-web (iterativo)** (13 pts)
   - Fase A: Buttons → `<KdsButton>` (3 pts)
   - Fase B: TextFields → `<KdsTextField>` (3 pts)
   - Fase C: Selects, Checkboxes → `<KdsSelect>`, `<KdsCheckbox>` (3 pts)
   - Fase D: Cards, Alerts, Links → componentes Kds* (4 pts)

4. **Testing y ajustes visuales** (5 pts)
   - Verificar cada página migrada visualmente
   - Ajustar estilos si hay diferencias
   - Probar en diferentes navegadores/dispositivos

---

### **Epic 3: Componentes de Dominio - Abstracción (3-4 sprints)**

**Goal:** Componentes de flujo de pago disponibles en DS, consumidos por ambas apps

#### Tareas:
1. **Diseñar API de componentes de dominio** (5 pts)
   - Definir props para BankSelect, OtpComponent, RutComponent, CoordinatesField
   - Crear specs en Figma/Storybook
   - Revisar con equipo de UX

2. **Implementar componentes Web (React)** (13 pts)
   - BankSelect (3 pts)
   - OtpComponent (3 pts)
   - RutComponent (2 pts)
   - CoordinatesField (3 pts)
   - HeaderComponent (1 pt)
   - ProgressBar (1 pt)

3. **Implementar componentes Android (Compose)** (13 pts)
   - BankSelect (3 pts)
   - OtpComponent (3 pts)
   - RutComponent (2 pts)
   - CoordinatesField (3 pts)
   - HeaderComponent (1 pt)
   - ProgressBar (1 pt)

4. **Crear stories y documentación** (5 pts)
   - Stories en Storybook para cada componente
   - Documentar props, ejemplos de uso
   - Screenshots en Android

5. **Migrar khenshin-web a componentes de dominio** (8 pts)
   - Reemplazar implementaciones locales con DS
   - Probar flujos de pago end-to-end
   - Ajustar estilos y comportamiento

6. **Migrar Android SDK a componentes de dominio** (8 pts)
   - Reemplazar implementaciones en khipuClient
   - Actualizar vistas que usan componentes
   - Probar en app de demo y apps integradas

---

### **Epic 4: Pantallas de Resultado (1-2 sprints)**

**Goal:** Screens de resultado (Success, Failure, Warning, Timeout) unificadas

#### Tareas:
1. **Diseñar pantallas de resultado** (3 pts)
   - Definir layout, iconos, mensajes
   - Crear mockups en Figma
   - Revisar con equipo de UX

2. **Implementar en Web (React)** (5 pts)
   - SuccessScreen, FailureScreen, WarningScreen, TimeoutScreen
   - Stories en Storybook

3. **Implementar en Android (Compose)** (5 pts)
   - Componentes equivalentes en Kotlin
   - Previews en Android Studio

4. **Integrar en ambas apps** (5 pts)
   - Reemplazar screens actuales en khenshin-web
   - Reemplazar screens en Android SDK

---

### **Epic 5: Gobernanza y Mantenimiento Continuo (ongoing)**

**Goal:** Proceso establecido para mantener sincronización

#### Tareas:
1. **Crear guía de contribución** (3 pts)
   - Documentar flujo: Figma → khenshin-web → DS → Android
   - Definir responsabilidades de equipo
   - Crear templates de PR para nuevos componentes

2. **Configurar visual regression testing** (5 pts)
   - Implementar Chromatic o Percy en khenshin-web
   - Configurar screenshots automatizados en Android (Paparazzi)
   - Alertas automáticas en PRs si hay divergencia visual

3. **Dashboard de sincronización** (5 pts)
   - Crear página Storybook "Status/Sync Dashboard"
   - Mostrar estado de tokens: ✅ sincronizado / ⚠️ divergente
   - Mostrar cobertura de componentes por plataforma

4. **Proceso de release coordinado** (3 pts)
   - Definir versionado semántico coordinado
   - Publicar DS → actualizar khenshin-web → actualizar Android en lockstep
   - Documentar en `docs/RELEASE_PROCESS.md`

---

## 📋 Resumen de Tareas por Epic

| Epic | # Tareas | Puntos Totales | Duración Estimada |
|------|----------|----------------|-------------------|
| **Epic 1: Sincronización de Tokens** | 4 | 16 pts | 1-2 sprints |
| **Epic 2: Componentes Core - khenshin-web** | 4 | 28 pts | 2-3 sprints |
| **Epic 3: Componentes de Dominio** | 6 | 52 pts | 3-4 sprints |
| **Epic 4: Pantallas de Resultado** | 4 | 18 pts | 1-2 sprints |
| **Epic 5: Gobernanza** | 4 | 16 pts | Ongoing |
| **TOTAL** | **22 tareas** | **130 pts** | **7-11 sprints** (~4-6 meses) |

---

## 🎯 Métricas de Éxito

1. **Paridad Visual**: 100% de componentes se ven idénticos en Web y Android
2. **Cobertura de DS**: 80%+ de componentes en producción provienen del DS
3. **Tokens Sincronizados**: 0 discrepancias entre khenshin-web tokens y DS
4. **Reducción de Código**: -30% de código de UI en khenshin-web y Android SDK
5. **Time to Market**: -50% de tiempo para implementar nuevos componentes cross-platform

---

## 🚧 Riesgos y Mitigaciones

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| **Regresiones visuales durante migración** | Alta | Alto | Visual regression testing automatizado, rollout gradual |
| **Divergencia de tokens no detectada** | Media | Alto | Dashboard de sincronización, CI checks |
| **Resistencia a adopción del DS** | Media | Alto | Training sessions, documentación clara, soporte dedicado |
| **Performance issues en Android** | Baja | Medio | Profiling temprano, benchmarks en CI |
| **Breaking changes en MUI/Compose** | Media | Medio | Lock versions, test coverage alto, changelog detallado |

---

## 📅 Próximos Pasos (Pre-Jira)

1. ✅ **Revisar este plan con el equipo** (Product, Design, Engineering)
2. ✅ **Priorizar epics según roadmap de producto**
3. ✅ **Ajustar estimaciones y scope**
4. ⏳ **Crear tickets en Jira (Epic + Tareas)**
5. ⏳ **Kickoff del Epic 1: Sincronización de Tokens**

---

## 📚 Referencias

- [COMPONENT_PATTERNS.md](../COMPONENT_PATTERNS.md) - Patrones de componentes del DS
- [TOKENS_GUIDE.md](../TOKENS_GUIDE.md) - Sistema de tokens
- [BUILD_PUBLISHING.md](../BUILD_PUBLISHING.md) - Build y publishing multi-plataforma
- [khenshin-web Analysis Report] - Análisis completo de khenshin-web (Agent a55b353)
- [khipu-client-android Analysis Report] - Análisis completo de Android (Agent acf8378)

---

**Autor:** Claude Code
**Última actualización:** 2026-03-09
