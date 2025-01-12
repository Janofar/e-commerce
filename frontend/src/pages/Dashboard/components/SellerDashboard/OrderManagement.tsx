
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const OrderStatus = ({ status }: { status: string }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  }[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`px-2 py-1 rounded-full text-sm ${styles}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const OrderManagement = () => {
  const recentOrders = [
    { id: 1, customer: 'John Doe', amount: 129.99, status: 'pending' },
    { id: 2, customer: 'Jane Smith', amount: 259.99, status: 'completed' },
    { id: 3, customer: 'Mike Johnson', amount: 89.99, status: 'cancelled' },
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-500">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td className="py-4">#{order.id}</td>
                  <td className="py-4">{order.customer}</td>
                  <td className="py-4">${order.amount}</td>
                  <td className="py-4">
                    <OrderStatus status={order.status} />
                  </td>
                  <td className="py-4">
                    <button className="text-indigo-600 hover:text-indigo-800">
                      View Details
                    </button>
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

export default OrderManagement;