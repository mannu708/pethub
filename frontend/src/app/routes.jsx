import { createBrowserRouter } from "react-router";
import { Root } from "./pages/Root";
import { Home } from "./pages/Home";
import { Shop } from "./pages/Shop";
import { Products } from "./pages/Products";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { PetDetail } from "./pages/PetDetail";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";
import { AdminLayout } from "./pages/AdminLayout";
import { AdminOverview } from "./pages/AdminOverview";
import { AdminPets } from "./pages/AdminPets";
import { AdminOrders } from "./pages/AdminOrders";
import { AdminProducts } from "./pages/AdminProducts";
import { AdminUsers } from "./pages/AdminUsers";
import { AdminSettings } from "./pages/AdminSettings";
import { UserOrders } from "./pages/UserOrders";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "shop",
        Component: Shop,
      },
      {
        path: "pets/:id",
        Component: PetDetail,
      },
      {
        path: "products",
        Component: Products,
      },
      {
        path: "about",
        Component: About,
      },
      {
        path: "cart",
        Component: Cart,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      {
        index: true,
        Component: AdminOverview,
      },
      {
        path: "pets",
        Component: AdminPets,
      },
      {
        path: "orders",
        Component: AdminOrders,
      },
      {
        path: "products",
        Component: AdminProducts,
      },
      {
        path: "users",
        Component: () => <div className="p-20 text-center font-bold text-gray-400">User Management coming soon...</div>,
      },
      {
        path: "settings",
        Component: () => <div className="p-20 text-center font-bold text-gray-400">Admin Settings coming soon...</div>,
      },
    ],
  },
  {
    path: "login",
    Component: Login,
  },
  {
    path: "register",
    Component: Register,
  },
]);
