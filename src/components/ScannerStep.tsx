import React, { useState } from 'react';
import { Scan, Barcode } from 'lucide-react';

interface ScannerStepProps {
  onScan: (key: string) => void;
}

export const ScannerStep: React.FC<ScannerStepProps> = ({ onScan }) => {
  const [nfeKey, setNfeKey] = useState('');
  const [error, setError] = useState('');

  const handleScan = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanKey = nfeKey.replace(/\D/g, '');
    if (cleanKey.length !== 44) {
      setError('A chave da NF-e deve conter exatamente 44 dígitos numéricos.');
      return;
    }
    setError('');
    onScan(cleanKey);
  };

  const simulateScan = () => {
    // Generate a valid mock 44-digit key for demo purposes
    const mockKey = '35240712345678000199550010000000101001234567';
    setNfeKey(mockKey);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-8 w-full max-w-md mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">Captura na Doca</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">Escaneie o código de barras do DANFE ou digite a chave de acesso.</p>
      </div>

      <div className="bg-slate-100 dark:bg-slate-900 p-8 rounded-full border-4 border-slate-200 dark:border-slate-800">
        <Barcode className="w-20 h-20 text-slate-400 dark:text-slate-500" />
      </div>

      <form onSubmit={handleScan} className="w-full space-y-4">
        <div className="space-y-1">
          <label htmlFor="nfe-key" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Chave de Acesso (44 dígitos)
          </label>
          <input
            id="nfe-key"
            type="text"
            value={nfeKey}
            onChange={(e) => {
              setNfeKey(e.target.value);
              setError('');
            }}
            placeholder="0000 0000 0000 0000 0000 0000 0000 0000 0000 0000"
            className={`w-full px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:outline-none transition-colors bg-white dark:bg-slate-900 text-slate-900 dark:text-white ${
              error ? 'border-red-500 focus:ring-red-200 dark:focus:ring-red-900/50' : 'border-slate-300 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-200 dark:focus:ring-blue-900/50'
            }`}
          />
          {error && <p className="text-sm text-red-500 dark:text-red-400 mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-all flex items-center justify-center gap-2"
        >
          <Scan className="w-5 h-5" />
          Validar Chave
        </button>
      </form>

      <button
        onClick={simulateScan}
        className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
      >
        Simular escaneamento com coletor laser
      </button>
    </div>
  );
};
