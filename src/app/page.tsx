// tax-declaration-ui\src\app\page.tsx
"use client";
import styles from "./page.module.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  return (
    <div>
      <h1 className={styles.containerMainHome}>Welcome {user?.email}</h1>
    </div>
  );
};

export default Home;
