const express = require('express');
const tarefaService = require('../services/tarefa-service');
const resposta = require('../utils/resposta');

const router = express.Router();

/**
 * GET /tarefas
 * Lista todas as tarefas com filtro opcional por status
 * Query params: ?status=pendente|em_andamento|concluida
 */
router.get('/', (req, res, next) => {
  try {
    const { status } = req.query;
    const tarefas = tarefaService.listar({ status });
    return resposta.lista(res, tarefas);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /tarefas/:id
 * Busca uma tarefa específica por ID
 */
router.get('/:id', (req, res, next) => {
  try {
    const tarefa = tarefaService.buscarPorId(req.params.id);
    return resposta.sucesso(res, tarefa);
  } catch (err) {
    next(err);
  }
});

/**
 * POST /tarefas
 * Cria uma nova tarefa
 * Body: { titulo: string, descricao?: string }
 */
router.post('/', (req, res, next) => {
  try {
    const tarefa = tarefaService.criar(req.body);
    return resposta.criado(res, tarefa);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /tarefas/:id
 * Atualiza uma tarefa existente
 * Body: { titulo?: string, descricao?: string, status?: string }
 */
router.put('/:id', (req, res, next) => {
  try {
    const tarefa = tarefaService.atualizar(req.params.id, req.body);
    return resposta.sucesso(res, tarefa);
  } catch (err) {
    next(err);
  }
});

/**
 * DELETE /tarefas/:id
 * Remove uma tarefa
 */
router.delete('/:id', (req, res, next) => {
  try {
    tarefaService.deletar(req.params.id);
    return resposta.semConteudo(res);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
