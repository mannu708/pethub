import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);

  // Load cart specific to the user
  useEffect(() => {
    if (user?._id) {
      const storedCart = localStorage.getItem(`cart_${user._id}`);
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      } else {
        setCart([]);
      }
    } else {
      setCart([]);
    }
  }, [user]);

  // Save cart whenever it changes
  useEffect(() => {
    if (user?._id) {
      localStorage.setItem(`cart_${user._id}`, JSON.stringify(cart));
    }
  }, [cart, user]);

  const addToCart = (item, type) => {
    // type is 'pet' or 'product'
    setCart((prev) => {
      const itemId = item._id || item.id;
      const existing = prev.find((i) => (i._id === itemId || i.id === itemId) && i.type === type);
      
      if (existing) {
        return prev.map((i) =>
          (i._id === itemId || i.id === itemId) && i.type === type
            ? { ...i, quantity: (i.quantity || 1) + 1 }
            : i
        );
      }
      return [...prev, { ...item, _id: itemId, type, quantity: 1 }];
    });
    
    import("sonner").then(({ toast }) => {
      toast.success(`${item.name} added to cart!`);
    });
  };

  const removeFromCart = (id, type) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.type === type)));
  };

  const updateQuantity = (id, type, delta) => {
    setCart((prev) => prev.map((i) => {
      if (i.id === id && i.type === type) {
        const newQuantity = Math.max(1, (i.quantity || 1) + delta);
        return { ...i, quantity: newQuantity };
      }
      return i;
    }));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
