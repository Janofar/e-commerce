
import UserManagement from './UserManagement';
import SystemStats from './SystemStats';
import ProductApprovals from './ProductApprovals';

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <SystemStats />
      <UserManagement />
      <ProductApprovals />
    </div>
  );
};

export default AdminDashboard;