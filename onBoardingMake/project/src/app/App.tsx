import { useState, useEffect } from 'react';
import { OnboardingFlow } from './components/OnboardingFlow';
import { WelcomeSurvey } from './components/WelcomeSurvey';
import { DesignSystemShowcase } from './components/DesignSystemShowcase';
import { DesignSystemIndex } from './components/DesignSystemIndex';

type PersonType = 'natural' | 'juridica' | null;

export default function App() {
  const [currentStage, setCurrentStage] = useState(0);
  const [personType, setPersonType] = useState<PersonType>(null);
  const [showWelcomeSurvey, setShowWelcomeSurvey] = useState(false);
  const [referralSource, setReferralSource] = useState('');
  const [otherSource, setOtherSource] = useState('');
  const [showDesignSystem, setShowDesignSystem] = useState(false);
  const [showDesignIndex, setShowDesignIndex] = useState(false);

  useEffect(() => {
    // Limpiar el flag para que el popup siempre aparezca al cargar
    localStorage.removeItem('hasSeenKhipuSurvey');
    setTimeout(() => setShowWelcomeSurvey(true), 1000);
  }, []);

  const handleSurveyComplete = (source: string, otherText: string) => {
    setReferralSource(source);
    setOtherSource(otherText);
    setShowWelcomeSurvey(false);
    
    // Guardar la fuente de referencia
    localStorage.setItem('khipuReferralSource', source);
    if (otherText) {
      localStorage.setItem('khipuReferralSourceOther', otherText);
    }
    localStorage.setItem('hasSeenKhipuSurvey', 'true');
  };

  const handleSkipSurvey = () => {
    setShowWelcomeSurvey(false);
    localStorage.setItem('hasSeenKhipuSurvey', 'true');
  };

  const handleRestartTour = () => {
    // Funcionalidad removida
  };

  // Mostrar el showcase del sistema de diseño si está en la URL
  useEffect(() => {
    if (window.location.search.includes('showcase')) {
      setShowDesignSystem(true);
    } else if (window.location.search.includes('index') || window.location.search.includes('design')) {
      setShowDesignIndex(true);
    }
  }, []);

  if (showDesignSystem) {
    return <DesignSystemShowcase />;
  }

  if (showDesignIndex) {
    return <DesignSystemIndex />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <OnboardingFlow 
        onRestartTour={handleRestartTour}
        currentStage={currentStage}
        setCurrentStage={setCurrentStage}
        personType={personType}
        setPersonType={setPersonType}
      />

      {showWelcomeSurvey && (
        <WelcomeSurvey
          onComplete={handleSurveyComplete}
          onSkip={handleSkipSurvey}
        />
      )}
    </div>
  );
}