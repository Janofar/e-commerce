
import { Package } from 'lucide-react';

const OrderHistory = () => {
  // This would fetch from your orders table in Supabase
  const orders = [];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Order History</h2>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No orders</h3>
          <p className="mt-1 text-sm text-gray-500">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Order list would go here */}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;