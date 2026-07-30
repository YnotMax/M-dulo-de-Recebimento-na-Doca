import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageSrc: string;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose, title, imageSrc }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
          <img 
            src={imageSrc} 
            alt={title} 
            className="max-w-full h-auto rounded-lg shadow-sm border border-slate-200 dark:border-slate-800"
            onError={(e) => {
              // Fallback para caso a imagem não tenha sido enviada para a pasta public ainda
              e.currentTarget.src = `https://placehold.co/600x800/e2e8f0/475569?text=${encodeURIComponent('Faça o upload de\n' + imageSrc.replace('/', '') + '\nna pasta public')}`;
            }}
          />
        </div>
      </div>
    </div>
  );
};
