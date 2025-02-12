import Product, { IProduct } from '../models/Product';
import { generateSlug } from '../utils/helper';

class ProductRepository {
  async createProduct(productData: IProduct): Promise<IProduct> {
    return await Product.create(productData);
  }

  async getAllProducts(): Promise<IProduct[]> {
    return await Product.findAll();
  }

  async getProductById(productId: string): Promise<IProduct | null> {
    return await Product.findOne({ where: { id : productId} });
  }

  async updateProduct(productId: string, updates: Partial<IProduct>): Promise<IProduct | null> {
    await Product.update(updates, { where: { id: productId } });
    return await Product.findOne({ where: { id: productId } });
  }

  async deleteProduct(productId: string): Promise<IProduct | null> {
    const product = await Product.findOne({ where: { id: productId } });
    if (product) {
      await Product.destroy({ where: { id: productId } });
    }
    return product;
  }
}

export default new ProductRepository();
