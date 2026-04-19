import { createContext, useContext, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const userData = {
        ...res.data.data.user,
        token: res.data.token,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      const userData = {
        ...res.data.data.user,
        token: res.data.token,
      };
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
