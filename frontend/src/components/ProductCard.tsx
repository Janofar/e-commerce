
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingCart } from 'lucide-react';
import { addItem } from '../store/slices/cartSlice';
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1
    }));
  };

  return (
    <div 
      onClick={() => navigate(`/products/${product.id}`)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-indigo-600 hover:text-white transition-colors"
        >
          <ShoppingCart className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard;