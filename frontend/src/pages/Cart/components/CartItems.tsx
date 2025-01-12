
import { useDispatch } from 'react-redux';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { updateQuantity, removeItem } from '../../../store/slices/cartSlice';
import type { CartItem } from '../../../types/cart';

interface CartItemsProps {
  items: CartItem[];
}

const CartItems = ({ items }: CartItemsProps) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 bg-white p-4 rounded-lg shadow-sm">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 object-cover rounded-md"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            
            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="p-1 rounded-md hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
              <button
                onClick={() => dispatch(removeItem(item.id))}
                className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded-md"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartItems;