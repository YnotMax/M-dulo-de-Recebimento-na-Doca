import { NFeData } from '../types';

export const fetchNFeFromSefaz = async (key: string): Promise<NFeData> => {
  // Simulate network delay and SEFAZ / Certificate A1 processing
  await new Promise(resolve => setTimeout(resolve, 3000));

  return {
    key,
    provider: 'Fábrica de Componentes Eletro S/A',
    cnpj: '12.345.678/0001-99',
    date: new Date().toISOString(),
    products: [
      { id: '1', code: 'PROD-101', name: 'Conector M8', ean: '7891000000101', expectedQuantity: 100 },
      { id: '2', code: 'PROD-102', name: 'Sensor Óptico', ean: '7891000000102', expectedQuantity: 50 },
      { id: '3', code: 'PROD-103', name: 'Cabo de Cobre 2mm (50m)', ean: '7891000000103', expectedQuantity: 10 },
    ]
  };
};
