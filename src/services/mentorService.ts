import { BackendMentor } from '../interfaces/mentorr-backend-interfaces.ts';
import { User, Mentor } from "../interfaces/mentorr-interfaces.ts";
import { postRequest, getRequest } from "./apiService.ts";

async function getMentores() {
  try {
    const response = await getRequest("mentor");
    if (!response.message) {
      return { success: true, data: response.data.map(mapMentor) };
    } else {
      return {
        success: false,
        message: response.message || "Busca de mentores falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function searchMentor(params:{[key:string]: string}) {
  try {
    const queryParams = [];
    for (const [key, value] of Object.entries(params)) {
      queryParams.push(`${key}=${value}`);
    }
    const response = await getRequest(`mentor?${queryParams.join("&")}`);
    if (!response.message) {
      return { success: true, data: response.data.map(mapMentor) };
    } else {
      return {
        success: false,
        message: response.message || "Busca de mentores falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function cadastraMentor(
  preco: number,
  minutos: number,
  quantidade: number,
  biografia = "",
  curriculo = ""
) {
  try {
    const response = await postRequest("mentor", {
      preco,
      minutos_por_chamada: minutos,
      quantidade_chamadas: quantidade,
      biografia,
      curriculo,
    });
    if (!response.message) {
      return { success: true, data: response };
    } else {
      return {
        success: false,
        message: response.message || "Cadastro como mentor falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}
function mapMentor(data:BackendMentor): Mentor {
  const user: User = {
    id: data.id,
    name: data.user.name,
    email: data.user.email,
    telefone: data.user.telefone,
    dataNascimento: data.user.data_nascimento,
    fotoPerfil: data.user.foto_perfil,
    roles: data.user.roles,
  };
  const mentor: Mentor = {
    id: data.id,
    user: user,
    curriculo: data.curriculo,
    biografia: data.biografia,
    preco: data.preco,
    minutosPorChamada: data.minutos_por_chamada,
    quantidadeChamadas: data.quantidade_chamadas,
    avaliacao: data.avaliacao,
    habilidades: data.habilidades,
    tags: data.tags,
    empresa: data.empresa ? { id: data.empresa?.id, nome: data.empresa.nome } : undefined,
    cargo: data.cargo ? {id: data.cargo?.id, nome: data.cargo.nome} : undefined
    
  };
  return mentor;
}

export { getMentores, cadastraMentor, searchMentor };
