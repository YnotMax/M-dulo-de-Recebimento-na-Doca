export interface Product {
  id: string;
  code: string;
  name: string;
  ean: string;
  expectedQuantity: number;
}

export interface CountedProduct extends Product {
  countedQuantity?: number;
}

export interface NFeData {
  key: string;
  provider: string;
  cnpj: string;
  date: string;
  products: Product[];
}

export type AppStep = 'SCAN' | 'PROCESS' | 'BLIND_CHECK' | 'RESULT' | 'DONE';
