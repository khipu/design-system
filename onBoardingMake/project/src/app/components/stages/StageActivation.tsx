import { CheckCircle2, ExternalLink, TrendingUp, Shield, Zap } from 'lucide-react';

export function StageActivation() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 relative animate-pulse">
          <CheckCircle2 className="w-12 h-12 text-white" />
          <div className="absolute inset-0 bg-green-400 rounded-full animate-ping opacity-75"></div>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-3">
          ¡Tu cuenta está completamente activa!
        </h2>
        <p className="text-gray-600 text-lg">
          Etapa 8: Alta de comercio completada
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 rounded-2xl p-8 border-2 border-green-300">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              🎊 ¡Felicitaciones!
            </h3>
            <p className="text-gray-700 text-lg">
              Tu documentación ha sido aprobada y tu comercio está activo y operativo 
              sin ningún límite.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 border border-green-200 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Sin límites</h4>
              <p className="text-sm text-gray-600">Transacciones ilimitadas</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-blue-200 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Verificado</h4>
              <p className="text-sm text-gray-600">Cuenta completamente validada</p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-purple-200 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Listo</h4>
              <p className="text-sm text-gray-600">Para hacer crecer tu negocio</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-4">
              ✓ Proceso de activación completado
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Documentación aprobada</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Cuenta bancaria verificada</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Contrato firmado y registrado</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Plan de cobro configurado</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Alta de comercio finalizada</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
            <h3 className="font-semibold text-gray-900">Próximos pasos</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-white">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Integra Khipu en tu sitio web
                </h4>
                <p className="text-gray-600 text-sm">
                  Utiliza nuestra API o plugins para comenzar a recibir pagos en tu plataforma.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-white">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Configura tus notificaciones
                </h4>
                <p className="text-gray-600 text-sm">
                  Personaliza las alertas de transacciones y reportes automáticos.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 font-semibold text-white">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">
                  Realiza tu primera transacción
                </h4>
                <p className="text-gray-600 text-sm">
                  Prueba el sistema con una transacción de prueba o comienza a cobrar de inmediato.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="#"
            className="bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl p-6 transition-all hover:shadow-xl group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Ir al Dashboard</h3>
            <p className="text-blue-100 text-sm">
              Accede a tu panel de control y comienza a gestionar tus cobros
            </p>
          </a>

          <a
            href="#"
            className="bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-blue-300 rounded-xl p-6 transition-all hover:shadow-lg group"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <ExternalLink className="w-5 h-5 text-gray-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900">
              Documentación API
            </h3>
            <p className="text-gray-600 text-sm">
              Aprende a integrar Khipu con nuestra guía completa
            </p>
          </a>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
              <span className="text-4xl">🚀</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3">
                ¡Gracias por elegir Khipu!
              </h3>
              <p className="text-blue-100 mb-4">
                Estamos emocionados de acompañarte en el crecimiento de tu negocio. 
                Nuestro equipo está disponible 24/7 para ayudarte con cualquier duda.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:soporte@khipu.com"
                  className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm"
                >
                  Contactar soporte
                </a>
                <a
                  href="#"
                  className="bg-white/20 text-white px-4 py-2 rounded-lg font-semibold hover:bg-white/30 transition-colors text-sm"
                >
                  Ver tutoriales
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
