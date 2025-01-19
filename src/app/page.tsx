// tax-declaration-ui\src\app\page.tsx
"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import Navbar from "@/components/NavBar";

const Home = () => {
  const { checkAuth, logout } = useAuth();
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const verifyUser = async () => {
      const authUser = await checkAuth();
      if (authUser) {
        setUser(JSON.parse(authUser).user.name);
      }
    };

    verifyUser();
  }, [checkAuth, router]);

  return (
    <div>
      <Navbar items={[ {label: "Dashboard", href: "/dashboard"}, { label: "Logout", onClick: () => logout() } ] }/>
      <h1 className={styles.containerMainHome}>Welcome {user}</h1>
    </div>
  );
};

export default Home;
