/**
 * Service de Subtarefas — lógica de domínio pura.
 *
 * Responsabilidades:
 * - Validação de regras de negócio para subtarefas
 * - Criação e manipulação de subtarefas vinculadas a uma tarefa pai
 * - Gerenciamento do ciclo de vida (pendente → concluída)
 */

// --- Tipos ---

interface Subtarefa {
  id: string;
  tarefaPaiId: string;
  titulo: string;
  descricao: string;
  status: string;
  criadoEm: string;
  concluidoEm?: string;
}

interface CriarSubtarefaDados {
  tarefaPaiId: string;
  titulo: string;
  descricao?: string;
}

// --- Constantes de domínio ---

const STATUS_PENDENTE = "pendente";
const STATUS_CONCLUIDA = "concluida";

// --- Erros de domínio ---

export class SubtarefaNaoEncontradaError extends Error {
  codigo: string;

  constructor(id: string) {
    super(`Subtarefa não encontrada: ${id}`);
    this.name = "SubtarefaNaoEncontradaError";
    this.codigo = "SUBTAREFA_NAO_ENCONTRADA";
  }
}

export class SubtarefaJaConcluidaError extends Error {
  codigo: string;

  constructor(id: string) {
    super(`Subtarefa já está concluída: ${id}`);
    this.name = "SubtarefaJaConcluidaError";
    this.codigo = "SUBTAREFA_JA_CONCLUIDA";
  }
}

export class ValidacaoError extends Error {
  codigo: string;

  constructor(mensagem: string) {
    super(mensagem);
    this.name = "ValidacaoError";
    this.codigo = "VALIDACAO_FALHOU";
  }
}

// --- Repositório em memória ---

let subtarefas: Subtarefa[] = [];

/**
 * Reseta o estado interno (uso exclusivo em testes).
 */
export function resetarSubtarefas(): void {
  subtarefas = [];
}

// --- Funções do service ---

/**
 * Cria uma nova subtarefa vinculada a uma tarefa pai.
 *
 * @param dados - Dados da subtarefa.
 * @returns Subtarefa criada.
 * @throws ValidacaoError se os dados forem inválidos.
 */
export async function criarSubtarefa(dados: CriarSubtarefaDados): Promise<Subtarefa> {
  const { tarefaPaiId, titulo, descricao } = dados ?? {};

  if (!tarefaPaiId || typeof tarefaPaiId !== "string" || tarefaPaiId.trim().length === 0) {
    throw new ValidacaoError("Campo tarefaPaiId é obrigatório e deve ser uma string não vazia");
  }

  if (!titulo || typeof titulo !== "string" || titulo.trim().length === 0) {
    throw new ValidacaoError("Campo titulo é obrigatório e deve ser uma string não vazia");
  }

  const novaSubtarefa: Subtarefa = {
    id: crypto.randomUUID(),
    tarefaPaiId: tarefaPaiId.trim(),
    titulo: titulo.trim(),
    descricao: descricao?.trim() || "",
    status: STATUS_PENDENTE,
    criadoEm: new Date().toISOString(),
  };

  subtarefas.push(novaSubtarefa);
  return novaSubtarefa;
}

/**
 * Lista todas as subtarefas de uma tarefa pai.
 *
 * @param tarefaPaiId - UUID da tarefa pai.
 * @returns Array de subtarefas da tarefa pai.
 */
export async function listarSubtarefas(tarefaPaiId: string): Promise<Subtarefa[]> {
  return subtarefas.filter((s) => s.tarefaPaiId === tarefaPaiId);
}

/**
 * Busca uma subtarefa pelo ID.
 *
 * @param id - UUID da subtarefa.
 * @returns Subtarefa encontrada ou null.
 */
export async function buscarSubtarefaPorId(id: string): Promise<Subtarefa | null> {
  return subtarefas.find((s) => s.id === id) || null;
}

/**
 * Marca uma subtarefa como concluída.
 *
 * @param id - UUID da subtarefa.
 * @returns Subtarefa atualizada.
 * @throws SubtarefaNaoEncontradaError se a subtarefa não existir.
 * @throws SubtarefaJaConcluidaError se já estiver concluída.
 */
export async function concluirSubtarefa(id: string): Promise<Subtarefa> {
  const subtarefa = subtarefas.find((s) => s.id === id);

  if (!subtarefa) {
    throw new SubtarefaNaoEncontradaError(id);
  }

  if (subtarefa.status === STATUS_CONCLUIDA) {
    throw new SubtarefaJaConcluidaError(id);
  }

  subtarefa.status = STATUS_CONCLUIDA;
  subtarefa.concluidoEm = new Date().toISOString();
  return { ...subtarefa };
}

/**
 * Remove uma subtarefa pelo ID.
 *
 * @param id - UUID da subtarefa.
 * @returns true se removida, false se não encontrada.
 */
export async function removerSubtarefa(id: string): Promise<boolean> {
  const indice = subtarefas.findIndex((s) => s.id === id);

  if (indice === -1) {
    return false;
  }

  subtarefas.splice(indice, 1);
  return true;
}
