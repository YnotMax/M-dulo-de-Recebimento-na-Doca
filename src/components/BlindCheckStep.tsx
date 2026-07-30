import React, { useState } from 'react';
import { CountedProduct, NFeData } from '../types';
import { Package, ArrowRight, Save, Plus, Minus } from 'lucide-react';

interface BlindCheckStepProps {
  nfeData: NFeData;
  onComplete: (products: CountedProduct[]) => void;
}

export const BlindCheckStep: React.FC<BlindCheckStepProps> = ({ nfeData, onComplete }) => {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const handleCountChange = (productId: string, value: string) => {
    if (value === '') {
      setCounts(prev => {
        const next = { ...prev };
        delete next[productId];
        return next;
      });
      return;
    }
    const val = parseInt(value, 10);
    setCounts(prev => ({
      ...prev,
      [productId]: isNaN(val) ? 0 : val
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const resultProducts: CountedProduct[] = nfeData.products.map(p => ({
      ...p,
      countedQuantity: counts[p.id] ?? 0
    }));
    onComplete(resultProducts);
  };

  const isAllCounted = nfeData.products.every(p => counts[p.id] !== undefined);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-full max-h-[85vh]">
      <div className="flex flex-col gap-1 mb-6 px-4">
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Conferência Cega</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm">
          Fornecedor: <span className="font-medium text-slate-800 dark:text-slate-200">{nfeData.provider}</span>
        </p>
        <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 bg-slate-100 dark:bg-slate-800 p-2 rounded inline-block w-fit font-mono">
          Chave: {nfeData.key}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col flex-1 min-h-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200 p-4 rounded-lg text-sm mb-6 flex gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <Package className="w-5 h-5 text-yellow-600 dark:text-yellow-500" />
            </div>
            <div>
              <p className="font-semibold mb-1">Atenção Operador</p>
              <p>As quantidades faturadas foram ocultadas. Realize a contagem física e preencha as caixas abaixo bipando os itens ou digitando manualmente.</p>
            </div>
          </div>

          {nfeData.products.map(product => (
            <div key={product.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <div className="flex-1">
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 tracking-wider uppercase mb-1">{product.code}</p>
                <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 leading-tight">{product.name}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 font-mono mt-2 flex items-center gap-2">
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">EAN: {product.ean}</span>
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <label htmlFor={`qty-${product.id}`} className="text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap mr-2">
                  Qtd Física:
                </label>
                <button 
                  type="button" 
                  onClick={() => handleCountChange(product.id, String(Math.max(0, (counts[product.id] || 0) - 1)))}
                  className="w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors"
                >
                  <Minus className="w-6 h-6" />
                </button>
                <input
                  id={`qty-${product.id}`}
                  type="number"
                  min="0"
                  value={counts[product.id] === undefined ? '' : counts[product.id]}
                  onChange={(e) => handleCountChange(product.id, e.target.value)}
                  placeholder="0"
                  className="w-20 text-center px-2 py-2 text-xl font-semibold border-2 border-slate-200 dark:border-slate-700 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white dark:bg-slate-900 text-slate-900 dark:text-white hide-arrows"
                  required
                />
                <button 
                  type="button"
                  onClick={() => handleCountChange(product.id, String((counts[product.id] || 0) + 1))}
                  className="w-12 h-12 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors mr-2"
                >
                  <Plus className="w-6 h-6" />
                </button>
                <span className="text-slate-400 dark:text-slate-500 font-medium">UN</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-auto flex-shrink-0">
          <button
            type="submit"
            disabled={!isAllCounted}
            className={`w-full py-4 px-6 rounded-xl font-medium flex items-center justify-center gap-2 transition-all ${
              isAllCounted 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 cursor-not-allowed'
            }`}
          >
            <Save className="w-5 h-5" />
            Finalizar Conferência e Validar
          </button>
        </div>
      </form>
    </div>
  );
};
