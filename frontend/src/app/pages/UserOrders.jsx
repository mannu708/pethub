import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "sonner";
import { 
  Package, 
  ShoppingBag,
  Clock,
  CheckCircle2,
  Trash2,
  ExternalLink,
  MapPin,
  ArrowLeft
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useNavigate } from "react-router";

export function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      // For standard users, the backend already filters to show only their orders
      setOrders(res.data.data.orders || []);
    } catch (err) {
      toast.error("Failed to load your order history");
    } finally {
      setLoading(false);
    }
  };

  const statusColors = {
    pending: "text-orange-500 bg-orange-50 dark:bg-orange-500/10",
    processing: "text-blue-500 bg-blue-50 dark:bg-blue-500/10",
    shipped: "text-purple-500 bg-purple-50 dark:bg-purple-500/10",
    delivered: "text-green-500 bg-green-50 dark:bg-green-500/10",
    cancelled: "text-red-500 bg-red-50 dark:bg-red-500/10",
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full mb-4" />
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Retrieving Your History...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="flex items-center gap-4 mb-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:scale-110 transition-all"
        >
          <ArrowLeft className="w-5 h-5 text-gray-500" />
        </button>
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">My Orders & Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">Track your adoption requests and marketplace purchases.</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-[3rem] p-16 text-center shadow-sm border border-gray-50 dark:border-gray-800">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No orders found</h3>
          <p className="text-gray-500 max-w-sm mx-auto mb-10">You haven't placed any orders yet. Start your journey by adopting a pet or shopping for products!</p>
          <Link to="/shop" className="px-10 py-4 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-2xl transition-all shadow-lg shadow-orange-500/25">
             Browse Marketplace
          </Link>
        </div>
      ) : (
        <div className="grid gap-8">
          {orders.map((order) => (
            <motion.div 
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-50 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="p-8 sm:p-10">
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-8 border-b border-gray-50 dark:border-gray-800">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-orange-100 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500">
                      <Package className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Order ID</p>
                      <h4 className="text-lg font-extrabold text-gray-900 dark:text-white font-mono lowercase">#{order._id.slice(-8)}</h4>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="text-right sm:pr-6 sm:border-r border-gray-100 dark:border-gray-800">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ordered On</p>
                      <p className="font-bold text-gray-800 dark:text-gray-200">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    </div>
                    <div>
                      <span className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items Detail */}
                <div className="py-8 grid md:grid-cols-3 gap-10">
                  <div className="md:col-span-2 space-y-6">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Items Purchased</p>
                    <div className="space-y-4">
                      {order.items.map((item, idx) => {
                        const detail = item.pet || item.product;
                        return (
                          <div key={idx} className="flex items-center gap-5 group">
                            <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-gray-800 overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800">
                              <img src={detail?.image || "https://cdn-icons-png.flaticon.com/512/616/616408.png"} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            </div>
                            <div className="flex-1">
                              <p className="font-bold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors">{detail?.name || "Marketplace Item"}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{item.quantity} x ₹{item.price.toLocaleString('en-IN')}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-gray-900 dark:text-gray-100">₹{(item.quantity * item.price).toLocaleString('en-IN')}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Context Summary */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Summary</p>
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-xs font-medium text-gray-500">
                        <span>Payment Status</span>
                        <span className={`font-bold uppercase tracking-tight ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-gray-400'}`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm font-bold text-gray-900 dark:text-white">
                        <span>Total Paid</span>
                        <span className="text-xl text-orange-500">₹{order.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    
                    <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-gray-400 mt-1" />
                        <div>
                          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Shipping Details</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed italic">{order.shippingAddress}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 flex justify-end">
                   <button 
                    onClick={() => toast.info("Full invoice will be available for download soon.")}
                    className="flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-orange-500 uppercase tracking-widest transition-colors"
                   >
                     <ExternalLink className="w-4 h-4" />
                     Download Receipt
                   </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
