import { useState, useEffect } from "react";
import api from "../utils/api";
import { toast } from "sonner";
import { 
  Package, 
  Search, 
  MapPin, 
  ShoppingBag,
  Clock,
  CheckCircle2,
  Trash2,
  MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get("/orders");
      setOrders(res.data.data.orders || []);
    } catch (err) {
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.patch(`/orders/${id}`, { status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    } catch (err) {
      toast.error("Failed to update order status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await api.delete(`/orders/${id}`);
      toast.success("Order deleted successfully");
      setOrders(orders.filter(o => o._id !== id));
    } catch (err) {
      toast.error("Failed to delete order");
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'shipped': return 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400';
      case 'delivered': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400';
      case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400';
      default: return 'bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400';
    }
  };

  const getPaymentStyle = (status) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400';
      case 'failed': return 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400';
      default: return 'bg-gray-100 text-gray-700 dark:bg-gray-500/10 dark:text-gray-400';
    }
  };

  if (loading) {
    return <div className="animate-pulse flex items-center justify-center p-20 text-gray-400 uppercase tracking-widest text-xs font-bold">Loading Orders...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Orders History</h2>
        <p className="text-gray-500 text-sm mt-1">Monitor all marketplace transactions and shipping statuses from all users.</p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Order ID</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Items</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Customer Info</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Amount</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-xs font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              <AnimatePresence mode="popLayout">
                {orders.map((order) => (
                  <motion.tr 
                    layout
                    key={order._id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <p className="text-xs font-bold text-gray-400 font-mono uppercase tracking-tighter">#{order._id.slice(-8)}</p>
                      <p className="text-[10px] text-gray-500 mt-1 font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2.5 overflow-hidden">
                          {order.items.slice(0, 3).map((item, idx) => {
                            const imgUrl = item.pet?.image || item.product?.image || "https://cdn-icons-png.flaticon.com/512/616/616408.png";
                            return (
                              <div key={idx} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-100 dark:ring-gray-900 overflow-hidden shadow-sm">
                                <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                              </div>
                            );
                          })}
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">
                          {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="max-w-xs">
                        <p className="text-xs font-bold text-gray-700 dark:text-gray-200 line-clamp-1 group-hover:text-orange-500 transition-colors">{order.user?.name || "Premium User"}</p>
                        <p className="text-[10px] text-gray-500 font-medium line-clamp-1 mt-0.5 italic">{order.user?.email || "No email available"}</p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-800 dark:text-white">₹{order.totalAmount.toLocaleString('en-IN')}</p>
                      <span className={`inline-block mt-1 px-1.5 py-0.5 rounded italic text-[9px] font-bold uppercase tracking-tighter ${getPaymentStyle(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-transparent border-none focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer ${getStatusStyle(order.status)}`}
                      >
                        <option value="pending" className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">Pending</option>
                        <option value="processing" className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">Processing</option>
                        <option value="shipped" className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">Shipped</option>
                        <option value="delivered" className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">Delivered</option>
                        <option value="cancelled" className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 dark:hover:bg-orange-500/10 rounded-xl transition-all"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(order._id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
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
          
          {orders.length === 0 && (
            <div className="py-20 text-center">
              <Package className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest">No marketplace orders found</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Detail Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800"
            >
              <div className="p-8 sm:p-10">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Order Details</h3>
                    <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest font-bold">Transaction #{selectedOrder._id.slice(-12)}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedOrder(null)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  >
                    <CheckCircle2 className="w-6 h-6 text-gray-400" />
                  </button>
                </div>

                <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                  {/* Customer Info */}
                  <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-3xl grid sm:grid-cols-2 gap-6 border border-gray-100 dark:border-gray-800">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Customer</p>
                      <p className="font-bold text-gray-800 dark:text-white">{selectedOrder.user?.name || "Premium Client"}</p>
                      <p className="text-xs text-gray-500">{selectedOrder.user?.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Shipping Address</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{selectedOrder.shippingAddress}</p>
                    </div>
                  </div>

                  {/* Items List */}
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Marketplace Items</p>
                    <div className="space-y-4">
                      {selectedOrder.items.map((item, idx) => {
                        const detail = item.pet || item.product;
                        return (
                          <div key={idx} className="flex items-center gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden shadow-sm">
                              <img src={detail?.image || "https://cdn-icons-png.flaticon.com/512/616/616408.png"} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1">{detail?.name || "Pet/Product"}</p>
                              <p className="text-[10px] text-gray-500 uppercase tracking-wider">{item.quantity} x ₹{item.price.toLocaleString('en-IN')}</p>
                            </div>
                            <p className="text-xs font-bold text-gray-900 dark:text-white">₹{(item.quantity * item.price).toLocaleString('en-IN')}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="pt-6 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Payment Status</p>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getPaymentStyle(selectedOrder.paymentStatus)}`}>
                        {selectedOrder.paymentStatus}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Amount (Inc. GST)</p>
                      <p className="text-2xl font-bold text-orange-500">₹{selectedOrder.totalAmount.toLocaleString('en-IN')}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
