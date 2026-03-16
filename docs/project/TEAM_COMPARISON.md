# Comparación de Escenarios de Equipo - Vista Ejecutiva

**Objetivo:** Facilitar la decisión sobre el tamaño óptimo del equipo para el proyecto de unificación del Design System.

---

## 🎯 Decisión Rápida

| Si tu prioridad es... | Elige... | Timeline | Costo |
|----------------------|----------|----------|-------|
| **Minimizar costo** | 1 Dev Full-Stack | 5-6 meses | $ |
| **Balance costo/velocidad** ⭐ | 2 Devs (Web + Android) | 3 meses | $$ |
| **Velocidad máxima** | 4-5 Devs (Equipo completo) | 2 meses | $$$$ |

---

## 📊 Tabla Comparativa Completa

| Criterio | 1 Dev Full-Stack | 2 Devs Especializados ⭐ | 4-5 Devs (Equipo) |
|----------|------------------|-------------------------|-------------------|
| **Timeline** | 20-24 semanas | 12-14 semanas | 8-10 semanas |
| **Costo Total** | 1x (baseline) | 1.4x | 2x |
| **Costo por Semana** | Bajo | Medio | Alto |
| **Velocidad Inicial** | Alta (no setup) | Media | Baja (coordinación) |
| **Calidad de Código** | Alta | Muy alta | Máxima |
| **Cobertura de Tests** | Básica (manual) | Media (automatizada) | Alta (QA dedicado) |
| **Documentación** | Básica | Buena | Excelente |
| **Riesgo de Burnout** | 🔴 Alto | 🟡 Medio | 🟢 Bajo |
| **Bus Factor** | 🔴 1 (riesgoso) | 🟡 2 | 🟢 4-5 |
| **Overhead Coordinación** | 0% | 10-15% | 20-25% |
| **Knowledge Sharing** | ❌ Centralizado | 🟡 Medio | ✅ Distribuido |
| **Mantenimiento Post-Launch** | 🔴 Riesgoso | 🟡 Manejable | 🟢 Sostenible |
| **Adaptabilidad** | Alta (1 persona decide) | Media | Baja (consenso) |
| **Code Review Quality** | ❌ Auto-review | ✅ Cruzado Web↔Android | ✅✅ Multi-reviewer |

---

## 💰 Análisis de ROI

### Escenario 1: 1 Dev ($100k/año salario ejemplo)

| Métrica | Valor |
|---------|-------|
| Duración | 24 semanas |
| Costo de salario | $46k (24/52 × $100k) |
| Overhead coordinación | $0 |
| **Costo total** | **$46k** |
| Time-to-market | 6 meses |
| Riesgo de retraso | Alto (30% probabilidad de +4 semanas) |
| Costo esperado | $54k (con retraso) |

---

### Escenario 2: 2 Devs ⭐ RECOMENDADO

| Métrica | Valor |
|---------|-------|
| Duración | 14 semanas |
| Costo de salario (2 devs) | $54k (14/52 × $100k × 2) |
| Overhead coordinación | $5k (reuniones, alineación) |
| Herramientas (Chromatic, etc.) | $2k |
| **Costo total** | **$61k** |
| Time-to-market | 3.5 meses |
| Riesgo de retraso | Medio (15% probabilidad de +2 semanas) |
| Costo esperado | $65k (con retraso) |

**ROI vs 1 Dev:**
- **+33% costo** pero **-42% tiempo**
- Llega al mercado **2.5 meses antes**
- Menor riesgo de fracaso (redundancia)

---

### Escenario 3: 4-5 Devs

| Métrica | Valor |
|---------|-------|
| Duración | 10 semanas |
| Costo de salario (4.5 devs promedio) | $87k (10/52 × $100k × 4.5) |
| Overhead coordinación | $17k (20% del tiempo) |
| PM/Scrum Master (0.5 FTE) | $10k |
| Herramientas (CI/CD, monitoreo) | $5k |
| **Costo total** | **$119k** |
| Time-to-market | 2.5 meses |
| Riesgo de retraso | Bajo (5% probabilidad de +1 semana) |
| Costo esperado | $122k (con retraso) |

**ROI vs 2 Devs:**
- **+95% costo** pero solo **-29% tiempo**
- Llega al mercado **1 mes antes**
- Mejor para organizaciones con timeline crítico

---

## 🏆 Recomendación para Khipu

### Contexto Khipu
- Empresa mediana (fintech)
- Múltiples apps en producción (khenshin-web, Android SDK)
- Impacto en usuarios finales alto
- Necesidad de consistencia de marca

### ⭐ **Recomendación: 2 Devs (Web + Android)**

**Justificación:**

1. **Balance óptimo costo/beneficio**
   - Solo +33% costo vs 1 dev
   - Pero -42% tiempo (3.5 meses vs 6 meses)

2. **Especialización**
   - Dev Web: Experto en React/MUI puede migrar khenshin-web rápido
   - Dev Android: Experto en Compose puede implementar componentes Android nativos

3. **Redundancia sin overhead excesivo**
   - Si un dev está enfermo/vacaciones, el otro puede continuar
   - Code reviews cruzados mejoran calidad
   - Overhead de coordinación manejable (10-15%)

4. **Timeline aceptable**
   - 3.5 meses es razonable para un proyecto de esta magnitud
   - No requiere rush (menor probabilidad de bugs)

5. **Sostenibilidad post-launch**
   - 2 personas conocen el sistema completo
   - Mantenimiento distribuido
   - Bus factor aceptable

---

## 📅 Timeline Visual por Escenario

### 1 Dev (24 semanas)
```
Sprint 1-2  | Tokens        | ██████
Sprint 3-5  | Web Core      | ████████████
Sprint 6-8  | Domain        | ████████████
Sprint 9-10 | Migration     | ████████
Sprint 11-12| Results+Gov   | ████████
                            └────────────────────── 6 meses
```

### 2 Devs (14 semanas) ⭐
```
Sprint 1-2  | Tokens (ambos)                    | ████
Sprint 3-5  | Web Core (Dev1) | Domain Prep (Dev2) | ██████████
Sprint 6-7  | Domain (paralelo)                  | ████████
Sprint 8-9  | Migration (paralelo)               | ████████
Sprint 10   | Finalization (ambos)              | ████
                                                └─────── 3.5 meses
```

### 4-5 Devs (10 semanas)
```
Sprint 1   | Tokens | Web Prep | Android | DevOps | UX | ████
Sprint 2-3 | Web    | Web      | Android | QA     | Docs | ████████
Sprint 4-5 | Web    | Web      | Android | QA     | Docs | ████████
                                                  └── 2.5 meses
```

---

## 🎯 Matriz de Decisión

### Elige **1 Dev** si respondes SÍ a mayoría:

- [ ] El timeline de 6 meses es aceptable
- [ ] El presupuesto es muy limitado (<$50k)
- [ ] Tienes un full-stack senior disponible (8+ años exp)
- [ ] El proyecto no es crítico para el negocio
- [ ] No hay presión de stakeholders por velocidad
- [ ] Puedes tolerar riesgo de retraso

**Puntuación:** ___/6

---

### Elige **2 Devs** si respondes SÍ a mayoría: ⭐

- [ ] Necesitas balance entre costo y velocidad
- [ ] Timeline objetivo: 3-4 meses
- [ ] Tienes especialistas Web y Android disponibles
- [ ] El proyecto impacta múltiples equipos
- [ ] Puedes dedicar 10-15% del tiempo a coordinación
- [ ] Valoras redundancia (bus factor 2)

**Puntuación:** ___/6

---

### Elige **4-5 Devs** si respondes SÍ a mayoría:

- [ ] Timeline crítico: necesitas lanzar en 2 meses
- [ ] El presupuesto no es una restricción
- [ ] Tienes equipo de ingeniería grande (10+ personas)
- [ ] Tienes PM/Scrum Master disponible
- [ ] Valoras testing exhaustivo desde día 1
- [ ] El proyecto es estratégico (CEO/CTO están involucrados)

**Puntuación:** ___/6

---

## 📞 Siguiente Paso

### Para decidir, responde estas 3 preguntas:

1. **¿Cuál es el timeline ideal?**
   - [ ] 6 meses (flexible)
   - [ ] 3-4 meses (preferido)
   - [ ] 2 meses (crítico)

2. **¿Cuántos devs pueden dedicarse full-time?**
   - [ ] 1 (o 2 part-time)
   - [ ] 2 especialistas
   - [ ] 4-5 (equipo completo)

3. **¿Cuál es el presupuesto aprobado?**
   - [ ] <$60k
   - [ ] $60k-$80k
   - [ ] >$100k

---

### 💡 Decisión Recomendada para Khipu:

Basándome en que Khipu es una empresa de pagos con múltiples apps en producción:

**→ 2 Desarrolladores (Web + Android)**

**Perfiles sugeridos:**
- **Dev 1:** Senior Frontend (React/TypeScript) - 7+ años
- **Dev 2:** Senior Android (Kotlin/Compose) - 7+ años

**Setup inicial (Semana 0):**
- Kickoff meeting con ambos devs
- Asignar tareas de Epic 1 (Tokens)
- Configurar Slack channel + Jira board
- Definir horario de daily standups

**¿Quieres que genere el plan detallado de 14 semanas con asignaciones específicas?**

---

**Autor:** Claude Code
**Última actualización:** 2026-03-09
