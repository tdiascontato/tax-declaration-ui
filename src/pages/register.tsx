"use client";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";
import Navbar from "@/components/NavBar";
import styles from '../styles/register.module.css'

const Register = () => {
  const { register, loading, error } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await register(email, password);
      router.push("/home");
    } catch (err) {
      console.error(error);
    }
  };

  return (
      <main className={styles.ContainerMainRegister}>
        <Navbar items={[{label: 'Login', href: '/login'}]}/>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className={ styles.FormMainRegister}>
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
            <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            placeholder="Confirm Password" 
            required 
            />
            <button type="submit" disabled={loading}>
            {loading ? "Registering..." : "Register"}
            </button>
        </form>
        {error && <p>{error}</p>}
      </main>
  );
};

export default Register;
