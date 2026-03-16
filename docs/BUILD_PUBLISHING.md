# Build & Publishing Guide

Guía completa de construcción y publicación del Sistema de Diseño Khipu para Web (React/TypeScript), Android (Kotlin/Jetpack Compose) e iOS (Swift/SwiftUI).

---

## 📋 Resumen Rápido

**Publicación Automatizada (Recomendado):**
```bash
# 1. Actualizar versiones en 3 archivos
# 2. Commit y crear tag
git commit -am "chore: bump version to X.Y.Z"
git tag vX.Y.Z
git push origin main --tags

# 3. GitHub Actions publica automáticamente a:
# ✅ npmjs.org (Web)
# ✅ Nexus (Android)
# ✅ CocoaPods (iOS)
```

**Workflow:** `.github/workflows/publish.yml`
**Trigger:** Tags que empiezan con `v` (ej: `v0.1.0`, `v1.2.3`)

---

## 🤖 GitHub Actions Workflows

### 1. Publish Workflow (Automatizado)

**Archivo:** `.github/workflows/publish.yml`

**Trigger:**
```yaml
on:
  push:
    tags:
      - 'v*'  # v0.1.0, v1.2.3, etc.
```

**Jobs:**
1. **CI Checks** - typecheck, lint, test, build
2. **Publish to npm** - Publica a npmjs.org (público)
3. **Publish to Nexus** - Publica AAR de Android (privado)
4. **Publish to CocoaPods** - Publica pod de iOS (público)

**Características:**
- ✅ Sincroniza versiones automáticamente desde el tag
- ✅ Publica las 3 plataformas en paralelo
- ✅ Credenciales seguras via GitHub Secrets
- ✅ Validación completa antes de publicar

**GitHub Secrets requeridos:**
```bash
NPM_TOKEN                  # Token de npmjs.org
KHIPU_REPO_USERNAME        # Usuario de Nexus
KHIPU_REPO_PASSWORD        # Password de Nexus
COCOAPODS_TRUNK_TOKEN      # Token de CocoaPods
```

---

### 2. CI Workflow

**Archivo:** `.github/workflows/ci.yml`

**Trigger:** Pull requests y push a `main`

**Jobs:**
- Lint & Typecheck
- Test
- Build Web
- Build Android

**Propósito:** Validar código antes de merge/deploy

---

### 3. Storybook Deployment

**Archivo:** `.github/workflows/storybook.yml`

**Trigger:** Push a `main`

**Resultado:** Despliega Storybook a GitHub Pages

**URL:** https://khipu.github.io/design-system/

---

## 🏗️ Build por Plataforma

### Web (React/TypeScript)

**Herramienta:** `tsup` - Bundler rápido de TypeScript basado en esbuild

```bash
npm run build
# Ejecuta: tsup src/index.ts --format cjs,esm --dts --clean
```

**Genera:**
```
dist/
├── index.js              # CommonJS (require)
├── index.mjs             # ES Modules (import)
├── index.d.ts            # TypeScript definitions
├── tokens/
│   ├── tokens.json       # Design tokens JSON
│   └── css-variables.css # Variables CSS (--kds-*)
└── components/
    ├── core/             # KdsButton, KdsTextField, etc.
    └── domain/           # Componentes compuestos
```

**Configuración:** `tsup.config.ts`

---

### Android (Kotlin/Jetpack Compose)

**Herramienta:** Gradle

```bash
npm run android:build
# Ejecuta: cd android && ./gradlew :designsystem:assembleRelease
```

**Genera:**
```
android/designsystem/build/outputs/aar/
└── designsystem-release.aar
```

**Además genera:**
- `design-system-X.Y.Z.pom` - Maven POM file
- `design-system-X.Y.Z-sources.jar` - Source code

**Configuración:** `android/designsystem/build.gradle.kts`

---

### iOS (Swift/SwiftUI)

**Herramienta:** CocoaPods

```bash
# Validar podspec
pod lib lint KhipuDesignSystem.podspec --allow-warnings
```

**Estructura:**
```
ios/
├── Sources/          # Código Swift
│   ├── Tokens/       # KdsTokens.swift (auto-generado)
│   ├── Theme/        # KdsTheme
│   └── Components/   # KdsButton, etc.
├── Resources/        # Assets, fonts
└── KhipuDesignSystem.podspec
```

**Configuración:** `KhipuDesignSystem.podspec`

---

## 📦 Publishing

### Registros por Plataforma

| Plataforma | Registro | Paquete | Acceso |
|------------|----------|---------|--------|
| **Web** | npmjs.org | `@khipu/design-system` | Público |
| **Android** | Nexus (dev.khipu.com) | `com.khipu:design-system` | Privado |
| **iOS** | CocoaPods trunk | `KhipuDesignSystem` | Público |

---

### Flujo Completo de Publicación

#### Paso 1: Actualizar Versiones

Actualiza la versión en **3 archivos**:

**1. Web** - `package.json`:
```json
{
  "version": "0.2.0"
}
```

**2. Android** - `android/designsystem/build.gradle.kts`:
```kotlin
val libraryVersion = "0.2.0"
```

**3. iOS** - `KhipuDesignSystem.podspec`:
```ruby
s.version = '0.2.0'
```

**Tip:** Usa el script helper:
```bash
./scripts/sync-version.sh 0.2.0
```

---

#### Paso 2: Commit y Tag

```bash
# Commit cambios
git add .
git commit -m "chore: bump version to 0.2.0"

# Crear tag (esto dispara GitHub Actions)
git tag v0.2.0

# Push a GitHub
git push origin main --tags
```

**Importante:** El tag DEBE empezar con `v` (ej: `v0.2.0`, `v1.0.0-alpha.1`)

---

#### Paso 3: GitHub Actions Publica Automáticamente

1. **GitHub Actions detecta el tag** `v0.2.0`
2. **Ejecuta CI checks** (typecheck, lint, test)
3. **Publica en paralelo:**
   - 📦 npm → npmjs.org
   - 📦 Android → Nexus
   - 📦 iOS → CocoaPods trunk

**Monitorear progreso:**
```
https://github.com/khipu/design-system/actions
```

**Tiempo estimado:** ~5-10 minutos

---

#### Paso 4: Verificar Publicación

**Web (npm):**
```bash
npm view @khipu/design-system versions --json
npm view @khipu/design-system@0.2.0
# URL: https://www.npmjs.com/package/@khipu/design-system
```

**Android (Nexus):**
```bash
curl -I "https://dev.khipu.com/nexus/content/repositories/design-system/com/khipu/design-system/0.2.0/"
```

**iOS (CocoaPods):**
```bash
pod search KhipuDesignSystem
pod spec cat KhipuDesignSystem
# URL: https://cocoapods.org/pods/KhipuDesignSystem
```

---

## 🔧 Publicación Manual (Fallback)

Si GitHub Actions falla o necesitas publicar manualmente:

### Web (npm)

```bash
# 1. Login (primera vez solamente)
npm login

# 2. Build
npm run build

# 3. Verificar package
npm pack --dry-run

# 4. Publicar
npm publish --access public

# Para versiones pre-release:
npm publish --tag alpha --access public
```

**Requiere:** Token de npmjs.org con permisos de publicación

---

### Android (Nexus)

```bash
# 1. Configurar credenciales
# Agregar a android/gradle.properties (NO commitear):
echo "khipuRepoUsername=tu-usuario" >> android/gradle.properties
echo "khipuRepoPassword=tu-password" >> android/gradle.properties

# 2. Build
npm run android:build

# 3. Publicar
npm run android:publish
# Ejecuta: cd android && ./gradlew :designsystem:publish
```

**Requiere:** Credenciales de Nexus con permisos de escritura

---

### iOS (CocoaPods)

```bash
# 1. Validar podspec
pod lib lint KhipuDesignSystem.podspec --allow-warnings

# 2. Publicar
pod trunk push KhipuDesignSystem.podspec --allow-warnings
```

**Requiere:** Cuenta de CocoaPods trunk registrada

**Primera vez:**
```bash
pod trunk register tu-email@khipu.com 'Tu Nombre'
# Confirma el email que te envían
```

---

## 📊 Version Management

### Semantic Versioning

Seguimos [SemVer](https://semver.org/):

- **Major (1.0.0):** Breaking changes
- **Minor (0.1.0):** New features, backward compatible
- **Patch (0.0.1):** Bug fixes, backward compatible
- **Pre-release (0.1.0-alpha.1):** Early versions

### Ejemplos de Versiones

```bash
# Release estable
v1.0.0

# Nueva funcionalidad
v1.1.0

# Bug fix
v1.1.1

# Pre-release
v2.0.0-alpha.1
v2.0.0-beta.1
v2.0.0-rc.1
```

### Script de Sincronización

Usa el script helper para mantener versiones sincronizadas:

```bash
# Actualiza package.json, build.gradle.kts, y .podspec
./scripts/sync-version.sh 1.2.3

# Verifica cambios
git diff
```

---

## 🛠️ Scripts Disponibles

### Desarrollo

```bash
npm run dev                # Build + watch mode
npm run build              # Build producción
npm run typecheck          # Verificar tipos TypeScript
npm run lint               # Lint código
npm run test               # Tests unitarios
npm run storybook          # Ejecutar Storybook (puerto 6006)
npm run build-storybook    # Build Storybook estático
```

### Tokens

```bash
npm run tokens:generate    # Generar tokens para todas las plataformas
npm run tokens:export      # Exportar tokens a JSON
```

### Android

```bash
npm run android:build           # Compilar AAR
npm run android:test            # Tests unitarios
npm run android:publish-local   # Instalar en Maven local (~/.m2)
npm run android:publish         # Publicar a Nexus
npm run android:clean           # Limpiar builds
```

### iOS

```bash
# Validar podspec
pod lib lint KhipuDesignSystem.podspec --allow-warnings

# Publicar (se hace via GitHub Actions)
pod trunk push KhipuDesignSystem.podspec --allow-warnings
```

---

## 🐛 Troubleshooting

### GitHub Actions Failures

#### ❌ "Publish workflow failed - npm publish error"

**Posibles causas:**
- Versión ya existe en npmjs.org
- Token NPM_TOKEN inválido o expirado
- Error de red

**Solución:**
```bash
# 1. Verificar si versión existe
npm view @khipu/design-system versions --json

# 2. Si existe, bumpeá la versión
./scripts/sync-version.sh 0.2.1
git commit -am "chore: bump version to 0.2.1"
git tag v0.2.1
git push origin main --tags

# 3. Si es problema de token:
# - Genera nuevo token en npmjs.com
# - Actualiza GitHub Secret: NPM_TOKEN
```

---

#### ❌ "Publish workflow failed - Nexus unauthorized"

**Causa:** Credenciales de Nexus inválidas en GitHub Secrets

**Solución:**
```bash
# Verifica credenciales localmente
curl -u "USERNAME:PASSWORD" "https://dev.khipu.com/nexus/content/repositories/design-system/"

# Si funciona, actualiza GitHub Secrets:
# Settings → Secrets → KHIPU_REPO_USERNAME
# Settings → Secrets → KHIPU_REPO_PASSWORD
```

---

#### ❌ "Publish workflow failed - CocoaPods validation"

**Causa:** Podspec inválido o error en Swift code

**Solución:**
```bash
# Valida localmente primero
pod lib lint KhipuDesignSystem.podspec --allow-warnings --verbose

# Si falla, revisa errores y corrige
# Luego crea un nuevo tag
```

---

### Build Failures

#### ❌ Web build falla

```bash
# Limpiar todo y reinstalar
rm -rf dist node_modules package-lock.json
npm install
npm run build

# Verificar TypeScript
npm run typecheck
```

---

#### ❌ Android build falla

```bash
# Limpiar builds
npm run android:clean
cd android && ./gradlew clean

# Verificar Java version (debe ser 17+)
java -version

# Refresh dependencies
./gradlew clean --refresh-dependencies

# Build debug para ver errores
./gradlew :designsystem:assembleDebug --stacktrace
```

---

#### ❌ iOS podspec validation falla

```bash
# Validar con verbose para ver errores
pod lib lint KhipuDesignSystem.podspec --allow-warnings --verbose

# Problemas comunes:
# - Swift version incorrecta → Actualiza s.swift_version
# - Archivos faltantes → Verifica s.source_files
# - Dependencias incorrectas → Verifica s.dependency
```

---

### Publishing Issues

#### ❌ "Package version already exists" (409 Conflict)

**Causa:** Intentando publicar versión que ya existe

**Solución:**
```bash
# Bumpea la versión
./scripts/sync-version.sh 0.2.1  # Siguiente patch
# o
./scripts/sync-version.sh 0.3.0  # Siguiente minor

git commit -am "chore: bump version to 0.2.1"
git tag v0.2.1
git push origin main --tags
```

---

#### ❌ No se puede autenticar con npm

```bash
# Login a npmjs.org
npm login

# Verificar autenticación
npm whoami

# Generar token para CI/CD:
# 1. Ve a npmjs.com → Account → Access Tokens
# 2. Generate New Token → Automation
# 3. Copia el token
# 4. Agrega a GitHub Secrets como NPM_TOKEN
```

---

#### ❌ No se puede publicar a Nexus (local)

```bash
# Verificar Nexus está accesible
curl -I https://dev.khipu.com/nexus/status

# Test con credenciales
curl -u "username:password" \
  "https://dev.khipu.com/nexus/content/repositories/design-system/"

# Si falla: verificar credenciales en gradle.properties
cat android/gradle.properties | grep khipuRepo
```

---

#### ❌ No se puede publicar a CocoaPods

```bash
# Verificar cuenta
pod trunk me

# Si no estás registrado:
pod trunk register tu-email@khipu.com 'Tu Nombre'

# Verificar podspec
pod spec lint KhipuDesignSystem.podspec --allow-warnings

# Publicar
pod trunk push KhipuDesignSystem.podspec --allow-warnings
```

---

## 📚 Referencias

### Documentación Relacionada

- **Demo completo:** [`docs/DEMO_AND_RELEASE.md`](DEMO_AND_RELEASE.md)
- **Sistema de tokens:** [`docs/TOKENS_GUIDE.md`](TOKENS_GUIDE.md)
- **Patrones de componentes:** [`docs/COMPONENT_PATTERNS.md`](COMPONENT_PATTERNS.md)
- **Android:** [`android/QUICK_START.md`](../android/QUICK_START.md)
- **iOS:** [`ios/QUICK_START.md`](../ios/QUICK_START.md)

### GitHub Actions

- **Workflows:** `.github/workflows/`
- **Actions page:** https://github.com/khipu/design-system/actions
- **Secrets:** Settings → Secrets and variables → Actions

### Package Registries

- **npm:** https://www.npmjs.com/package/@khipu/design-system
- **Nexus:** https://dev.khipu.com/nexus
- **CocoaPods:** https://cocoapods.org/pods/KhipuDesignSystem

### Tools

- **tsup:** https://tsup.egoist.dev/
- **Gradle:** https://gradle.org/
- **CocoaPods:** https://cocoapods.org/

---

## 🎯 Quick Reference

### Flujo Completo (Cheatsheet)

```bash
# 1. DESARROLLO
npm run tokens:generate    # Generar tokens
npm run build             # Build web
npm run android:build     # Build Android
pod lib lint --allow-warnings  # Validar iOS

# 2. ACTUALIZAR VERSIONES
./scripts/sync-version.sh 1.2.3
# o manualmente en 3 archivos:
# - package.json
# - android/designsystem/build.gradle.kts
# - KhipuDesignSystem.podspec

# 3. PUBLICAR (AUTOMATICO)
git add .
git commit -m "chore: bump version to 1.2.3"
git tag v1.2.3
git push origin main --tags

# GitHub Actions publica automáticamente ✅

# 4. VERIFICAR
npm view @khipu/design-system@1.2.3
pod search KhipuDesignSystem
curl -I "https://dev.khipu.com/nexus/.../design-system/1.2.3/"
```

### Instalación en Apps

```bash
# WEB
npm install @khipu/design-system@1.2.3

# ANDROID (build.gradle.kts)
implementation("com.khipu:design-system:1.2.3")

# iOS (Podfile)
pod 'KhipuDesignSystem', '~> 1.2.3'
```

---

**Last Updated:** 2026-03-16
**Automation:** GitHub Actions
**Platforms:** Web (npm) + Android (Nexus) + iOS (CocoaPods)
**Maintained by:** Design System Team
