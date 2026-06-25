import { Router } from 'express';
import * as TarefaService from '../services/tarefa-service.js';
import { formatarResposta, formatarErro } from '../utils/resposta.js';

export const router = Router();

/**
 * GET /api/tarefas
 * Lista todas as tarefas (com filtro opcional por status)
 */
router.get('/', (req, res) => {
  try {
    const { status } = req.query;
    const tarefas = TarefaService.listarTarefas(status);
    res.json(formatarResposta(tarefas));
  } catch (erro) {
    res.status(500).json(formatarErro(erro.message));
  }
});

/**
 * GET /api/tarefas/:id
 * Busca uma tarefa por ID
 */
router.get('/:id', (req, res) => {
  try {
    const tarefa = TarefaService.buscarTarefa(req.params.id);
    res.json(formatarResposta(tarefa));
  } catch (erro) {
    res.status(404).json(formatarErro(erro.message));
  }
});

/**
 * POST /api/tarefas
 * Cria uma nova tarefa
 */
router.post('/', (req, res) => {
  try {
    const tarefa = TarefaService.criarTarefa(req.body);
    res.status(201).json(formatarResposta(tarefa));
  } catch (erro) {
    res.status(400).json(formatarErro(erro.message));
  }
});

/**
 * PUT /api/tarefas/:id
 * Atualiza uma tarefa existente
 */
router.put('/:id', (req, res) => {
  try {
    const tarefa = TarefaService.atualizarTarefa(req.params.id, req.body);
    res.json(formatarResposta(tarefa));
  } catch (erro) {
    const status = erro.message.includes('não encontrada') ? 404 : 400;
    res.status(status).json(formatarErro(erro.message));
  }
});

/**
 * DELETE /api/tarefas/:id
 * Deleta uma tarefa
 */
router.delete('/:id', (req, res) => {
  try {
    TarefaService.deletarTarefa(req.params.id);
    res.json(formatarResposta({ mensagem: 'Tarefa removida com sucesso' }));
  } catch (erro) {
    res.status(404).json(formatarErro(erro.message));
  }
});
