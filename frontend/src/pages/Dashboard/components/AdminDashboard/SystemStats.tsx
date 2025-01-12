
import { Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, change }: any) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        {change && (
          <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {change > 0 ? '+' : ''}{change}% from last month
          </p>
        )}
      </div>
      <Icon className="h-8 w-8 text-indigo-600" />
    </div>
  </div>
);

const SystemStats = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">System Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="1,234"
          icon={Users}
          change={15}
        />
        <StatCard
          title="Active Products"
          value="856"
          icon={ShoppingBag}
          change={8}
        />
        <StatCard
          title="Total Revenue"
          value="$45,678"
          icon={DollarSign}
          change={12}
        />
        <StatCard
          title="System Health"
          value="98.5%"
          icon={Activity}
        />
      </div>
    </div>
  );
};

export default SystemStats;