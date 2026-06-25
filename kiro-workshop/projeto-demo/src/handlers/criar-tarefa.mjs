import { sucesso, erro } from '../utils/resposta.mjs';
import { criarTarefa, ValidacaoError } from '../services/tarefa-service.mjs';

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}');

    const tarefa = await criarTarefa({
      titulo: body.titulo,
      descricao: body.descricao,
      prioridade: body.prioridade
    });

    return sucesso(tarefa, 'Tarefa criada com sucesso');

  } catch (error) {
    if (error instanceof ValidacaoError) {
      return erro(400, error.message);
    }

    console.error('[criar-tarefa] Erro:', {
      mensagem: error.message,
      timestamp: new Date().toISOString()
    });
    return erro(500, 'Erro interno ao criar tarefa');
  }
};
