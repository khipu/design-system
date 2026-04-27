# Khipu BeerCSS Bundle

> Material Design 3 implementation for Khipu payment platform with BeerCSS

This bundle combines [BeerCSS](https://www.beercss.com/) (a lightweight Material Design 3 CSS framework) with Khipu Design System tokens and custom components into a single, versioned package.

📘 **[Components Usage Guide →](./COMPONENTS_GUIDE.md)** - Guía completa de uso de componentes avanzados (Modal de bancos, Sticky headers, etc.)

## What's Included

- **BeerCSS v4.0.1** - Base Material Design 3 CSS framework
- **Material Dynamic Colors v1.1.2** - Dynamic color theming
- **Khipu Design System Tokens** - Brand colors (purple primary, green secondary)
- **Khipu Custom Components** - Elevated cards, hero sections, spacing utilities
- **Khipu Initialization** - Sidenav, snackbars, modals with vanilla JavaScript

## Quick Start

### Via CDN (Recommended for Grails apps)

Add these two lines to your HTML `<head>`:

```html
<!-- Khipu BeerCSS Bundle - CSS -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@khipu/design-system@latest/dist/beercss/khipu-beercss.min.css">

<!-- Material Symbols Icons (Google Fonts) -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200">
```

And before the closing `</body>` tag:

```html
<!-- Khipu BeerCSS Bundle - JavaScript -->
<script type="module" src="https://cdn.jsdelivr.net/npm/@khipu/design-system@latest/dist/beercss/khipu-beercss.min.js"></script>
```

**Note:** Replace `@latest` with a specific version for production (e.g., `@0.1.0-alpha.44`).

### Via npm

```bash
npm install @khipu/design-system
```

Then import in your project:

```javascript
// CSS
import '@khipu/design-system/beercss/css';

// JavaScript
import '@khipu/design-system/beercss/js';
```

## Khipu Brand Colors

The bundle includes Khipu brand colors mapped to BeerCSS variables:

- **Primary:** Purple `#8347AD` (Khipu signature color)
- **Secondary:** Cyan `#3CB4E5` (Brand complementary color)
- **Success:** Green `#2E7D32` (Success/positive actions)
- **Warning:** Orange `#EF6C00` (Warnings and caution)
- **Error:** Red `#D32F2F` (Errors and destructive actions)
- **Info:** Blue `#0288D1` (Informational messages)

These are sourced from `@khipu/design-system` tokens and automatically applied to BeerCSS components via CSS custom properties.

## Custom Khipu Components

### Elevated Card

```html
<div class="khipu-card-elevated">
  <h3>Card Title</h3>
  <p>Card content with Khipu brand shadow.</p>
</div>
```

### Hero Section

```html
<div class="khipu-hero">
  <h1>Welcome to Khipu</h1>
  <p>Payment processing made simple</p>
</div>
```

### Spacing Utilities

```html
<div class="khipu-spacing-top">Top margin</div>
<div class="khipu-spacing-bottom">Bottom margin</div>
<div class="khipu-spacing-large">Large vertical margin</div>
```

## JavaScript API

The bundle exports utilities to the `window.Khipu` namespace:

### Show Snackbar

```javascript
// Show success message
Khipu.showSnackbar('Payment successful!', 'success', 5000);

// Show error message
Khipu.showSnackbar('Payment failed', 'error', 5000);

// Show info message (default)
Khipu.showSnackbar('Processing...', 'info', 3000);
```

**Backward compatibility:** Also available as `window.showSnackbar()`.

### Close Modal

```javascript
Khipu.closeModal('my-modal-id');
```

## Automatic Initialization

The following features are initialized automatically on DOM ready:

- **Mobile sidenav toggle** (element ID: `menu-toggle`, `material-sidenav`)
- **Flash messages auto-dismiss** (elements with `data-auto-dismiss="true"`)
- **Modal dialogs** (via BeerCSS `ui()` function)

No additional JavaScript code needed!

## Development

### Build Locally

```bash
# Install dependencies
npm install

# Build BeerCSS bundle
npm run beercss:build

# Watch for changes
npm run beercss:watch
```

Output files are generated in `dist/beercss/`:

- `khipu-beercss.css` (non-minified, for debugging)
- `khipu-beercss.min.css` (minified, for production)
- `khipu-beercss.js` (non-minified)
- `khipu-beercss.min.js` (minified)
- `metadata.json` (version and CDN info)

### File Structure

```
src/beercss/
├── README.md                        # This file
├── customizations/
│   ├── khipu-tokens.css            # Maps KDS tokens to BeerCSS variables
│   ├── khipu-components.css        # Custom Khipu components
│   └── khipu-init.js               # JavaScript initialization
└── scripts/
    └── build.js                    # Build script
```

## Versioning

The bundle follows semantic versioning:

- **Patch** (0.2.0 → 0.2.1): Bug fixes in customizations
- **Minor** (0.2.x → 0.3.0): New components or BeerCSS version updates
- **Major** (0.x.x → 1.0.0): Breaking changes

Current versions bundled:
- BeerCSS: `4.0.1`
- Material Dynamic Colors: `1.1.2`
- Khipu tokens: Sourced from `@khipu/design-system` tokens

## Browser Support

Same as BeerCSS:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 8+)

## Resources

- [BeerCSS Documentation](https://www.beercss.com/)
- [Material Design 3 Guidelines](https://m3.material.io/)
- [Khipu Design System](https://github.com/khipu/design-system)

## License

UNLICENSED - Proprietary Khipu software

---

**Built with ❤️ by the Khipu team**
