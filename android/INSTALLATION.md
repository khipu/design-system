# Khipu Design System - Android Installation Guide

Complete guide to install and use the Khipu Design System in your Android project.

**Library Version:** `0.1.0-alpha.1`
**Published:** ✅ Available in AWS CodeArtifact

---

## 📦 Quick Installation (5 Minutes)

### Step 1: Configure AWS CodeArtifact Access

**One-time setup per machine:**

```bash
# 1. Create authentication script
cat > ~/scripts/khipu-codeartifact.sh << 'EOF'
#!/bin/bash
export CODEARTIFACT_DOMAIN="khipu"
export CODEARTIFACT_REPO="maven-packages"
export CODEARTIFACT_REGION="us-east-1"
export CODEARTIFACT_ACCOUNT_ID="375783675928"

export CODEARTIFACT_TOKEN=$(aws codeartifact get-authorization-token \
  --domain $CODEARTIFACT_DOMAIN \
  --domain-owner $CODEARTIFACT_ACCOUNT_ID \
  --region $CODEARTIFACT_REGION \
  --query authorizationToken \
  --output text)

export CODEARTIFACT_URL="https://${CODEARTIFACT_DOMAIN}-${CODEARTIFACT_ACCOUNT_ID}.d.codeartifact.${CODEARTIFACT_REGION}.amazonaws.com/maven/${CODEARTIFACT_REPO}/"

echo "✅ CodeArtifact configured!"
echo "⏰ Token expires in 12 hours"
EOF

# 2. Make it executable
chmod +x ~/scripts/khipu-codeartifact.sh

# 3. Run it (token expires every 12 hours)
source ~/scripts/khipu-codeartifact.sh
```

**Output:**
```
✅ CodeArtifact configured!
⏰ Token expires in 12 hours
```

**Optional:** Add to your shell profile to run automatically:
```bash
echo 'source ~/scripts/khipu-codeartifact.sh' >> ~/.zshrc
```

---

### Step 2: Configure Your Android Project

#### 2.1: Update `settings.gradle.kts`

Add CodeArtifact repository:

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

        // ✅ ADD THIS: Khipu CodeArtifact
        maven {
            name = "KhipuCodeArtifact"
            url = uri(System.getenv("CODEARTIFACT_URL") ?:
                "https://khipu-375783675928.d.codeartifact.us-east-1.amazonaws.com/maven/maven-packages/")
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

#### 2.2: Update `app/build.gradle.kts`

Add the design system dependency:

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
}

dependencies {
    // ✅ ADD THIS: Khipu Design System
    implementation("com.khipu:design-system:0.1.0-alpha.1")

    // Required: Compose BOM (if not already present)
    implementation(platform("androidx.compose:compose-bom:2024.11.00"))
    implementation("androidx.compose.material3:material3")
    implementation("androidx.compose.ui:ui")
    implementation("androidx.compose.ui:ui-tooling-preview")
    implementation("androidx.compose.material:material-icons-extended")

    // Your other dependencies...
    implementation("androidx.core:core-ktx:1.15.0")
    implementation("androidx.lifecycle:lifecycle-runtime-ktx:2.8.7")
    implementation("androidx.activity:activity-compose:1.9.3")
}
```

---

### Step 3: Sync Gradle

```bash
# Option 1: In Android Studio
# File > Sync Project with Gradle Files

# Option 2: Command line
./gradlew build
```

**Expected output:**
```
> Configure project :app
Resolving dependencies...
  Found: com.khipu:design-system:0.1.0-alpha.1 from KhipuCodeArtifact

BUILD SUCCESSFUL
```

---

### Step 4: Use in Your App

#### 4.1: Wrap Your App with KdsTheme

**MainActivity.kt:**

```kotlin
package com.khipu.yourapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.ui.Modifier
import com.khipu.designsystem.theme.KdsTheme
import com.khipu.designsystem.theme.KdsThemeMode

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            // Wrap your app with KdsTheme
            KdsTheme(themeMode = KdsThemeMode.SYSTEM) {
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

#### 4.2: Use KdsButton

```kotlin
import com.khipu.designsystem.components.KdsButton
import com.khipu.designsystem.components.KdsButtonVariant
import com.khipu.designsystem.components.KdsButtonColor

@Composable
fun PaymentScreen() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        // Primary button
        KdsButton(
            text = "Pagar con Khipu",
            onClick = { /* Handle payment */ }
        )

        // Secondary outlined button
        KdsButton(
            text = "Cancelar",
            onClick = { /* Handle cancel */ },
            variant = KdsButtonVariant.OUTLINED,
            color = KdsButtonColor.SECONDARY
        )

        // Success button
        KdsButton(
            text = "Confirmar",
            onClick = { /* Handle confirm */ },
            color = KdsButtonColor.SUCCESS
        )

        // With loading state
        var isLoading by remember { mutableStateOf(false) }

        KdsButton(
            text = "Procesando...",
            onClick = {
                isLoading = true
                // Your async operation
            },
            loading = isLoading
        )
    }
}
```

#### 4.3: Access Design Tokens

```kotlin
import com.khipu.designsystem.theme.KdsTheme
import com.khipu.designsystem.tokens.*

@Composable
fun CustomComponent() {
    val spacing = KdsTheme.spacing
    val extendedColors = KdsTheme.extendedColors

    Surface(
        modifier = Modifier
            .padding(spacing.dpMedium)  // Semantic spacing
            .fillMaxWidth(),
        color = extendedColors.success,
        shape = RoundedCornerShape(KdsBorderRadius.card)
    ) {
        Text(
            text = "Pago exitoso",
            style = KdsTextStyles.h6,
            color = extendedColors.onSuccess,
            modifier = Modifier.padding(KdsSpacing.space4)
        )
    }
}
```

---

## ✅ Verification

Test that everything works:

```kotlin
import com.khipu.designsystem.theme.KdsTheme
import com.khipu.designsystem.components.KdsButton

@Preview(showBackground = true)
@Composable
fun TestDesignSystem() {
    KdsTheme {
        KdsButton(
            text = "Test Button",
            onClick = { }
        )
    }
}
```

Run this preview in Android Studio. If it renders, installation is successful! ✅

---

## 🔧 Troubleshooting

### "Failed to resolve: com.khipu:design-system:0.1.0-alpha.1"

**Cause:** CodeArtifact token expired or not set.

**Solution:**
```bash
# Regenerate token
source ~/scripts/khipu-codeartifact.sh

# Verify environment variables
echo $CODEARTIFACT_URL
echo $CODEARTIFACT_TOKEN

# Clean and rebuild
./gradlew clean build --refresh-dependencies
```

### "Duplicate class" errors

**Cause:** Version conflict between Compose dependencies.

**Solution:** Use Compose BOM to align versions:
```kotlin
implementation(platform("androidx.compose:compose-bom:2024.11.00"))
// Don't specify versions for compose dependencies
implementation("androidx.compose.material3:material3") // ✅ No version
```

### "Unresolved reference: KdsButton"

**Cause:** Import not found.

**Solution:** Ensure correct imports:
```kotlin
import com.khipu.designsystem.components.KdsButton
import com.khipu.designsystem.components.KdsButtonVariant
import com.khipu.designsystem.components.KdsButtonColor
```

### Token expires error

**Cause:** CodeArtifact tokens expire after 12 hours.

**Solution:**
```bash
# Re-run the authentication script
source ~/scripts/khipu-codeartifact.sh

# Then sync Gradle again
./gradlew build --refresh-dependencies
```

### "SDK location not found"

**Cause:** Android SDK path not configured.

**Solution:** Create `local.properties` in project root:
```properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
# On Windows: sdk.dir=C\:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
# On Linux: sdk.dir=/home/YOUR_USERNAME/Android/Sdk
```

---

## 📚 Available Components

Currently available in v0.1.0-alpha.1:

### KdsButton
Full-featured button component with:
- ✅ 3 variants (Contained, Outlined, Text)
- ✅ 5 color schemes (Primary, Secondary, Success, Warning, Error)
- ✅ 3 sizes (Small, Medium, Large)
- ✅ Loading state
- ✅ Disabled state
- ✅ Icon support (leading/trailing)
- ✅ Full-width option

**More components coming soon:**
- TextField (next release)
- Card (next release)
- Typography helpers
- Checkbox
- Modal/Dialog
- And more...

---

## 🔄 Updating to Newer Versions

When a new version is published:

### 1. Update dependency version

**app/build.gradle.kts:**
```kotlin
implementation("com.khipu:design-system:0.1.0-alpha.2") // Updated version
```

### 2. Sync Gradle

```bash
./gradlew build --refresh-dependencies
```

### 3. Check release notes

Check the design system repository for:
- New components
- Breaking changes
- Migration guides

---

## 🎨 Complete Example App

**MainActivity.kt:**

```kotlin
package com.khipu.yourapp

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import com.khipu.designsystem.theme.KdsTheme
import com.khipu.designsystem.theme.KdsThemeMode
import com.khipu.designsystem.components.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PaymentApp()
        }
    }
}

@Composable
fun PaymentApp() {
    var counter by remember { mutableStateOf(0) }
    var isLoading by remember { mutableStateOf(false) }

    KdsTheme(themeMode = KdsThemeMode.SYSTEM) {
        Surface(
            modifier = Modifier.fillMaxSize(),
            color = MaterialTheme.colorScheme.background
        ) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(16.dp),
                verticalArrangement = Arrangement.spacedBy(16.dp)
            ) {
                Text(
                    text = "Khipu Design System Demo",
                    style = MaterialTheme.typography.headlineMedium
                )

                Text("Clicks: $counter")

                KdsButton(
                    text = "Primary Button",
                    onClick = { counter++ }
                )

                KdsButton(
                    text = "Secondary Outlined",
                    onClick = { counter++ },
                    variant = KdsButtonVariant.OUTLINED,
                    color = KdsButtonColor.SECONDARY
                )

                KdsButton(
                    text = "Success",
                    onClick = { counter++ },
                    color = KdsButtonColor.SUCCESS
                )

                KdsButton(
                    text = "Loading Button",
                    onClick = { isLoading = !isLoading },
                    loading = isLoading
                )

                KdsButton(
                    text = "Disabled",
                    onClick = { },
                    enabled = false
                )

                Text("Different Sizes:")
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    KdsButton(
                        text = "S",
                        onClick = { },
                        size = KdsButtonSize.SMALL,
                        fullWidth = false
                    )
                    KdsButton(
                        text = "M",
                        onClick = { },
                        size = KdsButtonSize.MEDIUM,
                        fullWidth = false
                    )
                    KdsButton(
                        text = "L",
                        onClick = { },
                        size = KdsButtonSize.LARGE,
                        fullWidth = false
                    )
                }
            }
        }
    }
}
```

---

## 📞 Support

- **Documentation:** See [USAGE_GUIDE.md](USAGE_GUIDE.md) for complete API reference
- **Quick Start:** See [QUICK_START.md](QUICK_START.md) for 30-second guide
- **Issues:** Create an issue in the design-system repository
- **Slack:** #design-system channel

---

## 📋 Checklist

Before deploying your app with the design system:

- [ ] CodeArtifact authentication configured
- [ ] settings.gradle.kts updated with repository
- [ ] app/build.gradle.kts updated with dependency
- [ ] Gradle synced successfully
- [ ] App wrapped with `KdsTheme`
- [ ] Components rendering correctly
- [ ] Light and dark modes tested
- [ ] No compilation errors

---

**Installation complete!** 🎉

You're now ready to use the Khipu Design System in your Android app.

For detailed component documentation, see [USAGE_GUIDE.md](USAGE_GUIDE.md).
