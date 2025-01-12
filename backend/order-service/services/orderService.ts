import  OrderRepository  from '../repositories/orderRepository';

export class OrderService {

  // Create a new order
  async createOrder(data: any) {
    return await OrderRepository.createOrder(data);
  }

  async getOrders() {
    return await OrderRepository.getOrders();
  }

  // Get a single order by ID
  async getOrderById(id: number) {
    return await OrderRepository.getOrderById(id);
  }

  // Update an order by ID
  async updateOrder(id: number, data: any) {
    return await OrderRepository.updateOrder(id, data);
  }

  // Delete an order by ID
  async deleteOrder(id: number) {
    return await OrderRepository.deleteOrder(id);
  }

  // Get orders by userId
  async getOrdersByUserId(userId: number) {
    return await OrderRepository.getOrdersByUserId(userId);
  }
}

export default new OrderService()
