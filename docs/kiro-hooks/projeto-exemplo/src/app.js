const express = require('express');
const tarefaController = require('./controllers/tarefa-controller');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rotas de tarefas
app.get('/tarefas', tarefaController.listar);
app.get('/tarefas/:id', tarefaController.buscar);
app.post('/tarefas', tarefaController.criar);
app.put('/tarefas/:id', tarefaController.atualizar);
app.delete('/tarefas/:id', tarefaController.deletar);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
