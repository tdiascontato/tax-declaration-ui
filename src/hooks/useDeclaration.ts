// src/hooks/useDeclaration.ts
import { useRouter } from "next/navigation";
import { useAuth } from "./useAuth";
import axios from "axios";

export const useDeclaration = () => {
  const { checkAuth } = useAuth();
  const router = useRouter();

  const submitDeclaration = async (formData: any|Object) => {
    try {
      const authUser = await checkAuth();
      if (authUser) {
        const response = await axios.post("http://localhost:4000/declarations/", {
          userId: JSON.parse(authUser).user.id,
          year: formData.anoApresentado,
          data: formData,
          status: formData.status
        });
        
        console.log('Declaração enviada com sucesso:', response.data);
        return response.data;
      } else {
        console.log('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao enviar a declaração:', error);
      throw error;
    }
  };
  
  const getDeclarations = async () => {
    try {
      const authUser = await checkAuth();
      if (authUser) {
        const userId = JSON.parse(authUser).user.id;
        const response = await axios.get(`http://localhost:4000/declarations/user/${userId}`);
        
        console.log('Declarações recebidas', response.data);
        return response.data;
      } else {
        console.log('Erro ao solicitar declarações');
      }
    } catch (error) {
      console.error('Erro ao buscar declarações:', error);
      throw error;
    }
  };

  const updateDeclaration = async (declarationId: number, updatedData: any) => {
    try {
      const authUser = await checkAuth();
      if (authUser) {
        const response = await axios.patch(
            `http://localhost:4000/declarations/update/${declarationId}`,
            { ...updatedData }
        );
  
        return response.data;
      } else {
        console.log('Usuário não autenticado');
      }
    } catch (error) {
      console.error('Erro ao atualizar a declaração:', error);
      throw error;
    }
  };

  const deleteDeclaration = async (declarationId: number) => {
    try {
      const authUser = await checkAuth();
      if (authUser) {
        const response = await axios.delete(
          `http://localhost:4000/declarations/${declarationId}`
        );
        router.push("/");
        console.log("Declaração deletada com sucesso:", response.data);
        return response.data;
      } else {
        console.log("Usuário não autenticado");
      }
    } catch (error) {
      console.error("Erro ao deletar a declaração:", error);
      throw error;
    }
  };

  return { submitDeclaration, getDeclarations, updateDeclaration, deleteDeclaration };
};
