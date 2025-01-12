import { Product, IProduct } from '../models/product';

class ProductRepository {
  async createProduct(productData: Partial<IProduct>): Promise<IProduct> {
    return await Product.create(productData);
  }

  async getAllProducts(): Promise<IProduct[]> {
    return await Product.find();
  }

  async getProductById(productId: string): Promise<IProduct | null> {
    return await Product.findById(productId);
  }

  async updateProduct(productId: string, updates: Partial<IProduct>): Promise<IProduct | null> {
    return await Product.findByIdAndUpdate(productId, updates, { new: true });
  }

  async deleteProduct(productId: string): Promise<IProduct | null> {
    return await Product.findByIdAndDelete(productId);
  }
}

export default new ProductRepository();
