import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStage: number;
  totalStages: number;
  personType: 'natural' | 'juridica';
}

export function ProgressBar({ currentStage, totalStages, personType }: ProgressBarProps) {
  const naturalStages = [
    'Inicio',
    'Perfil y Datos',
    'Banco',
    'Plan',
    'Contrato',
    'Validación'
  ];

  const juridicaStages = [
    'Inicio',
    'Perfil y Datos',
    'Banco',
    'Plan',
    'Contrato',
    'Validación',
    'Alta'
  ];

  const stages = personType === 'juridica' ? juridicaStages : naturalStages;

  return (
    <div className="tour-progress bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {stages.filter(s => s !== 'Validación' && s !== 'Alta').map((stage, index) => (
            <div key={index} className="flex items-center flex-1">
              <div className="flex flex-col items-center relative">
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
                  ) : null}
                </div>
                <span
                  className={`text-xs mt-2 font-medium whitespace-nowrap ${
                    index <= currentStage ? 'text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {stage}
                </span>
              </div>
              {index < stages.filter(s => s !== 'Validación' && s !== 'Alta').length - 1 && (
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