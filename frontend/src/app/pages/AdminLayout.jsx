import { Link, Outlet, useLocation, Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { 
  LayoutDashboard, 
  PawPrint, 
  ShoppingBag, 
  Users, 
  LogOut, 
  Settings, 
  Globe, 
  Bell,
  Search,
  ChevronRight
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function AdminLayout() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const { theme } = useTheme();

  // Guard: Only admins can access this layout
  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const menuItems = [
    { to: "/admin", label: "Overview", icon: LayoutDashboard },
    { to: "/admin/pets", label: "Pets Management", icon: PawPrint },
    { to: "/admin/products", label: "Products", icon: ShoppingBag },
    { to: "/admin/users", label: "Users", icon: Users },
    { to: "/admin/settings", label: "Settings", icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`flex min-h-screen bg-gray-50 dark:bg-gray-950 ${theme}`}>
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-72 bg-gray-900 text-white z-50 transition-all duration-300">
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">PawControl</h1>
                <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Admin Portal</p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Main Menu</p>
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all ${
                  isActive(item.to)
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive(item.to) ? "text-white" : "group-hover:text-white transition-colors"}`} />
                <span className="font-semibold text-sm">{item.label}</span>
                {isActive(item.to) && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="p-6 border-t border-white/5">
            <button
              onClick={logout}
              className="flex items-center gap-4 w-full px-4 py-3.5 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all font-semibold text-sm"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
            
            <Link 
              to="/" 
              className="flex items-center gap-4 w-full px-4 py-3.5 mt-2 text-gray-400 hover:text-orange-400 hover:bg-orange-400/10 rounded-xl transition-all font-semibold text-sm"
            >
              <Globe className="w-5 h-5" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-72 flex flex-col">
        {/* Header */}
        <header className="h-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-xl w-96">
            <Search className="w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search analytics, pets, orders..." 
              className="bg-transparent border-none focus:outline-none text-sm w-full dark:text-white"
            />
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-500 hover:text-orange-500 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </button>
            
            <div className="h-8 w-px bg-gray-200 dark:bg-gray-800" />
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-gray-800 dark:text-white">{user.name}</p>
                <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Master Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-white dark:bg-gray-900 flex items-center justify-center font-bold text-gray-800 dark:text-white">
                  {user.name[0]}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-10 flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
