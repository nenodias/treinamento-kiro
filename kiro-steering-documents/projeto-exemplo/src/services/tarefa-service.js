/**
 * Service: Tarefa
 *
 * Camada de lógica de negócio responsável por validar dados de entrada,
 * aplicar regras de domínio e delegar operações de persistência ao model.
 * Erros são lançados com `code` e `statusCode` para tratamento pelo
 * middleware global de erro.
 */

const tarefaModel = require('../models/tarefa-model');

// Status válidos aceitos pelo sistema para uma tarefa
const STATUS_VALIDOS = ['pendente', 'em_andamento', 'concluida'];

// --- Helpers internos ---

/**
 * Cria e lança um erro de validação padronizado.
 * @param {string} mensagem - Mensagem descritiva do erro
 * @param {number} [statusCode=400] - Código HTTP associado
 * @param {string} [code='VALIDATION_ERROR'] - Código interno do erro
 */
function lancarErro(mensagem, statusCode = 400, code = 'VALIDATION_ERROR') {
  const erro = new Error(mensagem);
  erro.code = code;
  erro.statusCode = statusCode;
  throw erro;
}

/**
 * Valida o campo título conforme regras de negócio.
 * - Obrigatório
 * - Mínimo de 3 caracteres (após trim)
 * - Máximo de 100 caracteres
 * @param {string|undefined} titulo - Valor do título a ser validado
 */
function validarTitulo(titulo) {
  if (!titulo || titulo.trim().length < 3) {
    lancarErro('Título deve ter no mínimo 3 caracteres');
  }

  if (titulo.length > 100) {
    lancarErro('Título deve ter no máximo 100 caracteres');
  }
}

/**
 * Valida o campo descrição conforme regras de negócio.
 * - Opcional, mas se fornecido deve ter no máximo 500 caracteres
 * @param {string|undefined} descricao - Valor da descrição a ser validado
 */
function validarDescricao(descricao) {
  if (descricao && descricao.length > 500) {
    lancarErro('Descrição deve ter no máximo 500 caracteres');
  }
}

/**
 * Valida se o status informado está entre os valores aceitos.
 * @param {string} status - Status a ser validado
 */
function validarStatus(status) {
  if (status && !STATUS_VALIDOS.includes(status)) {
    lancarErro(`Status inválido. Use: ${STATUS_VALIDOS.join(', ')}`);
  }
}

// --- Operações públicas ---

/**
 * Cria uma nova tarefa após validação completa dos campos.
 * @param {Object} dados - Dados da tarefa a ser criada
 * @param {string} dados.titulo - Título da tarefa (obrigatório, 3-100 caracteres)
 * @param {string} [dados.descricao] - Descrição da tarefa (opcional, máx 500 caracteres)
 * @returns {Object} Tarefa criada com ID gerado e timestamps
 */
function criar(dados) {
  const { titulo, descricao } = dados;

  validarTitulo(titulo);
  validarDescricao(descricao);

  return tarefaModel.criarTarefa({ titulo: titulo.trim(), descricao });
}

/**
 * Busca uma tarefa pelo seu identificador único.
 * Lança erro 404 caso a tarefa não seja encontrada.
 * @param {string} id - Identificador único da tarefa
 * @returns {Object} Tarefa encontrada
 */
function buscarPorId(id) {
  const tarefa = tarefaModel.buscarPorId(id);

  if (!tarefa) {
    lancarErro(`Tarefa com ID ${id} não encontrada`, 404, 'NOT_FOUND');
  }

  return tarefa;
}

/**
 * Lista tarefas com filtro opcional por status.
 * @param {Object} [filtros={}] - Critérios de filtragem
 * @param {string} [filtros.status] - Filtra por status (pendente | em_andamento | concluida)
 * @returns {Array<Object>} Lista de tarefas que atendem aos filtros
 */
function listar(filtros = {}) {
  validarStatus(filtros.status);

  return tarefaModel.listarTarefas(filtros);
}

/**
 * Atualiza parcialmente uma tarefa existente.
 * Valida existência da tarefa antes de aplicar alterações.
 * @param {string} id - Identificador da tarefa a ser atualizada
 * @param {Object} dados - Campos a serem atualizados
 * @param {string} [dados.titulo] - Novo título (3-100 caracteres)
 * @param {string} [dados.descricao] - Nova descrição (máx 500 caracteres)
 * @param {string} [dados.status] - Novo status (pendente | em_andamento | concluida)
 * @returns {Object} Tarefa atualizada
 */
function atualizar(id, dados) {
  // Garante que a tarefa existe antes de tentar atualizar
  buscarPorId(id);

  validarStatus(dados.status);

  // Valida título somente se foi enviado na requisição
  if (dados.titulo !== undefined) {
    validarTitulo(dados.titulo);
  }

  return tarefaModel.atualizarTarefa(id, dados);
}

/**
 * Remove uma tarefa do sistema.
 * Verifica existência antes de executar a exclusão.
 * @param {string} id - Identificador da tarefa a ser removida
 * @returns {boolean} Confirmação da remoção
 */
function deletar(id) {
  // Garante que a tarefa existe antes de tentar deletar
  buscarPorId(id);

  return tarefaModel.deletarTarefa(id);
}

module.exports = {
  criar,
  buscarPorId,
  listar,
  atualizar,
  deletar
};
