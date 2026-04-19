import { useState, useEffect } from "react";
import api from "../utils/api";
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Clock, 
  CheckCircle,
  AlertCircle,
  IndianRupee,
  ArrowUpRight
} from "lucide-react";
import { motion } from "motion/react";

export function AdminOverview() {
  const [stats, setStats] = useState({
    totalPets: 0,
    pendingPets: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/stats');
      setStats(res.data.data.stats);
    } catch (err) {
      console.error("Failed to fetch dashboard stats", err);
      toast.error("Dashboard data sync failed");
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: "Total Revenue", value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: "bg-green-500", trend: "+12.5%" },
    { label: "Pending Approvals", value: stats.pendingPets, icon: Clock, color: "bg-orange-500", trend: "High Priority" },
    { label: "Total Orders", value: stats.totalOrders, icon: ShoppingCart, color: "bg-blue-500", trend: "+5.2%" },
    { label: "Total Pets", value: stats.totalPets, icon: TrendingUp, color: "bg-purple-500", trend: "+3.1%" },
  ];

  if (loading) {
    return <div className="h-96 flex items-center justify-center">
      <div className="animate-pulse text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Analytics...</div>
    </div>;
  }

  return (
    <div className="space-y-10">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-10 overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white mb-2">Systems Overview</h2>
          <p className="text-gray-400">Welcome back, Admin. Here's what's happening today in your pet marketplace.</p>
        </div>
        <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-orange-500/20 to-transparent flex items-center justify-center">
          <div className="w-24 h-24 bg-white/10 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-4 rounded-2xl ${stat.color} text-white group-hover:rotate-12 transition-transform shadow-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide ${
                stat.trend.includes('+') ? 'bg-green-100 text-green-600 dark:bg-green-500/10' : 'bg-orange-100 text-orange-600 dark:bg-orange-500/10'
              }`}>
                {stat.trend}
              </span>
            </div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-semibold">{stat.label}</h3>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Pending Alerts */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Recent Pending Approvals</h3>
            <button className="text-sm text-orange-500 font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {stats.pendingPets > 0 ? (
              <div className="flex items-start gap-4 p-4 bg-orange-50 dark:bg-orange-500/5 rounded-2xl border border-orange-100 dark:border-orange-500/10">
                <div className="p-3 bg-orange-500 text-white rounded-xl">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 dark:text-white">Action Required: New Listings</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    There are {stats.pendingPets} pet listings waiting for verification. Review them to keep the marketplace fresh.
                  </p>
                  <button className="mt-4 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg text-sm font-bold">Review Now</button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <h4 className="font-bold text-gray-800 dark:text-white">Queue is Clear</h4>
                <p className="text-gray-500 text-sm">All listings are currently approved.</p>
              </div>
            )}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 p-8">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-8">System Stats</h3>
          <div className="space-y-8">
            {[
              { label: "User Accounts", count: stats.totalUsers, total: 10, color: "bg-blue-500" },
              { label: "Product Inventory", count: stats.totalProducts, total: 20, color: "bg-purple-500" },
              { label: "Accepted Orders", count: stats.totalOrders, total: stats.totalOrders + 2, color: "bg-green-500" },
            ].map(item => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                  <span className="text-gray-900 dark:text-white">{item.count}</span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.count / item.total) * 100}%` }}
                    className={`h-full ${item.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
