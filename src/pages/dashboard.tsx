import React from 'react';
import DeclarationForm from '../components/DeclarationForm';
import styles from '../styles/dashboard.module.css';
import Navbar from '@/components/NavBar';
import { useAuth } from '@/hooks/useAuth';

const Dashboard: React.FC = () => {
    const { logout } = useAuth();
    const onSubmit = (data: any) => {
        console.log('Form submitted:', data);
    };
    return (
        <main className={styles.ContainerMainDeclaration}>
            <Navbar items={[ { label: "Home", href: "/" }, { label: "Logout", onClick: () => logout() } ] } />
            <div className={styles.HeaderDashboard}>
                <h1>Dashboard</h1>
                <img className={styles.LogoImageReceitaFedral} src="/receitafederallogo.png" alt='Logo'/>
            </div>
            <DeclarationForm onSubmit={onSubmit}/>
        </main>
    );
};

export default Dashboard;