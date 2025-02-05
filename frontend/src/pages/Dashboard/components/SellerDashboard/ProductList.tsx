
import { PlusCircle, Edit2, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
  const products = [
    { id: 1, name: 'Wireless Headphones', price: 99.99, stock: 45, status: 'In Stock' },
    { id: 2, name: 'Smart Watch', price: 199.99, stock: 12, status: 'Low Stock' },
    { id: 3, name: 'Bluetooth Speaker', price: 79.99, stock: 0, status: 'Out of Stock' },
  ];
  const navigate = useNavigate();
  const handleAddProduct = ()=>{
    navigate('/add-product')
  }

  const handleAddCategory = ()=>{
    navigate('/add-category')
  }
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Products</h2>
          <div className='flex space-x-4'>
            <button onClick={handleAddProduct} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Product
            </button>
            <button onClick={handleAddCategory} className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Category
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4">Name</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Stock</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="py-4">{product.name}</td>
                  <td className="py-4">${product.price}</td>
                  <td className="py-4">{product.stock}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      product.stock === 0
                        ? 'bg-red-100 text-red-800'
                        : product.stock < 20
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button className="text-gray-600 hover:text-indigo-600">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductList;