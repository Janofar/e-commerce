
import { useDispatch } from 'react-redux';
import { Star, Truck, ShieldCheck } from 'lucide-react';
import { addItem } from '../../../store/slices/cartSlice';
import type { Product } from '../../../types/product';

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <div className="mt-2 flex items-center gap-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < product.rating
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">
            {product.reviews} reviews
          </span>
        </div>
      </div>

      <div className="border-t border-b py-4">
        <p className="text-3xl font-bold text-gray-900">
          ${product.price.toFixed(2)}
        </p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center text-sm text-gray-500">
            <Truck className="h-5 w-5 mr-2" />
            Free shipping
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <ShieldCheck className="h-5 w-5 mr-2" />
            1 year warranty
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Description</h2>
        <p className="text-gray-600">{product.description}</p>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="w-full py-3 px-8 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </button>
    </div>
  );
};

export default ProductInfo;