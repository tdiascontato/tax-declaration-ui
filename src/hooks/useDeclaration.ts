// src/hooks/useDeclaration.ts
import { useAuth } from "./useAuth";
import axios from "axios";

export const useDeclaration = () => {
  const { checkAuth } = useAuth();

  const submitDeclaration = async (formData: any) => {
    try {
      const authUser = await checkAuth();
      if (authUser) {
        const response = await axios.post("http://localhost:4000/declarations/", {
          userId: JSON.parse(authUser).user.id,
          year: formData.anoApresentado,
          data: JSON.stringify(formData)
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

  return { submitDeclaration };
};
