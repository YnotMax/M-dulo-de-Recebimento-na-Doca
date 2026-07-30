import React, { useState } from 'react';
import { CountedProduct } from '../types';
import { CheckCircle, AlertTriangle, ArrowLeft, Download, Check } from 'lucide-react';

interface ResultStepProps {
  products: CountedProduct[];
  onConfirm: () => void;
  onBack: () => void;
}

export const ResultStep: React.FC<ResultStepProps> = ({ products, onConfirm, onBack }) => {
  const [isConfirming, setIsConfirming] = useState(false);
  const hasDivergence = products.some(p => p.expectedQuantity !== p.countedQuantity);

  const handleConfirm = () => {
    setIsConfirming(true);
    // Simulate API call to WMS to update stock
    setTimeout(() => {
      onConfirm();
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Resultado da Conferência</h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Validação das contagens físicas versus faturamento XML.</p>
        </div>
        <button 
          onClick={onBack}
          className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Voltar
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th className="p-4 w-1/3">Código / Item</th>
                <th className="p-4 text-center">Qtd XML (Faturado)</th>
                <th className="p-4 text-center">Contagem Física</th>
                <th className="p-4 text-right">Resultado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {products.map(product => {
                const diff = (product.countedQuantity || 0) - product.expectedQuantity;
                const isMatch = diff === 0;

                return (
                  <tr key={product.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-slate-900 dark:text-slate-100 text-sm">{product.code}</div>
                      <div className="text-slate-500 dark:text-slate-400 text-sm">{product.name}</div>
                    </td>
                    <td className="p-4 text-center text-slate-500 dark:text-slate-400 font-medium">
                      {product.expectedQuantity} UN
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-semibold text-slate-900 dark:text-white text-lg">{product.countedQuantity} UN</span>
                    </td>
                    <td className="p-4 text-right">
                      {isMatch ? (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-semibold border border-green-200 dark:border-green-800">
                          <CheckCircle className="w-4 h-4" />
                          <span>BATEU (100%)</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-semibold border border-red-200 dark:border-red-800">
                          <AlertTriangle className="w-4 h-4" />
                          <span>DIVERGÊNCIA ({diff > 0 ? `+${diff}` : diff})</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex-1">
          {hasDivergence ? (
            <div className="flex items-start gap-3 text-amber-800 dark:text-amber-500">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 mt-0.5" />
              <div>
                <p className="font-semibold">Atenção: Divergências Encontradas</p>
                <p className="text-sm mt-1 opacity-90 text-amber-700 dark:text-amber-400/90">Ao confirmar, as faltas/sobras gerarão um alerta automático para o supervisor e a área de compras.</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3 text-green-800 dark:text-green-500">
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500 mt-0.5" />
              <div>
                <p className="font-semibold">Conferência Perfeita</p>
                <p className="text-sm mt-1 opacity-90 text-green-700 dark:text-green-400/90">Todas as quantidades batem com o documento fiscal. O estoque pode ser atualizado.</p>
              </div>
            </div>
          )}
        </div>
        
        <button
          onClick={handleConfirm}
          disabled={isConfirming}
          className={`px-8 py-3.5 rounded-lg font-medium shadow-sm transition-all flex items-center justify-center gap-2 flex-shrink-0 ${
            isConfirming 
              ? 'bg-blue-400 text-white cursor-wait'
              : hasDivergence 
                ? 'bg-amber-600 hover:bg-amber-700 text-white' 
                : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          {isConfirming ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processando Integração...
            </>
          ) : (
            <>
              <Check className="w-5 h-5" />
              Confirmar Recebimento (WMS)
            </>
          )}
        </button>
      </div>
    </div>
  );
};
