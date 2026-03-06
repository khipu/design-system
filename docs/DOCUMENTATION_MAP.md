# Documentation Map - Visual Guide

Mapa visual de toda la documentación del Design System de Khipu.

---

## 📁 Estructura Organizada

```
design-system/
│
├── 📘 CLAUDE.md                          ⭐ MAIN - Guía para Claude Code
│   ├── React development guide
│   ├── Android development guide
│   └── Custom prompts for AI assistance
│
├── 📗 README.md                          User-facing documentation
│
├── 📋 docs/                              📍 ALL DOCUMENTATION HERE
│   │
│   ├── 📄 README.md                      ⭐ START - Documentation index
│   │   ├── Quick start by role
│   │   ├── Search by platform/task/audience
│   │   ├── Project status dashboard
│   │   └── Use case guides
│   │
│   ├── 📄 DOCUMENTATION_MAP.md           This file (visual structure)
│   │
│   ├── 📱 android/                       Android docs (Jetpack Compose)
│   │   ├── ANDROID_SUMMARY.md            Executive summary (8% complete)
│   │   └── ANDROID_IMPLEMENTATION_PLAN.md Complete 6-week roadmap
│   │
│   ├── 🎨 design/                        Design & planning
│   │   ├── DESIGN_SYSTEM_ANALYSIS.md     System analysis
│   │   └── DESIGN_SYSTEM_PLAN.md         Design plan
│   │
│   ├── 💻 development/                   Development guides
│   │   └── PAINFUL_PATTERNS.md           Anti-patterns to avoid
│   │
│   ├── 🚀 deployment/                    Deployment & release
│   │   └── DEPLOYMENT-PLAN.md            AWS CodeArtifact setup
│   │
│   ├── 🌍 multi-platform/                Multi-platform strategy
│   │   ├── MULTI_PLATFORM_ACTION_PLAN.md Action plan
│   │   └── MULTI-PLATFORM-PLAN.md        Platform plan v2
│   │
│   ├── 📊 project/                       Project management
│   │   └── BACKLOG.md                    Tasks & priorities
│   │
│   ├── 🎨 COMPARACION-FIGMA-VS-CODIGO.md Figma comparison
│   └── 🎨 CREAR-EJEMPLOS-DESDE-FIGMA.md   Figma examples
│
├── 📱 android/                            Android library (Kotlin/Compose)
│   ├── 📘 USAGE_GUIDE.md                  Consumer API reference
│   ├── ⚡ QUICK_START.md                  5-minute setup guide
│   ├── 📗 README.md                       Technical overview
│   └── designsystem/                      Library source code
│       └── src/main/java/com/khipu/designsystem/
│           ├── tokens/KdsTokens.kt        Design tokens
│           ├── theme/Theme.kt             Material 3 theme
│           └── components/                Components (1/12 done)
│               └── KdsButton.kt           ✅ Implemented
│
└── 🎨 src/                                React library (TypeScript)
    ├── tokens/index.ts                    Design tokens (source of truth)
    ├── theme/index.ts                     MUI theme
    └── components/core/                   12 components (100%)
```

---

## 🎯 Quick Access by Role

### 👨‍💻 For Developers (React)
```
1. START:    CLAUDE.md (React sections)
2. Tokens:   src/tokens/index.ts
3. Anti-patterns: docs/development/PAINFUL_PATTERNS.md
4. Index:    docs/README.md
```

### 👩‍💻 For Developers (Android)
```
1. START:    docs/android/ANDROID_SUMMARY.md
2. Roadmap:  docs/android/ANDROID_IMPLEMENTATION_PLAN.md
3. Prompts:  CLAUDE.md (Android section)
4. Index:    docs/README.md
```

### 📱 For App Developers (Consuming library)
```
1. START:    android/QUICK_START.md (5 minutes)
2. Details:  android/USAGE_GUIDE.md (API reference)
3. Help:     docs/README.md → FAQ links
```

### 👔 For Product Managers / Tech Leads
```
1. START:    docs/android/ANDROID_SUMMARY.md
2. Status:   docs/README.md → Project Status
3. Timeline: docs/android/ANDROID_IMPLEMENTATION_PLAN.md
4. Strategy: docs/multi-platform/MULTI_PLATFORM_ACTION_PLAN.md
```

### 🎨 For Designers
```
1. START:    docs/COMPARACION-FIGMA-VS-CODIGO.md
2. Examples: docs/CREAR-EJEMPLOS-DESDE-FIGMA.md
3. Tokens:   src/tokens/index.ts (implementation)
4. Figma:    CLAUDE.md → Figma Integration section
```

---

## 📊 Documentation by Category

### 🏁 Getting Started
| Document | Purpose | Time |
|----------|---------|------|
| `docs/README.md` | Main hub, all links | 2 min |
| `android/QUICK_START.md` | Android setup | 5 min |
| `CLAUDE.md` | Development guide | 15 min |

### 📱 Platform-Specific
| Platform | Summary | Implementation | Usage |
|----------|---------|----------------|-------|
| **React** | `README.md` | `CLAUDE.md` | - |
| **Android** | `docs/android/ANDROID_SUMMARY.md` | `docs/android/ANDROID_IMPLEMENTATION_PLAN.md` | `android/USAGE_GUIDE.md` |

### 🎨 Design & Planning
| Document | Focus |
|----------|-------|
| `docs/design/DESIGN_SYSTEM_ANALYSIS.md` | System analysis |
| `docs/design/DESIGN_SYSTEM_PLAN.md` | Design plan |
| `docs/COMPARACION-FIGMA-VS-CODIGO.md` | Figma comparison |
| `docs/CREAR-EJEMPLOS-DESDE-FIGMA.md` | Figma examples |

### 💻 Development
| Document | Focus |
|----------|-------|
| `CLAUDE.md` | AI-assisted development |
| `docs/development/PAINFUL_PATTERNS.md` | Anti-patterns |

### 🚀 Infrastructure
| Document | Focus |
|----------|-------|
| `docs/deployment/DEPLOYMENT-PLAN.md` | AWS CodeArtifact |
| `docs/multi-platform/MULTI_PLATFORM_ACTION_PLAN.md` | Multi-platform strategy |

### 📊 Project Management
| Document | Focus |
|----------|-------|
| `docs/project/BACKLOG.md` | Task tracking |
| `docs/README.md` | Status dashboard |

---

## 🔄 Information Flow

### Tokens Update Flow
```
Figma Design
    ↓
src/tokens/index.ts (manual update)
    ↓
    ├→ React: src/theme/index.ts
    │         src/tokens/css-variables.css
    │
    └→ Android: android/designsystem/.../tokens/KdsTokens.kt
                (generated/manual sync)
```

### Documentation Update Flow
```
Change Type                   Update These Files
───────────────────────────   ──────────────────────────────────────
Tokens updated               → CLAUDE.md (tokens section)
New React component          → CLAUDE.md, docs/README.md
New Android component        → docs/android/ANDROID_SUMMARY.md
                              docs/android/ANDROID_IMPLEMENTATION_PLAN.md
                              android/USAGE_GUIDE.md
                              CLAUDE.md
Architecture change          → CLAUDE.md (architecture section)
                              docs/android/ANDROID_IMPLEMENTATION_PLAN.md
Deployment change            → docs/deployment/DEPLOYMENT-PLAN.md
                              docs/android/ANDROID_IMPLEMENTATION_PLAN.md
                              android/USAGE_GUIDE.md
New platform (iOS)           → Create docs/ios/
                              Update docs/README.md
                              Update CLAUDE.md
```

---

## 🔍 Finding Information

### By Question

| Question | Start Here |
|----------|------------|
| "How do I implement X in React?" | `CLAUDE.md` → Component patterns |
| "How do I implement X in Android?" | `docs/android/ANDROID_IMPLEMENTATION_PLAN.md` |
| "How do I use the library in my app?" | `android/QUICK_START.md` |
| "What's the project status?" | `docs/README.md` → Status table |
| "How do I publish?" | `docs/deployment/DEPLOYMENT-PLAN.md` |
| "What are common mistakes?" | `docs/development/PAINFUL_PATTERNS.md` |
| "How does X compare to Figma?" | `docs/COMPARACION-FIGMA-VS-CODIGO.md` |

### By File Type

| Looking for... | Location |
|----------------|----------|
| Executive summaries | `docs/android/ANDROID_SUMMARY.md` |
| Technical roadmaps | `docs/android/ANDROID_IMPLEMENTATION_PLAN.md` |
| API references | `android/USAGE_GUIDE.md` |
| Quick guides | `android/QUICK_START.md` |
| Architecture | `CLAUDE.md` |
| Code examples | `android/USAGE_GUIDE.md`, `CLAUDE.md` |

---

## 📈 Documentation Health

### Coverage
- ✅ React: 100% documented
- ✅ Android: 100% documented (implementation 8%)
- ❌ iOS: 0% (not yet started)

### Currency (Last Updated)
- ✅ Core docs (CLAUDE.md, docs/README.md): 2026-02-09
- ✅ Android docs: 2026-02-09
- ⚠️ React examples: May need refresh

### Organization
- ✅ All docs in `docs/` directory
- ✅ Clear categorization by topic
- ✅ Platform-specific subdirectories
- ✅ Central index (docs/README.md)
- ✅ Visual map (this file)

---

## 🆕 Adding New Documentation

### For New Component

**React:**
1. Implement in `src/components/core/[Name]/`
2. Update `CLAUDE.md` → Component list
3. Update `docs/README.md` → Status table

**Android:**
1. Implement in `android/designsystem/.../components/`
2. Update `docs/android/ANDROID_SUMMARY.md` → Progress %
3. Update `docs/android/ANDROID_IMPLEMENTATION_PLAN.md` → Checklist
4. Update `android/USAGE_GUIDE.md` → API section
5. Update `CLAUDE.md` → Android components

### For New Platform (e.g., iOS)

1. Create directory structure:
   ```
   docs/ios/
   ├── IOS_SUMMARY.md
   └── IOS_IMPLEMENTATION_PLAN.md

   ios/
   ├── USAGE_GUIDE.md
   └── QUICK_START.md
   ```

2. Update central docs:
   - `docs/README.md` → Add iOS section
   - `CLAUDE.md` → Add iOS section
   - `docs/DOCUMENTATION_MAP.md` → Update structure

### For New Guide

1. Determine category:
   - Design → `docs/design/`
   - Development → `docs/development/`
   - Deployment → `docs/deployment/`
   - Project → `docs/project/`
   - Multi-platform → `docs/multi-platform/`

2. Create file with standard structure:
   - Title + brief description
   - Quick links / TL;DR
   - Detailed content
   - Examples
   - Troubleshooting
   - References

3. Add to index:
   - `docs/README.md` → Appropriate section
   - `docs/DOCUMENTATION_MAP.md` → Update structure

---

## 🎨 Style Conventions

### File Naming
- Root docs: `CLAUDE.md`, `README.md`
- Subdirectory docs: `ANDROID_SUMMARY.md`, `DEPLOYMENT-PLAN.md`
- Platform-specific: `android/USAGE_GUIDE.md`

### Document Structure
```markdown
# Title

Brief description

---

## Section 1 (with emoji)
Content...

## Section 2
Content...

---

**Last Updated:** YYYY-MM-DD
**Maintained by:** Team Name
```

### Emoji Usage
- 📘 Main guides
- 📗 User-facing
- 📄 Index/reference
- 📋 Lists/tables
- 🎨 Design
- 📱 Platform-specific
- 🚀 Deployment
- 💻 Development
- 🌍 Multi-platform
- 📊 Project management
- ⭐ Important/featured
- 📍 Starting point

---

## ✅ Maintenance Checklist

When making significant changes:

- [ ] Updated affected documentation files
- [ ] Updated `docs/README.md` if new docs added
- [ ] Updated `docs/DOCUMENTATION_MAP.md` if structure changed
- [ ] Updated `CLAUDE.md` if development patterns changed
- [ ] Verified all internal links work
- [ ] Updated "Last Updated" dates
- [ ] Checked code examples are current
- [ ] Updated status tables if progress made

---

## 📊 Quick Stats

| Category | Files | Status |
|----------|-------|--------|
| Main guides | 2 | ✅ Complete |
| Android docs | 5 | ✅ Complete |
| Design docs | 4 | ✅ Complete |
| Development docs | 1 | ✅ Complete |
| Deployment docs | 1 | ✅ Complete |
| Multi-platform docs | 2 | ✅ Complete |
| Project docs | 1 | ✅ Complete |
| **Total** | **16** | **✅ 100%** |

---

**Last Updated:** 2026-02-09
**Maintained by:** Design System Team

For the main documentation index, see: [`README.md`](README.md)
