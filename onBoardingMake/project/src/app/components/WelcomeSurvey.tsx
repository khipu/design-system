import { useState } from 'react';
import { X } from 'lucide-react';

interface WelcomeSurveyProps {
  onComplete: (source: string, otherText: string) => void;
  onSkip: () => void;
}

export function WelcomeSurvey({ onComplete, onSkip }: WelcomeSurveyProps) {
  const [source, setSource] = useState('');
  const [otherText, setOtherText] = useState('');

  const referralOptions = [
    'Google, Chat GPT, Gemini AI u otro buscador',
    'Anuncio en internet (banner, prensa, red social, etc.)',
    'Redes sociales (LinkedIn, Instagram, Facebook, etc.)',
    'Recomendación de un colega, cliente o proveedor',
    'Alianza Banco Security o Banco Itaú',
    'Evento, charla, webinar o feria',
    'Ya conocía otro producto o servicio de Khipu',
    'Otro'
  ];

  const handleSubmit = () => {
    if (source) {
      onComplete(source, source === 'Otro' ? otherText : '');
    }
  };

  const canContinue = source && (source !== 'Otro' || otherText.trim().length > 0);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[10001] p-4 pointer-events-none">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative animate-fadeIn pointer-events-auto">
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          title="Cerrar"
        >
          
        </button>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">¡Bienvenido a Khipu! 👋</h2>
            <p className="text-base text-gray-700 mb-4">
              Antes de empezar, cuéntanos.
            </p>
            <p className="text-base font-semibold text-gray-900 mb-3">
              ¿Cómo nos conociste?
            </p>
          </div>

          <div>
            <select
              value={source}
              onChange={(e) => {
                setSource(e.target.value);
                if (e.target.value !== 'Otro') {
                  setOtherText('');
                }
              }}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="">Selecciona una opción</option>
              {referralOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {source === 'Otro' && (
            <div className="animate-fadeIn">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cuál?
              </label>
              <input
                type="text"
                value={otherText}
                onChange={(e) => setOtherText(e.target.value)}
                placeholder="Escribe aquí..."
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                autoFocus
              />
            </div>
          )}

          <div className="pt-2 space-y-3">
            <button
              onClick={handleSubmit}
              disabled={!canContinue}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                canContinue
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Comenzar onboarding
            </button>
          </div>

          {!source && (
            <p className="text-xs text-gray-500 text-center pt-2">
              Completa esta breve encuesta para ayudarnos a mejorar
            </p>
          )}
        </div>
      </div>
    </div>
  );
}