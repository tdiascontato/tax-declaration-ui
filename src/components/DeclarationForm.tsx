import React, { useState } from 'react';
import styles from '../styles/declarationform.module.css';
import Navbar from './NavBar';
import Image from 'next/image';

interface DeclarationFormProps {
    onSubmit: (formData: FormData) => void;
}

interface FormData {
    name: string;
    cpf: string;
    income: string;
    deductions: string;
    fontePagadora: string;
    beneficiario: string;
    taxableIncome: string;
    otherDeductions: string;
    taxWithheld: string;
    otherIncome: string;
}

const DeclarationForm: React.FC<DeclarationFormProps> = ({ onSubmit }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        cpf: '',
        income: '',
        deductions: '',
        fontePagadora: '',
        beneficiario: '',
        taxableIncome: '',
        otherDeductions: '',
        taxWithheld: '',
        otherIncome: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'income' || name === 'deductions' || name === 'taxableIncome' || name === 'otherDeductions' || name === 'taxWithheld' || name === 'otherIncome' ? parseFloat(value) : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form className={styles.ContainerFormDeclaration} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="fontePagadoracpf">Fonte pagadora Pessoa Juridica (CPF/CNPJ):</label>
                <input
                    type="text"
                    id="fontePagadoracpf"
                    name="fontePagadoracpf"
                    value={formData.fontePagadora}
                    onChange={handleChange}
                    placeholder="Digite o CPF"
                    required
                    />
                <label htmlFor="fontePagadoranome">Fonte pagadora Pessoa Juridica (Nome Empresarial/ Nome Completo):</label>
                <input
                    type="text"
                    id="fontePagadoranome"
                    name="fontePagadoranome"
                    value={formData.fontePagadora}
                    onChange={handleChange}
                    placeholder="Digite o Nome Empresarial"
                    required
                    />
            </div>
            <div>
                <h3 className={styles.TitleHeaderLabel}>Pessoa Física Beneficiária dos Rendimentos</h3>
                <label htmlFor="beneficiariocpf">CPF</label>
                <input
                    type="text"
                    id="beneficiariocpf"
                    name="beneficiariocpf"
                    value={formData.beneficiario}
                    onChange={handleChange}
                    placeholder="Digite o CPF"
                    required
                    />
                <label htmlFor="beneficiarionome">Nome Completo</label>
                <input
                    type="text"
                    id="beneficiarionome"
                    name="beneficiarionome"
                    value={formData.beneficiario}
                    onChange={handleChange}
                    placeholder="Digite o nome completo"
                    required
                    />
            </div>
            <div>
                <h3 className={styles.TitleHeaderLabel}>Rendimentos Tributáveis, Deduções e Imposto sobre a Renda Retida na Fonte</h3>
                <label htmlFor="taxtotalrendimentos">Total dos rendimentos</label>
                <input
                    type="number"
                    id="taxtotalrendimentos"
                    name="taxtotalrendimentos"
                    value={formData.taxableIncome}
                    onChange={handleChange}
                    placeholder="R$"
                    required
                    />
                <label htmlFor="contribuicaoprevidencia">Contribuição previdenciária oficial</label>
                <input
                    type="number"
                    id="contribuicaoprevidencia"
                    name="contribuicaoprevidencia"
                    value={formData.otherDeductions}
                    onChange={handleChange}
                    placeholder="R$"
                    required
                    />
                <label htmlFor="contribuicaoentidades">Contribuição a entidades de previdência complementar, pública ou privada, e a fundos de aponsentadoria programada individual dos rendimentos - Fapi </label>
                <input
                    type="number"
                    id="contribuicaoentidades"
                    name="contribuicaoentidades"
                    value={formData.otherDeductions}
                    onChange={handleChange}
                    placeholder="R$"
                    required
                    />
                <label htmlFor="pensaoalimenticia">Pensão alimentícia </label>
                <input
                    type="number"
                    id="pensaoalimenticia"
                    name="pensaoalimenticia"
                    value={formData.otherDeductions}
                    onChange={handleChange}
                    placeholder="R$"
                    required
                    />
                <label htmlFor="taxrendaretida">Imposto sobre a renda retido na fonte</label>
                <input
                    type="number"
                    id="taxrendaretida"
                    name="taxrendaretida"
                    value={formData.otherDeductions}
                    onChange={handleChange}
                    placeholder="R$"
                    required
                />
            </div>
            <div>
                <h3 className={styles.TitleHeaderLabel}>Rendimentos Isentos e Não Tributáveis</h3>
                <label htmlFor="taxisenta">Parcela isenta dos processo de aposentadoria, reserva remunerada e pensão</label>
                <input
                    type="number"
                    id="taxisenta"
                    name="taxisenta"
                    value={formData.taxWithheld}
                    onChange={handleChange}
                    placeholder="R$"
                    required
                />
                <label htmlFor="taxdiariacustos">Diárias e ajudas de custos</label>
                <input
                    type="number"
                    id="taxdiariacustos"
                    name="taxdiariacustos"
                    value={formData.taxWithheld}
                    onChange={handleChange}
                    placeholder="R$"
                    required
                    />
                <label htmlFor="taxproventos">Pensão e proventos de aposentadoria ou reforma por moléstia grave, proventos da aposentadoria ou reforma por acidente em serviço</label>
                <input
                    type="number"
                    id="taxproventos"
                    name="taxproventos"
                    value={formData.taxWithheld}
                    onChange={handleChange}
                    placeholder="R$"
                    required
                />
                <label htmlFor="taxlucrosdividendos">Lucros e dividendos, aparados a partir de 1905, pagos por pessoa jurídica </label>
                <input
                    type="number"
                    id="taxlucrosdividendos"
                    name="taxlucrosdividendos"
                    value={formData.taxWithheld}
                    onChange={handleChange}
                    placeholder="R$"
                    required
                    />
                <label htmlFor="valortitular">Valores pagos ao titular ou sócio da microempresa ou empresa de pequena porte</label>
                <input
                    type="number"
                    id="valortitular"
                    name="valortitular"
                    value={formData.taxWithheld}
                    onChange={handleChange}
                    placeholder="R$"
                    required
                    />
                <label htmlFor="taxidenizacaorescisao">Indenização por rescisão de contrato de trabalho, inclusie a tírulo de PDV e por acidente de trabalho</label>
                <input
                    type="number"
                    id="taxidenizacaorescisao"
                    name="taxidenizacaorescisao"
                    value={formData.taxWithheld}
                    onChange={handleChange}
                    placeholder="R$"
                    required
                    />
            </div>
            <div>
                <label htmlFor="outrosrendimentos">Outros rendimentos:</label>
                <input
                    type="number"
                    id="outrosrendimentos"
                    name="outrosrendimentos"
                    value={formData.otherIncome}
                    onChange={handleChange}
                    placeholder="Digite outros rendimentos"
                    required
                    />
            </div>
            <button type="submit">Enviar Declaração</button>
        </form>
    );
};

export default DeclarationForm;