import express from 'express';
import { router as tarefasRouter } from './routes/tarefas.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    }
  });
});

// Rotas de tarefas
app.use('/api/tarefas', tarefasRouter);

// Middleware de erro genérico
app.use((err, req, res, next) => {
  console.error(`[ERRO] ${err.message}`);
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor'
  });
});

// Rota não encontrada
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Rota ${req.method} ${req.path} não encontrada`
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  console.log(`📋 API de tarefas: http://localhost:${PORT}/api/tarefas`);
  console.log(`❤️  Health check: http://localhost:${PORT}/api/health`);
});

export default app;
