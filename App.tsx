// Fix: Replaced placeholder content with the full implementation of the App component.
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import DiagnosisTool from './components/DiagnosisTool';
import ReportPage from './components/ReportPage';
import { View, DiagnosisResult } from './types';
import { clearAllData } from './services/storageService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [currentResult, setCurrentResult] = useState<DiagnosisResult | null>(null);

  const handleStart = () => {
    setCurrentView('diagnosis');
    setCurrentResult(null);
  };

  const handleDiagnosisComplete = (result: DiagnosisResult) => {
    setCurrentResult(result);
    setCurrentView('report');
  };
  
  // New handler to receive the final result with suggestions and update the app's state
  const handleSuggestionsGenerated = (updatedResult: DiagnosisResult) => {
    setCurrentResult(updatedResult); // Update the source of truth with the new data
  };

  const handleBackToDiagnosis = () => {
    setCurrentView('diagnosis');
    setCurrentResult(null);
  };

  const handleGoHome = () => {
    clearAllData();
    setCurrentView('landing');
    setCurrentResult(null);
  };

  const navigate = (view: View) => {
    if (view === 'report' && !currentResult) {
      setCurrentView('diagnosis');
      return;
    }
    setCurrentView(view);
  };

  const renderContent = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStart={handleStart} />;
      case 'diagnosis':
        return <DiagnosisTool onComplete={handleDiagnosisComplete} />;
      case 'report':
        if (currentResult) {
          // Pass the new handler to ReportPage to lift the state up
          return <ReportPage result={currentResult} onBack={handleBackToDiagnosis} onGoHome={handleGoHome} onSuggestionsGenerated={handleSuggestionsGenerated} />;
        }
        setCurrentView('landing');
        return <LandingPage onStart={handleStart} />;
      default:
        return <LandingPage onStart={handleStart} />;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen">
      <Header onNavigate={navigate} currentView={currentView} />
      <main className={`container mx-auto px-4 ${currentView === 'landing' ? 'pt-4 pb-8 sm:pt-6 sm:pb-12' : 'py-8 sm:py-12'}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;