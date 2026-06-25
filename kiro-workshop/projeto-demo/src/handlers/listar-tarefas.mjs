import { sucesso, erro } from '../utils/resposta.mjs';
import { listarTarefas } from '../services/tarefa-service.mjs';

export const handler = async (event) => {
  try {
    const tarefas = await listarTarefas();
    return sucesso(tarefas, `${tarefas.length} tarefa(s) encontrada(s)`);

  } catch (error) {
    console.error('[listar-tarefas] Erro:', {
      mensagem: error.message,
      timestamp: new Date().toISOString()
    });
    return erro(500, 'Erro interno ao listar tarefas');
  }
};
