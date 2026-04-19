import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  User, 
  Mail, 
  Shield, 
  Settings as SettingsIcon, 
  Lock,
  Bell,
  Palette,
  Eye,
  Check
} from "lucide-react";
import { motion } from "motion/react";
import { toast } from "sonner";

export function AdminSettings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Settings</h2>
        <p className="text-gray-500 mt-1">Configure your dashboard experience and account security.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Navigation */}
        <aside className="w-full md:w-64 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 shadow-xl scale-[1.02]"
                  : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Settings Content */}
        <div className="flex-1 space-y-8">
          {activeTab === "profile" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 shadow-sm space-y-8"
            >
              <div className="flex items-center gap-6 pb-8 border-b border-gray-100 dark:border-gray-800">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-3xl font-bold shadow-2xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</h4>
                  <p className="text-sm text-gray-500 uppercase tracking-widest font-bold mt-1 text-orange-500">{user.role} Account</p>
                </div>
              </div>

              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Display Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm focus:ring-2 focus:ring-orange-500 outline-none transition-all dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="email" 
                      defaultValue={user.email}
                      disabled
                      className="w-full pl-12 pr-4 py-4 bg-gray-100 dark:bg-gray-800/20 border border-transparent rounded-2xl text-sm text-gray-500 cursor-not-allowed outline-none"
                    />
                  </div>
                  <p className="text-[9px] text-gray-400 px-1 font-medium italic">Contact support to change your primary admin email.</p>
                </div>
              </div>

              <div className="pt-6">
                <button 
                  onClick={handleSave}
                  className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2"
                >
                  <Check className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 shadow-sm"
            >
              <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                <Shield className="w-6 h-6 text-purple-500" />
                Password & Security
              </h4>
              <div className="space-y-6">
                <div className="p-6 bg-purple-50 dark:bg-purple-500/5 rounded-3xl border border-purple-100 dark:border-purple-500/10">
                  <p className="text-sm font-bold text-gray-800 dark:text-white">Two-Factor Authentication</p>
                  <p className="text-xs text-gray-500 mt-1">Add an extra layer of security to your master administrator account.</p>
                  <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest">Enable 2FA</button>
                </div>

                <div className="space-y-4">
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="password" placeholder="New Password" className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-purple-500 dark:text-white" />
                  </div>
                  <button onClick={handleSave} className="text-xs font-bold text-gray-500 hover:text-purple-600 px-2 transition-colors uppercase tracking-widest">Update Security Keys</button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 p-8 shadow-sm flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-500/10 rounded-3xl flex items-center justify-center text-blue-500 mb-6">
                <Bell className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 dark:text-white">System Alerts</h4>
              <p className="text-gray-500 text-sm max-w-xs mt-2">Personalize how you receive listing approvals and order notifications.</p>
              <p className="mt-6 text-[10px] font-bold text-blue-500 uppercase tracking-widest">Advanced filters coming soon</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
