import React, { useEffect, useState } from 'react';
import { Loader2, ShieldCheck, FileJson, Server } from 'lucide-react';

interface ProcessingStepProps {
  onComplete: () => void;
}

const steps = [
  { label: 'Autenticando Certificado A1 na SEFAZ', icon: ShieldCheck },
  { label: 'Baixando XML oficial', icon: Server },
  { label: 'Extraindo dados dos produtos', icon: FileJson },
];

export const ProcessingStep: React.FC<ProcessingStepProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let timer: number;
    if (currentStep < steps.length) {
      timer = window.setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1000); // 1 second per step
    } else {
      timer = window.setTimeout(() => {
        onComplete();
      }, 500);
    }
    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 w-full max-w-md mx-auto space-y-10">
      <div className="relative flex items-center justify-center">
        <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-500 animate-spin absolute" />
        <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full z-10 flex items-center justify-center">
          {React.createElement(steps[Math.min(currentStep, steps.length - 1)].icon, {
            className: "w-6 h-6 text-blue-600 dark:text-blue-500"
          })}
        </div>
      </div>
      
      <div className="w-full space-y-4">
        {steps.map((step, index) => {
          const isActive = index === currentStep;
          const isDone = index < currentStep;
          
          return (
            <div 
              key={index} 
              className={`flex items-center gap-4 transition-opacity duration-300 ${
                isActive ? 'opacity-100' : isDone ? 'opacity-60' : 'opacity-30'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                isDone ? 'bg-green-100 dark:bg-green-900/30 border-green-500 dark:border-green-600 text-green-600 dark:text-green-500' :
                isActive ? 'border-blue-500 dark:border-blue-600 text-blue-600 dark:text-blue-500 bg-blue-50 dark:bg-blue-900/30 animate-pulse' :
                'border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900'
              }`}>
                {isDone ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <span className={`text-sm font-medium ${
                isDone ? 'text-slate-600 dark:text-slate-400' :
                isActive ? 'text-slate-900 dark:text-slate-200' :
                'text-slate-400 dark:text-slate-500'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
