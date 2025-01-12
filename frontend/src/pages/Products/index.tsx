
import { useSearchParams } from 'react-router-dom';
import ProductGrid from './components/ProductGrid';
import FilterSidebar from './components/FilterSidebar';
import ProductSort from './components/ProductSort';
import { useProducts } from '../../hooks/useProducts';

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { products, isLoading } = useProducts({ category });

  return (
    <div className="flex gap-8">
      <FilterSidebar />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : 'All Products'}
          </h1>
          <ProductSort />
        </div>
        <ProductGrid products={products} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Products;