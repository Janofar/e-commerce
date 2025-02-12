export interface ProductInput{
    name: string,
    description: string,
    price: number,
    categoryId: number,
    currency: string,
    images: File[],
  }

  export interface Product {
    id?: number,
    name: string,
    slug: string,
    description: string,
    price: number,
    categoryId: number,
    currency: string,
    imagePaths: string[] | null,
}