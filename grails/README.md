# Khipu Design System - Grails Plugin

Sistema de diseño de Khipu para aplicaciones Grails/GSP. Proporciona componentes de UI consistentes con las implementaciones de React y Android.

## 🎯 Estado Actual

**Versión:** `0.1.0-alpha.1` ✅ **PUBLICADO en AWS CodeArtifact**

**Fase 1: Foundation - COMPLETADA ✅**

- ✅ Estructura de directorios
- ✅ Gradle build configurado
- ✅ CSS Variables copiados desde React (7.7KB)
- ✅ CSS de componentes creado (11KB)
- ✅ Plugin descriptor
- ✅ Publicado a AWS CodeArtifact
- ✅ KdsButton taglib implementado y testeado

**Componentes Disponibles:**
- ✅ **KdsButton** - Todas las variantes, colores, tamaños y estados

**Próximos componentes:** KdsAlert, KdsTextField, KdsCheckbox, KdsSelect, KdsForm

## 📦 Contenido Actual

```
grails/
├── build.gradle                     # Gradle build (sin SCSS!)
├── src/
│   ├── main/
│   │   ├── groovy/
│   │   │   └── com/khipu/designsystem/taglib/  # Taglibs (vacío)
│   │   └── resources/
│   │       ├── css/
│   │       │   ├── kds-tokens.css              # ✅ CSS Variables (7.7KB)
│   │       │   └── kds-components.css          # ✅ Estilos (11KB)
│   │       └── META-INF/
│   │           └── grails-plugin.xml           # ✅ Plugin descriptor
│   └── test/
│       └── groovy/                             # Tests (vacío)
├── test-components.html                        # ✅ HTML de prueba
└── README.md                                   # Este archivo
```

## 🚀 Comandos Disponibles

### Desde el directorio raíz del proyecto:

```bash
# Build del plugin
npm run grails:build

# Publicar a Maven Local (testing)
npm run grails:publish-local

# Ejecutar tests
npm run grails:test

# Limpiar build
npm run grails:clean

# Mostrar información
npm run grails:info

# Publicar a AWS CodeArtifact (requiere configuración)
npm run grails:publish
```

### Desde el directorio grails/:

```bash
# Build
../android/gradlew build

# Copiar CSS manualmente
../android/gradlew copyTokensCSS

# Publicar localmente
../android/gradlew publishToMavenLocal
```

## 🚀 Uso en Proyectos Grails

### Guía Completa de Integración

Ver **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** para instrucciones detalladas sobre cómo:
- Configurar AWS CodeArtifact
- Agregar el plugin a tu proyecto
- Usar los taglibs disponibles
- Troubleshooting

### Quick Start

1. **Agregar plugin en `BuildConfig.groovy`:**

```groovy
plugins {
    compile 'com.khipu:design-system-grails:0.1.0-alpha.1'
}
```

2. **Incluir CSS en layout:**

```gsp
<link rel="stylesheet" href="${resource(dir: 'css', file: 'kds-tokens.css', plugin: 'design-system-grails')}"/>
<link rel="stylesheet" href="${resource(dir: 'css', file: 'kds-components.css', plugin: 'design-system-grails')}"/>
```

3. **Usar taglibs:**

```gsp
<kds:button type="submit" variant="contained" color="primary">
    PAGAR AHORA
</kds:button>
```

## 🧪 Testing Visual

Abre el HTML de test para ver todos los componentes:

```bash
open test-button-taglib.html
```

Muestra todos los botones con diferentes variantes, colores, tamaños y estados.

## 📚 Documentación

Ver documentación completa:
- [`docs/grails/GRAILS_IMPLEMENTATION_PLAN.md`](../docs/grails/GRAILS_IMPLEMENTATION_PLAN.md) - Plan completo
- [`docs/grails/README.md`](../docs/grails/README.md) - Overview

## 🎨 Componentes Disponibles (CSS)

Los siguientes componentes tienen estilos CSS completos:

### 1. Button
- Variants: `contained`, `outlined`, `text`
- Colors: `primary`, `secondary`, `success`, `error`, `warning`, `info`
- Sizes: `small`, `medium`, `large`
- States: `loading`, `disabled`, `full-width`

### 2. TextField
- Label y helper text
- Estados: `default`, `error`, `disabled`
- Soporte para textarea
- Character counter

### 3. Card
- Variants: `elevated`, `outlined`, `filled`
- Estados: `clickable`, `selected`, `error`
- Secciones: `header`, `content`, `actions`

## ⏭️ Próximos Pasos

**Próximos Componentes (según prioridad):**

1. ✅ **KdsButtonTagLib** - COMPLETADO
2. `KdsAlertTagLib` (6 horas) - Mensajes de error/éxito
3. `KdsTextFieldTagLib` (8 horas) - Inputs de formulario
4. `KdsCheckboxTagLib` (5 horas) - Checkboxes
5. `KdsSelectTagLib` (10 horas) - Selects y dropdowns
6. `KdsFormTagLib` (5 horas) - Wrapper de formularios

Ver plan completo en: [`docs/grails/FORM_COMPONENTS_PLAN.md`](../docs/grails/FORM_COMPONENTS_PLAN.md)

**Ejemplo de uso futuro:**
```gsp
<kds:form action="procesarPago">
    <kds:textField
        name="email"
        label="Email"
        required="true"
        bean="${mandate}"
        field="email"/>

    <kds:button type="submit" loading="${procesando}">
        ${procesando ? 'Procesando...' : 'PAGAR AHORA'}
    </kds:button>
</kds:form>
```

## 🔧 Tecnología

- **CSS:** Pure CSS with CSS Variables (no preprocessor)
- **Grails:** 2.5.4+
- **Groovy:** 2.4.15
- **Gradle:** 7.6.4
- **Build time:** ~0.5s (super rápido!)

## 📦 Artifacts

### AWS CodeArtifact (Producción)

```
Artifact: com.khipu:design-system-grails:0.1.0-alpha.1
Domain: khipu
Repository: maven-packages
Status: ✅ Published
```

**Verificar versiones disponibles:**
```bash
aws codeartifact list-package-versions \
  --domain khipu \
  --repository maven-packages \
  --format maven \
  --namespace com.khipu \
  --package design-system-grails
```

### JAR Contents

```
design-system-grails-0.1.0-alpha.1.jar (18KB)
├── META-INF/
│   ├── MANIFEST.MF
│   └── grails-plugin.xml            # Plugin descriptor
├── com/khipu/designsystem/taglib/
│   └── KdsButtonTagLib.class        # Button taglib
└── css/
    ├── kds-tokens.css (7.8KB)       # Design tokens
    └── kds-components.css (11.4KB)  # Component styles
```

## 🐛 Troubleshooting

### Build falla

```bash
npm run grails:clean
npm run grails:build
```

### CSS no se copia

```bash
cd grails && ../android/gradlew copyTokensCSS
```

### Token desincronizado

```bash
# Regenerar tokens (en raíz del proyecto)
npm run tokens:generate

# Rebuild Grails
npm run grails:build
```

## 📞 Soporte

- **Documentación:** `docs/grails/`
- **Plan de implementación:** `docs/grails/GRAILS_IMPLEMENTATION_PLAN.md`
- **Issues:** GitHub Issues del repositorio

---

**Version:** 0.1.0-alpha.1
**Last Updated:** 2026-02-23
**Status:** Phase 1 Complete ✅
