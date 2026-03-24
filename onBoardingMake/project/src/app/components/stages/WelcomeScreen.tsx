import { ArrowRight, CheckCircle } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const steps = [
  'Identificación de Comercio',
  'Registro comercial',
  'Selección de plan',
  'Firma de contrato',
];

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-white font-bold text-4xl">K</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Bienvenido a Khipu
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comencemos con la activación de tu cuenta. Sigue los pasos y en minutos 
            estarás listo para recibir pagos.
          </p>
        </div>

        {/* Step indicator */}
        <div className="mb-12 px-4">
          <div className="relative flex items-start justify-between">
            {/* Connecting line */}
            <div
              className="absolute left-0 right-0 h-0.5 bg-gray-300 z-0"
              style={{ top: '16px' }}
            />
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative z-10 flex flex-col items-center"
                style={{ width: `${100 / steps.length}%` }}
              >
                <div
                  className={`w-8 h-8 rounded-full ${ index === 0 ? 'bg-blue-500' : 'bg-gray-400' } bg-[#99a1af]`}
                />
                <span
                  className={`mt-3 text-sm text-center leading-tight max-w-[110px] font-bold ${
                    index === 0 ? 'text-gray-900' : 'text-gray-600'
                  }`}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              ¿Qué necesitas tener a mano?
            </h2>
            <p className="text-gray-600">
              Prepara estos documentos para agilizar el proceso:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">RUT empresa y Representante legal</p>
                <p className="text-sm text-gray-600">Documentos vigentes</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Datos bancarios</p>
                <p className="text-sm text-gray-600">Cuenta donde recibirás tus pagos</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Información del negocio</p>
                <p className="text-sm text-gray-600">Giro comercial, Industria, Venta online</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">Documentos legales</p>
                <p className="text-sm text-gray-600">Constitución de la empresa ó Escritura, Vigencia de poderes.</p>
              </div>
            </div>
          </div>

          <button
            onClick={onStart}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 text-lg"
          >
            Comenzar activación
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          ¿Tienes dudas? Contacta a{' '}
          <a href="mailto:soporte@khipu.com" className="text-blue-600 hover:underline">
            soporte@khipu.com
          </a>
        </p>
      </div>
    </div>
  );
}