import { useState } from 'react';
import { ArrowRight, ArrowLeft, FileText, Zap } from 'lucide-react';

interface StageCommercialDataProps {
  personType: 'natural' | 'juridica';
  onNext: (data: any) => void;
  onBack: () => void;
  formData?: any;
}

export function StageCommercialData({ personType, onNext, onBack, formData: parentFormData }: StageCommercialDataProps) {
  const [useSII, setUseSII] = useState<boolean | null>(null);
  const [useSIINatural, setUseSIINatural] = useState<boolean | null>(null);
  const [formData, setFormData] = useState({
    // Persona Natural
    firstName: parentFormData?.firstName || '',
    lastName: parentFormData?.lastName || '',
    rut: parentFormData?.rut || '',
    email: parentFormData?.email || '',
    phone: parentFormData?.phone || '',
    street: parentFormData?.street || '',
    floor: parentFormData?.floor || '',
    commune: parentFormData?.commune || '',
    region: parentFormData?.region || '',
    // Persona Jurídica
    businessName: parentFormData?.businessName || '',
    businessRut: parentFormData?.businessRut || '',
    businessActivity: parentFormData?.businessActivity || '',
    taxId: parentFormData?.taxId || '',
    businessStreet: parentFormData?.businessStreet || '',
    businessFloor: parentFormData?.businessFloor || '',
    businessCommune: parentFormData?.businessCommune || '',
    businessRegion: parentFormData?.businessRegion || '',
    businessEmail: parentFormData?.businessEmail || '',
    businessPhone: parentFormData?.businessPhone || '',
    platform: parentFormData?.platform || '',
    // Contacto principal
    contactName: parentFormData?.contactName || '',
    contactLastName: parentFormData?.contactLastName || '',
    contactEmail: parentFormData?.contactEmail || '',
    contactPhone: parentFormData?.contactPhone || '',
    // Representante legal
    legalRepName: parentFormData?.legalRepName || '',
    legalRepRut: parentFormData?.legalRepRut || '',
    // Modelo de recaudación
    collectionModel: parentFormData?.collectionModel || '',
    tipoRecaudacion: parentFormData?.tipoRecaudacion || '',
    // Tipos de consultas para Web Scrapping
    tipoConsultas: parentFormData?.tipoConsultas || ''
  });

  const allCollectionModels = [
    'Cuenta Propia',
    'Cuenta Khipu con transferencia en 24hrs hábiles',
  ];

  const smallSizes = ['0 - 60.000 USD', '60.001 - 160.000 USD'];
  const isPSP = parentFormData?.industry === 'Proveedor de Servicios de Pago (PSP)';
  const isMandato = formData.tipoRecaudacion === 'mandato_terceros';
  const isSmall = smallSizes.includes(parentFormData?.businessSize || '');
  const isLarge = parentFormData?.businessSize === 'Más de 160.000 USD';
  
  // Determinar si es Web Scrapping as Service
  const isWebScraping = parentFormData?.serviceInterest === 'Web scrapping as service';

  // Determinar si es Pagos Automáticos
  const isPagosAutomaticos = parentFormData?.serviceInterest === 'Pagos automáticos';
  
  let collectionModels: string[];
  if (isPSP || isMandato) {
    // PSP o mandato de terceros → solo Cuenta Propia
    collectionModels = ['Cuenta Propia'];
  } else if (isSmall) {
    // Pequeño, no PSP, no mandato → solo opción básica
    collectionModels = ['Cuenta Khipu con transferencia en 24hrs hábiles'];
  } else {
    collectionModels = allCollectionModels;
  }

  const handleChange = (field: string, value: string) => {
    const updated = { ...formData, [field]: value };
    // Si cambia tipoRecaudacion, recalcular si el modelo actual sigue siendo válido
    if (field === 'tipoRecaudacion') {
      const newIsMandato = value === 'mandato_terceros';
      let newModels: string[];
      if (isPSP || newIsMandato) {
        // PSP o mandato de terceros → solo Cuenta Propia
        newModels = ['Cuenta Propia'];
      } else if (isSmall) {
        // Pequeño, no PSP, no mandato → solo opción básica
        newModels = ['Cuenta Khipu con transferencia en 24hrs hábiles'];
      } else {
        newModels = allCollectionModels;
      }
      if (!newModels.includes(updated.collectionModel)) {
        updated.collectionModel = '';
      }
    }
    setFormData(updated);
  };

  const handleConnectSII = () => {
    // Simulación de conexión con SII - Persona Jurídica
    setUseSII(true);
    setFormData({
      ...formData,
      businessName: 'Empresa Demo SpA',
      businessRut: '76.123.456-7',
      businessActivity: 'Servicios de tecnología',
      taxId: '76123456',
      businessStreet: 'Av. Providencia 1234',
      businessFloor: '10º piso',
      businessCommune: 'Santiago',
      businessRegion: 'Región Metropolitana',
      businessEmail: 'contacto@empresademo.cl',
      businessPhone: '+56 9 8765 4321'
    });
  };

  const handleConnectSIINatural = () => {
    // Simulación de conexión con SII - Persona Natural
    setUseSIINatural(true);
    setFormData(prev => ({
      ...prev,
      firstName: 'Juan',
      lastName: 'Pérez González',
      rut: '12.345.678-9',
      street: 'Av. Providencia 1234',
      floor: 'Dpto. 501',
      commune: 'Providencia',
      region: 'Región Metropolitana'
    }));
  };

  const canContinue = personType === 'natural'
    ? useSIINatural !== null &&
      formData.firstName && formData.lastName && formData.rut && formData.email &&
      formData.phone && formData.street && formData.commune && formData.region
    : (useSII || (formData.businessName && formData.businessRut && formData.businessActivity)) &&
      formData.businessStreet && formData.businessCommune && formData.businessRegion &&
      formData.businessEmail && formData.businessPhone &&
      formData.legalRepName && formData.legalRepRut;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (canContinue) {
      // Si el modelo de recaudación no se muestra al usuario pero hay un único valor
      // determinado automáticamente, asegurarse de guardarlo en formData
      const submitData = { ...formData };
      if (!submitData.collectionModel && collectionModels.length >= 1) {
        submitData.collectionModel = collectionModels[0];
      }
      onNext(submitData);
    }
  };

  // Mostrar "Modelo de recaudación" solo para Pagos Instantáneos (PSP, Mandato o empresas grandes)
  // Para Web Scrapping se muestra "Tipos de Consultas"
  const showCollectionModel = !isWebScraping && personType === 'juridica' && (isPSP || isMandato || isLarge);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">
          Etapa 2: Datos {personType === 'natural' ? 'personales' : 'comerciales'}
        </h2>
        <p className="text-gray-600">
          Completa tu información {personType === 'natural' ? 'personal' : 'empresarial'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 tour-form">

        {/* Tipo de recaudación - campo común, NO se muestra si es Web Scrapping */}
        {!isWebScraping && !isPagosAutomaticos && personType === 'juridica' && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <label className="block font-medium text-gray-700 mb-2">
              Tipo de recaudación *
            </label>
            <select
              value={formData.tipoRecaudacion}
              onChange={(e) => handleChange('tipoRecaudacion', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una opción...</option>
              <option value="productos_servicios">Recaudo por la venta de mis productos / servicios</option>
              <option value="mandato_terceros">Recaudo por mandato de terceros</option>
            </select>
          </div>
        )}

        {/* Tipo de Convenio - solo para Pagos Automáticos */}
        {isPagosAutomaticos && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <label className="block font-medium text-gray-700 mb-2">
              Tipo de Convenio *
            </label>
            <select
              value={formData.tipoConvenio || ''}
              onChange={(e) => handleChange('tipoConvenio', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona una opción...</option>
              <option value="convenio_khipu">Convenio Khipu</option>
              <option value="convenio_propio">Convenio Propio</option>
            </select>
          </div>
        )}

        {/* Modelo de recaudación - solo para Pagos Instantáneos */}
        {showCollectionModel && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <label className="block font-medium text-gray-700 mb-2">
              Modelo de recaudación *
            </label>
            <select
              value={formData.collectionModel}
              onChange={(e) => handleChange('collectionModel', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona tu modelo de recaudación</option>
              {collectionModels.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
        )}

        {/* Tipos de Consultas - solo para Web Scrapping as Service */}
        {isWebScraping && (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <label className="block font-medium text-gray-700 mb-2">
              Tipos de Consultas *
            </label>
            <select
              value={formData.tipoConsultas}
              onChange={(e) => handleChange('tipoConsultas', e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecciona el tipo de consultas</option>
              <option value="banca">Banca</option>
              <option value="servicios">Servicios</option>
              <option value="banca_servicios">Banca y Servicios</option>
            </select>
          </div>
        )}

        {personType === 'natural' ? (
          <>
            {/* Selector SII / Manual para Persona Natural */}
            {useSIINatural === null && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  ¿Cómo deseas completar los datos?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleConnectSIINatural}
                    className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Conectar SII (Rápido)
                    </h4>
                    <p className="text-sm text-gray-600">
                      Traemos automáticamente tus datos personales y domicilio tributario
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUseSIINatural(false)}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all text-left"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <FileText className="w-6 h-6 text-gray-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Completar manualmente
                    </h4>
                    <p className="text-sm text-gray-600">
                      Ingresa tus datos personales uno por uno
                    </p>
                  </button>
                </div>
              </div>
            )}

            {useSIINatural !== null && (
              <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Datos personales
                </h3>

                {useSIINatural && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-2">
                    <p className="text-green-800 font-medium">
                      ✓ Datos cargados desde SII exitosamente
                    </p>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Nombre *</label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      disabled={useSIINatural}
                      placeholder="Tu nombre"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Apellido *</label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      disabled={useSIINatural}
                      placeholder="Tu apellido"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">RUT *</label>
                  <input
                    type="text"
                    value={formData.rut}
                    onChange={(e) => handleChange('rut', e.target.value)}
                    disabled={useSIINatural}
                    placeholder="12.345.678-9"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Correo electrónico *</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="tu@email.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-2">Teléfono de contacto *</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+56 9 1234 5678"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-gray-700 mb-2">Domicilio completo *</label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={formData.street}
                      onChange={(e) => handleChange('street', e.target.value)}
                      disabled={useSIINatural}
                      placeholder="Calle / Número"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                    />
                    <input
                      type="text"
                      value={formData.floor}
                      onChange={(e) => handleChange('floor', e.target.value)}
                      disabled={useSIINatural}
                      placeholder="Piso / Departamento"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                    />
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={formData.commune}
                        onChange={(e) => handleChange('commune', e.target.value)}
                        disabled={useSIINatural}
                        placeholder="Comuna"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                      />
                      <input
                        type="text"
                        value={formData.region}
                        onChange={(e) => handleChange('region', e.target.value)}
                        disabled={useSIINatural}
                        placeholder="Región"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {useSII === null && (
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">
                  ¿Cómo deseas completar los datos?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={handleConnectSII}
                    className="p-6 border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all text-left"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <Zap className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Conectar SII (Rápido)
                    </h4>
                    <p className="text-sm text-gray-600">
                      Traemos automáticamente los datos de tu empresa
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUseSII(false)}
                    className="p-6 border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all text-left"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <FileText className="w-6 h-6 text-gray-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Completar manualmente
                    </h4>
                    <p className="text-sm text-gray-600">
                      Ingresa los datos de tu empresa uno por uno
                    </p>
                  </button>
                </div>
              </div>
            )}

            {useSII !== null && (
              <>
                <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Datos de la empresa
                  </h3>

                  {useSII && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <p className="text-green-800 font-medium">
                        ✓ Datos cargados desde SII exitosamente
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Razón Social *
                    </label>
                    <input
                      type="text"
                      value={formData.businessName}
                      onChange={(e) => handleChange('businessName', e.target.value)}
                      disabled={useSII}
                      placeholder="Nombre legal de la empresa"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        RUT Empresa *
                      </label>
                      <input
                        type="text"
                        value={formData.businessRut}
                        onChange={(e) => handleChange('businessRut', e.target.value)}
                        disabled={useSII}
                        placeholder="76.123.456-7"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Giro comercial *
                      </label>
                      <input
                        type="text"
                        value={formData.businessActivity}
                        onChange={(e) => handleChange('businessActivity', e.target.value)}
                        disabled={useSII}
                        placeholder="Ej: Servicios de software"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Domicilio completo *
                    </label>
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={formData.businessStreet}
                        onChange={(e) => handleChange('businessStreet', e.target.value)}
                        disabled={useSII}
                        placeholder="Calle / Número"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                      />
                      <input
                        type="text"
                        value={formData.businessFloor}
                        onChange={(e) => handleChange('businessFloor', e.target.value)}
                        disabled={useSII}
                        placeholder="Piso / Oficina"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                      />
                      <div className="grid md:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={formData.businessCommune}
                          onChange={(e) => handleChange('businessCommune', e.target.value)}
                          disabled={useSII}
                          placeholder="Comuna"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                        />
                        <input
                          type="text"
                          value={formData.businessRegion}
                          onChange={(e) => handleChange('businessRegion', e.target.value)}
                          disabled={useSII}
                          placeholder="Región"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Correo *
                      </label>
                      <input
                        type="email"
                        value={formData.businessEmail}
                        onChange={(e) => handleChange('businessEmail', e.target.value)}
                        disabled={useSII}
                        placeholder="contacto@empresa.cl"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Teléfono *
                      </label>
                      <input
                        type="tel"
                        value={formData.businessPhone}
                        onChange={(e) => handleChange('businessPhone', e.target.value)}
                        disabled={useSII}
                        placeholder="+56 2 1234 5678"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
                      />
                    </div>
                  </div>
                </div>

                

                <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
                  <h3 className="font-semibold text-gray-900 mb-4">
                    Representante legal
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        value={formData.legalRepName}
                        onChange={(e) => handleChange('legalRepName', e.target.value)}
                        placeholder="Nombre y apellido"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        RUT *
                      </label>
                      <input
                        type="text"
                        value={formData.legalRepRut}
                        onChange={(e) => handleChange('legalRepRut', e.target.value)}
                        placeholder="12.345.678-9"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
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