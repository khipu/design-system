import { useState } from 'react';
import { ArrowRight, ArrowLeft, DollarSign, Check } from 'lucide-react';

interface StagePricingPlanProps {
  onNext: (data: any) => void;
  onBack: () => void;
  formData?: any;
  personType?: 'natural' | 'juridica';
}

export function StagePricingPlan({ onNext, onBack, formData, personType }: StagePricingPlanProps) {
  const [selectedPlan, setSelectedPlan] = useState('');

  const serviceInterest = formData?.serviceInterest || '';
  const isPagosInstantaneos = serviceInterest === 'Pagos instantáneos';
  const isPagosAutomaticos = serviceInterest === 'Pagos automáticos';
  const isWebScraping = serviceInterest === 'Web scrapping as service';

  // Planes para Pagos Instantáneos
  const instantPaymentPlans = [
    {
      id: 'plan-porcentual',
      name: 'Tarifa porcentual',
      title: '0.69% + IVA',
      subtitle: 'Sobre el monto recaudado',
      rate: '0.69% + IVA',
      description: 'Sobre el monto recaudado',
      features: [
        'Transferencias desde todos los bancos',
        'API sin integración RUT',
        'API sin integración',
        'Plugins para auto-captadores',
        'Reportería online',
        'Informes diarios y mensuales',
        'Rendición al dia hábil siguiente'
      ],
      recommended: false,
      footer: 'Descuentos por volumen'
    },
    {
      id: 'plan-fija',
      name: 'Tarifa fija',
      title: '0.0105UF + IVA',
      subtitle: 'Por transacciones',
      rate: '0.0105UF + IVA',
      description: 'Por transacción',
      features: [
        'Transferencias desde todos los bancos',
        'API sin integración RUT',
        'API sin integración',
        'Plugins para auto-captadores',
        'Reportería online',
        'Informes diarios y mensuales',
        'Rendición al dia hábil siguiente'
      ],
      recommended: false,
      footer: 'Descuentos por volumen'
    }
  ];

  // Plan para Pagos Automáticos
  const automaticPaymentPlans = [
    {
      id: 'plan-suscripcion',
      name: 'Solo suscripción',
      title: 'UF 0,0555 + IVA',
      subtitle: 'Pago automático desde cuenta bancaria personal',
      rate: 'UF 0,0555 + IVA',
      description: 'Por transacción',
      features: [
        'Pago automático desde las bancas',
        'Banca personal',
        'Plugins para suscripción',
        'API sin integración',
        'Herramientas de auditoria',
        'Descuentos por volumen en transacciones'
      ],
      recommended: false,
      footer: ''
    }
  ];

  // Plan único para Web Scraping as a Service
  const webScrapingPlans = [
    {
      id: 'plan-khipu-datos',
      name: 'Plan Khipu Datos',
      title: '1 UF fija por fuente',
      subtitle: 'Consumo de endpoints desde 0.01072 UF + IVA',
      rate: '1 UF',
      description: 'Por fuente + consumo',
      features: [
        '1 UF fija por fuente',
        'Consumo de endpoints desde 0.01072 UF + IVA',
        'Cobro según consumo por tramo',
        'Descuentos por número de endpoints',
        'Reporte de consumo básico',
        'Fuentes adicionales: 1 UF/mes c/u'
      ],
      recommended: true,
      footer: 'Plan único para servicio WaaS'
    }
  ];

  // Planes por defecto (para otros servicios)
  const defaultPlans = [
    {
      id: 'plan-a',
      name: 'Plan A',
      title: 'Tarifa porcentual',
      subtitle: 'Ideal para negocios con ventas variables',
      rate: '2.9% + $150',
      description: 'Por cada transacción exitosa',
      features: [
        'Sin costos mensuales fijos',
        'Comisión por venta realizada',
        'Ideal para bajos volúmenes',
        'Sin compromisos a largo plazo',
        'Soporte estándar incluido'
      ],
      recommended: false
    },
    {
      id: 'plan-b',
      name: 'Plan B',
      title: 'Tarifa fija',
      subtitle: 'Perfecto para alto volumen de transacciones',
      rate: '$29.990',
      description: 'Mensuales + $99 por transacción',
      features: [
        'Tarifa fija mensual',
        'Costo reducido por transacción',
        'Ideal para alto volumen',
        'Reportes avanzados',
        'Soporte prioritario'
      ],
      recommended: true
    }
  ];

  const plans = isPagosInstantaneos
    ? instantPaymentPlans
    : isPagosAutomaticos
    ? automaticPaymentPlans
    : isWebScraping
    ? webScrapingPlans
    : defaultPlans;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPlan) {
      onNext({ plan: selectedPlan });
    }
  };

  return (
    <div className={`mx-auto ${isWebScraping ? 'max-w-2xl' : 'max-w-4xl'}`}>
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <DollarSign className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Etapa 5: Selección del plan de cobro
        </h2>
        <p className="text-gray-600">
          {isWebScraping ? 'Plan disponible para Web Scrapping as Service' : 'Elige el plan que mejor se adapte a tu negocio'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 tour-form">
        <div className={`grid gap-6 ${isWebScraping ? 'grid-cols-1' : 'md:grid-cols-2'}`}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl border-2 transition-all cursor-pointer ${
                selectedPlan === plan.id
                  ? 'border-blue-600 shadow-xl scale-105'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-lg'
              }`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  
                </div>
              )}

              <div className="p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    {selectedPlan === plan.id && (
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 mb-1">{plan.title}</p>
                  <p className="text-sm text-gray-600">{plan.subtitle}</p>
                </div>

                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-3xl font-bold text-blue-600 mb-1">{plan.rate}</p>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.footer && (
                  <div className="mt-4 text-sm text-gray-500">
                    {plan.footer}
                  </div>
                )}
              </div>

              <div className="px-6 pb-6">
                <button
                  type="button"
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-xl font-semibold transition-all ${
                    selectedPlan === plan.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {selectedPlan === plan.id ? 'Seleccionado' : 'Seleccionar plan'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {isWebScraping && (
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden p-8 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📊</span>
              </div>
              <h4 className="font-semibold text-gray-900 text-xl mb-3">
                Calculadora de Tarifas
              </h4>
              <p className="text-gray-600 mb-6">
                Simula el costo según tu consumo estimado de endpoints.
              </p>
              <a
                href="https://alone-depict-18755202.figma.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
              >
                Simulador de Tarifas →
              </a>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          {(isWebScraping || serviceInterest === 'Validación de identidad') ? (
            <>
              <h4 className="font-semibold text-gray-900 text-xl mb-3">
                ¿Tienes dudas adicionales?
              </h4>
              <a
                href="mailto:soporte@khipu.com"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
              >
                Contáctanos
              </a>
            </>
          ) : (
            <>
              <h4 className="font-semibold text-gray-900 text-xl mb-3">
                ¿Tienes dudas sobre qué plan elegir?
              </h4>
              <a
                href="mailto:soporte@khipu.com"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
              >
                Contáctanos
              </a>
            </>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Atrás
          </button>
          <button
            type="submit"
            disabled={!selectedPlan}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              selectedPlan
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuar
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}