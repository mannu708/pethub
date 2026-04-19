import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "sonner";
import { 
  Users as UsersIcon, 
  Search, 
  Mail, 
  ShieldCheck, 
  Clock,
  UserPlus,
  ArrowUpRight
} from "lucide-react";
import { motion } from "motion/react";

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await api.get("/admin/users");
      setUsers(res.data.data.users || []);
    } catch (err) {
      toast.error("Failed to fetch users list");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-pulse text-gray-400 font-bold uppercase tracking-widest text-xs">Loading User Directory...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">User Directory</h2>
          <p className="text-gray-500 text-sm mt-1">Manage platform members and their access levels.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none w-64 transition-all"
            />
          </div>
          <button className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:scale-105 transition-all">
            <UserPlus className="w-4 h-4" />
            Add User
          </button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: "Total Registered", value: users.length, icon: UsersIcon, color: "bg-blue-500" },
          { label: "Active Admins", value: users.filter(u => u.role === 'admin').length, icon: ShieldCheck, color: "bg-purple-500" },
          { label: "New Joiners", value: users.filter(u => new Date(u.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length, icon: Clock, color: "bg-orange-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-2xl ${stat.color} text-white`}>
              <stat.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 dark:text-white leading-none mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-900 rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">User Profile</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Credentials</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Role</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Joined On</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredUsers.map((user) => (
                <motion.tr 
                  layout
                  key={user._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white line-clamp-1">{user.name}</p>
                        <p className="text-[10px] text-gray-400 font-mono uppercase tracking-tighter">ID: {user._id.slice(-8)}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                      <Mail className="w-4 h-4" />
                      <span className="text-xs font-medium">{user.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400' 
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="inline-flex items-center gap-1.5 text-[10px] font-bold text-gray-400 hover:text-orange-500 uppercase tracking-widest group/btn">
                      View Profile
                      <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="py-20 text-center">
              <UsersIcon className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">No users found matching your search</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
