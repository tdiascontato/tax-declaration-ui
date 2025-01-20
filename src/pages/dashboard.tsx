// src\pages\dashboard.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useDeclaration } from '@/hooks/useDeclaration'; 
import DeclarationForm from '../components/DeclarationForm';
import styles from '../styles/dashboard.module.css';
import Navbar from '@/components/NavBar';
import { useAuth } from '@/hooks/useAuth';

const Dashboard: React.FC = () => {
    const { getDeclarations, submitDeclaration, updateDeclaration, deleteDeclaration } = useDeclaration();
    const { logout } = useAuth();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [createDeclaration, setCreateDeclaration] = useState(false);
    const [updateDeclarationFlag, setUpdateDeclarationFlag] = useState(false);
    const [declarations, setDeclarations] = useState([]);
    const selectedDeclaration = useRef<any>(null);

    const setFormDeclaration = (declaration: any = null) => {
        setIsPopupOpen(true);
        if (declaration) {
            selectedDeclaration.current = declaration;
            console.log("selectedDeclaration: ", selectedDeclaration.current);
            setUpdateDeclarationFlag(true);
        } else {
            selectedDeclaration.current = null;
            setCreateDeclaration(true);
        }
    };

    useEffect(() => {
        const fetchDeclarations = async () => {
            try {
                const data = await getDeclarations();
                setDeclarations(data);
            } catch (error) {
                console.error('Erro ao buscar declarações:', error);
            }
        };
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
                {!isPopupOpen && declarations && declarations.map((declaration: any) => (
                    <div 
                        key={declaration.id} 
                        className={styles.DeclarationCards} 
                        onClick={() => {setFormDeclaration(declaration); setIsPopupOpen(true);}}>
                        <p>Contribuinte: {declaration.data.fontePagadoranome}</p>
                        <p>Ano: {declaration.data.anoApresentado}</p>
                        <p>Status: {declaration.status}</p>
                        <button type='button' className={styles.ButtonDeleteDeclaration} onClick={()=> {deleteDeclaration(declaration.id)}}>Excluir Declaração</button>
                    </div>
                ))}
            </section>            

            <section className={styles.SectionMainDeclarationForm}>
                {!isPopupOpen && (
                    <button className={styles.FormDeclarationPopUpButton} onClick={() => {setCreateDeclaration(true); setIsPopupOpen(true);}}>
                        Declarações
                    </button>
                )}
            </section>

            {createDeclaration && isPopupOpen && (
                <section className={styles.PopupOverlay}>
                    <button type='button' className={styles.CloseButtonPopUp} onClick={() => {setIsPopupOpen(false);}}> &times; </button>
                    <DeclarationForm onSubmit={submitDeclaration}/>
                </section>
            )}
 
            {updateDeclarationFlag && isPopupOpen && selectedDeclaration && (
                <section className={styles.PopupOverlay}>
                    <button 
                        type="button" 
                        className={styles.CloseButtonPopUp} 
                        onClick={() => setIsPopupOpen(false)}>
                        &times;
                    </button>
                    <DeclarationForm 
                        onSubmit={(data) => updateDeclaration(selectedDeclaration.current.id, data)} 
                        data={selectedDeclaration.current.data} 
                    />
                </section>
            )}
        </main>
    );
};

export default Dashboard;
