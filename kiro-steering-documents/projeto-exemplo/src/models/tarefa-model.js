const { v4: uuidv4 } = require('uuid');

/**
 * Modelo de dados para Tarefa
 *
 * Campos:
 * - id: UUID v4 (gerado automaticamente)
 * - titulo: string (obrigatório, 3-100 caracteres)
 * - descricao: string (opcional, máximo 500 caracteres)
 * - status: enum ['pendente', 'em_andamento', 'concluida'] (default: 'pendente')
 * - criadoEm: ISO 8601 UTC (gerado automaticamente)
 * - atualizadoEm: ISO 8601 UTC (atualizado automaticamente)
 */

// Armazenamento em memória (substituir por banco em produção)
const tarefas = new Map();

/**
 * Cria uma nova tarefa com valores padrão
 */
function criarTarefa({ titulo, descricao = '' }) {
  const agora = new Date().toISOString();

  const tarefa = {
    id: uuidv4(),
    titulo,
    descricao,
    status: 'pendente',
    criadoEm: agora,
    atualizadoEm: agora
  };

  tarefas.set(tarefa.id, tarefa);
  return tarefa;
}

/**
 * Busca tarefa por ID
 */
function buscarPorId(id) {
  return tarefas.get(id) || null;
}

/**
 * Lista todas as tarefas com filtro opcional por status
 */
function listarTarefas(filtros = {}) {
  let resultado = Array.from(tarefas.values());

  if (filtros.status) {
    resultado = resultado.filter(t => t.status === filtros.status);
  }

  return resultado;
}

/**
 * Atualiza campos de uma tarefa existente
 */
function atualizarTarefa(id, campos) {
  const tarefa = tarefas.get(id);
  if (!tarefa) return null;

  const atualizada = {
    ...tarefa,
    ...campos,
    id: tarefa.id, // ID não pode ser alterado
    criadoEm: tarefa.criadoEm, // Data de criação não muda
    atualizadoEm: new Date().toISOString()
  };

  tarefas.set(id, atualizada);
  return atualizada;
}

/**
 * Remove uma tarefa por ID
 */
function deletarTarefa(id) {
  return tarefas.delete(id);
}

module.exports = {
  criarTarefa,
  buscarPorId,
  listarTarefas,
  atualizarTarefa,
  deletarTarefa
};
