
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user?.user_metadata?.name || 'User'}</p>
      </div>
      
      <div className="grid gap-8">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;