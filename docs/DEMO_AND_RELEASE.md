# Design System - Cross-Platform Demo & Release

Complete workflow for demonstrating token changes across **Web, Android, and iOS**, then publishing **automatically via GitHub Actions**.

**⚡ Key Concept:** We NEVER publish manually. GitHub Actions handles ALL publishing when we push a git tag.

---

## 🎨 The Demo: Complete Build-Publish-Install Workflow

**Goal:** Demonstrate the complete workflow from token change to deployed apps across ALL THREE platforms using GitHub Actions automation.

**Complete workflow (Local work → GitHub Actions → Install):**

### 🏠 Local Work (5 minutes)
1. **Prepare**: Change primary color from purple to blue in design tokens
2. **Generate**: Create platform-specific token files with `npm run tokens:generate`
3. **Verify**: Check changes in Storybook (auto-reload)
4. **Version**: Sync version across all platforms with `./scripts/sync-version.sh`
5. **Commit & Tag**: Create Git tag matching `v*` pattern (e.g., `v0.1.0-alpha.7`)
6. **Push**: Push to GitHub with `git push origin main --tags`

### 🤖 GitHub Actions (10 minutes - automatic)
7. **CI Checks**: GitHub Actions runs lint, typecheck, test, build
8. **Parallel Publishing**: GitHub Actions publishes to all 3 registries simultaneously
   - ✅ Publish to npmjs.org (Web)
   - ✅ Publish to Nexus (Android)
   - ✅ Publish to CocoaPods (iOS)

### 📦 Install & Verify (5 minutes)
9. **Platform 1 - Web**: Install from npmjs.org in React app
10. **Platform 2 - Android**: Install from Nexus in Android app
11. **Platform 3 - iOS**: Install from CocoaPods in iOS app
12. **Verify**: All three apps showing blue color from ONE source

**Total Time:** ~20 minutes (5 min local + 10 min automated + 5 min install/verify)
**Platforms:** Web (React) + Android (Kotlin) + iOS (Swift)

**📦 Publishing Targets:**
- **Web**: npmjs.org (public registry) - `@khipu/design-system`
- **Android**: Nexus (dev.khipu.com) - `com.khipu:design-system`
- **iOS**: CocoaPods trunk (public) - `KhipuDesignSystem`

**🤖 GitHub Actions Automation (100% Automated):**
- **Workflow file**: `.github/workflows/publish.yml`
- **Trigger**: Git tags matching `v*` (e.g., `v0.1.0-alpha.7`)
- **Jobs run in parallel**: CI checks, then npm, Nexus, and CocoaPods publish
- **Version sync**: Automatic via `scripts/sync-version.sh` script
- **Security**: Uses GitHub Secrets for credentials (no manual auth needed!)
- **Zero manual publishing**: You NEVER run `npm publish`, `gradle publish`, or `pod trunk push` manually!

---

## 🛠️ Setup (Before Recording)

**Requirements:**

### Local Environment
- [ ] `design-system` repo cloned from GitHub
- [ ] Node.js 20+ installed
- [ ] Dependencies installed: `npm ci`
- [ ] Storybook running: `npm run storybook` (port 6006)
- [ ] **iOS simulator with test app** (required for demo) - Show native iOS app
- [ ] Android emulator with test app (optional - can skip to save time)
- [ ] Screen recording tool ready
- [ ] Xcode installed (for iOS simulator)

### GitHub Actions Configuration
- [ ] Repository: `github.com/khipu/design-system` (or your fork)
- [ ] GitHub Actions enabled (enabled by default)
- [ ] Required secrets configured in `Settings → Secrets and variables → Actions`:
  - [ ] `NPM_TOKEN` - Token from npmjs.org (Settings → Access Tokens → Generate New Token → Automation)
  - [ ] `KHIPU_REPO_USERNAME` - Nexus username for dev.khipu.com
  - [ ] `KHIPU_REPO_PASSWORD` - Nexus password for dev.khipu.com
  - [ ] `COCOAPODS_TRUNK_TOKEN` - CocoaPods trunk token (get via `pod trunk register`)

### Verification
- [ ] Check CI workflow passes: Push to `main` branch should trigger `.github/workflows/ci.yml`
- [ ] Check Storybook deploys: Push to `main` should update GitHub Pages
- [ ] Test version sync script: `./scripts/sync-version.sh 0.1.0-test` (then revert)

### iOS Test App Setup (REQUIRED for demo)

**Create a simple iOS test app to showcase the design system:**

```bash
# 1. Create new iOS app (or use existing)
# File → New → Project → App
# Name: "DesignSystemDemo"
# Interface: SwiftUI
# Language: Swift

# 2. Add KhipuDesignSystem to Podfile
echo "pod 'KhipuDesignSystem', '~> 0.1.0-alpha.12'" >> Podfile
pod install

# 3. Create simple test view with KdsButton components
# See ios/Examples/ for sample code

# 4. Test that app builds and runs:
open DesignSystemDemo.xcworkspace
# Cmd+R to build and run
```

**Test app should include:**
- Multiple `KdsButton` components with different variants
- Clear visual demonstration of the primary color
- Simple, uncluttered UI that focuses on the buttons
- Big enough buttons to be clearly visible in recordings

**Sample SwiftUI code:**
```swift
import SwiftUI
import KhipuDesignSystem

struct ContentView: View {
    var body: some View {
        VStack(spacing: 20) {
            Text("Khipu Design System Demo")
                .font(.largeTitle)

            KdsButton(text: "Primary Button", variant: .contained)
            KdsButton(text: "Secondary Button", variant: .outlined)
            KdsButton(text: "Text Button", variant: .text)
        }
        .padding()
    }
}
```

---

## 🎬 Complete Workflow (Step-by-Step)

### Phase 1: Preparation - Show Current State & Change Token

#### Step 1.1: Show Current State (Purple) - Three Platforms

**📹 Record Storybook (Web)**
```bash
# Navigate to http://localhost:6006
# Go to: Components → Core → Button → Primary
```
**Show:** 🟣 Purple button (#8347AD)

**📹 Record iOS App** ⭐ **REQUIRED FOR DEMO**
```bash
# Launch iOS test app on simulator
# Show: DesignSystemTestScreen with KdsButton components
open -a Simulator
# Run test app (from ios test project)
```
**Show:** 🟣 Purple primary buttons in native iOS app

**💡 Demo narration:**
> "Here's our iOS app running in the simulator. Notice the purple buttons - this is using our design system with SwiftUI. Same purple as the web version."

**📹 Record Android App (Optional - can skip to save time)**
```bash
# DesignSystemTestScreen running on emulator
```
**Show:** 🟣 Purple primary buttons

**📹 Show Token Source (Single Source of Truth)**
```typescript
// src/tokens/index.ts
export const colors = {
  primary: {
    main: '#8347AD',  // 👈 Current Khipu Purple
  }
}
```

**💡 Key Point:** This ONE file controls colors across ALL THREE platforms - Web, iOS, and Android!

---

#### Step 1.2: Change Color (Purple → Blue)

**📹 Edit Token File**
```bash
# Open src/tokens/index.ts
code src/tokens/index.ts
```

**Change:**
```typescript
// BEFORE
primary: {
  main: '#8347AD',     // Khipu Purple
  light: '#A66BC7',
  dark: '#5E3280',
}

// AFTER
primary: {
  main: '#2196F3',     // 👈 Material Blue
  light: '#64B5F6',
  dark: '#1976D2',
}
```

**Save file:** `Ctrl+S` / `Cmd+S`

---

### Phase 2: Generate Platform-Specific Tokens

#### Step 2.1: Generate Tokens for All Platforms

**📹 Single Command for All Platforms**
```bash
npm run tokens:generate
```

**What happens behind the scenes:**
1. ✅ Builds TypeScript (`npm run build`) → `dist/`
2. ✅ Exports tokens to JSON (`tokens:export`) → `src/tokens/tokens.json`
3. ✅ Generates CSS variables → `src/tokens/css-variables.css` (Web)
4. ✅ Generates Swift tokens → `ios/Sources/Tokens/KdsTokens.swift` (iOS)

**Result:** Design tokens converted from TypeScript → JSON → CSS (Web) + Swift (iOS)

**💡 Single source of truth → THREE platforms!**

---

### Phase 3: Commit, Tag & Push → GitHub Actions Does the Rest!

#### Step 3.1: Verify Changes in Storybook (Local Preview)

```bash
# Storybook auto-reloads with new tokens
# Navigate to: http://localhost:6006 → Components → Core → Button → Primary
```
**Show:** 🔵 **Blue button** (was purple!)

**💡 Key:** Changes visible immediately in Storybook without publishing

---

#### Step 3.2: Bump Versions (All Platforms)

**📝 Two options for version sync:**

**Option A: Automated Script (Recommended)**
```bash
# Sync version across ALL platforms with one command
./scripts/sync-version.sh 0.1.0-alpha.7

# This updates:
# - package.json (Web)
# - android/designsystem/build.gradle.kts (Android)
# - KhipuDesignSystem.podspec (iOS)
```

**Option B: Manual Update (For demo purposes)**
```bash
# 1. Web - package.json
sed -i '' 's/"version": "0.1.0-alpha.6"/"version": "0.1.0-alpha.7"/' package.json

# 2. Android - android/designsystem/build.gradle.kts
sed -i '' 's/val libraryVersion = "0.1.0-alpha.6"/val libraryVersion = "0.1.0-alpha.7"/' android/designsystem/build.gradle.kts

# 3. iOS - KhipuDesignSystem.podspec
sed -i '' "s/s.version.*=.*/s.version          = '0.1.0-alpha.7'/" KhipuDesignSystem.podspec
```

**Verify all versions synchronized:**
```bash
grep '"version"' package.json
grep 'libraryVersion' android/designsystem/build.gradle.kts
grep 's.version' KhipuDesignSystem.podspec
```

**💡 Note:** GitHub Actions workflow automatically runs `sync-version.sh` from the git tag, but for local builds we sync manually first.

---

#### Step 3.3: Commit, Tag, and Push

**📹 Show Git workflow**
```bash
# Commit changes
git add .
git commit -m "feat: change primary color from purple to blue

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# Create version tag (triggers GitHub Actions)
git tag v0.1.0-alpha.7

# Push to GitHub (triggers publish workflow)
git push origin main --tags
```

**💡 Key:** Pushing the tag `v0.1.0-alpha.7` triggers GitHub Actions!

---

#### Step 3.4: Watch GitHub Actions Publish

**📹 Navigate to GitHub Actions**
```
https://github.com/khipu/design-system/actions
```

**The Publish Workflow (`.github/workflows/publish.yml`)**

**Job 1: CI Checks** (runs first, blocking)
```yaml
✅ Checkout code
✅ Setup Node.js 18
✅ Sync version from tag (./scripts/sync-version.sh)
✅ Install dependencies (npm ci)
✅ Typecheck (npm run typecheck)
✅ Lint (npm run lint)
✅ Test (npm run test)
✅ Build (npm run build)
```

**Job 2-4: Parallel Publishing** (only run if CI passes)

**Publish to npm** (ubuntu-latest)
```yaml
✅ Setup Node.js with npmjs.org registry
✅ Sync version from tag
✅ Install dependencies
✅ Build package
✅ Publish with provenance (npm publish --provenance --access public)
   → Uses: NPM_TOKEN secret
   → Result: Package on npmjs.org
```

**Publish to Nexus** (ubuntu-latest)
```yaml
✅ Setup Node.js + Java 17 + Android SDK
✅ Setup Gradle
✅ Sync version from tag
✅ Generate tokens (npm run tokens:generate)
✅ Configure Nexus credentials
✅ Publish Android library (./gradlew :designsystem:publish)
   → Uses: KHIPU_REPO_USERNAME, KHIPU_REPO_PASSWORD secrets
   → Result: AAR on dev.khipu.com/nexus
```

**Publish to CocoaPods** (macos-latest)
```yaml
✅ Checkout with full git history
✅ Sync version in podspec
✅ Validate podspec (pod lib lint --allow-warnings)
✅ Push to CocoaPods trunk (pod trunk push --allow-warnings)
   → Uses: COCOAPODS_TRUNK_TOKEN secret
   → Result: Pod on cocoapods.org
```

**⏱️ Timing:**
- CI Checks: ~2-3 minutes
- Parallel publishing: ~5-7 minutes
- **Total: ~8-10 minutes** ⚡

**Result:** 📦 All three packages published automatically in parallel!

---

### Phase 4: Platform 1 - Web (React/TypeScript)

**Complete workflow: GitHub Actions published → Install**

#### Step 4.1: Install in Web App

```bash
cd /path/to/web-app  # Your React app

# Install from npmjs.org (public, no auth needed!)
npm install @khipu/design-system@0.1.0-alpha.7

# Start dev server
npm run dev
```

**Navigate to app:** `http://localhost:3000`

**Show:** 🔵 **All buttons and components are now blue!**

**💡 Complete cycle:** Token change → Tag → GitHub Actions → npmjs.org → Install → Working! ✅

**Verify package:**
```bash
# View on npmjs.org
open https://www.npmjs.com/package/@khipu/design-system
```

---

### Phase 5: Platform 2 - Android (Kotlin/Compose)

**Complete workflow: GitHub Actions published → Install**

#### Step 5.1: Verify Android Tokens Generated

```bash
# Check KdsTokens.kt was updated
cat android/designsystem/src/main/java/com/khipu/designsystem/tokens/KdsTokens.kt | grep "primaryMain"

# Should show:
# val primaryMain = Color(0xFF2196F3)  // Blue!
```

---

#### Step 5.2: Install in Android App

```bash
cd /path/to/android-app  # Your Android app

# Update app/build.gradle.kts dependency
# implementation("com.khipu:design-system:0.1.0-alpha.7")

# Sync and build
./gradlew --refresh-dependencies
./gradlew :app:assembleDebug
./gradlew :app:installDebug
```

**Run app on emulator**

**Show:** 🔵 **All buttons and components are now blue!**

**💡 Complete cycle:** Token change → Tag → GitHub Actions → Nexus → Install → Working! ✅

---

### Phase 6: Platform 3 - iOS (Swift/SwiftUI) ⭐ **STAR OF THE DEMO**

**Complete workflow: Git tag → GitHub Actions → CocoaPods → Install → Native iOS app**

#### Step 6.1: Verify Swift Tokens Generated

**📹 Show the generated Swift tokens**
```bash
# Check KdsTokens.swift was updated
cat ios/Sources/Tokens/KdsTokens.swift | grep "primaryMain"

# Should show:
# public static let primaryMain = Color(hex: "2196F3")  // Blue!
```

**💡 Demo narration:**
> "The same git tag that published to npm and Nexus also generated these Swift tokens. One source of truth in TypeScript, automatically converted to Swift."

---

#### Step 6.2: Install in iOS App

**📹 Show Podfile update**
```bash
cd /path/to/ios-app  # Your iOS test app

# Show current Podfile
cat Podfile | grep KhipuDesignSystem

# Update to new version (edit Podfile)
# pod 'KhipuDesignSystem', '~> 0.1.0-alpha.12'
```

**📹 Install from CocoaPods**
```bash
# This pulls from CocoaPods trunk (public registry)
pod install --repo-update

# Watch CocoaPods fetch the new version
# Should show: "Installing KhipuDesignSystem 0.1.0-alpha.12"
```

**📹 Open and run in Xcode**
```bash
# Open workspace (NOT .xcodeproj!)
open YourApp.xcworkspace

# In Xcode:
# 1. Select target device (iPhone simulator)
# 2. Click Run (Cmd+R)
# 3. Wait for build and launch
```

---

#### Step 6.3: Show the Magic! 🎉

**📹 Record iOS simulator with blue buttons**

**Show in the simulator:**
- 🔵 **All KdsButton components are now blue!**
- Native iOS app, SwiftUI
- Same blue (#2196F3) as web and Android
- Smooth animations, native feel

**💡 Demo narration:**
> "And here's the payoff - our iOS app, completely native SwiftUI, showing the exact same blue color. We changed ONE file in TypeScript, pushed a git tag, and now we have perfectly synchronized design across web React, native iOS, and native Android. That's the power of a true cross-platform design system with modern CI/CD!"

**💡 Complete cycle:**
```
Token change (TypeScript)
    ↓
Git tag (one command)
    ↓
GitHub Actions (automatic)
    ↓
CocoaPods Trunk (automatic)
    ↓
pod install (any iOS dev)
    ↓
Native iOS app with blue! ✅
```

**Key accomplishment:** Same design token flowing through THREE completely different tech stacks:
- ⚛️ React + TypeScript + CSS-in-JS
- 🤖 Kotlin + Jetpack Compose + Material 3
- 🍎 **Swift + SwiftUI + Native iOS** ⭐

---

## 🤖 GitHub Actions Workflows Explained

**Three automated workflows protect and publish the design system:**

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Trigger:** Every push to `main` or PR to `main`

**Purpose:** Continuous integration checks

**Jobs (run in parallel):**
```yaml
Lint & Typecheck:
  - npm run typecheck
  - npm run lint

Test:
  - npm run test

Build Web:
  - npm run build

Build Android:
  - npm run tokens:generate
  - npm run android:build
```

**Result:** Ensures code quality before merging

---

### 2. Publish Workflow (`.github/workflows/publish.yml`)

**Trigger:** Git tags matching `v*` (e.g., `v0.1.0-alpha.7`)

**Purpose:** Automated publishing to all registries

**Jobs:**
1. **CI Checks** (sequential) - Same checks as CI workflow
2. **Publish to npm** (parallel after CI) - npmjs.org
3. **Publish to Nexus** (parallel after CI) - dev.khipu.com/nexus
4. **Publish to CocoaPods** (parallel after CI) - cocoapods.org

**Key features:**
- ✅ Version auto-synced from git tag
- ✅ Parallel publishing (fast!)
- ✅ Secure (GitHub Secrets)
- ✅ Provenance attestation (npm)

---

### 3. Storybook Deployment (`.github/workflows/storybook.yml`)

**Trigger:** Every push to `main` or manual dispatch

**Purpose:** Deploy documentation to GitHub Pages

**Jobs:**
1. **Build** - Generate static Storybook
2. **Deploy** - Upload to GitHub Pages

**Result:** Live docs at design.khipu.com (or GitHub Pages URL)

---

### Workflow Comparison

| Workflow | Trigger | Duration | Purpose |
|----------|---------|----------|---------|
| **CI** | Push/PR to `main` | ~5-7 min | Quality checks |
| **Publish** | Tags `v*` | ~8-10 min | Multi-platform publish |
| **Storybook** | Push to `main` | ~3-5 min | Deploy docs |

---

### 🎉 Summary: Complete Workflow Demonstrated

**What we accomplished:**

✅ **Phase 1**: Changed ONE token file (`src/tokens/index.ts`)
✅ **Phase 2**: Generated platform-specific tokens with ONE command
✅ **Phase 3**: Created Git tag → GitHub Actions published automatically to 3 registries
✅ **Phase 4 - Web**: Install from npmjs.org → **BLUE! ✨**
✅ **Phase 5 - Android**: Install from Nexus → **BLUE! ✨**
✅ **Phase 6 - iOS**: Install from CocoaPods → **BLUE! ✨**

**Result:** THREE completely different platforms, perfectly in sync from ONE source of truth! 🚀

**Publishing summary:**
- 📦 **Web**: `@khipu/design-system@0.1.0-alpha.7` → npmjs.org (public)
- 📦 **Android**: `com.khipu:design-system:0.1.0-alpha.7` → Nexus
- 📦 **iOS**: `KhipuDesignSystem (0.1.0-alpha.7)` → CocoaPods trunk

**Automation:**
- 🤖 **GitHub Actions** handles all publishing (no manual commands needed!)
- ⚡ **Parallel publishing** - all three platforms publish simultaneously
- 🔒 **Secure** - uses GitHub Secrets for credentials

---

## 🎯 The Magic: How Each Platform Gets Tokens

**Three completely different tech stacks, one source:**

```
src/tokens/index.ts (TypeScript - Single Source of Truth)
         ↓
  npm run tokens:generate
         ↓
    ┌────────┴────────┬────────────────┐
    ↓                 ↓                ↓
CSS Variables    KdsTokens.kt    KdsTokens.swift
(Web/React)      (Android)       (iOS)
    ↓                 ↓                ↓
MUI Theme        Material 3      SwiftUI Theme
```

**Implementation differences:**
- ⚛️ **React**: TypeScript imports → MUI theme → CSS-in-JS
- 🤖 **Android**: Kotlin object → Jetpack Compose → Material 3
- 🍎 **iOS**: Swift struct → SwiftUI → Native iOS components

---

## 💬 Demo Narration Script

**Introduction (30 seconds)**
> "Today I'm showing how our design system maintains consistency across THREE platforms: React web, Android native, and iOS native. We'll change the primary color from purple to blue in ONE file, and watch GitHub Actions automatically publish to all three platforms."

**Part 1 - Current State (45 seconds)**
> "Here's our current design system. In Storybook, our primary button is purple. In the Android app, same purple. In our iOS app, also purple. Three completely different tech stacks - React with TypeScript, Kotlin with Jetpack Compose, and Swift with SwiftUI."

**Part 2 - Change Token (1 minute)**
> "Now let's change the primary color. I'm opening our design tokens file - the single source of truth. Here's the current purple: #8347AD. I'll change it to Material Blue: #2196F3. Notice - ONE file, but this affects all three platforms."

**Part 3 - Generate Tokens (1 minute)**
> "Now I generate tokens for all platforms: `npm run tokens:generate`. This builds TypeScript, exports to JSON, generates CSS variables for web, Kotlin tokens for Android, and Swift tokens for iOS. One command, three platforms. Look - Storybook auto-reloaded, button is now blue!"

**Part 4 - Publish via GitHub Actions (3-4 minutes)**
> "Time to publish. First, I'll sync versions across all platforms using our script: `./scripts/sync-version.sh 0.1.0-alpha.7`. This updates package.json for web, build.gradle.kts for Android, and the podspec for iOS - one command, three files!"
>
> "Now I commit the changes, create a version tag v0.1.0-alpha.7, and push to GitHub with tags. And here's what's important - **this is the ONLY publishing command I run**: `git push origin main --tags`. That's it!"
>
> "I don't run `npm publish`. I don't run any Gradle commands. I don't run `pod trunk push`. I don't type any credentials. **I never publish manually from my machine**. GitHub Actions does everything!"
>
> "Watch - GitHub Actions immediately detects the `v*` tag and triggers the publish workflow. Let's watch it in real-time at github.com/khipu/design-system/actions."
>
> "First, the CI job runs - typecheck, lint, test, and build. This ensures we're not publishing broken code. If any of these fail, the publish is automatically canceled. Green checkmarks - we're good!"
>
> "Now look - three publish jobs kick off **in parallel**! One publishes to npmjs.org for React developers. Another builds the Android AAR and pushes to our private Nexus. And the third validates and pushes the iOS pod to CocoaPods trunk. All running simultaneously in the cloud!"
>
> "GitHub Secrets handles all authentication. I never typed a password. I never configured credentials on my machine. My laptop could break right now and the publish would still complete successfully in GitHub Actions!"
>
> "And... done! All three packages published in about 8-10 minutes. Check those green checkmarks - npm published, Nexus published, CocoaPods published. Three completely different registries, three different package managers, **one git tag**, **zero manual commands**. This is modern CI/CD!"

**Part 5 - Install & Show (3-4 minutes, focus on iOS!)**

> "Now for the grand finale. Let me show you these packages being consumed in real apps."

> "First, the web app - npm install from npmjs.org, it's public so no authentication needed. Start the dev server, and boom - blue buttons everywhere! React app, perfect."

> "But the real magic is iOS. Watch this."

> "I'm opening the iOS test app, updating the Podfile to the new version - 0.1.0-alpha.12. Now `pod install` - watch CocoaPods pull from the public trunk registry. 'Installing KhipuDesignSystem 0.1.0-alpha.12' - that's our package!"

> "Opening in Xcode... selecting iPhone 15 Pro simulator... and run. Watch the build - it's compiling Swift, linking our design system pod, and..."

> "There it is! Native iOS app, pure SwiftUI, and look at those buttons - BLUE! The exact same blue we defined in TypeScript five minutes ago. Same color value, #2196F3, flowing from TypeScript through our CI/CD pipeline, converted to Swift, published to CocoaPods, and now running on iOS."

> "This isn't a web view. This isn't React Native. This is native iOS code, native SwiftUI components, using our design system that started as TypeScript. That's the power of treating design tokens as the single source of truth."

**Conclusion (45 seconds)**
> "Let me recap what just happened. I changed ONE file - src/tokens/index.ts in TypeScript. I ran ONE command - git push with a tag. GitHub Actions did everything else - built for three platforms, published to three completely different registries, all in parallel, all automatically, all secured with GitHub Secrets."

> "And now we have perfect synchronization. Web with React and npm. iOS with Swift and CocoaPods. Android with Kotlin and Maven. Three completely different tech stacks, three different package managers, ONE source of truth, ZERO manual publish commands."

> "This is what a modern, production-ready, multi-platform design system looks like. Not just components - but automated workflows, CI/CD, provenance, security, and perfect cross-platform consistency. And it all started with one color change in TypeScript."

---

## 📊 Key Talking Points

**What we demonstrated:**

✅ **Single source of truth in code** - Changed ONE file (`src/tokens/index.ts`)
✅ **Automatic generation** - Tokens for all three platforms from one command
✅ **100% automated publishing** - GitHub Actions publishes on git tag
✅ **Zero manual publish commands** - Never run npm/gradle/pod publish locally
✅ **Parallel publishing** - All 3 platforms publish simultaneously in ~10 minutes
✅ **Consistent design** - Same blue (#2196F3) on Web, Android, and iOS
✅ **Zero component changes** - Buttons updated automatically via tokens
✅ **Different distribution methods** - npmjs.org (Web), Nexus (Android), CocoaPods (iOS)
✅ **Real-world usage** - Consuming apps get updates immediately
✅ **True cross-platform** - React + Android + iOS from one codebase

**Platform coverage:**
- ⚛️ **Web**: React 18 + TypeScript + Material UI v7 (npmjs.org - public)
- 🤖 **Android**: Kotlin + Jetpack Compose + Material 3 (Nexus - private)
- 🍎 **iOS**: Swift + SwiftUI (CocoaPods trunk - public)

**Automation benefits:**
- 🤖 No manual publish commands (GitHub Actions handles it)
- 🔒 Secure credential management (GitHub Secrets)
- ⚡ Parallel publishing (all platforms publish simultaneously)
- ✅ Built-in validation (CI checks before publish)
- 📝 Automatic changelog (from git history)

---

## 🎨 Color Options for Demo

Pick a color that contrasts well with purple:

```typescript
// Blue (recommended)
primary: { main: '#2196F3', light: '#64B5F6', dark: '#1976D2' }

// Green
primary: { main: '#4CAF50', light: '#81C784', dark: '#388E3C' }

// Orange
primary: { main: '#FF9800', light: '#FFB74D', dark: '#F57C00' }

// Teal
primary: { main: '#009688', light: '#4DB6AC', dark: '#00796B' }
```

---

## 🎥 Recording Tips

**Screen layout suggestions:**
- **Split screen**: Editor (left) + Storybook/GitHub/Simulator (right)
- **Picture-in-picture**: Show iOS simulator in corner while showing web/GitHub
- **Multi-window**: Storybook + GitHub Actions + iOS Simulator visible

**Key moments to capture (with timing):**
1. **Current state** (30s): Purple buttons in Storybook + iOS simulator side-by-side
2. **Token change** (30s): Changing `#8347AD` → `#2196F3` in editor
3. **Token generation** (15s): Running `npm run tokens:generate` (show completion)
4. **Storybook preview** (15s): Auto-refresh showing blue button
5. **Version sync** (15s): Running `./scripts/sync-version.sh`
6. **Git operations** (30s): Commit + tag + push
7. **GitHub Actions** (2-3 min): Show workflow running in browser with all 3 publish jobs
8. **npm install** (30s): Installing in web app, show blue buttons
9. **iOS install** ⭐ (1-2 min): `pod install`, run in Xcode, show simulator
10. **Grand finale** (30s): iOS simulator with blue buttons, zoom in, celebrate! 🎉

**iOS-specific tips:**
- Use **iPhone 15 Pro** simulator (modern, recognizable)
- Enable **"Show Device Bezels"** in Simulator for professional look
- Use **Cmd+S** in Simulator to save screenshots
- **Record simulator screen** directly: `xcrun simctl io booted recordVideo demo.mov`
- Show **Xcode build logs** briefly (builds fast, looks professional)
- Demonstrate **live refresh** if using SwiftUI previews

**GitHub Actions highlights:**
- Show workflow file: `.github/workflows/publish.yml`
- Show Actions tab with running workflow
- Show parallel publish jobs (npm, Nexus, CocoaPods)
- Show successful completion with green checkmarks

---

## ✅ Pre-Recording Checklist

**Dry run (test everything first):**
- [ ] Change color in `src/tokens/index.ts`
- [ ] Run `npm run tokens:generate`
- [ ] Verify Storybook shows new color
- [ ] **CRITICAL:** Check and bump versions:
  - [ ] `package.json` → 0.1.0-alpha.X
  - [ ] `android/designsystem/build.gradle.kts` → 0.1.0-alpha.X
  - [ ] `KhipuDesignSystem.podspec` → 0.1.0-alpha.X
- [ ] Test local builds:
  - [ ] `npm run build`
  - [ ] `npm run android:build`
  - [ ] `pod lib lint KhipuDesignSystem.podspec --allow-warnings`
- [ ] Verify GitHub Actions secrets are configured
- [ ] Test git tag + push (to a test branch first)
- [ ] Revert: `git reset --hard && npm run tokens:generate`
- [ ] Ready to record!

**Environment check:**
- [ ] Storybook running on port 6006
- [ ] **iOS simulator ready** ⭐ **REQUIRED**
  - [ ] Xcode installed and working
  - [ ] iOS test app built and ready to run
  - [ ] Simulator launched (iPhone 15 Pro recommended)
  - [ ] Test app can be launched with one click
- [ ] Android emulator ready (optional - can skip to save time)
- [ ] GitHub Actions secrets configured:
  - [ ] `NPM_TOKEN` (npmjs.org - Automation token without 2FA)
  - [ ] `KHIPU_REPO_USERNAME` (Nexus)
  - [ ] `KHIPU_REPO_PASSWORD` (Nexus)
  - [ ] `COCOAPODS_TRUNK_TOKEN` (CocoaPods)
- [ ] All repos clean (no uncommitted changes)
- [ ] Screen recording tool tested
- [ ] Close unnecessary windows/notifications
- [ ] Browser tabs open:
  - [ ] GitHub Actions page
  - [ ] npmjs.org package page (to show published package)
  - [ ] CocoaPods.org (optional)

---

## 📝 Quick Command Reference

### Development & Build

```bash
# === TOKENS & BUILD ===
npm run tokens:generate           # Generate tokens for all platforms
npm run build                     # Build web package
npm run android:build             # Build Android AAR
pod lib lint --allow-warnings     # Validate iOS podspec
```

### Publishing (GitHub Actions Only)

**⚠️ IMPORTANT: We ONLY publish via GitHub Actions. Never run `npm publish`, `gradle publish`, or `pod trunk push` manually!**

```bash
# === PUBLISH VIA GITHUB ACTIONS (ONLY METHOD) ===

# 1. Sync versions across all platforms
./scripts/sync-version.sh 0.1.0-alpha.X

# 2. Commit and tag
git add .
git commit -m "chore: bump version to 0.1.0-alpha.X"
git tag v0.1.0-alpha.X

# 3. Push tag (this triggers GitHub Actions to publish everything)
git push origin main --tags

# 4. Watch GitHub Actions publish automatically:
# https://github.com/khipu/design-system/actions
# → CI Checks (lint, typecheck, test, build)
# → Publish to npm (parallel)
# → Publish to Nexus (parallel)
# → Publish to CocoaPods (parallel)

# That's it! No manual publish commands needed!
```

### Installation in Client Apps

**After GitHub Actions publishes (green checkmarks in Actions tab):**

```bash
# === WEB ===
cd /path/to/web-app
npm install @khipu/design-system@0.1.0-alpha.X
npm run dev

# === ANDROID ===
cd /path/to/android-app
# Update build.gradle.kts: implementation("com.khipu:design-system:0.1.0-alpha.X")
./gradlew --refresh-dependencies
./gradlew :app:assembleDebug

# === iOS ===
cd /path/to/ios-app
# Update Podfile: pod 'KhipuDesignSystem', '~> 0.1.0-alpha.X'
pod install --repo-update
open YourApp.xcworkspace
```

---

## 🐛 Troubleshooting

### GitHub Actions Failures

#### ❌ "Workflow not triggered after pushing tag"

**Cause:** Tag format doesn't match `v*` pattern

**Solution:**
```bash
# Check tag format - must start with 'v'
git tag                     # List tags
git tag -d v0.1.0-alpha.7  # Delete local tag if wrong
git tag v0.1.0-alpha.7     # Create with correct format
git push origin v0.1.0-alpha.7  # Push tag
```

**View workflow triggers:**
```bash
# Check .github/workflows/publish.yml
# Should have: on: push: tags: - 'v*'
```

---

#### ❌ "CI Checks failed - typecheck errors"

**Cause:** TypeScript errors in code

**Solution:**
```bash
# Run locally first
npm run typecheck
npm run lint
npm run test

# Fix errors before pushing
```

---

#### ❌ "NPM publish failed - 401 Unauthorized"

**Cause:** Invalid or expired NPM_TOKEN

**Solution:**
```bash
# Generate new token at npmjs.com:
# 1. Login to npmjs.com
# 2. Settings → Access Tokens → Generate New Token → Automation
# 3. Copy token

# Add to GitHub Secrets:
# Repo → Settings → Secrets and variables → Actions
# → New repository secret
# Name: NPM_TOKEN
# Secret: (paste token)
```

---

#### ❌ "NPM publish failed - 403 Forbidden"

**Cause:** Package name already taken or scope access denied

**Solution:**
```bash
# Check package name in package.json
# For scoped packages: must be @khipu/design-system
# Verify you have access to @khipu scope

# Check existing package:
npm view @khipu/design-system
```

---

#### ❌ "NPM publish failed - Version already exists"

**Cause:** Trying to publish a version that already exists

**Solution:**
```bash
# Check published versions:
npm view @khipu/design-system versions

# Bump to new version:
./scripts/sync-version.sh 0.1.0-alpha.8

# Commit and create new tag:
git add .
git commit -m "chore: bump to 0.1.0-alpha.8"
git tag v0.1.0-alpha.8
git push origin main --tags
```

---

#### ❌ "Android publish failed - 401 Unauthorized"

**Cause:** Invalid Nexus credentials in GitHub Secrets

**Solution:**
```bash
# Verify credentials in GitHub Secrets:
# KHIPU_REPO_USERNAME - Nexus username
# KHIPU_REPO_PASSWORD - Nexus password

# Test credentials locally:
curl -u username:password https://dev.khipu.com/nexus/status

# Update secrets in:
# Repo → Settings → Secrets and variables → Actions
```

---

#### ❌ "Android build failed - tokens not generated"

**Cause:** Tokens not generated before Android build

**Solution:**
```bash
# Check workflow has token generation step:
# - run: npm run tokens:generate

# This generates android/designsystem/src/main/java/com/khipu/designsystem/tokens/KdsTokens.kt

# Verify locally:
npm run tokens:generate
npm run android:build
```

---

#### ❌ "CocoaPods publish failed - Pod validation failed"

**Cause:** Podspec has errors or iOS sources invalid

**Solution:**
```bash
# Validate locally first:
pod lib lint KhipuDesignSystem.podspec --allow-warnings

# Common issues:
# - Swift syntax errors in ios/Sources/
# - Missing files referenced in podspec
# - Invalid version format in podspec
```

---

#### ❌ "CocoaPods publish failed - 401 Unauthorized"

**Cause:** Invalid or expired COCOAPODS_TRUNK_TOKEN

**Solution:**
```bash
# Register or re-register with CocoaPods trunk:
pod trunk register email@example.com 'Your Name'
# Check email for confirmation link

# Get your session token:
cat ~/.netrc | grep cocoapods.org

# Or use pod trunk me to verify:
pod trunk me

# Add token to GitHub Secrets:
# COCOAPODS_TRUNK_TOKEN = (token from ~/.netrc)
```

---

#### ❌ "sync-version.sh not found or permission denied"

**Cause:** Script doesn't exist or not executable

**Solution:**
```bash
# Check script exists:
ls -la scripts/sync-version.sh

# Make executable:
chmod +x scripts/sync-version.sh

# Commit if changed:
git add scripts/sync-version.sh
git commit -m "fix: make sync-version.sh executable"
```

---

#### ❌ "Workflow stuck on 'Waiting for approval'"

**Cause:** Environment protection rules enabled

**Solution:**
```bash
# Check repository settings:
# Settings → Environments → (environment name)
# Remove protection rules if not needed

# Or approve deployment:
# Actions → Select workflow run → Review deployments → Approve
```

---

### Local Development Issues

#### ❌ "Cannot install @khipu/design-system"
**Cause:** Package not yet published or wrong version

**Solution:**
```bash
# Check if version exists:
npm view @khipu/design-system versions --json

# View package on npmjs.org:
open https://www.npmjs.com/package/@khipu/design-system
```

---

#### ❌ "Android: Cannot resolve com.khipu:design-system"
**Cause:** Nexus not accessible or version doesn't exist

**Solution:**
```bash
# Verify Nexus is accessible:
curl -I https://dev.khipu.com/nexus/status

# Check if version exists:
curl -I "https://dev.khipu.com/nexus/content/repositories/design-system/com/khipu/design-system/0.1.0-alpha.X/"
```

---

#### ❌ "iOS: Pod not found"
**Cause:** Pod not published or trunk not synced

**Solution:**
```bash
# Update CocoaPods repo:
pod repo update

# Search for pod:
pod search KhipuDesignSystem

# View on CocoaPods.org:
open https://cocoapods.org/pods/KhipuDesignSystem
```

---

## 🔄 After Demo: Revert Changes

```bash
# Revert color change
git checkout src/tokens/index.ts

# Or revert all changes
git reset --hard HEAD

# Regenerate tokens with original purple color
npm run tokens:generate

# Optional: Delete test tag
git tag -d v0.1.0-alpha.X
git push origin :refs/tags/v0.1.0-alpha.X  # Delete from remote
```

---

## 📚 Additional Resources

### GitHub Actions Workflows

**Workflow files:**
```
.github/workflows/
├── publish.yml     # 🚀 Publish to npm + Nexus + CocoaPods (on tags v*)
├── ci.yml          # ✅ CI checks on PRs and main branch
└── storybook.yml   # 📚 Deploy docs to GitHub Pages (on main)
```

**Key scripts used by workflows:**
```
scripts/
└── sync-version.sh # 🔄 Sync version across package.json, Gradle, podspec
```

**GitHub Actions URLs:**
- **Actions dashboard**: `https://github.com/khipu/design-system/actions`
- **Workflow runs**: View status of recent publishes and CI checks
- **Configure secrets**: `Repo → Settings → Secrets and variables → Actions`
- **Required secrets**:
  - `NPM_TOKEN` - npmjs.org automation token
  - `KHIPU_REPO_USERNAME` - Nexus username
  - `KHIPU_REPO_PASSWORD` - Nexus password
  - `COCOAPODS_TRUNK_TOKEN` - CocoaPods trunk session token

**Workflow features:**
- ✅ **Parallel jobs** - Publish to all 3 platforms simultaneously
- ✅ **Version sync** - Automatic from git tag
- ✅ **Security** - Credentials stored as GitHub Secrets
- ✅ **Provenance** - npm packages include attestation
- ✅ **Validation** - CI checks before publish
- ✅ **Caching** - Fast dependency installation

### Platform Documentation

**Web:**
- Package: https://www.npmjs.com/package/@khipu/design-system
- Docs: Storybook deployed to GitHub Pages

**Android:**
- Nexus: https://dev.khipu.com/nexus
- Repository: `design-system`
- Installation: See `android/QUICK_START.md`

**iOS:**
- CocoaPods: https://cocoapods.org/pods/KhipuDesignSystem
- Installation: See `ios/QUICK_START.md`

### Verification Commands

```bash
# Check Web package on npm
npm view @khipu/design-system versions --json
npm view @khipu/design-system@0.1.0-alpha.X

# Check Android library on Nexus
curl -I "https://dev.khipu.com/nexus/content/repositories/design-system/com/khipu/design-system/0.1.0-alpha.X/design-system-0.1.0-alpha.X.aar"

# Check iOS pod
pod search KhipuDesignSystem
pod spec cat KhipuDesignSystem
```

---

---

## 📋 Document Info

**Last Updated:** 2026-03-16
**Demo Duration:** ~20-25 minutes total (5 min local + 10 min GitHub Actions + 5-10 min install/verify with iOS focus)
**Platforms:** Web (React) + **iOS (Swift/SwiftUI)** ⭐ + Android (Kotlin) [optional]
**Publishing Method:** GitHub Actions ONLY (100% automated, zero manual commands)
**CI/CD:** 3 workflows (CI, Publish, Storybook)
**Key Message:** We NEVER run `npm publish`, `gradle publish`, or `pod trunk push` manually!
**Demo Focus:** Native iOS app showing design system integration (star of the show! 🍎)

**Publishing Targets:**
- **Web:** [npmjs.org](https://www.npmjs.com/package/@khipu/design-system) (public npm registry)
- **Android:** [Nexus](https://dev.khipu.com/nexus) (private Maven repository)
- **iOS:** [CocoaPods](https://cocoapods.org/pods/KhipuDesignSystem) (public pod trunk)

**Maintained by:** Design System Team

---

## 🎯 Quick Reference

**Trigger automated publish (ONLY method):**
```bash
# 1. Sync versions
./scripts/sync-version.sh 0.1.0-alpha.X

# 2. Commit, tag, and push
git add .
git commit -m "chore: release version 0.1.0-alpha.X"
git tag v0.1.0-alpha.X
git push origin main --tags

# 3. GitHub Actions does the rest automatically!
# → CI Checks
# → Publish to npm, Nexus, CocoaPods (in parallel)
# → Done in ~10 minutes
```

**Watch GitHub Actions progress:**
```
https://github.com/khipu/design-system/actions
```

**⚠️ NEVER run these commands manually:**
```bash
npm publish              # ❌ NO!
gradle publish           # ❌ NO!
pod trunk push           # ❌ NO!
```
**GitHub Actions does ALL publishing for us!**

**Verify packages published:**
```bash
# Web
npm view @khipu/design-system@0.1.0-alpha.X

# Android
curl -I https://dev.khipu.com/nexus/content/repositories/design-system/com/khipu/design-system/0.1.0-alpha.X/

# iOS
pod search KhipuDesignSystem
```

**Need help?** See troubleshooting section above or check GitHub Actions logs.
