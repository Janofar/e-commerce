import ProductRepository from '../repositories/productRepository';
import { IProduct } from '../models/product';

class ProductService {
  async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    return await ProductRepository.createProduct(productData);
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
