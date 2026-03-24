import { useState } from 'react';
import { ArrowRight, ArrowLeft, Briefcase, ShieldAlert, AlertTriangle, CheckCircle2, XCircle, ChevronDown, Mail, HeartHandshake } from 'lucide-react';

interface StageProfileProps {
  personType: 'natural' | 'juridica';
  onNext: (data: any) => void;
  onBack: () => void;
  formData?: any;
}

const KYC_SECTORS = [
  'Clubes de juego',
  'Sitios de Apuestas físicas o en línea, Casinos online y similares',
  'Inversiones turísticas',
  'Financiamiento de campañas políticas',
  'Agencias de viaje',
  'Compra/Venta de autos usados',
  'Compra/Venta obras de arte',
  'Iglesias y movimientos religiosos',
  'Fundaciones sin fines de lucro',
  'Organización no Gubernamentales (ONG)',
  'Joyerías y dealers de metales',
  'Dealers de piedras preciosas',
  'Empresas extranjeras ubicadas en Paraísos Tributarios',
  'Negocios de esquema "Multinivel"',
];

export function StageProfile({ personType, onNext, onBack, formData: parentFormData }: StageProfileProps) {
  const [formData, setFormData] = useState({
    businessSize: parentFormData?.businessSize || '',
    industry: parentFormData?.industry || '',
    serviceInterest: parentFormData?.serviceInterest || '',
    kycSectors: parentFormData?.kycSectors || [] as string[],
    kycNone: parentFormData?.kycNone || false,
  });
  const [showKycBlock, setShowKycBlock] = useState(false);

  const businessSizes = [
    '0 - 60.000 USD',
    '60.001 - 160.000 USD',
    'Más de 160.000 USD',
  ];

  const industryTypes = [
    'Fintech',
    'E-commerce',
    'Marketplace',
    'SaaS',
    'Educación',
    'Servicios profesionales',
    'Retail',
    'Proveedor de Servicios de Pago (PSP)',
    'Otros',
  ];

  const allServicesOfInterest = [
    'Pagos instantáneos',
    'Pagos automáticos',
    'Web scrapping as service',
    'Validación de identidad',
  ];

  const servicesOfInterest = personType === 'natural'
    ? ['Pagos instantáneos', 'Pagos automáticos']
    : allServicesOfInterest;

  const queryVolumes = [
    'Hasta 100',
    'Hasta 500',
    'Hasta 1,000',
    'Hasta 10,000',
    'Hasta 50,000',
    'Más de 100,000',
  ];

  const isWebScraping = formData.serviceInterest === 'Web scrapping as service';
  const isIdentityValidation = formData.serviceInterest === 'Validación de identidad';
  const skipKYCStage = isWebScraping || isIdentityValidation;
  const kycVisible = !!formData.industry && !skipKYCStage;
  const kycAnswered = formData.kycNone || formData.kycSectors.length > 0;

  const canContinue =
    formData.businessSize &&
    formData.industry &&
    formData.serviceInterest &&
    (skipKYCStage || kycAnswered);

  const handleKycSectorToggle = (sector: string) => {
    const current: string[] = formData.kycSectors;
    const updated = current.includes(sector)
      ? current.filter((s) => s !== sector)
      : [...current, sector];
    setFormData({ ...formData, kycSectors: updated, kycNone: false });
  };

  const handleKycNone = () => {
    setFormData({ ...formData, kycNone: true, kycSectors: [] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canContinue) {
      if (formData.kycSectors.length > 0) {
        setShowKycBlock(true);
      } else {
        onNext(formData);
      }
    }
  };

  const hasSectorSelected = formData.kycSectors.length > 0;

  if (showKycBlock) {
    const sectors = formData.kycSectors;
    const subject = encodeURIComponent('Solicitud de asistencia para activación de cuenta Khipu');
    const body = encodeURIComponent(
      `Hola equipo de Khipu,\n\nEstoy en proceso de activación de mi cuenta y me encuentro en uno o más sectores que requieren revisión adicional:\n\n${sectors.map(s => `• ${s}`).join('\n')}\n\nQuedo atento/a a sus instrucciones para continuar con el proceso de onboarding.\n\nGracias.`
    );
    const mailtoHref = `mailto:soporte@khipu.com?subject=${subject}&body=${body}`;

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl border border-amber-200 shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-8 py-8 text-center border-b border-amber-100">
            <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <HeartHandshake className="w-10 h-10 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tu solicitud requiere revisión especial
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Gracias por tu transparencia. En Khipu valoramos el cumplimiento normativo y queremos acompañarte en este proceso de la mejor manera posible.
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-7 space-y-6">
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-amber-900 mb-1">Sectores declarados con revisión requerida</p>
                  <ul className="space-y-1 mt-2">
                    {sectors.map((s) => (
                      <li key={s} className="text-sm text-amber-800 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              Debido a las regulaciones de cumplimiento normativo (AML/KYC), los negocios pertenecientes a estos sectores deben pasar por un proceso de habilitación asistido por nuestro equipo especializado. Esto nos permite garantizar una activación segura y adecuada para tu caso.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">Próximo paso</p>
                <p className="text-sm text-gray-600 mb-3">
                  Escríbenos a <span className="font-medium text-blue-700">soporte@khipu.com</span> y nuestro equipo te guiará personalmente en el proceso de habilitación de tu cuenta.
                </p>
                <a
                  href={mailtoHref}
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  Enviar email
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-5 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setShowKycBlock(false)}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium text-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Volver
            </button>
            <p className="text-xs text-gray-400">Tiempo estimado de respuesta: 1–2 días hábiles</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Etapa 1: Perfil del negocio
        </h2>
        <p className="text-gray-600">
          Cuéntanos más sobre tu negocio
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 tour-form">

        {/* Servicio de interés */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <label className="block font-semibold text-gray-900 mb-3">
            Servicio de interés *
          </label>
          <select
            value={formData.serviceInterest}
            onChange={(e) => setFormData({ ...formData, serviceInterest: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona el servicio que te interesa</option>
            {servicesOfInterest.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
        </div>

        {/* Tamaño de negocio / Número de consultas */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <label className="block font-semibold text-gray-900 mb-3">
            {isWebScraping ? 'Número de consultas Aprox. mensual *' : 'Tamaño de negocio *'}
          </label>
          <select
            value={formData.businessSize}
            onChange={(e) => setFormData({ ...formData, businessSize: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">
              {isWebScraping ? 'Selecciona el número de consultas' : 'Selecciona el tamaño de tu negocio'}
            </option>
            {(isWebScraping ? queryVolumes : businessSizes).map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>

        {/* Tipo de industria */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <label className="block font-semibold text-gray-900 mb-3">
            Tipo de industria *
          </label>
          <select
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecciona tu industria</option>
            {industryTypes.map((industry) => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>

        {/* KYC: Sectores de riesgo — aparece automáticamente al responder industria */}
        {kycVisible && (
          <div className={`rounded-xl border-2 overflow-hidden transition-all ${
            hasSectorSelected
              ? 'border-amber-400'
              : formData.kycNone
              ? 'border-green-400'
              : 'border-blue-300'
          }`}>
            {/* Header KYC */}
            <div className={`px-6 py-4 flex items-start gap-3 ${
              hasSectorSelected ? 'bg-amber-50' : formData.kycNone ? 'bg-green-50' : 'bg-blue-50'
            }`}>
              <div className={`mt-0.5 flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center ${
                hasSectorSelected ? 'bg-amber-100' : formData.kycNone ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <ShieldAlert className={`w-5 h-5 ${
                  hasSectorSelected ? 'text-amber-600' : formData.kycNone ? 'text-green-600' : 'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                    hasSectorSelected
                      ? 'bg-amber-200 text-amber-800'
                      : formData.kycNone
                      ? 'bg-green-200 text-green-800'
                      : 'bg-blue-200 text-blue-800'
                  }`}>
                    Verificación KYC
                  </span>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
                <p className="font-semibold text-gray-900">
                  ¿Perteneces a alguno de estos sectores? *
                </p>
                <p className="text-sm text-gray-500 mt-0.5">
                  Esta información es requerida por regulaciones de cumplimiento normativo (AML/KYC).
                </p>
              </div>
            </div>

            {/* Alerta si seleccionó sectores */}
            {hasSectorSelected && (
              <div className="mx-6 mt-4 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-amber-800">
                  Los sectores seleccionados requieren una revisión adicional por parte de nuestro equipo de cumplimiento antes de activar tu cuenta.
                </p>
              </div>
            )}

            {/* Lista de sectores */}
            <div className="px-6 pt-4 pb-2 grid grid-cols-1 gap-2">
              {KYC_SECTORS.map((sector) => {
                const isChecked = formData.kycSectors.includes(sector);
                return (
                  <label
                    key={sector}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all select-none ${
                      isChecked
                        ? 'bg-amber-50 border-amber-300'
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      isChecked ? 'bg-amber-500 border-amber-500' : 'border-gray-300 bg-white'
                    }`}>
                      {isChecked && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isChecked}
                      onChange={() => handleKycSectorToggle(sector)}
                    />
                    <span className={`text-sm ${isChecked ? 'text-amber-900 font-medium' : 'text-gray-700'}`}>
                      {sector}
                    </span>
                    {isChecked && (
                      <XCircle
                        className="w-4 h-4 text-amber-400 ml-auto flex-shrink-0"
                        onClick={(e) => { e.preventDefault(); handleKycSectorToggle(sector); }}
                      />
                    )}
                  </label>
                );
              })}
            </div>

            {/* Opción: Ninguna */}
            <div className="px-6 pb-4 pt-2">
              <div className="border-t border-gray-100 pt-3">
                <label className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all select-none ${
                  formData.kycNone
                    ? 'bg-green-50 border-green-300'
                    : 'bg-white border-gray-200 hover:border-green-200 hover:bg-green-50'
                }`}>
                  <div className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    formData.kycNone ? 'bg-green-500 border-green-500' : 'border-gray-300 bg-white'
                  }`}>
                    {formData.kycNone && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={formData.kycNone}
                    onChange={handleKycNone}
                  />
                  <span className={`text-sm font-medium ${formData.kycNone ? 'text-green-800' : 'text-gray-700'}`}>
                    Ninguna de las anteriores
                  </span>
                  {formData.kycNone && (
                    <CheckCircle2 className="w-4 h-4 text-green-500 ml-auto flex-shrink-0" />
                  )}
                </label>
              </div>

              {/* Nota legal */}
              <p className="text-xs text-gray-400 mt-3 leading-relaxed">
                La información declarada es de carácter legal y está sujeta a verificación. La omisión o falsedad en la declaración puede derivar en el rechazo o cancelación del servicio conforme a la normativa vigente.
              </p>
            </div>
          </div>
        )}

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
            disabled={!canContinue}
            className={`flex-1 py-3 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
              canContinue
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