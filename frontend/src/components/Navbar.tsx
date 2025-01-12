import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ShoppingCart, User, Store } from 'lucide-react';
import { RootState } from '../store/store';

const Navbar = () => {
  const { items } = useSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">EcoShop</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/products" className="text-gray-600 hover:text-indigo-600">
              Products
            </Link>
            
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <Link to="/dashboard">
                <User className="h-6 w-6 text-gray-600 hover:text-indigo-600" />
              </Link>
            ) : (
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;