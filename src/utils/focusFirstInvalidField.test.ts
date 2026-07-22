import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  centerFieldInViewport,
  focusFirstInvalidField,
  guideToFirstInvalidFieldOnBlur,
} from './focusFirstInvalidField';

describe('focusFirstInvalidField', () => {
    let form: HTMLFormElement
    let scrollToSpy: ReturnType<typeof vi.fn>

    const buildForm = () => {
        form = document.createElement('form')
        form.noValidate = true
        const valid = document.createElement('input')
        valid.name = 'valid'
        valid.value = 'ok'
        const invalid1 = document.createElement('input')
        invalid1.name = 'first-invalid'
        invalid1.required = true
        const invalid2 = document.createElement('input')
        invalid2.name = 'second-invalid'
        invalid2.required = true
        form.append(valid, invalid1, invalid2)
        document.body.appendChild(form)
        return {valid, invalid1, invalid2}
    }

    beforeEach(() => {
        scrollToSpy = vi.fn()
        window.scrollTo = scrollToSpy
        delete (window as any).visualViewport
    })

    afterEach(() => {
        document.body.innerHTML = ''
        delete (document.body as any).scrollHeight
        delete (document.body as any).clientHeight
        document.body.style.overflowY = ''
        vi.useRealTimers()
    })

    it('focuses and scrolls to the FIRST invalid field', () => {
        const {invalid1} = buildForm()
        const focusSpy = vi.spyOn(invalid1, 'focus')

        focusFirstInvalidField(form)

        expect(focusSpy).toHaveBeenCalledWith({preventScroll: true})
        expect(document.activeElement).toBe(invalid1)
        expect(scrollToSpy).toHaveBeenCalledWith(expect.objectContaining({behavior: 'smooth'}))
    })

    it('does nothing when every field is valid', () => {
        const {invalid1, invalid2} = buildForm()
        invalid1.value = 'filled'
        invalid2.value = 'filled'

        focusFirstInvalidField(form)

        expect(document.activeElement).not.toBe(invalid1)
        expect(scrollToSpy).not.toHaveBeenCalled()
    })

    it('centers against visualViewport height/offset when available (virtual keyboard)', () => {
        const {invalid1} = buildForm()
        vi.spyOn(invalid1, 'getBoundingClientRect').mockReturnValue({
            top: 500,
            height: 40,
        } as DOMRect)
        Object.defineProperty(window, 'scrollY', {value: 100, configurable: true})
        // teclado abierto: viewport visible de 300px (vs innerHeight 800)
        ;(window as any).visualViewport = {
            height: 300,
            offsetTop: 0,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }

        centerFieldInViewport(invalid1)

        // top = scrollY(100) + rect.top(500) - (300 - 40) / 2 = 470
        expect(scrollToSpy).toHaveBeenCalledWith({top: 470, behavior: 'smooth'})
    })

    it('re-centers once when visualViewport resizes after focus (keyboard opening)', () => {
        vi.useFakeTimers()
        const {invalid1} = buildForm()
        const addListener = vi.fn()
        const removeListener = vi.fn()
        ;(window as any).visualViewport = {
            height: 800,
            offsetTop: 0,
            addEventListener: addListener,
            removeEventListener: removeListener,
        }

        focusFirstInvalidField(form)

        expect(addListener).toHaveBeenCalledWith('resize', expect.any(Function), {once: true})
        vi.runAllTimers()
        expect(removeListener).toHaveBeenCalled()
        expect(document.activeElement).toBe(invalid1)
    })

    it('scrolls the nearest scrollable ancestor instead of the window (body 100vh de la app)', () => {
        const {invalid1} = buildForm()
        const scroller = document.createElement('div')
        scroller.style.overflowY = 'auto'
        document.body.appendChild(scroller)
        scroller.appendChild(form)
        // jsdom no computa layout: simular contenedor con scroll interno
        Object.defineProperty(scroller, 'scrollHeight', {value: 2000, configurable: true})
        Object.defineProperty(scroller, 'clientHeight', {value: 600, configurable: true})
        Object.defineProperty(scroller, 'scrollTop', {value: 50, configurable: true, writable: true})
        vi.spyOn(scroller, 'getBoundingClientRect').mockReturnValue({top: 0, bottom: 600} as DOMRect)
        const containerScrollTo = vi.fn()
        scroller.scrollTo = containerScrollTo
        vi.spyOn(invalid1, 'getBoundingClientRect').mockReturnValue({top: 500, height: 40} as DOMRect)
        Object.defineProperty(window, 'innerHeight', {value: 800, configurable: true})

        centerFieldInViewport(invalid1)

        // target = scrollTop(50) + (rect.top(500) - visibleTop(0)) - (600 - 40) / 2 = 270
        expect(containerScrollTo).toHaveBeenCalledWith({top: 270, behavior: 'smooth'})
        expect(scrollToSpy).not.toHaveBeenCalled() // el window no se toca
    })

    it('clips the container visible area with the keyboard open (visualViewport)', () => {
        const {invalid1} = buildForm()
        const scroller = document.createElement('div')
        scroller.style.overflowY = 'auto'
        document.body.appendChild(scroller)
        scroller.appendChild(form)
        Object.defineProperty(scroller, 'scrollHeight', {value: 2000, configurable: true})
        Object.defineProperty(scroller, 'clientHeight', {value: 800, configurable: true})
        Object.defineProperty(scroller, 'scrollTop', {value: 0, configurable: true, writable: true})
        vi.spyOn(scroller, 'getBoundingClientRect').mockReturnValue({top: 0, bottom: 800} as DOMRect)
        const containerScrollTo = vi.fn()
        scroller.scrollTo = containerScrollTo
        vi.spyOn(invalid1, 'getBoundingClientRect').mockReturnValue({top: 500, height: 40} as DOMRect)
        // teclado abierto: solo 300px visibles de los 800 del contenedor
        ;(window as any).visualViewport = {
            height: 300,
            offsetTop: 0,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        }

        centerFieldInViewport(invalid1)

        // visible = min(800, 300) => target = 0 + (500 - 0) - (300 - 40) / 2 = 370
        expect(containerScrollTo).toHaveBeenCalledWith({top: 370, behavior: 'smooth'})
    })

    it('falls back to window.innerHeight without visualViewport', () => {
        const {invalid1} = buildForm()
        vi.spyOn(invalid1, 'getBoundingClientRect').mockReturnValue({
            top: 500,
            height: 40,
        } as DOMRect)
        Object.defineProperty(window, 'scrollY', {value: 0, configurable: true})
        Object.defineProperty(window, 'innerHeight', {value: 800, configurable: true})

        centerFieldInViewport(invalid1)

        // top = 0 + 500 - (800 - 40) / 2 = 120
        expect(scrollToSpy).toHaveBeenCalledWith({top: 120, behavior: 'smooth'})
    })

    it('guides to the first invalid field on blur (e.g. focus moved to the terms checkbox)', () => {
        vi.useFakeTimers()
        const {invalid1} = buildForm()
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        form.appendChild(checkbox)
        checkbox.focus()

        guideToFirstInvalidFieldOnBlur(form)
        vi.runAllTimers()

        expect(document.activeElement).toBe(invalid1)
    })

    it('waits for the click to finish before guiding: el checkbox queda marcado (gesto largo)', () => {
        vi.useFakeTimers()
        const {invalid1} = buildForm()
        const checkbox = document.createElement('input')
        checkbox.type = 'checkbox'
        form.appendChild(checkbox)
        checkbox.focus()

        guideToFirstInvalidFieldOnBlur(form)
        // gesto de click más largo que cualquier timer corto: sin robo de foco aún
        vi.advanceTimersByTime(200)
        expect(document.activeElement).toBe(checkbox)

        checkbox.click() // fin del gesto: el toggle ocurre ANTES de la guía
        expect(checkbox.checked).toBe(true)

        vi.runAllTimers() // tick post-click → recién ahora corre la guía
        expect(checkbox.checked).toBe(true)
        expect(document.activeElement).toBe(invalid1)
    })

    it('does NOT steal focus when the user moved into another text field', () => {
        vi.useFakeTimers()
        const {invalid1, invalid2} = buildForm()
        invalid2.focus()

        guideToFirstInvalidFieldOnBlur(form)
        vi.runAllTimers()

        expect(document.activeElement).toBe(invalid2)
        expect(document.activeElement).not.toBe(invalid1)
        expect(scrollToSpy).not.toHaveBeenCalled()
    })

    it('does nothing on blur when the form is valid', () => {
        vi.useFakeTimers()
        const {invalid1, invalid2} = buildForm()
        invalid1.value = 'filled'
        invalid2.value = 'filled'

        guideToFirstInvalidFieldOnBlur(form)
        vi.runAllTimers()

        expect(scrollToSpy).not.toHaveBeenCalled()
    })

    it('scrolls the window when body overflow propagates to the viewport (layout real de la app)', () => {
        const {invalid1} = buildForm()
        // body 100vh + overflow auto con html visible: el overflow se propaga al viewport
        document.body.style.overflowY = 'auto'
        Object.defineProperty(document.body, 'scrollHeight', {value: 900, configurable: true})
        Object.defineProperty(document.body, 'clientHeight', {value: 500, configurable: true})
        const bodyScrollTo = vi.fn()
        document.body.scrollTo = bodyScrollTo
        vi.spyOn(invalid1, 'getBoundingClientRect').mockReturnValue({top: 500, height: 40} as DOMRect)
        Object.defineProperty(window, 'scrollY', {value: 0, configurable: true})
        Object.defineProperty(window, 'innerHeight', {value: 500, configurable: true})

        centerFieldInViewport(invalid1)

        // top = 0 + 500 - (500 - 40) / 2 = 270 → via WINDOW, no via body
        expect(scrollToSpy).toHaveBeenCalledWith({top: 270, behavior: 'smooth'})
        expect(bodyScrollTo).not.toHaveBeenCalled()
        document.body.style.overflowY = ''
    })

    it('clamps the scroll target to zero (field near the top)', () => {
        const {invalid1} = buildForm()
        vi.spyOn(invalid1, 'getBoundingClientRect').mockReturnValue({
            top: 10,
            height: 40,
        } as DOMRect)
        Object.defineProperty(window, 'scrollY', {value: 0, configurable: true})
        Object.defineProperty(window, 'innerHeight', {value: 800, configurable: true})

        centerFieldInViewport(invalid1)

        expect(scrollToSpy).toHaveBeenCalledWith({top: 0, behavior: 'smooth'})
    })
})
