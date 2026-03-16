# CLAUDE.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) cuando trabaja con código en este repositorio.

## 📚 Documentación Relacionada

**Para voz y tono de marca:**
- **[BRAND_GUIDE_FOR_AI.md](./BRAND_GUIDE_FOR_AI.md)** - Guía completa de voz, tono y copy para agentes IA
  - Define comunicación cercana, clara, confiable y directa
  - Incluye anti-patrones y checklist de validación
  - Úsalo cuando generes textos de UI, mensajes de error, o documentación de cara al usuario

**Para integración MCP con Storybook:**
- **[docs/STORYBOOK_MCP.md](./docs/STORYBOOK_MCP.md)** - Integración completa de MCP con Storybook 10
  - Servidor MCP nativo en http://localhost:6006/mcp
  - Herramientas para obtener previews y documentación de componentes
  - Configuración local y producción

**Este archivo (CLAUDE.md):** Aspectos técnicos, arquitectura y comandos de desarrollo

### Flujo de Información para Agentes IA

```
Figma (Diseño - Fuente de verdad para el equipo)
    ↓
    [Solo equipo de Design System]
    ↓
Storybook + MD files (Documentación publicada)
    ↓
    [Agentes IA y desarrolladores]
    ↓
Claude Code (Implementación)
```

**Importante:** Como agente IA, usa **Storybook** y estos archivos MD como fuente de verdad. La conexión con Figma la mantiene exclusivamente el equipo de design system.

---

## 📖 Guías Detalladas

Para temas específicos, consulta estas guías:

| Tema | Documento | Descripción |
|------|-----------|-------------|
| **Build & Publishing** | [`docs/BUILD_PUBLISHING.md`](docs/BUILD_PUBLISHING.md) | Cómo construir y publicar packages (Web + Android + iOS) |
| **Tokens de Diseño** | [`docs/TOKENS_GUIDE.md`](docs/TOKENS_GUIDE.md) | Sistema de tokens, generación multi-plataforma |
| **Patrones de Componentes** | [`docs/COMPONENT_PATTERNS.md`](docs/COMPONENT_PATTERNS.md) | Arquitectura, plantillas, convenciones |
| **Storybook MCP** | [`docs/STORYBOOK_MCP.md`](docs/STORYBOOK_MCP.md) | Integración MCP con Storybook 10, herramientas para agentes IA |
| **Troubleshooting** | [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md) | Problemas comunes y sincronización de archivos |
| **Android** | [`docs/android/`](docs/android/) | Guías completas de Android (Jetpack Compose) |
| **Grails** | [`docs/grails/`](docs/grails/) | Guías de integración con Grails/GSP |
| **Anti-patrones** | [`docs/development/PAINFUL_PATTERNS.md`](docs/development/PAINFUL_PATTERNS.md) | Código legacy y rutas de migración |

---

## Resumen del Proyecto

El Sistema de Diseño de Khipu es una biblioteca multi-plataforma de componentes y tokens de diseño para la plataforma de pagos Khipu.

**Plataformas:**
- **Web**: React 18+ / TypeScript 5.3+ / Material UI v7 → publicado en **npmjs.org** (`@khipu/design-system`)
- **Android**: Kotlin / Jetpack Compose / Material 3 → publicado en **Nexus** (`com.khipu:design-system`)
- **iOS**: Swift / SwiftUI → publicado en **CocoaPods** (`KhipuDesignSystem`)
- **Grails**: Plugin para integración con Grails/GSP → publicado en **Nexus** (`com.khipu:design-system-grails`)

**Detalles Clave:**
- Repo: bitbucket.org/khipu/design-system
- CI/CD: GitHub Actions (CI + Publish + Storybook deploy)
- Storybook: design.khipu.com
- Fuente de Diseño: Figma - "Pagos Automáticos - MUI v610"
- Herramienta de Build: tsup (Web), Gradle (Android + Grails), CocoaPods (iOS)
- Testing: Vitest
- Documentación: Storybook 10.2.16 (con MCP nativo para agentes IA)
- Node.js: >= 20.0.0

---

## 🤖 Integración MCP (Model Context Protocol)

**Este proyecto tiene integración MCP nativa para agentes IA.** Cuando Storybook está corriendo, puedes:

- **Obtener previews de componentes**: URLs directas a stories para verificación visual
- **Consultar documentación**: Acceso a props, variantes y ejemplos de uso
- **Instrucciones para crear stories**: Guías automáticas con las convenciones del proyecto

**Cómo activar MCP:**
```bash
npm run storybook  # El servidor MCP estará en http://localhost:6006/mcp
```

Las herramientas MCP disponibles son:
- `mcp__storybook__preview-stories` - Obtener URLs de preview
- `mcp__storybook__get-storybook-story-instructions` - Guías para escribir stories

**📘 Documentación completa:** [`docs/STORYBOOK_MCP.md`](docs/STORYBOOK_MCP.md)

---

## Comandos Rápidos

### Desarrollo
```bash
npm run dev                # Modo desarrollo con watch
npm run build              # Build de producción
npm run demo               # Ejecutar demo app
npm run storybook          # Ejecutar Storybook (puerto 6006) - activa MCP en /mcp
npm run build-storybook    # Build estático de Storybook
npm run test               # Ejecutar tests
npm run test:ui            # Ejecutar tests con UI de Vitest
npm run test -- path/to/test.test.ts  # Ejecutar test específico
npm run coverage           # Ejecutar tests con cobertura
npm run typecheck          # Verificación de tipos
npm run lint               # Ejecutar linter
```

### Tokens
```bash
npm run tokens:generate    # Generar todos los tokens (JSON, CSS, Android)
```

### Android
```bash
npm run android:build           # Build de la librería
npm run android:test            # Ejecutar tests de Android
npm run android:publish-local   # Publicar a Maven Local
npm run android:publish         # Publicar a Nexus
npm run android:clean           # Limpiar build de Android
```

### Grails
```bash
npm run grails:build            # Build del plugin Grails
npm run grails:test             # Ejecutar tests de Grails
npm run grails:publish-local    # Publicar a Maven Local
npm run grails:publish          # Publicar a Nexus
npm run grails:clean            # Limpiar build de Grails
npm run grails:info             # Mostrar info del plugin
```

### Version Sync
```bash
./scripts/sync-version.sh 0.2.0  # Sincronizar versión en todas las plataformas
```

**📘 Guía completa:** Ver [`docs/BUILD_PUBLISHING.md`](docs/BUILD_PUBLISHING.md)

---

## Arquitectura de Alto Nivel

### Sistema de Componentes (Tres Capas)

```
┌─────────────────────────────────────┐
│    Componentes de Dominio (Futuro)   │ ← Lógica de negocio
│   (BankSelector, PaymentStepper)     │
├─────────────────────────────────────┤
│        Componentes Core (Kds*)       │ ← Primitivos con tema Khipu
│  (KdsButton, KdsTextField, etc.)     │
├─────────────────────────────────────┤
│    Material UI / Material 3          │ ← Componentes base
│        (React / Jetpack Compose)     │
└─────────────────────────────────────┘
```

**Patrón Clave:**
1. Envuelve componente base (MUI o Material 3)
2. Aplica tokens de diseño via tema
3. Extiende con props personalizadas
4. Usa `forwardRef` (React) / `@Composable` (Android)
5. Exporta componente + tipos

**📘 Guía completa:** Ver [`docs/COMPONENT_PATTERNS.md`](docs/COMPONENT_PATTERNS.md)

---

## Sistema de Tokens

### Flujo de Tokens

```
src/tokens/index.ts (✍️ MANUAL - única fuente de verdad)
        ↓
   npm run tokens:generate
        ↓
        ├→ tokens.json (React)
        ├→ css-variables.css (Web)
        └→ KdsTokens.kt (Android)
```

**Categorías:**
- **Colores**: Púrpura primario (#8347AD), semánticos
- **Tipografía**: Public Sans, Roboto, 8 tamaños
- **Espaciado**: Escala 0-96px + semántico
- **Border Radius**: Por componente
- **Sombras**: Basadas en elevación

**📘 Guía completa:** Ver [`docs/TOKENS_GUIDE.md`](docs/TOKENS_GUIDE.md)

---

## Android (Jetpack Compose)

### Resumen

Sistema de Diseño Khipu para Android - Componentes Jetpack Compose con Material 3.

**Detalles:**
- Paquete: `com.khipu:design-system`
- Stack: Kotlin 2.0.21, Compose, Material 3
- Min SDK: 24, Target SDK: 35
- Registro: Nexus (`dev.khipu.com/nexus/content/repositories/design-system`)

**Estado:**
- ✅ Tokens: 100% (sincronizado con React)
- ✅ Tema: 100% (Material 3 light/dark)
- ✅ Build: 100% (Nexus)
- ⚠️ Componentes: 8% (1/12 - solo KdsButton)

### Comandos Android

```bash
npm run android:build           # Compilar AAR
npm run android:test            # Ejecutar tests
npm run android:publish-local   # Maven Local
npm run android:publish         # Nexus
npm run android:clean           # Limpiar build
```

### Documentación Android

| Documento | Uso |
|-----------|-----|
| [`docs/android/ANDROID_SUMMARY.md`](docs/android/ANDROID_SUMMARY.md) | Resumen ejecutivo |
| [`docs/android/ANDROID_IMPLEMENTATION_PLAN.md`](docs/android/ANDROID_IMPLEMENTATION_PLAN.md) | Roadmap, templates |
| [`android/USAGE_GUIDE.md`](android/USAGE_GUIDE.md) | API reference |
| [`android/QUICK_START.md`](android/QUICK_START.md) | Guía 5 min |

---

## Referencia Rápida: Multi-plataforma

| Aspecto | React | Android | Grails | iOS |
|---------|-------|---------|--------|-----|
| **Lenguaje** | TypeScript | Kotlin | Groovy/GSP | Swift |
| **Framework** | React 18 | Jetpack Compose | Grails | SwiftUI |
| **UI Library** | Material UI v7 | Material 3 | Bootstrap-like | Material-inspired |
| **Tema** | `<KhipuThemeProvider>` | `KdsTheme { }` | Tag library | `KdsTheme` |
| **Componente** | `<KdsButton />` | `KdsButton()` | `<kds:button>` | `KdsButton()` |
| **Props** | `variant="contained"` | `variant = CONTAINED` | `variant="contained"` | `variant: .contained` |
| **Registro** | npmjs.org | Nexus | Nexus | CocoaPods |

---

## Índice de Documentación

Para una vista completa de toda la documentación disponible, consulta: **[docs/README.md](docs/README.md)**

### Documentación Organizada

```
docs/
├── README.md                          📍 Índice principal
├── BUILD_PUBLISHING.md                Build & Publishing
├── TOKENS_GUIDE.md                    Tokens de diseño
├── COMPONENT_PATTERNS.md              Patrones de componentes
├── TROUBLESHOOTING.md                 Troubleshooting
│
├── android/                           Android docs
│   ├── ANDROID_SUMMARY.md
│   └── ANDROID_IMPLEMENTATION_PLAN.md
│
├── grails/                            Grails/GSP docs
│   ├── README.md
│   └── GRAILS_IMPLEMENTATION_PLAN.md
│
├── design/                            Diseño
│   ├── DESIGN_SYSTEM_ANALYSIS.md
│   └── DESIGN_SYSTEM_PLAN.md
│
├── development/                       Desarrollo
│   └── PAINFUL_PATTERNS.md
│
├── deployment/                        Deployment
│   └── DEPLOYMENT-PLAN.md
│
└── project/                           Gestión
    └── BACKLOG.md
```

**Links Rápidos:**
- Guías por plataforma (React, Android, Grails): `docs/README.md`
- Estado del proyecto: `docs/README.md` → "Estado del Proyecto"
- Anti-patrones: `docs/development/PAINFUL_PATTERNS.md`
- Deployment: `docs/deployment/DEPLOYMENT-PLAN.md`

---

## Estructura de Archivos

```
src/
├── index.ts                 # Exports principales
├── components/
│   ├── core/               # 12 componentes Kds* (Alert, Button, Card, Checkbox, LinearProgress, LogoHeader, Modal, Spinner, Tabs, TextField, Typography)
│   └── domain/             # Futuro: componentes compuestos
├── tokens/
│   ├── index.ts           # ✍️ Fuente de verdad
│   ├── tokens.json        # Auto-generado
│   └── css-variables.css  # Auto-generado
├── theme/
│   ├── index.ts           # Tema MUI
│   └── ThemeProvider.tsx
├── examples/              # Ejemplos completos
└── stories/               # Docs de Storybook

android/
├── designsystem/
│   └── src/main/java/com/khipu/designsystem/
│       ├── tokens/
│       │   └── KdsTokens.kt        # Auto-generado
│       ├── theme/
│       │   └── Theme.kt
│       └── components/
│           └── KdsButton.kt

ios/
├── Sources/              # Código Swift
│   ├── Tokens/           # Design tokens
│   ├── Theme/            # KdsTheme
│   └── Components/       # Componentes SwiftUI

grails/
├── src/main/
│   ├── groovy/           # Tag libraries
│   └── resources/        # Assets y configuración
└── build.gradle          # Build del plugin

.github/workflows/
├── ci.yml               # CI en PRs y pushes a main
├── publish.yml          # Publish a npm + Nexus + CocoaPods en tags v*
└── storybook.yml        # Deploy Storybook a GitHub Pages
```

---

## Notas Importantes

- **Enfoque token-first**: Siempre usar tokens, nunca valores hardcodeados
- **MUI/Material 3 como base**: No es headless, aprovecha patrones establecidos
- **Componentes sin estado**: Estado se maneja en containers/ViewModels
- **Figma = fuente de verdad**: Valores de diseño vienen de Figma
- **Prefijo Kds**: Todos los componentes usan prefijo `Kds` (commit 9213d43). Ejemplo: `import { KdsButton } from '@khipu/design-system'` luego `<KdsButton />`
- **Archivos generados**: Los archivos `tokens.json`, `css-variables.css` y `KdsTokens.kt` son auto-generados. NO editar manualmente.
- **Sección Brand en Storybook**: Todas las páginas de documentación de marca (`src/stories/brand/*.stories.tsx`) usan:
  - Mismo título: `title: 'Brand'` (sin sub-rutas)
  - Ancho consistente: `maxWidth: '1000px'`
  - Nombres con espacios: Usar propiedad `name` para mostrar texto legible (ej: `name: 'Cómo funciona'`)
  - Mayúsculas solo al inicio: Seguir guía de marca (ej: "Voz y tono", no "Voz Y Tono")

---

## CI/CD Pipeline

El proyecto usa GitHub Actions para automatizar testing, builds y deployments:

**En PRs y pushes a `main`:**
- ✅ Lint & Typecheck (`npm run lint && npm run typecheck`)
- ✅ Tests (`npm run test`)
- ✅ Build Web (`npm run build`)
- ✅ Build Android (requiere `npm run tokens:generate` primero)

**En tags `v*` (ej: v0.1.0-alpha.6):**
- 📦 Publish a npm (`@khipu/design-system`)
- 📦 Publish a Nexus (Android + Grails)
- 📦 Publish a CocoaPods (iOS)
- 🚀 Deploy Storybook a GitHub Pages

**Workflows:**
- `.github/workflows/ci.yml` - CI en PRs y main
- `.github/workflows/publish.yml` - Publishing en tags
- `.github/workflows/storybook.yml` - Deploy de Storybook

---

## Troubleshooting Rápido

| Problema | Solución |
|----------|----------|
| **TypeScript errors** | `npm run typecheck` |
| **Build falla** | `rm -rf dist && npm run build` |
| **Storybook sin estilos** | Verificar `<KhipuThemeProvider>` |
| **Tokens desincronizados** | `npm run tokens:generate` |
| **Android build falla** | `npm run android:clean` o verificar que tokens estén generados |
| **CI falla en Android** | Asegurar que `npm run tokens:generate` se ejecutó antes del build |

**📘 Guía completa:** Ver [`docs/TROUBLESHOOTING.md`](docs/TROUBLESHOOTING.md)

---

## Custom Prompts para Claude Code

### Trabajar con Tokens
```
Lee docs/TOKENS_GUIDE.md.
Muestra cómo actualizar tokens de diseño y regenerar archivos derivados.
```

### Crear Componente React
```
Lee docs/COMPONENT_PATTERNS.md sección "Agregar un Nuevo Componente Core".
Crea [ComponentName] siguiendo el patrón de KdsButton.
```

### Crear Componente Android
```
Lee docs/android/ANDROID_IMPLEMENTATION_PLAN.md sección "Component Implementation Guidelines".
Usa android/.../components/KdsButton.kt como template.
Implementa [ComponentName] con enums, previews, y KDoc.
```

### Trabajar con Grails
```
Lee docs/grails/README.md.
Muestra cómo crear tag libraries y usar componentes en GSP.
```

### Build & Publishing
```
Lee docs/BUILD_PUBLISHING.md.
Muestra el workflow completo desde desarrollo hasta producción.
```

---

## Para Más Información

- **Documentación completa:** [`docs/README.md`](docs/README.md)
- **CI/CD (GitHub Actions):** [`docs/CI_CD_SETUP.md`](docs/CI_CD_SETUP.md)
- **Deployment:** [`docs/deployment/DEPLOYMENT-PLAN.md`](docs/deployment/DEPLOYMENT-PLAN.md)
- **Storybook:** [design.khipu.com](https://design.khipu.com)
- **Voz y tono:** [`BRAND_GUIDE_FOR_AI.md`](BRAND_GUIDE_FOR_AI.md)
