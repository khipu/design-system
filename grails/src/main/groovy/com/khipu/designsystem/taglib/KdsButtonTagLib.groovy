package com.khipu.designsystem.taglib

/**
 * Khipu Design System - Button TagLib
 *
 * Renders a button component following the Khipu Design System specifications.
 * Supports multiple variants, colors, sizes, and states.
 *
 * @author Khipu Team
 * @version 0.1.0-alpha.1
 *
 * Usage:
 * <kds:button variant="contained" color="primary">
 *   Submit
 * </kds:button>
 *
 * Documentation: docs/grails/COMPONENT_API.md
 */
class KdsButtonTagLib {

    static namespace = 'kds'

    /**
     * Renders a Khipu Design System button
     *
     * @attr variant - Button variant: contained, outlined, text (default: contained)
     * @attr color - Button color: primary, secondary, success, error, warning, info (default: primary)
     * @attr size - Button size: small, medium, large (default: large)
     * @attr type - Button type: button, submit, reset (default: button)
     * @attr fullWidth - Full width button (boolean, default: false)
     * @attr disabled - Disabled state (boolean, default: false)
     * @attr loading - Loading state (boolean, default: false)
     * @attr onclick - JavaScript onclick handler
     * @attr href - If provided, renders as link (<a>) instead of button
     * @attr target - Link target (only with href): _blank, _self, etc.
     * @attr class - Additional CSS classes
     * @attr id - Element ID
     * @attr style - Inline styles
     * @attr title - HTML title attribute (tooltip)
     * @attr tabindex - Tab index for accessibility
     *
     * @example
     * <kds:button variant="contained" color="primary" size="large">
     *   PAGAR AHORA
     * </kds:button>
     *
     * @example
     * <kds:button type="submit" loading="${processing}">
     *   Procesando...
     * </kds:button>
     *
     * @example
     * <kds:button variant="text" href="/help" target="_blank">
     *   ¿Necesitas ayuda?
     * </kds:button>
     */
    def button = { attrs, body ->
        // Extract and validate attributes
        def variant = attrs.remove('variant') ?: 'contained'
        def color = attrs.remove('color') ?: 'primary'
        def size = attrs.remove('size') ?: 'large'
        def type = attrs.remove('type') ?: 'button'
        def fullWidth = parseBoolean(attrs.remove('fullWidth'))
        def disabled = parseBoolean(attrs.remove('disabled'))
        def loading = parseBoolean(attrs.remove('loading'))
        def href = attrs.remove('href')
        def target = attrs.remove('target')

        // Validate variant
        def validVariants = ['contained', 'outlined', 'text']
        if (!validVariants.contains(variant)) {
            log.warn("Invalid button variant '${variant}'. Using 'contained'. Valid values: ${validVariants}")
            variant = 'contained'
        }

        // Validate color
        def validColors = ['primary', 'secondary', 'success', 'error', 'warning', 'info']
        if (!validColors.contains(color)) {
            log.warn("Invalid button color '${color}'. Using 'primary'. Valid values: ${validColors}")
            color = 'primary'
        }

        // Validate size
        def validSizes = ['small', 'medium', 'large']
        if (!validSizes.contains(size)) {
            log.warn("Invalid button size '${size}'. Using 'large'. Valid values: ${validSizes}")
            size = 'large'
        }

        // Build CSS classes
        def cssClasses = [
            'kds-button',
            "kds-button--${variant}",
            "kds-button--${color}",
            "kds-button--${size}"
        ]

        if (fullWidth) {
            cssClasses << 'kds-button--full-width'
        }

        if (disabled || loading) {
            cssClasses << 'kds-button--disabled'
        }

        if (loading) {
            cssClasses << 'kds-button--loading'
        }

        // Add custom classes
        if (attrs['class']) {
            cssClasses << attrs.remove('class')
        }

        // Determine tag type (button or link)
        def isLink = href != null
        def tagName = isLink ? 'a' : 'button'

        // Build HTML attributes
        def htmlAttrs = [:]
        htmlAttrs['class'] = cssClasses.join(' ')

        if (isLink) {
            // Link attributes
            htmlAttrs['href'] = href
            if (target) {
                htmlAttrs['target'] = target
            }
            if (disabled || loading) {
                htmlAttrs['aria-disabled'] = 'true'
                // Prevent navigation on disabled links
                htmlAttrs['onclick'] = 'return false;'
            }
        } else {
            // Button attributes
            htmlAttrs['type'] = type
            if (disabled || loading) {
                htmlAttrs['disabled'] = 'disabled'
            }
        }

        // Add onclick handler (unless it's a disabled link)
        if (attrs['onclick'] && !(isLink && (disabled || loading))) {
            htmlAttrs['onclick'] = attrs.remove('onclick')
        }

        // Add remaining attributes (id, style, title, tabindex, etc.)
        ['id', 'style', 'title', 'tabindex', 'data-*', 'aria-*'].each { attrPattern ->
            attrs.findAll { key, value ->
                attrPattern.endsWith('*')
                    ? key.startsWith(attrPattern.replace('*', ''))
                    : key == attrPattern
            }.each { key, value ->
                htmlAttrs[key] = attrs.remove(key)
            }
        }

        // Render opening tag
        out << "<${tagName}"
        htmlAttrs.each { key, value ->
            if (value != null) {
                out << " ${key}=\"${value.toString().encodeAsHTML()}\""
            }
        }
        out << ">"

        // Render loading spinner
        if (loading) {
            out << '<span class="kds-button__spinner"></span>'
        }

        // Render button content (label)
        out << '<span class="kds-button__label">'
        out << body()
        out << '</span>'

        // Render closing tag
        out << "</${tagName}>"

        // Warn about unused attributes
        if (attrs) {
            log.warn("Unused attributes in kds:button: ${attrs.keySet()}")
        }
    }

    /**
     * Helper method to parse boolean values
     * Handles string "true"/"false" and boolean true/false
     */
    private boolean parseBoolean(value) {
        if (value == null) {
            return false
        }
        if (value instanceof Boolean) {
            return value
        }
        return value.toString().toLowerCase() in ['true', '1', 'yes']
    }
}
