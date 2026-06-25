const express = require('express');
const tarefasRouter = require('./routes/tarefas');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsing de JSON
app.use(express.json());

// Rotas
app.use('/tarefas', tarefasRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Tratamento de rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    error: {
      code: 'NOT_FOUND',
      message: `Rota ${req.method} ${req.path} não encontrada`
    }
  });
});

// Tratamento de erro global
app.use((err, req, res, next) => {
  console.error(`[ERRO] ${err.message}`);
  res.status(err.statusCode || 500).json({
    error: {
      code: err.code || 'INTERNAL_ERROR',
      message: err.statusCode ? err.message : 'Erro interno do servidor'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 API rodando em http://localhost:${PORT}`);
});

module.exports = app;
