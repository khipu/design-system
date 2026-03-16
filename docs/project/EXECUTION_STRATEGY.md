# Estrategia de Ejecución: Plan de Unificación del Design System
## Escenarios por Tamaño de Equipo

**Fecha:** 2026-03-09
**Basado en:** [UNIFICATION_TASKS.md](./UNIFICATION_TASKS.md) - 22 tareas, 130 puntos

---

## 📊 Análisis de Paralelización

### Tareas por Tipo de Especialización

| Especialización | # Tareas | Puntos | % del Total |
|-----------------|----------|--------|-------------|
| **Design System / Tokens** | 4 | 16 pts | 12% |
| **Frontend Web (React)** | 8 | 49 pts | 38% |
| **Android (Kotlin/Compose)** | 5 | 31 pts | 24% |
| **Cross-platform (Web + Android)** | 1 | 5 pts | 4% |
| **Gobernanza / DevOps** | 4 | 16 pts | 12% |
| **UX/Design** | 2 | 8 pts | 6% |
| **Testing / QA** | 1 | 5 pts | 4% |

### Dependencias Críticas (Path Crítico)

```
UNIF-01 (Auditoría tokens)
    ↓
UNIF-02 (Actualizar tokens DS)
    ↓
UNIF-04 (Tema Android) ← Path crítico Android
    ↓
UNIF-09 (Diseñar API dominio)
    ↓
    ├─→ UNIF-10 (Implementar Web) → UNIF-13 (Migrar Web)
    └─→ UNIF-11 (Implementar Android) → UNIF-14 (Migrar Android)
```

**Tareas Bloqueantes:**
- UNIF-01, UNIF-02, UNIF-04, UNIF-09 (deben hacerse secuencialmente)
- **Total bloqueante:** 18 puntos (~3 semanas con 1 dev)

**Tareas Paralelizables:**
- UNIF-05 a UNIF-08 (Web migration core components)
- UNIF-10 y UNIF-11 (Implementación dominio Web/Android en paralelo)
- UNIF-19 a UNIF-22 (Gobernanza, se pueden hacer en cualquier momento)

---

## 🚀 Escenario 1: Un Solo Desarrollador Full-Stack

### Perfil Requerido
- Experiencia en React + TypeScript
- Experiencia en Kotlin + Jetpack Compose
- Conocimiento de Material UI y Material 3
- Familiaridad con sistemas de diseño

### Timeline: **20-24 semanas** (~5-6 meses)

### Estrategia: Secuencial con Agrupación por Plataforma

#### **Sprint 1-2 (2 semanas): Fundación - Tokens**
**Objetivo:** Establecer la base de tokens unificados

| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-01: Auditoría tokens | 3 | 3 días |
| UNIF-02: Actualizar tokens DS | 5 | 5 días |
| UNIF-03: Validación cross-platform | 3 | 3 días |
| UNIF-04: Actualizar tema Android | 5 | 5 días |

**Entregable:** Tokens sincronizados, design-system v0.2.0 publicado

---

#### **Sprint 3-5 (6 semanas): Componentes Core - Web**
**Objetivo:** Migrar khenshin-web a componentes DS

| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-05: Inventario componentes | 2 | 2 días |
| UNIF-06: Extender Kds* | 8 | 8 días |
| UNIF-07 Fase A: Buttons | 3 | 3 días |
| UNIF-07 Fase B: TextFields | 3 | 3 días |
| UNIF-07 Fase C: Selects, Checkboxes | 3 | 3 días |
| UNIF-07 Fase D: Cards, Alerts, Links | 4 | 4 días |
| UNIF-08: Testing y ajustes | 5 | 5 días |

**Entregable:** khenshin-web usando componentes core del DS

**⚠️ Riesgo:** 28 puntos en una sola persona es intenso. Considerar dividir en 2 releases.

---

#### **Sprint 6-8 (6 semanas): Componentes de Dominio - Diseño e Implementación**
**Objetivo:** Crear componentes específicos de pagos

| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-09: Diseñar API dominio | 5 | 5 días |
| UNIF-10: Implementar Web (6 componentes) | 13 | 10 días |
| UNIF-11: Implementar Android (6 componentes) | 13 | 10 días |
| UNIF-12: Stories y docs | 5 | 5 días |

**Nota:** UNIF-10 y UNIF-11 se hacen secuencialmente (primero Web, luego Android para mantener paridad)

**Entregable:** 6 componentes de dominio en ambas plataformas

---

#### **Sprint 9-10 (4 semanas): Migración a Producción**
**Objetivo:** Integrar componentes de dominio en apps

| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-13: Migrar khenshin-web | 8 | 8 días |
| UNIF-14: Migrar Android SDK | 8 | 8 días |

**Entregable:** Apps en producción usando DS unificado

---

#### **Sprint 11-12 (4 semanas): Pantallas de Resultado + Gobernanza**
**Objetivo:** Completar componentes finales y establecer procesos

| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-15: Diseñar result screens | 3 | 3 días |
| UNIF-16: Implementar Web | 5 | 5 días |
| UNIF-17: Implementar Android | 5 | 5 días |
| UNIF-18: Integrar en apps | 5 | 5 días |
| UNIF-19: Guía contribución | 3 | 2 días |
| UNIF-20: Visual regression | 5 | 3 días |
| UNIF-21: Sync dashboard | 5 | 3 días |
| UNIF-22: Release process | 3 | 2 días |

**Entregable:** Sistema completo con procesos de gobernanza

---

### Ventajas del Escenario 1 Dev
✅ Consistencia total (una sola visión)
✅ Menos overhead de coordinación
✅ Conocimiento profundo de toda la solución

### Desventajas
❌ Timeline largo (5-6 meses)
❌ Riesgo de burnout en sprints intensos
❌ Sin redundancia (si el dev se va, se pierde conocimiento)
❌ Bloqueos por vacaciones/enfermedad

---

## 👥 Escenario 2: Dos Desarrolladores (Web + Android)

### Perfiles Requeridos
- **Dev 1:** Especialista React + TypeScript (Frontend Web)
- **Dev 2:** Especialista Kotlin + Jetpack Compose (Android)
- **Ambos:** Familiaridad con sistemas de diseño

### Timeline: **12-14 semanas** (~3-3.5 meses)

### Estrategia: Paralelización por Plataforma

#### **Sprint 1-2 (2 semanas): Fundación - En Serie**
**Dev 1 (Lead):** Lidera tokens, Dev 2 apoya

| Tarea | Owner | Puntos | Duración |
|-------|-------|--------|----------|
| UNIF-01: Auditoría tokens | Dev 1 | 3 | 3 días |
| UNIF-02: Actualizar tokens DS | Dev 1 | 5 | 5 días |
| UNIF-03: Validación cross-platform | Dev 1 + Dev 2 | 3 | 2 días (paralelo) |
| UNIF-04: Actualizar tema Android | Dev 2 | 5 | 3 días (paralelo con UNIF-02) |

**Sincronización:** Daily standup para alinear cambios en tokens

**Entregable:** Tokens sincronizados, design-system v0.2.0

---

#### **Sprint 3-5 (6 semanas): Trabajo en Paralelo por Plataforma**

**Dev 1 (Web):** Componentes Core + Inventario

| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-05: Inventario componentes | 2 | 2 días |
| UNIF-06: Extender Kds* | 8 | 8 días |
| UNIF-07: Migrar khenshin-web (Fase A-D) | 13 | 10 días |
| UNIF-08: Testing y ajustes | 5 | 5 días |

**Total Dev 1:** 28 puntos

**Dev 2 (Android):** Inicia componentes de dominio Android (preparación)

| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-19: Guía contribución | 3 | 3 días |
| UNIF-20: Visual regression (Android) | 5 | 5 días |
| Preparación: Estudiar componentes Web | - | 10 días |
| Prototipos Android (sin esperar UNIF-09) | - | 7 días |

**Sincronización:** Reunión semanal para alineación

---

#### **Sprint 6-7 (4 semanas): Componentes de Dominio - En Paralelo**

**Dev 1 (Web):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-09: Diseñar API dominio (colaborativo) | 5 | 3 días |
| UNIF-10: Implementar dominio Web | 13 | 10 días |
| UNIF-12: Stories (Web) | 2.5 | 2 días |

**Dev 2 (Android):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-09: Diseñar API dominio (colaborativo) | - | 2 días |
| UNIF-11: Implementar dominio Android | 13 | 10 días |
| UNIF-12: Stories (Android) | 2.5 | 2 días |

**⚡ Clave:** UNIF-09 se hace en conjunto primeros 2 días, luego cada uno implementa en su plataforma en paralelo.

---

#### **Sprint 8-9 (4 semanas): Migración a Producción - En Paralelo**

**Dev 1 (Web):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-13: Migrar khenshin-web | 8 | 8 días |
| UNIF-16: Implementar result screens Web | 5 | 5 días |

**Dev 2 (Android):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-14: Migrar Android SDK | 8 | 8 días |
| UNIF-17: Implementar result screens Android | 5 | 5 días |

**Sincronización:** Daily sync durante migración (cambios pueden afectar ambas apps)

---

#### **Sprint 10 (2 semanas): Finalización**

**Ambos devs:**
| Tarea | Owner | Puntos | Duración |
|-------|-------|--------|----------|
| UNIF-15: Diseñar result screens | Dev 1 + Dev 2 | 3 | 2 días |
| UNIF-18: Integrar result screens | Dev 1 + Dev 2 | 5 | 3 días |
| UNIF-21: Sync dashboard | Dev 1 | 5 | 3 días |
| UNIF-22: Release process | Dev 2 | 3 | 2 días |

**Entregable:** Sistema completo + procesos

---

### Ventajas del Escenario 2 Devs
✅ **Timeline 50% más rápido** (12 semanas vs 24)
✅ Especialización por plataforma (mejor calidad)
✅ Redundancia (conocimiento compartido)
✅ Code reviews cruzados (Web ↔ Android)

### Desventajas
❌ Requiere coordinación (standups, syncs)
❌ Riesgo de divergencia si no se alinean
❌ Overhead de comunicación (~10-15% del tiempo)

### Recomendaciones para 2 Devs
- **Daily standup** de 15 min (imprescindible)
- **Semanal:** Sync de 1h para alineación técnica
- **Herramientas:** Slack channel dedicado, PRs cruzados
- **Definir contratos de API** antes de implementar (UNIF-09 crítico)

---

## 👨‍👩‍👧‍👦 Escenario 3: Equipo Completo (4-5 personas)

### Perfiles Requeridos
- **Dev 1:** Frontend Lead (React/TypeScript) - Tokens + Web Core
- **Dev 2:** Frontend Engineer (React) - Web Migration + Domain
- **Dev 3:** Android Lead (Kotlin/Compose) - Android Core + Domain
- **Dev 4:** DevOps/QA Engineer - Testing, CI/CD, Gobernanza
- **Dev 5 (opcional):** UX Engineer - Diseño API, Stories, Docs

### Timeline: **8-10 semanas** (~2-2.5 meses)

### Estrategia: Paralelización Máxima por Workstream

#### **Sprint 1 (2 semanas): Fundación Paralela**

**Dev 1 (Frontend Lead):**
| Tarea | Puntos | Días |
|-------|--------|------|
| UNIF-01: Auditoría tokens | 3 | 3 |
| UNIF-02: Actualizar tokens DS | 5 | 5 |
| UNIF-03: Validación (parte Web) | 1.5 | 2 |

**Dev 2 (Frontend Eng):**
| Tarea | Puntos | Días |
|-------|--------|------|
| UNIF-05: Inventario componentes | 2 | 2 |
| UNIF-19: Guía contribución | 3 | 3 |
| Preparar migraciones | - | 5 |

**Dev 3 (Android Lead):**
| Tarea | Puntos | Días |
|-------|--------|------|
| UNIF-04: Actualizar tema Android | 5 | 5 |
| UNIF-03: Validación (parte Android) | 1.5 | 2 |
| Preparar componentes Android | - | 3 |

**Dev 4 (DevOps/QA):**
| Tarea | Puntos | Días |
|-------|--------|------|
| UNIF-20: Visual regression setup | 5 | 5 |
| UNIF-22: Release process | 3 | 3 |
| CI/CD improvements | - | 2 |

**Dev 5 (UX Engineer):** *Opcional*
| Tarea | Puntos | Días |
|-------|--------|------|
| UNIF-09: Diseñar API dominio | 5 | 5 |
| Preparar specs Figma | - | 5 |

**Sincronización:** Daily standup 15 min + Demo viernes

---

#### **Sprint 2-3 (4 semanas): Componentes Core + Dominio en Paralelo**

**Dev 1 (Frontend Lead):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-06: Extender Kds* | 8 | 8 días |
| UNIF-10: Implementar dominio Web (50%) | 6.5 | 6 días |

**Dev 2 (Frontend Eng):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-07: Migrar khenshin-web Fase A-B | 6 | 6 días |
| UNIF-10: Implementar dominio Web (50%) | 6.5 | 6 días |

**Dev 3 (Android Lead):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-11: Implementar dominio Android | 13 | 12 días |

**Dev 4 (DevOps/QA):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-08: Testing y ajustes (Web) | 5 | 5 días (async) |
| UNIF-21: Sync dashboard | 5 | 5 días |
| Monitoreo CI/CD | - | 2 días |

**Dev 5 (UX Engineer):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-12: Stories y docs | 5 | 10 días |
| UNIF-15: Diseñar result screens | 3 | 3 días |

**Sincronización:** Bi-weekly planning + Retrospectiva

---

#### **Sprint 4-5 (4 semanas): Migración y Finalización**

**Dev 1 (Frontend Lead):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-07: Migrar khenshin-web Fase C-D | 7 | 7 días |
| UNIF-13: Migrar khenshin-web dominio | 8 | 8 días (con Dev 2) |

**Dev 2 (Frontend Eng):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-13: Migrar khenshin-web dominio | - | 8 días (pair con Dev 1) |
| UNIF-16: Result screens Web | 5 | 5 días |
| UNIF-18: Integrar result screens Web | 2.5 | 2 días |

**Dev 3 (Android Lead):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| UNIF-14: Migrar Android SDK | 8 | 8 días |
| UNIF-17: Result screens Android | 5 | 5 días |
| UNIF-18: Integrar result screens Android | 2.5 | 2 días |

**Dev 4 (DevOps/QA):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| Testing end-to-end Web | - | 5 días |
| Testing end-to-end Android | - | 5 días |
| Performance testing | - | 3 días |
| Deployment automation | - | 2 días |

**Dev 5 (UX Engineer):**
| Tarea | Puntos | Duración |
|-------|--------|----------|
| Documentación final | - | 5 días |
| Video tutoriales | - | 3 días |
| Knowledge sharing sessions | - | 2 días |

**Entregable:** Sistema completo en producción

---

### Ventajas del Escenario 3 (Equipo Completo)
✅ **Timeline mínimo** (8-10 semanas)
✅ Especialización máxima (mejor calidad)
✅ Testing y QA dedicado (menos bugs)
✅ Documentación completa desde el inicio
✅ Knowledge sharing (todo el equipo entiende el sistema)

### Desventajas
❌ **Costo alto** (4-5 salarios)
❌ Overhead de coordinación significativo (~20% del tiempo)
❌ Riesgo de conflictos en código (requiere Git discipline)
❌ Necesita PM/Scrum Master para coordinar

### Recomendaciones para Equipo Completo
- **Scrum Master dedicado** (puede ser Dev 4 part-time)
- **Daily standup** 15 min (obligatorio)
- **Planning poker** para refinamiento
- **PRs:** Requiere 2 aprobaciones antes de merge
- **Feature flags** para deploys independientes
- **Mono-repo strategy** con CODEOWNERS

---

## 📊 Comparación de Escenarios

| Aspecto | 1 Dev | 2 Devs | 4-5 Devs |
|---------|-------|--------|----------|
| **Timeline** | 20-24 semanas | 12-14 semanas | 8-10 semanas |
| **Costo** (salary × time) | 1x | 1.4x | 2x |
| **Calidad** | Alta (consistencia) | Muy alta | Máxima |
| **Riesgo de Burnout** | Alto | Medio | Bajo |
| **Overhead Coordinación** | 0% | 10-15% | 20-25% |
| **Conocimiento Distribuido** | Bajo (1 persona) | Medio (2) | Alto (4-5) |
| **Velocidad Inicial** | Rápida | Media | Lenta (setup) |
| **Mantenimiento Post-Launch** | Riesgoso | Medio | Sostenible |

---

## 🎯 Recomendación por Contexto

### Elige **1 Dev** si:
- Presupuesto limitado
- No hay urgencia (6 meses es aceptable)
- Tienes un full-stack muy senior (8+ años exp)
- Es un proyecto personal o startup pequeña

### Elige **2 Devs** si: ⭐ **RECOMENDADO PARA KHIPU**
- Necesitas balance costo/velocidad
- Tienes especialistas Web y Android disponibles
- Timeline objetivo: 3 meses
- Puedes dedicar 10-15% a coordinación
- Quieres redundancia sin overhead excesivo

### Elige **4-5 Devs** si:
- Urgencia máxima (need to launch en 2 meses)
- Presupuesto amplio
- Equipo grande de ingeniería ya existente
- Tienes PM/Scrum Master disponible
- Valoras testing y documentación de primera

---

## 🛠️ Herramientas de Coordinación Recomendadas

### Para 2 Devs
- **Jira:** Tracking de tareas
- **Slack:** Canal #design-system-unification
- **GitHub:** PRs con templates, CODEOWNERS
- **Loom:** Videos asincrónicos para explicar cambios complejos
- **Figma:** Specs de diseño
- **Storybook:** Preview de componentes

### Para 4-5 Devs (añadir a lo anterior)
- **Miro/Mural:** Planning y retrospectivas
- **Notion:** Documentación centralizada
- **Chromatic:** Visual regression automatizado
- **Datadog/Sentry:** Monitoreo de errores
- **Linear:** (alternativa más rápida que Jira)

---

## 📅 Hitos Clave (Independientemente del Escenario)

| Hito | Descripción | Impacto |
|------|-------------|---------|
| **M1: Tokens Sincronizados** | design-system v0.2.0 publicado con tokens unificados | Bloquea todo lo demás |
| **M2: Web Core Migrada** | khenshin-web usa Kds* components | 80% del valor para Web |
| **M3: API Dominio Definida** | Specs de BankSelect, OtpComponent, etc. | Permite trabajo paralelo |
| **M4: Componentes Dominio Listos** | 6 componentes en ambas plataformas | Desbloquea migración |
| **M5: Producción Unificada** | Ambas apps usando DS en prod | Go-live |

---

## ⚡ Quick Wins (Primeros 30 días)

Independientemente del escenario, prioriza estas tareas para mostrar valor rápido:

1. **UNIF-01 + UNIF-02:** Tokens sincronizados (1 semana)
   - **Impacto visible:** Botones, colores, tipografía consistentes

2. **UNIF-07 Fase A:** Migrar solo Buttons (3 días)
   - **Impacto:** ~30% de la UI de khenshin-web se ve mejor

3. **UNIF-04:** Actualizar tema Android (3 días)
   - **Impacto:** Android usa color correcto

4. **UNIF-19:** Guía de contribución (2 días)
   - **Impacto:** Proceso claro para el equipo

**Total Quick Wins:** ~15 días, ~20 puntos, **demuestra viabilidad del proyecto**

---

## 🚨 Riesgos y Mitigaciones por Escenario

### 1 Dev
**Riesgo:** Burnout en sprints de 28 puntos
**Mitigación:** Dividir Epic 2 en 2 releases, incluir buffers de 20%

### 2 Devs
**Riesgo:** Divergencia de implementación Web ↔ Android
**Mitigación:** Design reviews semanales, contratos de API escritos, pair programming en UNIF-09

### 4-5 Devs
**Riesgo:** Merge conflicts constantes
**Mitigación:** Feature branches cortas (<3 días), CI con pre-merge tests, CODEOWNERS estricto

---

## 📝 Próximo Paso: Decidir Escenario

**Pregunta para el equipo:**
1. ¿Cuántos desarrolladores se pueden dedicar full-time?
2. ¿Cuál es el timeline objetivo? (2 meses / 3 meses / 6 meses)
3. ¿Hay presupuesto para especialistas (Web + Android + QA)?

**Una vez decidido, puedo:**
- Crear los 22 tickets en Jira con asignaciones específicas
- Generar el calendario detallado con fechas
- Preparar el kickoff deck para el equipo

---

**Autor:** Claude Code
**Última actualización:** 2026-03-09
