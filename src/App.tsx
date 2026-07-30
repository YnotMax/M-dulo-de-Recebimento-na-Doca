import React, { useState } from 'react';
import { Package, Truck, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { AppStep, NFeData, CountedProduct } from './types';
import { fetchNFeFromSefaz } from './lib/mockApi';

import { ScannerStep } from './components/ScannerStep';
import { ProcessingStep } from './components/ProcessingStep';
import { BlindCheckStep } from './components/BlindCheckStep';
import { ResultStep } from './components/ResultStep';

export default function App() {
  const [step, setStep] = useState<AppStep>('SCAN');
  const [nfeKey, setNfeKey] = useState<string>('');
  const [nfeData, setNfeData] = useState<NFeData | null>(null);
  const [countedProducts, setCountedProducts] = useState<CountedProduct[]>([]);
  const [isDark, setIsDark] = useState(false);

  const handleScan = async (key: string) => {
    setNfeKey(key);
    setStep('PROCESS');
    try {
      const data = await fetchNFeFromSefaz(key);
      setNfeData(data);
    } catch (error) {
      console.error("Failed to fetch NFe data", error);
      // In a real app, handle error state here
      setStep('SCAN');
    }
  };

  const handleProcessComplete = () => {
    if (nfeData) {
      setStep('BLIND_CHECK');
    }
  };

  const handleBlindCheckComplete = (products: CountedProduct[]) => {
    setCountedProducts(products);
    setStep('RESULT');
  };

  const handleResultConfirm = () => {
    setStep('DONE');
  };

  const resetApp = () => {
    setStep('SCAN');
    setNfeKey('');
    setNfeData(null);
    setCountedProducts([]);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans transition-colors duration-200">
        {/* Header */}
        <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-slate-900 dark:text-white leading-tight">Módulo de Doca</h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">WMS Core</p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 hidden sm:inline-block mr-2">Operador: OP-9821</span>
              <button 
                onClick={() => setIsDark(!isDark)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                aria-label="Toggle Dark Mode"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                <LayoutDashboard className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
          <div className="w-full flex-1 flex flex-col max-w-7xl mx-auto items-center justify-center">
          
          {step === 'SCAN' && (
            <ScannerStep onScan={handleScan} />
          )}

          {step === 'PROCESS' && (
            <ProcessingStep onComplete={handleProcessComplete} />
          )}

          {step === 'BLIND_CHECK' && nfeData && (
            <BlindCheckStep 
              nfeData={nfeData} 
              onComplete={handleBlindCheckComplete} 
            />
          )}

          {step === 'RESULT' && (
            <ResultStep 
              products={countedProducts} 
              onConfirm={handleResultConfirm}
              onBack={() => setStep('BLIND_CHECK')}
            />
          )}

          {step === 'DONE' && (
            <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900 border border-green-200 dark:border-green-900/50 rounded-2xl shadow-sm text-center max-w-lg w-full transition-colors duration-200">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <Package className="w-10 h-10 text-green-600 dark:text-green-500" />
              </div>
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white mb-2">Recebimento Concluído</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                O evento <strong>RECEBIMENTO_CONCLUIDO</strong> foi disparado. 
                As ordens de armazenagem (Putaway) foram liberadas e o saldo físico (Kardex) foi atualizado.
              </p>
              <button 
                onClick={resetApp}
                className="px-6 py-3 w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all"
              >
                Escanear Próxima Nota
              </button>
            </div>
          )}

        </div>
      </main>
      </div>
    </div>
  );
}
