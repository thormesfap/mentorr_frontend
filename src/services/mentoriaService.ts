import { BackendMentoria } from 'interfaces/mentorr-backend-interfaces.ts';
import { postRequest, getRequest } from "./apiService.ts";
import { Mentoria } from 'interfaces/mentorr-interfaces.ts';
import { mapMentor } from './mentorService.ts';
import { mapUser } from './authService.ts';

function mapMentoria(data: BackendMentoria): Mentoria {
  return {
    id: data.id,
    valor: data.valor,
    usuarioId: data.user_id,
    mentorId: data.mentor_id,
    quantidadeSessoes: data.quantidade_sessoes,
    expectativa: data.expectativa,
    dataHoraInicio: data.data_hora_inicio ? new Date(data.data_hora_inicio) : undefined,
    dataHoraTermino: data.data_hora_termino ? new Date(data.data_hora_termino): undefined,
    avaliacao: data.avaliacao,
      ativa: data.ativa,
      usuario: data.user ? mapUser(data.user): undefined,
    mentor: data.mentor ? mapMentor(data.mentor): undefined
  };
}

async function createMentoria(
  valor: number,
  userId: number,
  mentorId: number,
  quantidadeSessoes: number
) {
  try {
    const response = await postRequest("mentoria", {
      valor: valor,
      user_id: userId,
      mentor_id: mentorId,
      quantidade_sessoes: quantidadeSessoes,
      expectativa: "",
    });
    if (!response.message) {
      return { success: true, data: mapMentoria(response) };
    } else {
      return {
        success: false,
        message: response.message || "Cadastro de mentoria falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function getMentoriasUsuario() {
  try {
    const response = await getRequest("mentoria/usuario");
    if (!response.message) {
      return {
        success: true,
        data: response.map(mapMentoria),
      };
    } else {
      return {
        success: false,
        message: response.message || "Busca de mentorias falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function getMentoriasMentor() {
  try {
    const response = await getRequest("mentoria/mentor");
    if (!response.message) {
      return {
        success: true,
        data: response.map(mapMentoria),
      };
    } else {
      return {
        success: false,
        message: response.message || "Busca de mentorias falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export {
  createMentoria,
  getMentoriasUsuario,
  getMentoriasMentor,
  type Mentoria,
};
