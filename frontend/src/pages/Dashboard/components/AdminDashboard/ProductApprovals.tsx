
import { CheckCircle, XCircle } from 'lucide-react';

const ProductApprovals = () => {
  const pendingProducts = [
    { 
      id: 1, 
      name: 'Wireless Earbuds', 
      seller: 'Tech Store',
      price: 79.99,
      submitted: '2024-02-20'
    },
    { 
      id: 2, 
      name: 'Smart Watch Pro', 
      seller: 'Gadget World',
      price: 199.99,
      submitted: '2024-02-19'
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Pending Approvals</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4">Product</th>
                <th className="pb-4">Seller</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Submitted</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pendingProducts.map((product) => (
                <tr key={product.id}>
                  <td className="py-4">{product.name}</td>
                  <td className="py-4">{product.seller}</td>
                  <td className="py-4">${product.price}</td>
                  <td className="py-4">{product.submitted}</td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button className="p-1 text-green-600 hover:text-green-800">
                        <CheckCircle className="h-5 w-5" />
                      </button>
                      <button className="p-1 text-red-600 hover:text-red-800">
                        <XCircle className="h-5 w-5" />
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

export default ProductApprovals;