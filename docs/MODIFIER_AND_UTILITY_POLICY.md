# Modifier and Utility Policy

How the Khipu Design System grows without breaking the consumers that already depend on it.

## Why this policy exists

The DS is consumed by **multiple products in parallel** (`payment`, LigoPay, Android client,
Grails legacy). When one team needs a new visual treatment, the DS must change without
visually regressing the others. The non-negotiables are:

1. **Additive only.** New variants, modifiers, utilities, tokens. Never overwrite the default
   behaviour of a class that is already in use.
2. **Opt-in via BEM modifier.** New sizes/colors/tones live behind `--modifier` suffixes; the
   base class keeps its current rendering.
3. **Zero custom CSS in consumers.** If a gap exists, file a request to the DS — do not invent
   a one-off class downstream.
4. **Zero hardcoded values.** Every utility and modifier resolves to `var(--kds-*)` tokens.

## BEM convention

```
kds-{block}__{element}--{modifier}
```

- **Block:** `kds-card-title`, `kds-amount-value`, `kds-payment-total`
- **Element:** rare in the DS, but e.g. `kds-card-header-icon` inside `kds-card-header--icon`
- **Modifier:** `--lg`, `--xl`, `--info`, `--tone-info`, `--email`

## Modifiers vs. utilities

| Use a **modifier** when… | Use a **utility** when… |
|---|---|
| The change is bound to a specific component | The change is a single-property override (font-size, weight, bg) |
| It carries semantic intent (`--info`, `--callout`, `--lg`) | It is purely presentational and reusable across blocks |
| You want it to compose with existing component styles | You want to compose ad-hoc layouts without writing CSS |

When in doubt: a modifier scales when the design changes (the modifier definition gets richer);
a utility stays trivial forever.

## Requesting new tokens/utilities

1. Open an issue describing **what the design asks** and **what the DS provides today**.
2. Reference a Figma frame or a markup mock.
3. Tag the DS owners — do not implement in the consumer. Inline styles and per-app
   `style.css` are not solutions.

For LigoPay / payment, the open-gaps document is tracked at
`Downloads/ds-requests-ligopay.md` and the resulting changes are landed via the
`worktree-agent-*` branches.

## Utilities and modifiers added in this iteration

| Class / Token | Resolves to | Typical use |
|---|---|---|
| `kds-text-base` | `var(--kds-font-size-base)` (16) | Body text override |
| `kds-text-lg` | `var(--kds-font-size-lg)` (18) | Subtle emphasis |
| `kds-text-xl` | `var(--kds-font-size-xl)` (20) | Action-card titles |
| `kds-text-2xl` | `var(--kds-font-size-2xl)` (24) | Screen/section titles |
| `kds-fw-regular` | `var(--kds-font-weight-regular)` (400) | Body weight |
| `kds-fw-medium` | `var(--kds-font-weight-medium)` (500) | Light emphasis |
| `kds-fw-semibold` | `var(--kds-font-weight-semibold)` (600) | Strong emphasis |
| `kds-fw-bold` | `var(--kds-font-weight-bold)` (700) | Maximum emphasis |
| `kds-text-transform-none` | `text-transform: none` | Cancel inherited uppercase |
| `kds-bg-warning-soft` | `var(--kds-color-warning-soft)` | Inline warning callout bg |
| `kds-bg-info-soft` | `var(--kds-color-info-soft)` | Inline info callout bg |
| `kds-card-title--lg` | font-size xl + weight bold | Action-card title (LigoPay) |
| `kds-card-title--xl` | font-size 2xl + weight bold | Screen header title |
| `kds-amount-value--info` | `color: var(--kds-color-info-blue)` | Khipu-blue amount (LigoPay QR/transfer) |
| `kds-payment-total--tone-info` | `--kds-payment-amount-color: --kds-color-info-blue` | `<KdsPaymentTotal tone="info">` |
| `--kds-color-info-blue` | `#5A5FE0` | LigoPay informational blue |
| `--kds-color-warning-warm` | `#8A6D1A` | Olive warning (header icons) |
| `--kds-font-size-decimal-sup` | `0.5em` | Decimal superscript in amount displays |

## Patterns already in the DS — do not duplicate

If your need overlaps with an existing component, **extend it via a modifier** rather than
shipping a parallel pattern.

| Need | Existing pattern |
|---|---|
| Inline icon + caption-sized note | `KdsSectionNote` (with `icon` prop + severity variants) |
| Card/screen icon + h2 header | Compose with `kds-card-title--xl` + an outlined icon in a flex row using `kds-gap-2` |
| Soft warning/info callout | `kds-alert` (full) or `kds-bg-{warning,info}-soft` (utility) |
