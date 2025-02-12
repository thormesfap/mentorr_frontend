
export interface Entity {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface Nameable extends Entity {
  nome: string;
}

export interface Habilidade extends Nameable {
  area: Nameable;
}

export interface BasicEntity extends Nameable
{
    endpoint: string;
}

export interface Cargo extends BasicEntity {
    endpoint: 'cargo';
}
export interface Empresa extends BasicEntity {
    endpoint: 'empresa';
}
export interface Area extends BasicEntity {
    endpoint: 'area';
}


export interface User extends Entity {
  name: string;
  email: string;
  telefone?: string;
  dataNascimento?: Date;
  fotoPerfil?: string;
  roles: string[];
}

export interface Mentor extends Entity {
  user: User;
  habilidades?: Habilidade[];
  cargo?: Nameable;
  empresa?: Nameable;
  curriculo?: string;
  biografia?: string;
  preco: number;
  minutosPorChamada: number;
  quantidadeChamadas: number;
  avaliacao?: number;
  tags?: string[];
}

export interface Mentoria extends Entity {
  valor: number;
  quantidadeSessoes: number;
  expectativa?: string;
  dataHoraInicio?: Date;
  dataHoraTermino?: Date;
  avaliacao?: number;
  ativa: boolean;
  usuario: User;
  mentor: Mentor;
}

export interface SessaoMentoria extends Entity {
  dataHoraInicio?: Date;
  dataHoraTermino?: Date;
  avaliacao?: number;
  mentoria: Mentoria;
}
