import { Entity, Habilidade, Nameable } from "./mentorr-interfaces";

export interface BackendUser extends Entity {
  name: string;
  email: string;
  telefone?: string;
  data_nascimento?: Date;
  foto_perfil?: string;
  mentor?: BackendMentor;
  role_names: string[];
}

export interface BackendMentor extends Entity {
  user: BackendUser;
  habilidades?: Habilidade[];
  cargo?: Nameable;
  empresa?: Nameable;
  curriculo?: string;
  biografia?: string;
  preco: number;
  minutos_por_chamada: number;
  quantidade_chamadas: number;
  avaliacao?: number;
  mentorias?: BackendMentoria[];
  tags?: string[];
}

export interface BackendMentoria extends Entity {
  valor: number;
  quantidade_sessoes: number;
  expectativa?: string;
  data_hora_inicio?: Date;
  data_hora_termino?: Date;
  avaliacao?: number;
  ativa: boolean;
  user_id: number;
  mentor_id: number;
  user?: BackendUser;
  mentor?: BackendMentor;
  sessoes?: BackendSessaoMentoria[];
}

export interface BackendSessaoMentoria extends Entity {
  data_hora_inicio?: Date;
  data_hora_termino?: Date;
  avaliacao?: number;
  mentoria: BackendMentoria;
}

export interface BackendSolicitacaoMentoria extends Entity{
  mentor_id: number;
  mentor: BackendMentor;
  user: BackendUser;
  aceita: boolean | null;
  justificativa?: string;
  expectativa?: string;
  data_hora_resposta: string;
}
