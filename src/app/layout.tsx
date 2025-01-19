// tax-declaration-ui\src\app\layout.tsx
"use client";
import Navbar from "@/components/NavBar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const user = await checkAuth();
      if (user) {
        router.push("/");
      }
    };

    checkUser();
  }, [checkAuth, router]);
  return (
    <html lang="en">
      <body>
        {children}
        </body>
    </html>
  )
}
