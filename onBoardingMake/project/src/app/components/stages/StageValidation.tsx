import { CheckCircle2, Clock, ExternalLink, HelpCircle } from 'lucide-react';

export function StageValidation() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
            <Clock className="w-5 h-5 text-yellow-900" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          ¡Cuenta creada exitosamente!
        </h2>
        <p className="text-gray-600 text-lg">
          Estamos validando tu documentación
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 border border-green-200">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Tu cuenta de cobro ha sido creada
              </h3>
              <p className="text-gray-700">
                Un email automático con tu ID de cuenta y documentación ha sido enviado 
                al equipo de operaciones para su revisión.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-green-200">
            <div className="flex items-start gap-3 mb-4">
              <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  Estado actual: En validación
                </h4>
                <p className="text-gray-700 mb-3">
                  Mientras validamos tu documentación, puedes comenzar a realizar transacciones 
                  con un <strong>monto máximo de $150.000</strong> por transacción.
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-900 text-sm">
                    <strong>⏱️ Tiempo estimado:</strong> En 24 horas quedará habilitada tu cuenta 
                    sin límites. Si no recibes confirmación, contacta a{' '}
                    <a href="mailto:soporte@khipu.com" className="text-blue-600 hover:underline font-semibold">
                      soporte@khipu.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h3 className="font-semibold text-gray-900">¿Qué sigue ahora?</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-blue-600">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Validación de documentos
                </h4>
                <p className="text-gray-600 text-sm">
                  Nuestro equipo revisará la documentación que subiste. Este proceso suele 
                  tomar menos de 24 horas hábiles.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-blue-600">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Verificación bancaria
                </h4>
                <p className="text-gray-600 text-sm">
                  Confirmaremos que la cuenta bancaria asociada esté activa y correctamente vinculada.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-blue-600">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Activación completa
                </h4>
                <p className="text-gray-600 text-sm">
                  Una vez aprobada la revisión, tu cuenta quedará activa sin límites y 
                  recibirás un email de confirmación.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-6 transition-all hover:shadow-lg group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Ir a cobrar</h3>
            <p className="text-blue-100 text-sm">
              Comienza a recibir pagos de inmediato (límite temporal: $150.000)
            </p>
          </a>

          <a
            href="#"
            className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 rounded-xl p-6 transition-all hover:shadow-lg group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-6 h-6 text-purple-600" />
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              Preguntas Frecuentes
            </h3>
            <p className="text-gray-600 text-sm">
              Encuentra respuestas a las dudas más comunes sobre el servicio
            </p>
          </a>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-2xl">🎉</span>
            </div>
            <div>
              <h3 className="font-semibold text-purple-900 mb-2">
                ¡Bienvenido a Khipu!
              </h3>
              <p className="text-purple-800 text-sm mb-3">
                Gracias por confiar en nosotros para procesar tus pagos. Estamos aquí para 
                ayudarte a crecer tu negocio.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-white text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  Soporte 24/7
                </span>
                <span className="bg-white text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  Transferencias rápidas
                </span>
                <span className="bg-white text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  Seguridad garantizada
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
