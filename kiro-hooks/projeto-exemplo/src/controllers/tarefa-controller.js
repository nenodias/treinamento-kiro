const tarefaService = require('../services/tarefa-service');

function listar(req, res) {
  const tarefas = tarefaService.listarTodas();
  res.json(tarefas);
}

function buscar(req, res) {
  const tarefa = tarefaService.buscarPorId(req.params.id);
  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
  res.json(tarefa);
}

function criar(req, res) {
  const { titulo, descricao } = req.body;
  if (!titulo) {
    return res.status(400).json({ erro: 'Título é obrigatório' });
  }
  const novaTarefa = tarefaService.criar({ titulo, descricao });
  res.status(201).json(novaTarefa);
}

function atualizar(req, res) {
  const tarefa = tarefaService.atualizar(req.params.id, req.body);
  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
  res.json(tarefa);
}

function deletar(req, res) {
  const removida = tarefaService.deletar(req.params.id);
  if (!removida) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
  res.status(204).send();
}

module.exports = { listar, buscar, criar, atualizar, deletar };
