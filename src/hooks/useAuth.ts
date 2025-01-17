import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const [user, setUser] = useState<any>(null); // estado para o usuário autenticado
  const [loading, setLoading] = useState(false); // estado para controle de carregamento
  const [error, setError] = useState<string | null>(null); // estado de erro

  const router = useRouter();

  useEffect(() => {
    // Verificar a autenticação do usuário no carregamento
    const checkAuth = async () => {
      try {
        const response = await axios.get("http://localhost:4000/auth/me", {
          withCredentials: true, // Permite o envio de cookies
        });
        setUser(response.data);
      } catch (err) {
        setUser(null); // Se não estiver autenticado, o usuário é nulo
      }
    };

    checkAuth();
  }, []);

  // Função para login
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      }, { withCredentials: true });

      setUser(response.data);
      router.push("/home"); // Redireciona para a home se login for bem-sucedido
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Função para registro
  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        email,
        password,
      }, { withCredentials: true });

      setUser(response.data);
      router.push("/home"); // Redireciona para a home após registro bem-sucedido
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // Função para logout
  const logout = async () => {
    await axios.post("http://localhost:4000/auth/logout", {}, { withCredentials: true });
    setUser(null);
    router.push("/login"); // Redireciona para a página de login após logout
  };

  return { user, login, register, logout, loading, error };
};
