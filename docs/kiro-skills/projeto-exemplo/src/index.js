/**
 * Aplicação de exemplo para testar Kiro Skills.
 * Use as skills configuradas em .kiro/skills/ para:
 * - Revisar este código (/pr-review)
 * - Gerar documentação da API (/api-docs)
 * - Criar mensagens de commit (/commit-msg)
 */

const http = require('http');

const PORT = process.env.PORT || 3000;

// Simulação de banco de dados em memória
const tarefas = [];
let nextId = 1;

const server = http.createServer((req, res) => {
  const { method, url } = req;

  // Roteamento simples
  if (method === 'GET' && url === '/tarefas') {
    return listarTarefas(req, res);
  }

  if (method === 'POST' && url === '/tarefas') {
    return criarTarefa(req, res);
  }

  if (method === 'GET' && url.startsWith('/tarefas/')) {
    return buscarTarefa(req, res);
  }

  if (method === 'DELETE' && url.startsWith('/tarefas/')) {
    return deletarTarefa(req, res);
  }

  // 404 para rotas não encontradas
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ code: 'NOT_FOUND', message: 'Rota não encontrada' }));
});

function listarTarefas(req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ data: tarefas, total: tarefas.length }));
}

function criarTarefa(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    try {
      const { titulo, descricao } = JSON.parse(body);

      if (!titulo) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
          code: 'VALIDATION_ERROR',
          message: 'Campo titulo é obrigatório'
        }));
      }

      const tarefa = {
        id: nextId++,
        titulo,
        descricao: descricao || '',
        concluida: false,
        criadaEm: new Date().toISOString()
      };

      tarefas.push(tarefa);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tarefa));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        code: 'PARSE_ERROR',
        message: 'JSON inválido no body da requisição'
      }));
    }
  });
}

function buscarTarefa(req, res) {
  const id = parseInt(req.url.split('/')[2]);
  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      code: 'NOT_FOUND',
      message: `Tarefa ${id} não encontrada`
    }));
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(tarefa));
}

function deletarTarefa(req, res) {
  const id = parseInt(req.url.split('/')[2]);
  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      code: 'NOT_FOUND',
      message: `Tarefa ${id} não encontrada`
    }));
  }

  tarefas.splice(index, 1);
  res.writeHead(204);
  res.end();
}

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
