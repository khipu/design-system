/**
 * Corre el callback cuando termina el gesto de puntero en curso (fin del click),
 * o tras un fallback corto si el gesto no era de puntero (Tab del teclado).
 *
 * Por qué: el blur de un campo llega en el mousedown, pero el click sobre el
 * elemento destino (p.ej. el checkbox de términos) recién se completa en el
 * mouseup EN LAS MISMAS COORDENADAS. Cualquier cambio de layout o robo de foco
 * entre medio (mostrar un error bajo el campo, enfocar otro elemento) desplaza
 * el destino y el click se pierde. Anclar el efecto al fin del click garantiza
 * el orden: gesto completo → onChange/re-render → efecto.
 */

const KEYBOARD_FALLBACK_MS = 400

export const runAfterPointerGesture = (callback: () => void): void => {
    let done = false
    const run = () => {
        if (done) {
            return
        }
        done = true
        document.removeEventListener('click', run, true)
        // tick extra: deja despachar el click completo (onChange + re-render de React)
        window.setTimeout(callback, 0)
    }
    document.addEventListener('click', run, true)
    window.setTimeout(run, KEYBOARD_FALLBACK_MS)
}
