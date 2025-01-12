import { Router } from 'express';
import CartController from '../controllers/cartController';

const router = Router();

router.post('/', CartController.addToCart);
router.get('/:id', CartController.getCartById);
router.get('/user/:userId', CartController.getCartByUserId);
router.put('/:id', CartController.updateCartItem);
router.delete('/:id', CartController.removeCartItem);
router.delete('/user/:userId', CartController.clearCartByUserId);

export default router;
