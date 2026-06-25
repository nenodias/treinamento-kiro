/**
 * Service de Tarefas — lógica de domínio pura.
 *
 * Responsabilidades:
 * - Validação de regras de negócio
 * - Criação e manipulação de tarefas
 * - Gerenciamento do ciclo de vida (pendente → concluída)
 */

// --- Constantes de domínio ---

const PRIORIDADES_VALIDAS = ['baixa', 'media', 'alta'];
const STATUS_PENDENTE = 'pendente';
const STATUS_CONCLUIDA = 'concluida';
const PRIORIDADE_PADRAO = 'media';

// --- Erros de domínio ---

export class TarefaNaoEncontradaError extends Error {
  constructor(id) {
    super(`Tarefa não encontrada: ${id}`);
    this.name = 'TarefaNaoEncontradaError';
    this.codigo = 'TAREFA_NAO_ENCONTRADA';
  }
}

export class TarefaJaConcluidaError extends Error {
  constructor(id) {
    super(`Tarefa já está concluída: ${id}`);
    this.name = 'TarefaJaConcluidaError';
    this.codigo = 'TAREFA_JA_CONCLUIDA';
  }
}

export class ValidacaoError extends Error {
  constructor(mensagem) {
    super(mensagem);
    this.name = 'ValidacaoError';
    this.codigo = 'VALIDACAO_FALHOU';
  }
}

// --- Repositório em memória ---

let tarefas = [];

/**
 * Reseta o estado interno (uso exclusivo em testes).
 */
export function resetarTarefas() {
  tarefas = [];
}

// --- Funções do service ---

/**
 * Cria uma nova tarefa com validação de domínio.
 *
 * @param {object} dados - Dados da tarefa.
 * @param {string} dados.titulo - Título da tarefa (obrigatório, não vazio).
 * @param {string} [dados.descricao] - Descrição opcional.
 * @param {string} [dados.prioridade] - Prioridade: 'baixa', 'media' ou 'alta'.
 * @returns {Promise<object>} Tarefa criada.
 * @throws {ValidacaoError} Se os dados forem inválidos.
 */
export async function criarTarefa(dados) {
  const { titulo, descricao, prioridade } = dados ?? {};

  if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
    throw new ValidacaoError('Campo titulo é obrigatório e deve ser uma string não vazia');
  }

  if (prioridade && !PRIORIDADES_VALIDAS.includes(prioridade)) {
    throw new ValidacaoError(
      `Prioridade inválida: "${prioridade}". Valores aceitos: ${PRIORIDADES_VALIDAS.join(', ')}`
    );
  }

  const novaTarefa = {
    id: crypto.randomUUID(),
    titulo: titulo.trim(),
    descricao: descricao?.trim() || '',
    prioridade: prioridade || PRIORIDADE_PADRAO,
    status: STATUS_PENDENTE,
    criadoEm: new Date().toISOString()
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

/**
 * Lista todas as tarefas cadastradas.
 *
 * @returns {Promise<object[]>} Array de tarefas.
 */
export async function listarTarefas() {
  return [...tarefas];
}

/**
 * Busca uma tarefa pelo ID.
 *
 * @param {string} id - UUID da tarefa.
 * @returns {Promise<object|null>} Tarefa encontrada ou null.
 */
export async function buscarTarefaPorId(id) {
  return tarefas.find(t => t.id === id) || null;
}

/**
 * Marca uma tarefa como concluída.
 *
 * @param {string} id - UUID da tarefa.
 * @returns {Promise<object>} Tarefa atualizada.
 * @throws {TarefaNaoEncontradaError} Se a tarefa não existir.
 * @throws {TarefaJaConcluidaError} Se já estiver concluída.
 */
export async function concluirTarefa(id) {
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    throw new TarefaNaoEncontradaError(id);
  }

  if (tarefa.status === STATUS_CONCLUIDA) {
    throw new TarefaJaConcluidaError(id);
  }

  tarefa.status = STATUS_CONCLUIDA;
  tarefa.concluidoEm = new Date().toISOString();
  return { ...tarefa };
}
