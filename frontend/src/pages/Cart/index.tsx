
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CartItems from './components/CartItems';
import CartSummary from './components/CartSummary';
import EmptyCart from './components/EmptyCart';

const Cart = () => {
  const { items } = useSelector((state: RootState) => state.cart);

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CartItems items={items} />
        </div>
        <div>
          <CartSummary />
        </div>
      </div>
    </div>
  );
};

export default Cart;