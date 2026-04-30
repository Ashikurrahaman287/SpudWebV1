import { createContext, useContext, useState, ReactNode } from "react";
import { getAdminSession, setAdminSession } from "@/lib/storage";
import { setAdminToken, clearAdminToken } from "@/lib/api";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "spudblocks2024";

type AdminContextType = {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
};

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => getAdminSession());

  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setAdminSession(true);
      setAdminToken(password);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setAdminSession(false);
    clearAdminToken();
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used within AdminProvider");
  return ctx;
}
