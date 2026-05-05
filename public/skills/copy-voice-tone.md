# Skill: Copy y voz de marca Khipu

## Propósito
Este skill te ayuda a escribir y revisar textos de interfaz (copy, microcopy, mensajes) siguiendo las guías de voz y tono de Khipu.

## Contexto de marca

**Khipu** es una plataforma de pagos B2B para Chile y Latinoamérica que facilita transferencias bancarias, suscripciones y pagos automáticos.

**Valores de marca:**

Nuestra identidad se fundamenta en tres valores esenciales:

1. **Buenos competidores:** Nos mantenemos al tanto de la industria, entendiendo la competitividad como mejora continua. Esto se refleja en lenguaje directo, neutro y simple.

2. **Honestos:** La transparencia es fundamental. Contamos lo que está pasando siempre, comunicamos éxitos y fallos con claridad, y no escondemos información relevante.

3. **Colaborativos:** Somos tecnológicos que tratan con personas, de igual a igual con nuestros clientes. Comunicación cercana y respetuosa.

**Voz de marca:**
- 🤝 **Cercana:** Hablamos como un aliado confiable, no como una institución distante
- 💎 **Clara:** Eliminamos jerga financiera innecesaria y explicamos conceptos complejos de forma simple
- 🔒 **Confiable:** Transmitimos seguridad y profesionalismo sin ser intimidantes
- ⚡ **Directa:** Vamos al grano, respetamos el tiempo del usuario

## Guías de redacción

### ✅ Recomendado
- Tú / Tu (tutear al usuario)
- Verbos activos y directos
- Frases cortas y concisas
- Lenguaje neutro
- Números en lugar de palabras
- Bullet points para listas
- Mayúscula inicial (norma ortográfica estándar)

### ❌ Evitar
- Usted (demasiado formal)
- Voz pasiva
- Párrafos largos
- Lenguaje excluyente
- Jerga técnica innecesaria
- Bloques de texto denso
- CamelCase en contexto de usuarios (ej: "Ver Factura", "Mi Cuenta")

## Ejemplos específicos

### Mensajes generales
| ✅ Recomendado | ❌ Evitar |
|----------------|-----------|
| "Ingresa tu RUT y contraseña" | "El usuario debe ingresar sus credenciales" |
| "Completa estos datos" | "Favor de completar el formulario" |
| "Tu pago fue procesado" | "Su transacción ha sido procesada exitosamente" |
| "Continuar" (en el botón) | "Click aquí para continuar" |

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

## Uso de puntuación

> ⚠️ Estas reglas aplican principalmente en interfaces de pago para facilitar la concisión

| Contexto | Usa punto final |
|----------|----------------|
| **Mensajes completos** (alertas, confirmación, error, info) | ✅ Sí |
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

## Cómo usar este skill

### Paso 1: Integra este archivo en tu agente de IA
- **Claude (Projects):** Sube este archivo en "Project knowledge"
- **ChatGPT:** Sube este archivo al inicio de la conversación
- **Cursor/VSCode:** Añade como contexto en `.cursorrules` o similar

### Paso 2: Haz tu solicitud
Ejemplos de prompts:

**Para revisar copy:**
```
Revisa este texto siguiendo las guías de voz y tono de Khipu:
[tu texto aquí]
```

**Para generar microcopy:**
```
Genera 3 opciones de texto para un botón de confirmación de pago,
siguiendo las guías de voz y tono de Khipu.
```

**Para mejorar redacción:**
```
Reescribe este mensaje de error para que sea más claro y cercano,
según las guías de comunicación de Khipu.
```

## Checklist de validación

Antes de entregar el copy, verifica:

- [ ] ¿Usé "tú" en lugar de "usted"?
- [ ] ¿Las frases son cortas y directas (< 15 palabras)?
- [ ] ¿Eliminé palabras de relleno ("por favor", "proceder a", "realizar")?
- [ ] ¿Los botones tienen verbos de acción específicos?
- [ ] ¿El tono suena como un aliado, no como un banco?
- [ ] ¿Apliqué correctamente las reglas de puntuación?

## Preguntas de autoevaluación

- ¿Suena como un aliado confiable o como una institución distante?
- ¿Es tan claro que un usuario no técnico lo entendería?
- ¿Las frases son cortas y directas?
- ¿Estoy usando "tú" en lugar de "usted"?
- ¿He eliminado palabras innecesarias?

## ⚠️ Anti-patrones comunes de agentes IA

Cuando generes contenido para Khipu, **evita estos errores típicos de LLMs**:

### 🚫 Al escribir copy

| ❌ Error típico de IA | ✅ Correcto Khipu | Por qué |
|----------|-------------|---------|
| "Por favor, haz click aquí para continuar" | "Continuar" | Exceso de palabras, suena formal |
| "El sistema procederá a validar..." | "Validamos tu información" | Voz pasiva, institucional |
| "Estimado usuario..." | "Hola 👋" o directo al contenido | Demasiado formal |
| "Se ha producido un error" | "No pudimos procesar tu pago" | Específico y directo |
| Párrafos largos sin estructura | Bullet points, frases cortas | Usuarios escanean, no leen |

### Tendencias a corregir:

- **Los LLMs tienden a ser excesivamente formales** → Khipu es cercano y directo
- **Los LLMs usan mucho "por favor"** → Khipu va al grano
- **Los LLMs explican demasiado** → Khipu respeta el tiempo del usuario
- **Los LLMs usan voz pasiva** → Khipu usa verbos activos

---

**Versión:** 1.0.0
**Última actualización:** 2026-05-05
**Más información:** https://design.khipu.com
