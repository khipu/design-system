package com.khipu.designsystem.taglib

import grails.test.mixin.TestFor
import spock.lang.Specification
import spock.lang.Unroll

/**
 * Tests for KdsButtonTagLib
 *
 * @author Khipu Team
 */
@TestFor(KdsButtonTagLib)
class KdsButtonTagLibSpec extends Specification {

    // =========================================================================
    // BASIC RENDERING TESTS
    // =========================================================================

    void "test button renders with default attributes"() {
        when:
        def result = applyTemplate('<kds:button>Click me</kds:button>')

        then:
        result.contains('class="kds-button kds-button--contained kds-button--primary kds-button--large"')
        result.contains('type="button"')
        result.contains('<span class="kds-button__label">Click me</span>')
        !result.contains('disabled')
        !result.contains('kds-button__spinner')
    }

    void "test button renders with body content"() {
        when:
        def result = applyTemplate('<kds:button>PAGAR AHORA</kds:button>')

        then:
        result.contains('PAGAR AHORA')
    }

    void "test button renders with HTML in body"() {
        when:
        def result = applyTemplate('<kds:button><strong>Bold</strong> text</kds:button>')

        then:
        result.contains('<strong>Bold</strong> text')
    }

    // =========================================================================
    // VARIANT TESTS
    // =========================================================================

    @Unroll
    void "test button renders variant #variant"() {
        when:
        def result = applyTemplate("<kds:button variant='${variant}'>Test</kds:button>")

        then:
        result.contains("kds-button--${variant}")

        where:
        variant << ['contained', 'outlined', 'text']
    }

    void "test button defaults to contained variant when invalid"() {
        when:
        def result = applyTemplate('<kds:button variant="invalid">Test</kds:button>')

        then:
        result.contains('kds-button--contained')
        !result.contains('kds-button--invalid')
    }

    // =========================================================================
    // COLOR TESTS
    // =========================================================================

    @Unroll
    void "test button renders color #color"() {
        when:
        def result = applyTemplate("<kds:button color='${color}'>Test</kds:button>")

        then:
        result.contains("kds-button--${color}")

        where:
        color << ['primary', 'secondary', 'success', 'error', 'warning', 'info']
    }

    void "test button defaults to primary color when invalid"() {
        when:
        def result = applyTemplate('<kds:button color="invalid">Test</kds:button>')

        then:
        result.contains('kds-button--primary')
        !result.contains('kds-button--invalid')
    }

    // =========================================================================
    // SIZE TESTS
    // =========================================================================

    @Unroll
    void "test button renders size #size"() {
        when:
        def result = applyTemplate("<kds:button size='${size}'>Test</kds:button>")

        then:
        result.contains("kds-button--${size}")

        where:
        size << ['small', 'medium', 'large']
    }

    void "test button defaults to large size when invalid"() {
        when:
        def result = applyTemplate('<kds:button size="invalid">Test</kds:button>')

        then:
        result.contains('kds-button--large')
        !result.contains('kds-button--invalid')
    }

    // =========================================================================
    // TYPE TESTS
    // =========================================================================

    @Unroll
    void "test button renders type #type"() {
        when:
        def result = applyTemplate("<kds:button type='${type}'>Test</kds:button>")

        then:
        result.contains("type=\"${type}\"")

        where:
        type << ['button', 'submit', 'reset']
    }

    // =========================================================================
    // STATE TESTS
    // =========================================================================

    void "test button renders disabled state"() {
        when:
        def result = applyTemplate('<kds:button disabled="true">Test</kds:button>')

        then:
        result.contains('disabled="disabled"')
        result.contains('kds-button--disabled')
    }

    void "test button renders loading state"() {
        when:
        def result = applyTemplate('<kds:button loading="true">Test</kds:button>')

        then:
        result.contains('kds-button--loading')
        result.contains('kds-button--disabled')
        result.contains('kds-button__spinner')
        result.contains('disabled="disabled"')
    }

    void "test button renders full width"() {
        when:
        def result = applyTemplate('<kds:button fullWidth="true">Test</kds:button>')

        then:
        result.contains('kds-button--full-width')
    }

    // =========================================================================
    // BOOLEAN PARSING TESTS
    // =========================================================================

    @Unroll
    void "test button parses boolean value #value as #expected"() {
        when:
        def result = applyTemplate("<kds:button disabled='${value}'>Test</kds:button>")

        then:
        if (expected) {
            result.contains('disabled="disabled"')
        } else {
            !result.contains('disabled="disabled"')
        }

        where:
        value   | expected
        'true'  | true
        'false' | false
        '1'     | true
        '0'     | false
        'yes'   | true
        'no'    | false
    }

    // =========================================================================
    // LINK RENDERING TESTS
    // =========================================================================

    void "test button renders as link when href is provided"() {
        when:
        def result = applyTemplate('<kds:button href="/page">Link</kds:button>')

        then:
        result.contains('<a')
        result.contains('href="/page"')
        result.contains('</a>')
        !result.contains('<button')
        !result.contains('type="button"')
    }

    void "test link button renders with target"() {
        when:
        def result = applyTemplate('<kds:button href="/page" target="_blank">Link</kds:button>')

        then:
        result.contains('target="_blank"')
    }

    void "test link button renders as disabled"() {
        when:
        def result = applyTemplate('<kds:button href="/page" disabled="true">Link</kds:button>')

        then:
        result.contains('aria-disabled="true"')
        result.contains('onclick="return false;"')
        result.contains('kds-button--disabled')
    }

    // =========================================================================
    // CUSTOM ATTRIBUTES TESTS
    // =========================================================================

    void "test button renders with custom id"() {
        when:
        def result = applyTemplate('<kds:button id="my-button">Test</kds:button>')

        then:
        result.contains('id="my-button"')
    }

    void "test button renders with custom class"() {
        when:
        def result = applyTemplate('<kds:button class="custom-class">Test</kds:button>')

        then:
        result.contains('kds-button')
        result.contains('custom-class')
    }

    void "test button renders with inline style"() {
        when:
        def result = applyTemplate('<kds:button style="margin: 10px;">Test</kds:button>')

        then:
        result.contains('style="margin: 10px;"')
    }

    void "test button renders with onclick handler"() {
        when:
        def result = applyTemplate('<kds:button onclick="alert(\'test\')">Test</kds:button>')

        then:
        result.contains('onclick="alert(&#39;test&#39;)"')
    }

    void "test button renders with title attribute"() {
        when:
        def result = applyTemplate('<kds:button title="Click here">Test</kds:button>')

        then:
        result.contains('title="Click here"')
    }

    void "test button renders with tabindex"() {
        when:
        def result = applyTemplate('<kds:button tabindex="1">Test</kds:button>')

        then:
        result.contains('tabindex="1"')
    }

    void "test button renders with data attributes"() {
        when:
        def result = applyTemplate('<kds:button data-test="value">Test</kds:button>')

        then:
        result.contains('data-test="value"')
    }

    void "test button renders with aria attributes"() {
        when:
        def result = applyTemplate('<kds:button aria-label="Close">Test</kds:button>')

        then:
        result.contains('aria-label="Close"')
    }

    // =========================================================================
    // COMBINED ATTRIBUTES TESTS
    // =========================================================================

    void "test button renders with all attributes combined"() {
        when:
        def result = applyTemplate('''
            <kds:button
                variant="outlined"
                color="secondary"
                size="medium"
                type="submit"
                fullWidth="true"
                id="submit-btn"
                class="custom"
                onclick="submitForm()">
                Submit
            </kds:button>
        ''')

        then:
        result.contains('kds-button--outlined')
        result.contains('kds-button--secondary')
        result.contains('kds-button--medium')
        result.contains('kds-button--full-width')
        result.contains('type="submit"')
        result.contains('id="submit-btn"')
        result.contains('custom')
        result.contains('onclick="submitForm()"')
        result.contains('Submit')
    }

    void "test submit button with loading state"() {
        when:
        def result = applyTemplate('''
            <kds:button
                type="submit"
                variant="contained"
                color="primary"
                loading="true">
                Procesando...
            </kds:button>
        ''')

        then:
        result.contains('type="submit"')
        result.contains('kds-button--loading')
        result.contains('kds-button__spinner')
        result.contains('disabled="disabled"')
        result.contains('Procesando...')
    }

    // =========================================================================
    // EDGE CASES
    // =========================================================================

    void "test button renders with empty body"() {
        when:
        def result = applyTemplate('<kds:button></kds:button>')

        then:
        result.contains('kds-button__label')
        result.contains('</span></button>')
    }

    void "test button escapes HTML in attributes"() {
        when:
        def result = applyTemplate('<kds:button onclick="alert(\'<script>evil</script>\')">Test</kds:button>')

        then:
        !result.contains('<script>')
        result.contains('&lt;script&gt;')
    }

    void "test disabled link does not execute onclick"() {
        when:
        def result = applyTemplate('<kds:button href="/page" disabled="true" onclick="doSomething()">Test</kds:button>')

        then:
        result.contains('onclick="return false;"')
        !result.contains('onclick="doSomething()"')
    }
}
