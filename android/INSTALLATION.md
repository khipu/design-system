# Khipu Design System - Android Installation Guide

Complete guide to install and use the Khipu Design System in your Android project.

**Library Version:** `0.1.0-alpha.44`
**Published:** ✅ Available in Nexus (dev.khipu.com)

---

## 📦 Quick Installation (5 Minutes)

### Step 1: Configure Nexus Credentials

**One-time setup per machine:**

Create or edit `~/.gradle/gradle.properties`:

```properties
# Nexus Khipu Credentials
khipuRepoUsername=deployment
khipuRepoPassword=93h50sj2di2hd923

# Android SDK path (adjust to your system)
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
# Windows: sdk.dir=C\:\\Users\\YOUR_USERNAME\\AppData\\Local\\Android\\Sdk
# Linux: sdk.dir=/home/YOUR_USERNAME/Android/Sdk
```

**⚠️ Security:** This file is local and should NOT be committed to Git (already in `.gitignore`)

---

### Step 2: Configure Your Android Project

#### 2.1: Update `settings.gradle.kts`

Add Nexus repository:

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

        // ✅ ADD THIS: Khipu Nexus Design System
        maven {
            name = "KhipuNexusDesignSystem"
            url = uri("https://dev.khipu.com/nexus/content/repositories/design-system")
            credentials {
                username = extra.properties["khipuRepoUsername"] as String? ?: ""
                password = extra.properties["khipuRepoPassword"] as String? ?: ""
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
    implementation("com.khipu:design-system:0.1.0-alpha.44")

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
  Found: com.khipu:design-system:0.1.0-alpha.44 from KhipuNexusDesignSystem

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

### "Failed to resolve: com.khipu:design-system:0.1.0-alpha.44"

**Cause:** Nexus credentials not set or incorrect.

**Solution:**
```bash
# Verify credentials in ~/.gradle/gradle.properties
cat ~/.gradle/gradle.properties | grep khipuRepo

# Expected output:
# khipuRepoUsername=deployment
# khipuRepoPassword=93h50sj2di2hd923

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

### Nexus authentication error

**Cause:** Incorrect credentials or network issues.

**Solution:**
```bash
# Verify Nexus is accessible
curl -I "https://dev.khipu.com/nexus/content/repositories/design-system/"
# Should return HTTP 200

# Verify credentials
cat ~/.gradle/gradle.properties | grep khipuRepo

# Try manual download to test credentials
curl -u deployment:93h50sj2di2hd923 \
  "https://dev.khipu.com/nexus/content/repositories/design-system/com/khipu/design-system/maven-metadata.xml"

# Clean and rebuild
./gradlew clean build --refresh-dependencies
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

Currently available in v0.1.0-alpha.44:

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
- TextField (planned)
- Card (planned)
- Typography helpers (planned)
- Checkbox (planned)
- Modal/Dialog (planned)
- And more...

---

## 🔄 Updating to Newer Versions

When a new version is published to Nexus:

### 1. Update dependency version

**app/build.gradle.kts:**
```kotlin
implementation("com.khipu:design-system:0.1.0-alpha.7") // Updated version
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

### 4. Verify Nexus has the new version

```bash
curl -u deployment:93h50sj2di2hd923 \
  "https://dev.khipu.com/nexus/content/repositories/design-system/com/khipu/design-system/maven-metadata.xml"
```

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

- [ ] Nexus credentials configured in `~/.gradle/gradle.properties`
- [ ] settings.gradle.kts updated with Nexus repository
- [ ] app/build.gradle.kts updated with dependency (0.1.0-alpha.44)
- [ ] Gradle synced successfully
- [ ] Dependency downloaded from Nexus (check build output)
- [ ] App wrapped with `KdsTheme`
- [ ] Components rendering correctly
- [ ] Light and dark modes tested
- [ ] No compilation errors

---

**Installation complete!** 🎉

You're now ready to use the Khipu Design System in your Android app.

**Published to:** Nexus (dev.khipu.com/nexus/content/repositories/design-system)
**Current version:** 0.1.0-alpha.44

For detailed component documentation, see [USAGE_GUIDE.md](USAGE_GUIDE.md).
