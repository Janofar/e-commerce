import { Transaction } from 'sequelize';
import Product, { IProduct } from '../models/Product';
import ProductVariation from '../models/ProductVariation';
import { generateSlug } from '../utils/helper';

class ProductRepository {
  async createProduct(productData: IProduct,options: { transaction?: Transaction }): Promise<IProduct> {
    return await Product.create(productData, { transaction: options.transaction });
  }

  async createProductVariation(productId: number,options: { transaction?: Transaction , variation: { name: string,attributeId: number, value: string, price: number, stock: number }}): Promise<ProductVariation | null> {
    console.log(options,"optionss")
    return await ProductVariation.create({ response: JSON.stringify({ key: options.variation.name, value: options.variation.value }), price: options.variation.price, stock: options.variation.stock, productId, attributeId : options.variation.attributeId },{transaction: options.transaction});
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
