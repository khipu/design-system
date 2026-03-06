# Khipu Design System - Android Quick Start

**30-Second Setup Guide**

---

## 🚀 Installation (5 minutes)

### 1. Configure AWS CodeArtifact

```bash
# Create script (one-time)
cat > ~/scripts/khipu-codeartifact.sh << 'EOF'
#!/bin/bash
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
EOF

chmod +x ~/scripts/khipu-codeartifact.sh

# Run it
source ~/scripts/khipu-codeartifact.sh
```

### 2. Add Repository to Your App

**settings.gradle.kts:**
```kotlin
dependencyResolutionManagement {
    repositories {
        google()
        mavenCentral()
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

### 3. Add Dependency

**app/build.gradle.kts:**
```kotlin
dependencies {
    implementation("com.khipu:design-system:0.1.0-alpha.1")
}
```

### 4. Use in Code

**MainActivity.kt:**
```kotlin
import com.khipu.designsystem.theme.KdsTheme
import com.khipu.designsystem.components.KdsButton

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            KdsTheme {
                KdsButton(
                    text = "Pay Now",
                    onClick = { /* handle click */ }
                )
            }
        }
    }
}
```

---

## 📝 Common Components

### Button
```kotlin
KdsButton(
    text = "Pay Now",
    onClick = { /* ... */ },
    variant = KdsButtonVariant.CONTAINED,  // CONTAINED, OUTLINED, TEXT
    color = KdsButtonColor.PRIMARY,        // PRIMARY, SECONDARY, SUCCESS, WARNING, ERROR
    loading = false
)
```

### Access Tokens
```kotlin
// Colors
val primaryColor = MaterialTheme.colorScheme.primary
val successColor = KdsTheme.extendedColors.success

// Spacing
val spacing = KdsTheme.spacing
Box(modifier = Modifier.padding(spacing.dpMedium))

// Typography
Text("Hello", style = KdsTextStyles.h4)

// Border Radius
Card(shape = RoundedCornerShape(KdsBorderRadius.card))
```

---

## 🔧 Development Commands

```bash
# Build library
npm run android:build

# Publish to local Maven (for testing)
npm run android:publish-local

# Publish to CodeArtifact
source ~/scripts/khipu-codeartifact.sh
npm run android:publish
```

---

## 📚 Full Documentation

- **Setup Details:** [USAGE_GUIDE.md](./USAGE_GUIDE.md)
- **Implementation Plan:** [../ANDROID_IMPLEMENTATION_PLAN.md](../ANDROID_IMPLEMENTATION_PLAN.md)
- **Component Reference:** [README.md](./README.md)

---

## ⚡ Troubleshooting

### "Failed to resolve: com.khipu:design-system"
```bash
# Regenerate CodeArtifact token
source ~/scripts/khipu-codeartifact.sh
./gradlew clean build --refresh-dependencies
```

### Compose version conflicts
```kotlin
// Use Compose BOM to align versions
implementation(platform("androidx.compose:compose-bom:2024.11.00"))
```

### Token expired (after 12 hours)
```bash
source ~/scripts/khipu-codeartifact.sh
```

---

**Need Help?** Check [USAGE_GUIDE.md](./USAGE_GUIDE.md) or contact #design-system on Slack
