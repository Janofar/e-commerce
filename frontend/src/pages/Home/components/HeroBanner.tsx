
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroBanner = () => {
  return (
    <div className="relative h-[600px] bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-lg text-white">
            <h1 className="text-5xl font-bold mb-6">Discover Unique Products</h1>
            <p className="text-xl mb-8">Find the perfect items from our curated collection of premium products.</p>
            <Link 
              to="/products" 
              className="inline-flex items-center px-6 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition-colors"
            >
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;