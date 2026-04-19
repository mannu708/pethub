import { Link, useLocation } from "react-router";
import { Moon, Sun, ShoppingCart, User, Menu, X, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop Pets" },
    { to: "/products", label: "Products" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  if (user?.role === "admin") {
    navLinks.push({ to: "/admin", label: "Admin Panel" });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xl">🐾</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-600 bg-clip-text text-transparent">
              PawMarket
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors ${
                  isActive(link.to)
                    ? "text-orange-500 dark:text-orange-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-300" />
              )}
            </button>

            <Link to="/cart" className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full text-white text-xs flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="hidden md:flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <User className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {user.name}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white transition-all"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    isActive(link.to)
                      ? "bg-orange-50 dark:bg-orange-900/20 text-orange-500 dark:text-orange-400"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {user ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
                    Logged in as {user.name}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="mx-4 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mx-4 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
