import CartRepository from '../repositories/cartRepository';
import Cart from '../models/Cart';

class CartService {
  async addToCart(data: Partial<Cart>): Promise<Cart> {
    return await CartRepository.addToCart(data);
  }

  async getCartById(id: number): Promise<Cart | null> {
    return await CartRepository.getCartById(id);
  }

  async getCartByUserId(userId: number): Promise<Cart[]> {
    return await CartRepository.getCartByUserId(userId);
  }

  async updateCartItem(id: number, data: Partial<Cart>): Promise<[number]> {
    return await CartRepository.updateCartItem(id, data);
  }

  async removeCartItem(id: number): Promise<number> {
    return await CartRepository.removeCartItem(id);
  }

  async clearCartByUserId(userId: number): Promise<number> {
    return await CartRepository.clearCartByUserId(userId);
  }
}

export default new CartService();
