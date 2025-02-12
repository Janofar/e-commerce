import ProductRepository from '../repositories/productRepository';
import  {IProduct}  from '../models/Product';
import { generateSlug } from '../utils/helper';
import { Product, ProductInput } from '../types/product';
import { Transaction } from 'sequelize';

class ProductService {
  async createProduct(productData: ProductInput,options?: { transaction?: Transaction,imagePaths : string[] | null }): Promise<IProduct> {
    const updatedData : Product = { ...productData, slug: generateSlug(productData.name),imagePaths : options?.imagePaths || null}
    return await ProductRepository.createProduct(updatedData);
  }

  async getAllProducts(): Promise<IProduct[]> {
    return await ProductRepository.getAllProducts();
  }

  async getProductById(productId: string): Promise<IProduct | null> {
    return await ProductRepository.getProductById(productId);
  }

  async updateProduct(productId: string, updates: Partial<IProduct>): Promise<IProduct | null> {
    return await ProductRepository.updateProduct(productId, updates);
  }

  async deleteProduct(productId: string): Promise<IProduct | null> {
    return await ProductRepository.deleteProduct(productId);
  }
}

export default new ProductService();
