# Build & Publishing Guide

Guia completa de construccion y publicacion del Sistema de Diseno Khipu para Web (React/TypeScript), Android (Kotlin/Jetpack Compose) e iOS (Swift/SwiftUI).

---

## Build por Plataforma

### Web (React/TypeScript)

**Herramienta:** `tsup` - Bundler rapido de TypeScript basado en esbuild

```bash
npm run build
# Ejecuta: tsup src/index.ts --format cjs,esm --dts --clean
```

**Genera:**
```
dist/
├── index.js              # CommonJS (require)
├── index.esm.js          # ES Modules (import)
├── index.d.ts            # TypeScript definitions
├── tokens/
│   ├── index.js
│   ├── index.esm.js
│   ├── index.d.ts
│   └── css-variables.css # Variables CSS (--kds-*)
└── components/
    ├── core/
    └── domain/
```

### Android (Kotlin/Jetpack Compose)

**Herramienta:** Gradle

```bash
npm run android:build
# Ejecuta: cd android && ./gradlew :designsystem:assembleRelease
```

**Genera:** AAR (Android Archive) + POM + sources JAR

### iOS (Swift/SwiftUI)

**Herramienta:** CocoaPods

```bash
pod lib lint KhipuDesignSystem.podspec --allow-warnings
```

**Estructura:**
```
ios/
├── Sources/          # Codigo Swift
│   ├── Tokens/       # Design tokens
│   ├── Theme/        # KdsTheme
│   └── Components/   # KdsButton, etc.
└── Resources/        # Assets, fonts
```

---

## Publishing

### Registros por plataforma

| Plataforma | Registro | Paquete |
|------------|----------|---------|
| **Node** | npmjs.org (publico) | `@khipu/design-system` |
| **Android** | Nexus (`dev.khipu.com`) | `com.khipu:design-system` |
| **iOS** | CocoaPods trunk (publico) | `KhipuDesignSystem` |

### Publicacion automatica (recomendada)

Al pushear un tag `v*`, GitHub Actions publica las tres plataformas:

```bash
# 1. Actualizar versiones
# package.json, build.gradle.kts, KhipuDesignSystem.podspec

# 2. Commit y tag
git commit -am "chore: bump version to 0.2.0"
git tag v0.2.0
git push origin master --tags
```

Ver: [`docs/CI_CD_SETUP.md`](CI_CD_SETUP.md) para configuracion completa.

### Publicacion manual

**Node:**
```bash
npm run build
npm publish --access public
```

**Android:**
```bash
# Agregar credenciales a android/gradle.properties (NO commitear):
# khipuRepoUsername=tu-usuario
# khipuRepoPassword=tu-password
npm run android:publish
```

**iOS:**
```bash
pod trunk push KhipuDesignSystem.podspec --allow-warnings
```

---

## Version Management

### Actualizar version en todas las plataformas

1. **Web** - `package.json`:
```json
{ "version": "0.2.0" }
```

2. **Android** - `android/designsystem/build.gradle.kts`:
```kotlin
val libraryVersion = "0.2.0"
```

3. **iOS** - `KhipuDesignSystem.podspec`:
```ruby
s.version = '0.2.0'
```

4. **Commit y tag:**
```bash
git commit -am "chore: bump version to 0.2.0"
git tag v0.2.0
git push origin master --tags
```

### Semantic Versioning

- **Major (1.0.0):** Breaking changes
- **Minor (0.1.0):** New features, backward compatible
- **Patch (0.0.1):** Bug fixes
- **Pre-release (0.1.0-alpha.1):** Early versions

---

## Scripts

**Web:**
```bash
npm run build              # Build produccion
npm run dev                # Build + watch
npm publish                # Publish a npm
```

**Android:**
```bash
npm run android:build           # Compilar AAR
npm run android:test            # Tests unitarios
npm run android:publish-local   # Instalar en Maven local (~/.m2)
npm run android:publish         # Publish a Nexus
npm run android:clean           # Limpiar builds
```

**Verificacion:**
```bash
npm run typecheck          # Verificar tipos TypeScript
npm run lint               # Lint codigo
npm run test               # Tests unitarios (Web)
```

---

## Troubleshooting

**Web build falla:**
```bash
rm -rf dist node_modules && npm install && npm run build
```

**Android build falla:**
```bash
npm run android:clean
cd android && ./gradlew clean --refresh-dependencies
java -version  # Debe ser 17+
```

**No se puede publicar a npm:**
- Verificar: `npm whoami` (debe estar autenticado)
- Token: crear en npmjs.com > Access Tokens

**No se puede publicar a Nexus:**
- Verificar credenciales en `gradle.properties`
- Verificar: `curl https://dev.khipu.com/nexus/status`

**No se puede publicar a CocoaPods:**
- Verificar: `pod trunk me` (debe estar registrado)
- Validar: `pod lib lint KhipuDesignSystem.podspec --allow-warnings`

---

## Referencias

- **CI/CD completo:** [`docs/CI_CD_SETUP.md`](CI_CD_SETUP.md)
- **Tokens:** [`docs/TOKENS_GUIDE.md`](TOKENS_GUIDE.md)
- **Componentes:** [`docs/COMPONENT_PATTERNS.md`](COMPONENT_PATTERNS.md)