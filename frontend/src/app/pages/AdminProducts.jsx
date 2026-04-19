import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "sonner";
import { 
  Package, 
  Search, 
  Tag, 
  CheckCircle2, 
  XCircle, 
  Plus,
  Trash2,
  Edit2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "Food",
    price: "",
    image: "",
    description: ""
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get("/products");
      setProducts(res.data.data.products || []);
    } catch (err) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const handleStockToggle = async (product) => {
    try {
      const updatedProduct = { inStock: !product.inStock };
      await api.patch(`/products/${product._id}`, updatedProduct);
      
      setProducts(prev => prev.map(p => p._id === product._id ? { ...p, inStock: !p.inStock } : p));
      toast.success(`${product.name} stock updated`);
    } catch (err) {
      toast.error("Failed to update stock status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    try {
      await api.delete(`/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success("Product deleted successfully");
    } catch (err) {
      toast.error("Failed to delete product");
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const res = await api.post("/products", formData);
      setProducts(prev => [res.data.data.product, ...prev]);
      setIsModalOpen(false);
      setFormData({ name: "", category: "Food", price: "", image: "", description: "" });
      toast.success("Product added successfully!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-b-2 border-orange-500 rounded-full animate-spin" />
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">Loading Inventory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white font-outfit">Product Inventory</h2>
          <p className="text-gray-500 text-sm mt-1">Manage pet food, toys, and supplies from one place.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-orange-500 outline-none w-64 shadow-sm"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-500/20 transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Add Product Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Product</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><XCircle /></button>
                </div>

                <form onSubmit={handleAddProduct} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Product Name</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Premium Kibble"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
                      >
                        <option>Food</option>
                        <option>Toys</option>
                        <option>Accessories</option>
                        <option>Grooming</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Price (₹)</label>
                      <input
                        required
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData({...formData, price: e.target.value})}
                        placeholder="Price"
                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Image URL</label>
                    <input
                      required
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white font-mono text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-600 dark:text-gray-400">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Product details..."
                      className="w-full h-24 px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-xl focus:ring-2 focus:ring-orange-500 outline-none dark:text-white resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/30 transition-all active:scale-95 disabled:opacity-50 mt-4"
                  >
                    {isSubmitting ? "Adding..." : "Confirm & Add Product"}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Product</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Pricing</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest">Stock Status</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.tr 
                    layout
                    key={product._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden ring-4 ring-gray-100 dark:ring-gray-800 group-hover:ring-orange-500/10 transition-all">
                          <img src={product.image} alt="" className="w-full h-full object-cover" />
                        </div>
                        <p className="font-bold text-gray-800 dark:text-white line-clamp-1 max-w-[200px]">{product.name}</p>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <span className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-400 w-fit">
                        <Tag className="w-3 h-3" />
                        {product.category}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <p className="text-sm font-bold text-gray-800 dark:text-white">₹{product.price.toLocaleString('en-IN')}</p>
                    </td>
                    <td className="px-8 py-5">
                      <button 
                        onClick={() => handleStockToggle(product)}
                        className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                          product.inStock 
                            ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 hover:bg-green-200' 
                            : 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 hover:bg-red-200'
                        }`}
                      >
                        {product.inStock ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                        {product.inStock ? 'Available' : 'Out of Stock'}
                      </button>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 text-gray-400 hover:text-orange-500 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-all">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {filteredProducts.length === 0 && (
            <div className="py-24 text-center">
              <Package className="w-16 h-16 text-gray-200 dark:text-gray-800 mx-auto mb-4" />
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest font-outfit">Inventory is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
