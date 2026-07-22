/**
 * Scroll + focus al primer campo inválido de un formulario.
 *
 * El scroll se aplica sobre el ancestro scrolleable real del campo (en la app el
 * scroller es el body con height:100vh, no el window). El centrado usa la porción
 * visible: con el teclado virtual abierto visualViewport se achica (el layout
 * viewport no), así que centrar contra él deja el campo visible sobre el teclado.
 * Además se re-centra una vez cuando el viewport cambia (apertura del teclado
 * gatillada por el propio focus).
 */

import { runAfterPointerGesture } from './runAfterPointerGesture';

const RECENTER_WINDOW_MS = 1500

const getScrollParent = (field: HTMLElement): HTMLElement | null => {
    let node = field.parentElement
    while (node) {
        const style = getComputedStyle(node)
        if (node.scrollHeight > node.clientHeight && /auto|scroll|overlay/.test(style.overflowY)) {
            // Overflow del body con html visible se PROPAGA al viewport (spec CSS):
            // el body no scrollea por si mismo (scrollTop fijo en 0), scrollea el window.
            const htmlOverflow = getComputedStyle(document.documentElement).overflowY
            if (node === document.body && (htmlOverflow === 'visible' || htmlOverflow === '')) {
                return null
            }
            return node
        }
        node = node.parentElement
    }
    return null
}

export const centerFieldInViewport = (field: HTMLElement): void => {
    const viewport = window.visualViewport
    const viewportTop = viewport?.offsetTop ?? 0
    const viewportHeight = viewport?.height ?? window.innerHeight
    const rect = field.getBoundingClientRect()
    const scroller = getScrollParent(field)

    if (!scroller || scroller === document.documentElement || scroller === document.scrollingElement) {
        const top = window.scrollY + rect.top - viewportTop - (viewportHeight - rect.height) / 2
        window.scrollTo({top: Math.max(top, 0), behavior: 'smooth'})
        return
    }

    // Porción del contenedor realmente visible (recortada por el visualViewport:
    // con teclado abierto el borde inferior visible sube).
    const scrollerRect = scroller.getBoundingClientRect()
    const visibleTop = Math.max(scrollerRect.top, viewportTop)
    const visibleBottom = Math.min(scrollerRect.bottom, viewportTop + viewportHeight)
    const visibleHeight = Math.max(visibleBottom - visibleTop, 0)
    const target = scroller.scrollTop + (rect.top - visibleTop) - (visibleHeight - rect.height) / 2
    scroller.scrollTo({top: Math.max(target, 0), behavior: 'smooth'})
}

const isInvalidField = (element: Element): element is HTMLElement & {validity: ValidityState} => {
    const field = element as HTMLInputElement
    return typeof field.willValidate === 'boolean' && field.willValidate && !field.validity.valid
}

export const focusFirstInvalidField = (form: HTMLFormElement): void => {
    const firstInvalid = Array.from(form.elements).find(isInvalidField)
    if (!firstInvalid) {
        return
    }
    firstInvalid.focus({preventScroll: true})
    centerFieldInViewport(firstInvalid)

    const viewport = window.visualViewport
    if (viewport) {
        const recenter = () => centerFieldInViewport(firstInvalid)
        viewport.addEventListener('resize', recenter, {once: true})
        window.setTimeout(() => viewport.removeEventListener('resize', recenter), RECENTER_WINDOW_MS)
    }
}

const isTextEntryElement = (element: Element | null): boolean => {
    if (!element) {
        return false
    }
    if (element.tagName === 'TEXTAREA') {
        return true
    }
    const input = element as HTMLInputElement
    return element.tagName === 'INPUT' && !['checkbox', 'radio', 'button', 'submit', 'reset'].includes(input.type)
}

/**
 * Trigger en el blur de los campos: el submit vive deshabilitado hasta que el form
 * valida, así que la guía al primer campo con error debe correr al perder el foco
 * (p.ej. al marcar el checkbox de términos con un campo vacío).
 *
 * La guía NO puede correr con un timer fijo: el blur llega en el mousedown y el
 * toggle del checkbox recién en el click (mouseup) — si el gesto dura más que el
 * timer, robar el foco a mitad de gesto deja el checkbox sin marcar. Por eso se
 * ancla al fin del click que causó el blur (más un tick para que corran onChange
 * y el re-render), con fallback por timer para blur de teclado (Tab).
 *
 * Guard anti-trampa: si el foco pasó a OTRO campo de texto del form (el usuario va
 * a escribir ahí), no se le roba el foco.
 */
export const guideToFirstInvalidFieldOnBlur = (form: HTMLFormElement): void => {
    runAfterPointerGesture(() => {
        if (!form.isConnected) {
            return
        }
        const active = document.activeElement
        if (active && form.contains(active) && isTextEntryElement(active)) {
            return
        }
        if (!form.checkValidity()) {
            focusFirstInvalidField(form)
        }
    })
}
