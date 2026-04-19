import { Link } from "react-router";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xl">🐾</span>
              </div>
              <span className="text-xl font-bold text-white">PawMarket</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted marketplace for pets, pet food, and accessories.
              Connecting loving homes with adorable companions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  Shop Pets
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-orange-400" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-orange-400" />
                <span className="text-gray-400">info@pawmarket.com</span>
              </li>
              <li className="flex items-start space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-orange-400 mt-0.5" />
                <span className="text-gray-400">
                  123 Pet Street, Animal City, PC 12345
                </span>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-3 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
            <p className="text-gray-400 text-sm mb-2">
              Subscribe to our newsletter
            </p>
            <form 
              className="flex"
              onSubmit={(e) => { e.preventDefault(); alert("Subscribed successfully!"); }}
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-sm focus:outline-none focus:border-orange-500"
              />

              <button type="submit" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-r-lg transition-colors text-sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; 2026 PawMarket. All rights reserved. Made with ❤️ for pets.
          </p>
        </div>
      </div>
    </footer>
  );
}
