# Grails/GSP Design System - Implementation Plannn

## Executive Summary

This document outlines the implementation strategy for adding Grails/GSP taglib support to the Khipu Design System, creating a third platform alongside React and Android. This will enable the `~/Code/payment` Grails application to use consistent design tokens and components with the rest of the Khipu ecosystem.

**Deliverables:**
- Grails taglib library (`.groovy` files) for components
- CSS with design tokens (CSS Variables)
- Gradle build system for packaging
- AWS CodeArtifact publishing pipeline
- Migration guide for payment project

**Timeline:** 6-8 weeks
**Complexity:** Medium (Grails/Groovy learning curve, legacy integration)

**Technology:** Pure CSS with CSS Variables (no preprocessor required)

---

## 1. Architecture Overview

### 1.1 Multi-Platform Token Flow

```
src/tokens/index.ts (Source of Truth)
    ↓
npm run build (TypeScript → JavaScript)
    ↓
src/tokens/tokens.json (Auto-generated)
    ↓
    ├→ css-variables.css (Web/Grails) ✅ ALREADY EXISTS
    ├→ KdsTokens.kt (Android)
    └→ Copy to grails/src/main/resources/css/
```

**Key Advantage:** The CSS Variables file already exists for React, so Grails reuses it directly!

### 1.2 Grails Build Architecture

```
design-system/
├── grails/                          # NEW - Grails module
│   ├── build.gradle                 # Gradle build (NO SCSS compilation)
│   ├── settings.gradle
│   ├── gradle.properties
│   ├── src/
│   │   ├── main/
│   │   │   ├── groovy/
│   │   │   │   └── com/khipu/designsystem/
│   │   │   │       └── taglib/
│   │   │   │           ├── KdsButtonTagLib.groovy
│   │   │   │           ├── KdsTextFieldTagLib.groovy
│   │   │   │           ├── KdsCardTagLib.groovy
│   │   │   │           └── ...
│   │   │   └── resources/
│   │   │       ├── META-INF/
│   │   │       │   └── grails-plugin.xml
│   │   │       └── css/
│   │   │           ├── kds-tokens.css        # Copied from src/tokens/
│   │   │           └── kds-components.css    # Component styles
│   │   └── test/
│   │       └── groovy/
│   └── README.md
└── scripts/
    └── generate-grails-css.js       # Copy + optional generation
```

### 1.3 Component Architecture

**Pattern:** Each component = Taglib (.groovy) + CSS styling

```
Taglib (KdsButtonTagLib.groovy)
    ↓
Renders HTML with design system classes
    ↓
CSS (_button.css) applies tokens via CSS Variables
    ↓
No compilation needed - pure CSS
    ↓
Consumed by Grails app
```

---

## 2. Technical Specifications

### 2.1 Token Generation for Grails

**Strategy:** Copy existing `css-variables.css` from React

**Source:** `src/tokens/css-variables.css` (already exists)

**Destination:** `grails/src/main/resources/css/kds-tokens.css`

**Existing Format:**
```css
/* AUTO-GENERATED - DO NOT EDIT */
/* Source: design-system/src/tokens/index.ts */

:root {
  /* Colors - Primary */
  --kds-color-primary-main: #8347AD;
  --kds-color-primary-light: #9B6BB8;
  --kds-color-primary-dark: #6B3A8C;
  --kds-color-primary-contrast: #FFFFFF;

  /* Colors - Secondary */
  --kds-color-secondary-main: #9C27B0;
  --kds-color-secondary-light: #BA68C8;
  --kds-color-secondary-dark: #7B1FA2;
  --kds-color-secondary-contrast: #FFFFFF;

  /* Colors - Semantic */
  --kds-color-success-main: #4CAF50;
  --kds-color-error-main: #F44336;
  --kds-color-warning-main: #FF9800;
  --kds-color-info-main: #2196F3;

  /* Colors - Text */
  --kds-color-text-primary: rgba(0, 0, 0, 0.87);
  --kds-color-text-secondary: rgba(0, 0, 0, 0.6);
  --kds-color-text-disabled: rgba(0, 0, 0, 0.38);

  /* Colors - Background */
  --kds-color-background-default: #FFFFFF;
  --kds-color-background-paper: #FFFFFF;

  /* Colors - Action */
  --kds-color-action-disabled-bg: rgba(0, 0, 0, 0.12);
  --kds-color-border: rgba(0, 0, 0, 0.23);

  /* Spacing - Base Scale */
  --kds-spacing-0: 0px;
  --kds-spacing-1: 4px;
  --kds-spacing-2: 8px;
  --kds-spacing-3: 12px;
  --kds-spacing-4: 16px;
  --kds-spacing-5: 20px;
  --kds-spacing-6: 24px;
  --kds-spacing-8: 32px;
  --kds-spacing-10: 40px;
  --kds-spacing-12: 48px;

  /* Spacing - Semantic */
  --kds-spacing-button-x: 24px;
  --kds-spacing-button-y: 12px;
  --kds-spacing-card-padding-x: 20px;
  --kds-spacing-card-padding-y: 20px;

  /* Typography - Font Families */
  --kds-font-family-primary: "Public Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  --kds-font-family-secondary: "Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;

  /* Typography - Font Sizes */
  --kds-font-size-display1: 3.5rem;
  --kds-font-size-h1: 2.5rem;
  --kds-font-size-h2: 2rem;
  --kds-font-size-h3: 1.75rem;
  --kds-font-size-h4: 1.5rem;
  --kds-font-size-h5: 1.25rem;
  --kds-font-size-h6: 1rem;
  --kds-font-size-body: 1rem;
  --kds-font-size-body-large: 1.125rem;
  --kds-font-size-label: 0.875rem;

  /* Typography - Font Weights */
  --kds-font-weight-light: 300;
  --kds-font-weight-regular: 400;
  --kds-font-weight-medium: 500;
  --kds-font-weight-bold: 700;

  /* Typography - Line Heights */
  --kds-line-height-tight: 1.2;
  --kds-line-height-normal: 1.5;
  --kds-line-height-relaxed: 1.75;

  /* Border Radius */
  --kds-radius-button: 4px;
  --kds-radius-input: 4px;
  --kds-radius-card: 20px;
  --kds-radius-dialog: 8px;
  --kds-radius-chip: 16px;

  /* Transitions */
  --kds-transition-duration: 300ms;
  --kds-transition-easing: cubic-bezier(0.4, 0, 0.2, 1);

  /* Shadows */
  --kds-shadow-1: 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12);
  --kds-shadow-2: 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);
  --kds-shadow-3: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
  --kds-shadow-4: 0px 4px 5px -2px rgba(0,0,0,0.2), 0px 7px 10px 1px rgba(0,0,0,0.14), 0px 2px 16px 1px rgba(0,0,0,0.12);
}
```

**No conversion needed!** The file is ready to use as-is.

### 2.2 Component Styles with CSS Variables

**New File:** `grails/src/main/resources/css/kds-components.css`

**Pattern:** Use CSS Variables for all styling

```css
/* =============================================================================
   KDS BUTTON
   ============================================================================= */

.kds-button {
  /* Base styles using CSS Variables */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  padding: var(--kds-spacing-button-y) var(--kds-spacing-button-x);

  font-family: var(--kds-font-family-primary);
  font-size: var(--kds-font-size-body);
  font-weight: var(--kds-font-weight-medium);
  text-transform: uppercase;

  border: none;
  border-radius: var(--kds-radius-button);
  cursor: pointer;

  transition: all var(--kds-transition-duration) var(--kds-transition-easing);
  position: relative;
}

.kds-button__label {
  display: inline-block;
}

.kds-button__spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: kds-spin 0.6s linear infinite;
  margin-right: var(--kds-spacing-2);
}

/* Variants - Contained */
.kds-button--contained {
  box-shadow: var(--kds-shadow-2);
}

.kds-button--contained.kds-button--primary {
  background-color: var(--kds-color-primary-main);
  color: var(--kds-color-primary-contrast);
}

.kds-button--contained.kds-button--primary:hover:not([disabled]) {
  background-color: var(--kds-color-primary-dark);
  box-shadow: var(--kds-shadow-4);
}

.kds-button--contained.kds-button--secondary {
  background-color: var(--kds-color-secondary-main);
  color: var(--kds-color-secondary-contrast);
}

.kds-button--contained.kds-button--secondary:hover:not([disabled]) {
  background-color: var(--kds-color-secondary-dark);
  box-shadow: var(--kds-shadow-4);
}

.kds-button--contained.kds-button--success {
  background-color: var(--kds-color-success-main);
  color: #FFFFFF;
}

.kds-button--contained.kds-button--error {
  background-color: var(--kds-color-error-main);
  color: #FFFFFF;
}

/* Variants - Outlined */
.kds-button--outlined {
  background-color: transparent;
  border: 1px solid;
}

.kds-button--outlined.kds-button--primary {
  border-color: var(--kds-color-primary-main);
  color: var(--kds-color-primary-main);
}

.kds-button--outlined.kds-button--primary:hover:not([disabled]) {
  background-color: rgba(131, 71, 173, 0.04);
}

.kds-button--outlined.kds-button--secondary {
  border-color: var(--kds-color-secondary-main);
  color: var(--kds-color-secondary-main);
}

.kds-button--outlined.kds-button--secondary:hover:not([disabled]) {
  background-color: rgba(156, 39, 176, 0.04);
}

/* Variants - Text */
.kds-button--text {
  background-color: transparent;
  box-shadow: none;
  padding: var(--kds-spacing-2) var(--kds-spacing-3);
}

.kds-button--text.kds-button--primary {
  color: var(--kds-color-primary-main);
}

.kds-button--text.kds-button--primary:hover:not([disabled]) {
  background-color: rgba(131, 71, 173, 0.04);
}

/* Sizes */
.kds-button--small {
  min-height: 36px;
  padding: 4px 10px;
  font-size: 0.8125rem;
}

.kds-button--medium {
  min-height: 44px;
  padding: 8px 20px;
  font-size: 0.875rem;
}

.kds-button--large {
  min-height: 50px;
  padding: var(--kds-spacing-button-y) var(--kds-spacing-button-x);
  font-size: var(--kds-font-size-body);
}

/* States */
.kds-button--full-width {
  width: 100%;
}

.kds-button--disabled,
.kds-button[disabled] {
  cursor: not-allowed;
  opacity: 0.6;
  pointer-events: none;
}

.kds-button--loading {
  pointer-events: none;
}

@keyframes kds-spin {
  to { transform: rotate(360deg); }
}

/* =============================================================================
   KDS TEXTFIELD
   ============================================================================= */

.kds-textfield {
  display: flex;
  flex-direction: column;
  margin-bottom: var(--kds-spacing-4);
}

.kds-textfield__label {
  font-family: var(--kds-font-family-primary);
  font-size: var(--kds-font-size-label);
  font-weight: var(--kds-font-weight-medium);
  color: var(--kds-color-text-secondary);
  margin-bottom: 4px;
  transition: color var(--kds-transition-duration) var(--kds-transition-easing);
}

.kds-textfield__required {
  color: var(--kds-color-error-main);
}

.kds-textfield__input {
  padding: 12px var(--kds-spacing-3);
  border: 1px solid var(--kds-color-border);
  border-radius: var(--kds-radius-input);
  font-family: var(--kds-font-family-primary);
  font-size: var(--kds-font-size-body);
  color: var(--kds-color-text-primary);
  background-color: var(--kds-color-background-paper);
  transition: all var(--kds-transition-duration) var(--kds-transition-easing);
}

.kds-textfield__input:focus {
  outline: none;
  border-color: var(--kds-color-primary-main);
  box-shadow: 0 0 0 2px rgba(131, 71, 173, 0.1);
}

.kds-textfield--error .kds-textfield__input {
  border-color: var(--kds-color-error-main);
}

.kds-textfield--error .kds-textfield__input:focus {
  box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.1);
}

.kds-textfield--error .kds-textfield__label {
  color: var(--kds-color-error-main);
}

.kds-textfield__helper-text {
  font-size: 0.75rem;
  color: var(--kds-color-text-secondary);
  margin-top: 4px;
  min-height: 20px;
}

.kds-textfield__helper-text--error {
  color: var(--kds-color-error-main);
}

.kds-textfield--disabled .kds-textfield__input {
  opacity: 0.6;
  cursor: not-allowed;
  background-color: var(--kds-color-action-disabled-bg);
}

.kds-textfield__input[type="textarea"] {
  resize: vertical;
  min-height: 100px;
}

/* =============================================================================
   KDS CARD
   ============================================================================= */

.kds-card {
  border-radius: var(--kds-radius-card);
  padding: var(--kds-spacing-card-padding-y) var(--kds-spacing-card-padding-x);
  background-color: var(--kds-color-background-paper);
  transition: all var(--kds-transition-duration) var(--kds-transition-easing);
}

.kds-card--elevated {
  box-shadow: var(--kds-shadow-1);
}

.kds-card--outlined {
  border: 1px solid var(--kds-color-border);
}

.kds-card--filled {
  background-color: rgba(0, 0, 0, 0.03);
}

.kds-card--clickable {
  cursor: pointer;
}

.kds-card--clickable:hover {
  box-shadow: var(--kds-shadow-4);
  transform: translateY(-2px);
}

.kds-card--selected {
  border: 2px solid var(--kds-color-primary-main);
  padding: calc(var(--kds-spacing-card-padding-y) - 1px) calc(var(--kds-spacing-card-padding-x) - 1px);
}

.kds-card--error {
  border: 2px solid var(--kds-color-error-main);
  padding: calc(var(--kds-spacing-card-padding-y) - 1px) calc(var(--kds-spacing-card-padding-x) - 1px);
}

.kds-card__header {
  margin-bottom: var(--kds-spacing-3);
}

.kds-card__content {
  margin-bottom: var(--kds-spacing-3);
}

.kds-card__content:last-child {
  margin-bottom: 0;
}

.kds-card__actions {
  display: flex;
  gap: var(--kds-spacing-2);
  justify-content: flex-end;
  margin-top: var(--kds-spacing-3);
}
```

### 2.3 Taglib Implementation Pattern

**Template remains the same (Groovy code unchanged):**

```groovy
package com.khipu.designsystem.taglib

class KdsButtonTagLib {
    static namespace = 'kds'

    /**
     * Khipu Design System Button
     *
     * Attributes:
     * - variant: 'contained', 'outlined', 'text' (default: 'contained')
     * - color: 'primary', 'secondary', 'success', 'error', 'warning', 'info' (default: 'primary')
     * - size: 'small', 'medium', 'large' (default: 'large')
     * - fullWidth: true/false (default: false)
     * - disabled: true/false (default: false)
     * - loading: true/false (default: false)
     * - type: 'button', 'submit', 'reset' (default: 'button')
     * - onclick: JavaScript click handler
     * - class: Additional CSS classes
     * - id: Element ID
     *
     * Usage:
     * <kds:button variant="contained" color="primary">
     *   Submit Payment
     * </kds:button>
     */
    def button = { attrs, body ->
        def variant = attrs.remove('variant') ?: 'contained'
        def color = attrs.remove('color') ?: 'primary'
        def size = attrs.remove('size') ?: 'large'
        def fullWidth = attrs.remove('fullWidth') == 'true' || attrs.remove('fullWidth') == true
        def disabled = attrs.remove('disabled') == 'true' || attrs.remove('disabled') == true
        def loading = attrs.remove('loading') == 'true' || attrs.remove('loading') == true
        def type = attrs.remove('type') ?: 'button'

        def cssClasses = ['kds-button', "kds-button--${variant}", "kds-button--${color}", "kds-button--${size}"]

        if (fullWidth) cssClasses << 'kds-button--full-width'
        if (disabled || loading) cssClasses << 'kds-button--disabled'
        if (loading) cssClasses << 'kds-button--loading'
        if (attrs['class']) cssClasses << attrs.remove('class')

        def htmlAttrs = [
            type: type,
            class: cssClasses.join(' '),
            disabled: (disabled || loading) ? 'disabled' : null
        ]

        // Merge remaining attributes
        htmlAttrs.putAll(attrs)

        out << "<button ${attrsToHtml(htmlAttrs)}>"

        if (loading) {
            out << '<span class="kds-button__spinner"></span>'
        }

        out << "<span class=\"kds-button__label\">${body()}</span>"
        out << "</button>"
    }

    // Helper to convert map to HTML attributes
    private String attrsToHtml(Map attrs) {
        attrs.findAll { k, v -> v != null }
             .collect { k, v -> "${k}=\"${v.toString().encodeAsHTML()}\"" }
             .join(' ')
    }
}
```

### 2.4 Gradle Build Configuration

**Simplified - No SCSS compilation needed!**

```gradle
plugins {
    id 'groovy'
    id 'maven-publish'
}

group = 'com.khipu'
version = '0.1.0-alpha.1'

repositories {
    mavenCentral()
    mavenLocal()
}

dependencies {
    // Grails dependencies
    implementation 'org.grails:grails-core:2.5.4'
    implementation 'org.grails:grails-plugin-gsp:2.5.4'
    implementation 'org.codehaus.groovy:groovy-all:2.4.15'

    // Testing
    testImplementation 'org.spockframework:spock-core:1.3-groovy-2.4'
    testImplementation 'junit:junit:4.13.2'
}

// Copy CSS tokens from React
task copyTokensCSS(type: Copy) {
    description = 'Copy CSS Variables from React tokens'
    from '../src/tokens/css-variables.css'
    into 'src/main/resources/css'
    rename { 'kds-tokens.css' }
}

// Ensure CSS is copied before packaging
processResources.dependsOn copyTokensCSS

// Package as JAR
jar {
    archiveBaseName = 'design-system-grails'
    manifest {
        attributes(
            'Implementation-Title': 'Khipu Design System - Grails Plugin',
            'Implementation-Version': version
        )
    }
}

publishing {
    publications {
        maven(MavenPublication) {
            groupId = 'com.khipu'
            artifactId = 'design-system-grails'
            version = '0.1.0-alpha.1'

            from components.java

            pom {
                name = 'Khipu Design System - Grails Plugin'
                description = 'Khipu Design System taglibs and styles for Grails/GSP applications'
                url = 'https://github.com/khipu/design-system'

                licenses {
                    license {
                        name = 'Proprietary'
                        url = 'https://khipu.com'
                    }
                }

                developers {
                    developer {
                        id = 'khipu'
                        name = 'Khipu Team'
                        email = 'dev@khipu.com'
                    }
                }
            }
        }
    }

    repositories {
        mavenLocal()

        maven {
            name = 'CodeArtifact'
            url = uri(System.getenv('CODEARTIFACT_URL') ?: 'https://khipu-375783675928.d.codeartifact.us-east-1.amazonaws.com/maven/grails-packages/')
            credentials {
                username = 'aws'
                password = System.getenv('CODEARTIFACT_TOKEN') ?: ''
            }
        }
    }
}
```

### 2.5 Grails Plugin Descriptor

```xml
<plugin name="design-system" version="0.1.0-alpha.1">
    <author>Khipu Team</author>
    <title>Khipu Design System</title>
    <description>
        Khipu Design System taglibs and styles for Grails/GSP applications.
        Provides consistent UI components matching React and Android implementations.
        Uses pure CSS with CSS Variables (no preprocessor required).
    </description>
    <documentation>https://github.com/khipu/design-system/blob/main/docs/grails/README.md</documentation>

    <type>KhipuDesignSystemGrailsPlugin</type>

    <resources>
        <resource>com.khipu.designsystem.taglib.KdsButtonTagLib</resource>
        <resource>com.khipu.designsystem.taglib.KdsTextFieldTagLib</resource>
        <resource>com.khipu.designsystem.taglib.KdsCardTagLib</resource>
        <!-- ... other taglibs -->
    </resources>
</plugin>
```

---

## 3. Implementation Roadmap

### Phase 1: Foundation (Week 1-2)

#### 1.1 CSS Setup
**Priority:** CRITICAL
**Effort:** 3 hours (reduced from 8!)

**Tasks:**
1. Create Gradle task `copyTokensCSS`
2. Verify all CSS Variables are present
3. Create `kds-components.css` with base styles (Button, TextField, Card)
4. Test CSS locally in simple HTML file

**Deliverables:**
- `grails/src/main/resources/css/kds-tokens.css` (copied)
- `grails/src/main/resources/css/kds-components.css` (created)
- Gradle `copyTokensCSS` task working

**Acceptance Criteria:**
- [ ] CSS Variables match React tokens 1:1
- [ ] No SCSS/LESS dependencies required
- [ ] `./gradlew build` includes CSS in JAR
- [ ] CSS files are < 50KB combined

#### 1.2 Gradle Build Setup
**Priority:** CRITICAL
**Effort:** 4 hours (reduced from 6!)

**Tasks:**
1. Create `grails/build.gradle` (simplified, no SASS)
2. Configure Groovy compilation
3. Setup Maven publishing
4. Test local build

**Deliverables:**
- `grails/build.gradle`
- `grails/settings.gradle`
- `grails/gradle.properties`

**Acceptance Criteria:**
- [ ] `./gradlew build` compiles Groovy taglibs
- [ ] CSS copied automatically during build
- [ ] JAR includes taglibs + CSS
- [ ] `./gradlew publishToMavenLocal` works

#### 1.3 AWS CodeArtifact Configuration
**Priority:** HIGH
**Effort:** 4 hours

**Tasks:**
1. Create CodeArtifact repository: `grails-packages`
2. Configure AWS credentials script
3. Test publishing to CodeArtifact
4. Document authentication flow

**Deliverables:**
- `~/scripts/khipu-codeartifact-grails.sh`
- Updated `grails/build.gradle` with CodeArtifact config
- Documentation in `docs/grails/PUBLISHING.md`

**Acceptance Criteria:**
- [ ] Repository created in AWS CodeArtifact
- [ ] Script generates valid auth token
- [ ] `./gradlew publish` uploads to CodeArtifact
- [ ] Published artifact is downloadable

**Phase 1 Total:** 11 hours (was 18 hours with SCSS!)

---

### Phase 2: Core Components (Week 3-4)

#### 2.1 Button Component
**Priority:** CRITICAL
**Effort:** 10 hours

**Files:**
- `KdsButtonTagLib.groovy`
- CSS already in `kds-components.css`
- `KdsButtonTagLibSpec.groovy`

**Requirements:**
- Variants: contained, outlined, text
- Colors: primary, secondary, success, error, warning, info
- Sizes: small, medium, large
- States: disabled, loading
- Full-width option

**Usage Example:**
```gsp
<kds:button variant="contained" color="primary" size="large">
    PAGAR AHORA
</kds:button>

<kds:button variant="outlined" color="info" loading="true">
    Processing...
</kds:button>
```

**Acceptance Criteria:**
- [ ] All variants render correctly
- [ ] All colors use CSS Variables
- [ ] Loading state shows spinner
- [ ] Disabled state prevents clicks
- [ ] Passes Spock unit tests

#### 2.2 TextField Component
**Priority:** CRITICAL
**Effort:** 12 hours

**Files:**
- `KdsTextFieldTagLib.groovy`
- CSS already in `kds-components.css`
- `KdsTextFieldTagLibSpec.groovy`

**Requirements:**
- Label (always visible, no floating needed)
- Helper text
- Error state with error message
- Disabled state
- Multiline (textarea) support
- Character counter (optional)
- Required indicator

**Usage Example:**
```gsp
<kds:textField
    name="email"
    label="Email"
    value="${user?.email}"
    error="${errors.hasFieldErrors('email')}"
    helperText="${errors.getFieldError('email')?.defaultMessage ?: 'Ingresa tu email'}">
</kds:textField>

<kds:textField
    name="description"
    label="Descripción"
    multiline="true"
    rows="4"
    maxlength="200"
    showCounter="true">
</kds:textField>
```

**Acceptance Criteria:**
- [ ] Label always visible (no floating animation needed)
- [ ] Error state shows red border + message
- [ ] Helper text displays below input
- [ ] Multiline creates textarea
- [ ] Character counter accurate
- [ ] Integrates with Grails validation

#### 2.3 Card Component
**Priority:** HIGH
**Effort:** 8 hours

**Files:**
- `KdsCardTagLib.groovy`
- CSS already in `kds-components.css`
- `KdsCardTagLibSpec.groovy`

**Requirements:**
- Variants: elevated, outlined, filled
- Selection state (2px border)
- Error state
- Clickable/non-clickable modes
- Header/Content/Actions sections

**Usage Example:**
```gsp
<kds:card variant="outlined" selected="${selectedBank == bank.id}" onclick="selectBank(${bank.id})">
    <kds:cardHeader>
        <img src="${bank.logo}" alt="${bank.name}">
    </kds:cardHeader>
    <kds:cardContent>
        <h3>${bank.name}</h3>
        <p>${bank.description}</p>
    </kds:cardContent>
</kds:card>
```

**Acceptance Criteria:**
- [ ] All variants use CSS Variables
- [ ] Selected state shows 2px purple border
- [ ] Clickable cards have hover effect
- [ ] Sections have correct spacing

---

### Phase 3: Form Components (Week 5)

#### 3.1 Checkbox Component
**Priority:** HIGH
**Effort:** 6 hours

**Requirements:**
- Checked/unchecked states
- Disabled state
- Label with text wrapping
- Error state

**Usage Example:**
```gsp
<kds:checkbox
    name="acceptTerms"
    label="Acepto los términos y condiciones de uso"
    checked="${params.acceptTerms}"
    required="true"
    error="${errors.hasFieldErrors('acceptTerms')}">
</kds:checkbox>
```

#### 3.2 Typography Component
**Priority:** HIGH
**Effort:** 4 hours

**Requirements:**
- Variants: h1-h6, body, bodyLarge, label, caption
- Color options via CSS Variables
- Alignment options

**Usage Example:**
```gsp
<kds:typography variant="h4" color="primary">
    Detalles del Pago
</kds:typography>

<kds:typography variant="body">
    Por favor revisa la información antes de confirmar.
</kds:typography>
```

#### 3.3 Alert Component
**Priority:** HIGH
**Effort:** 5 hours

**Requirements:**
- Severities: success, warning, error, info
- Icon support
- Dismissible option

**Usage Example:**
```gsp
<kds:alert severity="error" title="Error de Pago">
    ${flash.error}
</kds:alert>

<kds:alert severity="success" dismissible="true">
    ¡Pago procesado exitosamente!
</kds:alert>
```

---

### Phase 4: Advanced Components (Week 6)

#### 4.1 Modal/Dialog Component
**Priority:** MEDIUM
**Effort:** 10 hours

**Requirements:**
- Open/close state
- Header/Content/Footer sections
- Backdrop click to close
- ESC key handler
- Max width options

**Usage Example:**
```gsp
<kds:modal id="confirmPayment" title="Confirmar Pago" maxWidth="450px">
    <kds:modalContent>
        <p>¿Estás seguro que deseas proceder con este pago?</p>
    </kds:modalContent>
    <kds:modalActions>
        <kds:button variant="text" onclick="closeModal('confirmPayment')">
            Cancelar
        </kds:button>
        <kds:button variant="contained" color="primary" onclick="submitPayment()">
            Confirmar
        </kds:button>
    </kds:modalActions>
</kds:modal>
```

#### 4.2 Tabs Component
**Priority:** MEDIUM
**Effort:** 8 hours

#### 4.3 Progress Components
**Priority:** LOW
**Effort:** 4 hours

---

### Phase 5: Documentation & Migration (Week 7-8)

#### 5.1 Component Documentation
**Priority:** HIGH
**Effort:** 12 hours

**Deliverables:**
- `docs/grails/README.md`
- `docs/grails/COMPONENT_API.md`
- `docs/grails/USAGE_GUIDE.md`
- `docs/grails/PUBLISHING.md`

#### 5.2 Migration Guide for Payment Project
**Priority:** CRITICAL
**Effort:** 10 hours

**Sections:**

1. **Installation**
```groovy
// BuildConfig.groovy
grails.project.dependency.resolution = {
    repositories {
        mavenLocal()
        maven {
            url "https://khipu-375783675928.d.codeartifact.us-east-1.amazonaws.com/maven/grails-packages/"
            credentials {
                username = "aws"
                password = System.getenv('CODEARTIFACT_TOKEN')
            }
        }
    }
    dependencies {
        compile 'com.khipu:design-system-grails:0.1.0-alpha.1'
    }
}
```

2. **CSS Integration**
```gsp
<!-- grails-app/views/layouts/main.gsp -->
<head>
    <!-- Khipu Design System CSS -->
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'kds-tokens.css')}"/>
    <link rel="stylesheet" href="${resource(dir: 'css', file: 'kds-components.css')}"/>
</head>
```

3. **Component Migration Patterns**

**Before (Bootstrap):**
```gsp
<g:submitButton name="submit" class="btn btn-primary btn-lg"
    value="PAGAR AHORA"/>
```

**After (Design System):**
```gsp
<kds:button type="submit" variant="contained" color="primary" size="large">
    PAGAR AHORA
</kds:button>
```

**Before (Bootstrap Form):**
```gsp
<div class="form-group ${hasErrors(bean: user, field: 'email', 'has-error')}">
    <label for="email">Email:</label>
    <g:textField name="email" class="form-control" value="${user?.email}"/>
    <g:hasErrors bean="${user}" field="email">
        <span class="help-block"><g:message error="${error}"/></span>
    </g:hasErrors>
</div>
```

**After (Design System):**
```gsp
<kds:textField
    name="email"
    label="Email"
    value="${user?.email}"
    error="${hasErrors(bean: user, field: 'email')}"
    helperText="${g.fieldError(bean: user, field: 'email')}">
</kds:textField>
```

4. **Incremental Migration Strategy**
- Phase 1: Add design system CSS (co-exists with Bootstrap)
- Phase 2: Migrate buttons and alerts
- Phase 3: Migrate forms page by page
- Phase 4: Migrate cards and layouts
- Phase 5: Remove Bootstrap dependencies

#### 5.3 Testing Suite
**Priority:** HIGH
**Effort:** 8 hours

**Example Test:**
```groovy
package com.khipu.designsystem.taglib

import grails.test.mixin.TestFor
import spock.lang.Specification

@TestFor(KdsButtonTagLib)
class KdsButtonTagLibSpec extends Specification {

    void "test button renders with default attributes"() {
        when:
        def result = applyTemplate('<kds:button>Click me</kds:button>')

        then:
        result.contains('class="kds-button kds-button--contained kds-button--primary kds-button--large"')
        result.contains('type="button"')
        result.contains('<span class="kds-button__label">Click me</span>')
    }

    void "test button with all custom attributes"() {
        when:
        def result = applyTemplate('<kds:button variant="outlined" color="secondary" size="small">Cancel</kds:button>')

        then:
        result.contains('kds-button--outlined')
        result.contains('kds-button--secondary')
        result.contains('kds-button--small')
        result.contains('Cancel')
    }

    void "test button loading state"() {
        when:
        def result = applyTemplate('<kds:button loading="true">Submit</kds:button>')

        then:
        result.contains('kds-button--loading')
        result.contains('kds-button__spinner')
        result.contains('disabled="disabled"')
    }

    void "test button full width"() {
        when:
        def result = applyTemplate('<kds:button fullWidth="true">Expand</kds:button>')

        then:
        result.contains('kds-button--full-width')
    }
}
```

---

## 4. Build & Publishing

### 4.1 NPM Scripts

**Update `package.json`:**

```json
{
  "scripts": {
    "tokens:generate": "npm run build && npm run tokens:export && node scripts/generate-css-variables.js && node scripts/generate-tokens.js --kotlin-output=android/designsystem/src/main/java/com/khipu/designsystem/tokens/KdsTokens.kt",

    "grails:build": "cd grails && ./gradlew build",
    "grails:publish-local": "cd grails && ./gradlew publishToMavenLocal",
    "grails:publish": "cd grails && ./gradlew publish",
    "grails:clean": "cd grails && ./gradlew clean",
    "grails:test": "cd grails && ./gradlew test"
  }
}
```

**Note:** No separate `generate-grails-css.js` script needed! The Gradle `copyTokensCSS` task handles it.

### 4.2 Version Management

**Synchronized versions across platforms:**

1. **Web:** `package.json` → `version: "0.1.0-alpha.8"`
2. **Android:** `android/designsystem/build.gradle.kts` → `libraryVersion = "0.1.0-alpha.8"`
3. **Grails:** `grails/build.gradle` → `version = '0.1.0-alpha.8'`

**Script to sync versions:** `scripts/bump-version.sh`

```bash
#!/bin/bash
VERSION=$1

if [ -z "$VERSION" ]; then
  echo "Usage: ./scripts/bump-version.sh 0.1.0-alpha.9"
  exit 1
fi

# Update package.json
sed -i '' "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json

# Update Android
sed -i '' "s/val libraryVersion = \".*\"/val libraryVersion = \"$VERSION\"/" android/designsystem/build.gradle.kts

# Update Grails
sed -i '' "s/version = '.*'/version = '$VERSION'/" grails/build.gradle

echo "✅ Version bumped to $VERSION across all platforms"
```

### 4.3 Publishing Workflow

**Manual:**
```bash
# 1. Authenticate
source ~/scripts/khipu-codeartifact.sh

# 2. Build all platforms
npm run build
npm run android:build
npm run grails:build

# 3. Publish
npm publish
npm run android:publish
npm run grails:publish
```

**Automated (Bitbucket Pipeline):**

```yaml
pipelines:
  branches:
    main:
      - step:
          name: Build & Publish Design System
          script:
            # ... existing steps for React/Android ...

            # Build Grails plugin (no SCSS compilation!)
            - cd grails
            - chmod +x gradlew
            - ./gradlew build

            # Configure AWS credentials
            - export CODEARTIFACT_TOKEN=$(aws codeartifact get-authorization-token --domain khipu --domain-owner $AWS_ACCOUNT_ID --region us-east-1 --query authorizationToken --output text)
            - export CODEARTIFACT_URL=https://khipu-$AWS_ACCOUNT_ID.d.codeartifact.us-east-1.amazonaws.com/maven/grails-packages/

            # Publish to CodeArtifact
            - ./gradlew publish
```

---

## 5. Testing Strategy

### 5.1 Unit Testing

**Framework:** Spock (Groovy testing framework)

**Test Coverage Requirements:**
- Taglib rendering: 100%
- Attribute handling: 100%
- Error states: 100%
- Edge cases: 90%+

### 5.2 Integration Testing

**Test in Payment Project:**

1. Create test branch in `payment` project
2. Install design system from Maven Local
3. Create test pages for all components
4. Visual comparison with Figma designs
5. Browser compatibility testing (Chrome, Firefox, Safari)

### 5.3 Visual Regression Testing (Optional)

**Tools:**
- BackstopJS for screenshot comparison
- Simple HTML test harness

---

## 6. Known Challenges & Solutions

### 6.1 Grails 2.5.4 Compatibility

**Challenge:** Old Grails version (2015)

**Solution:**
- Use compatible Groovy version (2.4.15)
- Avoid modern Java features
- Test extensively with payment project
- CSS Variables work in all modern browsers (IE11+ support if needed)

### 6.2 CSS Variable Browser Support

**Challenge:** Need IE11 support?

**Solution:**
- CSS Variables work in: Chrome 49+, Firefox 31+, Safari 9.1+, Edge 15+
- For IE11, provide fallback values:
  ```css
  .kds-button {
    background-color: #8347AD; /* Fallback */
    background-color: var(--kds-color-primary-main); /* Modern */
  }
  ```
- Or include PostCSS processing to generate fallbacks

### 6.3 Token Synchronization

**Challenge:** Keeping Grails tokens in sync with React/Android

**Solution:**
- ✅ **Already solved!** Gradle copies `css-variables.css` automatically
- Single source of truth: `src/tokens/index.ts`
- Automated sync via Gradle `copyTokensCSS` task
- CI/CD checks verify sync

### 6.4 No Mixins in Pure CSS

**Challenge:** Can't reuse style blocks like SCSS mixins

**Solution:**
- Use CSS classes as "mixins" (utility classes)
- Accept some repetition for simplicity
- Could use PostCSS mixins plugin if needed later
- Trade-off: Simplicity > DRY

---

## 7. Success Metrics

### 7.1 Technical Metrics

- [ ] All 12 components implemented
- [ ] 100% token parity with React/Android
- [ ] 90%+ unit test coverage
- [ ] Zero console errors in test environment
- [ ] CSS bundle < 50KB (minified + gzipped)
- [ ] Taglib JAR < 200KB
- [ ] Build time < 10 seconds (vs 30s with SCSS)

### 7.2 Developer Experience Metrics

- [ ] Installation: < 5 minutes
- [ ] First component usage: < 10 minutes
- [ ] Migration of single form: < 30 minutes
- [ ] Build time: < 10 seconds
- [ ] Documentation completeness: 100%

### 7.3 Adoption Metrics

- [ ] 5+ forms migrated in payment project
- [ ] 20+ button replacements
- [ ] 10+ card implementations
- [ ] Zero visual regressions reported
- [ ] Positive developer feedback

---

## 8. Timeline Summary

| Phase | Duration | Key Deliverables |
|-------|----------|------------------|
| **Phase 1: Foundation** | Week 1-2 | CSS setup (copy tokens), Gradle build, CodeArtifact |
| **Phase 2: Core Components** | Week 3-4 | Button, TextField, Card |
| **Phase 3: Form Components** | Week 5 | Checkbox, Typography, Alert |
| **Phase 4: Advanced** | Week 6 | Modal, Tabs, Progress |
| **Phase 5: Documentation** | Week 7-8 | Docs, migration guide, testing |

**Total:** 6-8 weeks (30-40 working days)

**Reduction from original:** ~1 week saved by eliminating SCSS compilation!

---

## 9. Advantages of CSS Variables Approach

### 9.1 Simplicity

- ✅ No build-time compilation
- ✅ No SASS/LESS dependencies
- ✅ Faster builds (~10s vs ~30s)
- ✅ Easier debugging (inspect CSS Variables in DevTools)

### 9.2 Token Parity

- ✅ Uses same `css-variables.css` as React
- ✅ Guaranteed 1:1 token sync
- ✅ Automatic updates when tokens change

### 9.3 Runtime Theming (Bonus Feature)

```javascript
// Can change theme dynamically if needed
document.documentElement.style.setProperty('--kds-color-primary-main', '#FF5722');
```

### 9.4 Modern Browser Support

- ✅ Chrome 49+ (2016)
- ✅ Firefox 31+ (2014)
- ✅ Safari 9.1+ (2016)
- ✅ Edge 15+ (2017)

**For IE11:** Can add PostCSS fallbacks if needed

---

## 10. Future Enhancements

### Post-MVP Features

1. **Additional Components**
   - Dropdown/Select
   - DatePicker
   - Autocomplete
   - Pagination
   - Breadcrumbs

2. **Theming Support**
   - Dark mode (CSS Variables make this trivial!)
   - Custom color schemes
   - Brand overrides

3. **Accessibility**
   - ARIA attributes
   - Keyboard navigation
   - Screen reader testing
   - WCAG 2.1 AA compliance

4. **Performance**
   - Minified CSS
   - Critical CSS extraction
   - CDN hosting

5. **Developer Tools**
   - GSP snippets for IDEs
   - Component playground

---

## 11. Resources & References

### External Documentation

- [Grails 2.5.4 Documentation](https://grails.github.io/grails2-doc/2.5.4/)
- [Groovy 2.4 Documentation](https://groovy-lang.org/documentation.html)
- [Spock Framework](https://spockframework.org/)
- [Gradle 7.x Documentation](https://docs.gradle.org/7.6/userguide/userguide.html)
- [AWS CodeArtifact - Maven](https://docs.aws.amazon.com/codeartifact/latest/ug/maven-mvn.html)
- [CSS Variables (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)

### Internal Documentation

- `docs/android/ANDROID_IMPLEMENTATION_PLAN.md` - Similar structure
- `docs/CI_CD_SETUP.md` - CodeArtifact setup
- `CLAUDE.md` - Project overview
- `src/tokens/css-variables.css` - Existing CSS Variables

### Design References

- Figma: "Pagos Automáticos - MUI v610"
- Material Design 3 Guidelines
- Existing React components in `src/components/core/`

---

## 12. Critical Files for Implementation

Based on this plan, here are the 5 most critical files:

1. **`grails/build.gradle`** - Build configuration with `copyTokensCSS` task
2. **`grails/src/main/resources/css/kds-components.css`** - Component styles using CSS Variables
3. **`grails/src/main/groovy/com/khipu/designsystem/taglib/KdsButtonTagLib.groovy`** - Button taglib (pattern for all components)
4. **`src/tokens/css-variables.css`** - Token source (already exists!)
5. **`grails/src/main/resources/META-INF/grails-plugin.xml`** - Plugin descriptor

These files establish the core patterns that all other components will follow.

---

## Appendix: CSS Variables Benefits Summary

| Feature | SCSS | CSS Variables |
|---------|------|---------------|
| **Compilation** | Required | None |
| **Build Time** | ~30s | ~10s |
| **Browser Support** | All (compiled) | Modern (IE11 with fallbacks) |
| **Runtime Theming** | No | Yes |
| **Debugging** | Source maps | Native DevTools |
| **Dependencies** | dart-sass/node-sass | None |
| **Learning Curve** | SCSS syntax | Standard CSS |
| **Token Sync** | Generate SCSS | Copy CSS file |
| **Mixins** | Yes | No (use classes) |
| **Already Exists** | No | Yes! ✅ |

**Recommendation:** CSS Variables is the clear winner for this use case.
