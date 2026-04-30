export interface Product {
  id: string;
  nameCn: string;
  nameEn: string;
  category: string;
  categoryEn: string;
  glaze: string;
  glazeEn: string;
  glazeColor: string;
  dimensions: string;
  price: number;
  image: string;
  descriptionCn: string;
  descriptionEn: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface GiftSet {
  id: string;
  nameCn: string;
  nameEn: string;
  contentsCn: string[];
  contentsEn: string[];
  occasionCn: string;
  occasionEn: string;
  price: number;
  image: string;
}

export interface ProcessStep {
  number: string;
  titleCn: string;
  titleEn: string;
  descCn: string;
  descEn: string;
  image: string;
}

export type Lang = 'zh' | 'en';
