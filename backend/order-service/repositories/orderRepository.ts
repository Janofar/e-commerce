// src/repositories/OrderRepository.ts
import  Order  from '../models/Order';

export class OrderRepository {
  // Create a new order
  async createOrder(data: any) {
    return await Order.create(data);
  }

  // Get all orders
  async getOrders() {
    return await Order.findAll();
  }

  // Get a single order by ID
  async getOrderById(id: number) {
    return await Order.findByPk(id);
  }

  // Update an order by ID
  async updateOrder(id: number, data: any) {
    const order = await this.getOrderById(id);
    if (order) {
      return await order.update(data);
    }
    return null;
  }

  // Delete an order by ID
  async deleteOrder(id: number) {
    const order = await this.getOrderById(id);
    if (order) {
      await order.destroy();
      return true;
    }
    return false;
  }

  // Get orders by userId
  async getOrdersByUserId(userId: number) {
    return await Order.findAll({ where: { userId } });
  }
}

export default new OrderRepository();
