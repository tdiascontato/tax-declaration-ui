import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DeclarationForm from '../components/DeclarationForm';
import styles from '../styles/dashboard.module.css';
import Navbar from '@/components/NavBar';
import { useAuth } from '@/hooks/useAuth';

const Dashboard: React.FC = () => {
    const { logout, checkAuth } = useAuth();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [declarations, setDeclarations] = useState([]);

    const togglePopup = () => setIsPopupOpen(!isPopupOpen);

    // Function to fetch declarations
    const fetchDeclarations = async () => {
        try {
            const authUser = await checkAuth();
            if (authUser) {
                const userId = JSON.parse(authUser).user.id;
                const response = await axios.get(`http://localhost:4000/declarations/user/${userId}`);
                setDeclarations(response.data);
                console.log(response.data)
            } else {
                console.log('Usuário não autenticado');
            }
        } catch (error) {
            console.error('Erro ao buscar declarações:', error);
        }
    };

    // Fetch declarations on component mount
    useEffect(() => {
        fetchDeclarations();
    }, []);

    return (
        <main className={styles.ContainerMainDeclaration}>
            <Navbar
                items={[
                    { label: 'Home', href: '/' },
                    { label: 'Logout', onClick: () => logout() },
                ]}
            />
            <div className={styles.HeaderDashboard}>
                <h1>Dashboard</h1>
                <img className={styles.LogoImageReceitaFedral} src="/receitafederallogo.png" alt="Logo" />
            </div>

            <section className={styles.SectionMainDeclarationsUser}>
                {declarations.map((declaration: any) => (
                    <div 
                        key={declaration.id} 
                        className={styles.DeclarationCards} >
                        <p>Ano: {declaration.year}</p>
                        <p>Data: {declaration.user.name}</p>
                        <p>Status: {declaration.status}</p>
                    </div>
                ))}
            </section>

            <section className={styles.SectionMainDeclarationForm}>
                {!isPopupOpen && (
                    <button className={styles.FormDeclarationPopUpButton} onClick={togglePopup}>
                        Declarações
                    </button>
                )}

                {isPopupOpen && (
                    <section className={styles.PopupOverlay}>
                        <button className={styles.CloseButtonPopUp} onClick={togglePopup}>
                            &times;
                        </button>
                        <DeclarationForm />
                    </section>
                )}
            </section>
        </main>
    );
};

export default Dashboard;
