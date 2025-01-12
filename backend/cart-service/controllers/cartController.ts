import { Request, Response } from 'express';
import CartService from '../services/cartService';

class CartController {
    async addToCart(req: Request, res: Response): Promise<void> {
        try {
            const cartItem = await CartService.addToCart(req.body);
            res.status(201).json(cartItem);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getCartById(req: Request, res: Response): Promise<void> {
        try {
            const cartItem = await CartService.getCartById(Number(req.params.id));
            if (!cartItem) {
                res.status(404).json({ message: 'Cart item not found' });
                return;
            }
            res.status(200).json(cartItem);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getCartByUserId(req: Request, res: Response): Promise<void> {
        try {
            const cartItems = await CartService.getCartByUserId(Number(req.params.userId));
            res.status(200).json(cartItems);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updateCartItem(req: Request, res: Response): Promise<void> {
        try {
            const [rowsUpdated] = await CartService.updateCartItem(Number(req.params.id), req.body);
            if (rowsUpdated === 0) {
                res.status(404).json({ message: 'Cart item not found' });
                return;
            }
            res.status(200).json({ message: 'Cart item updated successfully' });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async removeCartItem(req: Request, res: Response): Promise<void> {
        try {
            const rowsDeleted = await CartService.removeCartItem(Number(req.params.id));
            if (rowsDeleted === 0) {
                res.status(404).json({ message: 'Cart item not found' });
                return;
            }

            res.status(200).json({ message: 'Cart item removed successfully' });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async clearCartByUserId(req: Request, res: Response): Promise<void> {
        try {
            const rowsDeleted = await CartService.clearCartByUserId(Number(req.params.userId));
            res.status(200).json({ message: `Removed ${rowsDeleted} items from the cart` });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}

export default new CartController();
