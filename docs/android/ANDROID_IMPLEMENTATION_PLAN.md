# Android Design System - Implementation Plan

**Document Version:** 1.0
**Date:** 2026-02-09
**Status:** Ready for Implementation

---

## 📊 Current State Analysis

### ✅ Completed Implementation

The Android design system foundation is **well-established** with:

#### 1. **Design Tokens** (100% Complete)
**Location:** `android/designsystem/src/main/java/com/khipu/designsystem/tokens/KdsTokens.kt`

- ✅ **KdsColors** - Full light/dark mode color palettes
  - Primary, Secondary, Semantic colors (Success, Warning, Error, Info)
  - Text, Background, Action colors
  - State colors (hover, selected, focus)
- ✅ **KdsTypography** - Complete typography system
  - Font families (Public Sans, Roboto Mono)
  - Font weights (Regular, Medium, SemiBold, Bold)
  - Font sizes (12sp - 36sp)
  - Line heights
- ✅ **KdsSpacing** - Full spacing scale
  - Base scale (0dp - 96dp)
  - Semantic spacing (card, box, input, button, layout, modal)
- ✅ **KdsBorderRadius** - Component-specific radii
- ✅ **KdsTransitions** - Animation durations
- ✅ **KdsDimensions** - Component dimensions
- ✅ **KdsZIndex** - Layering constants

**Quality:** Tokens are auto-generated from source and match React implementation 1:1.

#### 2. **Theme System** (100% Complete)
**Location:** `android/designsystem/src/main/java/com/khipu/designsystem/theme/`

- ✅ **Theme.kt** - Complete Material 3 theme with KdsTheme composable
  - Light/Dark color schemes
  - System theme detection
  - Dynamic status bar support
  - Extended colors via CompositionLocal
- ✅ **Typography.kt** - Text style definitions
- ✅ **Shape.kt** - Component shape overrides
- ✅ **Spacing.kt** - Spacing system with semantic aliases
- ✅ **ExtendedColors.kt** - Success/Warning/Info color support

**Quality:** Theme system is production-ready with proper Material 3 integration.

#### 3. **Build & Publishing Infrastructure** (100% Complete)
**Location:** `android/build.gradle.kts`, `android/designsystem/build.gradle.kts`

- ✅ Gradle 8.11.1 with Kotlin 2.0.21
- ✅ Material 3 & Jetpack Compose dependencies
- ✅ Maven publishing configuration
- ✅ AWS CodeArtifact integration (env-based credentials)
- ✅ Sources JAR generation
- ✅ POM metadata

**Version:** `0.1.0-alpha.1`

#### 4. **Components Implemented** (1/12 = 8%)
**Location:** `android/designsystem/src/main/java/com/khipu/designsystem/components/`

- ✅ **KdsButton** - Fully featured button component
  - 3 variants (Contained, Outlined, Text)
  - 5 color schemes (Primary, Secondary, Success, Warning, Error)
  - 3 sizes (Small, Medium, Large)
  - Loading state with spinner
  - Disabled state
  - Icon support (leading/trailing)
  - Full-width option
  - Comprehensive Compose previews

**Quality:** KdsButton is production-ready and serves as a template for other components.

---

### ❌ Missing Implementation

#### **Components** (11 Missing - 92%)

Comparison with React implementation:

| Component | React | Android | Priority | Complexity |
|-----------|-------|---------|----------|------------|
| Alert | ✅ | ❌ | High | Low |
| Button | ✅ | ✅ | - | - |
| Card | ✅ | ❌ | **Critical** | Medium |
| Checkbox | ✅ | ❌ | High | Low |
| LinearProgress | ✅ | ❌ | Medium | Low |
| LogoHeader | ✅ | ❌ | Low | Low |
| Modal | ✅ | ❌ | **Critical** | High |
| Spinner | ✅ | ❌ | Medium | Low |
| Tabs | ✅ | ❌ | High | Medium |
| TextField | ✅ | ❌ | **Critical** | High |
| Typography | ✅ | ❌ | High | Low |
| RadioButton | ❌ | ❌ | High | Low |

**Priority Legend:**
- **Critical:** Required for MVP payment flows (Card, TextField, Modal)
- **High:** Core UI patterns (Alert, Checkbox, Typography, Tabs, RadioButton)
- **Medium:** Supporting components (Spinner, LinearProgress)
- **Low:** Branding components (LogoHeader)

---

## 🎯 Implementation Roadmap

### Phase 1: Core Components (Week 1-2) - **CRITICAL PATH**

**Goal:** Enable basic payment form UIs

#### 1.1 TextField Component
**Priority:** CRITICAL
**Files to Create:**
- `components/KdsTextField.kt`
- `components/KdsTextFieldDefaults.kt` (helpers)

**Requirements:**
- Variants: Outlined, Filled, Standard
- States: Default, Focused, Error, Disabled
- Helper text support
- Error message display
- Leading/trailing icons
- Multi-line support
- Character counter
- Label floating behavior
- Integration with form validation

**Reference:** React `TextField.tsx` (139 lines)

**Estimated Effort:** 8 hours

---

#### 1.2 Card Component
**Priority:** CRITICAL
**Files to Create:**
- `components/KdsCard.kt`

**Requirements:**
- Variants: Elevated, Outlined, Filled
- Selection state (important for bank selection)
- Error state
- Clickable/Non-clickable modes
- Custom padding support
- Border handling (2px for selected state per Figma)

**Reference:** React `Card.tsx` (95 lines)

**Estimated Effort:** 4 hours

---

#### 1.3 Typography Component
**Priority:** HIGH
**Files to Create:**
- `components/KdsText.kt` or extend theme

**Requirements:**
- Semantic variants: display1, h1-h6, body, bodyLarge, label, cardTitle
- Color variants
- Text alignment
- Overflow handling
- Weight overrides

**Reference:** React `Typography.tsx` (89 lines)

**Estimated Effort:** 3 hours

---

#### 1.4 Checkbox Component
**Priority:** HIGH
**Files to Create:**
- `components/KdsCheckbox.kt`

**Requirements:**
- Checked/Unchecked/Indeterminate states
- Disabled state
- Color variants
- Label support (with text wrapping)
- Error state

**Reference:** React `Checkbox.tsx` (48 lines)

**Estimated Effort:** 2 hours

---

### Phase 2: Dialog & Navigation (Week 3)

#### 2.1 Modal/Dialog Component
**Priority:** CRITICAL
**Files to Create:**
- `components/KdsDialog.kt`
- `components/KdsBottomSheet.kt` (optional, Android-specific)

**Requirements:**
- Title + Content + Actions layout
- Dismiss on outside click
- Fullscreen option
- Animation (slide up from bottom)
- Max width constraint (450dp per design tokens)
- Scrollable content
- Action buttons (primary/secondary)

**Reference:** React `Modal.tsx` (142 lines)

**Estimated Effort:** 6 hours

---

#### 2.2 Tabs Component
**Priority:** HIGH
**Files to Create:**
- `components/KdsTabs.kt`

**Requirements:**
- Horizontal scrollable tabs
- Active state indicator
- Icon support
- Badge support (for notifications)
- Centered/Start alignment

**Reference:** React `Tabs.tsx` (78 lines)

**Estimated Effort:** 4 hours

---

### Phase 3: Feedback Components (Week 4)

#### 3.1 Alert/Snackbar Component
**Priority:** HIGH
**Files to Create:**
- `components/KdsAlert.kt`
- `components/KdsSnackbar.kt`

**Requirements:**
- Severity variants: Success, Info, Warning, Error
- Dismissible option
- Action button support
- Icon variants
- Variants: Standard, Filled, Outlined

**Reference:** React `Alert.tsx` (89 lines)

**Estimated Effort:** 3 hours

---

#### 3.2 Progress Components
**Priority:** MEDIUM
**Files to Create:**
- `components/KdsLinearProgress.kt`
- `components/KdsCircularProgress.kt` (enhance existing spinner)

**Requirements:**
- Determinate/Indeterminate modes
- Color variants
- Size variants
- Label support

**Reference:** React `LinearProgress.tsx`, `Spinner.tsx`

**Estimated Effort:** 3 hours

---

#### 3.3 Spinner Component
**Priority:** MEDIUM
**Files to Create:**
- `components/KdsSpinner.kt` (standalone)

**Requirements:**
- Size variants
- Color variants
- Overlay mode (blocking UI)

**Reference:** React `Spinner.tsx` (45 lines)

**Estimated Effort:** 2 hours

---

### Phase 4: Domain Components (Week 5)

#### 4.1 LogoHeader Component
**Priority:** LOW
**Files to Create:**
- `components/KdsLogoHeader.kt`

**Requirements:**
- Khipu logo display
- Merchant logo support
- Sizing options

**Reference:** React `LogoHeader.tsx` (55 lines)

**Estimated Effort:** 2 hours

---

#### 4.2 RadioButton Component
**Priority:** HIGH (not in React yet)
**Files to Create:**
- `components/KdsRadioButton.kt`
- `components/KdsRadioGroup.kt`

**Requirements:**
- Selected/Unselected states
- Disabled state
- Label support
- Radio group management
- Color variants

**Estimated Effort:** 3 hours

---

### Phase 5: Testing & Documentation (Week 6)

#### 5.1 Component Tests
**Files to Create:**
- `androidTest/` directory with UI tests
- Unit tests for component logic

**Requirements:**
- Snapshot tests for each component
- Interaction tests (click, input, etc.)
- State management tests
- Accessibility tests

**Estimated Effort:** 16 hours

---

#### 5.2 Sample App
**Files to Create:**
- `sample/` module with demo app
- Catalog of all components
- Interactive playground

**Requirements:**
- Component showcase
- Dark mode toggle
- Interaction demos
- Code snippets

**Estimated Effort:** 12 hours

---

## 🚀 Publishing & Distribution

### AWS CodeArtifact Setup

#### Prerequisites

1. **AWS Account Access**
   - AWS CLI installed and configured
   - IAM permissions for CodeArtifact

2. **CodeArtifact Repository**
   - Domain: `khipu-artifacts` (example)
   - Repository: `design-system-android` (example)
   - Region: `us-east-1` (example)

#### Environment Configuration

```bash
# Export these environment variables before publishing
export CODEARTIFACT_DOMAIN="khipu-artifacts"
export CODEARTIFACT_REPO="design-system-android"
export CODEARTIFACT_REGION="us-east-1"

# Generate authentication token (expires in 12 hours)
export CODEARTIFACT_TOKEN=$(aws codeartifact get-authorization-token \
  --domain $CODEARTIFACT_DOMAIN \
  --domain-owner $(aws sts get-caller-identity --query Account --output text) \
  --region $CODEARTIFACT_REGION \
  --query authorizationToken \
  --output text)

# Generate repository URL
export CODEARTIFACT_URL="https://${CODEARTIFACT_DOMAIN}-$(aws sts get-caller-identity --query Account --output text).d.codeartifact.${CODEARTIFACT_REGION}.amazonaws.com/maven/${CODEARTIFACT_REPO}/"

# Verify configuration
echo "CodeArtifact URL: $CODEARTIFACT_URL"
echo "Token length: ${#CODEARTIFACT_TOKEN}"
```

#### Update Build Configuration

**Option 1: Environment Variables (Recommended for CI/CD)**

Current implementation in `android/designsystem/build.gradle.kts` already supports this:

```kotlin
maven {
    name = "CodeArtifact"
    url = uri(System.getenv("CODEARTIFACT_URL") ?: "")
    credentials {
        username = "aws"
        password = System.getenv("CODEARTIFACT_TOKEN") ?: ""
    }
}
```

**Option 2: Gradle Properties (For Local Development)**

Create `android/gradle.properties` (add to .gitignore):

```properties
codeartifact.url=https://khipu-artifacts-123456789.d.codeartifact.us-east-1.amazonaws.com/maven/design-system-android/
codeartifact.token=YOUR_TOKEN_HERE
```

Then update build.gradle.kts:

```kotlin
val codeArtifactUrl: String? by project
val codeArtifactToken: String? by project

maven {
    name = "CodeArtifact"
    url = uri(System.getenv("CODEARTIFACT_URL") ?: codeArtifactUrl ?: "")
    credentials {
        username = "aws"
        password = System.getenv("CODEARTIFACT_TOKEN") ?: codeArtifactToken ?: ""
    }
}
```

#### Publishing Workflow

**Local Development:**

```bash
# 1. Set environment variables (see above)
# 2. Build the library
cd android
./gradlew :designsystem:assembleRelease

# 3. Publish to Maven Local for testing
./gradlew :designsystem:publishToMavenLocal

# 4. Test integration in sample app
./gradlew :sample:assembleDebug

# 5. Publish to AWS CodeArtifact
./gradlew :designsystem:publish
```

**CI/CD (GitHub Actions Example):**

```yaml
name: Publish Android Library

on:
  push:
    tags:
      - 'android-v*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
          aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          aws-region: us-east-1

      - name: Get CodeArtifact token
        run: |
          export CODEARTIFACT_TOKEN=$(aws codeartifact get-authorization-token \
            --domain khipu-artifacts \
            --domain-owner ${{ secrets.AWS_ACCOUNT_ID }} \
            --region us-east-1 \
            --query authorizationToken \
            --output text)
          echo "CODEARTIFACT_TOKEN=$CODEARTIFACT_TOKEN" >> $GITHUB_ENV

          export CODEARTIFACT_URL="https://khipu-artifacts-${{ secrets.AWS_ACCOUNT_ID }}.d.codeartifact.us-east-1.amazonaws.com/maven/design-system-android/"
          echo "CODEARTIFACT_URL=$CODEARTIFACT_URL" >> $GITHUB_ENV

      - name: Publish to CodeArtifact
        run: |
          cd android
          ./gradlew :designsystem:publish --no-daemon
```

---

### Version Management

**Semantic Versioning:** `MAJOR.MINOR.PATCH-PRERELEASE`

**Current:** `0.1.0-alpha.1`

**Versioning Strategy:**

- **alpha.X**: Active development, breaking changes expected
- **beta.X**: Feature complete, API stabilizing
- **rc.X**: Release candidate, production-ready
- **X.Y.Z**: Stable release

**Update Location:** `android/designsystem/build.gradle.kts`

```kotlin
val libraryVersion = "0.1.0-alpha.2" // Increment here
```

---

### Consuming the Library

#### 1. Configure Repository Access

**In Consumer App:** `settings.gradle.kts`

```kotlin
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}

dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()

        // For local development
        mavenLocal()

        // AWS CodeArtifact
        maven {
            url = uri(System.getenv("CODEARTIFACT_URL") ?: "")
            credentials {
                username = "aws"
                password = System.getenv("CODEARTIFACT_TOKEN") ?: ""
            }
        }
    }
}
```

#### 2. Add Dependency

**In Consumer App:** `app/build.gradle.kts`

```kotlin
dependencies {
    // Khipu Design System
    implementation("com.khipu:design-system:0.1.0-alpha.1")

    // Required transitive dependencies (if not already present)
    implementation(platform("androidx.compose:compose-bom:2024.11.00"))
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling-preview")
}
```

#### 3. Use in Code

```kotlin
import com.khipu.designsystem.theme.KdsTheme
import com.khipu.designsystem.theme.KdsThemeMode
import com.khipu.designsystem.components.KdsButton
import com.khipu.designsystem.components.KdsButtonVariant
import com.khipu.designsystem.components.KdsButtonColor

@Composable
fun PaymentScreen() {
    KdsTheme(themeMode = KdsThemeMode.SYSTEM) {
        // Your UI here
        KdsButton(
            text = "Pay Now",
            onClick = { /* handle payment */ },
            variant = KdsButtonVariant.CONTAINED,
            color = KdsButtonColor.PRIMARY,
            loading = false
        )
    }
}
```

---

## 📝 Component Implementation Guidelines

### Standard Structure

Each component should follow this structure:

```
components/
└── KdsComponentName.kt
    ├── Enums (variants, colors, sizes)
    ├── Data classes (if needed)
    ├── Main @Composable function
    ├── Helper functions (private)
    └── @Preview functions (multiple states)
```

### Component Template

```kotlin
package com.khipu.designsystem.components

import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import com.khipu.designsystem.theme.*
import com.khipu.designsystem.tokens.*

/**
 * Khipu Design System - ComponentName
 *
 * Brief description of the component and its purpose.
 *
 * @param param1 Description of param1
 * @param param2 Description of param2
 * @param modifier Modifier to be applied to the component
 *
 * @sample
 * ```
 * KdsComponentName(
 *     param1 = "value",
 *     modifier = Modifier.fillMaxWidth()
 * )
 * ```
 */
@Composable
fun KdsComponentName(
    param1: String,
    param2: Boolean = true,
    modifier: Modifier = Modifier,
) {
    // Implementation
}

// =============================================================================
// PREVIEWS
// =============================================================================

@Preview(name = "Default State", showBackground = true)
@Composable
private fun PreviewDefault() {
    KdsTheme {
        KdsComponentName(param1 = "Example")
    }
}

@Preview(name = "Dark Mode", uiMode = Configuration.UI_MODE_NIGHT_YES)
@Composable
private fun PreviewDarkMode() {
    KdsTheme {
        KdsComponentName(param1 = "Example")
    }
}
```

### Testing Template

```kotlin
package com.khipu.designsystem.components

import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import com.khipu.designsystem.theme.KdsTheme
import org.junit.Rule
import org.junit.Test

class KdsComponentNameTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun componentName_rendersCorrectly() {
        composeTestRule.setContent {
            KdsTheme {
                KdsComponentName(param1 = "Test")
            }
        }

        composeTestRule
            .onNodeWithText("Test")
            .assertIsDisplayed()
    }

    @Test
    fun componentName_clickTriggersCallback() {
        var clicked = false

        composeTestRule.setContent {
            KdsTheme {
                KdsComponentName(
                    param1 = "Test",
                    onClick = { clicked = true }
                )
            }
        }

        composeTestRule.onNodeWithText("Test").performClick()
        assert(clicked)
    }
}
```

---

## 🔧 Development Workflow

### NPM Scripts (To Be Added)

Add to root `package.json`:

```json
{
  "scripts": {
    "android:build": "cd android && ./gradlew :designsystem:assembleRelease",
    "android:test": "cd android && ./gradlew :designsystem:testDebugUnitTest",
    "android:publish-local": "cd android && ./gradlew :designsystem:publishToMavenLocal",
    "android:publish": "cd android && ./gradlew :designsystem:publish",
    "android:clean": "cd android && ./gradlew clean",
    "android:preview": "cd android && ./gradlew :designsystem:pixel5Api31DebugAndroidTest"
  }
}
```

### Daily Development Cycle

```bash
# 1. Start development
cd android

# 2. Make changes to component
code designsystem/src/main/java/com/khipu/designsystem/components/KdsNewComponent.kt

# 3. Preview in Android Studio
# Open Android Studio > Open android/ folder > Run preview

# 4. Build and test
./gradlew :designsystem:assembleRelease
./gradlew :designsystem:testDebugUnitTest

# 5. Publish to local Maven for testing in apps
./gradlew :designsystem:publishToMavenLocal

# 6. Test in consumer app
cd ../your-android-app
./gradlew assembleDebug

# 7. Commit changes
git add android/
git commit -m "feat(android): add KdsNewComponent"

# 8. Bump version (when ready for release)
# Edit android/designsystem/build.gradle.kts
# Update libraryVersion = "0.1.0-alpha.2"

# 9. Publish to CodeArtifact
# Set AWS credentials (see above)
./gradlew :designsystem:publish
```

---

## 📊 Progress Tracking

### Milestone 1: Core Components (Weeks 1-2)
- [ ] KdsTextField
- [ ] KdsCard
- [ ] KdsTypography
- [ ] KdsCheckbox
- [ ] Publish v0.1.0-alpha.2

### Milestone 2: Dialog & Navigation (Week 3)
- [ ] KdsDialog / KdsBottomSheet
- [ ] KdsTabs
- [ ] Publish v0.1.0-alpha.3

### Milestone 3: Feedback (Week 4)
- [ ] KdsAlert / KdsSnackbar
- [ ] KdsLinearProgress
- [ ] KdsCircularProgress
- [ ] KdsSpinner
- [ ] Publish v0.1.0-beta.1

### Milestone 4: Completion (Week 5-6)
- [ ] KdsLogoHeader
- [ ] KdsRadioButton / KdsRadioGroup
- [ ] Component tests (80%+ coverage)
- [ ] Sample app with all components
- [ ] Documentation in README
- [ ] Publish v0.1.0-rc.1

### Milestone 5: Production Release
- [ ] Integration testing with real apps
- [ ] Performance benchmarks
- [ ] Accessibility audit
- [ ] Final bug fixes
- [ ] Publish v1.0.0

---

## 🎨 Design Consistency

### Design Token Sync

All components **MUST** use tokens from `KdsTokens.kt`:

```kotlin
// ✅ CORRECT - Using tokens
Card(
    modifier = Modifier.padding(KdsSpacing.space4),
    shape = RoundedCornerShape(KdsBorderRadius.card),
    colors = CardDefaults.cardColors(
        containerColor = MaterialTheme.colorScheme.surface
    )
)

// ❌ INCORRECT - Hardcoded values
Card(
    modifier = Modifier.padding(16.dp),
    shape = RoundedCornerShape(20.dp),
    colors = CardDefaults.cardColors(
        containerColor = Color(0xFFFFFFFF)
    )
)
```

### Figma Reference

Always reference Figma designs when implementing components:

- **Figma File:** "K-Tokens" (pYoSx3qiEHJqsX8hVKlNkz)
- **Component Library:** "MUI for Figma 7.2.0"
- **Implementation Reference:** "Pagos Instantáneos"

Use Figma MCP for screenshots:
```
"Take a screenshot of the TextField component in Figma"
```

---

## 🔍 Quality Checklist

Before marking a component as complete:

### Functionality
- [ ] All variants implemented (if applicable)
- [ ] All states implemented (default, hover, focus, active, disabled, error)
- [ ] Accessibility labels (contentDescription, semantics)
- [ ] Keyboard navigation support
- [ ] RTL layout support

### Design Compliance
- [ ] Uses design tokens exclusively (no hardcoded values)
- [ ] Matches Figma specification
- [ ] Supports light/dark mode
- [ ] Proper spacing and sizing
- [ ] Correct typography styles

### Code Quality
- [ ] KDoc comments on public API
- [ ] @Sample usage in documentation
- [ ] Private helper functions for complex logic
- [ ] No code duplication
- [ ] Follows Kotlin coding conventions

### Testing
- [ ] Unit tests for component logic
- [ ] UI tests for interactions
- [ ] Snapshot tests for visual regression
- [ ] Preview functions for all states
- [ ] Manual testing in sample app

### Documentation
- [ ] README updated with component usage
- [ ] Migration guide (if breaking changes)
- [ ] CHANGELOG entry
- [ ] Sample code in demo app

---

## 🚨 Known Issues & Risks

### 1. Font Assets Missing
**Issue:** Public Sans font files not included in library
**Impact:** Medium - Falls back to system default
**Solution:** Copy fonts from khipu-client-android or download from Google Fonts
**Files Needed:**
- publicsans_regular.ttf
- publicsans_medium.ttf
- publicsans_semibold.ttf
- publicsans_bold.ttf

### 2. Token Generation
**Issue:** Manual token updates required (no Figma API sync)
**Impact:** Low - Tokens are stable
**Mitigation:** Document token update process in CLAUDE.md

### 3. Material 3 Limitations
**Issue:** Some MUI patterns don't have Material 3 equivalents
**Impact:** Medium - May need custom implementations
**Examples:** Outlined variant for some components
**Solution:** Build custom components with Material 3 styling

### 4. Version Skew with React
**Issue:** React lib at v0.1.0-alpha.5, Android at v0.1.0-alpha.1
**Impact:** Low - Independent versioning is fine
**Mitigation:** Document platform-specific version mappings

---

## 📖 Next Steps

### Immediate Actions (This Week)

1. **Add NPM scripts** for Android development
2. **Set up AWS CodeArtifact** credentials and test publishing
3. **Implement KdsTextField** (highest priority)
4. **Implement KdsCard** (second highest)
5. **Create sample app module** for testing

### Short Term (Next 2 Weeks)

6. Complete Phase 1 components (TextField, Card, Typography, Checkbox)
7. Publish v0.1.0-alpha.2
8. Test integration in khipu-client-android app

### Medium Term (Month 1)

9. Complete all core components (Phases 1-4)
10. Publish v0.1.0-beta.1
11. 80% test coverage

### Long Term (Quarter 1)

12. Production release v1.0.0
13. Full integration in all Khipu Android apps
14. Performance optimization and accessibility audit

---

## 📚 Additional Resources

### Documentation
- [Material 3 Design System](https://m3.material.io/)
- [Jetpack Compose Guidelines](https://developer.android.com/jetpack/compose)
- [AWS CodeArtifact Docs](https://docs.aws.amazon.com/codeartifact/)

### Internal References
- React Design System: `src/components/core/`
- Design Tokens: `src/tokens/index.ts`
- Figma: K-Tokens file
- CLAUDE.md for development conventions

### Tools
- Android Studio Ladybug (2024.2.1+)
- Gradle 8.11.1
- Kotlin 2.0.21
- JDK 17

---

**Document Owner:** Design System Team
**Last Updated:** 2026-02-09
**Review Cadence:** Weekly during active development
