# Grails/GSP Design System - Documentation

Documentación completa para la implementación de Grails/GSP taglibs del Sistema de Diseño de Khipu.

## 🎯 Estado Actual: Integración con Payment Project

**✅ Plugin Completado** | **🚀 Integrando con ~/Code/payment**

El plugin de Grails taglibs está **100% implementado y publicado**. Ahora estamos integrando con el proyecto **payment** como objetivo principal.

### 📍 Cambio de Estrategia

- ❌ **Admin Project**: Discontinuado (ver [ADMIN_PROJECT_DISCONTINUATION.md](ADMIN_PROJECT_DISCONTINUATION.md))
- ✅ **Payment Project**: Objetivo principal (ver [PAYMENTS_INTEGRATION_PLAN.md](PAYMENTS_INTEGRATION_PLAN.md))

**Razón del cambio:** Payment tiene AWS CodeArtifact ya configurado, documentación clara, y es un proyecto activo en producción.

---

## 📚 Documentos Disponibles

### [🚀 PAYMENTS_INTEGRATION_PLAN.md](PAYMENTS_INTEGRATION_PLAN.md) ⭐ **START HERE**
**Plan de Integración con Payment Project**

Audiencia: Developers, Tech Leads, Payment Team

**Contenido:**
- Análisis completo del proyecto payment
- AWS CodeArtifact ya configurado
- Timeline de 6 semanas
- Pasos detallados de integración
- Ejemplos de migración de código
- Riesgos y mitigaciones

**Estado:** 🟢 Activo - Prioridad P0

---

### [GRAILS_IMPLEMENTATION_PLAN.md](GRAILS_IMPLEMENTATION_PLAN.md)
**Plan de Implementación Técnico Original**

Audiencia: Developers (Referencia técnica)

**Contenido:**
- Arquitectura multi-plataforma
- Especificaciones técnicas detalladas
- Plantillas de componentes (Groovy + CSS)
- Configuración de Gradle y CodeArtifact
- Guía de testing y migración

**Estado:** ✅ Completado - Usar como referencia técnica

---

### [🔴 ADMIN_PROJECT_DISCONTINUATION.md](ADMIN_PROJECT_DISCONTINUATION.md)
**Discontinuación del Admin Project**

Audiencia: Stakeholders, Project Managers

**Contenido:**
- Razones de la discontinuación
- Qué se completó y qué se reutiliza
- Plan de transición a payment
- Lecciones aprendidas

**Estado:** 🔴 Discontinuado - Archivar

---

## 🚀 Quick Start

### Para Consumidores (Payment Project)

**El plugin ya está publicado** en AWS CodeArtifact. Solo necesitas agregarlo a tu proyecto:

#### 1. Configurar Acceso a CodeArtifact

```bash
# Generar token de CodeArtifact
export CODEARTIFACT_TOKEN=$(aws codeartifact get-authorization-token \
  --domain khipu \
  --domain-owner 375783675928 \
  --region us-east-1 \
  --query authorizationToken \
  --output text)
```

#### 2. Agregar Plugin a BuildConfig.groovy

```groovy
// grails-app/conf/BuildConfig.groovy

plugins {
    // ... existing plugins ...

    // Khipu Design System Taglibs
    compile ":design-system-taglibs:0.1.0"
}
```

#### 3. Refrescar Dependencias

```bash
cd ~/Code/payment
./clean.sh
./grailsw "compile --refresh-dependencies"
```

#### 4. Usar Taglibs en GSP

```jsp
<!-- grails-app/views/yourView.gsp -->
<kds:button variant="contained" color="primary">
    Submit Payment
</kds:button>

<kds:textField name="email" label="Email" variant="outlined" />
```

**Ver guía completa:** [PAYMENTS_INTEGRATION_PLAN.md](PAYMENTS_INTEGRATION_PLAN.md)

---

### Para Developers del Plugin

Si necesitas modificar o republicar el plugin:

```bash
# 1. Hacer cambios en grails/plugins/design-system-taglibs/

# 2. Build del plugin
cd grails/plugins/design-system-taglibs
./gradlew clean build

# 3. Publicar a CodeArtifact
export CODEARTIFACT_TOKEN=<token>
./gradlew publish

# 4. Verificar publicación
aws codeartifact list-package-versions \
  --domain khipu \
  --repository maven-packages \
  --format maven \
  --package design-system-taglibs \
  --namespace com.khipu
```

---

## 🎯 Estado del Proyecto

### ✅ PLUGIN COMPLETO - EN INTEGRACIÓN CON PAYMENT

El plugin de Grails taglibs está **100% implementado y publicado** en AWS CodeArtifact. Actualmente integrando con el proyecto **payment**.

**Versión Actual:** 0.1.0
**Paquete:** `com.khipu:design-system-taglibs:0.1.0`
**Repositorio:** AWS CodeArtifact - `maven-packages`

**Tecnología:** CSS puro con CSS Variables (sin preprocesador) ✅

### Componentes Implementados

| Componente | Prioridad | Estado | CodeArtifact |
|------------|-----------|--------|--------------|
| Button | 🔴 Crítico | ✅ Completo | ✅ Publicado |
| TextField | 🔴 Crítico | ✅ Completo | ✅ Publicado |
| Card | 🟠 Alto | ✅ Completo | ✅ Publicado |
| Checkbox | 🟠 Alto | ✅ Completo | ✅ Publicado |
| Typography | 🟠 Alto | ✅ Completo | ✅ Publicado |
| Alert | 🟠 Alto | ✅ Completo | ✅ Publicado |
| Tabs | 🟡 Medio | ✅ Completo | ✅ Publicado |
| Spinner | 🟢 Bajo | ✅ Completo | ✅ Publicado |

**Total:** 8 componentes implementados y publicados

### Next Steps: Payment Integration

**Current Phase:** Week 1 - Dependency Integration
**Timeline:** 6 weeks
**Document:** [PAYMENTS_INTEGRATION_PLAN.md](PAYMENTS_INTEGRATION_PLAN.md)

---

## 📖 Guías por Tarea

### Para Implementadores

1. **Empezar la implementación:**
   - Leer `GRAILS_IMPLEMENTATION_PLAN.md` completo
   - Comenzar con Fase 1: Foundation (scripts de tokens)
   - Usar plantillas de código provistas

2. **Implementar un componente:**
   - Seguir patrón de `KdsButtonTagLib.groovy` (en plan)
   - Crear archivo `.groovy` + archivo `.scss`
   - Escribir tests Spock
   - Actualizar plugin descriptor

3. **Configurar build:**
   - Ver `GRAILS_IMPLEMENTATION_PLAN.md` → Sección "2.3 Gradle Build"
   - Configurar SCSS compilation
   - Setup Maven publishing

### Para Consumidores (Payment Project)

1. **Instalar design system:**
   - ✅ Ver `PAYMENTS_INTEGRATION_PLAN.md` → Sección "Phase 1: Dependency Integration"
   - Agregar plugin a BuildConfig.groovy (línea 158+)
   - Configurar CODEARTIFACT_TOKEN
   - Refrescar dependencias

2. **Migrar componentes:**
   - Ver `PAYMENTS_INTEGRATION_PLAN.md` → Sección "Phase 2: Pilot Implementation"
   - Usar patrones de migración documentados (Appendix B)
   - Bootstrap/HTML antiguo → Taglibs Design System
   - Testing visual side-by-side

---

## 🏗️ Arquitectura

### Token Flow

```
src/tokens/index.ts (Fuente de verdad)
    ↓
npm run tokens:generate
    ↓
src/tokens/css-variables.css ✅ YA EXISTE
    ↓
Gradle copyTokensCSS → grails/src/main/resources/css/
    ↓
~/Code/payment (consume CSS + taglibs)
```

**Ventaja:** ¡No necesita compilación! Los tokens CSS ya existen para React.

### Component Pattern

```
KdsButtonTagLib.groovy (renderiza HTML con clases)
         +
kds-components.css (aplica estilos usando CSS Variables)
         ↓
    HTML estilizado (sin compilación)
```

---

## 🔧 Scripts Disponibles

```bash
# Build (copia CSS automáticamente)
npm run grails:build           # Compilar plugin + copiar CSS tokens
npm run grails:clean           # Limpiar build artifacts

# Testing
npm run grails:test            # Ejecutar tests Spock

# Publishing
npm run grails:publish-local   # Publicar a Maven local
npm run grails:publish         # Publicar a AWS CodeArtifact

# Token generation (no necesario ejecutar separadamente)
npm run tokens:generate        # Ya genera css-variables.css para React
```

---

## 📦 Comparación Multi-Plataforma

| Aspecto | React | Android | Grails (Planeado) |
|---------|-------|---------|-------------------|
| **Lenguaje** | TypeScript | Kotlin | Groovy |
| **Output** | JSX | Composables | HTML + CSS |
| **Styling** | CSS-in-JS | Compose | CSS Variables |
| **Tokens** | JS imports | KdsTokens.kt | CSS Variables |
| **Build** | tsup | Gradle | Gradle (no compilación CSS) |
| **Componente** | `<Button />` | `KdsButton()` | `<kds:button>` |
| **Compilación CSS** | No | No | No ✅ |
| **Estado** | ✅ 100% | ⚠️ 8% (1/12) | ⚪ 0% (planeado) |

---

## 🎓 Ejemplos de Uso (Planeados)

### Button

```gsp
<kds:button variant="contained" color="primary">
    Submit Payment
</kds:button>

<kds:button variant="outlined" color="secondary" loading="true">
    Processing...
</kds:button>
```

### TextField

```gsp
<kds:textField
    name="email"
    label="Email"
    variant="outlined"
    error="${errors.hasFieldErrors('email')}"
    helperText="${errors.getFieldError('email')?.defaultMessage}">
</kds:textField>
```

### Card

```gsp
<kds:card variant="outlined" selected="${selectedBank == bank.id}">
    <kds:cardHeader>
        <img src="${bank.logo}" alt="${bank.name}">
    </kds:cardHeader>
    <kds:cardContent>
        <h3>${bank.name}</h3>
    </kds:cardContent>
</kds:card>
```

---

## 🐛 Troubleshooting (Para Futura Implementación)

### Build falla

```bash
# Limpiar y reconstruir
npm run grails:clean
npm run grails:build
```

### CSS no se copia

```bash
# Verificar que existe el archivo fuente
ls -la src/tokens/css-variables.css

# Ejecutar task manualmente
cd grails && ./gradlew copyTokensCSS

# Verificar destino
ls -la grails/src/main/resources/css/
```

### Token desincronizado

```bash
# Regenerar tokens CSS (para React)
npm run tokens:generate

# Verificar archivos
cat src/tokens/css-variables.css

# Reconstruir Grails (copia automáticamente)
npm run grails:build
```

---

## 📞 Soporte

Para preguntas sobre implementación:
1. Leer `GRAILS_IMPLEMENTATION_PLAN.md` primero
2. Revisar ejemplos de código en el plan
3. Consultar documentación de Grails 2.5.4
4. Contactar al equipo de Design System

---

## 🔗 Referencias

### Documentación Relacionada

- [`GRAILS_IMPLEMENTATION_PLAN.md`](GRAILS_IMPLEMENTATION_PLAN.md) - Plan completo de implementación
- [`../android/ANDROID_IMPLEMENTATION_PLAN.md`](../android/ANDROID_IMPLEMENTATION_PLAN.md) - Patrón similar para Android
- [`../../CLAUDE.md`](../../CLAUDE.md) - Overview del proyecto completo

### Documentación Externa

- [Grails 2.5.4 Docs](https://grails.github.io/grails2-doc/2.5.4/)
- [Groovy 2.4 Docs](https://groovy-lang.org/documentation.html)
- [Gradle User Guide](https://docs.gradle.org/current/userguide/userguide.html)
- [AWS CodeArtifact](https://docs.aws.amazon.com/codeartifact/)

---

**Última actualización:** 2026-02-24
**Estado:** Plugin completo (8 componentes) - Integrando con Payment Project
**Próximo paso:** Dependency Integration (Week 1) - Ver PAYMENTS_INTEGRATION_PLAN.md
