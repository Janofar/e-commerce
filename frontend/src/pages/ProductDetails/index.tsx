
import { useParams } from 'react-router-dom';
import { useProduct } from '../../hooks/useProducts';
import ProductImages from './components/ProductImages';
import ProductInfo from './components/ProductInfo';
import RelatedProducts from './components/RelatedProducts';
import ProductReviews from './components/ProductReviews';

const ProductDetails = () => {
  const { id } = useParams();
  const { product, isLoading } = useProduct(id);

  if (isLoading) {
    return <div className="animate-pulse">
      <div className="h-96 bg-gray-100 rounded-lg mb-8" />
      <div className="h-32 bg-gray-100 rounded-lg" />
    </div>;
  }

  if (!product) {
    return <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
    </div>;
  }

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductImages images={product.images} />
        <ProductInfo product={product} />
      </div>
      <ProductReviews productId={product.id} />
      <RelatedProducts category={product.category} currentProductId={product.id} />
    </div>
  );
};

export default ProductDetails;