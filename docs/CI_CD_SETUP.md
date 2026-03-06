# CI/CD Pipeline Setup (GitHub Actions)

Guide for automated building, testing, and publishing of the Khipu Design System across all platforms.

---

## Overview

The design system publishes to **three platforms** from a single GitHub repository:

| Platform | Registry | Trigger |
|----------|----------|---------|
| **Node (React)** | [npmjs.org](https://www.npmjs.com/package/@khipu/design-system) | Tag `v*` |
| **Android (Kotlin)** | [Nexus](https://dev.khipu.com/nexus) (`com.khipu:design-system`) | Tag `v*` |
| **iOS (Swift)** | [CocoaPods](https://cocoapods.org/pods/KhipuDesignSystem) | Tag `v*` |

**CI checks** run on every push to `master` and on pull requests.

---

## Workflows

### 1. CI (`.github/workflows/ci.yml`)

Runs on PRs and pushes to `master`:
- Lint & typecheck
- Unit tests
- Web build
- Android build

### 2. Publish (`.github/workflows/publish.yml`)

Runs on version tags (`v*`). After CI checks pass, publishes in parallel:
- **npm** - `npm publish --provenance --access public`
- **Nexus** - `./gradlew :designsystem:publish`
- **CocoaPods** - `pod trunk push`

---

## Required GitHub Secrets

Configure these in **Settings > Secrets and variables > Actions**:

| Secret | Purpose | How to get it |
|--------|---------|---------------|
| `NPM_TOKEN` | Publish to npmjs.org | [npmjs.com > Access Tokens](https://www.npmjs.com/settings/~/tokens) - create "Automation" token |
| `KHIPU_REPO_USERNAME` | Nexus authentication | Same as other Khipu projects (e.g. khipu-client-android) |
| `KHIPU_REPO_PASSWORD` | Nexus authentication | Same as other Khipu projects |
| `COCOAPODS_TRUNK_TOKEN` | Publish to CocoaPods | Run `pod trunk register developers@khipu.com 'Khipu'` then check email |

---

## Publishing a New Version

### 1. Update versions in all platforms

**Web** (`package.json`):
```json
{ "version": "0.2.0" }
```

**Android** (`android/designsystem/build.gradle.kts`):
```kotlin
val libraryVersion = "0.2.0"
```

**iOS** (`KhipuDesignSystem.podspec`):
```ruby
s.version = '0.2.0'
```

### 2. Commit and tag

```bash
git commit -am "chore: bump version to 0.2.0"
git tag v0.2.0
git push origin master --tags
```

The tag push triggers the publish workflow automatically.

### 3. Verify

```bash
# Node
npm view @khipu/design-system versions

# Android - check Nexus UI
# https://dev.khipu.com/nexus/#browse/browse:releases:com/khipu/design-system

# iOS
pod search KhipuDesignSystem
```

---

## Manual Publishing

### Node (npm)

```bash
npm run build
npm publish --access public
# Requires: npm login or NPM_TOKEN in ~/.npmrc
```

### Android (Nexus)

```bash
# Add credentials to android/gradle.properties (DO NOT commit):
# khipuRepoUsername=your-username
# khipuRepoPassword=your-password

npm run android:publish
```

### iOS (CocoaPods)

```bash
# Requires: pod trunk register (one-time)
pod lib lint KhipuDesignSystem.podspec --allow-warnings
pod trunk push KhipuDesignSystem.podspec --allow-warnings
```

---

## Local Development Setup

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 18+ | `brew install node@18` |
| Java | 17 | `brew install openjdk@17` |
| Android SDK | 35 | Android Studio or `sdkmanager` |
| CocoaPods | latest | `gem install cocoapods` |

### Building locally

```bash
# Web
npm ci && npm run build

# Android
npm run android:build

# iOS - validate podspec
pod lib lint KhipuDesignSystem.podspec --allow-warnings
```

### Testing in consuming apps

```bash
# Android - install to local Maven for testing
npm run android:publish-local
# Then in your app: use mavenLocal() repository

# Node - link locally
npm link
# Then in your app: npm link @khipu/design-system
```

---

## Consuming the Design System

### Node/Web apps

```bash
npm install @khipu/design-system
```

### Android apps

**`settings.gradle.kts`:**
```kotlin
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        maven {
            name = "KhipuNexus"
            url = uri("https://dev.khipu.com/nexus/content/repositories/releases")
            credentials {
                username = project.findProperty("khipuRepoUsername") as String?
                password = project.findProperty("khipuRepoPassword") as String?
            }
        }
    }
}
```

**`build.gradle.kts`:**
```kotlin
dependencies {
    implementation("com.khipu:design-system:0.1.0-alpha.6")
}
```

### iOS apps

**`Podfile`:**
```ruby
pod 'KhipuDesignSystem', '~> 0.1'
```

---

## Troubleshooting

### npm publish fails with 403
- Verify `NPM_TOKEN` is set and has publish permissions
- Ensure the package name is available or you own the `@khipu` scope
- Check `npm whoami` with your token

### Nexus publish fails
- Verify `KHIPU_REPO_USERNAME` / `KHIPU_REPO_PASSWORD` secrets
- Check Nexus is reachable: `curl https://dev.khipu.com/nexus/status`
- Ensure the version doesn't already exist in Nexus (releases repo doesn't allow overwrites)

### CocoaPods push fails
- Run `pod spec lint` locally first to catch issues
- Ensure the git tag matches the podspec version exactly
- Check trunk token: `pod trunk me`

### Android build fails in CI
- Ensure `setup-android` action is present (provides SDK)
- Check Java version matches (17 required)
- Run `./gradlew --version` to verify Gradle wrapper

---

## Security

### DO
- Store all credentials as GitHub Secrets (encrypted)
- Use separate tokens for CI vs personal use
- Rotate credentials regularly
- Use npm provenance for supply chain security

### DON'T
- Commit credentials to git
- Store tokens in plain text
- Share CI secrets via chat/email
- Use root/admin accounts for CI

---

**Last Updated:** 2026-03-06
**Maintained by:** Khipu Platform Team