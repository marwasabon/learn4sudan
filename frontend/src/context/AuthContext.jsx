import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  login as apiLogin,
  register as apiRegister,
  setToken,
  getToken,
  clearToken,
} from "../api/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      const storedUser = JSON.parse(
        localStorage.getItem("auth_user") || "null"
      );
      if (storedUser) setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    try {
      if (!email || !password)
        return { ok: false, error: "Email and password required" };
      const res = await apiLogin(email, password);
      setToken(res.token);
      const authUser = res.user || { email };
      setUser(authUser);
      localStorage.setItem("auth_user", JSON.stringify(authUser));
      return { ok: true, user: authUser };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  const logout = () => {
    clearToken();
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  const register = async ({
    email,
    password,
    first_name = "",
    last_name = "",
  }) => {
    try {
      if (!email || !password)
        return { ok: false, error: "Email and password required" };
      const res = await apiRegister({ email, password, first_name, last_name });
      setToken(res.token);
      const authUser = res.user || { email, first_name, last_name };
      setUser(authUser);
      localStorage.setItem("auth_user", JSON.stringify(authUser));
      return { ok: true, user: authUser };
    } catch (e) {
      return { ok: false, error: e.message };
    }
  };

  const value = useMemo(
    () => ({ user, loading, login, logout, register }),
    [user, loading]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
