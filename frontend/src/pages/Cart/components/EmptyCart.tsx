
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const EmptyCart = () => {
  return (
    <div className="text-center py-16">
      <ShoppingBag className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
      <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
      <Link
        to="/products"
        className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Start Shopping
      </Link>
    </div>
  );
};

export default EmptyCart;