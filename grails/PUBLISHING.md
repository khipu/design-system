# Publishing Grails Plugin to AWS CodeArtifact

Guía completa para publicar el plugin de Grails a AWS CodeArtifact.

## 🎯 Overview

El plugin de Grails se publica como un **artifact Maven** que contiene:
- Taglibs compilados (archivos .class)
- Recursos CSS (kds-tokens.css, kds-components.css)
- Plugin descriptor (grails-plugin.xml)

Los proyectos Grails pueden consumirlo directamente como cualquier dependencia Maven.

---

## 📦 Repositorios Disponibles

### Opción 1: maven-packages (Recomendado)
- **URL:** `maven/maven-packages/`
- **Uso:** Compartido con Android
- **Ventaja:** Un solo repositorio para todas las plataformas JVM

### Opción 2: grails-packages (Dedicado)
- **URL:** `maven/grails-packages/`
- **Uso:** Exclusivo para Grails
- **Ventaja:** Separación de concerns

**Recomendación:** Usar `maven-packages` para simplificar.

---

## 🚀 Publicación - Paso a Paso

### 1. Autenticar con AWS CodeArtifact

```bash
# Generar token (válido 12 horas)
source ~/scripts/khipu-codeartifact-grails.sh
```

**Output esperado:**
```
🔐 Authenticating with AWS CodeArtifact (Grails)...
📦 Domain: khipu
👤 Account: 375783675928
✅ Authentication successful!

Environment variables set:
  CODEARTIFACT_TOKEN=***
  CODEARTIFACT_URL=https://khipu-375783675928.d.codeartifact.us-east-1.amazonaws.com/maven/maven-packages/

Token valid for: 12 hours
```

### 2. Verificar Configuración

```bash
# Desde raíz del proyecto
npm run grails:info
```

**Verificar que muestra:**
```
Version:   0.1.0-alpha.1
Group:     com.khipu
Artifact:  design-system-grails
```

### 3. Build del Plugin

```bash
npm run grails:build
```

**Output esperado:**
```
> Task :copyTokensCSS
✅ CSS Variables copied to grails/src/main/resources/css/kds-tokens.css

> Task :build

✅ Build successful!

JAR location: build/libs/design-system-grails-0.1.0-alpha.1.jar
```

### 4. Publicar a CodeArtifact

```bash
npm run grails:publish
```

**Output esperado:**
```
> Task :publishMavenPublicationToCodeArtifactRepository
Publishing to AWS CodeArtifact...

BUILD SUCCESSFUL
```

---

## ✅ Verificar Publicación

### Método 1: AWS CLI

```bash
aws codeartifact list-package-versions \
  --domain khipu \
  --repository maven-packages \
  --format maven \
  --namespace com.khipu \
  --package design-system-grails \
  --region us-east-1
```

**Output esperado:**
```json
{
    "versions": [
        {
            "version": "0.1.0-alpha.1",
            "status": "Published"
        }
    ]
}
```

### Método 2: AWS Console

1. Ir a: https://console.aws.amazon.com/codesuite/codeartifact/
2. Seleccionar domain: `khipu`
3. Seleccionar repository: `maven-packages`
4. Buscar: `com.khipu:design-system-grails`

---

## 🔧 Consumir desde Proyecto Grails

### Configuración en ~/Code/payment

#### 1. Generar Token de CodeArtifact

```bash
# En el proyecto payment
source ~/scripts/khipu-codeartifact-grails.sh
```

#### 2. Actualizar BuildConfig.groovy

```groovy
grails.project.dependency.resolution = {

    // Agregar repositorio CodeArtifact
    repositories {
        grailsCentral()
        mavenCentral()
        mavenLocal()

        // ✨ NUEVO: CodeArtifact para Design System
        maven {
            name 'khipu-codeartifact'
            url "https://khipu-375783675928.d.codeartifact.us-east-1.amazonaws.com/maven/maven-packages/"
            credentials {
                username = "aws"
                password = System.getenv('CODEARTIFACT_TOKEN')
            }
        }
    }

    dependencies {
        // ✨ NUEVO: Khipu Design System
        compile 'com.khipu:design-system-grails:0.1.0-alpha.1'
    }
}
```

#### 3. Incluir CSS en Layouts

```gsp
<!-- grails-app/views/layouts/main.gsp -->
<!DOCTYPE html>
<html>
<head>
    <title>Khipu Payment</title>

    <!-- ✨ NUEVO: Khipu Design System CSS -->
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'kds-tokens.css')}"/>
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'kds-components.css')}"/>

    <g:layoutHead/>
</head>
<body>
    <g:layoutBody/>
</body>
</html>
```

#### 4. Usar Taglibs (Después de Fase 2)

```gsp
<!-- grails-app/views/mandate/create.gsp -->
<g:form action="save" method="POST">

    <kds:textField
        name="accountHolderName"
        label="Nombre del titular"
        value="${mandate?.accountHolderName}"
        required="true"
        error="${errors.hasFieldErrors('accountHolderName')}"
        helperText="${errors.getFieldError('accountHolderName')?.defaultMessage}">
    </kds:textField>

    <kds:textField
        name="accountNumber"
        label="Número de cuenta"
        type="number"
        value="${mandate?.accountNumber}"
        required="true"
        error="${errors.hasFieldErrors('accountNumber')}"
        helperText="${errors.getFieldError('accountNumber')?.defaultMessage}">
    </kds:textField>

    <div style="display: flex; gap: 12px; margin-top: 24px;">
        <kds:button variant="outlined" color="secondary" onclick="history.back()" style="flex: 1;">
            Cancelar
        </kds:button>
        <kds:button type="submit" variant="contained" color="primary" style="flex: 1;">
            Confirmar Mandato
        </kds:button>
    </div>

</g:form>
```

---

## 🔄 Actualizar Versión

Cuando publiques una nueva versión:

### 1. Actualizar Versión

```groovy
// grails/build.gradle
version = '0.1.0-alpha.2'

// grails/gradle.properties
version=0.1.0-alpha.2
```

### 2. Build y Publicar

```bash
source ~/scripts/khipu-codeartifact-grails.sh
npm run grails:build
npm run grails:publish
```

### 3. Actualizar en Proyecto Consumidor

```groovy
// ~/Code/payment/grails-app/conf/BuildConfig.groovy
dependencies {
    compile 'com.khipu:design-system-grails:0.1.0-alpha.2' // ← Nueva versión
}
```

```bash
cd ~/Code/payment
grails clean
grails compile
grails run-app
```

---

## 🐛 Troubleshooting

### Token Expiró

**Error:**
```
401 Unauthorized
```

**Solución:**
```bash
# Regenerar token
source ~/scripts/khipu-codeartifact-grails.sh
npm run grails:publish
```

### No se encuentra el package

**Error:**
```
Could not resolve: com.khipu:design-system-grails:0.1.0-alpha.1
```

**Verificar:**
```bash
# 1. Verificar que está publicado
aws codeartifact list-package-versions \
  --domain khipu \
  --repository maven-packages \
  --format maven \
  --namespace com.khipu \
  --package design-system-grails

# 2. Verificar token en proyecto consumidor
echo $CODEARTIFACT_TOKEN

# 3. Regenerar token si está vacío
source ~/scripts/khipu-codeartifact-grails.sh
```

### CSS no se carga

**Error:** 404 en archivos CSS

**Solución:**

Los archivos CSS están dentro del JAR. Grails 2.5.4 puede requerir configuración adicional:

```groovy
// grails-app/conf/Config.groovy
grails.resources.mappers.csslinks.excludes = []
```

O usar directamente desde resources:

```gsp
<link rel="stylesheet" href="${resource(plugin: 'design-system', dir: 'css', file: 'kds-tokens.css')}"/>
<link rel="stylesheet" href="${resource(plugin: 'design-system', dir: 'css', file: 'kds-components.css')}"/>
```

---

## 📊 Información del Artifact

### Group ID
```
com.khipu
```

### Artifact ID
```
design-system-grails
```

### Versión Actual
```
0.1.0-alpha.1
```

### Coordenadas Maven Completas
```xml
<dependency>
    <groupId>com.khipu</groupId>
    <artifactId>design-system-grails</artifactId>
    <version>0.1.0-alpha.1</version>
</dependency>
```

### Contenido del JAR (5.6KB)
```
design-system-grails-0.1.0-alpha.1.jar
├── META-INF/
│   ├── MANIFEST.MF
│   └── grails-plugin.xml
└── css/
    ├── kds-tokens.css (7.8KB)
    └── kds-components.css (11.4KB)
```

---

## 🔐 Seguridad

### Token de CodeArtifact

- ⏱️ **Validez:** 12 horas
- 🔒 **Scope:** Solo lectura/escritura en repositorio específico
- 🔄 **Regeneración:** Ejecutar script de autenticación

### Best Practices

1. **No commitear tokens** - Usar variables de entorno
2. **Regenerar antes de publicar** - Token fresco cada vez
3. **Usar en CI/CD** - Bitbucket Pipelines puede generar token automáticamente

---

## 🚀 CI/CD Publishing (Futuro)

Configurar Bitbucket Pipelines para publicación automática:

```yaml
# bitbucket-pipelines.yml
pipelines:
  branches:
    main:
      - step:
          name: Publish Grails Plugin
          script:
            # Authenticate with CodeArtifact
            - export CODEARTIFACT_TOKEN=$(aws codeartifact get-authorization-token --domain khipu --region us-east-1 --query authorizationToken --output text)
            - export CODEARTIFACT_URL=https://khipu-375783675928.d.codeartifact.us-east-1.amazonaws.com/maven/maven-packages/

            # Build and publish
            - cd grails
            - ../android/gradlew build
            - ../android/gradlew publish
```

---

## 📚 Referencias

- [AWS CodeArtifact - Maven](https://docs.aws.amazon.com/codeartifact/latest/ug/maven-mvn.html)
- [Grails Plugin Development](https://grails.github.io/grails2-doc/2.5.4/guide/plugins.html)
- [Gradle Maven Publish](https://docs.gradle.org/current/userguide/publishing_maven.html)

---

**Last Updated:** 2026-02-23
**Version:** 0.1.0-alpha.1
