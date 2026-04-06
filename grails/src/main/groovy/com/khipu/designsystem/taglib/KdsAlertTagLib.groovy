package com.khipu.designsystem.taglib

/**
 * Khipu Design System - Alert/Snackbar TagLib
 *
 * Renders alert and snackbar components using BeerCSS Material Design 3 classes.
 * Based on khipu-components.css alert/snackbar styles.
 *
 * @author Khipu Team
 * @version 0.1.0-alpha.30
 *
 * Usage:
 * <kds:alert type="success" message="Pago procesado correctamente" />
 *
 * Documentation: docs/grails/COMPONENT_API.md
 */
class KdsAlertTagLib {

    static namespace = 'kds'

    /**
     * Renders a Khipu Design System alert
     *
     * @attr type - Alert type: success, info, warning, error (default: info)
     * @attr title - Alert title (optional)
     * @attr message - Alert message (required if no body)
     * @attr dismissible - Show close button (boolean, default: false)
     * @attr icon - Custom icon name (Material Symbols), auto-selected if not provided
     * @attr class - Additional CSS classes
     * @attr id - Element ID
     *
     * @example
     * <kds:alert type="success" title="Éxito" message="Operación completada" />
     *
     * @example
     * <kds:alert type="error" dismissible="true">
     *   <strong>Error:</strong> No se pudo procesar el pago
     * </kds:alert>
     *
     * @example
     * <kds:alert type="info" icon="info" title="Información importante">
     *   Tu cuenta será activada en 24-48 horas hábiles
     * </kds:alert>
     */
    def alert = { attrs, body ->
        // Extract and validate attributes
        def type = attrs.remove('type') ?: 'info'
        def title = attrs.remove('title')
        def message = attrs.remove('message')
        def dismissible = parseBoolean(attrs.remove('dismissible'))
        def icon = attrs.remove('icon')

        // Validate type
        def validTypes = ['success', 'info', 'warning', 'error']
        if (!validTypes.contains(type)) {
            log.warn("Invalid alert type '${type}'. Using 'info'. Valid values: ${validTypes}")
            type = 'info'
        }

        // Auto-select icon based on type if not provided
        if (!icon) {
            def iconMap = [
                'success': 'check_circle',
                'info': 'info',
                'warning': 'warning',
                'error': 'error'
            ]
            icon = iconMap[type]
        }

        // Build CSS classes
        def cssClasses = ['kds-alert', type]

        // Add custom classes
        if (attrs['class']) {
            cssClasses << attrs.remove('class')
        }

        // Build HTML attributes
        def htmlAttrs = [:]
        htmlAttrs['class'] = cssClasses.join(' ')

        // Add id if provided
        if (attrs['id']) {
            htmlAttrs['id'] = attrs.remove('id')
        }

        // Render alert
        out << '<div'
        htmlAttrs.each { key, value ->
            out << " ${key}=\"${value.toString().encodeAsHTML()}\""
        }
        out << '>'

        // Icon
        out << '<div class="kds-alert-icon">'
        out << '<i class="material-symbols-outlined">'
        out << icon.toString().encodeAsHTML()
        out << '</i>'
        out << '</div>'

        // Content
        out << '<div class="kds-alert-content">'

        // Title (if provided)
        if (title) {
            out << '<div class="kds-alert-title">'
            out << title.toString().encodeAsHTML()
            out << '</div>'
        }

        // Message or body
        if (message) {
            out << '<div class="kds-alert-description">'
            out << message.toString().encodeAsHTML()
            out << '</div>'
        } else if (body) {
            out << '<div class="kds-alert-description">'
            out << body()
            out << '</div>'
        }

        out << '</div>' // Close content

        // Close button (if dismissible)
        if (dismissible) {
            out << '<button class="kds-alert-close" onclick="this.parentElement.remove()" aria-label="Cerrar">'
            out << '<i class="material-symbols-outlined">close</i>'
            out << '</button>'
        }

        out << '</div>' // Close alert

        // Warn about unused attributes
        if (attrs) {
            log.warn("Unused attributes in kds:alert: ${attrs.keySet()}")
        }
    }

    /**
     * Helper method to parse boolean values
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
