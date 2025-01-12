import { Router } from 'express';
import  OrderController  from '../controllers/orderController';

const router: Router = Router();

router.post('/', OrderController.createOrder);
router.get('/', OrderController.getOrders);
router.get('/:id', OrderController.getOrderById);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);
router.get('/user/:userId', OrderController.getOrdersByUserId);

export default router;
