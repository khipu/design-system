---
name: khipu-brand-visual
metadata:
  category: Brand
description: >-
  Aplica y valida la identidad visual de Khipu: paleta de color con sus
  variantes main y dark, tipografía Public Sans y uso del logotipo. Úsala al
  diseñar o revisar interfaces, mockups, piezas gráficas y material de
  comunicación; al elegir un color para un estado o un acento; al verificar
  contraste WCAG; o al decidir qué variante de logotipo corresponde y cuánto
  espacio necesita. No la uses para redactar textos (usa khipu-brand-voice) ni
  para maquetar presentaciones corporativas (usa khipu-brand-presentations).
---

# Identidad visual — Khipu

El púrpura `#8347AD` es el color distintivo de Khipu en un mercado dominado por
azules bancarios. Public Sans es la única tipografía del sistema.

## Cómo usar esta habilidad

1. Identifica qué se está decidiendo: un color de estado, un acento, un peso
   tipográfico, una variante de logotipo.
2. Toma el valor de las tablas de abajo. **Nunca inventes un color ni un
   tamaño**: si algo no está aquí, es una decisión de marca que se resuelve en
   el sistema de diseño, no en la pieza.
3. Valida el contraste antes de entregar.

## Paleta

**Colores de marca**

| | Main | Dark | Light | Container |
|---|---|---|---|---|
| Púrpura | `#8347AD` | `#5B3179` | `#9B6BBD` | `#F3E5FF` |
| Cian | `#3CB4E5` | `#198EBE` | `#6AC6EB` | — |

El púrpura va en acciones primarias, navegación activa y elementos de marca.
**No** en fondos de página completos ni en textos largos. El cian es
complementario: acciones secundarias, iconos, acentos.

**Colores semánticos** — iguales en modo claro y oscuro

| Estado | Main | Dark | Cuándo |
|--------|------|------|--------|
| Info | `#0288D1` | `#01579B` | Mensajes informativos, tooltips, ayuda |
| Success | `#2E7D32` | `#1B5E20` | Pagos exitosos, operaciones completadas |
| Warning | `#EF6C00` | `#E65100` | Atención no crítica, acciones con consecuencias |
| Error | `#D32F2F` | `#C62828` | Errores, operaciones fallidas, acciones destructivas |

**`main` es el color base** — iconos, bordes, fondos de badge, la identidad del
estado. **`dark` es para texto** sobre fondos claros y estados hover.

## Contraste: la regla que más se incumple

Tres colores **no alcanzan AA como texto normal sobre blanco**:

| Color | Ratio | Consecuencia |
|-------|-------|--------------|
| Cian `#3CB4E5` | 2.4:1 | Nunca como texto, ni grande. Usa `#198EBE` |
| Warning `#EF6C00` | 3.1:1 | Sólo texto grande. Para texto usa `#E65100` |
| Info `#0288D1` | 3.9:1 | Sólo texto grande. Para texto usa `#01579B` |

Combinaciones verificadas que sí cumplen: púrpura main sobre blanco (6.1:1),
blanco sobre púrpura main (6.1:1), púrpura dark sobre blanco (9.7:1), success
main sobre blanco (5.1:1), error main sobre blanco (5.0:1).

Estándar: texto normal ≥ 4.5:1, texto grande (≥ 18pt o ≥ 14pt bold) ≥ 3:1,
elementos de UI ≥ 3:1.

## Tipografía

**Public Sans** es la única fuente, en cuatro pesos:

| Peso | Uso |
|------|-----|
| Regular (400) | Contenido general y lectura |
| Medium (500) | Labels, botones, énfasis sutil |
| SemiBold (600) | Encabezados y títulos |
| Bold (700) | Máximo impacto, títulos display |

**Máximo 3 pesos en una misma vista.** Disponible gratis en Google Fonts.

## Logotipo

**Variantes horizontales:** color (modo claro), púrpura completo y negro (modo
oscuro). **Cuadradas:** K color (UI minimalista), K púrpura (favicons), K
blanco y K blanco negativo (fondos oscuros).

**Espacio de protección:** área mínima equivalente a la altura de la "K". En
digital, al menos 24px libres en todas las direcciones.

**Tamaños mínimos:** 120px de ancho en escritorio, 100px en móvil, 32×32px en
favicon.

**Nunca:** rotarlo, deformarlo, cambiarle los colores, agregarle sombras o
contornos, ni ponerlo sobre fondos de bajo contraste.

**Alineación óptica.** El SVG del logotipo trae un 16,4 % de aire interno a la
izquierda. Alinear la caja del archivo con el texto deja la "K" visiblemente
metida hacia dentro. Se compensa aproximadamente el 60 % de ese aire para que
el trazo se lea alineado.

## Errores frecuentes al generar diseño

| ❌ | ✅ | Por qué |
|----|----|---------|
| Azules genéricos (#007BFF, #0066CC) | Púrpura `#8347AD` | Es el color distintivo |
| Proponer varias paletas | Usar la definida | Khipu ya tiene identidad |
| Gradientes complejos | Sólidos o degradados sutiles en púrpura | Simplicidad |
| Arial, Helvetica, Inter | Public Sans | Tipografía oficial |
| Púrpura en fondos grandes | Púrpura en acentos y CTAs | Evita saturación |
| Semánticos como decoración | Sólo donde el dato tiene estado | El color comunica |

## Checklist antes de entregar

- [ ] ¿Usé púrpura Khipu para los elementos de marca?
- [ ] ¿Los semánticos están donde el dato tiene carga de estado?
- [ ] ¿Usé la variante `dark` donde el color va como texto?
- [ ] ¿Verifiqué el contraste contra WCAG 2.1 AA?
- [ ] ¿Public Sans, con máximo 3 pesos por vista?
- [ ] ¿El logotipo respeta variante, tamaño mínimo y espacio de protección?
- [ ] ¿Evité introducir colores que no están en la paleta?

## Directorio de referencia

- `references/identidad-visual.md` — paleta completa con variantes light y
  container, tabla de contraste verificada, justificación de Public Sans,
  variantes de logotipo con sus usos y reglas de aplicación.
