package com.khipu.designsystem.taglib

/**
 * Khipu Design System - Stepper TagLib
 *
 * Renders stepper/progress indicator components for multi-step flows.
 * Based on khipu-components.css stepper styles.
 *
 * @author Khipu Team
 * @version 0.1.0-alpha.30
 *
 * Usage:
 * <kds:stepper currentStep="${currentStep}" steps="${stepsList}" />
 *
 * Documentation: docs/grails/COMPONENT_API.md
 */
class KdsStepperTagLib {

    static namespace = 'kds'

    /**
     * Renders a horizontal stepper for multi-step processes
     *
     * @attr steps - List of step labels (required)
     * @attr currentStep - Current step index (0-based, default: 0)
     * @attr class - Additional CSS classes
     * @attr id - Element ID
     *
     * @example
     * <kds:stepper
     *   steps="${['Selector', 'Perfil', 'Comercial', 'Documentos']}"
     *   currentStep="1" />
     *
     * @example
     * <g:set var="onboardingSteps" value="${['Inicio', 'Datos', 'Verificación', 'Confirmación']}" />
     * <kds:stepper steps="${onboardingSteps}" currentStep="${session.currentStep}" />
     */
    def stepper = { attrs, body ->
        // Extract attributes
        def steps = attrs.remove('steps')
        def currentStep = attrs.remove('currentStep') ? Integer.parseInt(attrs.remove('currentStep').toString()) : 0

        if (!steps || !(steps instanceof List)) {
            log.error("kds:stepper requires 'steps' attribute as a List")
            return
        }

        // Build CSS classes
        def cssClasses = ['kds-stepper']

        if (attrs['class']) {
            cssClasses << attrs.remove('class')
        }

        // Build HTML attributes
        def htmlAttrs = [:]
        htmlAttrs['class'] = cssClasses.join(' ')

        if (attrs['id']) {
            htmlAttrs['id'] = attrs.remove('id')
        }

        // Render stepper container
        out << '<div'
        htmlAttrs.each { key, value ->
            out << " ${key}=\"${value.toString().encodeAsHTML()}\""
        }
        out << '>'

        // Render each step
        steps.eachWithIndex { stepLabel, index ->
            def stepClasses = ['kds-step']

            if (index < currentStep) {
                stepClasses << 'completed'
            } else if (index == currentStep) {
                stepClasses << 'current'
            }

            out << '<div class="' + stepClasses.join(' ') + '">'
            out << '<div class="kds-step-indicator"></div>'
            out << '<div class="kds-step-label">' + stepLabel.toString().encodeAsHTML() + '</div>'
            out << '</div>'
        }

        out << '</div>' // Close stepper

        // Warn about unused attributes
        if (attrs) {
            log.warn("Unused attributes in kds:stepper: ${attrs.keySet()}")
        }
    }

    /**
     * Renders a single step (for custom stepper layouts)
     *
     * @attr label - Step label (required)
     * @attr status - Step status: completed, current, pending (default: pending)
     * @attr class - Additional CSS classes
     *
     * @example
     * <div class="kds-stepper">
     *   <kds:step label="Inicio" status="completed" />
     *   <kds:step label="Datos" status="current" />
     *   <kds:step label="Fin" status="pending" />
     * </div>
     */
    def step = { attrs, body ->
        def label = attrs.remove('label')
        def status = attrs.remove('status') ?: 'pending'

        if (!label) {
            log.error("kds:step requires 'label' attribute")
            return
        }

        // Validate status
        def validStatuses = ['completed', 'current', 'pending']
        if (!validStatuses.contains(status)) {
            log.warn("Invalid step status '${status}'. Using 'pending'. Valid values: ${validStatuses}")
            status = 'pending'
        }

        // Build CSS classes
        def cssClasses = ['kds-step']

        if (status == 'completed') {
            cssClasses << 'completed'
        } else if (status == 'current') {
            cssClasses << 'current'
        }

        if (attrs['class']) {
            cssClasses << attrs.remove('class')
        }

        // Render step
        out << '<div class="' + cssClasses.join(' ') + '">'
        out << '<div class="kds-step-indicator"></div>'
        out << '<div class="kds-step-label">' + label.toString().encodeAsHTML() + '</div>'
        out << '</div>'
    }
}
