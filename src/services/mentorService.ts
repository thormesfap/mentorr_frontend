import { BackendMentor } from "../interfaces/mentorr-backend-interfaces.ts";
import { Mentor } from "../interfaces/mentorr-interfaces.ts";
import { postRequest, getRequest, patchRequest } from "./apiService.ts";
import { mapUser } from "./authService.ts";

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

async function getMentor(id: string) {
  try {
    const response = await getRequest("mentor/" + id);
    if (!response.message) {
      return { success: true, data: mapMentor(response) };
    } else {
      return {
        success: false,
        message: response.message || "Mentor não encontrado",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function searchMentor(params: { [key: string]: string }) {
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
function mapMentor(data: BackendMentor): Mentor {
  const mentor: Mentor = {
    id: data.id,
    user: data.user ? mapUser(data.user) : undefined,
    curriculo: data.curriculo,
    biografia: data.biografia,
    preco: data.preco,
    minutosPorChamada: data.minutos_por_chamada,
    quantidadeChamadas: data.quantidade_chamadas,
    avaliacao: data.avaliacao,
    habilidades: data.habilidades,
    tags: data.tags,
    empresa: data.empresa
      ? { id: data.empresa?.id, nome: data.empresa.nome }
      : undefined,
    cargo: data.cargo
      ? { id: data.cargo?.id, nome: data.cargo.nome }
      : undefined,
    mentorias: data.mentorias
      ? data.mentorias.map((m) => {
          return {
            id: m.id,
            valor: m.valor,
            quantidadeSessoes: m.quantidade_sessoes,
            expectativa: m.expectativa,
            dataHoraInicio: m.data_hora_inicio,
            dataHoraTermino: m.data_hora_termino,
            avaliacao: m.avaliacao,
            ativa: m.ativa,
            usuarioId: m.user_id,
            mentorId: m.mentor_id,
          };
        })
      : [],
  };
  return mentor;
}

async function updateMentor(
  mentorId: number,
  preco: number,
  minutos: number,
  quantidade: number,
  biografia = "",
  curriculo = ""
) {
  try {
    const response = await patchRequest(`mentor/${mentorId}`, {
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
        message: response.message || "Atualização do mentor falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export { getMentores, cadastraMentor, searchMentor, getMentor, updateMentor, mapMentor };
