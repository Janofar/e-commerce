
import { TrendingUp, DollarSign, Package, ShoppingCart } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, trend }: any) => (
  <div className="bg-white rounded-lg shadow p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
        {trend && (
          <p className={`text-sm mt-1 ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend > 0 ? '+' : ''}{trend}% from last month
          </p>
        )}
      </div>
      <Icon className="h-8 w-8 text-indigo-600" />
    </div>
  </div>
);

const SalesOverview = () => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-900">Sales Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Total Sales"
          value="$12,426"
          icon={DollarSign}
          trend={12}
        />
        <StatCard
          title="Revenue"
          value="$8,324"
          icon={TrendingUp}
          trend={8}
        />
        <StatCard
          title="Products"
          value="45"
          icon={Package}
        />
        <StatCard
          title="Orders"
          value="128"
          icon={ShoppingCart}
          trend={-3}
        />
      </div>
    </div>
  );
};

export default SalesOverview;