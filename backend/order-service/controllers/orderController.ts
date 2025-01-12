// src/controllers/OrderController.ts
import { Request, Response } from 'express';
import  OrderService  from '../services/orderService';

class OrderController {
 
  // Create a new order
  async createOrder(req: Request, res: Response):Promise<void> {
    try {
      const order = await OrderService.createOrder(req.body);
       res.status(201).json(order);
    } catch (error) {
       res.status(400).json({ error: (error as Error).message });
    }
  }

  // Get all orders
  async getOrders(req: Request, res: Response):Promise<void> {
    try {
      const orders = await OrderService.getOrders();
       res.status(200).json(orders);
    } catch (error) {
       res.status(400).json({ error: (error as Error).message });
    }
  }

  // Get order by ID
  async getOrderById(req: Request, res: Response) :Promise<void>{
    try {
      const order = await OrderService.getOrderById(Number(req.params.id));
      if (!order) {
         res.status(404).json({ message: 'Order not found' });
      }
       res.status(200).json(order);
    } catch (error) {
       res.status(400).json({ error: (error as Error).message });
    }
  }

  // Update order by ID
  async updateOrder(req: Request, res: Response):Promise<void> {
    try {
      const order = await OrderService.updateOrder(Number(req.params.id), req.body);
      if (!order) {
         res.status(404).json({ message: 'Order not found' });
      }
       res.status(200).json(order);
    } catch (error) {
       res.status(400).json({ error: (error as Error).message });
    }
  }

  // Delete order by ID
  async deleteOrder(req: Request, res: Response):Promise<void> {
    try {
      const success = await OrderService.deleteOrder(Number(req.params.id));
      if (!success) {
         res.status(404).json({ message: 'Order not found' });
      }
       res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
       res.status(400).json({ error: (error as Error).message });
    }
  }

  // Get orders by userId
  async getOrdersByUserId(req: Request, res: Response) :Promise<void> {
    try {
      const orders = await OrderService.getOrdersByUserId(Number(req.params.userId));
       res.status(200).json(orders);
    } catch (error) {
       res.status(400).json({ error: (error as Error).message });
    }
  }
}
export default new OrderController();