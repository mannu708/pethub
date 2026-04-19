import { Heart, MapPin, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCart } from "../context/CartContext";

export function PetCard({
  _id,
  id,
  name,
  breed,
  age,
  price,
  image,
  location,
  category,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const itemId = _id || id;

  const handleViewDetails = () => {
    navigate(`/pets/${itemId}`, {
      state: { pet: { _id: itemId, name, breed, age, price, image, location, category } }
    });
  };

  const handleBookAdoption = (e) => {
    e.stopPropagation();
    addToCart({ _id: itemId, name, price, image, category, breed }, "pet");
  };

  return (
    <div className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* ... image section ... */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-xs rounded-full font-medium">
            {category}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
        >
          <Heart
            className={`w-5 h-5 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
          {name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{breed}</p>

        <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <span>•</span>
          <span>{age}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-orange-500">₹{price.toLocaleString('en-IN')}</span>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={handleViewDetails}
              className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg transition-all font-semibold text-sm">
              View
            </button>
            <button 
              onClick={handleBookAdoption}
              className="flex-[1.5] flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-lg transition-all transform hover:scale-[1.02] font-bold text-sm shadow-md">
              <ShoppingBag className="w-4 h-4" />
              Adopt Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
