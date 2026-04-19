import { RouterProvider } from "react-router";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { router } from "./routes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster position="top-right" richColors />
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
