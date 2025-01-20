// src\components\DeclarationForm.tsx
import React, { useState } from 'react';
import styles from '../styles/declarationform.module.css';
import { useRouter } from 'next/navigation';

interface FormData {
    fontePagadoranome: string;
    fontePagadoracpf: string;
    beneficiarionome: string;
    beneficiariocpf: string;
    anoApresentado: string;
    status: string;
    taxtotalrendimentos: string;
    contribuicaoprevidencia: string;
    contribuicaoentidades: string;
    pensaoalimenticia: string;
    taxrendaretida: string;
    taxisenta: string;
    taxdiariacustos: string;
    taxproventos: string;
    taxlucrosdividendos: string;
    valortitular: string;
    taxidenizacaorescisao: string;
    outrosrendimentos: string;
}

interface DelcarationFormProps {
    data?: FormData;
    onSubmit: (FormData: FormData) => Promise<void>;
}

const DeclarationForm: React.FC<DelcarationFormProps> = ({data, onSubmit}) => {
    const router = useRouter();

    const [formData, setFormData] = useState<FormData>({
        fontePagadoranome: '',
        fontePagadoracpf: '',
        beneficiarionome: '',
        beneficiariocpf: '',
        anoApresentado: '',
        status: '',
        taxtotalrendimentos: '',
        contribuicaoprevidencia: '',
        contribuicaoentidades: '',
        pensaoalimenticia: '',
        taxrendaretida: '',
        taxisenta: '',
        taxdiariacustos: '',
        taxproventos: '',
        taxlucrosdividendos: '',
        valortitular: '',
        taxidenizacaorescisao: '',
        outrosrendimentos: '',
        ...data
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target ;
        setFormData((prev) => ({
            ...prev, [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await onSubmit(formData)
            router.push("/");
            alert('Declaração enviada com sucesso!');
        } catch (error) {
            alert('Erro ao enviar a declaração!');
            console.error(error);
        }
    };

    return (
        <form className={styles.ContainerFormDeclaration} onSubmit={handleSubmit}>
            <div>
                <label htmlFor="fontePagadoranome">Fonte pagadora Pessoa Juridica (Nome Empresarial/ Nome Completo):</label>
                <input type="text" id="fontePagadoranome" name="fontePagadoranome" value={formData.fontePagadoranome} onChange={handleChange} placeholder="Digite o Nome Empresarial" required />
                <label htmlFor="fontePagadoracpf">Fonte pagadora Pessoa Juridica (CPF/CNPJ):</label>
                <input type="text" id="fontePagadoracpf" name="fontePagadoracpf" value={formData.fontePagadoracpf} onChange={handleChange} placeholder="Digite o CPF" required />
                <label htmlFor="anoApresentado">Ano da Declaração</label>
                <div className={styles.DivYearStatus}>
                    <input type="text" id="anoApresentado" name="anoApresentado" value={formData.anoApresentado} onChange={handleChange} placeholder="Digite o ano da Declaração" required />
                    <label htmlFor="statusCheckbox">
                        Submetido?
                        <input
                            type="checkbox"
                            id="status"
                            name="status"
                            checked={formData.status === 'submitted'}
                            value={formData.status}
                            onChange={(e) =>
                                setFormData((prev) => ({
                                    ...prev,
                                    status: e.target.checked ? 'submitted' : 'Sketch',
                                }))
                            }
                            required
                        />
                    </label>
                </div>
            </div>
            <div>
                <h3 className={styles.TitleHeaderLabel}>Pessoa Física Beneficiária dos Rendimentos</h3>
                <label htmlFor="beneficiarionome">Nome Completo</label>
                <input type="text" id="beneficiarionome" name="beneficiarionome" value={formData.beneficiarionome} onChange={handleChange} placeholder="Digite o nome completo" />
                <label htmlFor="beneficiariocpf">CPF</label>
                <input type="text" id="beneficiariocpf" name="beneficiariocpf" value={formData.beneficiariocpf} onChange={handleChange} placeholder="Digite o CPF" />
            </div>
            <div>
                <h3 className={styles.TitleHeaderLabel}>Rendimentos Tributáveis, Deduções e Imposto sobre a Renda Retida na Fonte</h3>
                <label htmlFor="taxtotalrendimentos">Total dos rendimentos</label>
                <input type="text" id="taxtotalrendimentos" name="taxtotalrendimentos" value={formData.taxtotalrendimentos} onChange={handleChange} placeholder="R$" />
                <label htmlFor="contribuicaoprevidencia">Contribuição previdenciária oficial</label>
                <input type="text" id="contribuicaoprevidencia" name="contribuicaoprevidencia" value={formData.contribuicaoprevidencia} onChange={handleChange} placeholder="R$" />
                <label htmlFor="contribuicaoentidades">Contribuição a entidades de previdência complementar, pública ou privada, e a fundos de aponsentadoria programada individual dos rendimentos - Fapi </label>
                <input type="text" id="contribuicaoentidades" name="contribuicaoentidades" value={formData.contribuicaoentidades} onChange={handleChange} placeholder="R$" />
                <label htmlFor="pensaoalimenticia">Pensão alimentícia </label>
                <input type="text" id="pensaoalimenticia" name="pensaoalimenticia" value={formData.pensaoalimenticia} onChange={handleChange} placeholder="R$" />
                <label htmlFor="taxrendaretida">Imposto sobre a renda retido na fonte</label>
                <input type="text" id="taxrendaretida" name="taxrendaretida" value={formData.taxrendaretida} onChange={handleChange} placeholder="R$" />
            </div>
            <div>
                <h3 className={styles.TitleHeaderLabel}>Rendimentos Isentos e Não Tributáveis</h3>
                <label htmlFor="taxisenta">Parcela isenta dos processo de aposentadoria, reserva remunerada e pensão</label>
                <input type="text" id="taxisenta" name="taxisenta" value={formData.taxisenta} onChange={handleChange} placeholder="R$" />
                <label htmlFor="taxdiariacustos">Diárias e ajudas de custos</label>
                <input type="text" id="taxdiariacustos" name="taxdiariacustos" value={formData.taxdiariacustos} onChange={handleChange} placeholder="R$" />
                <label htmlFor="taxproventos">Pensão e proventos de aposentadoria ou reforma por moléstia grave, proventos da aposentadoria ou reforma por acidente em serviço</label>
                <input type="text" id="taxproventos" name="taxproventos" value={formData.taxproventos} onChange={handleChange} placeholder="R$" />
                <label htmlFor="taxlucrosdividendos">Lucros e dividendos, aparados a partir de 1905, pagos por pessoa jurídica </label>
                <input type="text" id="taxlucrosdividendos" name="taxlucrosdividendos" value={formData.taxlucrosdividendos} onChange={handleChange} placeholder="R$" />
                <label htmlFor="valortitular">Valores pagos ao titular ou sócio da microempresa ou empresa de pequena porte</label>
                <input type="text" id="valortitular" name="valortitular" value={formData.valortitular} onChange={handleChange} placeholder="R$" />
                <label htmlFor="taxidenizacaorescisao">Indenização por rescisão de contrato de trabalho, inclusie a tírulo de PDV e por acidente de trabalho</label>
                <input type="text" id="taxidenizacaorescisao" name="taxidenizacaorescisao" value={formData.taxidenizacaorescisao} onChange={handleChange} placeholder="R$" />
            </div>
            <div>
                <label htmlFor="outrosrendimentos">Outros rendimentos:</label>
                <input type="text" id="outrosrendimentos" name="outrosrendimentos" value={formData.outrosrendimentos} onChange={handleChange} placeholder="Digite outros rendimentos" />
            </div>
            <button type="submit">Enviar Declaração</button>
        </form>
    );
};

export default DeclarationForm;