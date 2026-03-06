# Khipu Design System - Android

Jetpack Compose implementation of the Khipu Design System.

## Requirements

- Android Studio Ladybug (2024.2.1) or later
- JDK 17
- Android SDK 35
- Kotlin 2.0.21

## Project Structure

```
android/
├── designsystem/                    # Library module
│   └── src/main/java/com/khipu/designsystem/
│       ├── tokens/                  # Generated from tokens.json
│       │   └── KdsTokens.kt         # Colors, spacing, typography values
│       ├── theme/                   # Theme configuration
│       │   ├── Theme.kt             # KdsTheme composable
│       │   ├── Typography.kt        # Font styles
│       │   ├── Shape.kt             # Border radius
│       │   ├── Spacing.kt           # Spacing values with aliases
│       │   └── ExtendedColors.kt    # Semantic colors (success, warning, etc.)
│       └── components/              # UI components
│           └── KdsButton.kt         # Button component
├── gradle/                          # Gradle wrapper
├── build.gradle.kts                 # Root build config
├── settings.gradle.kts              # Module settings
└── gradle.properties                # Gradle properties
```

## Building

```bash
# From project root
npm run android:build

# Or directly with Gradle
cd android
./gradlew :designsystem:build
```

## Publishing

### To Maven Local (Development)

```bash
npm run android:publish-local
# or
./gradlew :designsystem:publishToMavenLocal
```

### To AWS CodeArtifact

Set environment variables:
```bash
export CODEARTIFACT_URL="https://your-domain.d.codeartifact.region.amazonaws.com/maven/your-repo/"
export CODEARTIFACT_TOKEN=$(aws codeartifact get-authorization-token --domain your-domain --query authorizationToken --output text)
```

Then publish:
```bash
npm run android:publish
# or
./gradlew :designsystem:publish
```

## Usage in Android Project

### 1. Add Dependency

```kotlin
// settings.gradle.kts
dependencyResolutionManagement {
    repositories {
        // For local development
        mavenLocal()

        // For AWS CodeArtifact
        maven {
            url = uri("https://your-domain.d.codeartifact.region.amazonaws.com/maven/your-repo/")
            credentials {
                username = "aws"
                password = System.getenv("CODEARTIFACT_TOKEN")
            }
        }
    }
}

// app/build.gradle.kts
dependencies {
    implementation("com.khipu:design-system:0.1.0-alpha.1")
}
```

### 2. Use Theme

```kotlin
import com.khipu.designsystem.theme.KdsTheme
import com.khipu.designsystem.theme.KdsThemeMode
import com.khipu.designsystem.components.KdsButton

@Composable
fun MyScreen() {
    KdsTheme(themeMode = KdsThemeMode.SYSTEM) {
        KdsButton(
            text = "Pay Now",
            onClick = { /* handle click */ }
        )
    }
}
```

### 3. Access Theme Values

```kotlin
// Access spacing
val spacing = KdsTheme.spacing
Box(modifier = Modifier.padding(spacing.dpMedium))  // Semantic
Box(modifier = Modifier.padding(spacing.space4))   // Numeric

// Access extended colors (success, warning, info)
val colors = KdsTheme.extendedColors
Text(color = colors.success, text = "Success!")

// Access tokens directly
import com.khipu.designsystem.tokens.KdsColors
import com.khipu.designsystem.tokens.KdsSpacing

Box(
    modifier = Modifier
        .background(KdsColors.primaryMain)
        .padding(KdsSpacing.space4)
)
```

## Components

### KdsButton

```kotlin
KdsButton(
    text = "Button Text",
    onClick = { },
    variant = KdsButtonVariant.CONTAINED,  // CONTAINED, OUTLINED, TEXT
    color = KdsButtonColor.PRIMARY,        // PRIMARY, SECONDARY, SUCCESS, WARNING, ERROR
    size = KdsButtonSize.MEDIUM,           // SMALL, MEDIUM, LARGE
    enabled = true,
    loading = false,
    fullWidth = true,
    leadingIcon = { Icon(Icons.Default.Check, null) },
    trailingIcon = null
)
```

## Regenerating Tokens

When design tokens are updated in `tokens/tokens.json`:

```bash
# From project root
npm run generate:tokens:android
```

This regenerates `android/designsystem/src/main/java/com/khipu/designsystem/tokens/KdsTokens.kt`.

## Adding Fonts

The library is configured to use Public Sans font. To add the font files:

1. Copy font files from `khipu-client-android` or download from Google Fonts
2. Place in `designsystem/src/main/res/font/`:
   - `publicsans_regular.ttf`
   - `publicsans_medium.ttf`
   - `publicsans_semibold.ttf`
   - `publicsans_bold.ttf`
   - `publicsans_light.ttf`

3. Update `Typography.kt` to use the fonts:

```kotlin
val PublicSansFontFamily = FontFamily(
    Font(R.font.publicsans_regular, FontWeight.Normal),
    Font(R.font.publicsans_medium, FontWeight.Medium),
    Font(R.font.publicsans_semibold, FontWeight.SemiBold),
    Font(R.font.publicsans_bold, FontWeight.Bold),
    Font(R.font.publicsans_light, FontWeight.Light),
)
```

## Version

Current version: `0.1.0-alpha.1`

Update version in `designsystem/build.gradle.kts`:
```kotlin
val libraryVersion = "0.1.0-alpha.1"
```
