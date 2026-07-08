import * as TarefaModel from '../models/tarefa.js';

/**
 * Serviço de Tarefas
 * Camada de lógica de negócio entre rotas e modelo
 */

// Status válidos para uma tarefa
const STATUS_VALIDOS = ['pendente', 'em_andamento', 'concluida', 'cancelada'];

/**
 * Lista todas as tarefas, com filtro opcional por status
 */
export function listarTarefas(filtroStatus) {
  const tarefas = TarefaModel.listarTodas();

  if (filtroStatus) {
    return tarefas.filter(t => t.status === filtroStatus);
  }

  return tarefas;
}

/**
 * Busca uma tarefa por ID
 * @throws {Error} Se a tarefa não for encontrada
 */
export function buscarTarefa(id) {
  const tarefa = TarefaModel.buscarPorId(id);
  if (!tarefa) {
    throw new Error(`Tarefa com ID "${id}" não encontrada`);
  }
  return tarefa;
}

/**
 * Cria uma nova tarefa
 * @throws {Error} Se os dados forem inválidos
 */
export function criarTarefa(dados) {
  // Validação básica
  if (!dados.titulo || dados.titulo.trim().length === 0) {
    throw new Error('O campo "titulo" é obrigatório');
  }

  if (dados.titulo.length > 200) {
    throw new Error('O título deve ter no máximo 200 caracteres');
  }

  return TarefaModel.criar({
    titulo: dados.titulo.trim(),
    descricao: dados.descricao?.trim() || ''
  });
}

/**
 * Atualiza uma tarefa existente
 * @throws {Error} Se a tarefa não existir ou dados forem inválidos
 */
export function atualizarTarefa(id, dados) {
  // Verifica se existe
  const existente = TarefaModel.buscarPorId(id);
  if (!existente) {
    throw new Error(`Tarefa com ID "${id}" não encontrada`);
  }

  // Valida status se fornecido
  if (dados.status && !STATUS_VALIDOS.includes(dados.status)) {
    throw new Error(`Status inválido. Use: ${STATUS_VALIDOS.join(', ')}`);
  }

  // Valida título se fornecido
  if (dados.titulo !== undefined && dados.titulo.trim().length === 0) {
    throw new Error('O título não pode ser vazio');
  }

  return TarefaModel.atualizar(id, dados);
}

/**
 * Deleta uma tarefa
 * @throws {Error} Se a tarefa não existir
 */
export function deletarTarefa(id) {
  const removida = TarefaModel.deletar(id);
  if (!removida) {
    throw new Error(`Tarefa com ID "${id}" não encontrada`);
  }
  return true;
}
