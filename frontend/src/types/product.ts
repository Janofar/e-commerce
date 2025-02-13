export interface Product {
  id: number,
  name: string,
  slug: string,
  description: string,
  price: number,
  categoryId: number,
  currency: string,
  imagePaths: string[] | null,
}

export interface ProductVariation {
  attributeId: number;
  name: string;
  value : string;
  price : number;
  stock : number;
}

export interface ProductInput{
  name: string,
  description: string,
  price: number,
  stock : number,
  categoryId: number,
  currency: string,
  images: File[],
  variations: ProductVariation[];
}