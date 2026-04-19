import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "../context/CartContext";

export function ProductCard({
  _id,
  id,
  name,
  category,
  price,
  rating,
  reviews,
  image,
  inStock,
}) {
  const { addToCart } = useCart();
  const itemId = _id || id;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart({ _id: itemId, name, price, image, category }, "product");
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* ... image section ... */}
      <div className="relative h-56 overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {!inStock && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <span className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="mb-2">
          <span className="text-xs text-orange-500 dark:text-orange-400 font-medium uppercase tracking-wide">
            {category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating || 4.5)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            ({reviews || 0})
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-800 dark:text-white">
              ₹{price}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className="p-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-white rounded-lg transition-all transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
