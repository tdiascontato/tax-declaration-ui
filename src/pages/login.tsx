"use client";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";

const Login = () => {
  const { login, loading, error } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push("/home");
    } catch (err) {
      console.error(error);
    }
  };

  return (
    <main>
        <Navbar />
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Email" 
            required 
            />
            <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
            />
            <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
            </button>
        </form>
        {error && <p>{error}</p>}
    </main>
  );
};

export default Login;
