# Khipu Design System - Android Usage Guide

**Version:** 0.1.0-alpha.1
**Last Updated:** 2026-02-09

Complete guide for integrating and using the Khipu Design System in Android applications.

---

## 📦 Installation

### Prerequisites

- **Minimum SDK:** 24 (Android 7.0)
- **Target SDK:** 35 (Android 15)
- **Kotlin:** 2.0.21+
- **Compose BOM:** 2024.11.00+
- **Gradle:** 8.11.1+

### Step 1: Configure Repository Access

#### Option A: AWS CodeArtifact (Production)

**1. Set up AWS credentials** (one-time setup per machine):

```bash
# Install AWS CLI if not already installed
# macOS: brew install awscli
# Linux: apt-get install awscli
# Windows: Download from AWS website

# Configure AWS credentials
aws configure
# Enter your AWS Access Key ID
# Enter your AWS Secret Access Key
# Enter your default region (e.g., us-east-1)
```

**2. Generate CodeArtifact token** (expires every 12 hours):

```bash
#!/bin/bash
# Save this as ~/scripts/khipu-codeartifact.sh and chmod +x it

export CODEARTIFACT_DOMAIN="khipu-artifacts"
export CODEARTIFACT_REPO="design-system-android"
export CODEARTIFACT_REGION="us-east-1"

export CODEARTIFACT_TOKEN=$(aws codeartifact get-authorization-token \
  --domain $CODEARTIFACT_DOMAIN \
  --domain-owner $(aws sts get-caller-identity --query Account --output text) \
  --region $CODEARTIFACT_REGION \
  --query authorizationToken \
  --output text)

export CODEARTIFACT_URL="https://${CODEARTIFACT_DOMAIN}-$(aws sts get-caller-identity --query Account --output text).d.codeartifact.${CODEARTIFACT_REGION}.amazonaws.com/maven/${CODEARTIFACT_REPO}/"

echo "✅ CodeArtifact configured!"
echo "URL: $CODEARTIFACT_URL"
```

**3. Source the script before building:**

```bash
# In your terminal session
source ~/scripts/khipu-codeartifact.sh

# Or add to ~/.zshrc or ~/.bashrc to run automatically
echo "source ~/scripts/khipu-codeartifact.sh" >> ~/.zshrc
```

**4. Configure settings.gradle.kts:**

```kotlin
// settings.gradle.kts
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

        // AWS CodeArtifact - Khipu Design System
        maven {
            name = "KhipuCodeArtifact"
            url = uri(System.getenv("CODEARTIFACT_URL") ?: "")
            credentials {
                username = "aws"
                password = System.getenv("CODEARTIFACT_TOKEN") ?: ""
            }
        }
    }
}

rootProject.name = "YourApp"
include(":app")
```

#### Option B: Maven Local (Development)

For local development and testing:

```kotlin
// settings.gradle.kts
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
        mavenLocal() // Add this line
    }
}
```

Then publish the design system locally:

```bash
cd /path/to/design-system/android
./gradlew :designsystem:publishToMavenLocal
```

---

### Step 2: Add Dependency

**app/build.gradle.kts:**

```kotlin
plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
    alias(libs.plugins.compose.compiler)
}

android {
    namespace = "com.khipu.yourapp"
    compileSdk = 35

    defaultConfig {
        minSdk = 24
        targetSdk = 35
        // ... other config
    }

    buildFeatures {
        compose = true
    }

    composeOptions {
        kotlinCompilerExtensionVersion = "1.5.15"
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    // Compose BOM (Bill of Materials) for version alignment
    implementation(platform("androidx.compose:compose-bom:2024.11.00"))

    // Khipu Design System
    implementation("com.khipu:design-system:0.1.0-alpha.1")

    // Core Android & Compose dependencies (if not already present)
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.activity:activity-compose:1.9.3")

    // Compose UI (versions managed by BOM)
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-graphics")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.material:material-icons-extended")

    // Debug tools
    debugImplementation("androidx.compose.ui:ui-tooling")
    debugImplementation("androidx.compose.ui:ui-test-manifest")
}
```

**Sync Gradle** and build your project.

---

### Step 3: Troubleshooting Installation

#### "Failed to resolve: com.khipu:design-system:0.1.0-alpha.1"

**Cause:** CodeArtifact token expired or not set.

**Solution:**
```bash
# Regenerate token
source ~/scripts/khipu-codeartifact.sh

# Verify environment variables
echo $CODEARTIFACT_URL
echo $CODEARTIFACT_TOKEN

# Rebuild
./gradlew clean build --refresh-dependencies
```

#### "Duplicate class found" errors

**Cause:** Version conflict between Compose dependencies.

**Solution:** Use Compose BOM to align versions:
```kotlin
implementation(platform("androidx.compose:compose-bom:2024.11.00"))
// Don't specify versions for Compose dependencies
implementation("androidx.compose.material3:material3") // ✅ No version
```

#### "Android resource linking failed"

**Cause:** Namespace conflicts or missing resources.

**Solution:**
```bash
# Clean build
./gradlew clean
./gradlew :app:assembleDebug --stacktrace
```

---

## 🎨 Basic Usage

### Wrap Your App with KdsTheme

**MainActivity.kt:**

```kotlin
package com.khipu.yourapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.khipu.designsystem.theme.KdsTheme
import com.khipu.designsystem.theme.KdsThemeMode

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            // Wrap your app content with KdsTheme
            KdsTheme(
                themeMode = KdsThemeMode.SYSTEM, // LIGHT, DARK, or SYSTEM
                dynamicStatusBar = true          // Update status bar color
            ) {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    YourAppContent()
                }
            }
        }
    }
}
```

### Theme Mode Options

```kotlin
// Force light mode
KdsTheme(themeMode = KdsThemeMode.LIGHT) { /* ... */ }

// Force dark mode
KdsTheme(themeMode = KdsThemeMode.DARK) { /* ... */ }

// Follow system setting (default)
KdsTheme(themeMode = KdsThemeMode.SYSTEM) { /* ... */ }

// Disable status bar color updates
KdsTheme(
    themeMode = KdsThemeMode.SYSTEM,
    dynamicStatusBar = false
) { /* ... */ }
```

---

## 🧩 Using Components

### KdsButton

```kotlin
import com.khipu.designsystem.components.*

// Basic button
KdsButton(
    text = "Pay Now",
    onClick = { /* Handle click */ }
)

// Outlined button
KdsButton(
    text = "Cancel",
    onClick = { /* Handle click */ },
    variant = KdsButtonVariant.OUTLINED,
    color = KdsButtonColor.SECONDARY
)

// Text button
KdsButton(
    text = "Learn More",
    onClick = { /* Handle click */ },
    variant = KdsButtonVariant.TEXT,
    fullWidth = false
)

// Button with loading state
var isLoading by remember { mutableStateOf(false) }

KdsButton(
    text = "Processing...",
    onClick = {
        isLoading = true
        // Perform async operation
    },
    loading = isLoading,
    enabled = !isLoading
)

// Button with icon
KdsButton(
    text = "Confirm",
    onClick = { /* ... */ },
    leadingIcon = {
        Icon(
            imageVector = Icons.Default.Check,
            contentDescription = null,
            modifier = Modifier.size(20.dp)
        )
    }
)

// Success button
KdsButton(
    text = "Payment Successful",
    onClick = { /* ... */ },
    variant = KdsButtonVariant.CONTAINED,
    color = KdsButtonColor.SUCCESS
)

// Error/Danger button
KdsButton(
    text = "Delete Account",
    onClick = { /* ... */ },
    variant = KdsButtonVariant.OUTLINED,
    color = KdsButtonColor.ERROR
)

// Button sizes
KdsButton(
    text = "Small Button",
    onClick = { /* ... */ },
    size = KdsButtonSize.SMALL,
    fullWidth = false
)

KdsButton(
    text = "Large Button",
    onClick = { /* ... */ },
    size = KdsButtonSize.LARGE
)
```

**Available Props:**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `text` | String | *required* | Button label text |
| `onClick` | () -> Unit | *required* | Click callback |
| `modifier` | Modifier | Modifier | Compose modifier |
| `variant` | KdsButtonVariant | CONTAINED | CONTAINED, OUTLINED, TEXT |
| `color` | KdsButtonColor | PRIMARY | PRIMARY, SECONDARY, SUCCESS, WARNING, ERROR |
| `size` | KdsButtonSize | MEDIUM | SMALL, MEDIUM, LARGE |
| `enabled` | Boolean | true | Enable/disable button |
| `loading` | Boolean | false | Show loading spinner |
| `fullWidth` | Boolean | true | Fill available width |
| `leadingIcon` | @Composable? | null | Icon before text |
| `trailingIcon` | @Composable? | null | Icon after text |

---

## 🎨 Accessing Design Tokens

### Colors

```kotlin
import com.khipu.designsystem.tokens.KdsColors
import androidx.compose.material3.MaterialTheme

@Composable
fun MyComponent() {
    // Via Material Theme (recommended - respects dark mode)
    val primaryColor = MaterialTheme.colorScheme.primary
    val surfaceColor = MaterialTheme.colorScheme.surface
    val onSurface = MaterialTheme.colorScheme.onSurface

    // Via Extended Colors (for semantic colors)
    val successColor = KdsTheme.extendedColors.success
    val warningColor = KdsTheme.extendedColors.warning
    val infoColor = KdsTheme.extendedColors.info

    // Direct token access (light mode only - use sparingly)
    val khipuPurple = KdsColors.primaryMain // #8347AD

    Box(
        modifier = Modifier
            .background(surfaceColor)
            .border(2.dp, successColor)
    ) {
        Text(
            text = "Success!",
            color = onSurface
        )
    }
}
```

**Extended Colors:**

```kotlin
val extendedColors = KdsTheme.extendedColors

// Success colors
extendedColors.success       // Main success color
extendedColors.successLight  // Light variant
extendedColors.successDark   // Dark variant
extendedColors.onSuccess     // Contrast text color

// Warning colors
extendedColors.warning
extendedColors.warningLight
extendedColors.warningDark
extendedColors.onWarning

// Info colors
extendedColors.info
extendedColors.infoLight
extendedColors.infoDark
extendedColors.onInfo
```

### Spacing

```kotlin
import com.khipu.designsystem.theme.KdsTheme
import com.khipu.designsystem.tokens.KdsSpacing

@Composable
fun MyComponent() {
    val spacing = KdsTheme.spacing

    Column(
        modifier = Modifier
            .padding(spacing.dpMedium)          // Semantic spacing
            .padding(horizontal = KdsSpacing.space4) // Numeric spacing
    ) {
        Text("Title")
        Spacer(modifier = Modifier.height(spacing.dpSmall))
        Text("Content")
    }
}
```

**Semantic Spacing Tokens:**

| Token | Value | Use Case |
|-------|-------|----------|
| `dpXSmall` | 4dp | Tight spacing, inline gaps |
| `dpSmall` | 8dp | List item gaps |
| `dpMedium` | 16dp | Standard padding |
| `dpLarge` | 24dp | Section gaps |
| `dpXLarge` | 32dp | Major sections |
| `dpXxLarge` | 48dp | Page margins |

**Numeric Scale:**

```kotlin
KdsSpacing.space0  // 0dp
KdsSpacing.space1  // 4dp
KdsSpacing.space2  // 8dp
KdsSpacing.space3  // 12dp
KdsSpacing.space4  // 16dp
KdsSpacing.space5  // 20dp
KdsSpacing.space6  // 24dp
KdsSpacing.space8  // 32dp
KdsSpacing.space10 // 40dp
KdsSpacing.space12 // 48dp
KdsSpacing.space16 // 64dp
KdsSpacing.space20 // 80dp
KdsSpacing.space24 // 96dp
```

**Component-Specific Spacing:**

```kotlin
// Card spacing
KdsSpacing.cardPaddingX    // 20dp
KdsSpacing.cardPaddingY    // 10dp
KdsSpacing.cardGap         // 16dp
KdsSpacing.cardListGap     // 12dp

// Button spacing
KdsSpacing.buttonPaddingX  // 22dp
KdsSpacing.buttonPaddingY  // 8dp

// Input spacing
KdsSpacing.inputPaddingX   // 12dp
KdsSpacing.inputPaddingY   // 16dp

// Layout spacing
KdsSpacing.sectionGap      // 32dp
KdsSpacing.formGap         // 20dp
KdsSpacing.stackGap        // 16dp
KdsSpacing.inlineGap       // 8dp
KdsSpacing.modalPadding    // 24dp
```

### Typography

```kotlin
import com.khipu.designsystem.theme.KdsTextStyles

@Composable
fun MyComponent() {
    Column {
        // Using predefined text styles
        Text(
            text = "Heading 1",
            style = KdsTextStyles.h1
        )

        Text(
            text = "Body text",
            style = KdsTextStyles.body
        )

        Text(
            text = "Button Label",
            style = KdsTextStyles.button
        )

        // Material Theme typography (also available)
        Text(
            text = "Display Large",
            style = MaterialTheme.typography.displayLarge
        )
    }
}
```

**Available Text Styles:**

| Style | Size | Weight | Use Case |
|-------|------|--------|----------|
| `display1` | 36sp | Bold | Hero text |
| `h1` | 40sp | Bold | Page titles |
| `h2` | 32sp | Bold | Section headers |
| `h3` | 28sp | SemiBold | Subsection headers |
| `h4` | 24sp | SemiBold | Card headers |
| `h5` | 20sp | SemiBold | List headers |
| `h6` | 20sp | SemiBold | Small headers |
| `bodyLarge` | 18sp | Regular | Intro paragraphs |
| `body` | 16sp | Regular | Body text |
| `bodySmall` | 14sp | Regular | Secondary text |
| `button` | 15sp | Medium | Button labels |
| `caption` | 12sp | Regular | Captions, hints |
| `label` | 12sp | Regular | Form labels |
| `overline` | 12sp | Regular | Overline text |

### Border Radius

```kotlin
import com.khipu.designsystem.tokens.KdsBorderRadius
import androidx.compose.foundation.shape.RoundedCornerShape

@Composable
fun MyComponent() {
    // Component-specific radius
    Card(
        shape = RoundedCornerShape(KdsBorderRadius.card) // 20dp
    ) { /* ... */ }

    Button(
        shape = RoundedCornerShape(KdsBorderRadius.button) // 4dp
    ) { /* ... */ }

    // Generic scale
    Surface(
        shape = RoundedCornerShape(KdsBorderRadius.radiusMd) // 8dp
    ) { /* ... */ }
}
```

**Border Radius Scale:**

```kotlin
KdsBorderRadius.radiusNone   // 0dp
KdsBorderRadius.radiusSm     // 4dp
KdsBorderRadius.radiusMd     // 8dp
KdsBorderRadius.radiusLg     // 12dp
KdsBorderRadius.radiusXl     // 16dp
KdsBorderRadius.radiusSize2Xl // 20dp
KdsBorderRadius.radiusSize3Xl // 24dp
KdsBorderRadius.radiusFull   // 9999dp (circular)

// Component-specific
KdsBorderRadius.button       // 4dp
KdsBorderRadius.input        // 4dp
KdsBorderRadius.card         // 20dp
KdsBorderRadius.modal        // 20dp
KdsBorderRadius.chip         // 16dp
KdsBorderRadius.avatar       // 100dp
KdsBorderRadius.iconContainer // 10dp
```

### Dimensions

```kotlin
import com.khipu.designsystem.tokens.KdsDimensions

@Composable
fun MyComponent() {
    Button(
        modifier = Modifier
            .fillMaxWidth()
            .height(KdsDimensions.buttonMinHeight) // 50dp
    ) { /* ... */ }

    TextField(
        modifier = Modifier.height(KdsDimensions.inputHeight) // 56dp
    ) { /* ... */ }
}
```

**Available Dimensions:**

```kotlin
KdsDimensions.buttonMinHeight    // 50dp
KdsDimensions.inputHeight        // 56dp
KdsDimensions.radioCardMinHeight // 65dp
KdsDimensions.containerMaxWidth  // 450dp
KdsDimensions.modalMaxWidth      // 450dp
KdsDimensions.modalMaxHeight     // 800dp
```

---

## 🎯 Common Patterns

### Form Layout

```kotlin
@Composable
fun PaymentForm() {
    KdsTheme {
        val spacing = KdsTheme.spacing

        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(spacing.dpMedium),
            verticalArrangement = Arrangement.spacedBy(spacing.dpMedium)
        ) {
            Text(
                text = "Payment Details",
                style = KdsTextStyles.h4
            )

            // Form fields would go here (TextField not yet implemented)
            // KdsTextField(label = "Card Number", ...)
            // KdsTextField(label = "CVV", ...)

            Spacer(modifier = Modifier.weight(1f))

            KdsButton(
                text = "Submit Payment",
                onClick = { /* submit */ },
                variant = KdsButtonVariant.CONTAINED,
                color = KdsButtonColor.PRIMARY,
                modifier = Modifier.fillMaxWidth()
            )

            KdsButton(
                text = "Cancel",
                onClick = { /* cancel */ },
                variant = KdsButtonVariant.TEXT,
                modifier = Modifier.fillMaxWidth()
            )
        }
    }
}
```

### Card Layout

```kotlin
@Composable
fun BankCard(bankName: String, isSelected: Boolean, onClick: () -> Unit) {
    val spacing = KdsTheme.spacing
    val borderColor = if (isSelected) {
        KdsColors.primaryMain
    } else {
        MaterialTheme.colorScheme.outline
    }

    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .clickable(onClick = onClick),
        shape = RoundedCornerShape(KdsBorderRadius.card),
        border = BorderStroke(
            width = if (isSelected) 2.dp else 1.dp,
            color = borderColor
        ),
        color = MaterialTheme.colorScheme.surface
    ) {
        Row(
            modifier = Modifier.padding(
                horizontal = KdsSpacing.cardPaddingX,
                vertical = KdsSpacing.cardPaddingY
            ),
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Bank logo
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .background(
                        KdsColors.backgroundElevated,
                        RoundedCornerShape(KdsBorderRadius.iconContainer)
                    )
            )

            Spacer(modifier = Modifier.width(spacing.dpMedium))

            Text(
                text = bankName,
                style = KdsTextStyles.body,
                modifier = Modifier.weight(1f)
            )

            if (isSelected) {
                Icon(
                    imageVector = Icons.Default.CheckCircle,
                    contentDescription = "Selected",
                    tint = KdsColors.primaryMain
                )
            }
        }
    }
}
```

### Loading State

```kotlin
@Composable
fun PaymentScreen() {
    var isLoading by remember { mutableStateOf(false) }
    var paymentResult by remember { mutableStateOf<String?>(null) }

    KdsTheme {
        Box(
            modifier = Modifier.fillMaxSize(),
            contentAlignment = Alignment.Center
        ) {
            if (isLoading) {
                CircularProgressIndicator(
                    color = KdsColors.primaryMain
                )
            } else {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.spacedBy(KdsSpacing.space4)
                ) {
                    Text(
                        text = paymentResult ?: "Ready to pay",
                        style = KdsTextStyles.h4
                    )

                    KdsButton(
                        text = "Process Payment",
                        onClick = {
                            isLoading = true
                            // Simulate async operation
                            // In real app, use coroutines
                        },
                        loading = isLoading
                    )
                }
            }
        }
    }
}
```

### Error State

```kotlin
@Composable
fun PaymentWithError() {
    var hasError by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf("") }
    val extendedColors = KdsTheme.extendedColors

    Column {
        if (hasError) {
            Surface(
                color = extendedColors.errorLight,
                shape = RoundedCornerShape(KdsBorderRadius.radiusSm),
                modifier = Modifier.padding(KdsSpacing.space4)
            ) {
                Row(
                    modifier = Modifier.padding(KdsSpacing.space4),
                    horizontalArrangement = Arrangement.spacedBy(KdsSpacing.space2)
                ) {
                    Icon(
                        imageVector = Icons.Default.Error,
                        contentDescription = null,
                        tint = extendedColors.error
                    )
                    Text(
                        text = errorMessage,
                        color = extendedColors.error,
                        style = KdsTextStyles.bodySmall
                    )
                }
            }
        }

        KdsButton(
            text = "Submit",
            onClick = {
                // Validation
                if (validateInput()) {
                    hasError = false
                    // Proceed
                } else {
                    hasError = true
                    errorMessage = "Please check your input"
                }
            },
            color = if (hasError) KdsButtonColor.ERROR else KdsButtonColor.PRIMARY
        )
    }
}
```

---

## 🧪 Testing

### Unit Testing Components

```kotlin
import androidx.compose.ui.test.*
import androidx.compose.ui.test.junit4.createComposeRule
import com.khipu.designsystem.theme.KdsTheme
import com.khipu.designsystem.components.KdsButton
import org.junit.Rule
import org.junit.Test

class PaymentScreenTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun button_clickTriggersCallback() {
        var clicked = false

        composeTestRule.setContent {
            KdsTheme {
                KdsButton(
                    text = "Pay Now",
                    onClick = { clicked = true }
                )
            }
        }

        composeTestRule
            .onNodeWithText("Pay Now")
            .performClick()

        assert(clicked)
    }

    @Test
    fun button_showsLoadingState() {
        composeTestRule.setContent {
            KdsTheme {
                KdsButton(
                    text = "Processing",
                    onClick = { },
                    loading = true
                )
            }
        }

        composeTestRule
            .onNode(hasContentDescription("Loading"))
            .assertIsDisplayed()
    }
}
```

### Snapshot Testing

```kotlin
import app.cash.paparazzi.Paparazzi
import org.junit.Rule
import org.junit.Test

class ButtonSnapshotTest {

    @get:Rule
    val paparazzi = Paparazzi()

    @Test
    fun button_containedPrimary() {
        paparazzi.snapshot {
            KdsTheme {
                KdsButton(
                    text = "Pay Now",
                    onClick = { },
                    variant = KdsButtonVariant.CONTAINED,
                    color = KdsButtonColor.PRIMARY
                )
            }
        }
    }

    @Test
    fun button_outlinedSecondary() {
        paparazzi.snapshot {
            KdsTheme {
                KdsButton(
                    text = "Cancel",
                    onClick = { },
                    variant = KdsButtonVariant.OUTLINED,
                    color = KdsButtonColor.SECONDARY
                )
            }
        }
    }
}
```

---

## 🎨 Theming & Customization

### Custom Color Overrides

While we recommend using design tokens, you can override colors if needed:

```kotlin
@Composable
fun CustomThemedContent() {
    KdsTheme {
        // Get the current color scheme
        val colorScheme = MaterialTheme.colorScheme

        // Create a custom color scheme
        val customColorScheme = colorScheme.copy(
            primary = Color(0xFF123456), // Custom primary
            // Note: This is NOT recommended as it breaks design consistency
        )

        MaterialTheme(colorScheme = customColorScheme) {
            // Your custom content
        }
    }
}
```

**⚠️ Warning:** Overriding colors breaks design consistency. Only do this for app-specific branding that can't use the design system colors.

### Accessing Theme Programmatically

```kotlin
@Composable
fun ThemeAwareComponent() {
    val isDarkMode = isSystemInDarkTheme()

    // Access current colors
    val backgroundColor = MaterialTheme.colorScheme.background
    val textColor = MaterialTheme.colorScheme.onBackground

    // Conditional styling based on theme
    val iconTint = if (isDarkMode) {
        Color.White
    } else {
        Color.Black
    }

    Icon(
        imageVector = Icons.Default.Info,
        contentDescription = null,
        tint = iconTint
    )
}
```

---

## 🚀 Performance Tips

### 1. Avoid Recomposition

```kotlin
// ❌ BAD - Creates new instance on every recomposition
@Composable
fun MyButton() {
    KdsButton(
        text = "Click",
        onClick = { doSomething() } // New lambda every time
    )
}

// ✅ GOOD - Stable callback
@Composable
fun MyButton(onClick: () -> Unit) {
    KdsButton(
        text = "Click",
        onClick = onClick // Stable reference
    )
}

// ✅ GOOD - Remember callback
@Composable
fun MyButton() {
    val handleClick = remember {
        { doSomething() }
    }

    KdsButton(
        text = "Click",
        onClick = handleClick
    )
}
```

### 2. Use remember for Expensive Operations

```kotlin
@Composable
fun ExpensiveComponent() {
    // ❌ BAD - Recalculates every recomposition
    val spacing = calculateComplexSpacing()

    // ✅ GOOD - Calculates once
    val spacing = remember { calculateComplexSpacing() }

    Box(modifier = Modifier.padding(spacing))
}
```

### 3. Minimize State Hoisting

```kotlin
// ✅ Keep state local when possible
@Composable
fun FormField() {
    var value by remember { mutableStateOf("") }

    // KdsTextField(value = value, onValueChange = { value = it })
}
```

---

## 📚 Migration Guide

### From Material3 to KdsButton

**Before:**
```kotlin
Button(
    onClick = { /* ... */ },
    colors = ButtonDefaults.buttonColors(
        containerColor = Color(0xFF8347AD)
    )
) {
    Text("Pay Now")
}
```

**After:**
```kotlin
KdsButton(
    text = "Pay Now",
    onClick = { /* ... */ }
)
```

### From Custom Components to Design System

**Before:**
```kotlin
@Composable
fun CustomButton(text: String, onClick: () -> Unit) {
    Surface(
        modifier = Modifier
            .fillMaxWidth()
            .height(50.dp)
            .clip(RoundedCornerShape(4.dp))
            .clickable(onClick = onClick),
        color = Color(0xFF8347AD)
    ) {
        Box(contentAlignment = Alignment.Center) {
            Text(
                text = text,
                color = Color.White,
                fontSize = 15.sp,
                fontWeight = FontWeight.Medium
            )
        }
    }
}
```

**After:**
```kotlin
KdsButton(
    text = text,
    onClick = onClick
)
```

**Benefits:**
- ✅ Automatic theming (light/dark mode)
- ✅ Accessibility built-in
- ✅ Loading states
- ✅ Disabled states
- ✅ Consistent with design system
- ✅ Less code to maintain

---

## ❓ FAQ

### Q: How do I update to a new version?

**A:** Update the version in `app/build.gradle.kts`:

```kotlin
implementation("com.khipu:design-system:0.1.0-alpha.2") // New version
```

Then sync Gradle and rebuild.

### Q: Can I use this with XML layouts?

**A:** No, this library is Compose-only. If you're using XML, consider migrating to Jetpack Compose or using Compose interop:

```kotlin
class MyFragment : Fragment() {
    override fun onCreateView(/* ... */): View {
        return ComposeView(requireContext()).apply {
            setContent {
                KdsTheme {
                    KdsButton(text = "Click", onClick = { })
                }
            }
        }
    }
}
```

### Q: How do I handle CodeArtifact token expiration?

**A:** Tokens expire after 12 hours. Re-run the script:

```bash
source ~/scripts/khipu-codeartifact.sh
```

Or automate it in your CI/CD pipeline.

### Q: Can I customize the primary color?

**A:** The design system uses Khipu brand colors (#8347AD). If you need custom colors for your app-specific features, use extended colors or Material Theme's color system alongside the design system components.

### Q: Why is my component not showing the correct style?

**A:** Ensure you've wrapped your content with `KdsTheme`:

```kotlin
KdsTheme {
    // Your components here
}
```

### Q: How do I report bugs or request features?

**A:** Create an issue in the design-system repository or contact the design system team.

---

## 📞 Support

- **Documentation:** `/android/README.md`
- **Issues:** GitHub Issues in design-system repo
- **Team:** Design System Team (@khipu-design-system)
- **Slack:** #design-system channel

---

**Last Updated:** 2026-02-09
**Version:** 0.1.0-alpha.1
