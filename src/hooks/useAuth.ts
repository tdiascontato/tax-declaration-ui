// src\hooks\useAuth.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const checkAuth = async () => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return false;
    } else { 
      const parsedUser = JSON.parse(storedUser);
      return parsedUser; 
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      }, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/users/register", {
        name,
        email,
        password,
      }, { withCredentials: true });

      localStorage.setItem("user", JSON.stringify(response.data));
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    localStorage.removeItem("user");
    router.push("/login");
  };

  return { login, register, logout, checkAuth, loading, error };
};
