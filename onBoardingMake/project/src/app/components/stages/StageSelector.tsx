import { useState } from 'react';
import { Building2, User, ArrowRight, MapPin } from 'lucide-react';

type PersonType = 'natural' | 'juridica' | null;

interface StageSelectorProps {
  country: string;
  setCountry: (country: string) => void;
  personType: PersonType;
  setPersonType: (type: PersonType) => void;
  onNext: (data: { country: string; personType: PersonType }) => void;
}

export function StageSelector({
  country,
  setCountry,
  personType,
  setPersonType,
  onNext
}: StageSelectorProps) {
  const handleNext = () => {
    if (country && personType) {
      onNext({ country, personType });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Etapa 0: Perfil comercial</h2>
        <p className="text-gray-600">
          Completa la información inicial para comenzar
        </p>
      </div>

      <div className="space-y-6">
        {/* Selección de país */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 tour-country">
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

        {/* Selección de tipo de persona */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 tour-person-type">
          <label className="text-lg font-semibold text-gray-900 mb-4 block">
            Tipo de cuenta
          </label>
          
          <div className="grid md:grid-cols-2 gap-4">
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
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Seleccionado
                </div>
              )}
            </button>

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
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  Seleccionado
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mensaje informativo */}
        {personType && (
          null
        )}

        <button
          onClick={handleNext}
          disabled={!country || !personType}
          className={`w-full py-4 px-6 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all ${
            country && personType
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          Continuar
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}