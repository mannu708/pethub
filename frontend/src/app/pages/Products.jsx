import { useState, useEffect } from "react";
import { Search, Filter, ShoppingBag } from "lucide-react";
import { Link } from "react-router";
import { ProductCard } from "../components/ProductCard";
import { motion, AnimatePresence } from "motion/react";
import api from "../utils/api";
import { toast } from "sonner";

export function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const categoryParam = selectedCategory !== "all" ? `?category=${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : "";
      const res = await api.get(`/products${categoryParam}`);
      setProducts(res.data.data.products);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: "all", label: "All Products" },
    { id: "food", label: "Pet Food" },
    { id: "toys", label: "Toys" },
    { id: "accessories", label: "Accessories" },
    { id: "health", label: "Health & Care" },
    { id: "grooming", label: "Grooming" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Pet Products & Supplies
          </h1>
          <p className="text-xl text-white/90">
            Everything your pet needs for a happy and healthy life
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 dark:text-white"
              />
            </div>

            {/* Filter Button */}
            <button onClick={() => alert("Filters functionality coming soon!")} className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-gray-700 dark:text-gray-300">
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full whitespace-nowrap transition-all font-medium ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-gray-600 dark:text-gray-400">
            Found{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredProducts.length}
            </span>{" "}
            products
          </p>
          <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
            <option>Sort by: Featured</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
            <option>Rating: High to Low</option>
            <option>Most Popular</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">Loading amazing products...</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <ProductCard key={product._id || product.id} {...product} id={product._id || product.id} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </div>

      {/* Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-3xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Can't find what you're looking for?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Contact our support team and we'll help you find the perfect product
            for your pet
          </p>
          <Link to="/contact" className="inline-block px-8 py-3 bg-white text-orange-500 rounded-full font-semibold hover:bg-gray-100 transition-colors">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
