
import { useNavigate } from 'react-router-dom';
import ProductCard from '../../../components/ProductCard';
import { useFeaturedProducts } from '../../../hooks/useProducts';

const FeaturedProducts = () => {
  const { products, isLoading } = useFeaturedProducts();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="h-96 bg-gray-100 rounded-lg animate-pulse" />
      ))}
    </div>;
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
        <button 
          onClick={() => navigate('/products')}
          className="text-indigo-600 hover:text-indigo-800"
        >
          View All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products?.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;