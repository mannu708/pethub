import { useState } from "react";
import api from "../utils/api";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate, Link } from "react-router";
import { motion } from "motion/react";

export function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [shippingAddress, setShippingAddress] = useState("");

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to complete your order");
      return;
    }

    if (!shippingAddress.trim()) {
      toast.error("Please provide a shipping address");
      return;
    }

    try {
      setIsCheckingOut(true);
      
      const orderData = {
        items: cart.map(item => ({
          product: item.type === 'product' ? (item._id || item.id) : undefined,
          pet: item.type === 'pet' ? (item._id || item.id) : undefined,
          quantity: item.quantity || 1,
          price: item.price
        })),
        totalAmount: Math.round(cartTotal * 1.18), // Including GST
        shippingAddress: shippingAddress
      };

      // 1. Create Order in our DB
      const dbOrderRes = await api.post("/orders", orderData);
      const dbOrderId = dbOrderRes.data.data.order._id;

      // 2. Create Razorpay Order
      const razorRes = await api.post("/payments/create-order", {
        amount: Number(Math.round(cartTotal * 1.18)),
        currency: "INR",
        receipt: dbOrderId
      });

      const razorOrder = razorRes.data.data.order;
      const razorKey = razorRes.data.data.keyId;

      // 3. Configure Razorpay Options
      const options = {
        key: razorKey,
        amount: razorOrder.amount,
        currency: razorOrder.currency,
        name: "PetCare Hub",
        description: "Pet Adoption & Products Purchase",
        image: "https://cdn-icons-png.flaticon.com/512/616/616408.png",
        order_id: razorOrder.id,
        handler: async function (response) {
          try {
            // 4. Verify Payment on Backend
            const verifyRes = await api.post("/payments/verify", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: dbOrderId
            });

            if (verifyRes.data.status === 'success') {
              toast.success("Payment Received! Order placed successfully.");
              clearCart();
              navigate("/admin/orders"); // Redirect to orders history
            }
          } catch (err) {
            toast.error("Payment verification failed! Please contact support.");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: "9999999999"
        },
        notes: {
          address: shippingAddress
        },
        theme: {
          color: "#f97316"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        toast.error("Payment failed: " + response.error.description);
      });
      rzp1.open();

    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  const pets = cart.filter((item) => item.type === "pet");
  const products = cart.filter((item) => item.type === "product");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 h-full min-h-screen">
      <h1 className="text-4xl font-bold text-foreground mb-8">Your Cart & Bookings</h1>

      {cart.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-2xl border border-border">
          <h3 className="text-2xl font-bold text-foreground mb-4">Your cart is empty</h3>
          <p className="text-muted-foreground mb-8">Looks like you haven't booked any pets or bought any products yet.</p>
          <Link to="/shop" className="px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors">
            Browse Pets
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items Area */}
          <div className="lg:col-span-2 space-y-8">
            {pets.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span>🐾</span> Pet Bookings
                </h2>
                <div className="space-y-4">
                  {pets.map((pet) => (
                    <motion.div layout key={`${pet.id}-pet`} className="flex gap-6 bg-card p-4 rounded-2xl border border-border shadow-sm items-center">
                      <img src={pet.image} alt={pet.name} className="w-24 h-24 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground">{pet.name}</h3>
                        <p className="text-muted-foreground text-sm">{pet.breed} • {pet.age}</p>
                        <p className="text-primary font-semibold mt-1">₹{pet.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(pet.id, 'pet')} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {products.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <span>🛍️</span> Product Purchases
                </h2>
                <div className="space-y-4">
                  {products.map((product) => (
                    <motion.div layout key={`${product.id}-product`} className="flex gap-6 bg-card p-4 rounded-2xl border border-border shadow-sm items-center">
                      <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-xl" />
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground line-clamp-1">{product.name}</h3>
                        <p className="text-primary font-semibold mt-1">₹{product.price}</p>
                      </div>
                      <div className="flex items-center gap-3 bg-muted/50 rounded-xl p-1">
                        <button onClick={() => updateQuantity(product.id, 'product', -1)} className="p-2 hover:bg-background rounded-lg transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{product.quantity}</span>
                        <button onClick={() => updateQuantity(product.id, 'product', 1)} className="p-2 hover:bg-background rounded-lg transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(product.id, 'product')} className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Address Form Section */}
            <div className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span>📍</span> Shipping Address (India Only)
              </h2>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                placeholder="Enter your full address in India (House No, Street, City, State, Pincode)"
                className="w-full h-32 p-4 bg-muted/50 border border-border rounded-xl focus:ring-2 focus:ring-primary outline-none resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                We currently only deliver within major Indian cities: Mumbai, Delhi, Bangalore, etc.
              </p>
            </div>
          </div>

          {/* Checkout Area */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-xl sticky top-8">
              <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST (18%)</span>
                  <span>₹{(cartTotal * 0.18).toLocaleString('en-IN')}</span>
                </div>
                <div className="border-t border-border pt-4 flex justify-between text-lg font-bold text-foreground">
                  <span>Total</span>
                  <span className="text-primary">₹{(cartTotal * 1.18).toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout} 
                disabled={isCheckingOut || cart.length === 0}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed">
                {isCheckingOut ? "Placing Order..." : "Place Order (COD/Pay)"}
              </button>
              <p className="text-xs text-center text-muted-foreground mt-4">
                By clicking "Place Order", you agree to our terms of service in India.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
