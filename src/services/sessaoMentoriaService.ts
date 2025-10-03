import { BackendSessaoMentoria } from "interfaces/mentorr-backend-interfaces.ts";
import { postRequest, patchRequest } from "./apiService.ts";
import { SessaoMentoria } from "interfaces/mentorr-interfaces.ts";
import { mapMentoria } from "./mentoriaService.ts";

function mapSessaoMentoria(data: BackendSessaoMentoria): SessaoMentoria {
  return {
    id: data.id,
    dataHoraInicio: data.data_hora_inicio
      ? new Date(data.data_hora_inicio)
      : undefined,
    dataHoraTermino: data.data_hora_termino
      ? new Date(data.data_hora_termino)
      : undefined,
    avaliacao: data.avaliacao,
    mentoria: data.mentoria ? mapMentoria(data.mentoria) : undefined,
  };
}

function formatDate(data: Date): string {
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0"); // Mês começa em 0
  const ano = data.getFullYear();
  const horas = String(data.getHours()).padStart(2, "0");
  const minutos = String(data.getMinutes()).padStart(2, "0");
  return `${dia}/${mes}/${ano} ${horas}:${minutos}`;
}

async function createSessaoMentoria(inicio: Date, mentoria_id: number) {
  try {
    const response = await postRequest("sessao_mentoria", {
      mentoria_id: mentoria_id,
      data_hora_inicio: formatDate(inicio),
    });
    if (!response.message) {
      return { success: true, data: mapSessaoMentoria(response) };
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

async function avaliarSessaoMentoria(id: number, avaliacao: number) {
  try {
    const response = await patchRequest(`sessao_mentoria/${id}/avaliar`, {
      avaliacao: avaliacao,
    });
    if (!response.message) {
      return {
        success: true,
        data: mapSessaoMentoria(response),
      };
    } else {
      return {
        success: false,
        message:
          response.message || "Erro diverso ao avaliar Sessão de Mentoria",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

export { createSessaoMentoria, avaliarSessaoMentoria, mapSessaoMentoria };
