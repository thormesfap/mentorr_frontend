import { getRequest, postRequest, patchRequest } from "./apiService";
import { SolicitacaoMentoria } from 'interfaces/mentorr-interfaces';
import { BackendSolicitacaoMentoria } from 'interfaces/mentorr-backend-interfaces';
import { mapMentor } from './mentorService';
import { mapUser } from './authService';

function mapSolicitacaoMentoria(data: BackendSolicitacaoMentoria): SolicitacaoMentoria {
  return {
    id: data.id,
    mentor: mapMentor(data.mentor),
    usuario: mapUser(data.user),
    expectativa: data.expectativa,
    aceita: data.aceita,
    justificativa: data.justificativa,
    created_at: data.created_at ? new Date(data.created_at) : undefined,
    updated_at: data.updated_at ? new Date(data.updated_at) : undefined,
  };
}

async function getSolicitacoesUsuario() {
  try {
    const response = await getRequest("solicitacao_mentoria/usuario");
    if (!response.message) {
      return {
        success: true,
        data: response.map(mapSolicitacaoMentoria),
      };
    } else {
      return {
        success: false,
        message: response.message || "Busca de solicitações falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function getSolicitacoesMentor() {
  try {
    const response = await getRequest("solicitacao_mentoria/mentor");
    if (!response.message) {
      return {
        success: true,
        data: response.map(mapSolicitacaoMentoria),
      };
    } else {
      return {
        success: false,
        message: response.message || "Busca de solicitações falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function criarSolicitacaoMentoria(mentorId: number, expectativa: string) {
  try {
    const response = await postRequest("solicitacao_mentoria", {
      mentor_id: mentorId,
      expectativa,
    });
    if (!response.message) {
      return { success: true, data: mapSolicitacaoMentoria(response) };
    } else {
      return {
        success: false,
        message: response.message || "Criação de solicitação falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}

async function responderSolicitacaoMentoria(
  solicitacaoId: number,
  aceita: boolean,
  justificativa?: string
) {
  try {
    const response = await patchRequest(
      `solicitacao_mentoria/${solicitacaoId}`,
      {
        aceita,
        justificativa: justificativa || "",
      }
    );
    if (!response.message) {
      return { success: true, data: mapSolicitacaoMentoria(response) };
    } else {
      return {
        success: false,
        message: response.message || "Resposta à solicitação falhou",
      };
    }
  } catch (error) {
    return { success: false, message: (error as Error).message };
  }
}


export {
  getSolicitacoesUsuario,
  getSolicitacoesMentor,
  criarSolicitacaoMentoria,
  responderSolicitacaoMentoria,
  type SolicitacaoMentoria,
};
