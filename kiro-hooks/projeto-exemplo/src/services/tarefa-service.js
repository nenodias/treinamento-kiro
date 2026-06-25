'use strict';

const { v4: uuidv4 } = require('uuid')
const { formatarData } = require('../utils/helpers');

/** @type {Array<Object>} Banco de dados em memória */
let tarefas = [];

/**
 * Retorna todas as tarefas cadastradas.
 * @returns {Array<Object>} Lista de tarefas
 */
function listarTodas() {
  return [...tarefas]
}

/**
 * Busca uma tarefa pelo ID.
 * @param {string} id - ID da tarefa
 * @returns {Object|undefined} Tarefa encontrada ou undefined
 */
function buscarPorId(id) {
  return tarefas.find((t) => t.id === id);
}

/**
 * Cria uma nova tarefa.
 * @param {Object} params - Dados da tarefa
 * @param {string} params.titulo - Título da tarefa (obrigatório)
 * @param {string} [params.descricao] - Descrição da tarefa
 * @returns {Object} Tarefa criada
 * @throws {Error} Se o título não for informado
 */
function criar({ titulo, descricao }) {
  if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
    throw new Error('O título da tarefa é obrigatório.');
  }

  const agora = formatarData(new Date());
  const novaTarefa = {
    id: uuidv4(),
    titulo: titulo.trim(),
    descricao: descricao ? descricao.trim() : '',
    concluida: false,
    criadaEm: agora,
    atualizadaEm: agora,
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

/**
 * Atualiza uma tarefa existente.
 * @param {string} id - ID da tarefa
 * @param {Object} dados - Campos a serem atualizados
 * @returns {Object|null} Tarefa atualizada ou null se não encontrada
 */
function atualizar(id, dados) {
  const indice = tarefas.findIndex((t) => t.id === id);
  if (indice === -1) {
    return null;
  }

  // Evita sobrescrita de campos protegidos
  const { id: _id, criadaEm: _criadaEm, ...dadosPermitidos } = dados;

  tarefas[indice] = {
    ...tarefas[indice],
    ...dadosPermitidos,
    atualizadaEm: formatarData(new Date()),
  };

  return tarefas[indice];
}

/**
 * Remove uma tarefa pelo ID.
 * @param {string} id - ID da tarefa
 * @returns {boolean} true se removida, false se não encontrada
 */
function deletar(id) {
  const indice = tarefas.findIndex((t) => t.id === id);
  if (indice === -1) {
    return false;
  }

  tarefas.splice(indice, 1);
  return true;
}

module.exports = { listarTodas, buscarPorId, criar, atualizar, deletar };
