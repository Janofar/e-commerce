import Cart from '../models/Cart';

class CartRepository {
  async addToCart(data: Partial<Cart>): Promise<Cart> {
    return await Cart.create(data);
  }

  async getCartById(id: number): Promise<Cart | null> {
    return await Cart.findByPk(id);
  }

  async getCartByUserId(userId: number): Promise<Cart[]> {
    return await Cart.findAll({ where: { userId } });
  }

  async updateCartItem(id: number, data: Partial<Cart>): Promise<[number]> {
    return await Cart.update(data, { where: { id } });
  }

  async removeCartItem(id: number): Promise<number> {
    return await Cart.destroy({ where: { id } });
  }

  async clearCartByUserId(userId: number): Promise<number> {
    return await Cart.destroy({ where: { userId } });
  }
}

export default new CartRepository();
