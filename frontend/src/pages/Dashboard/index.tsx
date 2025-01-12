
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import DashboardLayout from './components/DashboardLayout';
import OrderHistory from './components/OrderHistory';
import AccountSettings from './components/AccountSettings';
import SellerDashboard from './components/SellerDashboard';
import AdminDashboard from './components/AdminDashboard';

const Dashboard = () => {
 // const { role } = useSelector((state: RootState) => state.auth);
  let role = 'seller'
  return (
    <DashboardLayout>
      {role === 'admin' && <AdminDashboard />}
      {role === 'seller' && <SellerDashboard />}
      <OrderHistory />
      <AccountSettings />
    </DashboardLayout>
  );
};

export default Dashboard;