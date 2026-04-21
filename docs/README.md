# Design System Documentation Index

Índice completo de documentación del Sistema de Diseño de Khipu.

---

## 🚀 Quick Start

- **For React Developers**: [`../CLAUDE.md`](../CLAUDE.md) (Sección React)
- **For Android Developers**: [`android/ANDROID_SUMMARY.md`](android/ANDROID_SUMMARY.md) → [`android/ANDROID_IMPLEMENTATION_PLAN.md`](android/ANDROID_IMPLEMENTATION_PLAN.md)
- **For Grails/GSP Developers**: [`grails/README.md`](grails/README.md) → [`grails/GRAILS_IMPLEMENTATION_PLAN.md`](grails/GRAILS_IMPLEMENTATION_PLAN.md)
- **For Library Consumers**: [`../android/QUICK_START.md`](../android/QUICK_START.md) (5 minutos)
- **For Product Managers**: [`android/ANDROID_SUMMARY.md`](android/ANDROID_SUMMARY.md)

---

## 📱 Por Plataforma

### React / Web
- **README Principal**: [`../README.md`](../README.md) - Introducción y guía rápida
- **CLAUDE.md**: [`../CLAUDE.md`](../CLAUDE.md) - Guía para desarrollo asistido por IA
- **Build & Publishing**: [`BUILD_PUBLISHING.md`](BUILD_PUBLISHING.md) - Cómo construir y publicar packages
- **Tokens de Diseño**: [`TOKENS_GUIDE.md`](TOKENS_GUIDE.md) - Sistema de tokens y generación multi-plataforma
- **Patrones de Componentes**: [`COMPONENT_PATTERNS.md`](COMPONENT_PATTERNS.md) - Arquitectura y convenciones
- **Troubleshooting**: [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) - Problemas comunes y sincronización
- **Anti-patrones**: [`development/PAINFUL_PATTERNS.md`](development/PAINFUL_PATTERNS.md) - Patrones a evitar

### Android (Jetpack Compose)
- **📋 Resumen Ejecutivo**: [`android/ANDROID_SUMMARY.md`](android/ANDROID_SUMMARY.md) - Estado actual y recomendaciones
- **📖 Plan de Implementación**: [`android/ANDROID_IMPLEMENTATION_PLAN.md`](android/ANDROID_IMPLEMENTATION_PLAN.md) - Roadmap completo de 6 semanas
- **📘 Guía de Uso**: [`../android/USAGE_GUIDE.md`](../android/USAGE_GUIDE.md) - Documentación para consumidores
- **⚡ Quick Start**: [`../android/QUICK_START.md`](../android/QUICK_START.md) - Guía de 30 segundos
- **README Android**: [`../android/README.md`](../android/README.md) - Visión general técnica

### Grails/GSP (Planeado)
- **📋 README**: [`grails/README.md`](grails/README.md) - Overview y quick start
- **📖 Plan de Implementación**: [`grails/GRAILS_IMPLEMENTATION_PLAN.md`](grails/GRAILS_IMPLEMENTATION_PLAN.md) - Roadmap completo de 8 semanas
- **🎯 Uso Principal**: Proyecto `~/Code/payment` (Grails 2.5.4)

### iOS (Planeado)
_Pendiente de implementación_

---

## 🎨 Por Área Temática

### Diseño y Figma
- **Comparación Figma vs Código**: [`COMPARACION-FIGMA-VS-CODIGO.md`](COMPARACION-FIGMA-VS-CODIGO.md)
- **Crear Ejemplos desde Figma**: [`CREAR-EJEMPLOS-DESDE-FIGMA.md`](CREAR-EJEMPLOS-DESDE-FIGMA.md)
- **Análisis del Sistema**: [`design/DESIGN_SYSTEM_ANALYSIS.md`](design/DESIGN_SYSTEM_ANALYSIS.md)
- **Plan de Diseño**: [`design/DESIGN_SYSTEM_PLAN.md`](design/DESIGN_SYSTEM_PLAN.md)

### Desarrollo
- **Guía Principal (Claude)**: [`../CLAUDE.md`](../CLAUDE.md)
- **Anti-patrones**: [`development/PAINFUL_PATTERNS.md`](development/PAINFUL_PATTERNS.md)

### Deployment & Infraestructura
- **Plan de Deployment**: [`deployment/DEPLOYMENT-PLAN.md`](deployment/DEPLOYMENT-PLAN.md) - AWS CodeArtifact
- **CI/CD Setup**: [`CI_CD_SETUP.md`](CI_CD_SETUP.md) - Bitbucket Pipelines, Team Setup
- **Demo & Release**: [`DEMO_AND_RELEASE.md`](DEMO_AND_RELEASE.md) - Recording demos, Publishing, Installing

### Multi-plataforma
- **Plan Multi-plataforma**: [`multi-platform/MULTI_PLATFORM_ACTION_PLAN.md`](multi-platform/MULTI_PLATFORM_ACTION_PLAN.md)
- **Plan Multi-plataforma (v2)**: [`multi-platform/MULTI-PLATFORM-PLAN.md`](multi-platform/MULTI-PLATFORM-PLAN.md)

### Gestión de Proyecto
- **Backlog**: [`project/BACKLOG.md`](project/BACKLOG.md) - Tareas pendientes y prioridades

---

## 🎯 Guías Rápidas por Caso de Uso

### "Quiero implementar un nuevo componente React"
1. Lee [`COMPONENT_PATTERNS.md`](COMPONENT_PATTERNS.md) - Sección "Agregar un Nuevo Componente Core"
2. Revisa componentes existentes en `src/components/core/`
3. Usa plantilla de componente en COMPONENT_PATTERNS.md
4. Verifica contra [`development/PAINFUL_PATTERNS.md`](development/PAINFUL_PATTERNS.md) para evitar anti-patrones

### "Quiero implementar un componente Android"
1. **Primero**: Lee [`android/ANDROID_SUMMARY.md`](android/ANDROID_SUMMARY.md) para contexto
2. **Roadmap**: Consulta [`android/ANDROID_IMPLEMENTATION_PLAN.md`](android/ANDROID_IMPLEMENTATION_PLAN.md)
3. **Plantilla**: Usa template de componente en el plan de implementación
4. **Referencia**: Mira `android/designsystem/.../components/KdsButton.kt` como ejemplo

### "Quiero implementar un componente Grails/GSP"
1. **Primero**: Lee [`grails/GRAILS_IMPLEMENTATION_PLAN.md`](grails/GRAILS_IMPLEMENTATION_PLAN.md) para contexto completo
2. **Plantilla Taglib**: Usa template de `KdsButtonTagLib.groovy` en el plan
3. **Plantilla SCSS**: Usa template de `_button.scss` en el plan
4. **Testing**: Escribe tests Spock siguiendo el patrón del plan

### "Quiero usar el Design System en mi app Android"
1. **Quick Start**: [`../android/QUICK_START.md`](../android/QUICK_START.md) (5 minutos)
2. **Guía Completa**: [`../android/USAGE_GUIDE.md`](../android/USAGE_GUIDE.md) (referencia completa)

### "Quiero migrar ~/Code/payment a Design System"
1. **Plan de Implementación**: [`grails/GRAILS_IMPLEMENTATION_PLAN.md`](grails/GRAILS_IMPLEMENTATION_PLAN.md) - Sección "5.2 Migration Guide"
2. **Patrones de Migración**: Bootstrap → Design System equivalents
3. **Estrategia Incremental**: Co-existencia con Bootstrap durante migración

### "Quiero actualizar tokens de diseño"
1. Lee [`TOKENS_GUIDE.md`](TOKENS_GUIDE.md) para contexto completo
2. Actualiza `src/tokens/index.ts` manualmente
3. Ejecuta `npm run tokens:generate` para auto-generar JSON, CSS, y Kotlin
4. Verifica en Storybook: `npm run storybook`

### "Quiero publicar una nueva versión"
1. Lee [`BUILD_PUBLISHING.md`](BUILD_PUBLISHING.md) para workflow completo
2. Ver también: [`DEMO_AND_RELEASE.md`](DEMO_AND_RELEASE.md) - Demo recording + publishing

### "Tengo un error o problema"
1. Revisa [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) para problemas comunes
2. Verifica sincronización de archivos (tokens, brand guides)
3. Ejecuta `npm run typecheck` y `npm run build`

**Quick commands:**

**React/Web:**
```bash
# Actualizar versión en package.json
aws codeartifact login --tool npm --domain khipu --repository npm-packages
npm run build && npm publish
```

**Android:**
```bash
# Actualizar versión en android/designsystem/build.gradle.kts
source ~/scripts/khipu-codeartifact.sh
npm run android:publish
```

**Ambos + Git tag:**
```bash
git commit -am "chore: bump version to X.Y.Z"
git tag vX.Y.Z
git push origin main --tags
```

### "Quiero comparar implementación con Figma"
1. Lee [`COMPARACION-FIGMA-VS-CODIGO.md`](COMPARACION-FIGMA-VS-CODIGO.md)
2. Usa Figma MCP para screenshots: "Toma un screenshot del componente X en Figma"

### "Quiero configurar CI/CD o agregar a un nuevo dev al equipo"
1. **CI/CD Setup**: Lee [`CI_CD_SETUP.md`](CI_CD_SETUP.md) - Bitbucket Pipelines completo
2. **Team Onboarding**: Sigue checklist en la misma guía
3. **Quick Auth Script**: Usa `~/scripts/khipu-codeartifact.sh` del documento

### "Quiero grabar un demo y publicar una versión"
1. **Guía Completa**: [`DEMO_AND_RELEASE.md`](DEMO_AND_RELEASE.md)
2. **Web Demo**: `npm run storybook` → Record screen
3. **Android Demo**: Run app on emulator → Record screen
4. **Publish**: Update versions → Build → Publish → Tag Git

---

## 🔍 Búsqueda Rápida

### Por Plataforma
- **React**: [`../CLAUDE.md`](../CLAUDE.md), [`../README.md`](../README.md), `src/`
- **Android**: `docs/android/`, `android/`
- **Grails/GSP**: `docs/grails/`, [`grails/GRAILS_IMPLEMENTATION_PLAN.md`](grails/GRAILS_IMPLEMENTATION_PLAN.md)
- **Figma**: [`COMPARACION-FIGMA-VS-CODIGO.md`](COMPARACION-FIGMA-VS-CODIGO.md), [`CREAR-EJEMPLOS-DESDE-FIGMA.md`](CREAR-EJEMPLOS-DESDE-FIGMA.md)

### Por Tarea
- **Desarrollo**: [`../CLAUDE.md`](../CLAUDE.md)
- **Uso/Integración**: [`../android/USAGE_GUIDE.md`](../android/USAGE_GUIDE.md), [`../android/QUICK_START.md`](../android/QUICK_START.md)
- **Planificación**: [`android/ANDROID_IMPLEMENTATION_PLAN.md`](android/ANDROID_IMPLEMENTATION_PLAN.md), [`multi-platform/MULTI_PLATFORM_ACTION_PLAN.md`](multi-platform/MULTI_PLATFORM_ACTION_PLAN.md)
- **Arquitectura**: [`../CLAUDE.md`](../CLAUDE.md) (Arquitectura de Alto Nivel), [`design/DESIGN_SYSTEM_ANALYSIS.md`](design/DESIGN_SYSTEM_ANALYSIS.md)
- **Deployment**: [`deployment/DEPLOYMENT-PLAN.md`](deployment/DEPLOYMENT-PLAN.md)
- **CI/CD & Pipelines**: [`CI_CD_SETUP.md`](CI_CD_SETUP.md)

### Por Audiencia
- **Desarrolladores React**: [`../CLAUDE.md`](../CLAUDE.md), [`development/PAINFUL_PATTERNS.md`](development/PAINFUL_PATTERNS.md)
- **Desarrolladores Android**: `docs/android/` (todos los archivos)
- **Desarrolladores Grails/GSP**: [`grails/README.md`](grails/README.md), [`grails/GRAILS_IMPLEMENTATION_PLAN.md`](grails/GRAILS_IMPLEMENTATION_PLAN.md)
- **Consumidores de la librería**: [`../android/USAGE_GUIDE.md`](../android/USAGE_GUIDE.md), [`../android/QUICK_START.md`](../android/QUICK_START.md)
- **DevOps/Platform Engineers**: [`CI_CD_SETUP.md`](CI_CD_SETUP.md), [`deployment/DEPLOYMENT-PLAN.md`](deployment/DEPLOYMENT-PLAN.md)
- **Product Managers**: [`android/ANDROID_SUMMARY.md`](android/ANDROID_SUMMARY.md), [`multi-platform/MULTI_PLATFORM_ACTION_PLAN.md`](multi-platform/MULTI_PLATFORM_ACTION_PLAN.md)
- **Diseñadores**: [`COMPARACION-FIGMA-VS-CODIGO.md`](COMPARACION-FIGMA-VS-CODIGO.md)

---

## 📊 Estado del Proyecto (Actualizado: 2026-04-21)

### Implementación

| Plataforma | Tokens | Tema | Componentes | Stories | Estado |
|------------|--------|------|-------------|---------|--------|
| React/Web | ✅ 100% | ✅ 100% | ✅ 17/17 (100%) | 🟡 9/17 (53%) | Producción |
| Android | ✅ 100% | ✅ 100% | ⚠️ 1/17 (6%) | ❌ 0/17 (0%) | Alpha |
| Grails/GSP | ⚪ Planeado | ⚪ Planeado | ⚪ 0/17 (0%) | ⚪ 0/17 (0%) | Planificación |
| iOS | ✅ 100% | ⚪ Parcial | ❌ 0/17 (0%) | ❌ 0/17 (0%) | Alpha |

### Componentes Web Implementados (17)

✅ **Con Stories (9):** KdsButton, KdsTextField, KdsCheckbox, KdsModal, KdsCard, KdsSpinner, KdsTypography, KdsTabs, KdsLogoHeader

⚪ **Sin Stories (8):** KdsLinearProgress, KdsAlert, KdsRadioGroup, KdsSelect, KdsChip, KdsSnackbar, KdsTooltip, KdsAccordion

### Prioridades Android (Próximas 2 semanas)
1. KdsTextField (CRÍTICO)
2. KdsCard (CRÍTICO)
3. KdsTypography (ALTO)
4. KdsCheckbox (ALTO)

### Prioridades Grails (Próximas 8 semanas - Timeline estimado)
1. **Fase 1 (Week 1-2)**: Token generation script, Gradle build, CodeArtifact
2. **Fase 2 (Week 3-4)**: Button, TextField, Card
3. **Fase 3 (Week 5)**: Checkbox, Typography, Alert
4. **Fase 4 (Week 6)**: Modal, Tabs, Progress
5. **Fase 5 (Week 7-8)**: Documentation, migration guide

Ver [`android/ANDROID_SUMMARY.md`](android/ANDROID_SUMMARY.md) y [`grails/GRAILS_IMPLEMENTATION_PLAN.md`](grails/GRAILS_IMPLEMENTATION_PLAN.md) para detalles.

---

## 📁 Estructura de Documentación

```
docs/
├── README.md                          📍 Este archivo - Índice principal
├── DOCUMENTATION_MAP.md               Mapa visual de documentación
├── CI_CD_SETUP.md                     🔧 Pipelines & Team Setup
├── DEMO_AND_RELEASE.md                🎬 Demo Recording & Publishing
│
├── android/                           Android documentation hub
│   ├── ANDROID_SUMMARY.md             Resumen ejecutivo
│   └── ANDROID_IMPLEMENTATION_PLAN.md Roadmap completo
│
├── grails/                            🆕 Grails/GSP documentation hub
│   ├── README.md                      Overview y quick start
│   └── GRAILS_IMPLEMENTATION_PLAN.md  Roadmap completo de 8 semanas
│
├── design/                            Design & planning
│   ├── DESIGN_SYSTEM_ANALYSIS.md
│   └── DESIGN_SYSTEM_PLAN.md
│
├── development/                       Development guides
│   └── PAINFUL_PATTERNS.md            Anti-patrones
│
├── deployment/                        Deployment & release
│   └── DEPLOYMENT-PLAN.md             AWS CodeArtifact
│
├── multi-platform/                    Multi-platform strategy
│   ├── MULTI_PLATFORM_ACTION_PLAN.md
│   └── MULTI-PLATFORM-PLAN.md
│
├── project/                           Project management
│   └── BACKLOG.md
│
├── COMPARACION-FIGMA-VS-CODIGO.md     Figma guides
└── CREAR-EJEMPLOS-DESDE-FIGMA.md
```

---

## 🆘 Ayuda y Soporte

- **Preguntas sobre React**: Revisa [`../CLAUDE.md`](../CLAUDE.md) primero
- **Preguntas sobre Android**: Revisa [`../android/USAGE_GUIDE.md`](../android/USAGE_GUIDE.md) (sección FAQ)
- **Issues**: GitHub Issues en el repositorio
- **Slack**: #design-system

---

**Última actualización**: 2026-04-21
**Versión actual**: 0.1.0-alpha.44
**Mantenedor**: Design System Team

Para un mapa visual de la documentación, consulta: [`DOCUMENTATION_MAP.md`](DOCUMENTATION_MAP.md)
