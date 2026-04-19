import { useParams, useNavigate, Link } from "react-router";
import { ArrowLeft, MapPin, Heart, Shield, Check, Truck, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "sonner";
import { useCart } from "../context/CartContext";

export function PetDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchPet();
  }, [id]);

  const fetchPet = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/pets/${id}`);
      setPet(res.data.data.pet);
    } catch (err) {
      toast.error("Failed to load pet details");
    } finally {
      setLoading(false);
    }
  };

  const handleAdopt = () => {
    addToCart(pet, "pet");
  };

  if (loading) {
    return (
      <div className="h-full py-32 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <p className="mt-4 text-muted-foreground">Loading pet details...</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="h-full py-16 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pet Not Found</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">We couldn't find the details for this pet.</p>
        <button onClick={() => navigate('/shop')} className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium">
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="h-full bg-white dark:bg-gray-900 pb-10">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-900/20 dark:to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 relative z-10">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to results</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-6">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={pet.image} 
                alt={pet.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full font-semibold text-gray-900 dark:text-white shadow-lg">
                  {pet.category}
                </span>
              </div>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className="absolute top-4 right-4 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-full shadow-lg hover:scale-110 transition-transform"
              >
                <Heart className={`w-6 h-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 dark:text-gray-300"}`} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {[pet.image, pet.image, pet.image].map((img, i) => (
                <div key={i} className="h-24 rounded-xl overflow-hidden opacity-60 hover:opacity-100 transition-opacity cursor-pointer border-2 border-transparent hover:border-orange-500">
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Details Section */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-sm font-medium text-orange-500 uppercase tracking-wider">{pet.breed}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {pet.name}
            </h1>
            
            <div className="flex items-center space-x-6 text-gray-600 dark:text-gray-300 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>{pet.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <span>{pet.age}</span>
              </div>
            </div>

            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              ₹{pet.price}
            </div>

            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {pet.description || `Meet ${pet.name}, a beautiful ${pet.breed} looking for a loving home. ${pet.name} is ${pet.age} old, fully vaccinated, and comes with a complete health certificate. Very friendly, playful, and great with children.`}
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <Shield className="w-6 h-6 text-green-500" />
                <span className="font-medium text-gray-900 dark:text-white">Health Verified</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <Check className="w-6 h-6 text-blue-500" />
                <span className="font-medium text-gray-900 dark:text-white">Vaccinated</span>
              </div>
              <div className="flex items-center space-x-3 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <Truck className="w-6 h-6 text-orange-500" />
                <span className="font-medium text-gray-900 dark:text-white">Transport Available</span>
              </div>
            </div>

            <div className="mt-auto flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleAdopt} 
                className="flex-[1.5] flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                <ShoppingBag className="w-6 h-6" />
                <span>Adopt {pet.name}</span>
              </button>
              <Link to="/contact" className="px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-bold text-lg rounded-xl transition-colors text-center">
                Contact Seller
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
