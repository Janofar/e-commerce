
import ProductList from './ProductList';
import SalesOverview from './SalesOverview';
import OrderManagement from './OrderManagement';

const SellerDashboard = () => {
  return (
    <div className="space-y-8">
      <SalesOverview />
      <OrderManagement />
      <ProductList />
    </div>
  );
};

export default SellerDashboard;