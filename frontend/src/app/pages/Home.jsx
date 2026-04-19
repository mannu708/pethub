import { useState, useEffect } from "react";
import { Link } from "react-router";
import { ArrowRight, Shield, Heart, Truck, PawPrint } from "lucide-react";
import { PetCard } from "../components/PetCard";
import { ProductCard } from "../components/ProductCard";
import api from "../utils/api";

export function Home() {
  const [featuredPets, setFeaturedPets] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedContent();
  }, []);

  const fetchFeaturedContent = async () => {
    try {
      setLoading(true);
      const [petsRes, productsRes] = await Promise.all([
        api.get('/pets?limit=3'),
        api.get('/products?limit=3')
      ]);
      setFeaturedPets(petsRes.data.data.pets);
      setFeaturedProducts(productsRes.data.data.products);
    } catch (err) {
      console.error("Failed to fetch home content:", err);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Verified Sellers",
      description: "All our sellers are verified and trusted",
    },
    {
      icon: Heart,
      title: "Health Guaranteed",
      description: "Every pet comes with health certification",
    },
    {
      icon: Truck,
      title: "Safe Delivery",
      description: "Secure and comfortable pet transportation",
    },
    {
      icon: PawPrint,
      title: "24/7 Support",
      description: "We're here to help anytime you need",
    },
  ];

  return (
    <div className="h-full bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full">
                <PawPrint className="w-4 h-4 text-orange-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  #1 Pet Marketplace
                </span>
              </div>

              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Find Your
                <span className="block bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                  Perfect Companion
                </span>
              </h1>

              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-xl">
                Discover adorable pets, premium pet food, and quality
                accessories. Your journey to pet parenthood starts here.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/shop"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
                >
                  <span>Browse Pets</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center space-x-2 px-8 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-full transition-all border-2 border-gray-200 dark:border-gray-700 font-semibold"
                >
                  <span>Shop Products</span>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    10k+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Happy Pets
                  </div>
                </div>
                <div className="h-12 w-px bg-gray-300 dark:bg-gray-700" />
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    5k+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Trusted Sellers
                  </div>
                </div>
                <div className="h-12 w-px bg-gray-300 dark:bg-gray-700" />
                <div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">
                    4.9
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Rating
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1591911949558-2b0b620d545a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBldHMlMjBmYW1pbHl8ZW58MXx8fHwxNzc1NjM4OTM0fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Happy pets"
                  className="rounded-3xl shadow-2xl"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-72 h-72 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full blur-3xl opacity-20" />
              <div className="absolute -bottom-6 -left-6 w-72 h-72 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-3xl opacity-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-all group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="py-10 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Featured Pets
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Meet our adorable companions waiting for a loving home
              </p>
            </div>
            <Link
              to="/shop"
              className="hidden md:flex items-center space-x-2 text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-semibold"
            >
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-20 text-center text-gray-500">Loading featured pets...</div>
            ) : (
              featuredPets.map((pet) => (
                <PetCard key={pet._id} id={pet._id} {...pet} />
              ))
            )}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-semibold"
            >
              <span>View All Pets</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-10 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Popular Products
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Everything your pet needs for a happy, healthy life
              </p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex items-center space-x-2 text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-semibold"
            >
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              <div className="col-span-full py-20 text-center text-gray-500">Loading popular products...</div>
            ) : (
              featuredProducts.map((product) => (
                <ProductCard key={product._id} id={product._id} {...product} />
              ))
            )}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 text-orange-500 hover:text-orange-600 dark:text-orange-400 dark:hover:text-orange-300 font-semibold"
            >
              <span>View All Products</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Find Your New Best Friend?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of happy pet owners who found their perfect companion
            through PawMarket
          </p>
          <Link
            to="/register"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-white hover:bg-gray-100 text-orange-500 rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold text-lg"
          >
            <span>Get Started Today</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
