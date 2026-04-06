package com.khipu.designsystem.taglib

/**
 * Khipu Design System - Card TagLib
 *
 * Renders card components using BeerCSS Material Design 3 classes.
 * Based on khipu-components.css card styles.
 *
 * @author Khipu Team
 * @version 0.1.0-alpha.30
 *
 * Usage:
 * <kds:card>
 *   <kds:cardHeader>Título</kds:cardHeader>
 *   <kds:cardBody>Contenido</kds:cardBody>
 * </kds:card>
 *
 * Documentation: docs/grails/COMPONENT_API.md
 */
class KdsCardTagLib {

    static namespace = 'kds'

    /**
     * Renders a card container
     *
     * @attr variant - Card variant: main, elevated, selector, plan, status (default: main)
     * @attr class - Additional CSS classes
     * @attr id - Element ID
     * @attr selected - For selector cards, marks as selected (boolean)
     * @attr onclick - JavaScript onclick handler
     *
     * @example
     * <kds:card variant="main">
     *   <h3>Título</h3>
     *   <p>Contenido de la tarjeta</p>
     * </kds:card>
     *
     * @example
     * <kds:card variant="selector" selected="${isSelected}" onclick="selectOption(this)">
     *   <div class="kds-card-selector-icon">
     *     <i class="material-symbols-outlined">person</i>
     *   </div>
     *   <div class="kds-card-selector-title">Persona Natural</div>
     * </kds:card>
     */
    def card = { attrs, body ->
        // Extract attributes
        def variant = attrs.remove('variant') ?: 'main'
        def selected = parseBoolean(attrs.remove('selected'))
        def onclick = attrs.remove('onclick')

        // Validate variant
        def validVariants = ['main', 'elevated', 'selector', 'plan', 'status']
        if (!validVariants.contains(variant)) {
            log.warn("Invalid card variant '${variant}'. Using 'main'. Valid values: ${validVariants}")
            variant = 'main'
        }

        // Build CSS classes
        def cssClasses = []

        // Map variant to CSS class
        def variantClassMap = [
            'main': 'kds-card-main',
            'elevated': 'kds-card-elevated',
            'selector': 'kds-card-selector',
            'plan': 'kds-card-plan',
            'status': 'kds-card-status'
        ]
        cssClasses << variantClassMap[variant]

        // Add selected state for selector cards
        if (variant == 'selector' && selected) {
            cssClasses << 'selected'
        }

        // Add custom classes
        if (attrs['class']) {
            cssClasses << attrs.remove('class')
        }

        // Build HTML attributes
        def htmlAttrs = [:]
        htmlAttrs['class'] = cssClasses.join(' ')

        if (attrs['id']) {
            htmlAttrs['id'] = attrs.remove('id')
        }

        if (onclick) {
            htmlAttrs['onclick'] = onclick
        }

        // Render card
        out << '<div'
        htmlAttrs.each { key, value ->
            out << " ${key}=\"${value.toString().encodeAsHTML()}\""
        }
        out << '>'
        out << body()
        out << '</div>'

        // Warn about unused attributes
        if (attrs) {
            log.warn("Unused attributes in kds:card: ${attrs.keySet()}")
        }
    }

    /**
     * Renders a card header
     *
     * @attr class - Additional CSS classes
     *
     * @example
     * <kds:cardHeader>
     *   <h3>Título de la tarjeta</h3>
     * </kds:cardHeader>
     */
    def cardHeader = { attrs, body ->
        def cssClasses = ['kds-card-header']

        if (attrs['class']) {
            cssClasses << attrs.remove('class')
        }

        out << '<div class="' + cssClasses.join(' ') + '">'
        out << body()
        out << '</div>'
    }

    /**
     * Renders a card body
     *
     * @attr class - Additional CSS classes
     *
     * @example
     * <kds:cardBody>
     *   <p>Contenido de la tarjeta</p>
     * </kds:cardBody>
     */
    def cardBody = { attrs, body ->
        def cssClasses = ['kds-card-body']

        if (attrs['class']) {
            cssClasses << attrs.remove('class')
        }

        out << '<div class="' + cssClasses.join(' ') + '">'
        out << body()
        out << '</div>'
    }

    /**
     * Renders a card footer
     *
     * @attr class - Additional CSS classes
     *
     * @example
     * <kds:cardFooter>
     *   <kds:button variant="primary">Aceptar</kds:button>
     * </kds:cardFooter>
     */
    def cardFooter = { attrs, body ->
        def cssClasses = ['kds-card-footer']

        if (attrs['class']) {
            cssClasses << attrs.remove('class')
        }

        out << '<div class="' + cssClasses.join(' ') + '">'
        out << body()
        out << '</div>'
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
