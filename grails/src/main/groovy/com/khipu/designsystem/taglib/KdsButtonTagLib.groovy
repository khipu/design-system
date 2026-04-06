package com.khipu.designsystem.taglib

/**
 * Khipu Design System - Button TagLib
 *
 * Renders a button component using BeerCSS Material Design 3 classes.
 * Based on khipu-components.css button styles.
 *
 * @author Khipu Team
 * @version 0.1.0-alpha.30
 *
 * Usage:
 * <kds:button variant="primary">
 *   Submit
 * </kds:button>
 *
 * Documentation: docs/grails/COMPONENT_API.md
 */
class KdsButtonTagLib {

    static namespace = 'kds'

    /**
     * Renders a Khipu Design System button using BeerCSS classes
     *
     * @attr variant - Button variant: primary, secondary, outlined, outlined-white, text (default: primary)
     * @attr type - Button type: button, submit, reset (default: button)
     * @attr disabled - Disabled state (boolean, default: false)
     * @attr onclick - JavaScript onclick handler
     * @attr href - If provided, renders as link (<a>) instead of button
     * @attr target - Link target (only with href): _blank, _self, etc.
     * @attr class - Additional CSS classes
     * @attr id - Element ID
     * @attr title - HTML title attribute (tooltip)
     * @attr tabindex - Tab index for accessibility
     * @attr icon - Icon name (Material Symbols) to display before text
     * @attr iconAfter - Icon name (Material Symbols) to display after text
     *
     * @example
     * <kds:button variant="primary">
     *   PAGAR AHORA
     * </kds:button>
     *
     * @example
     * <kds:button variant="outlined" type="submit">
     *   Continuar
     * </kds:button>
     *
     * @example
     * <kds:button variant="text" href="/help" target="_blank" icon="help">
     *   ¿Necesitas ayuda?
     * </kds:button>
     *
     * @example
     * <kds:button variant="primary" icon="arrow_forward" iconAfter="true">
     *   Siguiente
     * </kds:button>
     */
    def button = { attrs, body ->
        // Extract and validate attributes
        def variant = attrs.remove('variant') ?: 'primary'
        def type = attrs.remove('type') ?: 'button'
        def disabled = parseBoolean(attrs.remove('disabled'))
        def href = attrs.remove('href')
        def target = attrs.remove('target')
        def icon = attrs.remove('icon')
        def iconAfter = parseBoolean(attrs.remove('iconAfter'))

        // Validate variant
        def validVariants = ['primary', 'secondary', 'outlined', 'outlined-white', 'text']
        if (!validVariants.contains(variant)) {
            log.warn("Invalid button variant '${variant}'. Using 'primary'. Valid values: ${validVariants}")
            variant = 'primary'
        }

        // Build CSS classes based on BeerCSS structure
        def cssClasses = ['kds-btn']

        // Add variant class (kds-btn-primary, kds-btn-outlined, etc.)
        cssClasses << "kds-btn-${variant}"

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
            if (disabled) {
                htmlAttrs['aria-disabled'] = 'true'
                // Prevent navigation on disabled links
                htmlAttrs['onclick'] = 'return false;'
            }
        } else {
            // Button attributes
            htmlAttrs['type'] = type
            if (disabled) {
                htmlAttrs['disabled'] = 'disabled'
            }
        }

        // Add onclick handler (unless it's a disabled link)
        if (attrs['onclick'] && !(isLink && disabled)) {
            htmlAttrs['onclick'] = attrs.remove('onclick')
        }

        // Add remaining attributes (id, title, tabindex, etc.)
        ['id', 'title', 'tabindex', 'data-*', 'aria-*'].each { attrPattern ->
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

        // Render icon before text (if specified and not iconAfter)
        if (icon && !iconAfter) {
            out << '<span class="kds-icon">'
            out << '<i class="material-symbols-outlined">'
            out << icon.toString().encodeAsHTML()
            out << '</i>'
            out << '</span>'
        }

        // Render button content (label)
        out << body()

        // Render icon after text (if specified and iconAfter)
        if (icon && iconAfter) {
            out << '<span class="kds-icon">'
            out << '<i class="material-symbols-outlined">'
            out << icon.toString().encodeAsHTML()
            out << '</i>'
            out << '</span>'
        }

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
