# Ejemplos de Componentes - Khipu Design System

Ejemplos completos y listos para copiar de los componentes más utilizados en el tour de onboarding.

---

## 📋 Tabla de Contenidos

1. [Estructura de Página de Etapa](#estructura-de-página-de-etapa)
2. [Header del Tour](#header-del-tour)
3. [Cards de Selección](#cards-de-selección)
4. [Formularios](#formularios)
5. [Progress Bar](#progress-bar)
6. [Botones](#botones)
7. [Alerts y Notificaciones](#alerts-y-notificaciones)
8. [Cards de Planes](#cards-de-planes)
9. [CTA de Contacto](#cta-de-contacto)
10. [Estados de Carga](#estados-de-carga)

---

## 1. Estructura de Página de Etapa

### Página Completa con Formulario

```tsx
import { useState } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';

export function StageExample() {
  const [country, setCountry] = useState('');

  const handleNext = () => {
    if (country) {
      // Lógica para continuar
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Título de Etapa */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Etapa 1: Información Inicial
        </h2>
        <p className="text-gray-600">
          Completa la información para comenzar tu proceso de activación
        </p>
      </div>

      {/* Contenido - Cards de Formulario */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
            <MapPin className="w-5 h-5 text-blue-600" />
            Selecciona tu país
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Selecciona un país</option>
            <option value="chile">🇨🇱 Chile</option>
            <option value="peru" disabled>🇵🇪 Perú (Próximamente)</option>
            <option value="colombia" disabled>🇨🇴 Colombia (Próximamente)</option>
          </select>
        </div>
      </div>

      {/* Botón de Acción */}
      <button
        onClick={handleNext}
        disabled={!country}
        className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
          country
            ? 'bg-blue-600 hover:bg-blue-700 text-white'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        Continuar
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
```

---

## 2. Header del Tour

### Header Completo con Logo y Acciones

```tsx
import { HelpCircle, RotateCcw } from 'lucide-react';

export function TourHeader() {
  const handleRestart = () => {
    // Lógica de reinicio
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Título */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">K</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Khipu</h1>
              <p className="text-xs text-gray-500">Activación de cuenta</p>
            </div>
          </div>

          {/* Acciones */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRestart}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title="Reiniciar tour"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
            <a
              href="#"
              className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <HelpCircle className="w-5 h-5" />
              <span className="font-medium">Ayuda</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
```

---

## 3. Cards de Selección

### Cards de Tipo de Persona (Natural/Jurídica)

```tsx
import { useState } from 'react';
import { User, Building2, Check } from 'lucide-react';

type PersonType = 'natural' | 'juridica' | null;

export function PersonTypeSelector() {
  const [personType, setPersonType] = useState<PersonType>(null);

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200">
      <label className="text-lg font-semibold text-gray-900 mb-4 block">
        Tipo de cuenta
      </label>
      
      <div className="grid md:grid-cols-2 gap-4">
        {/* Persona Natural */}
        <button
          onClick={() => setPersonType('natural')}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            personType === 'natural'
              ? 'border-blue-600 bg-blue-50 shadow-md'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Persona Natural
          </h3>
          <p className="text-sm text-gray-600">
            Para emprendedores y freelancers que operan como personas naturales
          </p>
          {personType === 'natural' && (
            <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium text-sm">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              Seleccionado
            </div>
          )}
        </button>

        {/* Persona Jurídica */}
        <button
          onClick={() => setPersonType('juridica')}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            personType === 'juridica'
              ? 'border-blue-600 bg-blue-50 shadow-md'
              : 'border-gray-200 hover:border-gray-300 bg-white'
          }`}
        >
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Building2 className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Persona Jurídica
          </h3>
          <p className="text-sm text-gray-600">
            Para empresas y negocios constituidos legalmente
          </p>
          {personType === 'juridica' && (
            <div className="mt-4 flex items-center gap-2 text-blue-600 font-medium text-sm">
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" strokeWidth={3} />
              </div>
              Seleccionado
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
```

---

## 4. Formularios

### Formulario con Inputs y Labels

```tsx
import { useState } from 'react';
import { User, Mail, Phone, MapPin } from 'lucide-react';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';

export function ProfileForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: ''
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Campo de Nombre */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
          <User className="w-5 h-5 text-blue-600" />
          Nombre completo
        </label>
        <Input
          type="text"
          placeholder="Ingresa tu nombre completo"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-2">
          Tal como aparece en tu documento de identidad
        </p>
      </div>

      {/* Campo de Email */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
          <Mail className="w-5 h-5 text-blue-600" />
          Correo electrónico
        </label>
        <Input
          type="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>

      {/* Campo de Teléfono */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
          <Phone className="w-5 h-5 text-blue-600" />
          Teléfono de contacto
        </label>
        <Input
          type="tel"
          placeholder="+56 9 1234 5678"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>

      {/* Select de País */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <label className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          País
        </label>
        <select
          value={formData.country}
          onChange={(e) => handleChange('country', e.target.value)}
          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Selecciona tu país</option>
          <option value="chile">🇨🇱 Chile</option>
          <option value="peru">🇵🇪 Perú</option>
          <option value="colombia">🇨🇴 Colombia</option>
        </select>
      </div>
    </div>
  );
}
```

---

## 5. Progress Bar

### Barra de Progreso Completa

```tsx
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStage: number;
  totalStages: number;
}

export function ProgressBar({ currentStage, totalStages }: ProgressBarProps) {
  const stages = ['Inicio', 'Perfil', 'Datos', 'Banco', 'Plan', 'Contrato'];

  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {stages.map((stage, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center relative">
                {/* Círculo de Estado */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    index < currentStage
                      ? 'bg-green-500 text-white'
                      : index === currentStage
                      ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {index < currentStage ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                
                {/* Label del Paso */}
                <span
                  className={`text-xs mt-2 font-medium whitespace-nowrap ${
                    index <= currentStage ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {stage}
                </span>
              </div>
              
              {/* Línea Conectora */}
              {index < stages.length - 1 && (
                <div className="flex-1 h-0.5 mx-2 relative -top-5">
                  <div
                    className={`h-full transition-all ${
                      index < currentStage ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

---

## 6. Botones

### Colección de Botones Estándar

```tsx
import { ArrowRight, Download, Trash2, HelpCircle } from 'lucide-react';

export function ButtonExamples() {
  return (
    <div className="space-y-4">
      {/* Botón Principal (CTA Grande) */}
      <button className="w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white transition-all">
        Continuar
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Botón Deshabilitado */}
      <button 
        disabled 
        className="w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 bg-gray-200 text-gray-400 cursor-not-allowed"
      >
        Continuar
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Botón Secundario */}
      <button className="w-full py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-all">
        <Download className="w-5 h-5" />
        Descargar Documento
      </button>

      {/* Botón Destructivo */}
      <button className="py-2 px-4 rounded-lg font-medium flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white transition-all">
        <Trash2 className="w-4 h-4" />
        Eliminar
      </button>

      {/* Botón de Ayuda (Header Style) */}
      <button className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
        <HelpCircle className="w-5 h-5" />
        <span className="font-medium">Ayuda</span>
      </button>

      {/* Botón Ícono Solamente */}
      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
        <HelpCircle className="w-5 h-5" />
      </button>
    </div>
  );
}
```

---

## 7. Alerts y Notificaciones

### Diferentes Tipos de Alerts

```tsx
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function AlertExamples() {
  return (
    <div className="space-y-4">
      {/* Alert de Éxito */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-green-900 mb-1">
              Operación Exitosa
            </h4>
            <p className="text-sm text-green-700">
              Tu información se ha guardado correctamente. Puedes continuar con el siguiente paso.
            </p>
          </div>
          <button className="text-green-600 hover:text-green-800">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Alert de Advertencia */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-yellow-900 mb-1">
              Atención Requerida
            </h4>
            <p className="text-sm text-yellow-700">
              Algunos campos requieren tu atención antes de continuar.
            </p>
          </div>
        </div>
      </div>

      {/* Alert de Información */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Info className="w-6 h-6 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-blue-900 mb-1">
              Información Importante
            </h4>
            <p className="text-sm text-blue-700">
              El proceso de validación puede tomar hasta 24 horas hábiles.
            </p>
          </div>
        </div>
      </div>

      {/* Alert de Error */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <X className="w-6 h-6 text-red-600 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="font-semibold text-red-900 mb-1">
              Error en la Operación
            </h4>
            <p className="text-sm text-red-700">
              No se pudo completar la operación. Por favor, intenta nuevamente.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 8. Cards de Planes

### Card de Plan de Precios

```tsx
import { CheckCircle2 } from 'lucide-react';
import { Button } from './components/ui/button';

interface PricingPlanProps {
  name: string;
  description: string;
  price: string;
  priceDetail: string;
  features: string[];
  recommended?: boolean;
  selected?: boolean;
  onSelect: () => void;
}

export function PricingPlanCard({
  name,
  description,
  price,
  priceDetail,
  features,
  recommended = false,
  selected = false,
  onSelect
}: PricingPlanProps) {
  return (
    <div
      className={`rounded-xl p-6 relative transition-all ${
        selected
          ? 'border-2 border-blue-600 bg-blue-50 shadow-lg'
          : 'border-2 border-gray-200 bg-white hover:border-gray-300'
      }`}
    >
      {/* Badge Recomendado */}
      {recommended && (
        <div className="absolute -top-3 left-6">
          <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
            RECOMENDADO
          </span>
        </div>
      )}

      {/* Nombre del Plan */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2 mt-2">
        {name}
      </h3>
      
      {/* Descripción */}
      <p className="text-gray-600 mb-4">{description}</p>

      {/* Precio */}
      <div className="flex items-baseline gap-2 mb-6">
        <span className="text-4xl font-bold text-gray-900">{price}</span>
        <span className="text-gray-600">{priceDetail}</span>
      </div>

      {/* Características */}
      <ul className="space-y-3 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Botón de Selección */}
      <Button 
        onClick={onSelect}
        className="w-full"
        variant={selected ? 'default' : 'outline'}
      >
        {selected ? 'Plan Seleccionado' : 'Seleccionar Plan'}
      </Button>
    </div>
  );
}

// Uso del componente
export function PricingExample() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <PricingPlanCard
        name="Starter"
        description="Ideal para comenzar"
        price="2.9%"
        priceDetail="+ $150 por transacción"
        features={[
          'Hasta 100 transacciones/mes',
          'Soporte por email',
          'Dashboard básico'
        ]}
        selected={selectedPlan === 'starter'}
        onSelect={() => setSelectedPlan('starter')}
      />
      
      <PricingPlanCard
        name="Professional"
        description="Para negocios en crecimiento"
        price="2.5%"
        priceDetail="+ $100 por transacción"
        features={[
          'Transacciones ilimitadas',
          'Soporte prioritario',
          'Dashboard avanzado',
          'API access'
        ]}
        recommended
        selected={selectedPlan === 'professional'}
        onSelect={() => setSelectedPlan('professional')}
      />
      
      <PricingPlanCard
        name="Enterprise"
        description="Soluciones personalizadas"
        price="Contactar"
        priceDetail="Precio personalizado"
        features={[
          'Todo lo de Professional',
          'Account manager dedicado',
          'SLA garantizado',
          'Integraciones custom'
        ]}
        selected={selectedPlan === 'enterprise'}
        onSelect={() => setSelectedPlan('enterprise')}
      />
    </div>
  );
}
```

---

## 9. CTA de Contacto

### Call-to-Action de Contacto

```tsx
import { HelpCircle, Mail, Phone } from 'lucide-react';
import { Button } from './components/ui/button';

export function ContactCTA() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-8 text-center">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <HelpCircle className="w-8 h-8 text-blue-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        ¿Tienes dudas?
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md mx-auto">
        Nuestro equipo está aquí para ayudarte a elegir el mejor plan para tu negocio
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button className="gap-2">
          <Mail className="w-5 h-5" />
          Enviar email
        </Button>
        
        <Button variant="outline" className="gap-2">
          <Phone className="w-5 h-5" />
          Llamar ahora
        </Button>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Horario de atención: Lun-Vie 9:00-18:00
      </p>
    </div>
  );
}
```

---

## 10. Estados de Carga

### Skeleton Loading States

```tsx
export function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      {/* Card Skeleton */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="animate-pulse">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-5 h-5 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="space-y-3">
            <div className="h-9 bg-gray-200 rounded-lg"></div>
            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
          </div>
        </div>
      </div>

      {/* Button Skeleton */}
      <div className="h-14 bg-gray-200 rounded-xl animate-pulse"></div>
    </div>
  );
}

// Spinner de Carga
export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );
}

// Estado de Carga con Texto
export function LoadingState({ message = 'Cargando...' }: { message?: string }) {
  return (
    <div className="text-center py-12">
      <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
```

---

## 🎯 Checklist de Implementación

Al implementar estos componentes, asegúrate de:

- ✅ Importar los íconos necesarios de `lucide-react`
- ✅ Usar las clases de Tailwind exactamente como se muestran
- ✅ Implementar todos los estados (hover, focus, disabled)
- ✅ Incluir transiciones (`transition-all` o `transition-colors`)
- ✅ Mantener accesibilidad (labels, aria-attributes)
- ✅ Usar TypeScript para props cuando sea posible
- ✅ Implementar responsive design con breakpoints (`md:`, `sm:`)
- ✅ Agregar validaciones y manejo de errores

---

## 📚 Recursos Relacionados

- [Sistema de Diseño Completo](/DESIGN_SYSTEM.md)
- [Guía Rápida](/QUICK_REFERENCE.md)
- [Showcase Interactivo](/?showcase)

---

**Última actualización:** Marzo 2026
