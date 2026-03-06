# Guía de marca Khipu para agentes de IA

> **🎯 Propósito:** Este archivo define la **VOZ Y TONO** de comunicación de Khipu.
> Para aspectos técnicos del Design System, consulta **[CLAUDE.md](./CLAUDE.md)**.
> Para ejemplos visuales, ve a **Storybook** → Brand section.

**Última actualización:** 2026-02-18 | **Versión:** 1.0.0

---

## 📍 Contexto rápido para agentes

**¿Qué es Khipu?**
Plataforma de pagos B2B para Chile y Latinoamérica. Facilitamos transferencias bancarias, suscripciones y pagos automáticos entre empresas y usuarios.

**Tu rol como agente:**
Generar contenido (copy, código, diseños) que refleje la voz de Khipu: cercana, clara, confiable y directa.

**Identidad visual clave:**
- 🎨 **Color primario:** Púrpura Khipu `#8347AD` (innovación, confianza, diferenciación)
- ✍️ **Tipografía:** Public Sans (moderna, legible, tecnológica)
- 🎭 **Tono:** Profesional pero amigable, como un aliado confiable

---

## 🧭 Navegación para agentes

**Si necesitas...**

| Tarea | Recurso Principal | Recurso Secundario |
|-------|-------------------|-------------------|
| ✍️ Escribir copy/textos | Este archivo | `src/stories/brand/05-VoiceAndTone.stories.mdx` |
| 🎨 Definir colores/estilos | Este archivo + [CLAUDE.md](./CLAUDE.md) → Tokens | Storybook → Brand/Uso de colores |
| 💻 Generar código React/Android | [CLAUDE.md](./CLAUDE.md) | Este archivo (para textos en UI) |
| 🔍 Ver ejemplos completos | `src/examples/` | Storybook → Examples |
| 📐 Usar componentes | [CLAUDE.md](./CLAUDE.md) → Components | Storybook → Core |

---

## Valores de marca

La identidad de Khipu se fundamenta en tres valores esenciales:

### 1. Buenos competidores
Nos gusta entender y afrontar nuestros desafíos. Nos mantenemos al tanto de la industria y nuestros competidores, entendiendo la competitividad como una acción de mejora continua.

**En la práctica:**
- Mejora continua de productos y servicios
- Enfoque competente cuidando las formas
- Lenguaje directo, neutro y simple

### 2. Honestos
La honestidad ante todo. La transparencia es uno de nuestros valores fundamentales y un principio rector en nuestra comunicación corporativa y de equipo.

**En la práctica:**
- Contamos lo que está pasando siempre
- Comunicamos éxitos y fallos con claridad
- No escondemos información relevante

### 3. Colaborativos
Buscamos influir positivamente en la industria, porque entendemos el aporte a la sociedad como un valor. También extendemos el sentido de colaboración hacia nuestro equipo.

**En la práctica:**
- Tecnológicos que tratan con personas
- De igual a igual con nuestros clientes
- Comunicación cercana y respetuosa

---

## Personalidad de marca

Nuestra marca se caracteriza por tres pilares de comunicación:

### Eficiente
*Somos competentes, cuidando las formas.*

- **Vocabulario:** Directo, neutro, simple
- **Verbosidad:** Evitamos expresiones de género o cargo
- **Gramática:** Oraciones o frases simples

### Transparente
*Diseñamos procesos de pago confiables.*

- **Vocabulario:** Transparente, explícito
- **Verbosidad:** Palabras suficientes con información precisa
- **Gramática:** Oraciones completas sin obviar datos

### Cercana
*Somos facilitadores de procesos.*

- **Vocabulario:** Confiable, inclusivo, amistoso
- **Verbosidad:** Palabras que entreguen información de ayuda
- **Gramática:** Oraciones o frases simples

---

## Voz de marca

La voz de Khipu es constante en todos los puntos de contacto:

### Características

**🤝 Cercana**
Hablamos como un aliado confiable, no como una institución distante

**💎 Clara**
Eliminamos la jerga financiera innecesaria. Explicamos conceptos complejos de forma simple

**🔒 Confiable**
Transmitimos seguridad y profesionalismo sin ser intimidantes

**⚡ Directa**
Vamos al grano. Respetamos el tiempo del usuario

---

## Guías de redacción

### Recomendaciones generales

| ✅ Recomendado | ❌ Evitar |
|----------------|-----------|
| Tú / Tu (tutear al usuario) | Usted (demasiado formal) |
| Verbos activos y directos | Voz pasiva |
| Frases cortas y concisas | Párrafos largos |
| Lenguaje inclusivo | Lenguaje excluyente |
| Números en lugar de palabras | Jerga técnica innecesaria |
| Bullet points para listas | Bloques de texto denso |
| Mayúscula inicial: Es la norma ortográfica estándar. La primera letra de cada oración siempre debe ir en mayúscula. (CamelCase solo en código/nombres propios) | CamelCase en contexto de usuarios (ej: "Ver Factura", "Mi Cuenta") |

### Ejemplos específicos

| ✅ Recomendado | ❌ Evitar |
|----------------|-----------|
| "Ingresa tu RUT y contraseña" | "El usuario debe ingresar sus credenciales" |
| "Completa estos datos" | "Favor de completar el formulario" |
| "Tu pago fue procesado" | "Su transacción ha sido procesada exitosamente" |
| "Continuar" (en el botón) | "Click aquí para continuar" |

---

## Microcopy: elementos de UI

### Botones

**✅ Recomendado:**
- Pagar ahora
- Confirmar pago
- Agregar cuenta

**❌ Evitar:**
- OK / Aceptar (como CTA)
- Submit
- Click aquí

### Labels de formularios

**✅ Recomendado:**
- Correo electrónico
- Monto a pagar
- Contraseña

**❌ Evitar:**
- Por favor ingrese su email
- Ingrese el monto de la transacción
- Ingrese su password

### Mensajes de error

**✅ Recomendado:**
- Ingresa un email válido
- El RUT debe tener 8-9 dígitos
- La contraseña debe tener al menos 8 caracteres

**❌ Evitar:**
- Error en el campo
- Formato inválido
- Error de validación

---

## Uso de puntuación

> ⚠️ **Contexto de aplicación:** Estas reglas son preferentemente usadas en lenguaje digital en el uso de interfaces de pago para facilitar la concisión. Las excepciones son permitidas en redacciones de otro tipo de contenidos (documentación extensa, artículos, comunicados oficiales, etc.).

| Contexto | Usa punto final |
|----------|----------------|
| **Mensajes completos** (alertas, confirmación, error, info, etc.) | ✅ Sí |
| **Oraciones descriptivas** | ✅ Sí |
| **Botones/CTAs** | ❌ No |
| **Labels de formularios** | ❌ No |
| **Títulos** | ❌ No |
| **Frases cortas de UI** | ❌ No |
| **Listas** (tabuladas/bullet points) | ❌ No |

**Ejemplos:**
- ✅ "Tu pago fue procesado exitosamente." *(mensaje completo)*
- ✅ "Conectamos con tu banco para verificar tu cuenta." *(oración descriptiva)*
- ❌ "Continuar" *(botón)*
- ❌ "Correo electrónico" *(label)*
- ❌ "• Pagar ahora" *(lista)*

---

## Cómo aplicar estas guías

Cuando generes contenido para Khipu:

1. **Lee el contexto completo** de lo que se te pide
2. **Aplica la voz cercana, clara y directa**
3. **Usa "tú" en lugar de "usted"**
4. **Sé específico y transparente** sobre lo que sucede
5. **Mantén las frases cortas** y fáciles de entender
6. **Revisa que el tono sea profesional pero amigable**
7. **Elimina jerga técnica innecesaria**

### Preguntas para autoevaluar

Antes de entregar el contenido, pregúntate:

- ¿Suena como un aliado confiable o como una institución distante?
- ¿Es tan claro que un usuario no técnico lo entendería?
- ¿Las frases son cortas y directas?
- ¿Estoy usando "tú" en lugar de "usted"?
- ¿He eliminado palabras innecesarias?

---

## Ejemplos de uso correcto

### Mensaje de confirmación de pago
❌ "Su transacción ha sido procesada exitosamente. Por favor revise su correo electrónico para más detalles."

✅ "¡Listo! Tu pago fue procesado. Te enviamos los detalles por correo."

### Mensaje de error en formulario
❌ "Error de validación en el campo RUT. Por favor ingrese un valor válido."

✅ "El RUT debe tener 8-9 dígitos. Revísalo e intenta de nuevo."

### Descripción de funcionalidad
❌ "El sistema procederá a validar sus credenciales bancarias mediante una conexión segura."

✅ "Conectamos de forma segura con tu banco para verificar tu cuenta."

### Call to action
❌ "Haga click aquí para proceder con el proceso de suscripción"

✅ "Comenzar suscripción"

---

## ⚠️ Errores comunes de agentes IA

Cuando generes contenido para Khipu, **evita estos anti-patrones**:

### 🚫 Al escribir código

| ❌ Error | ✅ Correcto | Por qué |
|----------|-------------|---------|
| Usar colores hardcodeados: `color: '#8347AD'` | Usar tokens: `colors.primary.main` | Mantiene consistencia y facilita cambios |
| Crear componentes custom desde cero | Usar componentes del design system | Ya están probados, accesibles y documentados |
| `<button onClick={...}>Click aquí</button>` | `<Button onClick={...}>Pagar ahora</Button>` | Usa componentes Khipu + copy directo |
| Ignorar props de accesibilidad | Incluir `aria-label`, `role`, etc. | Todos los componentes deben ser accesibles |

### 🚫 Al escribir copy

| ❌ Error | ✅ Correcto | Por qué |
|----------|-------------|---------|
| "Por favor, haz click aquí para continuar" | "Continuar" | Exceso de palabras, suena formal |
| "El sistema procederá a validar..." | "Validamos tu información" | Voz pasiva, institucional |
| "Estimado usuario..." | "Hola 👋" o directo al contenido | Demasiado formal |
| "Se ha producido un error" | "No pudimos procesar tu pago" | Específico y directo |
| Párrafos largos sin estructura | Bullet points, frases cortas | Usuarios escanean, no leen |

### 🚫 Al diseñar UI

| ❌ Error | ✅ Correcto | Por qué |
|----------|-------------|---------|
| Usar azules genéricos | Usar púrpura `#8347AD` | Color de marca distintivo |
| Fuentes Arial/Helvetica | Public Sans | Tipografía oficial |
| Botones con "OK", "Aceptar" | "Confirmar pago", "Continuar" | Copy específico y accionable |
| Textos de ayuda inexistentes | Helper text claro y directo | Reduce errores del usuario |

### 🎯 Checklist antes de entregar

Usa este checklist para validar tu output:

- [ ] ¿Usé "tú" en lugar de "usted"?
- [ ] ¿Las frases son cortas y directas (< 15 palabras)?
- [ ] ¿Eliminé palabras de relleno ("por favor", "proceder a", "realizar")?
- [ ] ¿Los botones tienen verbos de acción específicos?
- [ ] ¿Usé tokens de diseño en lugar de valores hardcodeados?
- [ ] ¿Consulté CLAUDE.md para aspectos técnicos?
- [ ] ¿El tono suena como un aliado, no como un banco?

---

## Notas finales

- **Siempre prioriza la claridad** sobre el lenguaje formal
- **La brevedad es importante**, pero no sacrifiques la información necesaria
- **Sé humano y cercano**, pero mantén el profesionalismo
- **Cuando dudes**, opta por la opción más simple y directa

---

## 🔄 Sincronización con el Design System

### Fuentes de Información

Este archivo está alineado con:
- **Storybook**: `src/stories/brand/*.stories.mdx` (documentación visual detallada)
- **CLAUDE.md**: Sección "Android" y "Patrones de Desarrollo"
- **Tokens visuales**: `src/tokens/index.ts` (colores, tipografía)

### Flujo de Información

```
Figma (Fuente de diseño)
    ↓
    [Solo equipo de Design System mantiene esta conexión]
    ↓
Storybook + Archivos MD (Documentación publicada)
    ↓
    [Desarrolladores y agentes IA consumen desde aquí]
    ↓
Implementaciones (React, Android, Grails, etc.)
```

**Para agentes de IA:** Usa Storybook y estos archivos MD como fuente de verdad. No necesitas acceder a Figma directamente.

### 📝 Proceso de Sincronización

> ⚠️ **IMPORTANTE:** Cuando se realizan cambios en los archivos de Brand (`src/stories/brand/*.stories.mdx`), estos cambios **DEBEN** reflejarse manualmente en `BRAND_GUIDE_FOR_AI.md`.

**Archivos que requieren sincronización:**

| Archivo Storybook | Sección en BRAND_GUIDE_FOR_AI.md | ¿Cuándo sincronizar? |
|-------------------|-----------------------------------|---------------------|
| `02-Logo.stories.mdx` | Personalidad de marca, Valores de marca | Al actualizar frases descriptivas o valores |
| `03-Colors.stories.mdx` | Identidad visual clave (colores HEX) | Al cambiar colores primarios/secundarios |
| `05-VoiceAndTone.stories.mdx` | Voz de marca, Guías de redacción, Microcopy, Uso de puntuación | Al agregar/modificar reglas de escritura |

**Checklist de sincronización:**
1. [ ] ¿Se actualizaron frases de personalidad de marca?
2. [ ] ¿Se agregaron o modificaron reglas de redacción?
3. [ ] ¿Se cambiaron valores de colores primarios/secundarios?
4. [ ] ¿Se agregaron nuevas secciones de guías de escritura?
5. [ ] Si respondiste "Sí" a alguna → actualiza `BRAND_GUIDE_FOR_AI.md`

**Razón:** Este archivo es la fuente principal para agentes de IA que generan contenido. Mantenerlo sincronizado asegura consistencia en la comunicación de marca.

**Última revisión:** 2026-03-02
**Próxima actualización:** Al agregar nuevos componentes o actualizar guías de marca
