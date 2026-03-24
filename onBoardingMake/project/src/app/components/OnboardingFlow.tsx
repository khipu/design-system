import { useState } from 'react';
import { WelcomeScreen } from './stages/WelcomeScreen';
import { StageSelector } from './stages/StageSelector';
import { StageProfile } from './stages/StageProfile';
import { StageCommercialData } from './stages/StageCommercialData';
import { StageDocuments } from './stages/StageDocuments';
import { StageBankConnection } from './stages/StageBankConnection';
import { StagePricingPlan } from './stages/StagePricingPlan';
import { StageContract } from './stages/StageContract';
import { StageValidation } from './stages/StageValidation';
import { StageActivation } from './stages/StageActivation';
import { ProgressBar } from './ProgressBar';
import { HelpCircle, RotateCcw } from 'lucide-react';

type PersonType = 'natural' | 'juridica' | null;

interface OnboardingFlowProps {
  onRestartTour: () => void;
  currentStage: number;
  setCurrentStage: (stage: number) => void;
  personType: PersonType;
  setPersonType: (type: PersonType) => void;
}

export function OnboardingFlow({ 
  onRestartTour, 
  currentStage, 
  setCurrentStage,
  personType,
  setPersonType 
}: OnboardingFlowProps) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [country, setCountry] = useState('');
  const [formData, setFormData] = useState<any>({});

  const handleStart = () => {
    setShowWelcome(false);
  };

  const handleNext = (data?: any) => {
    if (data) {
      setFormData(prev => ({ ...prev, ...data }));
    }
    const next = currentStage + 1;
    // Persona natural no tiene etapa 3 (Documentos), saltar de 2 a 4
    // También saltar etapa 3 para servicios Web scrapping as service y Validación de identidad
    const mergedFormData = data ? { ...formData, ...data } : formData;
    const skipKYC =
      personType === 'natural' ||
      mergedFormData?.serviceInterest === 'Web scrapping as service' ||
      mergedFormData?.serviceInterest === 'Validación de identidad';
    if (skipKYC && next === 3) {
      setCurrentStage(4);
    } else {
      setCurrentStage(next);
    }
  };

  const handleBack = () => {
    if (currentStage > 0) {
      const prev = currentStage - 1;
      // Persona natural no tiene etapa 3 (Documentos), saltar de 4 a 2
      // También saltar etapa 3 para servicios Web scrapping as service y Validación de identidad
      const skipKYC =
        personType === 'natural' ||
        formData?.serviceInterest === 'Web scrapping as service' ||
        formData?.serviceInterest === 'Validación de identidad';
      if (skipKYC && prev === 3) {
        setCurrentStage(2);
      } else {
        setCurrentStage(prev);
      }
    }
  };

  const skipKYCForService =
    formData?.serviceInterest === 'Web scrapping as service' ||
    formData?.serviceInterest === 'Validación de identidad';
  const totalStages = personType === 'juridica' && !skipKYCForService ? 8 : 6;

  if (showWelcome) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">K</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Khipu</h1>
                <p className="text-xs text-gray-500">Activación de cuenta</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onRestartTour}
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

        {/* Progress Bar */}
        {currentStage > 0 && personType && (
          <ProgressBar 
            currentStage={personType === 'natural' && currentStage >= 4 ? currentStage - 1 : currentStage} 
            totalStages={totalStages}
            personType={personType}
          />
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {currentStage === 0 && (
          <StageSelector
            country={country}
            setCountry={setCountry}
            personType={personType}
            setPersonType={setPersonType}
            onNext={handleNext}
          />
        )}

        {currentStage === 1 && (
          <StageProfile
            personType={personType!}
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
          />
        )}

        {currentStage === 2 && (
          <StageCommercialData
            personType={personType!}
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
          />
        )}

        {currentStage === 3 && (
          <StageDocuments
            personType={personType!}
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
          />
        )}

        {currentStage === 4 && (
          <StageBankConnection
            onNext={handleNext}
            onBack={handleBack}
            serviceInterest={formData.serviceInterest}
            formData={formData}
            personType={personType!}
          />
        )}

        {currentStage === 5 && (
          <StagePricingPlan
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
            personType={personType!}
          />
        )}

        {currentStage === 6 && (
          <StageContract
            personType={personType!}
            onNext={handleNext}
            onBack={handleBack}
            formData={formData}
          />
        )}

        {currentStage === 7 && personType === 'natural' && (
          <StageValidation />
        )}

        {currentStage === 7 && personType === 'juridica' && (
          <StageValidation />
        )}

        {currentStage === 8 && personType === 'juridica' && (
          <StageActivation />
        )}
      </main>
    </div>
  );
}