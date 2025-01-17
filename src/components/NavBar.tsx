"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import styles from "../styles/navbar.module.css";

interface NavItem {
  label: string;
  href: string;
}

interface NavbarProps {
  items: NavItem[];
}

const Navbar = ({ items }: NavbarProps) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  return (
    <nav className={ styles.ContainerMainNavBar }>
      <ul className={ styles.ContainerUlNavBar }>
          {items.map((item, index) => (
            <li key={index}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Navbar;
